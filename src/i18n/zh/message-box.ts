export type MessageBoxCopy = {
  readonly title: string;
  readonly close: string;
  readonly fields: {
    readonly name: { readonly label: string; readonly placeholder: string; readonly error: string };
    readonly contact: { readonly label: string; readonly placeholder: string; readonly error: string };
    readonly message: { readonly label: string; readonly placeholder: string; readonly error: string };
  };
  readonly submitError: string;
  readonly submit: string;
  readonly submitting: string;
  readonly submittedTitle: string;
  readonly submittedBody: string;
  readonly fallbackMailto: {
    readonly subject: string;
    readonly name: string;
    readonly contact: string;
    readonly message: string;
  };
};

export const messageBoxZh: MessageBoxCopy = {
  title: "聊聊你的產品",
  close: "關閉",
  fields: {
    name: { label: "你的姓名 *", placeholder: "怎麼稱呼你？", error: "請填姓名" },
    contact: { label: "聯絡方式（Email 或電話）*", placeholder: "方便我們回覆你", error: "請留 Email 或電話" },
    message: { label: "簡單說說你的產品跟想法 *", placeholder: "例如：我們做鳳梨酥，想看看美國有沒有機會⋯⋯", error: "請簡單說明一下" },
  },
  submitError: "送出失敗，請直接寄信給我們： ",
  submit: "送出，我們一個工作天內回覆",
  submitting: "送出中…",
  submittedTitle: "收到了！",
  submittedBody: "我們會在一個工作天內回覆你。",
  fallbackMailto: {
    subject: "LUFÉ 快速留言",
    name: "姓名",
    contact: "聯絡方式",
    message: "訊息",
  },
};
