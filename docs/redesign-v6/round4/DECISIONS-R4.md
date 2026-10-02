# lufe.world v6 第四輪：定案總表（2026-10-02）

來源：Aaron 在 `redesign/v6` 頭 `9c99ef9` 快照上留的 **24 則第四輪註記**（`notes-r4.json`，存檔 `review/archive/notes-round4-20261002-1420.json`）。編號 1–24 依註記檔內順序（＝建立時間）排列（id 對照見 §A 表末）。

本文件補充、不取代 `../DECISIONS.md`、`../round2/DECISIONS-R2.md`、`../round3/DECISIONS-R3.md`。品牌語氣、句號規則、方角、品牌色、字型守門、G-1～G-9 照舊。衝突時**以本文件為準**。
新文案以反引號為準，一字不改貼進網站（`\n`＝換行）。工單在 `wo/`。

**本輪推翻的舊決定（只限列出的範圍）**
1. 第一輪「關於頁避免提躍馬」→ **只在 `/about` 推翻**：整頁以躍馬為起點講故事，並放躍馬官網入口。首頁仍照 R3 拍板 2（首頁後半段旅程不提躍馬）。
2. `methodology/SPEC-v2.1.md` 第 3 段兩個例子「一字不改」→ 本輪依 #21／#24 改寫內容與版面（§B-11）。
3. R3 §E-1 首頁「鹿飛案例成果」三個數字 → 兩個案例刪除／改寫，改成 §B-3 的三格。
4. R1 #47「`/assess` 只要一張照片」→ #3 改成跟其他頁一樣有影片。

---

> **2026-10-02 更新（Aaron 已核可）**：§B-1–B-5 的案例與關於頁文案，以 `FABLE-CASES-COPY.md` 為準（選 A「鹿飛由躍馬企業的團隊創立」；兩案 keyDecisions 未確認前維持 `[]`）。本檔該段舊文案保留只供對照。

## 0. 第四輪全站規則（H-1 ～ H-6）

### H-1 刪除的頁面一律 301，連動一起刪
| 舊網址 | 301 到 | 理由 |
|---|---|---|
| `/cases/shoe-brand` | `/cases` | 案例刪除（#9），正式站上線中 |
| `/cases/costco-health` | `/cases/goat-milk-soap-global` | 改寫成羊奶皂案例（#7）；網址改成新內容的名字，舊網址轉過去，搜尋與外部連結不斷 |
| `/cases/electronics-tariff` | `/cases/fish-floss-us-fda` | 改寫成魚鬆進美國（#8） |
| `/field-notes` | `/resources` | 整頁刪除（#10）；資源頁是最接近的上一層 |

連動刪除清單（全部要清乾淨，整合工單用 `rg` 驗收）：選單與頁尾的「現場紀錄」、資源頁「活動與現場紀錄」區塊、`src/data/fieldNotes.ts`、`src/components/field-notes/`、`src/app/field-notes/`、`public/images/field-notes/`、`fieldNotes` 影片、測試；皮鞋案例的資料、卡片、首頁數字、處境比對對照、補助頁對照文案、圖片與影片；Costco／電子案例同上。

### H-2 案例只寫真的，數字一律不編
羊奶皂、魚鬆兩個案例**沒有任何數字、門市數、營收、日期、認證、品牌名**。需要事實的地方寫成定性句子，事實列在 §E「需要 Aaron 補」。案例的大數字位置（列表卡、成果帶、首頁）改用短詞（`全球`、`FDA`）；**只有含阿拉伯數字的值才加 `data-lufe-counter`**，短詞直接顯示、字級縮小（規格 §C-1）。

### H-3 不提「找誰測」：拿掉目標族群標籤（#24）
全站（`src/data/articles.ts` 除外）標題與文案不出現「媽媽、家長、上班族、女性、小資族、白領、年輕人／長輩」這類受訪者或目標族群標籤，一律改成「當地消費者」「受訪者」「測試面板」等專業說法。逐條改寫見 §B-12；整合工單用 `rg` 驗收。人物照片的 `alt`（描述畫面）不受影響。

### H-4 每一頁 hero 影片速度跟首頁一致（#14 全站重量）
- 量法沿用 R3 G-1（320×180 灰階、`tblend=difference`、每秒變化量中位數 m；`rate = clamp(取到 0.05, √(75/m), 0.6, 1.25)`）。指令已重建成腳本，見 §D-1。
- **新增：縮時影片一律換掉**。R3 的量法會低估縮時（車流、雲、日夜循環看起來在「跑」，但每格差值不大），Aaron 說太快的 `/resources` 正是縮時。量完 m 之後再用眼睛逐支看，縮時、手持晃動、跳格一律換片；需要的速度低於 0.6 才能對齊的也換片。
- 每支新片都要 ≥1080p 原檔，轉 720p（北美頁另出 1080p，見 H-5）。

### H-5 北美頁 hero 給高畫質（#22）
`HeroVideo` 新增選填 `srcHd`（1080p）。`HeroBackdropVideo` 在 `window.matchMedia("(min-width: 1024px)")` 成立、且非 `saveData` 時用 `srcHd`，否則用 720p 的 `src`。本輪只有 `/services/north-america` 給 `srcHd`（≤5MB）。

### H-6 Apple 化的五個區塊共通原則（#13 #15 #16 #19 #20 #21）
照 `apple-design` 技能：一眼看懂優先（Simplicity 不是 minimalism）、常用的先看到、細節往下一層（progressive disclosure）、同類資訊排在同一行好比較、回饋在按下就出現、彈簧 damping 1（可中斷，從當下值出發）、只動 `transform`／`opacity`、減少動態時改成直接切換。所有收合／分頁內容都在伺服器 HTML。

---

## A. 逐則決定（24 則）

| # | 頁面 | Aaron 要的（摘要） | 決定 | 規格 | WO |
|---|---|---|---|---|---|
| 1 | `/about` 故事卡 `想通的事` | 換成專業用詞 | 改 `關鍵洞察`；同組另外三章一起改成專業章名：`起點・躍馬企業`、`市場觀察`、`關鍵洞察`、`鹿飛的成立` | §B-1 | B |
| 2 | `/about` 整頁 | 整頁要提躍馬、從上到下有故事性、可調整排版內容、要有入口導到躍馬 | 重排成一條直線讀下來的故事：hero → 01 起點（躍馬 42 年、三個數字、躍馬官網入口）→ 02 市場觀察 → 03 關鍵洞察 → 04 鹿飛的成立 → 05 團隊 → 06 資源網絡 → 07 信念 → 結尾「下一章，從你的產品開始」。故事四章改成直向章節（不再用橫滑卡片），版型沿用案例內頁（左側 sticky 章名、右側內文）。躍馬的三個數字從網絡區搬到第 01 章 | §B-1、§C-2 | B |
| 3 | `/assess` hero | 要有影片，速度跟其他頁一樣 | 加 hero 影片（`assess`），速度照 H-4 | §D | 0（素材）＋A（接上） |
| 4 | `/cases` hero | 換圖片、影片 | 換新影片與海報 | §D | 0 |
| 5 | `/cases/bubble-tea` 故事 | 用九宮格、全市場奶茶、當天盲飲不看品牌、先調研機會點、找到健康賽道與適合的口味來寫 | 改寫第 2 章、新增第 3 章（盲飲結果）；保留原有事實；拿掉「25–35 歲白領」「甜度偏高」兩句（前者違反 H-3，後者跟「健康賽道」矛盾，§E 請確認） | §B-4 | A |
| 6 | `/cases/bubble-tea` 「核心直營、外圍加盟」的圖 | 圖是不是有問題 | **有三個問題**：①直式照片（2:3）被裁成 21:9，只剩中間一條；②`srcset` 宣告了不存在的 2400 寬檔，高解析度螢幕會抓到 404 → 破圖；③照片是中國大陸門市（人民幣價格、簡體字招牌、品牌標誌），跟馬尼拉案例不符。決定：刪掉這張，改在第 2 章（九宮格與盲飲）後放一張新的橫式照片（三杯不同口味的珍奶）；並加測試：案例圖的每個 tier 檔都要存在 | §B-4、§D-2 | A |
| 7 | `/cases/costco-health` | 改成羊奶皂，幫一個品牌調整，現在全球都有 | 新案例 `goat-milk-soap-global`（301 自舊網址）。故事型、無數字。全站 Costco 案例的說法全部移除（首頁數字、首頁卡、列表卡、引言、處境比對、補助頁對照） | §B-2 | A（0 做轉址） |
| 8 | `/cases/electronics-tariff` | 換成魚鬆進美國：中間發現法規限制、成分問題，透過調研測試，幫忙思考包裝 | 新案例 `fish-floss-us-fda`（301）。法規內容已查證（§F）；調研與包裝寫成做法，不寫結果數字 | §B-3、§F | A（0 做轉址） |
| 9 | `/cases/shoe-brand` | 刪掉，連動的也刪 | 刪除；301 到 `/cases`；產業篩選「服飾配件」一起刪 | H-1 | A（0 做轉址） |
| 10 | `/field-notes` | 整個刪掉，連動也刪 | 刪除；301 到 `/resources`；選單、頁尾、資源頁區塊、資料、圖片、影片、測試一起刪 | H-1 | 0 |
| 11 | `/insights` h1 | 換專業抬頭，副標也調整 | h1 `出海洞察，`／（金）`從判斷到執行的實務指南`；副標 `依出海的每個階段整理：市場探查、寄賣通路、公司落地、海外客服與北美市場的分析與實務指南` | §B-6 | B |
| 12 | `/about` hero 影片 | 換成船、航行 | 換貨櫃船航行影片 | §D | 0 |
| 13 | 文章目錄（全部文章） | 依 Apple 重新排版，每一篇都套用 | 模板層重做目錄：編號＋閱讀位置＋剩餘時間；手機加一條「目前章節」細列，點開是同一份目錄 | §C-3 | B |
| 14 | `/resources` hero | 每頁檢查動畫速度跟首頁一樣，這支太快 | 全站重量（H-4）；`/resources` 縮時換片 | §D | 0 |
| 15 | `/resources` 底部「想看實際做過的案子？…」 | 用 Apple 重新設計這一層 | 一行文字連結 → 「繼續探索」四張入口磚（案例、洞察與指南、處境比對、TradePilot） | §B-7、§C-4 | B |
| 16 | `/resources/subsidies` 4 個計畫 | 太複雜、太長、不好讀，深度思考，參考 Apple | 改成三層漸進：①**一眼比較**（四欄並排，同類資訊同一列）取代階段地圖；②分頁只剩「重點」：關鍵數字、適合誰、鹿飛怎麼幫；③費用明細、流程、踩雷收進三個可展開列（預設收合，標題帶項數）。內容一字不刪 | §C-5 | B |
| 17 | `/services` hero | 換一個動畫 | 換新影片（不再跟首頁共用） | §D | 0 |
| 18 | `/services/call-center` h1 | 用專業用詞 | h1 `海外客服，交給專業英語團隊` | §B-10 | C |
| 19 | `/services/consignment` 服務內容 | Apple 會怎麼調整 UI/UX | 五張等大卡（3＋2 落單）→ 「方案包含」便當盒格：核心項「電商通路上架」大磚＋四張小磚，線框 icon；「學校家長活動」改 `社群試用活動`（H-3） | §B-9、§C-6 | C |
| 20 | `/services/localization` 價格區 | 重新設計，有點怪，Apple | 深藍框＋金色大字「按案報價」很空 → 改成「費用」規格表：左邊計價方式，右邊列出第一次談會給的項目（註冊、律師行文件、招聘、場地、時間表）。同一個價格區塊是五個服務頁共用，一起換成新版（數字不變） | §B-9、§C-7 | C |
| 21 | `/services/methodology` 例子區 | 思考怎麼設計，含內容、排版、UI/UX，Apple | 兩張長文字卡 → 分段切換兩個例子；每個例子拆成「怎麼問 → 問到什麼（發現磚）→ 決策意涵」；內容改寫成專業、可掃讀，拿掉受訪者標籤 | §B-11、§C-8 | C |
| 22 | `/services/north-america` hero | 換高清一點的 | 換一支 4K 原檔、較慢的片，桌機播 1080p（H-5） | §D | 0 |
| 23 | `/services/optimize` hero | 換影片 | 換新影片（不再跟首頁共用） | §D | 0 |
| 24 | `/services/product-testing` h1 | 換專業，不提找誰／TA，「媽媽」這種詞都不要，順便檢查全站 | h1 `先驗證市場，再決定投入`；全站掃描改寫（H-3、§B-12） | §B-8、§B-12 | C（案例內的由 A） |

id 對照：1 `note-muqk1u8h-02sdtg`｜2 `note-muqk2thh-1oa0wf`｜3 `note-muqk3skx-wvgwn6`｜4 `note-muqk4dfd-1vwkve`｜5 `note-muqk6s70-4wv3bd`｜6 `note-muqk75ex-e1kfbq`｜7 `note-muqk83ua-3ae3ua`｜8 `note-muqk9gq0-fkbav3`｜9 `note-muqka28k-8pdvpw`｜10 `note-muqkbcsy-nvjys6`｜11 `note-muqkbyce-rdhnzg`｜12 `note-muqkdfgx-8gnupb`｜13 `note-muqkf44p-jry13j`｜14 `note-muqkg3l4-3fc2kb`｜15 `note-muqkgh3o-x7zvz1`｜16 `note-muqkhf0i-vthb9k`｜17 `note-muqkhqds-72s1xj`｜18 `note-muqkjt5x-dc1g7s`｜19 `note-muqklfdr-2is5oa`｜20 `note-muqkn18n-td8vu2`｜21 `note-muqkoe2z-3dn5k8`｜22 `note-muqkp16g-iuwomj`｜23 `note-muqkpd5h-4di524`｜24 `note-muqkpxb8-p4f1ib`

---

## B. 文案（逐字照貼）

### B-1 關於頁（#1 #2）
**hero**
- 麵包屑 `首頁 / 關於我們`
- h1：`從貨櫃出發，`／（金）`陪台灣企業走完抵達之後`
- 引言（白 80%）：`「別人幫你開車，我們幫你找路。」`（不變）
- 副標：`鹿飛協助台灣企業在北美與東南亞落地：市場驗證、通路進入、在地團隊與客服，一個窗口串起出海的每一段。這個故事，要從躍馬企業說起`

**故事四章**（`section#story`，白底；章號 `01`–`04`，章名為 eyebrow，標題為 h2）
- 01｜章名 `起點・躍馬企業`｜標題 `42 年，把台灣的貨送到世界各地`
  - 段落 1：`躍馬企業做國際貨運承攬已經 42 年：報關、倉儲、海空運、最後一哩。台灣企業要出口，躍馬負責把貨安全、準時地送到對的地方。`
  - 段落 2：`500 多個出口案件、30 多個國家——累積下來的不只是航線與據點，還有一個只有站在物流這一端才看得到的視角。`
  - 數字列（跳動）：`42`／`年國際物流・躍馬企業`；`500+`／`出口案件・躍馬企業`；`30+`／`國家與地區・躍馬物流網絡`
  - 入口卡（外連 `https://jumping.group`，新分頁）：小字 `躍馬企業官網`、標題 `認識躍馬企業`、副字 `jumping.group`、箭頭 `↗`
  - 圖：`about-port`（貨櫃碼頭），圖說 `貨櫃碼頭——躍馬 42 年的日常`
- 02｜章名 `市場觀察`｜標題 `貨都送到了，故事卻常常停在抵達之後`
  - 段落：`看的不是報表，是貨櫃出去以後的事：有的品牌在當地開了第二家店；更多的是幾個月後貨退回來，或者就沒有下文了。`
- 03｜章名 `關鍵洞察`｜標題 `差別不在物流，而在抵達之後有沒有人接手`
  - 段落 1：`貨都有送到。真正拉開差距的，是抵達之後有沒有人接著走：證照有沒有人辦、貨架上有沒有人推、第一封英文客訴有沒有人回。`
  - 段落 2：`這些事不在任何一家貨代的服務範圍裡，卻決定了一個品牌能不能在海外站穩。`
  - 圖：沿用 `/images/about/story-belief-compass-1600.webp`（`maxTierWidth 1600`），圖說 `羅盤放在世界地圖上——有計畫的探索`
- 04｜章名 `鹿飛的成立`｜標題 `從躍馬出發，鹿飛接手抵達之後的每一段`
  - 段落 1：`台灣市場不夠大，出海是遲早的事；出去有難度，但出得去。鹿飛從躍馬企業出發，把抵達之後最難的四件事做成四個方案：市場探查、寄賣、公司落地、海外客服。`
  - 段落 2：`讓第一步小到企業敢踏，後面的每一步都有人在。躍馬把貨送到，鹿飛讓貨在當地被買走。`
  - 連結：`看四個方案 →`（`/services`）
  - 圖：沿用 `/images/about/aaron-news-interview-1080.webp`（`maxTierWidth 1080`），圖說 `台視新聞訪問躍馬企業市場經理`

**後續區塊**（只改 eyebrow 與網絡區，其餘文字不變）
- 團隊 `#team`：eyebrow `05・今天的團隊`；標題、說明、三張卡不變。
- 網絡 `#network`：eyebrow `06・資源網絡`；**刪掉三個數字**（已搬到第 01 章）；城市行、圖例、地球儀不變。下方四張網絡卡不變。
- 信念 `#philosophy`：eyebrow `07・鹿飛的信念`；`鹿飛相信的四件事` 與四條不變。
- 結尾：標題 `下一章，從你的產品開始`；內文 `首次諮詢不收費，先釐清方向，再決定下一步`（不變）；按鈕 `聊聊你的產品 →`（不變）。
- `storyCards` 匯出改成 `storyChapters`（新資料形狀見 §C-2）；舊的 `看到的問題`、`想通的事`、`做了什麼` 三個章名與 `aaron-workshop` 圖不再使用（圖檔保留，其他頁可能用到，先 `rg`）。

### B-2 羊奶皂案例 `goat-milk-soap-global`（#7）
- 標籤：`美妝個護`（sky）、`全球`（gold）；`industry: "personal-care"`、`market: "global"`；`num: "全球"`
- 標題：`一塊台灣羊奶皂，怎麼調整成全球都買得到？`
- 摘要：`產品本身沒有問題，卡住的是海外買家看不懂它。鹿飛協助品牌調整定位、包裝與說法，現在全球都買得到`
- 成果帶（文字值，不跳動）：`全球`／`現在的銷售範圍`；`重新定位`／`品牌定位與溝通方式依市場調整`；`在地化包裝`／`依各市場的標示規定與閱讀習慣調整`
- 故事：
  1. `在台灣被認識的好皂，到了海外沒人看懂`
     - `這個台灣羊奶皂品牌，在國內已經累積穩定的口碑：配方溫和、做工扎實，回購的客人不少。品牌想走出台灣，卻發現海外買家拿起產品，看不出它和架上其他手工皂差在哪裡。`
     - `問題不在產品，而在產品被介紹的方式。台灣消費者熟悉的賣點與說法，到了不同市場不一定成立；包裝上的資訊，也不一定是當地買家要找的那幾行。`
     - 圖 `goat-soap-1`，alt `木桌上的手工羊奶皂`
  2. `先弄清楚海外買家怎麼看羊奶皂`（`showStageLinks`）
     - `鹿飛從市場調研開始：目標市場的消費者怎麼理解「羊奶」這個成分、在意的是溫和、天然還是功效，同一個價位帶的競品又怎麼說自己的故事。`
     - `調研同時盤點各市場的規定。同樣一塊皂，在不同市場可能被歸成不同的品項：在美國，只主打清潔的皂與強調保濕等功效的皂，由不同單位管理；在歐盟，皂屬於化妝品，上市前要指定當地的負責人並完成產品通報。說法一變，要準備的文件就跟著變。`
  3. `產品的核心不動，調整的是定位、包裝與說法`
     - `根據調研結果，品牌把重心放在「怎麼被看懂」：重新整理品牌定位，讓海外買家一眼知道這塊皂為誰而做；包裝改用當地買家熟悉的資訊順序，成分依國際通用的命名方式標示；產品說法對齊各市場允許的宣稱範圍。`
     - `最後整理成一套可以帶進不同市場的品牌底稿，讓每一個新市場、每一位新的通路夥伴，講的都是同一個故事。`
     - 圖 `goat-soap-2`，alt `包裝好的手工皂與牛皮紙標籤`
  4. `現在，全球都買得到`
     - `調整後的品牌，一步步走進不同市場的通路。今天，這塊來自台灣的羊奶皂，在全球都買得到。`
     - `這個案例走的是第二條路：產品的核心保留下來，改的是它被理解的方式。`
- 時間軸（`when` 用步驟）：`第一步`｜`市場調研`｜`了解目標市場怎麼看羊奶皂、競品怎麼說自己的故事`；`第二步`｜`法規盤點`｜`確認各市場的品項歸類、標示規定與上市前要備齊的文件`；`第三步`｜`品牌調整`｜`定位、包裝資訊與產品說法依市場重新整理`；`第四步`｜`進入市場`｜`帶著同一套品牌底稿，逐一進入不同市場的通路`
- 無引言。`stagesUsed: ["market-assessment", "product-testing"]`；`related: ["fish-floss-us-fda", "bubble-tea"]`
- `challenge`：`產品在台灣口碑穩定，但海外買家看不出它的價值，各市場的品項歸類與標示規定也不同。`；`approach`：`先調研海外買家怎麼理解羊奶皂與競品的說法，同步盤點各市場規定，再調整品牌定位、包裝與產品說法。`；`result`：`整理出一套可帶進不同市場的品牌底稿，現在全球都買得到。`；`keyDecisions: []`
- 列表卡：headline `重新定位之後，全球都買得到`；painTitle `產品在台灣口碑好，到了海外卻沒人看得懂`；四段：`台灣羊奶皂品牌在國內口碑穩定，想把產品帶到海外`／`海外買家看不出它和其他手工皂的差別，各市場的品項歸類與標示規定也不一樣`／`先調研海外買家怎麼看羊奶皂，再調整品牌定位、包裝與產品說法`／`帶著同一套品牌底稿進入不同市場，現在全球都買得到`

### B-3 魚鬆案例 `fish-floss-us-fda`（#8）
- 標籤：`食品`（sky）、`美國`（gold）；`industry: "food"`、`market: "north-america"`；`num: "FDA"`
- 標題：`台灣魚鬆想進美國，第一關卡在哪裡？`
- 摘要：`原本以為是行銷問題，調研後發現先要解決的是法規與成分。鹿飛協助品牌釐清 FDA 規範、透過美國消費者調研測試接受度，再重新規劃美國版包裝`
- 成果帶（文字值）：`FDA`／`確認主管機關與進口要件`；`配方`／`找出成分與過敏原的調整點`；`包裝`／`依美國標示格式重新規劃`
- 故事：
  1. `在台灣熟悉的魚鬆，到了美國是陌生的食物`
     - `這個台灣魚鬆品牌在國內有穩定的客群，想把產品帶進美國市場。品牌最初的規劃很直接：找通路、做行銷、上架。`
     - `但在美國消費者眼中，魚鬆是一個沒見過的品項：不知道它是什麼、怎麼吃、配什麼。更早浮上檯面的，是另一個問題——這罐產品，能不能合法進口。`
     - 圖 `fish-floss-1`，alt `市場攤位上的魚乾與蝦乾`
  2. `調研之後才發現：先要過的是法規這一關`（`showStageLinks`）
     - `鹿飛從法規盤點開始。在美國，只用魚做的魚鬆由 FDA 管轄，屬於水產品：國外的加工廠必須符合水產品 HACCP 的規定，進口商也要能驗證這件事；工廠要完成食品設施登記，每一批貨進口前都要事先通報。`
     - `台灣常見的魚鬆配方，問題往往藏在成分表裡。只要混入一定比例的肉鬆，產品就改由美國農業部管轄，而台灣肉品輸美的資格受到嚴格限制；用到豬油這類豬肉來源的原料，也會碰上動物疫病相關的進口限制。`
     - `醬油帶進黃豆與小麥，芝麻帶進芝麻——這些都屬於美國規定必須標示的主要過敏原；色素與防腐劑也必須是美國允許使用的品項。每一項都要逐一對照，才知道配方哪裡要調整。`
  3. `用美國消費者的反應，測試產品該怎麼被介紹`
     - `法規路徑清楚之後，鹿飛透過調研測試美國消費者的接受度：第一次看到產品時怎麼理解它、願不願意試、會想把它用在哪裡。`
     - `這些回饋，決定產品在美國要被當成什麼來介紹：是配飯配粥的傳統食品，還是可以撒在各種餐點上的鹹香配料。`
  4. `包裝，照美國的閱讀方式重新設計`
     - `美國的食品標示有固定的格式：品名要讓人看得懂產品是什麼，並寫明使用的魚種；淨重同時標示公制與英制；營養標示的份量依美國的規定計算；成分依含量排序，過敏原另外清楚列出，並標示原產地。`
     - `英文品名也是包裝的一部分。「Fish Floss」對多數美國消費者是陌生的詞，需要搭配描述性的說明，例如寫明魚種的 shredded fish，讓人第一眼就知道裡面是什麼。`
     - 圖 `fish-floss-2`，alt `尚未印刷的食品包裝袋`
  5. `先把路鋪平，再談上市`
     - `這個案子最先交出的，不是上架數字，而是一條清楚的進入美國路徑：哪些成分要調整、哪些文件要備齊、包裝要怎麼改、產品要怎麼被介紹。`
     - `對想進美國的食品品牌來說，這一段做在前面，後面的每一步才不會重來。`
- 時間軸：`第一步`｜`法規盤點`｜`確認主管機關、水產品 HACCP、設施登記與進口前通報`；`第二步`｜`成分對照`｜`逐項檢查肉類原料、過敏原、色素與防腐劑`；`第三步`｜`消費者調研`｜`測試美國消費者怎麼理解產品、會怎麼吃`；`第四步`｜`包裝規劃`｜`依美國標示格式規劃品名、營養標示與過敏原`
- 無引言。`stagesUsed: ["market-assessment", "product-testing", "channel-entry"]`；`related: ["goat-milk-soap-global", "bubble-tea"]`
- `challenge`：`品牌原本規劃直接找通路做行銷，但產品是否能合法進口美國還沒確認，配方成分與標示也未對照美國規定。`；`approach`：`先盤點 FDA 與進口規定、逐項對照成分，再透過美國消費者調研測試產品該怎麼被介紹，最後依美國標示格式規劃包裝。`；`result`：`整理出清楚的進入美國路徑：成分調整、文件、包裝與產品說法。`；`keyDecisions: []`
- 列表卡：headline `先過法規，再談包裝與上市`；painTitle `以為是行銷問題，其實先卡在法規與成分`；四段：`台灣魚鬆品牌想進美國，原本的規劃是直接找通路、做行銷`／`調研發現產品歸 FDA 管轄，配方裡的肉鬆、豬油、過敏原與色素都可能過不了關`／`逐項對照法規與成分，再透過美國消費者調研測試產品該怎麼被介紹`／`整理出清楚的進入路徑，並依美國標示格式重新規劃包裝`

### B-4 珍奶案例（#5 #6）
只改下列；其他章節、數字、時間軸其餘卡不變。
- 第 1 章 `第三次進馬尼拉，前兩次都敗在夥伴`：不變（圖 `bubble-tea-1` 保留）。
- 第 2 章（取代原「低價打不過規模，高端市場又太窄」）：標題 `先找機會點，再把市場上的奶茶全部攤開`（`showStageLinks`）
  - `進場之前，鹿飛先做機會點調研：馬尼拉的珍奶市場哪裡已經擠滿、哪裡還有空間。競品集中在低價帶，打不過日出茶太的規模；高端精品在馬尼拉又不夠大。`
  - `接著把市場上買得到的奶茶全部收齊，用九宮格依價格帶與產品定位逐一歸位，看清每個品牌站在哪一格、哪幾格還空著。`
  - `最關鍵的一步，是同一天的盲飲測試：拿掉所有品牌標示，請菲律賓消費者逐杯試飲、逐杯評分。沒有品牌光環，只剩口味本身。`
  - 圖：新 `bubble-tea-tasting`，alt `三杯不同口味的珍珠奶茶，等待試飲`（照片只有三杯直立杯，桌機改 16:9 比例以免裁掉杯蓋與珍珠）
- 第 3 章（新增）：標題 `盲飲的答案：健康賽道，加上當地人愛的口味`
  - `盲飲與調研指向同一個方向：健康取向的珍奶，在馬尼拉還沒有品牌站穩。中高端價位帶 P150–200 競品少；消費者研究也顯示，當地消費者對「台灣正統」有明確的 premium 感知，願意多付 20–30% 換取品質保證。`
  - `產品線依盲飲結果調整：走健康取向，口味貼近菲律賓消費者的偏好，並加入 ube 等在地特色口味。`
- 原第 3 章（BGC）、第 4 章（核心直營、外圍加盟）、第 5 章（結果）順延成 4、5、6；**第 5 章（核心直營）拿掉圖片**。每案仍只有兩張圖（R3 G-9）。
- 時間軸 Month 1：`市場調研`｜`機會點調研、九宮格盤點市場上所有奶茶、同一天盲飲測試`
- 列表卡第三段：`機會點調研、九宮格盤點全市場奶茶、盲飲找到健康賽道，再以 BGC 首店與直營加盟混合模式展店`
- `approach`：`鹿飛先做機會點調研，再收齊市場上所有奶茶用九宮格歸位，並以同一天、不看品牌的盲飲測試找出健康賽道與適合的口味。協助品牌找到可靠的在地合資夥伴、建立穩定的原物料供應鏈（珍珠從台灣直送，茶葉在地採購）。`
- `keyDecisions[0].reasoning` 改：`低價帶競品太多，打不過日出茶太的規模；高端精品在馬尼拉市場不夠大。中高端價位帶（P150–200）競品少，盲飲也指向健康取向。消費者研究裡還有一個關鍵訊號：當地消費者對「台灣正統」有明確的 premium 感知，願意多付 20–30% 換品質保證。`
- 刪除：`甜度偏高`、`25–35 歲白領`（`story`、`approach`、`keyDecisions` 全部）。
- 刪除圖檔 `public/images/cases/story/bubble-tea-4*`（4 個檔）。

### B-5 案例相關的其他頁（#7 #8 #9）
- **篩選**：產業 `全部產業`／`食品`／`美妝個護`／`餐飲飲品`（值 `all`／`food`／`personal-care`／`fnb`）；市場 `全部市場`／`北美`／`東南亞`／`全球`（值 `all`／`north-america`／`sea`／`global`）。
- **排序**：`CASES = [goatMilkSoap, fishFloss, bubbleTea]`。
- **四個 → 三個**：`/cases` 比對卡 `三個問題，比對鹿飛做過的三個案例，找出最接近的一個`；`/assess` 副標 `三個問題，約 2 分鐘。比對鹿飛做過的三個案例，找出最接近的一個，以及當時的判斷方法`；`/assess` 下方 `會和這三個案例比對`（卡片改 `md:grid-cols-3`）。
- **處境比對新增卡點選項**（魚鬆的處境原本沒有對應選項）：`{ value: "compliance", label: "不確定法規、成分或標示過不過得了關", hint: "訊號：產品在台灣合法上架，但不知道目的地的主管機關、成分限制與標示格式" }`，短稱 `搞法規`。比對特徵：羊奶皂 `tested / market / other`；魚鬆 `idea / compliance / us`；珍奶不變 `scaling / execution / sea`。
- **首頁「鹿飛案例成果」三格**：`10`／`家馬尼拉門市，一年內開出`（`/cases/bubble-tea`，跳動）；`全球`／`羊奶皂品牌調整後的銷售範圍`（`/cases/goat-milk-soap-global`）；`FDA`／`魚鬆進美國，先過法規再談包裝`（`/cases/fish-floss-us-fda`）。
- **首頁案例輪播**（三張；`featured` 只給珍奶）：
  - 羊奶皂：num `全球`、numLabel `現在的銷售範圍`、scalePrefix `台灣羊奶皂品牌`、title `一塊台灣羊奶皂，怎麼賣到全球？`、painLine `產品在台灣口碑好，但到了海外，買家看不懂它的價值`、solutionLine `先拆解海外買家怎麼看羊奶皂，再調整品牌定位、包裝與說法，讓每個市場講同一個故事`、route `台灣` → `全球市場`、**無 trustSignal**（欄位改選填，不顯示）
  - 魚鬆：num `FDA`、numLabel `先解決法規，再談上市`、scalePrefix `台灣魚鬆品牌`、title `魚鬆進美國，卡在哪一關？`、painLine `配方裡的成分與標示方式，在美國都可能過不了關`、solutionLine `先釐清 FDA 規範與成分問題，再透過美國消費者調研測試接受度，重新設計美國版包裝`、route `台灣` → `美國`、無 trustSignal
  - 珍奶：solutionLine `機會點調研、九宮格盤點全市場奶茶、盲飲找到健康賽道，第一家開在 BGC、混合直營與加盟，單店月營收做到台灣母店 1.2 倍`；其他不變
- **補助頁對照**（`src/data/subsidies.ts`）：刪 `/cases/electronics-tariff`、`/cases/costco-health`、`/cases/shoe-brand` 三組（文案與 `CONTEXT_SUBSIDY_MAP` 都刪）。新增：
  - `/cases/goat-milk-soap-global`：eyebrow `想同時進多個市場？`、headline `海外布建有補助`、oneLiner `通路、據點、參展——依出海階段對應不同計畫`、cta `看細節`；對應 `market-expansion`
  - `/cases/fish-floss-us-fda`：eyebrow `這個案例的補助`、headline `進美國市場也有補助`、oneLiner `海外通路布建、參展都有對應的計畫`、cta `看細節`；對應 `market-expansion`

### B-6 洞察列表（#11）
- h1：`出海洞察，`／（金）`從判斷到執行的實務指南`
- 副標：`依出海的每個階段整理：市場探查、寄賣通路、公司落地、海外客服與北美市場的分析與實務指南`

### B-7 資源頁（#14 #15，及 #10 連動）
- metadata title `資源 · 出海補助與工具`；description `正在開放的政府出海補助、案例、實務文章與比對工具——一個入口看完所有可以幫你出海的資源。`
- h1：`出海資源中心，`／（金）`補助與工具一次看完`
- 副標：`政府出海補助協助降低成本，案例、文章與比對工具提供判斷依據。每一項都能直接銜接鹿飛的服務`
- 「活動與現場紀錄」整段刪除（WO-R4-0 先刪，B 重做底層）。
- 新底層「繼續探索」：標題 `做決定之前，`／（金）`還可以先看這些`；四張磚：
  1. eyebrow `案例`｜標題 `實際做過的案子`｜內文 `每個案例的完整過程：卡在哪、怎麼判斷、後來怎麼走`｜動作 `看案例 →`（`/cases`）
  2. `洞察與指南`｜`市場與法規的實務文章`｜`依出海階段整理的分析與實務指南`｜`讀文章 →`（`/insights`）
  3. `處境比對`｜`2 分鐘找到最像你的案例`｜`三個問題，比對鹿飛做過的案例與當時的判斷方法`｜`開始比對 →`（`/assess`）
  4. `TradePilot`｜`線上關稅查詢工具`｜`鹿飛自主開發，出口前先把稅則查清楚`｜`前往 TradePilot ↗`（`https://tradepiloter.com`，新分頁）
- 選單與頁尾：`補助與活動` → `補助與資源`；文章分類標籤 `CHAPTER_ARTICLE_TAGS.sub` 同步改 `補助與資源`。頁尾「洞察」欄刪 `現場紀錄`。

### B-8 市場探查頁（#24）
- h1：`先驗證市場，再決定投入`
- 副標（scene）：`在台灣問了一百個人，還是不知道當地消費者會不會買單。\n市場探查把產品帶到當地，直接取得市場反應`
- metadata title `市場探查｜先驗證市場，再決定投入`；description `在台灣問了一百個人，還是不知道當地消費者會不會買單。市場探查把產品帶到當地，直接取得市場反應。`
- 步驟 02：標題 `當地消費者測試面板`；內文 `依產品篩選的當地消費者圍著桌子。\n拿起來、聞一聞、翻價錢。有人皺眉，有人問哪裡買得到`
- FAQ 第 3 題：問 `測試面板的成員怎麼選？`；答 `依產品的目標市場，篩選當地有購買力、真正會掏錢的消費者。拿起、放下、追問價格的真實反應，比問卷準。`；重點 `依目標市場篩選，看真實反應`
- 「下一章」卡片引用此頁標題的地方（`after.next.heading`）同步改成 `先驗證市場，再決定投入`。

### B-9 寄賣頁、公司落地頁（#19 #20）
- 寄賣「方案包含」（取代 `寄賣包服務內容` 五張卡；標題改 `寄賣包包含的五件事`）：
  1. 大磚 `電商通路上架`：`放進合作的菲律賓電商通路，貨放合作夥伴的倉，賣多少算多少`；底部小字 `核心服務`
  2. `產品證代持`：`化妝品、食品的證由持證進口商代辦代持，資料歸你`
  3. `社群試用活動`：`證還沒下來的那段時間，先在當地社群做試用與活動`
  4. `市場報告`：`把市場探查那一頁展開，補價格帶、競品、通路`
  5. `網紅與活動配套`：`只投廣告不夠，這部分跟你一起排`
- 寄賣進度表第 3～6 週：`社群試用活動：先讓人用過。有人在社群裡問，有人拍了影片`
- 公司落地「費用」：計價 `按案報價`；說明 `第一次談就給成本框架與時間表`；表頭 `第一次談會給你`；五列 `公司註冊`／`依公司類型給大概範圍`、`律師行文件`／`依文件範圍給大概範圍`、`招聘`／`依人數、實體或遠程給大概範圍`、`場地`／`依地點與規模給大概範圍`、`時間表`／`依公司類型與人數排出時程`
- 其他服務頁的價格區只換版型，文字不變（新增區塊小標 `費用`）。

### B-10 海外客服頁（#18）
- h1：`海外客服，交給專業英語團隊`
- 副標不變。metadata title `海外客服｜交給專業英語團隊`（description 不變）。
- `m9.next.heading`（公司落地頁的「下一章」卡）同步改。

### B-11 方法論例子區（#21，含 H-3）
區塊標題不變 `我們怎麼問市場`；新增說明 `兩個真實的研究例子：怎麼問、問到什麼、品牌接下來怎麼做`。切換鍵：`花生糖禮盒`、`防曬乳`。
- 例子一｜標題 `一盒台灣手工花生糖禮盒，想去菲律賓`｜標籤 `一對一訪談`、`競品橫表`
  - 怎麼問：`一對一訪談五位當地受訪者：看產品卡、現場試吃、逐題追問。\n同時把當地十個花生甜食競品攤成一張橫表：碧瑤的老牌、超市裡的國民零食、台灣進口的牛軋糖、在地的精品禮盒——價格、訴求、好評負評、通路`
  - 發現（四磚：標籤／重點／說明）：`價格`／`換算後是當地心理價位的兩倍以上`／`有受訪者直接拿一天的工資來比`；`效期`／`效期遠長於當地主流產品`／`當地最知名的花生脆糖效期約一個月；在熱帶濕氣下，這是實際的賣點`；`口味`／`其中一個口味評價兩極`／`不同年齡層的反應明顯分歧，需要擴樣再確認`；`市場空白`／`沒有競品主打全素與潔淨標章`／`十個競品裡，這一格是空的`
  - 決策意涵（三條）：`價格要重新設計`；`送禮是唯一撐得住高價的場景`；`全素是沒有人站的位置`
  - 附註：`五份訪談不是統計，是方向。報告標明這是「定位假設」，不是已驗證的定位；方向對了，再花錢擴樣`
- 例子二｜標題 `一瓶台灣防曬，想去菲律賓`｜標籤 `試用訪談`、`交叉驗證`
  - 怎麼問：`把產品交給當地受訪者實際試用，逐一訪談。\n再對照當地電商評價、競品文案與社群討論，交叉驗證`
  - 發現（兩磚）：`成分認知`／`「維他命 C」在當地等於美白`／`台灣講抗氧化，當地消費者聽到的是另一件事`；`香味偏好`／`當地偏好有香味`／`台灣消費者偏好無香，菲律賓剛好相反`
  - 決策意涵：`要改的是溝通方式與香味，不是配方`；`宣稱要落在當地法規允許的範圍內`；`比重做產品便宜得多`
  - 附註：`這兩件事，在台灣問一百個人也問不到`
- 區塊結尾句與 CTA 不變。
- 同頁 `DOUBLE_SCORE_COPY` 的 `真正的對手，是她們心裡那個價位。` → `真正的對手，是受訪者心裡那個價位。`

### B-12 全站目標族群標籤掃描結果（H-3）
| 位置 | 原文 | 改成 |
|---|---|---|
| `chapters.ts` m1 title／scene／步驟 02／FAQ 3／after.next.heading | 見 B-8 | 見 B-8 |
| `app/services/product-testing/page.tsx` metadata | `…馬尼拉的媽媽…` | 見 B-8 |
| `chapters.ts` m3 寄賣進度表、服務內容 | `學校家長活動`（兩處） | `社群試用活動`（B-9） |
| `ServicesPage.tsx` 第一章能力卡 | `當地上班族與家長組成的測試面板，產品上架前先取得真實反應` | `當地消費者組成的測試面板，產品上架前先取得真實反應` |
| `methodology/content.ts` 例子一、二 | `二十多歲的菲律賓女性上班族`、`年輕人喜歡，長輩明確不愛`、`小資族`、`小資上班族`、`她們` | 見 B-11 |
| `methodology/content.ts` `DOUBLE_SCORE_COPY` | `她們心裡那個價位` | `受訪者心裡那個價位` |
| `cases.ts` 珍奶 | `25–35 歲白領`、`目標客群` | 刪（B-4） |
不改：圖片 `alt`（描述畫面，例如 `女性在貨架前檢視產品包裝`）、`src/data/articles.ts`、客戶引言。

---

## C. 設計規格

共通：方角；品牌色 token；只動 `transform`／`opacity`；彈簧 damping 1、可中斷；減少動態直接切換；hover 只在 `(hover:hover)`；收合／分頁內容在伺服器 HTML；不做捲動淡入；新圖一律 `TieredImage` lazy。

### C-1 案例：文字型成果值（H-2）
- `CaseStat.value` 含阿拉伯數字（`/\d/`）→ 現狀（大字、`data-lufe-counter`）。
- 不含數字 → 不加 `data-lufe-counter`；字級 `clamp(32px,4vw,48px)`／650／`leading-[1.15]`／`tracking-[-.02em]`／`text-navy`；標籤不變。
- 列表卡大數字、相關案例卡、首頁卡、首頁成果三格同一規則（文字值不跳、字級降一階：列表卡 `clamp(40px,5vw,56px)`、首頁卡 `36px`／featured `44px`、首頁三格 `clamp(26px,3.2vw,36px)`）。
- 導覽列手機版案例子選單的 `num` 標記照顯示（`全球`、`FDA`、`10 家`）。

### C-2 關於頁故事版型（#2）
1. hero：G-3 標準；影片換 §D 的 `about`。
2. `section#story`（`scroll-mt-[80px]`、白底 `py-[80px] md:py-[112px]`）：最上方一行小字 `鹿飛的故事`（13px／600 `text-gold-d`）。四章同 R3 §C-1 第 3 點版型（左 `lg:col-span-4 lg:sticky lg:top-[112px]`、右 `lg:col-span-7 lg:col-start-6`、章與章 `border-t border-bd`）。左欄：章號（Inter 14px／600 `text-gold-d`）＋章名（13px／600 `text-tx3`，`mt-1`）＋標題（`clamp(24px,2.6vw,34px)`／650）。右欄段落 18px／1.9 `text-tx2`。
3. 第 01 章右欄段落之後：數字列 `mt-10 grid grid-cols-3 gap-5 border-t border-bd pt-6`，數字 `num text-navy`＋`data-lufe-counter`，標籤 13px `text-tx3`。再下方入口卡 `mt-8`：`a` 整卡、`target="_blank" rel="noopener noreferrer"`、`grid grid-cols-[1fr_auto] items-center border border-bd p-6`，小字 13px／600 `text-gold-d`、標題 `h3`、副字 14px `text-tx3`、右側 44×44 線框方塊 `border border-gold/40 text-gold-d` 內放 `↗`；滑過 `border-gold`＋方塊內箭頭 `translate(2px,-2px)`；按下 `scale(.985)`。
4. 圖：每章有圖就放在該章之後，沿用案例內頁的寬幅畫面停頓（`aspect-[4/3] md:aspect-[21/9]`、±4% 視差、圖說 13px `text-tx3`）；直式來源（compass、news-interview）用 `object-position` 對準主體（compass `center`、news `42% center`）。可抽出共用元件 `src/components/story/StoryChapters.tsx`（案例頁不改，避免跨工單衝突；之後再收斂）。
5. 第 04 章連結 `看四個方案 →`：15px／600 `text-gold-d`，箭頭滑過右移 4px。
6. 團隊、網絡、信念三區的 eyebrow：13px／600（淺底 `text-gold-d`、深底 `text-gold`），放在 h2 上方 `mb-4`。
7. 刪除舊 `Carousel` 故事區（關於頁不再有橫滑）。

### C-3 文章目錄（#13，所有文章）
**桌機側欄**（`aside` sticky 不變）：
- 標題列：左 `本文目錄`（13px／600 `text-tx3`），右 `03 / 07`（13px、`tabular-nums`、`text-tx3`，目前節＋1／總節數）。
- 清單：拿掉左側整條框線與金色細條。每項 `grid grid-cols-[28px_minmax(0,1fr)] gap-2 py-2.5 pr-3 pl-3`；編號 `01`（Inter 12px／600 `tabular-nums`）；文字 14px／1.5，最多兩行（`line-clamp-2`）。
- 狀態：已讀過的節 → 編號與文字 `text-tx3`；目前節 → 編號 `text-gold-d`、文字 `text-tx font-semibold`；未讀 → 編號 `text-tx3`、文字 `text-tx2`。
- 目前節的底板：一塊 `bg-cream` 方塊（左緣 2px `bg-gold`）絕對定位在清單後面，`translateY` 與高度用彈簧（response 0.35、damping 1）跟到目前項；減少動態直接跳。
- 清單下方：進度軌 `mt-5 h-[2px] bg-bd`，金色填色用 `scaleX`（與頁頂閱讀進度同一個值）；右下 `剩約 {n} 分鐘`（12px `text-tx3`，`n = ceil(讀完分鐘 × (1 − 進度))`，`讀完分鐘` 從 `article.readTime` 取第一個數字；取不到就不顯示；讀完顯示 `已讀完`）。
- 滑過（可滑鼠裝置）未選項文字變 `text-tx`；按下 `scale(.985)`。點擊行為不變（平滑捲動、`replaceState`）。
**手機**：
- 標題下方原本的 `Disclosure` 保留，內容換成同一份編號清單（無底板、無剩餘時間）。
- 新增「目前章節」細列：捲過封面圖後出現，`fixed left-0 right-0 top-[76px] z-[50] border-b border-bd bg-white/90 backdrop-blur`（減少透明度偏好時 `bg-white`），高 44px：左 `03 / 07`（12px `tabular-nums` `text-gold-d`）＋目前節標題（14px／600 單行截斷）＋右側 `+` 線框方塊（展開時轉 45°）。出現用 `opacity`＋`translateY(-8px→0)` 彈簧；點細列往下展開同一份清單（最高 60svh、可捲動），展開面板從細列長出（`transform-origin: top`、`scaleY` 不用——用高度彈簧＋內容淡入，同 FAQ 安靜版）；點清單項＝捲到該節並收起；點細列外或按 Esc 收起。清單在伺服器 HTML（`hidden` 直到展開）。只在 `<lg` 顯示；文章沒有節就不出現。
- 文案新增：`剩約`、`分鐘`、`已讀完`。
- 測試：伺服器 HTML 有編號 `01`、`本文目錄`、手機細列的清單項數＝節數、無 `rounded-`。

### C-4 資源頁「繼續探索」（#15）
- `section` `bg-cream py-[80px] md:py-[110px]`；標題 `h2`（第二行金色）`mb-10`。
- `grid gap-4 md:grid-cols-2 lg:grid-cols-4`；每張 `Link`（TradePilot 為 `a` 外連）：`group flex min-h-[280px] flex-col border border-bd bg-white p-7 md:p-8`，上：40×40 線框 icon（`border border-gold/40 text-gold-d`；案例 `BuildingIcon`、洞察 `FileIcon`、比對 `CompassIcon`、TradePilot `ReceiptIcon`）→ eyebrow 13px／600 `text-gold-d` `mt-6` → 標題 `h3 mt-2` → 內文 15px／1.8 `text-tx2 mt-3`；下（`mt-auto pt-8`）：動作 15px／600 `text-navy`，箭頭在 `span` 內滑過右移 4px（外連箭頭 `↗` 往右上 2px）。
- 滑過：上移 4px＋邊框 `border-gold`；按下 `scale(.985)`；減少動態無位移。
- 原本那一行 `想看實際做過的案子？…` 刪除。

### C-5 補助頁 4 個計畫（#16）
目標：第一眼就能比較四個計畫，細節要的人再往下點。原本的「階段地圖」與「規格表全展開」合併成三層。
1. **一眼比較**（取代 `SubsidyStageMap`）：標題列不變 → `div` 比較表：
   - 桌機 `grid lg:grid-cols-4`，四欄依階段排序（評估 → 進入 → 進入 → 優化）；每欄 `lg:grid lg:grid-rows-subgrid lg:row-span-7`，讓同類資訊對齊成同一列；欄與欄 `lg:border-l border-bd`（第一欄無），欄內距 `lg:px-6`。
   - 七列：① 階段 eyebrow（`01 評估`／`02 進入`／`03 優化`，13px／600 `text-gold-d`）② 44×44 線框 icon ③ 編號＋短名（18px／650）④ 額度（`num` 28px `text-navy`，不跳動）＋額度說明（12px `text-tx3`，最多兩行）⑤ 狀態標籤＋時程（13px `text-tx3`）⑥ 一句話（15px／1.7 `text-tx2`，`line-clamp-3`）⑦ 動作 `看重點 ↓`（14px／600 `text-navy`；點了切換下方分頁並捲到分頁列）。
   - 手機：橫向 `SnapRail`（`flex snap-x snap-mandatory gap-4 overflow-x-auto`，每張 `basis-[82vw] border border-bd p-5`），同樣七列由上而下。
   - 列與列之間在桌機加極淡分隔（`border-t border-bd` 於第 ④、⑥ 列上方）讓視線水平比較。
   - 原 `STAGE_LABELS` 說明文字不再顯示（階段名保留）。
2. **分頁**：sticky `Segmented` 不變（hash、捲動、切換動效不變）。
3. **重點面板**（每個計畫，預設只看到這些）：
   - 頂部同 R3（左：亮點徽章、編號＋主管機關、短名、全名、一句話；右：重點框 `補助額度`／`時程`／`適用階段`／`狀態`）。
   - `適合`：兩欄勾選清單（同 R3）。
   - `鹿飛怎麼幫`：深藍框（同 R3）。
   - 其下 `細節` 小標（13px／600 `text-tx3`）＋三個可展開列（共用 `AccordionItem`，安靜版動效，預設收合，內容在伺服器 HTML）：
     - `01`｜`補助涵蓋與費用明細` ＋ 右側 `{n} 項`（n＝`coversDetail` 數）：內容＝涵蓋標籤格＋費用明細卡格（同 R3）。
     - `02`｜`申請與核銷流程` ＋ `{n} 步`：步驟卡格（同 R3）。
     - `03`｜`容易踩雷的點` ＋ `{n} 點`：ember 面板（同 R3）。
   - 面板底不變（`查我是否符合 →`、官方公告、確認日）。
4. 新增文案：`看重點 ↓`、`細節`、`補助涵蓋與費用明細`、`項`、`步`、`點`。舊列名 `補助涵蓋`、`可補助費用明細` 合併後不再單獨出現。
5. 長度目標：1440 寬下，`#plans` 從標題到第一個計畫面板底部的高度比 `9c99ef9` 少至少 40%（WO 量 `getBoundingClientRect` 前後對照）。

### C-6 寄賣「方案包含」（#19）
- 新的章節區塊型別 `included`（只給 m3 用）：`section bg-white py-[72px] md:py-[88px]`；標題 `h2 mb-8`。
- 桌機 `grid lg:grid-cols-3 lg:grid-rows-2 gap-4`：第 1 項大磚 `lg:row-span-2 bg-navy p-8 text-white flex flex-col`：icon（`StoreIcon`，深底線框 `border-gold/40 text-gold`）→ `01`（13px `text-gold`）→ 標題 `clamp(26px,3vw,34px)`／650 → 內文 16px／1.85 `text-white/75` → `mt-auto` 小字 `核心服務`（13px／600 `text-gold`）。其餘四項 `border border-bd bg-cream p-6`：icon 40×40 線框（`BadgeCheckIcon`、`UsersIcon`、`ChartColumnIcon`、`PresentationIcon`）＋編號 `02`–`05` 同一行 → 標題 `h3 mt-5` → 內文 15px／1.8 `text-tx2`。平板 `md:grid-cols-2`（大磚 `md:col-span-2`）；手機一欄。
- 卡片滑過上移 3px（大磚不動）；不做按下縮放（不是連結）。

### C-7 價格區（#20，五個服務頁共用）
- 拿掉深藍大框。`section bg-cream py-[72px] md:py-[88px]` → 容器內 `grid gap-10 border-t border-bd pt-10 lg:grid-cols-12`。
- 左 `lg:col-span-5`：小標 `費用`（13px／600 `text-gold-d`）→ 計價：含數字（`1～2 萬`、`5～6 萬`）用 `num clamp(44px,6vw,72px) text-navy`；不含數字（`按案報價`、`前期低服務費＋成交抽成`）用 `clamp(30px,3.6vw,44px)`／650 `text-tx`；caption 15px／1.7 `text-tx2 mt-3`。
- 右 `lg:col-span-7`：
  - 有 `breakdown`（只有 m9）：表頭列 13px／600 `text-tx3`（`第一次談會給你`），每列 `grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-bd py-5`：項目 16px／650 `text-tx`、右側說明 14px `text-tx2 text-right`（手機改上下）。
  - `details`：每條一列 `flex gap-3 border-t border-bd py-4`，前面 18px `CheckIcon text-gold-d`，15px／1.8 `text-tx2`。
  - `paths`（只有 m1）：`grid md:grid-cols-2 gap-4 mt-6`，`過了 →` 白底 `border border-bd p-6`、`沒過 →` 深藍底 `bg-navy text-white p-6`；保留 `lufe-price-path`／`lufe-price-route` 與其文字。
- m9 資料：`details` 清空，改用新欄位 `breakdown`（B-9）。

### C-8 方法論例子（#21）
- 區塊 `bg-cream`；標題＋說明（17px `text-tx2 mt-4 max-w-[640px]`）→ `Segmented`（`花生糖禮盒`／`防曬乳`）`mt-8`。兩個面板都在伺服器 HTML，非目前的 `hidden`；切換 `opacity 0→1`＋`translateY(8px→0)` 彈簧（response 0.24、damping 1）。
- 面板 `mt-8 border border-bd bg-white`：
  - 頂列 `p-6 md:p-8 border-b border-bd`：標題 `h3`＋標籤（`border border-bd px-2.5 py-1 text-[13px] text-tx2`）。
  - 主體 `grid lg:grid-cols-12`：左 `lg:col-span-4 p-6 md:p-8 lg:border-r border-bd`：`01 怎麼問`（13px／600 `text-gold-d`）＋內文 15px／1.85 `text-tx2 whitespace-pre-line`。右 `lg:col-span-8 p-6 md:p-8`：`02 問到什麼` ＋ 發現磚 `grid sm:grid-cols-2 gap-3 mt-4`，每磚 `border border-bd p-5`：標籤 12px／600 `text-gold-d`、重點 18px／650 `text-tx` `mt-2`、說明 14px／1.75 `text-tx2 mt-2`。
  - 底部深藍帶 `bg-navy p-6 md:p-8 text-white`：`03 決策意涵`（13px／600 `text-gold`）→ 三條 `grid md:grid-cols-3 gap-6 mt-4`，每條 `border-t border-white/20 pt-4`：編號（Inter 13px `text-gold`）＋文字 17px／650 → 附註 14px／1.8 `text-white/70 mt-6`。
- 拿掉手機原點點切換（改用 Segmented）；`SnapRail` 不再用在這區。
- 資料：`METHODOLOGY_EXAMPLES` 改成 `{ key, tab, title, tags, method, findings: {label, headline, detail}[], implications: string[], note }`。

---

## D. 影片與圖片

### D-1 hero 影片表（H-4）
量法腳本：`round4/measure-motion.sh`（R3 的七支參考值完全重現：地圖規劃 74.9、高速公路 42.6、飛機 116.4、超市 301.6、台北 79.0、筆記本 34.6、馬尼拉 7.4）。核心：`scale=320:180,format=gray,tblend=all_mode=difference,signalstats`，每格 YAVG 中位數 × fps（正式轉檔一律 30fps）。所有來源皆 Pexels，Pexels License（可商用、免標示）。

**換片**
| 頁面 | 新檔（`public/videos/hero/`） | Pexels 頁面 | 下載網址（原檔） | 作者 | 段落 | 720 大小 | m | 速度 |
|---|---|---|---|---|---|---|---|---|
| `/about`（#12） | `about-sailing-720.mp4`：深藍海面上的貨櫃輪空拍 | https://www.pexels.com/video/37287417/ | https://videos.pexels.com/video-files/37287417/15795926_1920_1080_60fps.mp4 | Burnard Media | 2s 起 12s | 2.34MB | 26.3 | `1.25` |
| `/cases`（#4） | `cases-skyline-720.mp4`：濱海城市黃昏空拍（新加坡濱海灣） | https://www.pexels.com/video/34862466/ | https://videos.pexels.com/video-files/34862466/14774610_3840_2160_60fps.mp4 | Florian Delée | 2/12 | 1.63MB | 33.2 | `1.25` |
| `/services`（#17） | `services-port-720.mp4`：河港貨櫃碼頭空拍（胡志明市） | https://www.pexels.com/video/32038130/ | https://videos.pexels.com/video-files/32038130/13656580_3840_2160_60fps.mp4 | Toàn BDS | 2/12 | 1.64MB（crf 28） | 58.2 | `1.15` |
| `/services/optimize`（#23） | `optimize-containers-720.mp4`：貨櫃堆正俯拍、緩慢旋轉 | https://www.pexels.com/video/9702133/ | https://videos.pexels.com/video-files/9702133/9702133-uhd_3840_2160_30fps.mp4 | Kindel Media | 2/12 | 1.41MB | 66.8 | `1.05` |
| `/services/north-america`（#22） | `na-skyline-720.mp4`＋`na-skyline-1080.mp4`：隔河看曼哈頓天際線（4K 原檔） | https://www.pexels.com/video/11471275/ | https://videos.pexels.com/video-files/11471275/11471275-uhd_3840_2160_30fps.mp4 | Eyal Be | 2/12 | 1.37MB／1080p 5.03MB | 11.3 | `1.25` |
| `/assess`（#3） | `assess-chess-720.mp4`：暗色金屬西洋棋組，緩慢移鏡 | https://www.pexels.com/video/6599643/ | https://videos.pexels.com/video-files/6599643/6599643-uhd_3840_2160_25fps.mp4 | Tima Miroshnichenko | 2/12 | 0.64MB | 16.4 | `1.25` |
| `/resources`（#14） | `resources-books-720.mp4`：木質書架間緩慢滑移 | https://www.pexels.com/video/38668053/ | https://videos.pexels.com/video-files/38668053/16425003_1920_1080_50fps.mp4 | Zaonar Saizainalin | 0/11 | 0.97MB | 29.7 | `1.25` |
| `/resources/subsidies`（縮時，H-4） | `subsidies-desk-720.mp4`：桌上的圖表文件 | https://www.pexels.com/video/7651532/ | https://videos.pexels.com/video-files/7651532/7651532-uhd_3840_2160_30fps.mp4 | Kindel Media | 0/11 | 0.60MB | 34.5 | `1.25` |
| `/cases/goat-milk-soap-global` | `case-soap-720.mp4`：絲瓜絡袋裡的手工皂，滑軌慢移 | https://www.pexels.com/video/13161560/ | https://videos.pexels.com/video-files/13161560/13161560-uhd_3840_2160_30fps.mp4 | Towfiqu barbhuiya | 2/12 | 1.08MB | 126.1 | `0.75` |
| `/cases/fish-floss-us-fda` | `case-floss-720.mp4`：市場攤位上的魚乾 | https://www.pexels.com/video/34717908/ | https://videos.pexels.com/video-files/34717908/14716373_3840_2160_24fps.mp4 | Khanh Hoang Minh 2 | 2/12 | 1.78MB（crf 28） | 45.6 | `1.25` |

**保留（重量後不變）**：`case-bubbletea` 14.9 → 1.25、`chapter-callcenter` 28.5 → 1.25、`chapter-research` 128.6 → 0.75、`chapter-storefront` 33.3 → 1.25、`chapter-warehouse` 15.7 → 1.25、`contact-laptop` 31.5 → 1.25、`insights-notebook` 34.6 → 1.25（`/insights`、`/about/aaron-yu`）、`methodology-whiteboard` 111.3 → 0.8（有輕微手持重新構圖，可接受）；首頁三支不動。
**換掉的理由**：`about-flight`（Aaron 要船）；`cases-manila`（黃昏燈光變化的縮時）；`chapter-retail`（購物車推得太快，0.6 下限仍快、畫質不夠）；`resources-taipei`、`subsidies-taipei`（縮時）；`services`／`optimize` 原本跟首頁共用（Aaron 要換）；costco／electronics／shoe／fieldnotes 隨頁面刪除。
**備案**（只在 Aaron 不喜歡時用）：about 13379259（日出拖船剪影）、cases 32038120（胡志明市河灣）、services 6595369（貨櫃港正俯拍）、optimize 13606926（倉庫貨架俯拍）、北美 36244245（紐約暮色，僅 8 秒）、assess 6058640（手移動棋子）、resources 34811324（圖書館）、soap 5795241（羊舍山羊）、floss 6150107（魚乾曬架空拍；主選背景有看不清的食用油瓶）、subsidies 6285657（雙手翻文件）。

### D-2 新圖片（Pexels License）
| 用途 | 存檔 | 頁面 | 作者 | 尺寸 | 顯示 |
|---|---|---|---|---|---|
| 珍奶第 2 章（取代破圖） | `cases/story/bubble-tea-tasting.jpg` | https://www.pexels.com/photo/12666797/ | Telly Mina | 4272×2848 | 三杯不同口味珍奶（芋頭紫、抹茶、草莓），無標誌；桌機 16:9、`center 62%` |
| 羊奶皂第 1 章 | `cases/story/goat-soap-1.jpg` | https://www.pexels.com/photo/7055166/ | Pavel Danilyuk | 5473×3654 | 乳白皂塊與乾燥玫瑰；`center 75%` |
| 羊奶皂第 3 章 | `cases/story/goat-soap-2.jpg` | https://www.pexels.com/photo/7814773/ | Mikhail Nilov | 7420×4949 | 牛皮紙上的皂塊，無標籤字 |
| 魚鬆第 1 章 | `cases/story/fish-floss-1.jpg` | https://www.pexels.com/photo/33559692/ | Satish V | 6000×4000 | 市場攤位上的魚乾、蝦乾，無招牌；`center 60%` |
| 魚鬆第 4 章 | `cases/story/fish-floss-2.jpg` | https://www.pexels.com/photo/12024976/ | Mr. Mockup | 3811×2531 | 兩個尚未印刷的立袋（象徵重新設計包裝） |
| 關於頁第 01 章 | `about/about-port.jpg` | https://www.pexels.com/photo/8193332/ | Niklas Jeromin | 5724×3817 | 藍調時刻的貨櫃碼頭起重機剪影；`center 40%` |
刪除：`cases/story/bubble-tea-4*`、皮鞋／Costco／電子的故事圖、詳情圖、首頁卡圖、`public/case-*.jpg`、`public/images/field-notes/`（各工單刪前先 `rg`）。

## E. 需要 Aaron 補／確認（只列事實）

1. **羊奶皂案例**（#7）：①可不可以寫品牌名或給一張產品照？（目前不寫名字、用圖庫圖）②「調整」實際做了哪些：定位、包裝、標示、說法、通路？文案目前寫「定位、包裝與說法」，**也寫了「產品的核心不動」**——如果配方有改請告訴我。③「全球都有」大概是哪些國家或通路？要不要寫幾個國家？④鹿飛參與的時間與年份。⑤原 Costco 案例裡的「小山羊保健品」跟這個羊奶皂是不是同一個品牌？（只是確認，網站不會寫）
2. **魚鬆案例**（#8）：①用的是什麼魚（旗魚、鰹魚、鮪魚…）？配方裡有沒有肉鬆、豬油、醬油、芝麻、色素？——文案目前只寫「常見配方的問題」，有實際情況可以寫得更具體。②美國消費者調研是怎麼做的（線上問卷、試吃、幾個人）？③後來有沒有上市？在哪裡賣？④包裝最後的英文品名。
3. **珍奶案例**（#5）：①九宮格的兩個軸是什麼？（目前寫「價格帶與產品定位」）②盲飲大概幾杯、幾位？③原文案「甜度偏高」跟這次的「健康賽道」衝突，已刪掉，對嗎？
4. **關於頁**（#2）：文案寫「鹿飛從躍馬企業出發」「躍馬把貨送到，鹿飛讓貨在當地被買走」，請確認這樣描述兩家公司的關係可以。
5. **影片選片**（§D-1）：`/cases` 用的是新加坡濱海灣黃昏空拍（找不到夠穩的馬尼拉非縮時片）；`/services` 是胡志明市貨櫃港；北美是曼哈頓天際線。哪支不喜歡回編號，表下有備案可直接換。另外補助頁原本的台北縮時也一併換掉（同 #14 的太快問題）。
6. **首頁成果三格**：`全球`、`FDA` 是文字不是數字，沒有跳動效果；若你希望只放有數字的，就只留珍奶 `10` 一格。

---

## F. 魚鬆法規查證摘要（#8；文案只用到已查證的部分）

| 主題 | 查到的事實 | 來源 |
|---|---|---|
| 管轄 | 只用魚＝FDA 管。含生肉 >3% 或熟肉／禽 ≥2% 屬 USDA-FSIS 管（FSIS 政策） | https://www.federalregister.gov/documents/2007/01/26/E7-1264/fsis-jurisdiction-over-flavor-products-containing-meat-or-poultry |
| 台灣肉品輸美 | FSIS 可輸美國家名單未見台灣（FSIS 網站擋自動讀取，待人工確認）；APHIS 不承認台灣為口蹄疫、豬瘟、豬水泡病非疫區，豬肉產品持續受限；非洲豬瘟限制 2025-10-24 起、2026-08-19 解除（二手來源） | https://www.fsis.usda.gov/inspection/import-export/import-export-library/eligible-foreign-establishments ／ https://www.aphis.usda.gov/sites/default/files/import-alert-asf-taiwan.pdf ／ https://www.aphis.usda.gov/aphis/ourfocus/animalhealth/animal-and-animal-product-import-information/animal-health-status-of-regions ／ https://www.nationalhogfarmer.com/farm-policy-news/aphis-lifts-restrictions-on-taiwan-due-to-african-swine-fever-status |
| 水產品 HACCP | 以魚為特徵成分的食品屬「fishery product」，國外加工廠適用 21 CFR 123；進口商依 123.12 驗證 | https://www.law.cornell.edu/cfr/text/21/123.3 ／ https://www.law.cornell.edu/cfr/text/21/123.12 |
| 登記／通報／FSVP | 設施登記（21 CFR 1 Subpart H）、每批事前通報（Subpart I）；符合 Part 123 的水產品豁免 FSVP（21 CFR 1.501(b)） | https://www.law.cornell.edu/cfr/text/21/1.501 |
| 低酸罐頭 | 低酸食品＝pH >4.6 且水活性 >0.85；水活性 ≤0.85 的乾魚鬆不屬 LACF，不需 FCE/SID（依實測水活性） | https://www.law.cornell.edu/cfr/text/21/113.3 |
| 標示 | 品名（無法定名稱時用常用名或描述性名稱；「fish floss」是否算常用名不確定，建議加描述與魚種）、淨重公制＋英制、成分排序、營養標示、廠商名址、原產地；份量基準可能是「乾魚 30g」或「配料 7g」，待定 | https://www.law.cornell.edu/cfr/text/21/101.3 ／ https://www.law.cornell.edu/cfr/text/21/101.12 |
| 過敏原 | 九大過敏原含魚（須寫魚種）、黃豆、小麥、芝麻（2023 起） | https://www.fda.gov/food/food-labeling-nutrition/food-allergies |
| 色素／添加物 | 色素須列於 21 CFR 73／74；相關進口警示：16-120（水產品 HACCP，含台灣廠）、45-02（違規色素）、99-22（未標示過敏原）、99-45（不安全添加物）、16-81、16-105（組織胺）、16-04 | https://www.accessdata.fda.gov/cms_ia/ialist.html ／ https://www.accessdata.fda.gov/cms_ia/importalert_25.html ／ https://www.accessdata.fda.gov/cms_ia/importalert_118.html ／ https://www.accessdata.fda.gov/cms_ia/importalert_561.html |
| 魚種名稱與組織胺 | FDA Seafood List 的市場名（旗魚要分 Swordfish／Marlin、鰹魚＝Tuna、Bonito）；鮪、鰹、旗魚類有組織胺風險，乾燥過程中也會生成 | https://hfpappexternal.fda.gov/scripts/fdcc/index.cfm?set=SeafoodList ／ https://www.fda.gov/media/80637/download |
| 鈉／糖 | 無上限；營養宣稱受 21 CFR 101.13、101.61 規範；FDA 減鈉目標為自願性 | https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/sodium-reduction |
| 羊奶皂（B-2 引用） | 美國：符合「真皂」定義且只標清潔用途歸 CPSC；宣稱保濕等屬化妝品歸 FDA。歐盟：化妝品上市前須有歐盟境內負責人並經 CPNP 通報 | https://www.fda.gov/cosmetics/cosmetics-laws-regulations/it-cosmetic-drug-or-both-or-it-soap ／ https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-product-notification-portal_en |

文案刻意**不寫**的：台灣是否「不在」FSIS 名單（未能直接確認，改寫成「資格受到嚴格限制」）、具體份量數字、具體進口警示編號、任何檢驗結果。

---

## G. 工單與順序

| WO | 內容 | 依賴 | 可並行 |
|---|---|---|---|
| `WO-R4-0-shared` | 影片（換片、重量、`srcHd`、刪舊）、新圖素材、四組 301、刪 `/field-notes` 全部連動（含資源頁區塊、選單、頁尾）、`heroVideos` 鍵名（#3 素材 #4 #10 #12 #14 #17 #22 #23） | — | **先跑、單獨跑** |
| `WO-R4-A-cases-assess-home` | 三個案例資料與頁面、珍奶圖修正、列表與篩選、處境比對（含 hero 影片接上）、首頁成果三格與案例輪播、補助頁對照文案（#3 #5–#9） | R4-0 合併後 | 與 B 並行 |
| `WO-R4-B-about-insights-resources` | 關於頁故事化、洞察 h1、文章目錄、資源頁 hero 與繼續探索、補助頁 4 個計畫（#1 #2 #11 #13 #15 #16） | R4-0 合併後 | 與 A 並行 |
| `WO-R4-C-services` | 市場探查與客服 h1、全站族群標籤（服務與方法論）、寄賣方案包含、價格區、方法論例子（#18–#21 #24） | A 或 B 任一合併後（同時最多兩條） | 與 A／B 剩下那條並行 |
| `WO-R4-Z-integration` | 字型提交、全站稽核、轉址檢查、Lighthouse 對照 `9c99ef9` | A、B、C 合併後 | — |
