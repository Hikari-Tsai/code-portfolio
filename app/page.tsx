const projects = [
  {
    index: "01",
    name: "dc-manager",
    type: "AI × DISCORD",
    description:
      "Discord 頻道數據分析與 AI 內容審核機器人，支援繁體中文互動，讓社群營運更有效率。",
    stack: ["Python", "LLM", "Discord API"],
    href: "https://github.com/Hikari-Tsai/dc-manager",
  },
  {
    index: "02",
    name: "twitch-bot",
    type: "CREATOR AI",
    description:
      "以大型語言模型學習實況主個性，自動回覆 Twitch 聊天室留言，探索 AI 與創作者體驗的交集。",
    stack: ["Python", "LLM", "Twitch"],
    href: "https://github.com/Hikari-Tsai/twitch-bot",
  },
  {
    index: "03",
    name: "opencart-newebpay",
    type: "COMMERCE",
    description:
      "整合藍新金流的 OpenCart 支付模組，將真實商務需求轉化為穩定、可維護的後端流程。",
    stack: ["PHP", "OpenCart", "Payment API"],
    href: "https://github.com/Hikari-Tsai/opencart-newebpay",
  },
  {
    index: "04",
    name: "JS_Inflator",
    type: "AUDIO TECH",
    description:
      "音訊外掛與建置系統實驗，涵蓋 macOS、C++ 與 VST 類型開發工作。",
    stack: ["C++", "DSP", "macOS"],
    href: "https://github.com/Hikari-Tsai/JS_Inflator",
  },
];

const skills = [
  ["AI ENGINEERING", "PINN、PhysicsNeMo、RAG、LLM 應用、AI Agent、機器學習"],
  ["CREATOR SYSTEMS", "VTuber 工具、社群內容流程、Discord / Twitch Bot"],
  ["WEB & AUTOMATION", "TypeScript、JavaScript、Python、GitHub Actions"],
  ["COMMERCE", "OpenCart 擴充、金流串接、營運自動化"],
  ["AUDIO TECH", "C++、Swift、macOS、音訊外掛與 DSP 實驗"],
  ["AIoT", "智慧音箱、AI 服務整合、連網裝置與互動體驗"],
];

const experience = [
  {
    code: "PHY_AI",
    title: "Physics AI 開發",
    description: "運用物理資訊神經網路（PINN）與 NVIDIA PhysicsNeMo，將物理定律融入模型訓練與科學運算。",
    tags: ["PINN", "PhysicsNeMo", "Scientific ML"],
  },
  {
    code: "KNOWLEDGE",
    title: "RAG 系統開發",
    description: "建置檢索增強生成流程，串接知識庫、語意搜尋與大型語言模型，提升回答的準確性與可追溯性。",
    tags: ["RAG", "Vector Search", "LLM"],
  },
  {
    code: "EDGE_AI",
    title: "AIoT 智慧音箱",
    description: "整合 AI 服務、語音互動與連網裝置，開發智慧音箱應用，串連雲端智能與真實世界體驗。",
    tags: ["AIoT", "Voice UX", "Smart Speaker"],
  },
];

const certifications = [
  "AWS Certified Data Analytics - Specialty",
  "Optimize ML Models and Deploy Human-in-the-Loop Pipelines",
  "Agile Project Management with Jira Cloud: 1 Projects, Boards, and Issues",
  "Agile Project Management with Jira Cloud: 2 Lean and Agile Processes",
  "Agile Project Management with Jira Cloud: 3 Advanced Topics",
];

const awards = [
  ["No. 6", "Music Genesis"],
  ["Top 10", "Ho-hai-yan Rock Festival"],
  ["Excellent Prize ×3", "Award records listed in resume"],
];

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
        <div className="eyebrow"><span>01</span> CREATOR · ENGINEER · BUILDER</div>
        <h1>
          I BUILD <em>INTELLIGENT</em>
          <br />TOOLS FOR THE
          <br /><span className="outline">CREATOR ERA.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            我是 Hikari，獨立音樂人、機器學習工程師與資深生成式 AI 研發工程師。
            專注把 AI、創作者工作流與實用軟體，打造成真正能被使用的產品。
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
          <p>不只寫程式。</p>
          <h2>我在技術與創作之間，<br />打造<span>有用、有感、有個性</span>的數位體驗。</h2>
        </div>
      </section>

      <section className="experience shell" aria-label="AI 開發經歷">
        <div className="section-head">
          <div className="section-label"><span>03</span> APPLIED AI EXPERIENCE</div>
          <p>從模型、知識到裝置端。</p>
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
            <div className="credential-title"><span>C</span><h2>CERTIFI-<br />CATIONS</h2></div>
            <ol>
              {certifications.map((certification, index) => (
                <li key={certification}><span>0{index + 1}</span><p>{certification}</p></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="section-head">
          <div className="section-label"><span>05</span> SELECTED WORK</div>
          <p>實作中的技術，才有價值。</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <a className="project" href={project.href} target="_blank" rel="noreferrer" key={project.name}>
              <span className="project-index">{project.index}</span>
              <div>
                <small>{project.type}</small>
                <h3>{project.name}</h3>
              </div>
              <p>{project.description}</p>
              <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              <b className="arrow">↗</b>
            </a>
          ))}
        </div>
        <a className="all-projects" href="https://github.com/Hikari-Tsai?tab=repositories" target="_blank" rel="noreferrer">VIEW ALL 22 REPOSITORIES <span>→</span></a>
      </section>

      <section className="skills shell" id="skills">
        <div className="section-label light"><span>06</span> CAPABILITIES</div>
        <div className="skills-intro">
          <h2>FROM IDEA<br />TO <i>WORKING</i><br />SYSTEM.</h2>
          <p>跨越 AI、軟體與創作者生態，把模糊需求整理成能上線、能維護、能成長的產品。</p>
        </div>
        <div className="skill-grid">
          {skills.map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="contact shell" id="contact">
        <div className="section-label"><span>07</span> START A CONVERSATION</div>
        <h2>有一個值得實現的<br /><span>IDEA?</span></h2>
        <p>目前開放軟體開發、AI 整合、創作者工具與技術顧問合作。</p>
        <div className="contact-links">
          <a className="button primary" href="https://www.linkedin.com/in/hikari-tsai/" target="_blank" rel="noreferrer">在 LinkedIn 聯絡我 <b>↗</b></a>
          <a className="button dark" href="https://github.com/Hikari-Tsai" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </section>

      <footer className="shell">
        <a className="brand" href="#top">HIKARI<span>_</span>TSAI</a>
        <p>AI ENGINEER × CREATIVE TECHNOLOGIST</p>
        <p>© 2026 HIKARI TSAI</p>
      </footer>
    </main>
  );
}
