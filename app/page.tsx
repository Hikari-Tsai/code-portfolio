import CoreScene from "./core-scene";
import Image from "next/image";

const projects = [
  {
    index: "01",
    name: "music-detection",
    type: "MUSIC ANALYSIS · KEY & TEMPO",
    description:
      "整合 Beat This! 與 S-KEY，透過瀏覽器 ONNX 或本機 Python 分析 BPM、拍號與調性。支援片段選取、波形試聽及 MIDI Tempo 匯出，將分析結果接進 DAW 製作流程。",
    stack: ["ONNX", "WebGPU / WASM", "Python", "MIDI"],
    href: "https://github.com/Hikari-Tsai/music-detection",
  },
  {
    index: "02",
    name: "JS_Inflator",
    type: "AUDIO DSP · CUSTOMIZED FORK",
    description:
      "基於 JS Inflator 開源音訊效果器，開發 AAX 適配、修復電表與介面同步，建立 macOS／Windows 多格式建置與回歸測試。AAX 仍為測試版，僅適用 Pro Tools Developer。",
    stack: ["C++", "VST3 / AUv2 / AAX", "VSTGUI", "CMake"],
    href: "https://github.com/Hikari-Tsai/JS_Inflator",
  },
  {
    index: "03",
    name: "auto-mr",
    type: "DEVELOPER AUTOMATION",
    description:
      "集中管理多個 GitHub 專案的 staging → main 流程，自動建立或沿用 PR，依各專案的 CI、review 與分支保護條件推進合併。",
    stack: ["TypeScript", "GitHub API", "GitHub Actions"],
    href: "https://github.com/Hikari-Tsai/auto-mr",
  },
  {
    index: "04",
    name: "web-pinn",
    type: "PRIVATE PHYSICS AI",
    description:
      "為物理資訊神經網路（PINN）應用開發前端展示介面，整理模型操作與結果呈現流程。",
    stack: ["HTML", "PINN", "Scientific ML"],
    visibility: "PRIVATE WORK",
  },
  {
    index: "05",
    name: "rag",
    type: "PRIVATE KNOWLEDGE AI",
    description:
      "整合文件處理、語意搜尋與 LLM 回答流程，讓企業內部知識可供檢索，並保留回答的來源脈絡。",
    stack: ["Python", "RAG", "LLM"],
    visibility: "PRIVATE REPO",
  },
  {
    index: "06",
    name: "dc-manager",
    type: "AI × DISCORD",
    description:
      "以 LLM 協助 Discord 內容審核、話題整理與頻道分析，支援繁體中文的社群管理流程。",
    stack: ["Python", "LLM", "Discord API"],
    href: "https://github.com/Hikari-Tsai/dc-manager",
  },
  {
    index: "07",
    name: "twitch-bot",
    type: "CREATOR AI",
    description:
      "以 LLM 與實況主人設設定回覆 Twitch 聊天室，結合對話脈絡、回覆規則與冷卻控制，支援直播互動。",
    stack: ["Python", "LLM", "Twitch"],
    href: "https://github.com/Hikari-Tsai/twitch-bot",
  },
  {
    index: "08",
    name: "opencart-newebpay",
    type: "COMMERCE",
    description:
      "開發 OpenCart 藍新金流支付模組，串接購物網站的付款流程與交易回應。",
    stack: ["PHP", "OpenCart", "Payment API"],
    href: "https://github.com/Hikari-Tsai/opencart-newebpay",
  },
];

const skills = [
  ["AUDIO & DSP", "C++ 音訊處理、oversampling、相位與重取樣、參數／電表同步、DSP 回歸測試"],
  ["MUSIC ANALYSIS", "BPM、拍點與調性分析、頻譜前處理、MIDI Tempo、ONNX、WebGPU / WASM"],
  ["MUSIC & VOICE AI", "符號音樂生成、可編輯多軌音樂、SVS 歌聲合成、模型訓練與音樂製作流程"],
  ["AI ENGINEERING", "PINN、PhysicsNeMo、RAG、LLM 應用、AI Agent、機器學習"],
  ["AUDIO PLUG-INS", "VST3、AUv2、AAX 適配、VSTGUI、CMake、macOS Universal／Windows 建置"],
  ["WEB & AUTOMATION", "TypeScript、JavaScript、Python、FastAPI、Web Worker、GitHub Actions 與 PR 自動化"],
  ["CREATOR SYSTEMS", "獨立音樂創作、藝人／VTuber 合作、Discord / Twitch Bot、社群互動工具"],
  ["COMMERCE", "OpenCart 模組、藍新金流串接、購物車與後台營運流程"],
  ["AIoT", "智慧音箱、嬰兒哭聲辨識、聲音事件與裝置動作整合"],
];

const experience = [
  {
    code: "MUSIC_ANALYSIS",
    title: "音樂分析與瀏覽器推論",
    description: "將 Beat This! 與 S-KEY 整合為 ONNX 雙模型分析工具，處理音訊前處理、Web Worker 推論與模型快取。支援全曲或片段分析，輸出固定／變速 MIDI Tempo；瀏覽器模式的音訊留在使用者裝置。",
    tags: ["Music Information Retrieval", "ONNX", "MIDI Tempo"],
  },
  {
    code: "AUDIO_DSP",
    title: "音訊 DSP 與外掛整合",
    description: "在 JS Inflator 開源核心上進行 AAX 適配，處理參數、電表與 editor 同步。針對含 oversampling、相位切換的音訊處理流程建立回歸測試，並以 CMake／CI 打包 macOS 與 Windows 外掛。",
    tags: ["C++ / DSP", "AAX Integration", "Audio Regression"],
  },
  {
    code: "PHY_AI",
    title: "Physics AI 開發",
    description: "使用 NVIDIA PhysicsNeMo 開發物理資訊神經網路（PINN），將物理條件納入模型訓練，並製作應用展示介面。",
    tags: ["PINN", "PhysicsNeMo", "Scientific ML"],
  },
  {
    code: "KNOWLEDGE",
    title: "RAG 系統開發",
    description: "開發文件處理、知識庫檢索與 LLM 回答流程，整理來源脈絡，讓使用者能核對生成內容的依據。",
    tags: ["RAG", "Vector Search", "LLM"],
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
            我的專長是歌聲合成、音樂生成、音訊分析與 DSP 外掛開發，讓模型與訊號處理接進實際的音樂製作流程。
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
          <p>模型訓練、音訊軟體與產品整合。</p>
        </div>
        <div className="experience-grid">
          {experience.map((item, index) => (
            <article key={item.code}>
              <div className="experience-meta"><span>0{index + 1}</span><small>{item.code}</small></div>
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
          <p>近期音樂工具與持續維護的工程專案。</p>
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
          <p>從 C++ 音訊處理、Python 模型到瀏覽器推論，我關心的不只是輸出結果，也包括操作方式、測試與部署。音樂創作經驗讓我能理解製作端的需求，AI 與軟體工程則是把需求做出來的方法。</p>
        </div>
        <div className="skill-grid">
          {skills.map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="contact shell" id="contact">
        <div className="section-label"><span>07</span> START A CONVERSATION</div>
        <h2>一起開發下一個<br /><span>MUSIC TOOL.</span></h2>
        <p>開放 AI／音訊軟體相關職缺與專案合作：音樂分析、歌聲合成、DSP 外掛、模型部署，也承接 RAG 與創作者工具開發。</p>
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
