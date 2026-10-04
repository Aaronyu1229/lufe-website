import type { AboutPhotoSlotId } from "@/data/aboutPhotoSlots";

type AboutStoryChapterCopy = {
  readonly num: string;
  readonly label: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly stats?: boolean;
  readonly servicesLink?: boolean;
  readonly chartAfterParagraph?: number;
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    readonly maxTierWidth?: number;
    readonly position?: string;
  };
  readonly photoSlot?: AboutPhotoSlotId;
};

export type AboutPageCopy = {
  readonly home: string;
  readonly breadcrumb: string;
  readonly hero: {
    readonly title: readonly [string, string];
    readonly quote: string;
    readonly lead: string;
    readonly scrollCue: string;
  };
  readonly storyChapters: readonly AboutStoryChapterCopy[];
  readonly storyStats: readonly { readonly value: string; readonly label: string }[];
  readonly servicesLink: string;
  readonly freightRateChart: {
    readonly ariaLabel: string;
    readonly description: string;
    readonly rates: readonly { readonly label: string; readonly value: number; readonly unit: string }[];
  };
  readonly team: {
    readonly title: readonly [string, string];
    readonly lead: string;
    readonly roles: Record<"taiwan" | "philippines" | "northAmerica", { readonly title: string; readonly description: string }>;
  };
  readonly network: {
    readonly title: readonly [string, string];
    readonly lead: string;
    readonly cities: string;
    readonly networkCities: string;
    readonly focusMarkets: string;
    readonly fallbackImageAlt: string;
    readonly cards: Record<"northAmerica" | "southeastAsia" | "globalLogistics" | "technology", { readonly title: string; readonly description: string }>;
  };
  readonly beliefs: {
    readonly title: string;
    readonly items: readonly string[];
    readonly imageAlt: string;
  };
  readonly cta: {
    readonly imageAlt: string;
    readonly title: string;
    readonly body: string;
    readonly button: string;
  };
};

export const aboutPageZh: AboutPageCopy = {
  home: "首頁",
  breadcrumb: "關於我們",
  hero: {
    title: ["從貨櫃出發，", "陪台灣企業走完抵達之後"],
    quote: "「別人幫你開車，我們幫你找路。」",
    lead: "我們協助台灣企業在北美與東南亞落地：市場驗證、通路進入、在地團隊與客服，一個窗口串起出海的每一段。這個故事，要從躍馬企業說起",
    scrollCue: "往下看",
  },
  storyChapters: [
    {
      num: "01",
      label: "起點・躍馬企業",
      title: "43 年，把台灣的貨送到世界各地",
      paragraphs: [
        "躍馬做國際貨運承攬已經 43 年：報關、倉儲、海空運、最後一哩",
        "43 年下來，我們看到的不只是報關單和貨櫃，還有客戶的處境",
      ],
      stats: true,
      image: { src: "/images/about/about-port-1600.webp", alt: "貨櫃碼頭——躍馬 43 年的日常", position: "center 40%" },
      photoSlot: "PHOTO-SLOT-01",
    },
    {
      num: "02",
      label: "市場觀察",
      title: "貨送到了，客戶的日子卻一年比一年難",
      paragraphs: [
        "每一批貨送完，我們會打電話關心。聽到的，越來越不是物流的事：產品要怎麼在當地註冊、證要掛在誰名下；有的客戶，訂單變成一單有、一單沒有",
        "疫情那幾年最明顯。2021 年 9 月，一個 40 呎貨櫃的全球平均運價漲到 10,377 美元，是 2019 年的七倍多。很多客戶不是貨送不出去，是送出去已經不划算",
        "疫情過了，壓力沒有走。台灣 171 萬家中小企業，2024 年賣出 31.1 兆元，賣到國外的只有 3.2 兆——十塊錢裡大約只有一塊。島內的人口，從 2024 年起每個月都在減少",
      ],
      chartAfterParagraph: 1,
    },
    {
      num: "03",
      label: "關鍵洞察",
      title: "差別不在物流，而在抵達之後有沒有人接手",
      paragraphs: [
        "我們的客戶，跟著市場一起面臨轉型與生存的壓力。一次一次聊下去，看清楚一件事：貨都送得到。真正拉開差距的，是抵達之後有沒有人接著走——證照有沒有人辦、貨架上有沒有人推、第一封英文客訴有沒有人回",
        "這些事不在任何一家貨代的服務範圍裡，也不在躍馬的",
      ],
      image: { src: "/images/about/story-belief-compass-1600.webp", alt: "羅盤放在世界地圖上——有計畫的探索", maxTierWidth: 1600, position: "center" },
      photoSlot: "PHOTO-SLOT-03",
    },
    {
      num: "04",
      label: "鹿飛的成立",
      title: "守住本業很安全，但客戶需要我們再往前走一步",
      paragraphs: [
        "最穩的路，是把報關和運送做好，守住 43 年的本業。但客戶卡住的地方，已經不在港口了",
        "所以跳出躍馬既有的框架，成立了鹿飛：從那些痛點往前走——先看清海外市場，弄懂當地法規，找到通路，再陪你落地、接客服。四件最難的事，做成四個方案：市場探查、寄賣、公司落地、海外客服",
        "躍馬是我們的後盾：躍馬把貨送到，鹿飛讓貨在當地被買走",
      ],
      servicesLink: true,
      image: { src: "/images/about/aaron-news-interview-1080.webp", alt: "台視新聞訪問躍馬企業市場經理", maxTierWidth: 1080, position: "42% center" },
    },
  ],
  storyStats: [
    { value: "43", label: "年國際物流・躍馬企業" },
    { value: "500+", label: "出口案件・躍馬企業" },
    { value: "30+", label: "國家與地區・躍馬物流網絡" },
  ],
  servicesLink: "看四個方案 ",
  freightRateChart: {
    ariaLabel: "2019 與 2021 年 40 呎貨櫃全球平均運價比較",
    description: "每個 40 呎貨櫃，全球平均運價",
    rates: [
      { label: "2019 年平均", value: 1420, unit: "美元" },
      { label: "2021 年 9 月高點", value: 10377, unit: "美元" },
    ],
  },
  team: {
    title: ["讓台灣企業出海，少一點害怕，", "多一點把握"],
    lead: "這是成立鹿飛的原因。做法是把出海拆成小步：先花 1～2 萬看市場反應，再決定要不要往下走。所以第一次談，只問問題；有時候會建議你再等等，那也是一種答案",
    roles: {
      taiwan: { title: "台灣核心", description: "合約、進度、對口窗口都在台灣，從第一次評估到最後一章，你只需要找同一個人。要出的貨，交給躍馬報關、運送——那是我們 43 年的本業" },
      philippines: { title: "菲律賓合作夥伴", description: "貨到了馬尼拉，接手的是一群在當地做了多年的人：他們經營英語教育機構與連鎖餐飲，把一個台灣手搖飲品牌從一家做到十幾家。市場探查的面板、落地的文件與跑腿、海外客服的人手，都從這裡出來" },
      northAmerica: { title: "北美團隊", description: "另一條路通往北美。當地團隊做研究、跑展覽、引進買家、上談判桌，正陪一個台灣魚鬆品牌走美國的第一關。北美通路由他們執行，台灣這邊的窗口不換" },
    },
  },
  network: {
    title: ["跨越三地的資源網絡，", "支援每一個出海計畫"],
    lead: "通路關係、在地夥伴與科技工具，整合為同一套跨境執行體系",
    cities: "台北・馬尼拉・洛杉磯・紐約・舊金山・拉斯維加斯",
    networkCities: "資源網絡城市",
    focusMarkets: "關注市場：新加坡・吉隆坡・曼谷・胡志明市・雅加達・宿霧",
    fallbackImageAlt: "西貢夜景",
    cards: {
      northAmerica: { title: "北美", description: "北美團隊：研究、展覽、買家、談判" },
      southeastAsia: { title: "東南亞", description: "菲律賓合作夥伴：教育機構、連鎖餐飲、客服團隊、律師行、持證進口商" },
      globalLogistics: { title: "全球物流", description: "躍馬企業 43 年國際貨運承攬：報關、倉儲、海空運、最後一哩" },
      technology: { title: "科技工具", description: "自主開發的 TradePilot 關稅查詢工具，2,400+ 用戶使用中。用科技降低跨境的資訊門檻" },
    },
  },
  beliefs: {
    title: "鹿飛相信的四件事",
    items: [
      "出海是遲早的事：早一點、小一點開始，成本最低",
      "先做最難的事：辦證、設公司、接客訴，做不到就直說",
      "有立場：建議能讓企業長大的選項，而非最省事的",
      "判斷有數據，做法有實績",
    ],
    imageAlt: "羅盤與地圖",
  },
  cta: {
    imageAlt: "工作坊現場，陪學員實際操作",
    title: "下一章，從你的產品開始",
    body: "首次諮詢不收費，先釐清方向，再決定下一步",
    button: "聊聊你的產品 →",
  },
};
