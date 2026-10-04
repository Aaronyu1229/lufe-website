export type LeadErrorsCopy = {
  readonly invalidForm: string;
  readonly quick: {
    readonly name: string;
    readonly contact: string;
    readonly message: string;
  };
  readonly contact: {
    readonly name: string;
    readonly email: string;
    readonly emailInvalid: string;
    readonly message: string;
  };
  readonly waitlist: {
    readonly name: string;
    readonly email: string;
    readonly emailInvalid: string;
    readonly monthlyVolume: string;
    readonly monthlyVolumeInvalid: string;
  };
  readonly maxLength: {
    readonly name: string;
    readonly contact: string;
    readonly email: string;
    readonly phone: string;
    readonly company: string;
    readonly product: string;
    readonly stage: string;
    readonly message: string;
    readonly currentHandler: string;
  };
};

export const leadErrorsZh: LeadErrorsCopy = {
  invalidForm: "表單格式不正確",
  quick: {
    name: "請填姓名",
    contact: "請留 Email 或電話",
    message: "請簡單說明一下",
  },
  contact: {
    name: "請填寫姓名",
    email: "請填寫 Email",
    emailInvalid: "Email 格式不正確",
    message: "請填寫你的問題",
  },
  waitlist: {
    name: "請填寫品牌名稱",
    email: "請填寫 Email",
    emailInvalid: "Email 格式不正確",
    monthlyVolume: "請選擇每月客訊量",
    monthlyVolumeInvalid: "每月客訊量不正確",
  },
  maxLength: {
    name: "姓名不可超過 100 字",
    contact: "聯絡方式不可超過 100 字",
    email: "Email 不可超過 150 字",
    phone: "電話不可超過 100 字",
    company: "公司名稱不可超過 100 字",
    product: "產品不可超過 200 字",
    stage: "出海階段不可超過 60 字",
    message: "訊息不可超過 3000 字",
    currentHandler: "現在誰在接不可超過 100 字",
  },
};
