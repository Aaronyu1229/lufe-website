# 重建中文字型子集

平常不需要跑這個指令。只有在新增或修改網站文案後，建置檢查說有中文字、標點或 emoji
不在字型子集裡時，才需要重建。

先在專案根目錄安裝一次 Python 工具：

```sh
pip3 install fonttools brotli
```

接著執行：

```sh
npm run font:rebuild
```

它會讀取網站原始碼，以及已經存在的建置頁面（如果有），並重建較小的中文字型。
第一次執行時會下載原始字型到 `.font-cache/`；這是本機快取，不會進版控。

跑完請一起 commit 這兩個檔案，不能只放其中一個：

- `src/app/fonts/NotoSansTC-subset.woff2`
- `src/app/fonts/subset-charset.txt`

`OFL.txt` 是字型授權檔，請保留在同一個資料夾，不需要每次重建都修改它。
