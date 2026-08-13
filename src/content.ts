import type { Locale } from "./i18n";

export type SocialLink =
  | {
      label: string;
      href: string;
      icon: string;
      svg?: undefined;
      popupImage?: string;
      /** 与图标同尺寸的白色衬底，logo 叠在上层 */
      iconWhiteBackdrop?: boolean;
      /** Umami 事件名，用于统计联系方式点击 */
      umamiEvent?: string;
    }
  | {
      label: string;
      href: string;
      svg: "github";
      icon?: undefined;
      umamiEvent?: string;
    };

export type ProductStatus = "online" | "soon" | "offline";

/** 对应 `public/videos/` 下的文件名；展示时会对路径做编码以支持空格等特殊字符 */
export type Product = {
  title: string;
  /** 视频封面上的短标签 */
  subtitle: string;
  kicker: string;
  description: string;
  tags: string[];
  video: string;
  /** 封面图，未播放时作为 poster */
  cover: string;
  duration: string;
  status: ProductStatus;
  /** 视频面板主题色，与 Figma 卡片氛围一致 */
  accent: string;
  href?: string;
  /** Umami 事件名，用于统计「立即体验」点击 */
  umamiEvent?: string;
};

export type SkillCard = {
  title: string;
  description: string;
  tags: string[];
};

export type CounselingCopy = {
  trainingTitle: string;
  training: string[];
  practiceTitle: string;
  practice: string[];
  schoolsLabel: string;
  schools: string[];
  authorsLabel: string;
  authors: string[];
};

export type FaqItem = {
  question: string;
  answer: string | string[];
  /** Umami 事件名，用于统计 FAQ 展开点击 */
  umamiEvent?: string;
};

export type UiCopy = {
  nav: { about: string; skills: string; products: string; faq: string };
  navToggle: string;
  navAria: string;
  closeMenu: string;
  heroTagsAria: string;
  statsAria: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutExpand: string;
  aboutCollapse: string;
  timelineAria: string;
  timelineTitle: string;
  skillsLabel: string;
  skillsTitle: string;
  skillTagsAria: string;
  counselingAria: string;
  productsLabel: string;
  productsTitle: string;
  productsLead: string;
  videoUnsupported: string;
  tryNow: string;
  faqLabel: string;
  faqTitle: string;
  wechatQr: string;
  close: string;
  footerCopy: string;
  footerCredit: string;
  copyright: string;
  language: string;
  status: Record<ProductStatus, string>;
};

export type SiteCopy = {
  htmlLang: string;
  documentTitle: string;
  documentDescription: string;
  ui: UiCopy;
  brandTitle: string;
  name: string;
  tagline: string;
  heroEyebrow: string;
  heroTitle: string;
  heroTags: string[];
  stats: { value: string; label: string }[];
  aboutIntro: string;
  aboutParagraphs: string[];
  timeline: { period: string; title: string; desc: string }[];
  social: SocialLink[];
  skillCards: SkillCard[];
  counseling: CounselingCopy;
  products: Product[];
  faqs: FaqItem[];
};

const socialShared = {
  github: {
    href: "https://github.com/zhijianli",
    svg: "github" as const,
    umamiEvent: "contact-github",
  },
  douban: {
    href: "https://www.douban.com/people/46125148/",
    icon: "/images/douban.png",
    umamiEvent: "contact-douban",
  },
  xiaohongshu: {
    href: "https://www.xiaohongshu.com/user/profile/66330c1b00000000070066d7?xsec_token=ABx4h6xx2X4Ll5EjLlcDlfd_E1_RXdAnLEBb7ZuRnvfqQ%3D&xsec_source=pc_search",
    icon: "/images/xiaohongshu-logo.svg",
    iconWhiteBackdrop: true,
    umamiEvent: "contact-xiaohongshu",
  },
  wechat: {
    href: "#",
    icon: "/images/wechat-logo.svg",
    popupImage: "/images/wechat.png",
    umamiEvent: "contact-wechat",
  },
};

const productShared = [
  {
    video: "1.mp4",
    cover: "/images/songjing-poster.jpg",
    duration: "0:09",
    status: "online" as const,
    accent: "#6b4f8a",
    href: "https://songjing.menganhealth.cn/",
    umamiEvent: "cta-songjing",
  },
  {
    video: "3.mp4",
    cover: "/images/yuyi-poster.jpg",
    duration: "0:17",
    status: "online" as const,
    accent: "#b85c38",
    href: "https://yuyi.menganhealth.cn/",
    umamiEvent: "cta-yuyi",
  },
  {
    video: "6.mp4",
    cover: "/images/xinwo-poster.jpg",
    duration: "0:37",
    status: "online" as const,
    accent: "#2a5c45",
    href: "https://supermarket.xwxinli.com/login",
    umamiEvent: "cta-xinwo",
  },
  {
    video: "2.mp4",
    cover: "/images/ningxin-poster.jpg",
    duration: "0:51",
    status: "soon" as const,
    accent: "#3a6080",
  },
  {
    video: "4.mp4",
    cover: "/images/ommind-poster.jpg",
    duration: "0:09",
    status: "offline" as const,
    accent: "#5a5a7a",
  },
  {
    video: "5.mp4",
    cover: "/images/zhiji-poster.jpg",
    duration: "0:37",
    status: "offline" as const,
    accent: "#7a4a4a",
  },
] as const;

const zh: SiteCopy = {
  htmlLang: "zh-CN",
  documentTitle: "墨崔 — 疗愈与技术的十字路口",
  documentDescription: "墨崔 的独立开发者个人主页，关注疗愈与技术的交汇。",
  ui: {
    nav: {
      about: "关于我",
      skills: "技术栈",
      products: "产品",
      faq: "常见问题",
    },
    navToggle: "切换导航",
    navAria: "主导航",
    closeMenu: "关闭菜单",
    heroTagsAria: "核心标签",
    statsAria: "个人概览",
    aboutLabel: "关于我",
    aboutTitle: "走到十字路口之前",
    aboutExpand: "展开完整故事",
    aboutCollapse: "收起",
    timelineAria: "来时路",
    timelineTitle: "来时路",
    skillsLabel: "技术专长",
    skillsTitle: "全栈能力 · 跨领域应用",
    skillTagsAria: "技术",
    counselingAria: "心理咨询领域",
    productsLabel: "独立开发产品",
    productsTitle: "在十字路口构建的产品",
    productsLead: "一些独立开发产品的视频和介绍，还在线的产品也有链接可以体验。",
    videoUnsupported: "您的浏览器不支持 HTML5 视频。",
    tryNow: "立即体验",
    faqLabel: "常见问题",
    faqTitle: "关于 墨崔 的常见问题",
    wechatQr: "微信二维码",
    close: "关闭",
    footerCopy: "墨崔 · 独立开发者",
    footerCredit: "疗愈 × 技术 · 常驻杭州 · 2026",
    copyright: "版权所有",
    language: "语言",
    status: {
      online: "在线",
      soon: "即将上线",
      offline: "已下线",
    },
  },
  brandTitle: "墨崔",
  name: "墨崔",
  tagline:
    "我的60%是程序员，40%却是心理咨询师，因此我希望在疗愈与技术的交汇处，综合运用两边的积累，做出能帮助他人的产品。",
  heroEyebrow: "独立开发者 · 杭州",
  heroTitle: "站在疗愈与技术的十字路口",
  heroTags: ["Java / Python", "心理咨询师", "React / Flutter", "AI 产品"],
  stats: [
    { value: "10+", label: "年技术经验" },
    { value: "8+", label: "年心理行业经验" },
    { value: "常驻", label: "杭州" },
    { value: "6+", label: "独立项目" },
  ],
  aboutIntro:
    "我现在觉得，很多事情规划不出来，叙事弧线是当生命中的各个事情发生之后自己串联剪辑出来的，貌似乔布斯在他那次著名的演讲中也讲过类似的观点。",
  aboutParagraphs: [
    "我长居杭州，职业生涯从阿里巴巴 Java 工程师起步，做过最出圈的产品是天猫超市，产品足够伟大，但我只是冗长流水线上的一颗螺丝钉，这段生涯对我最直接的意义是让我明白很多做事的逻辑与方法论，但当时的我并不明白自己到底想做什么。",
    "因此我开启了漫长的奥德赛时期，做过音乐平台，也做过条漫平台，这两样虽然都是我喜欢的东西，但一旦进入到深水区之后，我发现和里面的氛围格格不入，可能这些试错都是必经之路，但于我来说，正面反馈并不多。",
    "而在这段漫长的奥德赛时期，武志红提供了一个出口，让我遇见了心理咨询，并在后续的学习过程中得到了非常多的正面反馈，因此当时想着我可以尝试着走走心理咨询师这条道路，于是J人开始行动，在德瑞姆学了两年，考了国家心理咨询师三级，在杭州七院开始做危机干预热线，当时觉得挺顺的，觉得自己就是为这个事业而生的，殊不知当你这么想的时候，正是处在愚昧之巅的时候，然后，顺理成章就下滑到绝望之谷，发现自己对于直接做心理咨询师帮助他人，或许并不合适。",
    "然后，某日在云南大理洱海旁，忽然灵光一闪，想着既然我会技术，又学了那么久的心理学，为何不把这两者结合起来，在这两个领域的交叉地带做些事情呢。",
    "事情从这里开始有了转变，开始走上一条平稳之坡了，先在杭州心猫网络（心理咨询平台）从零搭建心理测评类产品，一段非常幸福的职业生涯，也让我知道从事自己所热爱的事业是什么感觉。而后，也在杭州健海科技（慢病健康管理平台）主导 AI 实验室并构建 ASR 语音识别引擎，这段时间稍微有点偏离自己的主题，但好在也学习了很多健康管理和AI的知识，也不算浪费，心理健康必将从单维度的心理咨询单兵作战转变到多维度的心理健康管理的持久战。",
    "接下来，三十五岁，一个临界值的年龄，决定跳出公司的晋升路径，追求一个人操盘一件事情的可能，这个可能也许是自己的产品，也许是与这个赛道的同行者合作开发相关产品，也有可能就不做研发的事情了，毕竟这块事情价值越来越低，不过疗愈这个核心是我一直想要坚持下去的，只要是围绕这件事，其他我保持开放态度。",
    "上面就是我大致的来时路了，这一路走来并没有取得太多亮眼的成绩，好在也没有遭受过多大的挫折，对于得到的东西我异常感恩，对于失去的东西我也并不舍得，只是人生不是只活在上半场，下半场还剩很多年（也许），还是希望有可以折腾的事情让我渡过这漫长而又丰满的一生。",
  ],
  timeline: [
    {
      period: "2009",
      title: "阿里巴巴 Java 工程师",
      desc: "参与天猫超市早期建设，学会做事的逻辑与方法论",
    },
    {
      period: "2009–2016",
      title: "奥德赛时期",
      desc: "辗转音乐平台与条漫平台，在喜欢的事情里反复试错",
    },
    {
      period: "2013",
      title: "走进心理咨询",
      desc: "德瑞姆学了两年，考取国家三级，在杭州七院做危机干预热线",
    },
    {
      period: "2016",
      title: "大理洱海顿悟",
      desc: "决定把技术与心理学放到同一个交叉地带去做产品",
    },
    {
      period: "2017–2022",
      title: "心猫网络 → 健海科技",
      desc: "从零搭建心理测评；主导 AI 实验室并构建 ASR 引擎",
    },
    {
      period: "2022–至今",
      title: "走向独立开发",
      desc: "跳出公司路径，在疗愈与技术的交汇处持续操盘",
    },
  ],
  social: [
    { label: "GitHub", ...socialShared.github },
    { label: "豆瓣", ...socialShared.douban },
    { label: "小红书", ...socialShared.xiaohongshu },
    { label: "微信", ...socialShared.wechat },
  ],
  skillCards: [
    {
      title: "后端开发",
      description: "阿里巴巴起步，主导过多平台架构",
      tags: ["Java", "Python"],
    },
    {
      title: "前端开发",
      description: "从心理测评类产品到独立 Web 应用",
      tags: ["React", "Vue", "JavaScript"],
    },
    {
      title: "移动端",
      description: "跨平台移动应用开发",
      tags: ["Flutter", "Kotlin", "小程序原生"],
    },
    {
      title: "人工智能",
      description: "曾主导杭州健海科技 AI 实验室",
      tags: ["ASR 语音识别", "Dify", "Coze"],
    },
  ],
  counseling: {
    trainingTitle: "专业培训",
    training: [
      "2013-2015年参加杭州德瑞姆国家心理咨询师培训两年，2015年持有国家三级心理咨询师证书（编号：1503000210300408）。",
      "2016年参与香港精神分析家苏伟峰教授的拉康派心理学培训一年，并合作发表论文集《凝定与变迁》。",
    ],
    practiceTitle: "实务经验",
    practice: [
      "2015年开始个人体验，累计 100+ 小时个人体验。",
      "2017年开始参与杭州第七人民医院危机干预热线工作，累计 200+ 小时，并参与编写《杭州市心理援助热线指导手册》。",
    ],
    schoolsLabel: "喜欢的流派",
    schools: ["精神分析", "存在主义", "焦点解决"],
    authorsLabel: "喜欢的作家",
    authors: ["武志红", "欧文·亚隆", "卡伦·霍尼", "南希·麦克威廉斯"],
  },
  products: [
    {
      ...productShared[0],
      title: "诵经 SONGJING",
      subtitle: "诵读投影",
      kicker: "心经诵读页面",
      description:
        "页面上呈现《心经》经文，随着经文逐字「沙化」，用户可跟随诵读，在视觉上体会「空」的意蕴。这种聚散视觉也会在潜意识层面，帮助用户对所执着的人或事进行解绑。",
      tags: ["AI", "Python", "Flutter"],
    },
    {
      ...productShared[1],
      title: "羽衣 YUYI",
      subtitle: "节气配色",
      kicker: "节气服饰色彩推荐",
      description:
        "依照二十四节气与农历推算，推荐每日适合与避讳的服饰颜色搭配，帮助用户在日常穿搭中参考传统古老智慧。",
      tags: ["AI", "Python", "UniApp"],
    },
    {
      ...productShared[2],
      title: "心蜗",
      subtitle: "基础设施",
      kicker: "心理咨询师支持系统",
      description:
        "面向咨询师的日常工作支持系统，协助完成初始评估、预约排班与跟进等繁琐事务，并搭载 AI 来访、AI 督导、AI 咨询等能力，帮助咨询师更快成长。",
      tags: ["心理健康", "AI", "小程序"],
    },
    {
      ...productShared[3],
      title: "宁心安愈",
      subtitle: "家属陪伴",
      kicker: "用药记录与统计工具",
      description:
        "为精神分裂症患者家属设计的用药记录与统计工具，帮助回溯过往记录，洞察更有效的照护方法，并在一定程度上缓解家属的焦虑情绪。",
      tags: ["心理健康", "用药记录", "家属支持"],
    },
    {
      ...productShared[4],
      title: "脉轮测评",
      subtitle: "能量评估",
      kicker: "七大脉轮特质测评",
      description:
        "类似传统非投射性测评，帮助用户了解自身七大脉轮的强弱属性，并依据脉轮特点推荐相应的水晶饰品。",
      tags: ["测评", "脉轮", "水晶"],
    },
    {
      ...productShared[5],
      title: "知己测试",
      subtitle: "了解自己",
      kicker: "心理测评集合页",
      description:
        "为心猫公司打造的传统心理测评集合页，抑郁、焦虑、SCL-90 等 40 多个测评均可在此完成。",
      tags: ["心理测评", "抑郁", "焦虑"],
    },
  ],
  faqs: [
    {
      question: "墨崔 是谁？",
      umamiEvent: "faq-who",
      answer:
        "墨崔 是一位常驻杭州的独立开发者，职业生涯从阿里巴巴 Java 工程师起步，曾参与天猫超市早期建设，后来持续在心理健康、医疗健康与 AI 产品方向工作。",
    },
    {
      question: "墨崔 专注于哪些技术领域？",
      umamiEvent: "faq-tech",
      answer:
        "全栈，古法编程时代的技术栈包括Java、Python、React、Vue、小程序。现在在AI编程领域属于维新派，长期使用Cursor，Claude code",
    },
    {
      question: "墨崔 有哪些心理健康资质？",
      umamiEvent: "faq-qualification",
      answer: [
        "2013-2015年参加杭州德瑞姆国家心理咨询师培训两年，2015年持有国家三级心理咨询师证书（编号：1503000210300408）。",
        "2016年参与香港精神分析家苏伟峰教授的拉康派心理学培训一年，并合作发表论文集《凝定与变迁》。",
        "2015年开始个人体验，累计 100+ 小时个人体验。",
        "2017年开始参与杭州第七人民医院危机干预热线工作，累计 200+ 小时，并参与编写《杭州市心理援助热线指导手册》。",
      ],
    },
    {
      question: "墨崔 目前开发了哪些产品？",
      umamiEvent: "faq-products",
      answer:
        "目前产品包括诵经 SONGJING、羽衣 YUYI、心蜗等，宁心安愈即将上线；另有脉轮测评、知己测试等历史产品。方向集中在心理健康、精神健康工具与生活方式应用。",
    },
    {
      question: "如何与 墨崔 合作或联系？",
      umamiEvent: "faq-contact",
      answer:
        "可以通过页面中的 GitHub、豆瓣、小红书或微信入口联系，适合围绕疗愈、心理健康、AI 与独立产品展开合作。",
    },
    {
      question: "墨崔 的产品理念是什么？",
      umamiEvent: "faq-philosophy",
      answer:
        "在疗愈与技术的十字路口，综合运用工程、心理学、佛学与产品经验，做出踏实、有用、能帮助他人的产品。",
    },
  ],
};

const en: SiteCopy = {
  htmlLang: "en",
  documentTitle: "Mocui — At the Crossroads of Healing and Technology",
  documentDescription:
    "Personal site of Mocui, an independent developer working at the intersection of healing and technology.",
  ui: {
    nav: {
      about: "About",
      skills: "Skills",
      products: "Products",
      faq: "FAQ",
    },
    navToggle: "Toggle navigation",
    navAria: "Main navigation",
    closeMenu: "Close menu",
    heroTagsAria: "Highlights",
    statsAria: "Snapshot",
    aboutLabel: "About",
    aboutTitle: "Before the crossroads",
    aboutExpand: "Read the full story",
    aboutCollapse: "Show less",
    timelineAria: "The path here",
    timelineTitle: "The path here",
    skillsLabel: "Expertise",
    skillsTitle: "Full-stack, applied across domains",
    skillTagsAria: "technologies",
    counselingAria: "Counseling background",
    productsLabel: "Indie products",
    productsTitle: "Built at the crossroads",
    productsLead:
      "Videos and notes on some indie products. Live ones have links you can try.",
    videoUnsupported: "Your browser does not support HTML5 video.",
    tryNow: "Try it",
    faqLabel: "FAQ",
    faqTitle: "Common questions about Mocui",
    wechatQr: "WeChat QR code",
    close: "Close",
    footerCopy: "Mocui · Independent developer",
    footerCredit: "Healing × Technology · Hangzhou · 2026",
    copyright: "All rights reserved",
    language: "Language",
    status: {
      online: "Live",
      soon: "Coming soon",
      offline: "Offline",
    },
  },
  brandTitle: "Mocui",
  name: "Mocui",
  tagline:
    "I'm 60% programmer and 40% counselor. At the intersection of healing and technology, I draw on both sides to build products that can actually help people.",
  heroEyebrow: "Independent developer · Hangzhou",
  heroTitle: "At the crossroads of healing and technology",
  heroTags: ["Java / Python", "Counselor", "React / Flutter", "AI products"],
  stats: [
    { value: "10+", label: "Years in tech" },
    { value: "8+", label: "Years in mental health" },
    { value: "Based in", label: "Hangzhou" },
    { value: "6+", label: "Indie projects" },
  ],
  aboutIntro:
    "I've come to feel that many things can't be planned. The narrative arc only appears after the events of a life have already happened — then you splice them together. I think Steve Jobs said something similar in that famous speech.",
  aboutParagraphs: [
    "I live in Hangzhou. My career started as a Java engineer at Alibaba. The most well-known product I worked on was Tmall Supermarket — a genuinely great product, though I was just a screw on a long assembly line. What that period gave me, most directly, was a grasp of how things actually get done: the logic and the methods. At the time, I still didn't know what I wanted to do.",
    "So I entered a long Odyssey: a music platform, a webcomic platform. Both were things I liked, but once I went deep, I found I didn't belong in those rooms. Maybe those detours were necessary; for me, there wasn't much positive feedback.",
    "During that long Odyssey, Wu Zhihong opened a door. I encountered counseling, and in the years of study that followed I received a great deal of positive feedback. So I thought I might try becoming a counselor. Being a J-type, I acted: two years at Dream, the national Level-3 counseling certificate, crisis-intervention hotline work at Hangzhou Seventh People's Hospital. It felt smooth. I felt born for this work — which, of course, is exactly the peak of Mount Stupid. Then, as expected, I slid into the Valley of Despair, and realized that helping people as a counselor, face to face, might not be the right fit for me.",
    "Then one day, by Erhai Lake in Dali, Yunnan, it clicked: I know technology, and I've studied psychology for so long — why not put the two together, and build something in the overlap?",
    "That's where things began to turn, onto a steadier slope. First at Hangzhou Xinmao, a counseling platform, I built psychological assessment products from scratch — a genuinely happy stretch of my career, and the first time I understood what it feels like to work on something I love. Later at Hangzhou Jianhai, a chronic-disease health management platform, I led an AI lab and built an ASR engine. That period drifted a bit from my theme, but I learned a lot about health management and AI, so it wasn't wasted. Mental health will have to move from the lone counselor fighting alone to multidimensional, long-term mental-health management.",
    "Then came thirty-five — a threshold. I decided to step off the company promotion track and pursue the possibility of running something myself: maybe my own products, maybe building with others in this field, maybe even leaving engineering altogether, as the value of that work keeps falling. Healing is the core I want to keep. Around that, I stay open.",
    "That's roughly the path that brought me here. I haven't collected many shiny achievements, and I haven't suffered any great disasters either. I'm unusually grateful for what I've received, and I don't cling to what I've lost. Life isn't only the first half; there are still many years in the second (perhaps). I still hope there will be things worth tinkering with, to carry me through this long and abundant life.",
  ],
  timeline: [
    {
      period: "2009",
      title: "Java engineer at Alibaba",
      desc: "Helped build Tmall Supermarket in its early days; learned how work actually gets done",
    },
    {
      period: "2009–2016",
      title: "The Odyssey years",
      desc: "Moved through a music platform and a webcomic platform, iterating on things I liked",
    },
    {
      period: "2013",
      title: "Into counseling",
      desc: "Two years at Dream, national Level-3 certificate, crisis hotline at Hangzhou Seventh Hospital",
    },
    {
      period: "2016",
      title: "A realization by Erhai Lake",
      desc: "Decided to build products in the overlap of technology and psychology",
    },
    {
      period: "2017–2022",
      title: "Xinmao → Jianhai",
      desc: "Built psych assessments from scratch; led an AI lab and shipped an ASR engine",
    },
    {
      period: "2022–now",
      title: "Going independent",
      desc: "Left the company track; still building at the intersection of healing and technology",
    },
  ],
  social: [
    { label: "GitHub", ...socialShared.github },
    { label: "Douban", ...socialShared.douban },
    { label: "Xiaohongshu", ...socialShared.xiaohongshu },
    { label: "WeChat", ...socialShared.wechat },
  ],
  skillCards: [
    {
      title: "Backend",
      description: "Started at Alibaba; led architecture across multiple platforms",
      tags: ["Java", "Python"],
    },
    {
      title: "Frontend",
      description: "From psychological assessments to independent web apps",
      tags: ["React", "Vue", "JavaScript"],
    },
    {
      title: "Mobile",
      description: "Cross-platform mobile development",
      tags: ["Flutter", "Kotlin", "Mini Program"],
    },
    {
      title: "AI",
      description: "Led the AI lab at Hangzhou Jianhai",
      tags: ["ASR", "Dify", "Coze"],
    },
  ],
  counseling: {
    trainingTitle: "Training",
    training: [
      "Two years of national counselor training at Hangzhou Dream, with a national Level-3 counseling certificate (No. 1503000210300408).",
      "One year of Lacanian training with Hong Kong psychoanalyst Prof. So Wai Fung, and a co-authored essay collection, Fixation and Change.",
    ],
    practiceTitle: "Practice",
    practice: [
      "100+ hours of personal therapy.",
      "Since 2017, 200+ hours on the crisis-intervention hotline at Hangzhou Seventh People's Hospital, and a contributor to the Hangzhou Psychological Assistance Hotline Handbook.",
    ],
    schoolsLabel: "Preferred approaches",
    schools: ["Psychoanalysis", "Existential", "Solution-Focused"],
    authorsLabel: "Favorite writers",
    authors: ["Wu Zhihong", "Irvin Yalom", "Karen Horney", "Nancy McWilliams"],
  },
  products: [
    {
      ...productShared[0],
      title: "Songjing",
      subtitle: "Recitation",
      kicker: "Heart Sutra recitation",
      description:
        "The Heart Sutra appears on the page, then each character turns to sand. You can recite along and feel emptiness visually. That gathering-and-dispersing also works at a quieter level, loosening attachment to people and things we cling to.",
      tags: ["AI", "Python", "Flutter"],
    },
    {
      ...productShared[1],
      title: "Yuyi",
      subtitle: "Seasonal color",
      kicker: "Solar-term clothing colors",
      description:
        "Following the 24 solar terms and the lunar calendar, it recommends colors to wear — and to avoid — each day, bringing older seasonal wisdom into everyday dressing.",
      tags: ["AI", "Python", "UniApp"],
    },
    {
      ...productShared[2],
      title: "Xinwo",
      subtitle: "Infrastructure",
      kicker: "Support system for counselors",
      description:
        "A daily work system for counselors: intake, scheduling, follow-up, and the tedious rest. It also includes AI client, AI supervision, and AI counseling, to help counselors grow faster.",
      tags: ["Mental health", "AI", "Mini Program"],
    },
    {
      ...productShared[3],
      title: "Ningxin Anyu",
      subtitle: "Family support",
      kicker: "Medication log and stats",
      description:
        "A medication log and statistics tool for families of people with schizophrenia. It helps look back through records, notice more effective care, and ease some of the anxiety that comes with caregiving.",
      tags: ["Mental health", "Medication log", "Family support"],
    },
    {
      ...productShared[4],
      title: "Chakra assessment",
      subtitle: "Energy profile",
      kicker: "Seven-chakra trait assessment",
      description:
        "A non-projective assessment that maps the relative strength of the seven chakras, then recommends crystals that fit those patterns.",
      tags: ["Assessment", "Chakra", "Crystal"],
    },
    {
      ...productShared[5],
      title: "Zhiji Tests",
      subtitle: "Know yourself",
      kicker: "Psychological test collection",
      description:
        "A collection of traditional psychological assessments built for Xinmao — depression, anxiety, SCL-90, and 40+ other tests in one place.",
      tags: ["Assessment", "Depression", "Anxiety"],
    },
  ],
  faqs: [
    {
      question: "Who is Mocui?",
      umamiEvent: "faq-who",
      answer:
        "Mocui is an independent developer based in Hangzhou. His career started as a Java engineer at Alibaba, including early work on Tmall Supermarket, and later continued in mental health, healthcare, and AI products.",
    },
    {
      question: "What technologies does Mocui work with?",
      umamiEvent: "faq-tech",
      answer:
        "Full-stack. From the classical era: Java, Python, React, Vue, and mini programs. In the AI-coding era he leans reformist, and works daily in Cursor and Claude Code.",
    },
    {
      question: "What mental-health credentials does Mocui have?",
      umamiEvent: "faq-qualification",
      answer: [
        "Two years of national counselor training at Hangzhou Dream, with a national Level-3 counseling certificate (No. 1503000210300408).",
        "From 2017, four consecutive years on the crisis-intervention hotline at Hangzhou Seventh People's Hospital, and a contributor to the Hangzhou Psychological Assistance Hotline Handbook.",
        "One year of Lacanian training with Hong Kong psychoanalyst Prof. So Wai Fung, and a co-authored essay collection, Fixation and Change.",
      ],
    },
    {
      question: "What products has Mocui built?",
      umamiEvent: "faq-products",
      answer:
        "Current products include Songjing, Yuyi, and Xinwo. Ningxin Anyu is coming soon. Earlier work includes a chakra assessment and Zhiji Tests. The through-line is mental health, psychiatric-care tools, and lifestyle apps.",
    },
    {
      question: "How can I work with or reach Mocui?",
      umamiEvent: "faq-contact",
      answer:
        "Use the GitHub, Douban, Xiaohongshu, or WeChat links on this page. Good fits include healing, mental health, AI, and independent products.",
    },
    {
      question: "What is Mocui's product philosophy?",
      umamiEvent: "faq-philosophy",
      answer:
        "At the crossroads of healing and technology: bring engineering, psychology, Buddhism, and product craft together, and make things that are grounded, useful, and able to help people.",
    },
  ],
};

export const copies: Record<Locale, SiteCopy> = { zh, en };
