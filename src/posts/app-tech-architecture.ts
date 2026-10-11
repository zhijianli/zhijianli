import type { BlogBlock } from "../blogPosts";

const p = (text: string): BlogBlock => ({ type: "p", text });
const h2 = (text: string): BlogBlock => ({ type: "h2", text });
const img = (src: string, alt: string, caption?: string): BlogBlock => ({
  type: "img",
  src,
  alt,
  caption,
});

export const appTechArchitectureBody: BlogBlock[] = [
  p(
    "前段时间有人找我调研一下某心理产品的技术架构图，我画完发现，这套技术架构图还挺通用的，下面这张图其实也是我落地产品时会反复用到的技术架构图。"
  ),
  img(
    "/images/app-tech-architecture.svg",
    "应用通用技术架构：客户端、API 网关、后端服务、AI 交互层、基础设施与云资源"
  ),
  h2("从上往下看：一条清晰的调用链"),
  p("入口通常只有两类：**小程序端**和**后台管理系统**。"),
  p(
    "两端不直连内部服务，而是统一走 **API 网关**——承载 JWT 鉴权、SSL、REST，以及长链接需要的 WebSocket / SSE。"
  ),
  p(
    "网关后面是**后端服务**（Python / Java / TypeScript / Go），负责把业务逻辑、AI 编排和基础设施粘在一起。"
  ),
  h2("AI 交互层：画像、Agent、监控与上下文"),
  p(
    "实际上真正拉开产品差异的，基本上在 **AI 交互层**下足了功夫：\n\n1. **个人画像**（memobase）：让对话记住用户，而不是每次从零开始。\n2. **Agent**（dify / Mastra + Tools + 知识库 RAG）：把工具调用与检索增强嵌进工作流。\n3. **监控**（Langfuse）：把 prompt、延迟、成本和失败路径可见化。\n4. **context 工程**：任务 prompt、SKILLS、个人画像、世界书——决定 Agent「此刻该知道什么」。"
  ),
  p(
    "下层再按需接入 **TTS / LLM / ASR**：语音侧可用百炼云、火山引擎；模型侧可在千问、豆包、ChatGPT 等之间切换。"
  ),
  h2("后端基础设施"),
  p(
    "右侧是常见的后端底座：**MySQL / PostgreSQL / Redis** 做存储与缓存，**Log4j2** 一类方案做日志，**Docker** 做容器化，中间件侧补上 **Nginx、消息队列、任务调度**。再往下是云上硬件与基础资源——**ECS（4 核 8G，1～2 台起步）**、**RDS**、**OSS**、**SSL 证书**、**DNS** 与**域名**。早期不必上复杂集群；把鉴权、持久化、对象存储和域名证书一次配齐就够了。"
  ),
  p(
    "这张架构刻意保持「通用」和「分层」：**前端可换、后端语言可换、模型可换**，分层边界尽量固定——网关管入口，服务管编排，AI 层管上下文与观测，基础设施管可靠运行。对独立开发或小团队来说，这套技术架构避免把业务、prompt 和运维搅成一团，在快速变化的业务需求压力下，尽量保持系统架构稳定，以不变应万变。"
  ),
];

export const appTechArchitectureBodyEn: BlogBlock[] = [
  p(
    "Someone recently asked me to map out the tech architecture of a mental-health product. After I finished drawing it, I realized the diagram was fairly general—and it's also the architecture I keep coming back to when shipping my own products."
  ),
  img(
    "/images/app-tech-architecture-en.svg",
    "General application tech architecture: clients, API gateway, backend services, AI interaction layer, infrastructure, and cloud resources"
  ),
  h2("Top to bottom: one call path"),
  p("Entry points are usually two: a **mini program** and an **admin console**."),
  p(
    "Neither talks to internal services directly; both go through an **API gateway** for JWT, SSL, REST, plus WebSocket / SSE for long-lived connections."
  ),
  p(
    "Behind the gateway sits the **backend** (Python / Java / TypeScript / Go), gluing business logic, AI orchestration, and infrastructure together."
  ),
  h2("AI interaction: profile, agent, observability, context"),
  p(
    "In practice, real product differentiation usually comes from investing hard in the **AI interaction layer**:\n\n1. **Personal profile** (memobase): memory across sessions.\n2. **Agent** (dify / Mastra + Tools + knowledge-base RAG): tools and retrieval in the workflow.\n3. **Monitoring** (Langfuse): prompts, latency, cost, and failure paths made visible.\n4. **Context engineering**: task prompts, SKILLS, profiles, world books—what the agent should know *now*."
  ),
  p(
    "Under that, **TTS / LLM / ASR** plug in as needed—Bailian / Volcengine for speech, Qwen / Doubao / ChatGPT for models."
  ),
  h2("Backend infrastructure"),
  p(
    "On the right is the usual backend base: **MySQL / PostgreSQL / Redis**, logging (e.g. **Log4j2**), **Docker**, plus **Nginx**, message queues, and schedulers. Below that: cloud primitives—**ECS (4C8G, 1–2 boxes to start)**, **RDS**, **OSS**, **SSL**, **DNS**, and a **domain**. Early on you don’t need a complex cluster; getting auth, persistence, object storage, and certificates in place is enough."
  ),
  p(
    "The architecture stays intentionally **general** and **layered**: **frontends, languages, and models can change**, while layer boundaries stay put—gateway for entry, services for orchestration, AI for context and observability, infra for reliability. For indie builders or small teams, this keeps business logic, prompts, and ops from collapsing into one mess—and under fast-changing product pressure, helps the system stay stable: meet change with what doesn’t change."
  ),
];
