import {
  BOUNDARIES_COPY,
  COMPANIONSHIP_COPY,
  DOUBLE_SCORE_COPY,
  EXAMPLES_CLOSING,
  EXAMPLES_INTRO,
  FIRST_MONTH_COPY,
  FOUNDATIONS_CLOSING,
  FOUNDATIONS_FOOTNOTE,
  METHODOLOGY_DECISIONS,
  METHODOLOGY_DIMENSIONS,
  METHODOLOGY_EXAMPLES,
  METHODOLOGY_FOUNDATIONS,
  ORIGIN_STORY,
  REPORT_DISCLAIMER,
  REPORT_OUTLINE,
  RULES_COPY,
  SCALE_INTRO,
  THIRD_MONTH_INTRO,
  type MethodologyDecision,
  type MethodologyDimension,
  type MethodologyExample,
  type MethodologyFoundation,
} from "@/components/services/methodology/content";

export type MethodologyContent = {
  readonly originStory: string;
  readonly examples: readonly MethodologyExample[];
  readonly examplesIntro: string;
  readonly examplesClosing: string;
  readonly firstMonthCopy: string;
  readonly thirdMonthIntro: string;
  readonly reportOutline: readonly string[];
  readonly reportDisclaimer: string;
  readonly scaleIntro: string;
  readonly dimensions: readonly MethodologyDimension[];
  readonly decisions: readonly MethodologyDecision[];
  readonly doubleScoreCopy: string;
  readonly rulesCopy: string;
  readonly companionshipCopy: string;
  readonly foundations: readonly MethodologyFoundation[];
  readonly foundationsClosing: string;
  readonly foundationsFootnote: string;
  readonly boundariesCopy: string;
};

export const methodologyContentZh: MethodologyContent = {
  originStory: ORIGIN_STORY,
  examples: METHODOLOGY_EXAMPLES,
  examplesIntro: EXAMPLES_INTRO,
  examplesClosing: EXAMPLES_CLOSING,
  firstMonthCopy: FIRST_MONTH_COPY,
  thirdMonthIntro: THIRD_MONTH_INTRO,
  reportOutline: REPORT_OUTLINE,
  reportDisclaimer: REPORT_DISCLAIMER,
  scaleIntro: SCALE_INTRO,
  dimensions: METHODOLOGY_DIMENSIONS,
  decisions: METHODOLOGY_DECISIONS,
  doubleScoreCopy: DOUBLE_SCORE_COPY,
  rulesCopy: RULES_COPY,
  companionshipCopy: COMPANIONSHIP_COPY,
  foundations: METHODOLOGY_FOUNDATIONS,
  foundationsClosing: FOUNDATIONS_CLOSING,
  foundationsFootnote: FOUNDATIONS_FOOTNOTE,
  boundariesCopy: BOUNDARIES_COPY,
};
