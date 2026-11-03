import CoreScene from "./core-scene";
import AudioLab from "./audio-lab";
import Image from "next/image";

const projects = [
  {
    index: "01",
    name: "PIE",
    type: "PHYSICS INFORMS EVERYTHING",
    description:
      "以 PhysicsNeMo 與 MCP 串接物理研究流程，協助 AI Agent 整理方程式、查找模型與文獻、處理 CAD／網格輸入，並驗證模型與追蹤實驗。組織內部專案，僅展示已公開的摘要。",
    stack: ["PhysicsNeMo", "MCP", "Research Skills"],
    visibility: "PRIVATE WORK",
  },
  {
    index: "02",
    name: "TrackMate",
    type: "AI-ASSISTED PRO TOOLS WORKFLOW",
    description:
      "結合檔名規則與本機 ONNX 模型辨識 stems，整理軌名、分類與顏色，偵測假立體聲及 BPM。透過 Avid PTSL 匯入 Pro Tools 並核對結果；Windows 已提供建置，仍待實機驗證。",
    stack: ["Flutter", "Python / ONNX", "Pro Tools PTSL"],
    href: "https://github.com/Hikari-Tsai/TrackMate",
  },
  {
    index: "03",
    name: "karaoke-battle",
    type: "LOCAL MUSIC AI · LIVE PITCH",
    description:
      "以 Flutter 與 C++ 原生引擎整合本機人聲分離、旋律轉譜、即時音高及演唱評分，支援音符修正與回放。使用上游預訓練模型，其中 GAME 權重受非商業授權限制。",
    stack: ["Flutter / Dart", "C++ / FFI", "ONNX Runtime"],
    href: "https://github.com/Hikari-Tsai/karaoke-battle",
  },
  {
    index: "04",
    name: "HT-76",
    type: "FET COMPRESSOR · AUDIO PLUG-IN",
    description:
      "基於 JUCE 與開源 fetcomp-dsp 核心開發 1176 風格壓縮器，提供 Rack／Dynamic 介面、電平計量與參數自動化。Rev H 為未經實機校準的實驗模型，AAX 發行與宿主驗證仍有限制。",
    stack: ["C++ / JUCE", "FET DSP", "VST3 / AU / AAX"],
    href: "https://github.com/Hikari-Tsai/HT-76",
  },
  {
    index: "05",
    name: "HT-1B",
    type: "PHYSICS AI · AUDIO MODELING",
    description:
      "研究 CL 1B 縮減電路求解與 PhysicsNeMo 參數辨識，另實作 S4／S6 + Temporal FiLM 神經音訊訓練流程。電路 PINN 與資料驅動模型分開驗證，尚不宣稱整機復刻或即時外掛效能。",
    stack: ["PhysicsNeMo", "PyTorch", "PINN / SSM"],
    href: "https://github.com/Hikari-Tsai/HT-1B",
  },
  {
    index: "06",
    name: "music-detection",
    type: "MUSIC ANALYSIS · KEY & TEMPO",
    description:
      "整合 Beat This!、S-KEY 與 GAME，分析 BPM、拍號、調性與歌聲音高，支援片段試聽及 Tempo + Lead Vocal MIDI 匯出。瀏覽器模式音訊不上傳；GAME 權重限非商業使用。",
    stack: ["ONNX", "WebGPU / WASM", "Vocal MIDI"],
    href: "https://github.com/Hikari-Tsai/music-detection",
  },
  {
    index: "07",
    name: "JS_Inflator",
    type: "AUDIO DSP · CUSTOMIZED FORK",
    description:
      "基於 JS Inflator 開源核心，維護 AAX 適配、音訊電平表同步、跨平台建置與回歸測試。macOS AAX 已通過 PACE 簽章驗證，尚未實測標準版 Pro Tools；Windows 目前提供 VST3。",
    stack: ["C++", "VST3 / AUv2 / AAX", "VSTGUI", "CMake"],
    href: "https://github.com/Hikari-Tsai/JS_Inflator",
  },
  {
    index: "08",
    name: "ai-interview",
    type: "RECALL · MULTILINGUAL KNOWLEDGE",
    description:
      "將上游面試題庫整理成中、英、日文學習卡，保留原始來源與 AI 輔助解答，透過 GitHub Actions 增量更新。以 Astro／TypeScript 建立靜態網站，支援社群答案與待補內容管理。",
    stack: ["Astro", "TypeScript", "Structured Outputs"],
    href: "https://github.com/Hikari-Tsai/ai-interview",
  },
  {
    index: "09",
    name: "auto-mr",
    type: "DEVELOPER AUTOMATION",
    description:
      "集中管理多個 GitHub 專案的 staging → main 流程，自動建立或沿用 PR，依各專案的 CI、review 與分支保護條件推進合併。",
    stack: ["TypeScript", "GitHub API", "GitHub Actions"],
    href: "https://github.com/Hikari-Tsai/auto-mr",
  },
  {
    index: "10",
    name: "web-pinn",
    type: "PRIVATE PHYSICS AI",
    description:
      "為物理資訊神經網路（PINN）應用開發前端展示介面，整理模型操作與結果呈現流程。",
    stack: ["HTML", "PINN", "Scientific ML"],
    visibility: "PRIVATE WORK",
  },
  {
    index: "11",
    name: "rag",
    type: "PRIVATE KNOWLEDGE AI",
    description:
      "整合文件處理、語意搜尋與 LLM 回答流程，讓企業內部知識可供檢索，並保留回答的來源脈絡。",
    stack: ["Python", "RAG", "LLM"],
    visibility: "PRIVATE REPO",
  },
  {
    index: "12",
    name: "dc-manager",
    type: "AI × DISCORD",
    description:
      "以 LLM 協助 Discord 內容審核、話題整理與頻道分析，支援繁體中文的社群管理流程。",
    stack: ["Python", "LLM", "Discord API"],
    href: "https://github.com/Hikari-Tsai/dc-manager",
  },
  {
    index: "13",
    name: "twitch-bot",
    type: "CREATOR AI",
    description:
      "以 LLM 與實況主人設設定回覆 Twitch 聊天室，結合對話脈絡、回覆規則與冷卻控制，支援直播互動。",
    stack: ["Python", "LLM", "Twitch"],
    href: "https://github.com/Hikari-Tsai/twitch-bot",
  },
  {
    index: "14",
    name: "opencart-newebpay",
    type: "COMMERCE",
    description:
      "開發 OpenCart 藍新金流支付模組，串接購物網站的付款流程與交易回應。",
    stack: ["PHP", "OpenCart", "Payment API"],
    href: "https://github.com/Hikari-Tsai/opencart-newebpay",
  },
];

const skills = [
  ["AUDIO & DSP", "C++ 音訊處理、FET 壓縮器整合、oversampling、立體聲分析、電平計量與回歸測試"],
  ["MUSIC ANALYSIS", "人聲分離、旋律轉譜、即時 F0、BPM／調性分析、Tempo + Vocal MIDI、ONNX"],
  ["MUSIC & VOICE AI", "符號音樂生成、可編輯多軌音樂、SVS 歌聲合成、模型訓練與音樂製作流程"],
  ["PHYSICS & RESEARCH", "PhysicsNeMo、PINN、電路參數辨識、MCP、模型驗證與可追溯研究流程"],
  ["AUDIO PLUG-INS", "JUCE、VSTGUI、VST3／AU／AAX 整合、CMake、跨平台封裝與簽署驗證"],
  ["DAW WORKFLOWS", "Pro Tools PTSL、stem 辨識與命名、假立體聲偵測、mono 轉換與 tempo map 匯入"],
  ["DESKTOP & INFERENCE", "Flutter／Dart、C++ FFI、Python 引擎、ONNX Runtime、本機模型管理與桌面應用封裝"],
  ["NEURAL AUDIO", "PyTorch、S4／S6 狀態空間模型、Temporal FiLM、有狀態音訊分段與訓練流程實作"],
  ["KNOWLEDGE SYSTEMS", "RAG、Agent 工作流程、結構化輸出、來源追溯、多語系知識內容與增量更新"],
  ["WEB & AUTOMATION", "TypeScript、JavaScript、Python、FastAPI、Web Worker、GitHub Actions 與 PR 自動化"],
  ["CREATOR SYSTEMS", "獨立音樂創作、藝人／VTuber 合作、Discord / Twitch Bot、社群互動工具"],
  ["COMMERCE", "OpenCart 模組、藍新金流串接、購物車與後台營運流程"],
  ["AIoT", "智慧音箱、嬰兒哭聲辨識、聲音事件與裝置動作整合"],
];

const experience = [
  {
    code: "PIE",
    title: "PIE 物理研究 Agent",
    description: "開發 PhysicsNeMo MCP 橋接與研究 Skills，串起物理問題形式化、模型與文獻查找、CAD／網格處理，以及模型驗證與實驗追蹤。此處僅呈現公開自介已揭露的能力範圍。",
    tags: ["PhysicsNeMo", "MCP", "Research Workflow"],
  },
  {
    code: "DAW_TOOLS",
    title: "TrackMate 與 Pro Tools 整合",
    description: "開發 Flutter 桌面介面與 Python 推論引擎，結合規則、文字嵌入與音訊模型辨識音軌。處理立體聲分析、軌名與分類、速度圖匯入，並以 PTSL 讀回結果核對。",
    tags: ["Flutter / Python", "Local ONNX", "Pro Tools PTSL"],
  },
  {
    code: "LIVE_PITCH",
    title: "Karaoke Battle 演唱分析",
    description: "以 Flutter／Dart 與 C++ FFI 整合人聲分離、旋律轉譜及即時音高追蹤。開發演唱評分、移調、音符修正與回放功能，處理本機模型下載、校驗與跨平台封裝。",
    tags: ["C++ / FFI", "Pitch Tracking", "Source Separation"],
  },
  {
    code: "MUSIC_ANALYSIS",
    title: "音樂分析與瀏覽器推論",
    description: "整合 Beat This!、S-KEY 與 GAME，處理 Web Worker 推論、模型來源校驗與快取。支援全曲或片段的節拍、調性與歌聲音高分析，匯出 Tempo／Lead Vocal MIDI；瀏覽器模式音訊不離開裝置。",
    tags: ["Music Information Retrieval", "WebGPU / WASM", "Vocal MIDI"],
  },
  {
    code: "AUDIO_DSP",
    title: "音訊 DSP 與外掛整合",
    description: "在 JS Inflator 開源核心上進行 AAX 適配與電平表同步修復；另以 JUCE 與 fetcomp-dsp 開發 HT-76 的 Rack／Dynamic 介面、參數自動化與計量。維護跨平台封裝、簽署驗證及音訊回歸測試。",
    tags: ["C++ / JUCE", "AAX Integration", "Audio Regression"],
  },
  {
    code: "PHY_AI",
    title: "HT-1B 電路與神經音訊建模",
    description: "以 PhysicsNeMo 研究縮減電路的參數辨識與直接求解，另實作 S4／S6 + Temporal FiLM 的監督式音訊訓練流程。分開處理物理殘差與資料誤差，不將神經模型等同於 PINN，也不把訓練誤差當成實機還原度。",
    tags: ["PINN / Circuit Solver", "S4 / S6", "Temporal FiLM"],
  },
  {
    code: "KNOWLEDGE",
    title: "RAG 與多語系知識工具",
    description: "開發文件處理、知識檢索與 LLM 回答流程。公開專案 Recall 則將上游面試題庫整理為多語系學習卡，保留來源與社群答案，透過增量更新與內容檢查維護 AI 輔助解答。",
    tags: ["RAG / Agents", "Structured Outputs", "Astro / TypeScript"],
  },
  {
    code: "EDGE_AI",
    title: "CES 獲獎 AIoT 智慧音箱",
    description: "參與 CES Innovation Award 獲獎智慧音箱開發，以 AI 偵測與識別嬰兒哭聲，並觸發對應的裝置動作。",
    tags: ["CES Award", "Cry Recognition", "Smart Speaker"],
  },
  {
    code: "MUSIC_GEN",
    title: "Music Gen 模型",
    description: "開發符號表象的音樂生成模型，讓生成結果保留可編輯的音樂結構，並支援多軌分軌，供後續編曲與製作使用。",
    tags: ["Music Generation", "Symbolic Music", "Multi-track"],
  },
  {
    code: "SVS",
    title: "SVS 歌聲合成",
    description: "開發 Singing Voice Synthesizer，負責資料準備、模型訓練與應用整合。曾與 Kimberly、黃明志、芒果醬、VERBAL（m-flo）及 VTuber 多帕合作開發。",
    tags: ["Singing Voice", "Model Training", "Artist Collaboration"],
  },
  {
    code: "E_COMMERCE",
    title: "OpenCart 電商與金流",
    description: "以 OpenCart 架設購物網站並開發客製模組，串接藍新金流，以及物流匯出與後台營運流程。",
    tags: ["OpenCart", "Payment Gateway", "E-commerce Module"],
  },
  {
    code: "DEV_AUTOMATION",
    title: "CI 與多專案發佈自動化",
    description: "開發 auto-mr，集中檢查多個專案的 staging 與 main 差異，自動建立 PR 並等待既有 CI 與審查條件。另為音訊外掛建立跨平台建置、封裝驗證與測試版發佈流程。",
    tags: ["GitHub Actions", "TypeScript", "Release Engineering"],
  },
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    badgeUrl: "https://www.credly.com/badges/406f8ed0-c2f1-48b9-8fef-21bac421a9e8/public_url",
    imageUrl: "aws-solutions-architect-associate.png",
    description: "具備在 AWS 上設計安全、具韌性、高效能且符合成本效益架構的能力。",
  },
  {
    name: "AWS Certified Machine Learning – Specialty",
    badgeUrl: "https://www.credly.com/badges/b3d97b71-ae01-41a0-bb13-a3bfd11a27ec/public_url",
    imageUrl: "aws-machine-learning-specialty.png",
    description: "具備在 AWS 上建置、訓練、調校及部署機器學習解決方案的專業能力。",
  },
  {
    name: "AWS Certified Data Analytics – Specialty",
    badgeUrl: "https://www.credly.com/badges/354046b5-a2fb-4f22-92a9-eb032d9e1d16/public_url",
    imageUrl: "aws-data-analytics-specialty.png",
    description: "具備以 AWS 資料服務設計、建置、保護及維運分析解決方案的專業能力。",
  },
];

const awards = [
  ["2024", "National Dong Hwa University Distinguished Alumnus"],
  ["2023", "1st TAICCA Cultural Entrepreneurship Accelerator"],
  ["2022", "CES Innovation Award"],
  ["2021", "Taiwan Excellence Award"],
];

const assetBasePath = process.env.GITHUB_PAGES === "true" ? "/code-portfolio" : "";

export default function Home() {
  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Hikari Tsai 首頁">
          HIKARI<span>_</span>TSAI
        </a>
        <nav aria-label="主要導覽">
          <a href="#work">作品</a>
          <a href="#skills">技能</a>
          <a href="#credentials">成就</a>
          <a href="#contact">合作</a>
        </nav>
        <div className="status"><i /> AVAILABLE</div>
      </header>

      <section className="hero shell" id="top">
        <CoreScene />
        <div className="eyebrow"><span>01</span> AI · AUDIO DSP · MUSIC</div>
        <div className="hero-name">HIKARI TSAI <span>AI & AUDIO ENGINEER · INDEPENDENT MUSICIAN</span></div>
        <h1>
          I BUILD <em>AI & AUDIO</em>
          <br />TOOLS FOR
          <br /><span className="outline">MUSIC.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            我是 Hikari，獨立音樂人與資深生成式 AI 研發工程師。
            開發本機音樂 AI、Pro Tools 工具與 DSP 外掛，也以 PhysicsNeMo、MCP 與研究 Skills 建立可驗證的物理研究流程。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#work">探索作品 <b>↘</b></a>
            <a className="button" href="https://www.linkedin.com/in/hikari-tsai/" target="_blank" rel="noreferrer">查看履歷 ↗</a>
          </div>
        </div>
        <div className="system-line"><span>TAIPEI / GMT+8</span><span>AI · CODE · MUSIC</span><span>SYSTEM ONLINE</span></div>
      </section>

      <section className="manifesto shell" aria-label="專業定位">
        <div className="section-label"><span>02</span> FIELD NOTES</div>
        <div className="manifesto-copy">
          <p>用音樂人的經驗，思考軟體怎麼被使用。</p>
          <h2>寫模型，也做音樂。<br />關注<span>聲音處理與創作流程</span>的每個環節。</h2>
        </div>
      </section>

      <section className="experience shell" aria-label="AI、音訊與音樂開發經歷">
        <div className="section-head">
          <div className="section-label"><span>03</span> AUDIO, MUSIC & AI EXPERIENCE</div>
          <p>音訊軟體、本機推論與物理研究工具。</p>
        </div>
        <div className="experience-grid">
          {experience.map((item, index) => (
            <article key={item.code}>
              <div className="experience-meta"><span>{String(index + 1).padStart(2, "0")}</span><small>{item.code}</small></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="credentials shell" id="credentials">
        <div className="section-head">
          <div className="section-label"><span>04</span> AWARDS & CERTIFICATIONS</div>
          <p>專業能力與創作成果。</p>
        </div>
        <div className="credentials-layout">
          <div className="credential-column awards-column">
            <div className="credential-title"><span>A</span><h2>HONORS<br />& AWARDS</h2></div>
            <div className="award-list">
              {awards.map(([rank, event], index) => (
                <article key={`${rank}-${event}`}><small>0{index + 1}</small><strong>{rank}</strong><p>{event}</p></article>
              ))}
            </div>
          </div>
          <div className="credential-column cert-column">
            <div className="credential-title"><span>C</span><h2>CERTIFICATIONS</h2></div>
            <div className="cert-grid">
              {certifications.map((certification, index) => (
                <a
                  className="cert-card"
                  href={certification.badgeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`在 Credly 驗證 ${certification.name}`}
                  key={certification.name}
                >
                  <span className="cert-index">0{index + 1}</span>
                  <Image
                    src={`${assetBasePath}/${certification.imageUrl}`}
                    alt={`${certification.name} 證書徽章`}
                    width={600}
                    height={600}
                    unoptimized
                  />
                  <h3>{certification.name}</h3>
                  <p>{certification.description}</p>
                  <small>VERIFY ON CREDLY ↗</small>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="section-head">
          <div className="section-label"><span>05</span> SELECTED WORK</div>
          <p>近期桌面工具、Physics AI 與持續維護的工程專案。</p>
        </div>
        <div className="project-list">
          {projects.map((project) => {
            const projectContent = (
              <>
                <span className="project-index">{project.index}</span>
                <div>
                  <small>{project.type}</small>
                  <h3>{project.name}</h3>
                </div>
                <p>{project.description}</p>
                <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              </>
            );

            return project.href ? (
              <a className="project" href={project.href} target="_blank" rel="noreferrer" key={project.name}>
                {projectContent}
                <b className="arrow">↗</b>
              </a>
            ) : (
              <article className="project project-private" key={project.name}>
                {projectContent}
                <b className="arrow">{project.visibility}</b>
              </article>
            );
          })}
        </div>
        <a className="all-projects" href="https://github.com/Hikari-Tsai?tab=repositories" target="_blank" rel="noreferrer">VIEW ALL REPOSITORIES <span>→</span></a>
      </section>

      <section className="skills shell" id="skills">
        <div className="section-label light"><span>06</span> CAPABILITIES</div>
        <div className="skills-intro">
          <h2>AUDIO.<br /><i>MUSIC.</i><br />ENGINEERING.</h2>
          <p>我用 C++ 處理音訊、以 Flutter 製作桌面工具，將 ONNX 模型接進瀏覽器與 DAW 工作流程。科研應用則結合 PhysicsNeMo、MCP 與實驗追蹤；模型來源、測試條件和未驗證的部分，都需要說清楚。</p>
        </div>
        <div className="skill-grid">
          {skills.map(([title, text], index) => (
            <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="contact shell" id="contact">
        <div className="section-label"><span>07</span> START A CONVERSATION</div>
        <h2>一起開發下一個<br /><span>MUSIC TOOL.</span></h2>
        <AudioLab />
        <p>開放 AI／音訊軟體相關職缺與專案合作：本機音樂 AI、Pro Tools 整合、歌聲合成與 DSP 外掛，也承接 Physics AI、MCP／Agent 與 RAG 工具開發。</p>
        <div className="contact-links">
          <a className="button primary" href="https://www.linkedin.com/in/hikari-tsai/" target="_blank" rel="noreferrer">在 LinkedIn 聯絡我 <b>↗</b></a>
          <a className="button dark" href="https://github.com/Hikari-Tsai" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="button" href="https://hikari-tsai.github.io/homepage/" target="_blank" rel="noreferrer">音樂作品 ↗</a>
        </div>
      </section>

      <footer className="shell">
        <a className="brand" href="#top">HIKARI<span>_</span>TSAI</a>
        <p>AI & AUDIO ENGINEER · INDEPENDENT MUSICIAN</p>
        <p>© 2026 HIKARI TSAI</p>
      </footer>
    </main>
  );
}
