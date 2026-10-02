# lufe.world v6 第三輪：定案總表（2026-10-02）

來源：Aaron 在改版後網站（`redesign/v6` 頭 `65de4da` 的快照）留的 **28 則第三輪註記**（`after-notes-r3-0948.json`）。編號 1–28 依「頁面路徑 → 建立時間」排序（id 對照見表末）。註記就是寫在現行程式碼上，選取器與片段都對得上。

本文件補充、不取代 `../DECISIONS.md`（第一輪）與 `../round2/DECISIONS-R2.md`（第二輪）。品牌語氣、句號規則、方角、品牌色、字型守門照舊。三份衝突時，**以本文件為準**。
新文案以反引號為準，一字不改貼進網站（`\n`＝換行）。工單在 `wo/`。

Aaron 在對話裡另外拍板的三件事（本文件已照辦）：
1. 全站跳動數字統一照首頁的做法，但更慢（約 2.5 秒、先快後慢），捲到才開始，減少動態設定直接顯示終值；首頁「後半段旅程」的數字要看得到在跳。
2. 首頁「後半段旅程」段落用 A 案：拿掉所有躍馬，只講鹿飛。
3. 註記裡說「其他頁面也要／一樣／套用／有類似的都要處理／每一頁」的，一律是**全站規則**，連還沒看過的頁面（方法論、北美、優化、市場探查、所有文章）都套用。優化頁之後會照 Aaron 自己的規格整頁重寫，現在只做最小程度的全站規則套用。

---

## 0. 第三輪全站規則（G-1 ～ G-9）

### G-1 hero 影片播放速度一致（#5）
- 每支內頁 hero 影片設定自己的 `playbackRate`，讓體感速度跟首頁一致。首頁三張輪播的速度**不動**（1.25／1.0／1.0）。
- 量法（可重做）：每支影片縮成 320×180 灰階，用 ffmpeg `tblend=difference` 算「每秒畫面變化量」的中位數 m。基準 75＝首頁第 2 張（地圖規劃，1.0 倍速），剛好介於第 1 張（140.8×1.25）與第 3 張（43.4）之間。
- 公式：`rate = clamp(取到 0.05, √(75 / m), 0.6, 1.25)`；跟首頁共用同一支影片的頁面（服務總覽、優化）直接用首頁的速度。開根號是因為畫面差值對「快慢感」不是線性；上下限避免慢動作或快轉感。

| 頁面 | 影片 | m | 設定值 |
|---|---|---|---|
| `/about` | about-flight | 116.4 | `0.8` |
| `/about/aaron-yu`、`/insights` | insights-notebook | 34.6 | `1.25` |
| `/cases` | cases-manila | 7.4 | `1.25` |
| `/cases/costco-health` | case-costco（縮時，275 個跳格） | 836.9 | `0.6`（下限） |
| `/cases/electronics-tariff` | case-electronics | 45.0 | `1.25` |
| `/cases/shoe-brand` | case-shoe | 17.3 | `1.25` |
| `/cases/bubble-tea` | case-bubbletea | 14.9 | `1.25` |
| `/field-notes` | fieldnotes-conference | 158.3 | `0.7` |
| `/resources` | resources-taipei | 79.0 | `1.0` |
| `/resources/subsidies` | subsidies-taipei | 41.8 | `1.25` |
| `/contact` | contact-laptop | 31.5 | `1.25` |
| `/services` | hero-map-planning（同首頁第 2 張） | 74.9 | `1.0` |
| `/services/optimize` | hero-highway-aerial（同首頁第 3 張） | 42.6 | `1.0` |
| `/services/product-testing` | chapter-research | 128.6 | `0.75` |
| `/services/consignment` | chapter-warehouse | 15.7 | `1.25` |
| `/services/localization` | chapter-storefront | 33.3 | `1.25` |
| `/services/call-center` | chapter-callcenter | 28.5 | `1.25` |
| `/services/north-america` | chapter-retail | 301.6 | `0.6`（下限） |
| `/services/methodology` | methodology-whiteboard | 111.3 | `0.8` |

### G-2 hero 不放數字（#6、#18、#19）
所有頁面的 hero（全屏 `.lufe-hero`）**不出現任何數字列／統計**，也不放 `data-lufe-counter`。本輪要拿掉的：`/about`、`/field-notes`、`/insights`、`/resources/subsidies`、四個案例內頁（案例數字移到 hero 下方的「成果」帶，見 G-9）。價格、日期不在 hero 裡，不受影響。

### G-3 內頁 hero 版型一致（#15、#23）
除首頁、文章內頁之外，每個 hero 一律：
- `section.lufe-hero bg-navy text-white`（全屏，不加 `min-h-*` 覆寫）＋ `HeroBackdrop`（有影片就帶影片）＋ `ScrollCue`。
- 內容容器：`lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]`。
- 麵包屑一定有：`nav aria-label="Breadcrumb"`，`mb-7 flex flex-wrap gap-2 text-[13px] text-white/60`，分隔 `/` 為 `text-white/30`，目前頁 `text-white/75`。
- 標題一律 `h1 mb-6 max-w-[880px] text-white`（不再混用 `.display`），第二行金色用 `<br /><span className="text-gold">`。
- 副標一律 `lead max-w-[640px] !text-white/75`；按鈕列在副標下方 `mt-9`。
- 標籤（案例的產業／市場、章節名）放在 h1 上方 `mb-4`。

### G-4 跳動數字（Aaron 拍板 1、#1）
- 只有標了 `data-lufe-counter` 的元素會跳（不再自動抓所有 `.num`——這正是案例時間軸第 5 張卡顯示「0」的原因，見 #14）。
- 從 0 開始、2500ms、ease-out（`1-(1-t)^3`）、元素有一半進入畫面才開始、每個只跳一次、`tabular-nums` 加最小寬度防抖。
- 支援小數與符號：`4.7★`、`1.2x`、`-15%`、`$200萬`、`+40%`、`120+` 都要正確從 0 跳到終值（小數位數照原字串）。
- 減少動態：直接顯示終值。
- 本輪會跳的位置：首頁「後半段旅程」三個數字、案例列表卡大數字、案例內頁「成果」帶、關於頁網絡區三個數字。

### G-5 滑動元件的質感動效（#14）
全站所有「可左右滑」的元件（`Carousel`：首頁三條路、案例時間軸、關於頁故事；原生橫向滑動：服務總覽四章磚與方法論範例在手機上）統一升級，參考 Apple／歐美產品頁：
1. **拖曳 1:1、放手帶慣性、吸附到最近一張**（既有），放手時若是甩動（速度 >500px/s）用 damping 0.85 的彈簧，輕輕過衝一點再停；否則 damping 1。
2. **焦點層次**：完全在視窗內的卡片 `opacity 1、scale 1`；被裁到的卡片依被裁比例淡到 `opacity .45`、`scale .97`，跟著拖曳每幀連續變化。
3. **內層視差**：卡片裡標了 `data-carousel-parallax` 的圖片，依卡片與視窗中心的距離反向平移 6%（圖片預先放大 1.12 倍避免露邊）。
4. **進度條**：軌道下方一條 2px 細軌（淺底 `bg-bd`、深底 `bg-white/15`），金色滑塊長度＝可視比例、位置跟著捲動。旁邊顯示 `01 / 05`（13px、等寬數字）。
5. **箭頭按鈕**：按下 `scale(.94)`、滑過邊框變金（只在可滑鼠的裝置）；深底版本為透明底白字。
6. 只動 `transform`／`opacity`；減少動態：無視差、無淡化縮放、箭頭與鍵盤直接跳到位，拖曳仍 1:1 但放手直接吸附。

### G-6 不要連接線、icon 一律線框（#27、#28）
- 流程步驟之間的連接線全部刪除（`.lufe-step-icon::after` 與 `--lufe-step-progress`）。服務總覽四章磚頂端的時間軸細線＋金色方點也一起刪。
- **保留**：章節頁上方的「章節列」（四章導覽）連接線——那是 Aaron 第二輪 #7 指定要的導覽動效，不是流程裝飾。
- icon 不要實心：icon 外框一律「1px 線框＋透明底」，淺底 `border border-gold/40 text-gold-d`，深底 `border border-gold/40 text-gold`；不再用 `bg-gold/10` 之類的淡色底，也不用實心底（`bg-gold text-navy`、`bg-navy text-white`）。到達／選取狀態改成 `border-gold-d`（深底 `border-gold`）＋同色 icon，不填色。編號方塊（時間軸、流程、比對選項）同此規則。
- icon 本身只用線條（stroke），不用 `fill`。
- 按鈕（`聊聊你的產品 →` 這類金底按鈕）、徽章（`2027 Q1 首批`）不是 icon，不受影響。

### G-7 全站只有一種 FAQ（#21、#22、#26）
- 全站 FAQ 一律用共用 `faq/*`：大題號 `01`、題目、展開內容；有 takeaway 就顯示金線重點句。
- 動效改「安靜版」：拿掉左側金線長出動畫、拿掉整列滑過底色與按下縮放；高度用 damping 1、response 0.32 的彈簧；內容只做淡入（opacity 跟著高度進度）；＋ 轉 45° 變 ×；題號顏色瞬間切換。全部預設收合（方法論量尺照 v2.1 稿第一題展開，不受影響）。
- 套用：首頁、服務總覽、五個章節頁、優化、補助頁（原本是另一種 `Disclosure` 樣式，改掉）、所有文章（原本是沒編號的清單，改成同一套並有編號）。

### G-8 部落格文章（#20、#21、#22）
- 每篇文章內頁**只有一張圖**：標題下方的封面圖。章節之間的穿插圖機制整個刪除（`articleInlineImages.ts`、`public/images/insights/inline/` 都刪）；側欄與手機版的「延伸閱讀」改成純文字列。作者小頭像（32px／96px）不算內容圖片，保留。
- 資料庫文章（自動發文）內文裡的 `<img>`／`<figure>` 在渲染前移除，一律顯示封面；沒有封面才用內文第一張圖當封面。
- 文章 FAQ 用 G-7 同一套，有編號。
- 全部文章套用（模板層），`src/data/articles.ts` 不動。

### G-9 案例內頁 Apple 版型（#12、#13）
四個案例同一版型：全屏影片 hero（無數字）→ 白底「成果」帶（三個大數字跳動）→ 故事章節（桌機左側 sticky 章節標題、右側內文）→ **只有兩張圖**，以寬幅「畫面停頓」穿插 → 時間軸（G-5 動效）→ 引言 → CTA → 更多案例。規格見 §C-1。

---

## A. 逐則決定（28 則）

| # | 頁面 | Aaron 要的（摘要） | 決定 | 新文案／設計規格 | WO |
|---|---|---|---|---|---|
| 1 | `/` 後半段旅程數字 | 要動態數字 | 照 G-4 讓數字看得到在跳。**但原本三個數字（42+／500+／30+）是躍馬的實績**，依拍板 2 不能掛在鹿飛名下 → 換成鹿飛案例頁上已公開的三個成果數字，每個連到該案例；上方加一行小字說明來源。若 Aaron 確認案例不能算鹿飛實績，整列刪除（§E-1） | 小字：`鹿飛案例成果`；數字／標籤：`120+`／`家北美 Costco 門市同步上架`（連 `/cases/costco-health`）、`10`／`家馬尼拉門市，一年內開出`（連 `/cases/bubble-tea`）、`3x`／`營收成長，皮鞋品牌轉型襪子`（連 `/cases/shoe-brand`） | B |
| 2 | `/` 後半段旅程段落 | 整頁沒提躍馬，突然提很怪 | A 案：段落拿掉躍馬，只講鹿飛 | 見 §B-1 | B |
| 3 | `/` 三條路下方 | 刪掉 | 刪 `三條路的成本、坑、時間都不一樣。…` 整段 `<p>` | — | B |
| 4 | `/` 一份合約區 | 刪掉 | 刪 `沒有責任轉交，沒有窗口切換，抵達之後也有人接手` 整段 `<p>` | — | B |
| 5 | `/about` hero | 每頁 hero 影片速度參考首頁，全站調 | 全站規則 G-1（每支影片設定 `playbackRate`，表在 G-1） | — | 0 |
| 6 | `/about` hero 數字 | 刪掉這層 | 刪 hero 三個數字；並定為全站 G-2 | — | A |
| 7 | `/about` 網絡城市 | 寫錯了，沒有多倫多 | 照改 | `台北・馬尼拉・洛杉磯・紐約・舊金山・拉斯維加斯` | A |
| 8 | `/about` 地球儀 | 國家多元一點，不然單調 | 兩種標記：金色＝六個資源網絡城市（台北連到其他五城的弧線）；天藍小點＝六個關注市場（不畫弧線，避免看起來像辦公室）。下方加圖例。座標與尺寸見 §C-2 | 圖例：`資源網絡城市`、`關注市場：新加坡・吉隆坡・曼谷・胡志明市・雅加達・宿霧`（關注市場清單請 Aaron 確認，§E-2） | A |
| 9 | `/about/aaron-yu` 文章列表 | 需要分類按鈕，參考其他頁 | 沿用 `/insights` 的 `Segmented` 篩選列：`全部`＋該作者文章實際有的分類（依卡片上顯示的分類），每顆帶篇數，切換有 FLIP 動畫、網址同步 `?cat=`；所有卡片都在伺服器 HTML | 按鈕字＝分類名本身（`菲律賓`、`北美市場`、`出海實戰`、`企業體質`、`東南亞趨勢`、`印尼`，只顯示有文章的）；`全部` | A |
| 10 | `/assess` | 圖片放法怪，整體思考 UI/UX | 重做：上方標準全屏 hero（同一張照片當背景，不放影片，G-3）→ 白底專心作答區（置中 860px、三段進度條、淺色選項卡）→ 下方「比對範圍」四個案例小卡。見 §C-3 | hero 按鈕 `開始比對 ↓`；下方標題 `會和這四個案例比對` | A |
| 11 | `/cases` 處境比對區塊 | 放這邊怪、設計不夠好 | 刪掉夾在三條路與案例列表中間的那塊；改成頁尾 CTA 右側一張深藍「比對卡」（三個問題預覽＋箭頭），左側保留 `你的故事會是哪一條？`。見 §C-4 | 卡片：小字 `2 分鐘處境比對`、標題 `不確定自己比較像哪一條？`、內文 `三個問題，比對鹿飛做過的四個案例，找出最接近的一個`、三個標籤 `階段` `卡點` `市場`、動作 `開始比對 →` | A |
| 12 | `/cases/bubble-tea` 內文 | 排版不好看，依 Apple 調整；內頁照片只要兩張 | 全站 G-9 版型；每案只留兩張故事圖（見 §C-1 圖片清單），其餘圖檔刪除 | — | A |
| 13 | `/cases/bubble-tea` | 其他案例頁一起處理 | 四個案例同一模板（G-9） | — | A |
| 14 | `/cases/bubble-tea` 時間軸 | 有滑動的地方都要做動效，參考歐美、有質感 | 全站 G-5。順手修正：第 5 張卡的編號被跳動數字誤抓顯示成「0」（G-4 改成只抓 `data-lufe-counter` 後解決）；編號方塊改線框（G-6） | — | 0（元件）＋A（時間軸卡） |
| 15 | `/contact` h1 | 字體、排版間距不對，參考其他頁保持一致 | 套 G-3：拿掉 `min-h-[56svh]`、加麵包屑、h1／副標改標準 class | 麵包屑 `首頁 / 聯絡鹿飛`；h1、副標文字不變 | B |
| 16 | `/contact` 快速連結 | 刪掉 | 刪 `預約 30 分鐘諮詢 →`、`快速留言 →` 兩個連結（連同沒用到的 `bookingMailto`） | — | B |
| 17 | `/contact` 合作洽談 | 刪掉 | 刪 `#partners` 整塊；頁尾「合作夥伴聯繫」與現場紀錄頁原本連 `/contact#partners` 的連結改成 `/contact` | — | B |
| 18 | `/field-notes` hero 數字 | 刪掉 | 刪（G-2）；h1 改標準 class（G-3） | — | B |
| 19 | `/insights` hero 數字 | 刪掉；每一頁 hero 都不要數字 | 刪（G-2 全站）；h1 改標準 class | — | B |
| 20 | 文章內頁圖片 | 內頁只要一張圖，其他部落格都一樣 | 全站 G-8 | — | B |
| 21 | 文章 FAQ | 加「-」或編號，排版不好 | 用全站 FAQ（G-7），有編號 `01` `02`… | 標題 `常見問題` 不變 | 0 |
| 22 | 文章 FAQ | 套用到其他部落格 | 模板層，全部文章一起（G-8） | — | 0 |
| 23 | `/resources` hero | hero 排版參考其他頁保持一致 | 套 G-3：加麵包屑 `首頁 / 資源`、h1／副標標準 class | 文字不變 | B |
| 24 | `/resources/subsidies` 配對器 | 這層刪掉 | 刪 `#match` 整段與 `SubsidyMatcher`、資料檔裡只給配對器用的題目與計算；舊連結 `#match` 改指 `#plans` | — | B |
| 25 | `/resources/subsidies` 4 個計畫 | 一樣的內容，但可視化、好閱讀，符合 Apple | 改成兩層：①「階段地圖」三欄（評估→進入→優化），每欄放該階段的計畫磚（額度大字＋狀態＋時程）；② 計畫規格頁：上方 sticky 分頁切換四個計畫，每個計畫是 Apple 規格表式的分列（適合／補助涵蓋／費用明細／流程／踩雷／鹿飛怎麼幫），全部展開不用再點。原本「不知道哪個適合？先看你現在在哪一步」區塊的內容併入階段地圖。內容一字不改。見 §C-5 | 新增標籤：`開放申請中`、`等待公告`、`已截止`、`鹿飛怎麼幫`、`補助額度`、`時程`、`適用階段`、`狀態` | B |
| 26 | `/services` FAQ | 動效很醜；類似的其他頁都改；Q&A 沒一致性 | 全站 G-7（安靜版、唯一一種） | — | 0 |
| 27 | `/services/call-center` 流程 | 一條線的都刪；類似的都處理；icon 不要實心 | 全站 G-6 | — | 0 |
| 28 | `/services/call-center` | 其他服務內頁有出現的都改 | 章節頁共用模板，五個服務內頁＋服務總覽一起（G-6） | — | 0 |

id 對照：1 `note-muq9zlox-wi306r`｜2 `note-muqa0ir6-tkf1vd`｜3 `note-muqa1abr-4wehfr`｜4 `note-muqa237k-7z5wy6`｜5 `note-muqa3com-2wgyj8`｜6 `note-muqa3h8y-upztaa`｜7 `note-muqa562b-wj3tbc`｜8 `note-muqa5izl-4lqprd`｜9 `note-muqa7a7z-4l5pk3`｜10 `note-muqa84vo-3m7xat`｜11 `note-muqa8xtd-ixyok4`｜12 `note-muqal73g-c8stwr`｜13 `note-muqalfk2-8gz9zj`｜14 `note-muqam481-163cni`｜15 `note-muqan5b7-3acdz1`｜16 `note-muqaqqt9-ykq4rp`｜17 `note-muqaqvtt-t6s0uy`｜18 `note-muqarkg1-fj8hzg`｜19 `note-muqasd1t-3kdsy6`｜20 `note-muqatbqg-ze45ut`｜21 `note-muqau5gt-pqaugm`｜22 `note-muqaup2e-yhmntt`｜23 `note-muqaw0bs-4sjrny`｜24 `note-muqawlgw-a0x833`｜25 `note-muqax1j5-szboul`｜26 `note-muqay4g2-y7home`｜27 `note-muqayvt9-ae91c3`｜28 `note-muqaz53z-xqlyzn`

---

## B. 文案（逐字照貼）

### B-1 首頁「後半段旅程」（#1、#2）
- 標題不變：`一家企業出海的`／（金色）`後半段旅程`
- 內文（取代原文）：
  `企業出海的前半段，是把產品送到海外——\n訂單、報關、運輸，多數企業都走得過去。\n\n後半段，才是真正的考驗：\n產品要被當地市場接受，通路要談得下來，\n證照、團隊與客服，要有人在當地接住。\n\n多數企業的出海，不是輸在運輸，\n而是輸在抵達之後沒有人接手。\n\n鹿飛，是為了這後半段旅程而成立的`
- 數字列上方小字：`鹿飛案例成果`
- 三個數字見 #1。右側「鹿飛相信的事很簡單」小段不變。

### B-2 關於頁（#6–#8）
- hero：刪三個數字，其餘文字不變（副標裡「以躍馬企業 42 年國際物流為基礎」是關於頁的故事脈絡，保留）。
- 網絡區城市行：`台北・馬尼拉・洛杉磯・紐約・舊金山・拉斯維加斯`
- 網絡區三個數字照留（會跳），但它們是躍馬的實績，標籤改成標明來源：`國家與地區・躍馬物流網絡`、`出口案件・躍馬企業`、`年國際物流・躍馬企業`（§E-3）
- 地球儀圖例（城市行下方，兩行）：金色方點 `資源網絡城市`；天藍方點 `關注市場：新加坡・吉隆坡・曼谷・胡志明市・雅加達・宿霧`

### B-3 處境比對（#10）
- hero：麵包屑 `首頁 / 處境比對`（從案例頁帶 `?case=` 進來時 `首頁 / 案例 / 比對`）；h1 不變 `看看你的處境，`／（金色）`跟哪個案例最像`；副標不變 `三個問題，約 2 分鐘。比對鹿飛做過的四個案例，找出最接近的一個，以及當時的判斷方法`；按鈕 `開始比對 ↓`（錨點 `#assess-quiz`）。
- 作答區：題目、選項、`← 上一步`、`重新開始` 全部不變。
- 下方：`會和這四個案例比對`

### B-4 案例列表比對卡（#11）
見 #11。左側 `你的故事會是哪一條？`、`聊聊你的產品，鹿飛先幫你看比較像哪一條路`、按鈕 `聊聊你的產品 →` 不變；原本旁邊的 `先做 2 分鐘評估` 文字連結移除（右側整張卡就是入口）。

### B-5 補助頁（#24、#25）
- 區塊標題不變：`4 個計畫，對應你出海的`／（金色）`不同階段`；右側日期註記不變。
- 階段地圖：每欄頂端 `01`／`02`／`03` ＋ `STAGE_LABELS` 的階段名與說明（現有資料，去句尾「。」）。
- 狀態標籤：`開放申請中`／`等待公告`／`已截止`（由資料計算，規則見 §C-5）。
- 計畫重點框欄位名：`補助額度`、`時程`、`適用階段`、`狀態`。
- 規格分列標題：`適合`、`補助涵蓋`、`可補助費用明細`、`申請與核銷流程`、`容易踩雷的點`、`鹿飛怎麼幫`。
- FAQ 標題不變：`申請前你最可能想問的事`。

---

## C. 設計規格

共通：方角；品牌色 token；只動 `transform`／`opacity`；可中斷；減少動態下無位移；hover 只在 `(hover:hover)`；收合／分頁內容一律在伺服器 HTML；不做捲動淡入。

### C-1 案例內頁（G-9；#12–#14）
1. **hero**：G-3 標準版，順序：麵包屑 `案例 / {產業}` → 標籤列 → h1（案例標題）→ 副標（summary）。無數字。
2. **成果帶**：白底 `py-[64px] md:py-[88px]`、`border-b border-bd`。小字 `成果`（13px／600 `text-gold-d`）＋三欄（手機一欄）：每欄 `border-t border-bd pt-6`，數字 `clamp(48px,7vw,88px)`／650／`tracking-[-.03em]`／`text-navy`／`data-lufe-counter`，下方標籤 15px `text-tx2`。資料＝現有 `stats`。
3. **故事章節**：白底 `py-[80px] md:py-[112px]`。每章 `grid lg:grid-cols-12 gap-8 border-t border-bd py-14 md:py-20`（第一章無上框線）：左 `lg:col-span-4 lg:sticky lg:top-[112px] self-start`：章節號 `01`（Inter 14px／600 `text-gold-d`）＋章節標題 `clamp(24px,2.6vw,34px)`／650／`leading-[1.3]`；右 `lg:col-span-7 lg:col-start-6`：段落 18px／1.9 `text-tx2`、段距 `mt-6`。「用了哪些服務」連結塊照留在原章節右欄底部。
4. **兩張圖**：圖片跟著它所屬的章節，放在該章之後，寬幅「畫面停頓」：`figure` 寬同容器（最大 1180px）、`aspect-[21/9]`（手機 `aspect-[4/3]`）、`overflow-hidden`、lazy、圖片 `scale(1.06)` 並在捲動經過時以 `translateY` 做 ±4% 視差（只在不減少動態時；用 rAF＋`getBoundingClientRect`，可沿用 `DelightLayer` 的 hero drift 寫法）；圖說 13px `text-tx3` 置左 `mt-3`。各案保留的圖：
   - costco-health：第 1 章（保健品膠囊）＋第 4 章（空運裝載）；刪 2、3。
   - electronics-tariff：第 1 章（電路板產線）＋第 3 章（港口起重機）；刪 2。
   - shoe-brand：第 1 章（手工皮鞋）＋第 2 章（襪子）；刪 3。
   - bubble-tea：第 1 章（珍珠奶茶）＋第 4 章（門市櫃檯）；刪 2、3。
5. **時間軸**：`Carousel`（G-5）；卡片 `border border-bd bg-white p-7`（區塊底改 `bg-cream`），編號方塊 40×40 線框 `border border-gold/40 text-gold-d`（不再實心），`when` 13px／600 `text-gold-d`，標題 h3，說明 15px。
6. 引言（有才顯示）、CTA、更多案例：照現狀。

### C-2 地球儀（#8）
- 資源網絡城市（金色 `[0.83,0.66,0.36]`）：台北 `[25.033,121.565]` 0.08、馬尼拉 `[14.599,120.984]` 0.07、洛杉磯 `[34.052,-118.244]` 0.06、紐約 `[40.713,-74.006]` 0.06、舊金山 `[37.775,-122.419]` 0.05、拉斯維加斯 `[36.170,-115.140]` 0.05。弧線：台北→其他五城（刪多倫多）。
- 關注市場（天藍 `[0.36,0.56,0.66]`，用 cobe 2 的 marker `color`）：新加坡 `[1.352,103.820]`、吉隆坡 `[3.139,101.687]`、曼谷 `[13.756,100.502]`、胡志明市 `[10.823,106.630]`、雅加達 `[-6.208,106.846]`、宿霧 `[10.316,123.885]`，size 一律 0.035，不畫弧線。
- 起始 `phi` 改成讓台北落在正面偏左（`phi: 4.1`，自轉照舊），一進場就看得到亞洲那一側的點。
- 圖例：8×8 方點（金 `bg-gold`、天藍 `bg-sky`）＋13px `text-white/55`，見 B-2。

### C-3 處境比對頁（#10）
1. hero：G-3 標準全屏；`HeroBackdrop src="/images/cases/cases-hero-collab-1600.webp"`（無影片）。「正在比對」案例框（有 `?case=` 時）放在副標下方 `mt-8`，樣式不變。按鈕 `開始比對 ↓`：白框按鈕 `border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white`，點了平滑捲到 `#assess-quiz`（減少動態時直接跳）。
2. 作答區 `section#assess-quiz`：白底 `py-[80px] md:py-[112px] scroll-mt-[74px]`，內容 `mx-auto max-w-[860px]`。
   - 頂列：左 `01` 大題號（Inter 56px／600 `text-navy`）＋ `/ 03`（15px `text-tx3`）；右 `← 上一步`、`重新開始`（14px `text-tx2`，滑過 `text-navy`）。
   - 進度：三段等寬細條 `flex gap-2`，每段 `h-[3px] bg-bd`，內層金色 `bg-gold-d` 用 `scaleX` 彈簧填滿（已答＝1、目前題＝0.35、未到＝0）。
   - 已答標籤：`border border-bd px-2.5 py-1 text-[13px] text-tx2`，題目字 `text-tx3`。
   - 題目 `h2 text-tx`；選項卡：`border border-bd bg-white p-5 md:p-6`，滑過 `border-navy/40` 並上移 1px，按下 `scale(.985)`；選中 `border-gold-d bg-cream`。左側 30×30 編號框線框 `border-bd text-tx3` → 選中 `border-gold-d text-gold-d`（不填色），選項文字 17px／600 `text-tx`、提示 14px／1.8 `text-tx2`，右側箭頭 `text-tx3`、選中 `✓ text-gold-d`。沒有提示文字、選項 ≥5 的題目（市場）在桌機改兩欄。
   - 題目之間的橫向滑動與拖曳返回照舊。完成後的「載入結果…」改 `text-tx2`。
3. 比對範圍：`bg-cream py-[56px] md:py-[72px]`；標題 `會和這四個案例比對`（17px／650）；四張小卡（桌機四欄、手機兩欄）：圖 `aspect-[4/3]` lazy、標籤 12px `text-gold-d`、標題 14.5px／600 兩行截斷，整卡連到案例；hover 圖 `scale(1.03)`。
4. 結果頁（`/assess/result`）只做 G-6（✓／× 方塊改線框），其餘不動。

### C-4 案例列表頁尾（#11）
- 刪除中段整個 `section`（`不確定自己比較像哪一條？` cream 方框）。
- 頁尾 `mt-20 border-t border-bd pt-14` 改 `grid gap-8 lg:grid-cols-12 lg:items-stretch`：左 `lg:col-span-7` 標題＋說明＋主按鈕（靠左對齊）；右 `lg:col-span-5` 整卡連到 `/assess`：`bg-navy p-8 text-white md:p-10`，小字 13px／600 `text-gold`、標題 `h3 text-white mt-3`、內文 15px／1.8 `text-white/70 mt-3`、三個標籤 `mt-6 flex gap-2`（`border border-white/25 px-3 py-1 text-[13px] text-white/75`）、動作 `mt-8 text-[15px] font-semibold text-gold`。滑過卡片上移 4px、箭頭右移 4px；按下 `scale(.985)`。

### C-5 補助頁 4 個計畫（#25）
1. **階段地圖**（`section#plans`，白底）：標題列不變 → `grid lg:grid-cols-3`，三欄之間 `lg:border-l border-bd`（第一欄無）、欄內距 `lg:px-8`（手機欄與欄 `border-t` 分隔）。欄頂：`01` 13px／600 `text-gold-d` ＋ 階段名（eyebrow）＋ 說明 16px／600 `text-tx`。下方該階段的計畫磚（評估：跨境電商；進入：海外布建、展覽；優化：供應鏈）：`button` 整磚可點、`border border-bd bg-white p-5 mt-5`：44×44 線框 icon（`SubsidyIcon`）＋ 編號＋短名（18px／650）→ 額度（`num` 22px `text-navy`，不跳動）→ 狀態標籤＋時程（13px `text-tx3`）。點了＝切換下方分頁到該計畫並捲到分頁列。滑過上移 3px、邊框 `border-gold`；按下 `scale(.985)`。
2. **狀態規則**：`isSubsidyActive(subsidy, now)` 為真 → `開放申請中`（`border border-sky text-sky`）；否則時程含「預計」或「待公告」→ `等待公告`（`border border-gold text-gold-d`）；否則 → `已截止`（`border border-bd text-tx3`）。標籤 12px／600 `px-2 py-0.5`。
3. **計畫分頁**：分頁列 `sticky top-[74px] z-10 bg-white/90 backdrop-blur border-b border-bd py-3`，用 `Segmented`（選項＝`{num} {shortTitle}`），手機可橫滑。預設＝第一個計畫；網址 `#{slug}`（`#market-expansion` 等）進來或 `hashchange` 時切到該計畫並捲到分頁列；切換時用 `history.replaceState` 更新 hash。四個面板都在伺服器 HTML，非目前的加 `hidden`；每個面板 `id={slug}`（保留舊錨點）。切換動效：新面板 `opacity 0→1`＋`translateY(8px→0)`，240ms ease-out；減少動態無位移。
4. **計畫面板（規格表）**：
   - 頂部 `grid lg:grid-cols-12 gap-8 py-12`：左 `lg:col-span-7`：亮點徽章（有才顯示，現有 ember 樣式）→ 編號＋主管機關 eyebrow → 短名 `clamp(28px,3.4vw,40px)`／650 → 計畫全名 15px `text-tx3` → 一句話 17px／1.8 `text-tx2`。右 `lg:col-span-5`：重點框 `border border-bd p-6`，`dl` 四列（`補助額度`：額度 `num` 28px `text-navy`＋說明 12px；`時程`：時程＋申請說明；`適用階段`；`狀態`：標籤），列與列 `border-t border-bd py-4`。
   - 規格分列：每列 `grid lg:grid-cols-12 gap-6 border-t border-bd py-10`；左 `lg:col-span-3` 列名 15px／650 `text-tx`；右 `lg:col-span-9`：
     - `適合`：兩欄清單，每項前 18px 線框 `CheckIcon text-gold-d`，14.5px／1.75。
     - `補助涵蓋`：標籤格 `border border-bd px-3 py-1.5 text-[13px] text-tx2`。
     - `可補助費用明細`：卡片格 `md:grid-cols-2 gap-3`，每張 `border border-bd p-4`：項目 15px／650、說明 13px／1.7 `text-tx2`、上限靠右 `num` 15px `text-navy`（手機在下方）。
     - `申請與核銷流程`：步驟卡格 `md:grid-cols-2 lg:grid-cols-4 gap-3`，每張 `border border-bd p-4`：32×32 線框編號（`border-gold/40 text-gold-d`）＋標題 14.5px／650＋說明 13px。**步驟之間不畫線**（G-6）。
     - `容易踩雷的點`：`border-l-2 border-ember bg-ember/5 p-5` 清單（文字面板，不是 icon，淡底可以）。
     - `鹿飛怎麼幫`：`bg-navy p-6 text-white/90` 15px／1.8（`lufeAngle`）。
   - 面板底：`查我是否符合 →`（`/assess`）＋官方公告連結＋資料確認日（現有文字）。
5. 原本的 `SubsidyComparison` 與「不知道哪個適合？先看你現在在哪一步」區塊刪除（內容已在階段地圖裡）。`Disclosure` 不再用於補助頁。
6. FAQ 改 `FaqSection`（G-7），題號 `01`–`05`，無 takeaway。

---

## D. 圖片
本輪不新增圖片。刪除：案例故事圖 6 組（C-1 第 4 點列出的「刪」，各 tier 的 webp 都刪）、`public/images/insights/inline/` 全部。刪前先 `rg` 確認沒有其他引用。

---

## E. 需要 Aaron 確認（只列事實／法規／金額）

1. **首頁數字改用案例成果**（#1）：原本 42+／500+／30+ 是躍馬的實績，已拿掉。改放 Costco 120+ 家門市、馬尼拉一年 10 家門市、皮鞋品牌營收 3 倍——這三個數字出自網站上的鹿飛案例頁。請確認這四個案例**可以算鹿飛的實績**（不是躍馬或合作夥伴的）。不行的話，整列數字刪掉，這區只留文字。
2. **地球儀的「關注市場」**（#8）：新加坡、吉隆坡、曼谷、胡志明市、雅加達、宿霧。請確認這些是鹿飛實際在看或服務的市場；哪個不對就刪哪個（只刪點，不影響版面）。
3. **關於頁網絡區三個數字**（30+／500+／42）其實是躍馬的實績，本輪在標籤上註明「躍馬」。如果你希望關於頁也完全不出現躍馬的數字，回一句「刪」，就整列拿掉。

---

## F. 工單與順序

| WO | 內容 | 依賴 | 可並行 |
|---|---|---|---|
| `WO-R3-0-shared` | G-1 影片速度、G-4 跳動數字、G-5 輪播元件＋原生橫滑、G-6 共用 CSS 與服務頁系列、G-7 FAQ、文章 FAQ（#5 #14 #21 #22 #26 #27 #28） | — | **先跑、單獨跑** |
| `WO-R3-A-cases-about-assess` | 案例列表與內頁、處境比對、關於頁、作者頁（#6–#14） | R3-0 合併後 | 與 B 並行 |
| `WO-R3-B-home-content-resources` | 首頁、聯絡、現場紀錄、洞察列表、文章內頁圖片、資源、補助（#1–#4 #15–#20 #23–#25） | R3-0 合併後 | 與 A 並行 |
| `WO-R3-Z-integration` | 重建字型並提交、全站稽核、Lighthouse 對照 `65de4da` | A、B 合併後 | — |
