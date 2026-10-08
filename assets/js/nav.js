/* AI Mastery Docs — Author: Sanat — For My Wife Okin
 * Single source of truth for the sidebar. Paths are relative to the site root.
 * Items with soon:true are planned for a later phase.
 */
window.SITE = {
  title: "AI Mastery",
  subtitle: "Beginner \u2192 Expert",
  dedication: "For My Wife Okin",
  author: "Sanat",
  version: "Phase 2 \u00b7 Level 2 in progress",
  updated: "2026-10-08"
};

window.NAV = [
  { group: "Start Here", items: [
    { title: "Welcome & How to Use", href: "index.html" },
    { title: "Curriculum Roadmap (L1\u2192L5)", href: "roadmap.html" },
    { title: "Glossary A\u2013Z", href: "glossary.html" }
  ]},
  { group: "Level 1 \u00b7 Foundations", level: 1, items: [
    { n: "01", title: "What Is AI? The Big Picture", href: "l1/01-what-is-ai.html" },
    { n: "02", title: "How LLMs Actually Work", href: "l1/02-how-llms-work.html" },
    { n: "03", title: "Prompting Fundamentals", href: "l1/03-prompting-fundamentals.html" },
    { n: "04", title: "Context Engineering Basics", href: "l1/04-context-engineering.html" },
    { n: "05", title: "The AI Tools Landscape", href: "l1/05-ai-tools-landscape.html" },
    { n: "06", title: "AI in the IDE: VS Code, IntelliJ, Xcode", href: "l1/06-ai-in-the-ide.html" },
    { n: "07", title: "Instructions, Rules, Skills & Custom Agents", href: "l1/07-instructions-skills-agents.html" },
    { n: "08", title: "AI Agents 101", href: "l1/08-agents-101.html" },
    { n: "09", title: "MCP 101: Connecting AI to Tools", href: "l1/09-mcp-101.html" },
    { n: "10", title: "Scala Development with AI", href: "l1/10-scala-with-ai.html" },
    { n: "11", title: "Python Development with AI", href: "l1/11-python-with-ai.html" },
    { n: "12", title: "AI Across IT: DevOps, QA, Data, Security", href: "l1/12-ai-across-it.html" },
    { n: "13", title: "Learn Anything Faster with AI", href: "l1/13-learn-faster-with-ai.html" },
    { n: "14", title: "Safety, Privacy, Ethics & Verification", href: "l1/14-safety-privacy-ethics.html" },
    { n: "15", title: "Hands-on Labs (Beginner)", href: "l1/15-labs.html" },
    { n: "16", title: "Level 1 Checkpoint Quiz", href: "l1/16-checkpoint.html" }
  ]},
  { group: "Level 2 \u00b7 Practitioner", level: 2, items: [
    { n: "01", title: "Advanced Prompt Patterns", href: "l2/01-advanced-prompt-patterns.html" },
    { n: "02", title: "Structured Output & JSON Schema", href: "l2/02-structured-output.html" },
    { n: "03", title: "Calling LLM APIs Properly", href: "l2/03-calling-llm-apis.html" },
    { n: "04", title: "Tool Calling from Your Code", href: "l2/04-tool-calling.html" },
    { n: "05", title: "Embeddings & Semantic Search", href: "l2/05-embeddings-semantic-search.html" },
    { n: "06", title: "RAG: Retrieval-Augmented Generation", href: "l2/06-rag.html" },
    { n: "07", title: "Agentic Coding Workflows in Depth", href: "l2/07-agentic-coding-in-depth.html" },
    { n: "08", title: "Writing Great Skills & Custom Agents", href: "l2/08-skills-and-custom-agents.html" },
    { n: "09", title: "Using & Configuring MCP Servers", href: "l2/09-configuring-mcp-servers.html" },
    { title: "AI-Assisted Testing & Code Review", href: "roadmap.html#l2", soon: true },
    { title: "Local Models: Ollama, LM Studio, MLX", href: "roadmap.html#l2", soon: true },
    { title: "AI for Data Engineering (Spark/Scala)", href: "roadmap.html#l2", soon: true },
    { title: "Level 2 Labs", href: "roadmap.html#l2", soon: true },
    { title: "Capstone: Store Assistant", href: "roadmap.html#l2", soon: true },
    { title: "Level 2 Checkpoint Quiz", href: "roadmap.html#l2", soon: true }
  ]},
  { group: "Level 3 \u00b7 Advanced", level: 3, items: [
    { title: "Building MCP Servers (Python & Scala/JVM)", href: "roadmap.html#l3", soon: true },
    { title: "Building Agents from Scratch", href: "roadmap.html#l3", soon: true },
    { title: "Multi-Agent Systems & Orchestration", href: "roadmap.html#l3", soon: true },
    { title: "Evals: Measuring LLM Quality", href: "roadmap.html#l3", soon: true },
    { title: "Advanced RAG & Knowledge Graphs", href: "roadmap.html#l3", soon: true },
    { title: "Fine-tuning, LoRA & Distillation", href: "roadmap.html#l3", soon: true },
    { title: "LLMOps: Deploy, Observe, Optimize Cost", href: "roadmap.html#l3", soon: true },
    { title: "AI Security: Prompt Injection & Defenses", href: "roadmap.html#l3", soon: true }
  ]},
  { group: "Level 4 \u00b7 Expert", level: 4, items: [
    { title: "Transformer Internals & the Math", href: "roadmap.html#l4", soon: true },
    { title: "Training & Post-training (SFT, RLHF, DPO)", href: "roadmap.html#l4", soon: true },
    { title: "Inference Optimization & Serving", href: "roadmap.html#l4", soon: true },
    { title: "Reasoning Models & Test-time Compute", href: "roadmap.html#l4", soon: true },
    { title: "Designing AI-Native Products & Platforms", href: "roadmap.html#l4", soon: true },
    { title: "Governance, Regulation & Responsible AI", href: "roadmap.html#l4", soon: true }
  ]},
  { group: "Level 5 \u00b7 Master & Specialist", level: 5, items: [
    { title: "Reading & Reproducing Research Papers", href: "roadmap.html#l5", soon: true },
    { title: "Interpretability & Alignment", href: "roadmap.html#l5", soon: true },
    { title: "On-device AI (Apple silicon, Core ML, MLX)", href: "roadmap.html#l5", soon: true },
    { title: "Multimodal: Vision, Speech, Video", href: "roadmap.html#l5", soon: true },
    { title: "Leading AI Adoption in Teams", href: "roadmap.html#l5", soon: true },
    { title: "Capstone Projects", href: "roadmap.html#l5", soon: true }
  ]}
];
