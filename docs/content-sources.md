# 作品集內容核對紀錄

核對日期：2026-09-17。依公開 GitHub README、提交紀錄與使用者提供的經歷更新網站文字，不代表重新執行過各專案的產品測試。

## 本次更新的公開專案

- [music-detection README](https://github.com/Hikari-Tsai/music-detection/blob/53f1141/README.md)：Key & Tempo；整合 Beat This! 與 S-KEY，以 Browser ONNX／Local Python 分析 BPM、拍號與調性，支援片段、波形試聽與 MIDI Tempo。瀏覽器路徑使用 Web Worker、WebGPU／WASM、SHA-256 驗證及模型快取。
  - 不宣稱自行原創或訓練 Beat This!／S-KEY；此處呈現的是整合、移植與應用開發。
  - MIDI 匯出是速度與可判定的拍號，不是音符轉錄、和弦辨識或音訊轉 MIDI。
  - 「音訊留在裝置」限定 Browser ONNX 模式；不宣稱初次載入完全離線。
- [JS_Inflator 中文 README](https://github.com/Hikari-Tsai/JS_Inflator/blob/40016bc/README.zh-TW.md)：基於 yg331／Kiriki-liszt 的 JS Inflator，維護 Hikari AAX 適配與跨平台建置；C++、Steinberg VST3 SDK、VSTGUI 與 CMake。
  - Hikari 的工作包含 AAX 整合、電表及 editor 同步修復、音訊／介面回歸測試和 CI 封裝；不將上游 DSP 核心或 oversampling 演算法寫成自行原創。
  - macOS 提供 VST3、AUv2、AAX；Windows 提供 VST3、AAX，不宣稱 Windows AU。
  - AAX 是測試版本，未經 Avid／PACE 簽章，只能用於 Pro Tools Developer。Windows 宿主、automation 錄製、session 重載及 AudioSuite 仍有待驗證。
- [auto-mr README](https://github.com/Hikari-Tsai/auto-mr/blob/1730b68/README.md)：集中管理設定名單中的專案，建立／沿用 staging → main PR，尊重 CI、review 與 branch protection，不宣稱繞過檢查或無條件合併。
- [GitHub 個人介紹](https://github.com/Hikari-Tsai/Hikari-Tsai)：核對資深生成式 AI 研發工程師、音訊外掛開發者與獨立音樂人定位；另核對 Twitch Bot 的人設、上下文、回覆規則與冷卻控制，以及音樂作品集連結。

## 保留的使用者經歷

Music Gen、SVS 及藝人／VTuber 合作、PhysicsNeMo／PINN、RAG、CES 獲獎智慧音箱、OpenCart 與金流來自本任務先前使用者說明。此次不新增未提供的年資、成效數據或合作對象。

四項榮譽、三張 AWS 個人 Credly 驗證連結保持不變。既有 private RAG／web-pinn 只保留已公開的摘要，不加入私有 repo 連結或內部實作細節。

移除首頁寫死的 repository 數量，避免把會變動的數值長期留在靜態文案。沒有新增星數、使用量或模型準確率等行銷數字。
