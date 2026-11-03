# 作品集內容核對紀錄

最近核對日期：2026-11-02（Asia/Taipei）。依 GitHub README、提交紀錄與使用者提供的經歷更新網站文字，不代表重新執行過各專案的產品測試。

## 2026-11-02 更新

保留既有版型、3D Piano Roll、Audio Signal Lab、四項榮譽與三張 AWS 認證。本次更新首頁簡介、作品、開發經驗、技能與 metadata，未新增年資、使用者數、模型準確率或效能百分比。

| 公開來源（固定版本） | 採用內容與邊界 |
| --- | --- |
| [GitHub 個人介紹](https://github.com/Hikari-Tsai/Hikari-Tsai/blob/4a371dce817b34e26a2660c864afd6406512d619/README.md) | 個人定位、PIE 的公開摘要。PIE 是 Physics Informs Everything，包含 PhysicsNeMo MCP 橋接、研究 Skills、物理問題形式化、模型／文獻查找、CAD／網格輸入、模型驗證與可追溯實驗。 |
| [TrackMate](https://github.com/Hikari-Tsai/TrackMate/blob/7af2dbf02169cf07745f7bbef858c249feb39114/README.md) | Flutter + Python、本機 ONNX、stem 辨識、假立體聲分析、tempo map 與 Avid PTSL 匯入後核對。文字與音訊模型來自上游；Windows 有 CI 建置但尚待實機驗證，不引用辨識率作一般保證。 |
| [Karaoke Battle](https://github.com/Hikari-Tsai/karaoke-battle/blob/ae356d004bb3f1849c058bff3df397ffe2537be4/README.md) | Flutter／Dart、C++ FFI、本機人聲分離、旋律轉譜、即時 F0、評分、移調、音符修正與回放。使用預訓練模型；GAME 權重受 CC BY-NC-SA 非商業限制，不將專案程式碼 MIT 等同整套產品可自由商用。 |
| [HT-76](https://github.com/Hikari-Tsai/HT-76/blob/6b771d480a92bd0bcd175fe0653e447c1e1fc454/README.md) | JUCE／fetcomp-dsp 整合、Rack／Dynamic 介面、計量與自動化。歸屬上游 FET 核心；Rev H 尚未實機校準。保留 AAX 發行與宿主驗證限制，不泛稱所有平台均支援所有格式。 |
| [HT-1B](https://github.com/Hikari-Tsai/HT-1B/blob/e41e31f293a2c6b13b475751576b57b1057a5908/README.md)、[神經音訊流程](https://github.com/Hikari-Tsai/HT-1B/blob/e41e31f293a2c6b13b475751576b57b1057a5908/s6/README.md) | 縮減電路求解／PINN 參數辨識，與 S4／S6 + Temporal FiLM 的資料驅動流程分開。描述訓練程式實作，不宣稱新序列模型已完成訓練、重現論文指標、整機復刻或即時外掛效能。 |
| [music-detection](https://github.com/Hikari-Tsai/music-detection/blob/7627f3f41f1b5990d3e0d1f89146e1c7e8091074/README.md) | 更新為 Beat This!／S-KEY／GAME 整合；支援估計歌聲音高及 Tempo + Lead Vocal MIDI，不再沿用九月初「僅 Tempo」的描述。GAME 權重限非商業；估計音高不代表歌手完整音域，也不保證分離主唱或辨識正確。 |
| [JS_Inflator](https://github.com/Hikari-Tsai/JS_Inflator/blob/fdb04b512814407ab9f077f8f3ad42d5be72ab6f/README.zh-TW.md) | 更新 AAX 狀態：macOS 指定附件已通過 PACE 簽章驗證，仍是本地自簽測試憑證，未公證且標準版 Pro Tools 尚未實測。Windows 未簽署 AAX 附件已下架，現提供 VST3。簽章通過不等於宿主相容性通過。 |
| [Recall / ai-interview](https://github.com/Hikari-Tsai/ai-interview/blob/3684a5646ae048a63f638e4140318b7bb3c0925a/README.md) | Astro／TypeScript 多語系卡片、來源追溯、結構化 AI 解答與增量更新。題庫來自上游，不宣稱題目原創、企業官方答案或所有題目均已作答；模型呼叫發生在內容生成階段。 |

### 組織專案的公開邊界

依使用者要求核對組織專案與 PIE 文件。網頁僅採用上表公開個人介紹已揭露的 PIE 能力，不複製私有 README、內部實驗資訊、服務設定、路徑或組織 repository 連結。PIE、web-pinn、RAG 以不可點擊的 private work 卡片呈現；也不將組織內其他成員的專案列為個人成果。

公開自介與內部文件的 Skills 數量並非同一時間點，因此網頁不寫死數量。新增能力若僅見於內部文件，留待使用者確認可公開範圍後再納入。

## 2026-09-17 歷史紀錄

以下保留先前核對依據；music-detection 與 JS_Inflator 的現況以上方 2026-11-02 更新為準。

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
