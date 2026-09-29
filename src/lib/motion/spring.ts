export interface SpringOptions {
  /** 1 is critically damped. Use less than 1 only after a momentum gesture. */
  damping?: number;
  /** Natural response time in seconds, rather than a prescribed duration. */
  response?: number;
  /** Absolute velocity in units per second. Omitted values preserve momentum. */
  velocity?: number;
  onRest?: () => void;
}

export interface SpringConfig {
  damping?: number;
  response?: number;
  precision?: number;
  reducedMotion?: boolean | (() => boolean);
  /** Disable the rAF loop for deterministic consumers; drive with advance instead. */
  autoStart?: boolean;
}

export interface Spring {
  readonly value: number;
  readonly velocity: number;
  readonly target: number;
  readonly moving: boolean;
  to(target: number, options?: SpringOptions): void;
  jump(value: number): void;
  stop(): void;
  /** Deterministic stepping for tests and non-DOM consumers. */
  advance(seconds: number): void;
}

const defaultReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const requestFrame = (callback: FrameRequestCallback) => requestAnimationFrame(callback);

const cancelFrame = (frame: number) => {
  cancelAnimationFrame(frame);
};

/**
 * A small framework-agnostic spring based on damping ratio + response.
 * Retargeting keeps the current velocity, which makes every transition interruptible.
 */
export function spring(
  initialValue: number,
  onUpdate: (value: number) => void,
  config: SpringConfig = {},
): Spring {
  let value = initialValue;
  let velocity = 0;
  let target = initialValue;
  let frame = 0;
  let lastTime = 0;
  let onRest: (() => void) | undefined;
  let damping = config.damping ?? 1;
  let response = config.response ?? 0.4;
  const precision = config.precision ?? 0.5;
  const reducedMotion = config.reducedMotion ?? defaultReducedMotion;
  const autoStart = config.autoStart ?? typeof window !== "undefined";

  const isReducedMotion = () =>
    typeof reducedMotion === "function" ? reducedMotion() : reducedMotion;

  const settle = () => {
    value = target;
    velocity = 0;
    onUpdate(value);
    const callback = onRest;
    onRest = undefined;
    callback?.();
  };

  const cancel = () => {
    if (frame) cancelFrame(frame);
    frame = 0;
  };

  const advance = (seconds: number) => {
    if (seconds <= 0) return;

    const dt = Math.min(0.032, seconds);
    const stiffness = (2 * Math.PI / response) ** 2;
    const dampingCoefficient = 4 * Math.PI * damping / response;
    velocity += (-stiffness * (value - target) - dampingCoefficient * velocity) * dt;
    value += velocity * dt;

    if (Math.abs(velocity) < precision * 10 && Math.abs(value - target) < precision) {
      cancel();
      settle();
      return;
    }

    onUpdate(value);
  };

  const tick = (now: number) => {
    const elapsed = lastTime ? (now - lastTime) / 1000 : 1 / 60;
    lastTime = now;
    advance(elapsed);
    if (frame) frame = requestFrame(tick);
  };

  return {
    get value() {
      return value;
    },
    get velocity() {
      return velocity;
    },
    get target() {
      return target;
    },
    get moving() {
      return frame !== 0;
    },
    to(nextTarget, options = {}) {
      target = nextTarget;
      damping = options.damping ?? config.damping ?? 1;
      response = options.response ?? config.response ?? 0.4;
      onRest = options.onRest;
      if (options.velocity !== undefined) velocity = options.velocity;

      if (isReducedMotion()) {
        cancel();
        settle();
        return;
      }

      if (autoStart && !frame) {
        lastTime = 0;
        frame = requestFrame(tick);
      }
    },
    jump(nextValue) {
      cancel();
      value = nextValue;
      target = nextValue;
      velocity = 0;
      onRest = undefined;
      onUpdate(value);
    },
    stop() {
      cancel();
    },
    advance,
  };
}
