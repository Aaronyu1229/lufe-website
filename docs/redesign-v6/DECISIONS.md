# lufe.world v6 改版：定案總表（2026-10-01）

這份是 v6 的**唯一權威**。來源：Aaron 在凍結快照上留的 71 則註記（`~/dev/lufe-v6/docs/redesign-v6/review/notes.json`，編號＝檔內 0 起算的索引）。
每一則都已經下了決定；文字類的新文案以反引號為準，一字不改貼進網站。工單在 `wo/`。

與舊文件衝突時，以本文件為準。明確推翻的舊決定：
- v5 D6（關於我們保留「不拿股權」「不賣課」）→ 整個「誠實的邊界」區塊刪除（#43）。
- wave2 共用規則第 4 條「不准數字跳動、不准裝飾性循環」→ v6 允許：數字跳動（只透過 `DelightLayer`）、內頁 hero 背景影片。其餘動效規則照舊。

---

## A. 逐則決定（71 則）

欄位：# ＝ notes.json 索引；WO ＝ 負責工單。長文案放在 §B，表內寫「見 B-x」。

| # | 頁面 | Aaron 要的（摘要） | 決定 | 新文案／設計規格 | WO |
|---|---|---|---|---|---|
| 0 | `/` 開場段 | 改成「企業出海」大邏輯，不要貨代物流視角 | 標題與內文整段重寫 | 見 B-1 | A |
| 1 | `/` hero 第 2 張副標 | 最後句號刪掉，全站一致 | 三張 hero 副標的句尾「。」都拿掉；全站依 §C-2 句號規則 | 第 2 張：`通路進入、展會佈局、數位集客 — 把產品放進對的通路，讓消費者找得到`；第 1 張：`這個市場真的要你嗎？市場評估、產品測試、決策框架 — 先把勝率搞清楚`；第 3 張：`出海不是報告寫得出來的。鹿飛站在躍馬企業 42 年的國際物流實戰上，幫你把產品適配跟通路銷售兩件事跑通` | A |
| 2 | `/` 四章引言 | 句尾句號刪掉 | 改寫並去句尾句號 | `四個章節，四個方案。可從第一章開始，也可一路走完；每一章獨立計價，每一章結束都能決定是否繼續` | A |
| 3 | `/` 四章卡片 | 每張加 icon | 每張卡左上加 40×40 方形 icon 底（`bg-gold/10`、`text-gold-d`、1px `border-gold/25`），icon 用 WO-0 的線條 icon 組：市場探查＝compass、寄賣＝trend、在地設立＝building、海外客服＝headset（與選單同一組）。卡片 hover：icon 底變 `bg-gold/15`、icon 往右 1px（只在 `(hover:hover)`） | 四張卡副標同時去句尾「。」：`在當地找真實消費者試用，確認誰會買、願意付多少`／`電商上架與產品證同步進行，用實際銷售驗證市場`／`公司註冊、人員招聘、FDA 證照轉移，建立當地據點`／（海外客服見 #4） | A |
| 4 | `/` 海外客服卡 | 改成「菲律賓是最大的海外客服」這類說法 | 改寫（用「重鎮」不用「最大」，避免無法查證的排名） | `菲律賓是全球英語客服外包的重鎮。由當地專業團隊接手英文客服，品質標準由台灣端制定與管理` | A |
| 5 | `/` 起手包價格條 | 刪掉 | 整個 `<p>`（7 萬＝1～2 萬＋5～6 萬…）刪除。價格只留在 FAQ 第 1 題與各方案頁 | — | A |
| 6 | `/` 北美連結 | 精簡、設計一下 | 改成一條細長的連結列：左側 28×28 `US` 字標（同選單），中間文字，右側箭頭；`border-y border-bd`、`py-4`、整列可點、hover 時箭頭右移 3px、文字變 `text-sky` | 文字：`已具規模、準備進入北美零售通路`；右側：`北美市場拓展 →` | A |
| 7 | `/` 躍馬區塊標題 | 改成「一家企業出海後半段旅程」 | 照改，兩行 | 第 1 行 `一家企業出海的`，第 2 行（金色）`後半段旅程` | A |
| 8 | `/` 躍馬區塊內文 | 用企業出海視角重新包裝 | 重寫 | 見 B-2 | A |
| 9 | `/` 三個數字 | 數字跳動、看起來在增長 | 已有跳動機制（`DelightLayer` 對 `data-lufe-counter`），快照是凍結的所以看不到。WO-0 加強：一律從 0 開始、固定 1600ms、ease-out-quart、`tabular-nums` 防抖；數字下方加一條 2px 金線，跳完時由左長到滿（`scaleX` 0→1，600ms）。reduced-motion：直接顯示終值、金線直接滿 | 數字與標籤不變 | 0 |
| 10 | `/` 案例區標題 | 改成「用數據與動態調整提升出海成功率」 | 重寫標題與引言 | 標題第 1 行 `用數據判斷方向，`，第 2 行（金色）`用實戰調整做法`；引言：`在菲律賓，鹿飛與合作夥伴走過三條不一樣的路；每一條都先小規模驗證，再依數據調整、放大` | A |
| 11 | `/` 三條路卡片 | 每張加 icon | 每張卡標籤上方加 40×40 icon 底（同 #3 規格）：第一條＝sprout、第二條＝sliders、第三條＝package。標題去句尾「。」 | 標題：`從零開始`／`改了再帶過去`／`原封不動帶過去`；內文去句尾「。」，其餘不變；三張卡下方那段改成 `三條路的成本、坑、時間都不一樣。\n第一次談，鹿飛會先確認企業比較像哪一條`（去第一人稱） | A |
| 12 | `/` 最新文章區標題 | 用詞專業一點 | 重寫 | 第 1 行 `出海實務洞察，`，第 2 行（金色）`從市場、通路到法規` | A |
| 13 | `/` 一份合約區標題 | 用更痛的視角 | 重寫標題、引言、說明段 | 見 B-3 | A |
| 14 | `/` 對比表列名 | 改成「顧問公司 - 出一份策略報告」排版，下面也是 | 每列拆成「類型（粗）＋ ` - ` ＋說明（一般字重、`text-tx2`）」；鹿飛那列說明用 `text-gold-d` | `顧問公司 - 出一份策略報告`、`貿易商 - 幫你把貨賣掉`、`客服外包 - 幫你接電話`、`貨代 - 把貨送到`、`鹿飛 LUFÉ - 一份合約走完`（資料改成 `{ type, desc }` 兩欄位；`aria-label` 仍組合成完整句） | A |
| 15 | `/` FAQ | 更好看、有設計感與動效 | 重新設計（文字不動，只去 takeaway 句尾「。」） | 見 C-4「首頁 FAQ」 | A |
| 16 | `/` 結尾 CTA 標題 | 專業一點的 CTA | 重寫 | 第 1 行 `從一次評估開始，`，第 2 行 `看清楚出海的下一步` | A |
| 17 | `/` 結尾 CTA 副標 | 專業、精簡、不要出現 Aaron | 重寫 | `提交需求後，24 小時內由鹿飛顧問團隊回覆；首次諮詢即說明費用與時程` | A |
| 18 | 全站頁尾一句話 | 怪怪的，整體調整 | 重寫 | `協助台灣企業在北美與東南亞落地：市場探查、寄賣、公司落地到海外客服，一個窗口走完出海第一年。以躍馬企業 42 年國際物流為後盾` | A |
| 19 | 頁尾連結 | 「躍馬企業 - 官網」 | 照改；外部連結的 `↗` 改成文字後一個 `aria-hidden` 的小箭頭（`text-[12px] opacity-60`），文字本身就是 Aaron 給的字 | `躍馬企業 - 官網` | A |
| 20 | 頁尾連結 | 「TradePilot - 線上報關工具」 | 照改（同上箭頭處理）。洞察選單裡的 TradePilot 項也統一成同一個名稱 | `TradePilot - 線上報關工具` | A |
| 21 | 選單 服務 | 刪「菲律賓 · 第一年四章」 | 刪。**五個選單的所有小標（MenuLabel）全部刪除**，含「另一條線」「一頁看完」「從這裡開始」「已經在海外」「我們怎麼判斷」「不確定從哪一段開始」「精選案例」「按產業、按市場」「按章節找」「其他內容」「最新文章」「認識鹿飛」「立場與網絡」「創辦人」。欄位頂端改用 `pt-[22px]` 對齊，不留空白佔位 | — | A |
| 22 | 選單 服務 | 刪「另一條線」 | 同 #21 | — | A |
| 23 | 選單 服務 | 刪「從這裡開始」 | 同 #21 | — | A |
| 24 | 選單 服務 | 刪「1～2 萬」 | 刪；選單裡一律不出現價格 | — | A |
| 25 | 選單 服務 | 副標都刪 | `MenuLink` 的 `desc` 全部移除（服務、進階、案例的標籤、洞察的「N 篇」、關於的說明都刪）；連結列改成 icon＋標題垂直置中、`py-3`、標題 15.5px | — | A |
| 26 | 選單 服務 右欄 | 深藍促銷卡太醜，重新設計 | 深藍實心卡（`FeatureLink`/`FeatureAction`）全部換成淺色「功能磚」，見 C-5 | 服務欄磚：標題 `不確定從哪裡開始？`、說明 `先做市場探查，用當地真實消費者的反應決定下一步`、動作 `看市場探查怎麼做 →`（`/services/product-testing`） | A |
| 27 | 選單 進階 | 副標也刪，統一 | 同 #25 | — | A |
| 28 | 選單 進階 右欄 | 同 #26 | 同 #26，三個右欄都換 | 進階欄磚：`免費初步評估`／`30 分鐘，用鹿飛方法論的五個問題，初步檢視出海條件`／`預約 30 分鐘 →`（開 MessageBox）。案例欄：保留產業／市場標籤，下面磚：`不確定比較像哪一條？`／`2 分鐘處境比對，找出最接近的案例`／`開始比對 →`（`/assess`）。關於欄：`創辦人專欄`／`跨境市場、通路與法規的第一手觀察`／`閱讀專欄 →`（`/about/aaron-yu`） | A |
| 29 | 導覽列 logo | 滑過／要點時鹿往旁邊倒一下再回來 | 做：滑鼠移入、鍵盤 focus、按下時，鹿圖示以底部中心為軸，傾倒再彈回 | 見 C-3「鹿 logo」 | 0（keyframes）＋A（套用） |
| 30 | `/about` hero | hero 改影片，每一頁 hero 都改影片（參考首頁） | 全站內頁 hero 改「海報圖＋背景影片」，見 §D 影片清單。例外：`/assess`（Aaron 在 #47 指定只要一張照片）、文章內頁（沒有 hero） | `/about` 用 V01 | 0 |
| 31 | `/about` 引言 | 副標多寫兩句 | 保留引言，下面加兩句副標（`lead`、`text-white/75`） | 引言不變：`「別人幫你開車，我們幫你找路。」`；新副標：`鹿飛協助台灣企業規劃並執行海外落地，從市場驗證、通路進入到在地團隊與客服，一個窗口串起出海的每一段。以躍馬企業 42 年國際物流為基礎，讓每一步都有實際的執行力` | B |
| 32 | `/about` 創辦人區塊 | 刪掉 | 刪 hero 裡 Aaron Yu 名字、職稱、「看了很多年…」、「看 Aaron 的文章 →」整塊。數字列保留 | — | B |
| 33 | `/about` 故事卡 01 | 改成「在躍馬企業看了很多年／躍馬做的是…」，最後不要句號 | 照 Aaron 給的開頭改寫，去掉第一人稱 | 見 B-4 卡 01 | B |
| 34 | `/about` 全頁 | 把「我」的詞改掉，整頁都是 | 全頁去第一人稱「我」、標題不用你我他；三張故事卡、團隊、網絡、理念、結尾 CTA 都改寫 | 見 B-4 | B |
| 35 | `/about` 團隊標題 | 不要寫成自己的公司，寫鹿飛或不用這些詞 | 重寫標題與說明 | 標題第 1 行 `小而精的核心團隊，`，第 2 行（金色）`連結全球在地節點`；說明：`鹿飛刻意維持精簡規模：每個案子由核心團隊親自把關，再由北美與東南亞的在地夥伴分工執行`；「台灣核心」卡說明：`負責合約、進度與對口窗口。從第一次諮詢到每一章執行，都由同一位窗口負責到底` | B |
| 36 | `/about` 團隊註腳 | 刪 | 刪「* 我們的定位是…」 | — | B |
| 37 | `/about` 合作流程標題 | 換專業抬頭 | 由 #39 吸收：整個區塊刪除 | — | B |
| 38 | `/about` 合作流程副標 | 換專業副標 | 由 #39 吸收：整個區塊刪除 | — | B |
| 39 | `/about` 合作流程 | 整層刪掉 | 刪 `#how-we-work` 整個 section 與 `howWeWorkSteps`；導覽選單「我們怎麼合作」一併拿掉（WO-A） | — | B（A 改選單） |
| 40 | `/about` 網絡橫幅 | 換成自轉地球儀 | 西貢夜景橫幅換成「深藍帶＋自轉地球儀」：用 `cobe`（MIT，零相依，npm 打包約 19KB、gzip 約 5KB，只在 `/about` 動態載入）。見 C-3「地球儀」 | 地球儀左側文字：三個數字 `30+` `國家與地區`／`500+` `出口案件`／`42` `年國際物流`（跳動數字）；下方一行：`台北・馬尼拉・洛杉磯・多倫多` | B |
| 41 | `/about` 網絡標題 | 專業用詞，不要你我他 | 重寫 | 標題第 1 行 `跨越三地的資源網絡，`，第 2 行（金色）`支援每一個出海計畫`；說明：`通路關係、在地夥伴與科技工具，整合為同一套跨境執行體系` | B |
| 42 | `/about` 理念 | 右邊放一張圖，左邊一條一條變精簡 | 改兩欄：左 4 條精簡句，右 4:5 圖片（`/images/about/philosophy-compass-1600.webp` 全不透明，`object-cover`，alt `羅盤與地圖`）。手機：圖在上（16:9）、清單在下 | 標題：`鹿飛相信的四件事`；四條：`出海是遲早的事：早一點、小一點開始，成本最低`／`先做最難的事：辦證、設公司、接客訴，做不到就直說`／`有立場：建議能讓企業長大的選項，而非最省事的`／`判斷有數據，做法有實績` | B |
| 43 | `/about` 誠實的邊界 | 刪掉 | 整個 `#what-we-dont-do` 刪除（推翻 v5 D6）；選單「誠實的邊界」一併拿掉（WO-A） | — | B（A 改選單） |
| 44 | `/about/aaron-yu` LinkedIn | 放這裡太唐突，整體思考 | hero 拿掉單獨的 LinkedIn 連結；改成 hero 底部一行作者資訊：`專欄文章 {N} 篇・最近更新 {YYYY-MM-DD}・` ＋ LinkedIn 小圖示連結（16px 線條 icon＋`LinkedIn`，`text-white/60 hover:text-white`，`rel="me noopener"`）。數字與日期由文章資料算出 | — | B |
| 45 | `/about/aaron-yu` 區塊標題 | 不要用我的名字 | 改 | `專欄文章` | B |
| 46 | `/about/aaron-yu` 副標 | 換視角寫 | 改；同步改該頁 metadata description 與文章頁作者卡（WO-D） | `躍馬企業國際物流背景出身，專注研究台灣企業如何在北美與東南亞市場落地` | B（D 改作者卡） |
| 47 | `/assess` | 全頁精簡；不要 Aaron 那一欄；一張照片＋簡述＋問題；結果是跳轉頁面 | 重做：一頁兩欄（左照片、右簡述＋三題直接作答），作答完跳到 `/assess/result?…`。見 C-6 | 圖片 alt `團隊討論出海策略`；標題：`看看你的處境，`／（金色）`跟哪個案例最像`；簡述：`三個問題，約 2 分鐘。比對鹿飛做過的四個案例，找出最接近的一個，以及當時的判斷方法` | B |
| 48 | `/cases` hero | 要影片（參考首頁） | 做 | V03 | 0 |
| 49 | `/cases` 標題 | 首頁已用別的詞，這裡調整 | 改（與首頁 #10 同主軸、不同字） | 第 1 行 `每一個判斷，`，第 2 行（金色）`都有案例可以對照`；引言：`在菲律賓與北美，鹿飛走過三條不一樣的出海路徑`＋換行＋`以下是其中幾個關鍵決策的完整過程` | C |
| 50 | `/cases` 三條路 | 需要 icon | 同 #11 icon（sprout／sliders／package），同規格 | 文字不變（去句尾「。」） | C |
| 51 | `/cases/bubble-tea` hero | 要影片，而且沒有全屏，參考首頁 | 四個案例內頁 hero 全部改成全屏 `.lufe-hero`＋影片（V04–V07），文字與數字置於下方 | — | C |
| 52 | `/cases/bubble-tea` 內文 | 加圖片、用故事方式寫 | 四個案例全部改成「故事章節＋穿插圖片」。事實與數字一律沿用原文，不新增 | 見 B-5（四個案例全文）＋C-7 版型 | C |
| 53 | `/cases/costco-health` hero | 換成影片 | 同 #51 | V04 | C |
| 54 | `/cases/costco-health` 內文 | 同另一個案例的處理 | 同 #52 | 見 B-5 | C |
| 55 | `/contact` | 太複雜，參考歐美網站簡化 | 重做成「精簡 hero＋左資訊右表單」兩欄。見 C-8 | 見 B-6 | B |
| 56 | `/field-notes` hero | 一樣 hero 動畫 | 做 | V08 | 0 |
| 57 | `/field-notes` 媒體 | 刪掉這區塊 | 刪「別人怎麼說我們」；hero 數字列同步拿掉「次媒體露出」 | — | C |
| 58 | `/field-notes` 夥伴 | 刪掉這區塊 | 刪「一起做事的夥伴網絡」；hero 數字列同步拿掉「個合作單位」（剩兩個數字） | — | C |
| 59 | `/insights` hero 右側精選卡 | 放這裡很奇怪 | 精選卡移出 hero；hero 改單欄＋影片（V09）。精選文章改放列表最上方一張橫幅大卡（只在「全部」時顯示）：桌機左圖 7／右文 5，手機上圖下文 | 標籤 `精選`；連結字 `閱讀全文 →`；空分類文字 `這個分類暫時還沒有文章`；hero 上方小字「洞察」刪除（v5 D1） | D（影片 0） |
| 60 | `/insights` 結尾 CTA | 參考 Apple，提案 | 新元件 `InsightCta`，`/insights` 列表底與文章底共用。見 C-9 | 標題 `把文章裡的方法，`／`用在自己的產品上`；說明 `30 分鐘初步評估，不收費。先判斷值不值得做，再談怎麼做`；三點 `第一次談完，給一頁建議`／`首次諮詢即說明費用與時程`／`24 小時內回覆`；按鈕 `聊聊你的產品 →`、`2 分鐘處境比對` | D |
| 61 | 文章內頁 | 右邊空；評估放其他文章（Apple）；加圖片穿插；用 Fable 加深內容 | 版型：加右側 sticky 欄（本文目錄＋延伸閱讀），見 C-10；圖片：用獨立資料檔插在章節之間，見 C-11；「用 Fable 加深知識含量」列為後續內容工作（§F），本次不做 | — | D |
| 62 | 文章 china-tariff-relocation-strategy | 同上 | 同 #61（模板層，全部文章套用；此 slug 目前已不在 articles.ts，由 301 或資料庫負責，不另處理） | — | D |
| 63 | 文章 first-time-export-checklist | 同上 | 同 #61 | — | D |
| 64 | 文章 go-no-go-framework | 同上 | 同 #61 | — | D |
| 65 | 文章 manila-beverage-first-store-90-days | 同上 | 同 #61 | — | D |
| 66 | 文章 overseas-exhibition-subsidy-115-upgrade | 同上 | 同 #61 | — | D |
| 67 | 文章 product-testing-best-practices | 同上 | 同 #61 | — | D |
| 68 | 文章 southeast-asia-ecommerce-2026 | 同上 | 同 #61 | — | D |
| 69 | `/resources` | 參考之前比較豐富的版本，不確定就說 | git 查過：9/29 前的 `/resources` 跟現在幾乎一樣（只差 hero），所以「豐富」改由「把真實內容攤出來」達成：兩張抽象卡換成兩個實質區塊。見 C-12；並列入「需要 Aaron 確認」 | 見 B-7 | D（影片 0） |
| 70 | `/resources/subsidies` 配對器 | 參考之前豐富的版本 | 恢復 9/29 前（`008d697~1`）配對器的豐富呈現＋計畫卡「適合／補助涵蓋」預設展開。見 C-13 | 文字沿用 `src/data/subsidies.ts`，新增標籤 `同時可以疊加申請` | D（影片 0） |

---

## B. 長文案（逐字照貼；`\n` ＝換行）

### B-1 首頁開場段（#0）
- 標題第 1 行：`出海不是把貨送出去，`
- 標題第 2 行（金色）：`是把生意做起來`
- 內文段 1（`whitespace-pre-line`）：
```
多數台灣企業的出海，是這樣開始的：

拿到一張海外訂單、參加一次展會、找到一位代理商。
產品上了架，當地消費者卻不知道它為什麼值得買；
證照、通路、售後一件一件冒出來，每一件都要老闆親自處理。
半年後，海外業務還停在「試試看」
```
- 內文段 2（粗體 `text-tx`）：
```
出海的成敗，不在第一張訂單。
在於市場、通路、團隊與服務，有沒有一套系統一起往前走。
鹿飛做的，就是這套系統
```

### B-2 首頁躍馬區塊內文（#8）
```
企業出海的前半段，是把產品送到海外——
這一段，躍馬企業做了 42 年、500 多個案件、30 多個國家。

後半段，才是真正的考驗：
產品要被當地市場接受，通路要談得下來，
證照、團隊與客服，要有人在當地接住。

多數企業的出海，不是輸在運輸，
而是輸在抵達之後沒有人接手。

鹿飛，是為了這後半段旅程而成立的
```
同區塊右側小段（只去句尾「。」與第一人稱）：標題 `鹿飛相信的事很簡單`；內文 `台灣市場不夠大，這件事做生意的人都知道。\n出去有難度，但出得去。\n鹿飛想做的，是讓第一步小到企業敢踏，\n後面的每一步，都有人在`

### B-3 首頁「一份合約」區（#13）
- 標題第 1 行：`顧問、貿易商、貨代、客服各管一段，`
- 標題第 2 行（金色）：`老闆成了唯一的窗口`
- 引言：`多數企業出海的一週，是這樣過的：`
- 星期一～四四格：文字不變
- 說明段：
```
每一家只負責自己那一段，進度卡住時，沒有人負責把它串起來。

鹿飛把市場探查、寄賣、落地、客服與國際物流，整合在同一份合約裡
一個窗口對接所有環節，企業只需要開一次會
```
- 表下一句：`沒有責任轉交，沒有窗口切換，抵達之後也有人接手`

### B-4 關於我們（#31–#43）
- 故事卡 01 `看到的問題`：
```
在躍馬企業看了很多年

躍馬做的是把貨送出去——42 年，500 多個出口案件，30 多個國家。
看的不是報表，是貨櫃出去以後的事：
有的品牌在當地開了第二家店，
更多的是幾個月後貨退回來，或者就沒有下文了
```
- 故事卡 02 `想通的事`：
```
差別從來不在物流，貨都有送到。
差別在抵達之後，有沒有人接著走：
證照有沒有人辦、貨架上有沒有人推、第一封英文客訴有沒有人回
```
- 故事卡 03 `做了什麼`：
```
台灣市場不夠大，出海是遲早的事；出去有難度，但出得去。
鹿飛把抵達之後最難的四件事，做成四個方案，
讓第一步小到企業敢踏，後面的每一步都有人在
```
- 故事卡圖片 alt：01 `鹿飛工作坊現場，分享跨境實戰觀察`；02 不變；03 `台視新聞訪問躍馬企業市場經理`
- 團隊、網絡：見 #35、#41 表格。團隊三卡其餘兩張說明只去句尾「。」。網絡四卡說明去句尾「。」。
- 理念：見 #42。
- 結尾 CTA：標題 `從一次對話，開始規劃出海`；說明 `首次諮詢不收費，先釐清方向，再決定下一步`；按鈕不變；圖片 alt `工作坊現場，陪學員實際操作`

### B-5 案例故事（#52、#54；四個案例全部）
規則：每個案例 4–5 章；每章＝章標題＋2–3 段＋（可選）一張圖。段落是長文閱讀，**保留句尾「。」**。所有數字與事實都來自 `src/data/cases.ts` 現有的 challenge／approach／result／keyDecisions／timeline，沒有新增。

**costco-health**
1. `一個在台灣站穩的品牌，在北美沒有人認識`
   - `小山羊保健品在台灣已有穩定市場。下一步想走進北美，卻發現每一關都陌生：FDA 註冊流程繁複、Costco 的供應商門檻極高，產品包裝與成分標示也必須全面合規。`
   - `在這之前，品牌已經試過兩次。第一次找貿易商，對方只處理物流，品牌在通路端完全沒有話語權；第二次找顧問，拿到一份 80 頁的市場報告，卻沒有任何執行。`
   - 圖：`costco-health-1`（膠囊與保健品瓶）alt `保健品膠囊與瓶裝產品`
2. `先確認市場要什麼，再決定產品怎麼改`
   - `鹿飛從市場評估開始，先釐清北美保健品市場的需求缺口，以及 Costco 會員的消費偏好。`
   - `第三週出現第一個關鍵判斷：要不要為北美修改配方？消費者測試顯示，台灣原味的甜度偏低，北美使用者普遍反映「不夠味」。調整配方會多花 3 週認證時間，但通路採購最在意首月數據——首月數字不漂亮，Costco 會直接取消供應商資格。與其搶那 3 週，不如用對配方。`
   - `配方微調、FDA 設施登記與標示在地化同步進行。第三個月，先在亞馬遜投放 500 件測試消費者反應，數據優於預期。`
   - 圖：`costco-health-2`（倉儲賣場保健品走道）alt `倉儲賣場的保健品貨架走道`
   - 這一章後面放「用到的方案」連結列（現有 `stageLinks`）
3. `走進採購會議室，把條件談到品牌撐得住`
   - `第四個月，鹿飛透過既有通路關係，直接把品牌帶進 Costco 採購評估流程。`
   - `原合約包含 60 天付款週期與 5% 行銷分攤。5% 行銷分攤在 Costco 屬業界標準，但 60 天付款會壓垮品牌的現金流。鹿飛以「首批訂單保證交期」作為籌碼，換到 45 天條款——這個差距，讓品牌未來 12 個月少借了 800 萬週轉金。`
   - 圖：`costco-health-3`（會議桌上的合約）alt `會議桌上討論合約條件`
4. `首批出貨遇上塞港，守住第一次的信任`
   - `第五個月，首批貨遇上美西港口塞港。延遲上架會影響往後所有合作機會；改走美東港口，又會再晚 2 週。`
   - `鹿飛的判斷是空運補救。毛利損失約 6%，但保住了「第一次合作就準時」的信任資本——這份信任，在第二批訂單的談判上遠比 6% 毛利值錢。`
   - 圖：`costco-health-4`（機場貨機裝載，黑白）alt `機場地勤正在裝載空運貨物`
5. `6 個月，120+ 家門市同步上架`
   - `從啟動到產品正式在北美 Costco 門市上架，前後 6 個月。首月銷量超過預期 40%，品牌知名度在北美華人社群迅速擴散。`
   - `目前已進入第二批訂單，並開始洽談加拿大 Costco。`

**electronics-tariff**
1. `25% 的額外關稅，把毛利打成負數`
   - `中美貿易戰讓這家電子大廠的美國出貨成本暴增，25% 的額外關稅直接吃掉利潤。工廠在大陸、客戶在美國，短期內無法完全搬遷產線。`
   - `客戶的降價要求已經讓毛利轉負，再不動，訂單就會流失——而手上幾乎沒有 6 個月以上的緩衝期。`
   - 圖：`electronics-tariff-1`（產線上的電路板）alt `產線上排列整齊的電子電路板`
2. `四個候選產地，用同一把尺打分`
   - `鹿飛先盤點所有可行的轉移方案：越南、印度、墨西哥、馬來西亞，從成本、時效、風險三個維度打分。`
   - `墨西哥有 USMCA 免關稅的優勢，但客戶需要的元件在當地供應鏈不足，等於要把整條供應鏈拉過去；印度長期潛力大，但基礎設施不成熟，時程與風險都太高。越南海運雖然略長，卻能靠直飛美西縮短整體時程，加上既有的組件廠生態，轉移成本最低。`
   - `最終建議將部分組裝線移至越南，利用 CPTPP 框架降低關稅負擔，並重新規劃物流路線：從越南直接出貨到美國西岸港口，減少中轉環節。`（CPTPP 一句待 Aaron 確認，見 §E-3）
   - 圖：`electronics-tariff-2`（西貢河上的貨櫃船）alt `胡志明市西貢河上的貨櫃船`
   - 這一章後面放「用到的方案」連結列
3. `寧可多付一段成本，也不讓訂單斷線`
   - `完全切換到越南有交期風險：新廠良率不穩時，客戶訂單就會中斷。鹿飛建議兩條產線並行 6 個月作為保險；短期成本較高，但任一條線出問題都有備援。`
   - `這個保守的選擇事後證明是對的——越南廠在第 3 個月確實發生一次品質事故。`
   - 圖：`electronics-tariff-3`（港口岸邊起重機）alt `港口岸邊的貨櫃起重機`
4. `4 個月建廠，一年省下 200 萬美金`
   - `越南產線在 4 個月內完成設置，並通過客戶驗廠。整體關稅成本降低 15%，物流時效反而縮短 3 天，年節省成本超過 USD 200 萬。`
   - `客戶的美國訂單不但保住，還因為交期優勢拿到了新的 SKU。`

**shoe-brand**
1. `200 萬行銷預算，半年只換回 50 萬營收`
   - `這家台灣皮鞋品牌在國內市場穩定，進入美國時卻發現：皮鞋在亞馬遜上競爭極為激烈，前 20 名賣家都是知名國際品牌；加上尺寸問題，皮鞋的退貨率高達 30%。`
   - `品牌投入了 200 萬台幣的行銷預算，半年只換回 50 萬營收，投入與回報完全不成比例。`
   - 圖：`shoe-brand-1`（工作檯上的手工皮鞋）alt `工作檯上的手工皮鞋`
2. `數據裡藏著一個被忽略的品項`
   - `鹿飛深入分析亞馬遜品類數據後發現：品牌原本只當作搭配商品的「機能襪」，搜尋量高、競品少、退貨率極低，平均售價 $15–$25 美金，正好落在良好價帶。`
   - `資料也顯示，皮鞋的 CAC 是襪子的 4.2 倍；而襪子因為回購率高，LTV 反而更高。`
   - 圖：`shoe-brand-2`（摺好的襪子）alt `摺疊整齊的襪子商品`
   - 這一章後面放「用到的方案」連結列
3. `兩小時的會議，把數字攤在桌上`
   - `品牌方一開始堅持先推皮鞋：「我們叫某某鞋業，不賣襪子很奇怪。」這是可以理解的情感反應。鹿飛用一場兩小時的會議，把 CAC 與 LTV 的數字攤在桌上，最後品牌方同意「先用襪子賺到進場票」。`
   - `第二個月，襪子正式上架。面對要不要降價 20% 衝銷量，鹿飛判斷問題不在價格，而在產品頁的說服力：襪子售價已在競品低位，再降只會進入血海。於是維持價格，加強 listing 優化，並推出組合包提升 AOV——效果更好，毛利也保住了。`
   - 圖：`shoe-brand-3`（待出貨的紙箱）alt `貼好標籤、準備出貨的紙箱`
4. `三個月，3 倍營收、4.7 星評價`
   - `襪子品類上線三個月內，營收達到皮鞋品類的 3 倍，退貨率僅 2%。品牌評價迅速累積到 4.7 星，為後續皮鞋品類建立了品牌信任基礎。`
   - `到了第六個月，皮鞋銷量也因為品牌認知累積而成長 120%。`

**bubble-tea**
1. `第三次進馬尼拉，前兩次都敗在夥伴`
   - `這個台灣珍奶品牌想進入菲律賓，卻面臨多重挑戰：當地已有大量珍奶品牌，包括日出茶太、COCO、麥吉、Tiger Sugar；原物料供應鏈不穩定，加盟模式也水土不服。`
   - `前兩次嘗試都因為找不到合適的在地夥伴而失敗——第一次被合資夥伴拿走了配方，第二次進了馬尼拉錯的區域。`
   - 圖：`bubble-tea-1`（櫃檯上的珍珠奶茶）alt `櫃檯上的珍珠奶茶`
2. `低價打不過規模，高端市場又太窄`
   - `鹿飛先做了菲律賓珍奶市場的深度調研：競品集中在低價帶，打不過日出茶太的規模；高端精品在馬尼拉市場又不夠大。中高端價位帶 P150–200 競品少，同時符合目標客群——25–35 歲白領——的消費能力。`
   - `消費者研究裡有一個關鍵訊號：這個客群對「台灣正統」有明確的 premium 感知，願意多付 20–30% 換取品質保證。`
   - `產品線也依菲律賓的消費習慣調整：甜度偏高，並加入 ube 等在地特色口味。`
   - 圖：`bubble-tea-2`（馬尼拉商業區街景）alt `馬尼拉都會區的商業大樓街景`
   - 這一章後面放「用到的方案」連結列
3. `第一家店開在 BGC，當成行銷投資`
   - `第二個月，透過鹿飛在馬尼拉的商會關係，從 6 組候選夥伴中篩選出 1 組可靠的合資夥伴。供應鏈同步建立：珍珠從台灣直送，茶葉在地採購。`
   - `第三個月，首家店開在 BGC。BGC 是租金最貴的中央商業區，但客群精準、媒體曝光度最高；第一家店是招牌，也是未來加盟商的參考樣板。鹿飛說服品牌方把這筆租金當成行銷預算，而不是單店損益。`
   - 圖：`bubble-tea-3`（Taguig／BGC 天際線）alt `Taguig 市 BGC 一帶的天際線`
4. `核心直營、外圍加盟`
   - `第四到第八個月，陸續開設 3 家直營門市，測試不同商圈。第六個月面臨擴張模式的選擇：純直營太慢、資本壓力大；純加盟品質容易失控。`
   - `最終採用混合模式：核心商圈直營，保留樣板與定價權；外圍以加盟快速鋪點，並用「首年績效評核」機制，過濾想賺快錢的加盟商。`
   - 圖：`bubble-tea-4`（手搖飲店內）alt `手搖飲門市內的櫃檯與店員`
5. `一年 10 家門市，單店營收是台灣的 1.2 倍`
   - `一年內開設 10 家門市，其中 6 家為加盟店。單店月均營收達到台灣門市的 1.2 倍，品牌在馬尼拉都會區建立了穩定的消費者基礎。`
   - `目前正在評估擴展到宿霧與達沃市。`

案例內頁其他文字：故事區標題不另加（每章自己有標題）；時間軸區標題 `從啟動到收尾的時間節奏` 不變；結尾 CTA 標題不變、說明改 `每個案子的起點都是一場對話。聊聊你的狀況，鹿飛會說明這個故事裡哪一段跟你最相關`；案例列表兩句 CTA 說明改 `先做 2 分鐘處境比對，鹿飛告訴你最像哪一個案例`、`聊聊你的產品，鹿飛先幫你看比較像哪一條路`；客戶證言**原文保留**（含「Aaron 的團隊」，那是客戶原話，見 §E-4）。

### B-6 聯絡頁（#55）
- hero 標題：`聯絡鹿飛`
- hero 副標：`出海規劃、合作洽談或媒體邀約，留下訊息，一個工作天內回覆`
- 左欄資訊（四列，icon＋標籤＋內容）：
  - `Email`：`aaron.yu@reborn.in`（mailto）
  - `地點`：`台北市｜線上會議為主`
  - `服務時間`：`週一至週五 09:00–18:00`
  - `回覆時間`：`一個工作天內`
- 左欄連結：`預約 30 分鐘諮詢 →`（沿用現有預約 mailto）、`快速留言 →`（開 MessageBox）
- 左欄合作區塊（`id="partners"`，頁尾連結要能跳到）：小標題 `合作洽談`；說明 `商會、同業顧問、在地服務商與物流夥伴，歡迎來信洽談合作。不收介紹費、不綁獨家`；連結 `寄信洽談合作 →`（沿用現有 mailto）
- 右欄表單：標題 `留下你的需求`；說明 `資訊越完整，第一次回覆越精準`；欄位、送出、成功、失敗訊息全部不變（`/api/lead` 流程一行都不准動）

### B-7 資源頁（#69）
- hero 標題第 1 行 `出海資源中心，`，第 2 行（金色）`補助與現場一次看完`
- hero 副標：`政府出海補助協助降低成本，活動與現場紀錄提供第一手市場觀察。兩條路都能直接銜接鹿飛的服務`
- 補助區標題：`政府出海補助`；說明：`貿易署、經濟部、中企署的出海相關計畫，鹿飛整理成適用對象、補助範圍與申請重點`；每列：編號、計畫名、主管機關、額度、時程；底部連結 `看完整補助整理 →`
- 現場區標題：`活動與現場紀錄`；說明：`加盟展、論壇、商會與客戶現場，北美與東南亞的第一手紀錄`；三張最新活動卡；底部連結 `看所有現場紀錄 →`
- 頁尾交叉導覽：`想看實際做過的案子？前往案例｜想了解市場趨勢？前往洞察`（兩個詞是連結）

---

## C. 全站規則與設計規格

### C-1 品牌語氣
- 以「鹿飛」為主詞說話，專業、精簡、肯定句。
- 不用第一人稱「我」。「我們」可在內文少量使用，**標題不用你／我／他**（#41、#35 等 Aaron 點名處一律改；其餘標題本次改到的也照這條）。
- 網站內文與標題不出現「Aaron」。**例外（保留）**：文章作者署名（`Aaron Yu・鹿飛 LUFÉ 創辦人`）、作者頁 `/about/aaron-yu` 的姓名標題與麵包屑、選單「創辦人專欄」磚的連結目標、Email 地址 `aaron.yu@reborn.in`、客戶證言原話、圖片檔名。
- 「企業出海」是主軸；躍馬企業只當背景實績（42 年／500+／30+），不當故事主角。

### C-2 句號規則（#1、#2、#33）
**拿掉句尾「。」**（只拿最後一個，句中的「。」保留）：
1. 標題下方的副標／引言（hero 副標、區塊說明 `lead`）
2. 卡片、清單、步驟、表格內的說明文字
3. 選單、頁尾、按鈕、連結、標籤、數字標籤、圖說
4. 行銷頁上的一般段落（首頁、關於、服務頁、案例列表、資源、補助頁的介紹段）

**保留句尾「。」**：文章內文、FAQ 答案、案例故事段落（B-5）、客戶證言、表單的錯誤／成功／系統訊息、隱私與法律說明、`metadata` description（SEO 不動）。

各工單在自己的檔案範圍內用這個指令找出來逐一判斷：
```
rg -n '。(["'\''`]|\s*<|\s*\}|\\n"?\s*\}?$|$)' <你的允許路徑>
```

### C-3 動效
- 一律可中斷、尊重 `prefers-reduced-motion`；只動 `transform`／`opacity`。
- **數字跳動**（#9、#40）：見 #9；只由 `DelightLayer` 負責，元件只標 `data-lufe-counter`。
- **鹿 logo**（#29）：`@keyframes lufe-deer-tilt`：0% `rotate(0)` → 28% `rotate(-14deg)` → 58% `rotate(5deg)` → 80% `rotate(-2deg)` → 100% `rotate(0)`，720ms，`cubic-bezier(.2,.8,.2,1)`，`transform-origin: 50% 90%`。觸發：logo 連結 `:hover`、`:focus-visible`、`:active`；動畫跑完才可再觸發（CSS `animation` 綁在 hover 狀態即可）。reduced-motion：無動畫。只套在鹿圖示 `<Image>`，不動文字。
- **地球儀**（#40）：`cobe`，canvas 480×480（手機 320×320，`aspect-square w-full max-w-[480px]`），`devicePixelRatio: min(2, dpr)`，`dark: 1`，`diffuse: 1.2`，`mapSamples: 16000`，`mapBrightness: 5`，`baseColor: [0.16, 0.22, 0.33]`，`markerColor: [0.83, 0.66, 0.36]`（金），`glowColor: [0.2, 0.28, 0.42]`，`theta: 0.25`；標記：台北 `[25.033, 121.565]` size 0.08、馬尼拉 `[14.599, 120.984]` 0.07、洛杉磯 `[34.052, -118.244]` 0.06、多倫多 `[43.653, -79.383]` 0.05；弧線（cobe 2 支援 `arcs`）：台北→馬尼拉、台北→洛杉磯、台北→多倫多，`arcColor` 金、`arcWidth 0.5`、`arcHeight 0.25`。自轉每幀 `phi += 0.0035`；可用指標拖曳旋轉（1:1，放開後速度以 0.95 衰減，Apple 動量原則）。區塊進入視窗才 `import("cobe")` 與建立；離開視窗或分頁隱藏時暫停；reduced-motion：不自轉、不載入拖曳，只畫一幀；WebGL 不可用時顯示原本的西貢夜景圖。canvas `aria-hidden`，旁邊文字是可讀內容。
- **影片 hero**：見 §D。

### C-4 首頁 FAQ（#15）
- 版型：左 4 欄 sticky 標題（不變）＋下面新增一行 `還有其他問題？` 與文字按鈕 `直接問鹿飛 →`（開 MessageBox）；右 8 欄問答列表。
- 每列：左邊大號題號（Inter 600，28px，`text-tx3/40`，展開時變 `text-gold-d`，顏色 200ms），題目 20px／600，右側 32×32 方框內「+」，展開時旋轉 45° 成「×」（`useSpring`，response 0.3、damping 1）。
- 展開內容：沿用 `Disclosure`（已是彈簧高度、內容在 SSR HTML）；takeaway 改成答案上方的一條金色左線引言（`border-l-2 border-gold pl-4`，17px／500）；答案本文不變。
- 展開列左側出現 3px 金線，`scaleY` 0→1（spring 0.35）；hover 列背景 `bg-cream/60`（只在 hover:hover）；按下 `scale(.995)`。
- 預設第 1 題展開（不變）。reduced-motion：無旋轉／縮放，直接切換。

### C-5 選單功能磚（#26、#28）
- 右欄背景維持 `bg-[rgba(245,242,236,.7)]`；磚：`bg-white border border-bd p-5`，方角。
- 結構：32×32 icon 方塊（`bg-gold/10 text-gold-d`）→ 標題 16px／650 → 說明 13.5px／`text-tx2`／行高 1.7 → 動作文字 14px／600／`text-sky`，箭頭 hover 右移 3px。
- 互動：hover `border-gold/50` 且 `translateY(-2px)`（只在 hover:hover，200ms）；按下 `scale(.985)`。不放圖片（隱藏面板不准預先下載圖片）。
- icon：服務＝compass、進階＝clock、案例＝target、關於＝pen。

### C-6 處境比對（#47）
- `/assess`：深藍底一頁。桌機兩欄（左 5：圖片 `/images/cases/cases-hero-collab-1600.webp`，4:5，`object-cover`，`loading="eager"` `fetchPriority="high"`；右 7：麵包屑、標題、簡述、三題）。手機：圖片 16:9 在上。
- 三題直接出現在簡述下方（沿用 `MatcherFlow`，不再需要「開始比對」按鈕）；刪：Aaron 區塊、斜體誠實聲明、四個案例小卡。`AssessQuestionStaticCopy`（SEO 用）保留。
- 第三題答完：`router.push("/assess/result?stage=…&blocker=…&market=…" + (case ? "&case=…" : ""))`。
- 新路由 `/assess/result`：靜態頁殼＋`Suspense` 內的 client 元件讀 `useSearchParams`（頁面仍要是 ○ static，不准變 ƒ）；參數不合法時顯示 `這份比對連結不完整` ＋ `重新比對 →`（`/assess`）。結果畫面沿用現有 `ResultScreen`（「重新比對」改成連到 `/assess`；「複製這份比對」現在複製的是真的結果網址）。`metadata` 加 `robots: { index: false }`。

### C-7 案例內頁版型（#51、#52）
- hero：`.lufe-hero` 全屏，`HeroBackdrop`＋影片；內容貼底：麵包屑、標籤、h1、summary（`text-white/75`）、三個數字（`data-lufe-counter`）。
- 故事區：白底；每章 `max-w-[680px]` 置中閱讀欄：章號（`01`，Inter 13px `text-gold-d`）＋章標題（`h3`）＋段落（17px／1.95）。章內圖片 `figure` 放大到 `max-w-[980px]`，3:2，`TieredImage` lazy，下方圖說 13px `text-tx3`（圖說＝alt 文字）。
- 「做過的判斷」區塊移除（內容已寫進故事）；`keyDecisions` 資料保留不刪。時間軸、證言、CTA、更多案例保留。
- 資料：`CaseStudy` 新增 `story: readonly { heading: string; paragraphs: readonly string[]; image?: { src: string; alt: string }; showStageLinks?: boolean }[]`；`challenge／approach／result` 保留（其他頁面與測試在用）。

### C-8 聯絡頁（#55）
- hero：`.lufe-hero` 但高度 `min-h-[56svh]`（不是全屏），影片 V11。
- 主區：白底，`grid lg:grid-cols-[5fr_7fr] gap-16`；左欄資訊列（icon 20px `text-gold-d`，標籤 13px `text-tx3`，內容 16px `text-tx`，列與列之間 `border-t border-bd py-5`）；右欄表單放在 `bg-cream p-6 md:p-10` 方塊內。手機：資訊在上、表單在下。
- 刪：三種管道卡片、商家資訊條、合作三格卡、兩張背景圖。

### C-9 洞察 CTA（#60，Apple 提案）
- 白底、上方一條 hairline（`border-t border-bd`），上下 `py-[96px]`，內容置中、`max-w-[760px]`。
- 標題 `display` 級縮小版（`clamp(32px,4.4vw,52px)`／650／`tracking-[-.022em]`），兩行。
- 說明 `lead`。三點：一行三欄（手機直排），每點 20px 線條 icon（file／receipt／clock）＋ 15px 文字，以細直線分隔。
- 按鈕：主 `bg-gold text-navy px-8 py-4`；次 `border border-navy/15 bg-white px-8 py-4 text-navy`；按下 `scale(.97)`（100ms）；hover 主按鈕箭頭右移 3px。
- 不做捲動淡入。共用元件放 `src/components/insights/InsightCta.tsx`。

### C-10 文章右欄（#61）
- ≥1024px：`grid lg:grid-cols-[minmax(0,720px)_280px] gap-16`，右欄 `sticky top-[96px] self-start`。
- 右欄上：`本文目錄`（13px／600 `text-tx3`），列出文章的 h2（靜態文章由 `parseStaticMarkdown` 取；資料庫文章用 regex 取 `<h2>` 文字並在渲染時補上 `id`）；目前段落以左側 2px 金線標示，金線位置用 `useSpring`（response 0.35、damping 1）在項目間滑動；點擊平滑捲動（reduced-motion 直接跳）。h2 需有穩定 `id`（`section-1`…）。
- 右欄下：`延伸閱讀` 三篇（同章節或同分類、新到舊、排除本文），每篇：72×48 縮圖（lazy）＋標題 14px（兩行截斷）＋日期。
- <1024px：目錄改成摘要下方的 `Disclosure`（`本文目錄`，預設收合，內容在 SSR HTML）；延伸閱讀移到文末，三欄卡片。
- 文末作者卡：副標換成 #46 新句；`看更多 Aaron 的文章 →` 改成 `看更多專欄文章 →`；結尾 CTA 換 `InsightCta`。

### C-11 文章穿插圖片（#61）
- 新資料檔 `src/data/articleInlineImages.ts`（**不准改 `src/data/articles.ts`**）：
  - `CATEGORY_INLINE_IMAGES: Record<Category, readonly [InlineImage, InlineImage]>`
  - `SLUG_INLINE_IMAGES: Partial<Record<string, readonly InlineImage[]>>`（目前空，留給之後逐篇指定）
  - `InlineImage = { src: string; alt: string; beforeH2: number }`；預設兩張：`beforeH2: 3`、`beforeH2: 5`（插在第 3、第 5 個 h2 之前；文章 h2 不夠就不插）。
- 只套用靜態文章；資料庫文章（HTML）不插。圖片 `TieredImage` lazy、16:9、`my-10`、全欄寬，下方圖說＝alt。
- 分類圖與 alt（§D-2 圖片清單）：菲律賓＝`菲律賓街頭的吉普尼`、`夜晚的 Taguig 市街景`；北美市場＝`超市貨架上的商品陳列`、`量販倉儲賣場的貨架走道`；出海實戰＝`港口堆疊的貨櫃`、`準備出貨的紙箱`；企業體質＝`桌上的筆記本與數據圖表`、`在筆記本上整理數據重點`；東南亞趨勢／印尼＝`手機上的購物應用程式`、`胡志明市西貢河上的貨櫃船`。

### C-12 資源頁（#69）
- hero 影片 V10。
- 補助區：表格式列表（桌機 5 欄：編號／計畫／主管機關／額度／時程；手機堆疊），每列連到 `/resources/subsidies#{slug}`，hover 列背景 `bg-cream`。資料來自 `SUBSIDIES`。
- 現場區：`ACTIVITIES` 前 3 筆（有圖、非 `tbd` 者優先）卡片，圖片 lazy。

### C-13 補助配對器（#70）
- 在 `SubsidyMatcher.tsx` 內自帶答題流程（**不准改共用的 `MatcherFlow`**，那是 /assess 在用）：
  - 頂部進度列：左 `第 {n} / 4 題`、右 `{百分比}%`，下方 2px 進度條（`useSpring`）。
  - 題目 `h3`＋ `sublabel` 永遠顯示；選項桌機 2 欄方格（`p-5`、方角），每個選項顯示 `label`（17px／600）與 `hint`（13px `text-white/55`）；選中金框＋金底 8%；選後 280ms 進下一題。
  - 第 2 題起顯示 `← 上一題`。
  - 所有題目文字仍要在 SSR HTML（非目前題目用 `sr-only` 或 `hidden` 但不卸載）。
  - 結果：主推卡（現有）＋小標 `同時可以疊加申請` ＋ 次推清單 ＋ `重新測試` ＋ `聊聊這個結果 →`。
- 計畫卡：「適合」「補助涵蓋」兩個 `Disclosure` 改 `defaultOpen`；其餘三個維持收合。

---

## D. 影片與圖片清單（全部 Pexels License，可商用、免標示）

### D-1 hero 影片（轉檔成 720p H.264；海報圖取自同一支影片）
| 代號 | 頁面 | 檔名（`public/videos/hero/`） | Pexels 頁面 | 下載網址 | 作者 |
|---|---|---|---|---|---|
| V01 | `/about` | `about-flight-720.mp4` | https://www.pexels.com/video/view-of-sunset-from-an-airplane-in-flight-3740041/ | https://videos.pexels.com/video-files/3740041/3740041-uhd_3840_2160_24fps.mp4 | K |
| V02 | `/about/aaron-yu` | 共用 V09 | — | — | — |
| V03 | `/cases` | `cases-manila-720.mp4` | https://www.pexels.com/video/pasig-city-manila-morning-19666015/ | https://videos.pexels.com/video-files/19666015/19666015-hd_1920_1080_30fps.mp4 | Cos Walks |
| V04 | `/cases/costco-health` | `case-costco-720.mp4` | https://www.pexels.com/video/time-lapse-video-of-a-person-in-the-grocery-9010436/ | https://videos.pexels.com/video-files/9010436/9010436-uhd_3840_2160_30fps.mp4 | Kindel Media |
| V05 | `/cases/electronics-tariff` | `case-electronics-720.mp4` | https://www.pexels.com/video/modern-high-tech-manufacturing-facility-overview-32386617/ | https://videos.pexels.com/video-files/32386617/13814647_3840_2160_30fps.mp4 | Usman AbdulrasheedGambo |
| V06 | `/cases/shoe-brand` | `case-shoe-720.mp4` | https://www.pexels.com/video/traditional-shoemaker-crafting-leather-shoes-37655310/ | https://videos.pexels.com/video-files/37655310/15962732_3840_2160_25fps.mp4 | Eleonora Vokueva |
| V07 | `/cases/bubble-tea` | `case-bubbletea-720.mp4` | https://www.pexels.com/video/woman-preparing-bubble-tea-in-chinese-cafe-32554437/ | https://videos.pexels.com/video-files/32554437/13882524_3840_2160_60fps.mp4 | LayG Traveller |
| V08 | `/field-notes` | `fieldnotes-conference-720.mp4` | https://www.pexels.com/video/aerial-view-of-datafest-2025-at-conference-center-34831818/ | https://videos.pexels.com/video-files/34831818/14764858_1920_1080_24fps.mp4 | TR Studio |
| V09 | `/insights`、`/about/aaron-yu` | `insights-notebook-720.mp4` | https://www.pexels.com/video/woman-writing-on-a-notepad-7710425/ | https://videos.pexels.com/video-files/7710425/7710425-uhd_4096_2160_25fps.mp4 | Kaboompics |
| V10 | `/resources` | `resources-taipei-720.mp4` | https://www.pexels.com/video/time-lapse-of-day-cycle-in-taipei-10394868/ | https://videos.pexels.com/video-files/10394868/10394868-uhd_3840_2160_30fps.mp4 | Timo Volz |
| V11 | `/contact` | `contact-laptop-720.mp4` | https://www.pexels.com/video/a-person-using-a-laptop-7252685/ | https://videos.pexels.com/video-files/7252685/7252685-hd_1920_1080_25fps.mp4 | Ivan S |
| V12 | `/resources/subsidies` | `subsidies-taipei-720.mp4` | https://www.pexels.com/video/time-lapse-video-of-taiwan-skyscrapers-9062102/ | https://videos.pexels.com/video-files/9062102/9062102-uhd_3840_2160_30fps.mp4 | Timo Volz |
| V13 | `/services` | 沿用現有 `hero-map-planning-720.mp4`（海報沿用 `hero-slide-2-poster-*`） | — | — | — |
| V14 | `/services/product-testing` | `chapter-research-720.mp4` | https://www.pexels.com/video/a-group-of-people-discussing-about-charts-and-graphs-in-a-business-meeting-3250235/ | https://videos.pexels.com/video-files/3250235/3250235-uhd_3840_2160_25fps.mp4 | fauxels |
| V15 | `/services/consignment` | `chapter-warehouse-720.mp4` | https://www.pexels.com/video/courier-boxes-in-the-racks-6169987/ | https://videos.pexels.com/video-files/6169987/6169987-uhd_3840_2160_25fps.mp4 | Tima Miroshnichenko |
| V16 | `/services/localization` | `chapter-storefront-720.mp4` | https://www.pexels.com/video/nighttime-urban-coffee-shop-scene-with-pedestrians-39681347/ | https://videos.pexels.com/video-files/39681347/16921090_3840_2160_25fps.mp4 | Daneswara Eka |
| V17 | `/services/call-center` | `chapter-callcenter-720.mp4` | https://www.pexels.com/video/a-woman-typing-while-talking-8865940/ | https://videos.pexels.com/video-files/8865940/8865940-hd_1920_1080_25fps.mp4 | Yan Krukau |
| V18 | `/services/north-america` | `chapter-retail-720.mp4` | https://www.pexels.com/video/shopping-aisle-perspective-on-supermarket-essentials-29376327/ | https://videos.pexels.com/video-files/29376327/12655226_3834_2160_30fps.mp4 | Dubang chang |
| V19 | `/services/optimize` | 沿用現有 `hero-highway-aerial-720.mp4`（海報沿用 `hero-slide-3-poster-*`） | — | — | — |
| V20 | `/services/methodology` | `methodology-whiteboard-720.mp4` | https://www.pexels.com/video/people-writing-on-a-whiteboard-6062485/ | https://videos.pexels.com/video-files/6062485/6062485-uhd_3840_2160_25fps.mp4 | Bonus Studio |

新增 17 支、每支 ≤2.5MB，合計約 35–40MB 進 git（見風險）。`/assess` 不放影片（#47 指定一張照片）。

### D-2 內文圖片（Pexels；下載 `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=2400`，33328957 是 `.png`）
| 用途 | 檔名 | Pexels ID／頁面 | 作者 |
|---|---|---|---|
| costco-health-1 | `public/images/cases/story/costco-health-1.jpg` | 17891275 https://www.pexels.com/photo/medicines-and-vitamin-supplements-in-capsules-17891275/ | Jonathan Borba |
| costco-health-2 | `…/costco-health-2.jpg` | 28846857 https://www.pexels.com/photo/warehouse-aisle-stocked-with-health-products-28846857/ | Natalia S |
| costco-health-3 | `…/costco-health-3.jpg` | 7875990 https://www.pexels.com/photo/a-man-holding-white-printer-paper-7875990/ | Kaboompics |
| costco-health-4 | `…/costco-health-4.jpg` | 33824584 https://www.pexels.com/photo/aircraft-cargo-loading-at-airport-in-black-and-white-33824584/ | Jonathan Borba |
| electronics-tariff-1 | `…/electronics-tariff-1.jpg` | 5554948 https://www.pexels.com/photo/production-line-of-computer-elements-5554948/ | Andrey Matveev |
| electronics-tariff-2 | `…/electronics-tariff-2.jpg` | 2144905 https://www.pexels.com/photo/two-cargo-ships-sailing-near-city-2144905/ | Quang Nguyen Vinh |
| electronics-tariff-3 | `…/electronics-tariff-3.jpg` | 36801012 https://www.pexels.com/photo/industrial-port-with-large-cranes-along-waterfront-36801012/ | HONG SON |
| shoe-brand-1 | `…/shoe-brand-1.jpg` | 5894239 https://www.pexels.com/photo/black-leather-shoes-on-white-table-5894239/ | Anna Shvets |
| shoe-brand-2 | `…/shoe-brand-2.jpg` | 9594142 https://www.pexels.com/photo/white-and-blue-socks-on-white-table-9594142/ | Ron Lach |
| shoe-brand-3 | `…/shoe-brand-3.jpg` | 4440800 https://www.pexels.com/photo/stacks-of-boxes-ready-for-delivery-4440800/ | Polina Tankilevitch |
| bubble-tea-1 | `…/bubble-tea-1.jpg` | 26904228 https://www.pexels.com/photo/dessert-in-a-disposable-cup-26904228/ | Theodore Nguyen |
| bubble-tea-2 | `…/bubble-tea-2.jpg` | 39294651 https://www.pexels.com/photo/modern-skyscrapers-in-pasig-metro-manila-39294651/ | Clarence Gaspar |
| bubble-tea-3 | `…/bubble-tea-3.jpg` | 12368762 https://www.pexels.com/photo/aerial-photography-of-city-buildings-12368762/ | Jeson Cabilic |
| bubble-tea-4 | `…/bubble-tea-4.png` | 33328957 https://www.pexels.com/photo/modern-bubble-tea-shop-with-staff-working-33328957/ | BI ravencrow |
| 文章：菲律賓 a | `public/images/insights/inline/ph-jeepney.jpg` | 36035924 https://www.pexels.com/photo/colorful-philippine-jeepneys-parked-outdoors-36035924/ | Kimy Moto |
| 文章：菲律賓 b | `…/ph-taguig.jpg` | 3214989 https://www.pexels.com/photo/aerial-photo-of-cars-on-road-during-night-3214989/ | Meo Fernando |
| 文章：北美 a | `…/na-grocery.jpg` | 16211537 https://www.pexels.com/photo/shelves-in-grocery-store-16211537/ | ha ha |
| 文章：北美 b | `…/na-warehouse.jpg` | 8377802 https://www.pexels.com/photo/an-aisle-of-a-retail-store-warehouse-8377802/ | Stacey Koenitz |
| 文章：出海實戰 a | `…/export-containers.jpg` | 33692749 https://www.pexels.com/photo/stacked-shipping-containers-in-a-port-33692749/ | Jan van der Wolf |
| 文章：出海實戰 b | `…/export-boxes.jpg` | 6169055 https://www.pexels.com/photo/brown-cardboard-boxes-on-a-concrete-ground-6169055/ | Tima Miroshnichenko |
| 文章：企業體質 a | `…/biz-charts.jpg` | 669613 https://www.pexels.com/photo/notebook-and-charts-669613/ | Lukas Blazek |
| 文章：企業體質 b | `…/biz-notes.jpg` | 8424447 https://www.pexels.com/photo/person-writing-on-white-paper-8424447/ | Pavel Danilyuk |
| 文章：東南亞 a | `…/sea-mobile.jpg` | 7661069 https://www.pexels.com/photo/close-up-shot-of-a-cellphone-on-white-surface-7661069/ | Eva Bronzini |
| 文章：東南亞 b | `…/sea-saigon.jpg` | 2144905（同 electronics-tariff-2 來源，另存一份） | Quang Nguyen Vinh |

---

## E. 需要 Aaron 確認（只列我沒辦法替你決定的：事實、金額、法規）

1. **補助資料可能過期**：`src/data/subsidies.ts` 第 2 項寫「預計 4–5 月開放」、第 4 項寫「2026/9/15 截止」，今天已 10/1；資源頁原本寫「4 個正在開放的計畫」。新文案已改成不說「正在開放」，但卡片上的金額與日期要你確認最新公告。
2. **資源頁「之前比較豐富的版本」**：git 裡 9/29 前的 `/resources` 跟現在幾乎一樣，我改用「把補助清單與現場紀錄直接攤出來」來做豐富；補助頁則已恢復 9/29 前的豐富版配對器。如果你指的是別的網站或版本，給我網址。
3. **電子業案例兩處說法**：(a) 雙線並行是「台灣＋越南」還是「大陸＋越南」？原資料兩種寫法都有，新故事暫寫「兩條產線並行」；(b)「利用 CPTPP 降低（對美）關稅」——美國不是 CPTPP 成員，這句是否改寫？故事暫時保留原句。
4. **Costco 客戶證言含「Aaron 的團隊」**：這是客戶原話，照規則保留原文；要改成「鹿飛的團隊」需要客戶同意，你決定要不要去問。

---

## F. 後續（不在本次工單）
- 用 Fable 逐篇加深文章知識含量與閱讀性（Aaron #61）：文章內文屬於部落格自動駕駛流程（PR #72 剛改寫全部文章），另開內容線處理；本次只做模板與圖片插入機制。
- `SLUG_INLINE_IMAGES` 逐篇挑專屬圖片（機制已備好，資料留空）。

## G. 工單與順序
| 工單 | 範圍 | 何時跑 |
|---|---|---|
| `wo/WO-0-shared.md` | 影片下載轉檔、`HeroBackdrop` 影片、全站 hero 接影片、線條 icon 組、數字跳動加強、鹿 logo keyframes | 第 1 輪，單獨 |
| `wo/WO-A-home-shell.md` | 首頁、導覽列與大選單、頁尾 | 第 2 輪，與 B 並行 |
| `wo/WO-B-about-contact-assess.md` | 關於、作者頁、聯絡、處境比對（含結果頁、地球儀） | 第 2 輪，與 A 並行 |
| `wo/WO-C-cases-fieldnotes.md` | 案例列表、四個案例故事頁、現場紀錄 | 第 3 輪，與 D 並行 |
| `wo/WO-D-insights-resources.md` | 洞察列表、文章模板（目錄／延伸閱讀／穿插圖／CTA）、資源、補助、服務頁句號 | 第 3 輪，與 C 並行 |
| `wo/WO-Z-integration.md` | 字型重建、全站文字／媒體／效能稽核 | 最後，單獨 |
共用規則：`wo/COMMON.md`。同時最多 2 個 Codex，路徑互不重疊。
