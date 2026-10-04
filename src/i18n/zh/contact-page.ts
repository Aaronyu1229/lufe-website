export type ContactPageCopy = {
  readonly home: string;
  readonly breadcrumb: string;
  readonly title: string;
  readonly lead: string;
  readonly scrollCue: string;
  readonly contact: { readonly email: string; readonly location: string; readonly locationValue: string; readonly hours: string; readonly hoursValue: string; readonly replyTime: string; readonly replyTimeValue: string };
  readonly form: { readonly title: string; readonly lead: string; readonly name: string; readonly namePlaceholder: string; readonly email: string; readonly company: string; readonly companyPlaceholder: string; readonly phone: string; readonly phonePlaceholder: string; readonly product: string; readonly productPlaceholder: string; readonly stage: string; readonly message: string; readonly messagePlaceholder: string; readonly submit: string; readonly submitting: string; readonly privacy: string };
  readonly stageLabels: readonly string[];
};

export const contactPageZh: ContactPageCopy = {
  home: "首頁", breadcrumb: "聯絡鹿飛", title: "聯絡鹿飛", lead: "出海規劃、合作洽談或媒體邀約，留下訊息，一個工作天內回覆", scrollCue: "往下看",
  contact: { email: "Email", location: "地點", locationValue: "台北市｜線上會議為主", hours: "服務時間", hoursValue: "週一至週五 09:00–18:00", replyTime: "回覆時間", replyTimeValue: "一個工作天內" },
  form: { title: "留下你的需求", lead: "資訊越完整，第一次回覆越精準", name: "姓名 *", namePlaceholder: "你的姓名", email: "Email *", company: "公司名稱", companyPlaceholder: "公司名稱", phone: "電話", phonePlaceholder: "09xx-xxx-xxx", product: "你的產品", productPlaceholder: "簡單描述你的產品或品牌", stage: "目前出海階段", message: "你想問什麼？ *", messagePlaceholder: "任何問題都可以，不確定也沒關係", submit: "送出表單", submitting: "送出中…", privacy: "我們不會把你的資料分享給任何第三方。" },
  stageLabels: ["還在觀望，想了解出海", "準備出海，需要方向", "已經在出海，想做更好", "其他"],
};
