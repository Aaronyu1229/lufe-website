export type HomeCasesCopy = {
  readonly heading: readonly [string, string];
  readonly lead: string;
  readonly roads: readonly { readonly label: string; readonly title: string; readonly detail: string }[];
  readonly cards: readonly {
    readonly tags: readonly { readonly label: string; readonly variant: "sky" | "gold" }[];
    readonly num: string;
    readonly numLabel: string;
    readonly scalePrefix: string;
    readonly title: string;
    readonly painLine: string;
    readonly solutionLine: string;
    readonly route: { readonly from: string; readonly to: string };
  }[];
  readonly featuredLabel: string;
  readonly storyLabels: { readonly featured: string; readonly standard: string };
  readonly painHeading: string;
  readonly solutionHeading: string;
  readonly carousel: { readonly label: string; readonly previous: string; readonly next: string };
  readonly closeLabel: string;
  readonly allCases: string;
};

export const homeCasesZh: HomeCasesCopy = {
  heading: ["用數據判斷方向，", "用實戰調整做法"],
  lead: "在菲律賓，我們協助合作夥伴走過三條不一樣的路；每一條都先小規模驗證，再依數據調整、放大。",
  roads: [
    { label: "第一條", title: "從零開始", detail: "我們在菲律賓的當地夥伴，先做了一間英語教育機構；\n後來也從零做起一個連鎖手搖飲品牌" },
    { label: "第二條", title: "改了再帶過去", detail: "台灣的產品到了當地，改配方、改價格、改包裝，\n變成當地人願意掏錢的樣子" },
    { label: "第三條", title: "原封不動帶過去", detail: "一個台灣的美業品牌，什麼都不改，只做當地的行銷，看它站不站得住" },
  ],
  cards: [
    {
      tags: [{ label: "美妝個護", variant: "sky" }, { label: "北美", variant: "gold" }],
      num: "北美",
      numLabel: "已進入北美的量販通路",
      scalePrefix: "台灣羊奶皂品牌",
      title: "一塊台灣羊奶皂，怎麼讓北美買家看懂？",
      painLine: "產品本身沒有問題，卡住的是北美買家看不懂它",
      solutionLine: "配方不動，改的是說法與標示，再帶進北美的量販通路。",
      route: { from: "台灣", to: "北美" },
    },
    {
      tags: [{ label: "食品", variant: "sky" }, { label: "美國", variant: "gold" }],
      num: "FDA",
      numLabel: "先解決法規，再談上市",
      scalePrefix: "台灣魚鬆品牌",
      title: "魚鬆進美國，卡在哪一關？",
      painLine: "配方裡的成分與標示方式，在美國都可能過不了關",
      solutionLine: "先釐清 FDA 規範與成分、標示要調整的地方，再談包裝與上市。",
      route: { from: "台灣", to: "美國" },
    },
    {
      tags: [{ label: "飲品", variant: "sky" }, { label: "東南亞", variant: "gold" }],
      num: "十幾家",
      numLabel: "從零開始，已開放加盟",
      scalePrefix: "合作夥伴在菲律賓的手搖飲品牌",
      title: "一個手搖飲品牌，怎麼在菲律賓從零做到十幾家？",
      painLine: "當地手搖飲市場已有國際品牌，新品牌要找到自己的位置，還要守住配方。",
      solutionLine: "從台灣茶出發，改成當地的口味與價格，先開第一家驗證，再開放加盟。",
      route: { from: "台灣", to: "菲律賓" },
    },
  ],
  featuredLabel: "最常被問到",
  storyLabels: { featured: "看完整故事 →", standard: "閱讀案例 →" },
  painHeading: "卡點",
  solutionHeading: "怎麼解",
  carousel: { label: "案例", previous: "上一個", next: "下一個" },
  closeLabel: "關閉",
  allCases: "全部案例 →",
};
