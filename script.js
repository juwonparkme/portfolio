const sections = Array.from(document.querySelectorAll(".section"));
const navLinks = Array.from(document.querySelectorAll(".sidebar-nav a"));
const langButtons = Array.from(document.querySelectorAll(".lang-toggle button"));
const descriptionMeta = document.querySelector('meta[name="description"]');
const isPdfMode = new URLSearchParams(window.location.search).get("pdf") === "1";
const projectList = document.querySelector("#project-list");
const projectSpotlight = document.querySelector("#project-spotlight");
const projectFilters = document.querySelector("#project-filters");
const skillsGroups = document.querySelector("#skills-groups");
const skillsSpotlight = document.querySelector("#skills-spotlight");
let currentLanguage = "ko";
let activeProjectSlug = "terratform";
let activeProjectFilter = "all";
let activeSkillSlug = "terraform";

if (isPdfMode) {
  document.body.classList.add("pdf-export");
}

const translations = {
  ko: {
    document_title: "박주원 | DevOps Portfolio",
    meta_description:
      "박주원의 DevOps 포트폴리오. Experience는 이력서 원본, Projects는 GitHub 공개 저장소, Skills는 GitHub와 juwon_blog의 _posts를 기준으로 구성했습니다.",
    sidebar_role: "DevOps Engineer",
    nav_about: "About",
    nav_experience: "Experience",
    nav_projects: "Projects",
    nav_details: "ㄴ Details",
    nav_skills: "Skills",
    nav_contents: "ㄴ Contents",
    hello: "안녕하세요, 박주원입니다.",
    hero_lead: "End-to-End DevOps.",
    hero_copy_1:
      "AWS, Terraform, Docker, GitHub Actions를 중심으로 배포 자동화와 운영 표준화를 구축해 왔습니다. 인프라 코드, 배포 체인, 모니터링, 로그 관제, 운영 문서화를 한 흐름으로 설계하고 유지합니다.",
    hero_copy_2:
      "반복되는 문제는 스크립트와 문서로 고정합니다. 공개 저장소에는 구현을 남기고, 블로그에는 운영 과정과 트러블슈팅을 남깁니다.",
    stat_projects_desc: "GitHub Public Repos",
    stat_posts_desc: "juwon_blog _posts",
    stat_tracks_desc: "Cloud / IaC / CI-CD / Ops / Backend",
    stat_role_desc: "Current Freelance Infra Work",
    section_eyebrow_experience: "Experience",
    section_title_experience: "Experience",
    freelance_period: "2025.10 - 현재",
    freelance_title: "이복스 · 프리랜서",
    experience_primary_role: "DevOps Engineer / Infra Freelancer",
    experience_primary_org: "이복스 · Seoul · Freelance",
    experience_primary_summary:
      "서버 구축, 마이그레이션, 파일 서버 인프라, ERP 서버 구성까지 포함한 현장형 인프라 업무를 맡고 있습니다. 운영 환경에 맞는 OS 구축, 보안 기초 설정, 서버 사양 산정, 하드웨어 조달과 설치까지 직접 다룹니다.",
    experience_primary_block_title: "주요 업무",
    experience_primary_item_1: "성균관대학교 메디컬 캠퍼스 서버 마이그레이션",
    experience_primary_item_2: "Ubuntu 신규 구축 및 기초 보안 정책 적용",
    experience_primary_item_3: "CUDA 개발 환경 구성",
    experience_primary_item_4: "IDC 운영 규정 준수를 위한 Railkit 설치",
    experience_primary_item_5: "대형 MCN 법인 파일 서버 인프라 구축과 NAS 서비스 환경 구성",
    experience_primary_item_6: "대보그룹 ERP 서버 구축, OLTP 워크로드 분석, 서버 사양 산정",
    experience_primary_item_7: "Rocky Linux 신규 구축 및 중고 서버 부품 조달, 조립, 설치 진행",
    experience_concierge_role: "컨시어지",
    experience_concierge_org: "포포인츠 바이 쉐라톤 조선 서울역 · Seoul",
    experience_concierge_period: "2024.01 - 2025.11",
    experience_concierge_summary:
      "대형 외국계 기업 현장 응대, 방문객 안내, 현장 소통과 운영 지원을 맡았습니다.",
    experience_concierge_block_title: "주요 업무",
    experience_concierge_item_1: "외국인 고객 대상 안내 및 현장 응대",
    experience_concierge_item_2: "방문객 문의사항 확인과 동선 안내 지원",
    experience_concierge_item_3: "현장 내 원활한 소통과 운영 지원",
    experience_barista_role: "바리스타",
    experience_barista_org: "카페베네 · Seoul",
    experience_barista_period: "2021.02 - 2021.08",
    experience_barista_summary:
      "고객 응대, 음료 제조, 물품 관리, 창고 관리를 담당했습니다.",
    experience_barista_block_title: "주요 업무",
    experience_barista_item_1: "고객 응대 및 음료 제조 업무",
    experience_barista_item_2: "물품 관리 및 창고 관리",
    experience_pollster_role: "Pollster",
    experience_pollster_org: "노원 사회적경제 연대사회적협동조합 · Seoul",
    experience_pollster_period: "2020.09 - 2020.12",
    experience_pollster_summary:
      "현장 조사, 사무 보조, 설문 결과 데이터 정리와 문서화를 담당했습니다.",
    experience_pollster_block_title: "주요 업무",
    experience_pollster_item_1: "노원구 노인을 대상으로 복지정책 수요조사 현장 설문 진행",
    experience_pollster_item_2: "설문 응답 내용 수집 및 기초 자료 정리",
    experience_pollster_item_3: "조사 결과 취합 및 보고용 기초자료 정리",
    experience_education_role: "Bachelor of Engineering",
    experience_education_org: "광운대학교 정보과학교육원",
    experience_education_period: "2024 - 2026",
    experience_education_summary:
      "컴퓨터공학 기반 학업과 실무형 교육 과정을 통해 Python, Django, HTML, JavaScript, 데이터베이스 기초를 체계적으로 학습했습니다.",
    experience_education_block_title: "학력 / 교육",
    experience_education_item_1: "광운대학교 정보과학교육원 · GPA 4.04 / 4.5",
    experience_education_item_2: "Python 강사 과정 · 2024.07 - 2024.09",
    experience_bosei_role: "Bosei Sports College",
    experience_bosei_org: "Denmark",
    experience_bosei_period: "2023.08 - 2023.10",
    experience_bosei_summary:
      "덴마크 Bosei Sports College에서 자기개발, 공동체 협업, 스포츠·건강·문화 이론, 야외 체험, 건강관리 프로그램을 수료했습니다.",
    experience_bosei_block_title: "주요 학습 내용",
    experience_bosei_item_1:
      "Self Development: 자기관리, 목표 설정, 공동체 생활을 통한 자기개발 역량 강화 프로그램",
    experience_bosei_item_2:
      "Assemblies: 공동체 활동을 통한 소통 능력 및 협업 역량 향상 프로그램",
    experience_bosei_item_3: "Lectures: 스포츠·건강·문화 관련 이론 강의 학습",
    experience_bosei_item_4:
      "Outdoor Activities: 야외 체험 활동을 통한 도전정신, 협동심, 적응력 강화",
    experience_bosei_item_5:
      "Health and Fitness: 체력 증진, 건강관리, 운동 습관 형성을 위한 프로그램",
    section_eyebrow_projects: "Projects",
    section_title_projects: "Projects",
    projects_copy:
      "공개 저장소별 핵심 구현과 운영 포인트를 요약했습니다. 카드를 선택하면 우측에서 상세 요약을 보고, 상세 페이지 버튼으로 GitHub 저장소로 이동할 수 있습니다.",
    projects_view_all: "전체 프로젝트 보기",
    project_detail_label: "주요 내용",
    project_stack_label: "기술 스택",
    project_related_label: "연결 글",
    project_cta: "상세 페이지",
    project_related_empty: "연결한 공개 글은 없고, 저장소 README 기준으로 구성했습니다.",
    section_eyebrow_skills: "Skills",
    section_title_skills: "Skills",
    skills_view_all: "전체 콘텐츠 보기",
    skills_count_suffix: "개의 글",
    section_eyebrow_contact: "Contact",
    section_title_contact: "연락처",
  },
  en: {
    document_title: "Juwon Park | DevOps Portfolio",
    meta_description:
      "Juwon Park's DevOps portfolio. Experience is based on the resume source, Projects on public GitHub repositories, and Skills on GitHub plus juwon_blog posts.",
    sidebar_role: "DevOps Engineer",
    nav_about: "About",
    nav_experience: "Experience",
    nav_projects: "Projects",
    nav_details: "ㄴ Details",
    nav_skills: "Skills",
    nav_contents: "ㄴ Contents",
    hello: "Hello, I'm Juwon Park.",
    hero_lead: "End-to-End DevOps.",
    hero_copy_1:
      "I have built deployment automation and operating standards around AWS, Terraform, Docker, and GitHub Actions. I work across infrastructure code, delivery pipelines, monitoring, log operations, and runbooks as one continuous system.",
    hero_copy_2:
      "When a problem repeats, I turn it into code or documentation. Public repositories show the implementation, and the blog keeps the operating logs and troubleshooting trail.",
    stat_projects_desc: "GitHub Public Repos",
    stat_posts_desc: "juwon_blog posts",
    stat_tracks_desc: "Cloud / IaC / CI-CD / Ops / Backend",
    stat_role_desc: "Current freelance infra work",
    section_eyebrow_experience: "Experience",
    section_title_experience: "Experience",
    freelance_period: "2025.10 - Present",
    freelance_title: "Evox · Freelance",
    experience_primary_role: "DevOps Engineer / Infra Freelancer",
    experience_primary_org: "Evox · Seoul · Freelance",
    experience_primary_summary:
      "I handle field-oriented infrastructure work covering server builds, migrations, file server infrastructure, and ERP server setup. The scope includes OS provisioning, baseline security, capacity sizing, hardware sourcing, and on-site installation.",
    experience_primary_block_title: "Key Work",
    experience_primary_item_1: "Migrated servers for the Sungkyunkwan University Medical Campus",
    experience_primary_item_2: "Provisioned new Ubuntu systems and applied baseline security policy",
    experience_primary_item_3: "Built CUDA development environments",
    experience_primary_item_4: "Installed Railkit to meet IDC operational compliance requirements",
    experience_primary_item_5: "Built file server infrastructure and NAS service environment for a large MCN corporation",
    experience_primary_item_6: "Built Daebo Group ERP servers, analyzed OLTP workloads, and sized servers",
    experience_primary_item_7: "Provisioned Rocky Linux systems and handled used-server part sourcing, assembly, and installation",
    experience_concierge_role: "Concierge",
    experience_concierge_org: "Four Points by Sheraton Josun, Seoul Station · Seoul",
    experience_concierge_period: "2024.01 - 2025.11",
    experience_concierge_summary:
      "Handled on-site guest support, visitor guidance, and front-line operational coordination in a global hospitality environment.",
    experience_concierge_block_title: "Key Work",
    experience_concierge_item_1: "Guest guidance and on-site support for international visitors",
    experience_concierge_item_2: "Answered visitor requests and supported on-site routing",
    experience_concierge_item_3: "Supported smooth communication and day-to-day site operations",
    experience_barista_role: "Barista",
    experience_barista_org: "Caffe Bene · Seoul",
    experience_barista_period: "2021.02 - 2021.08",
    experience_barista_summary:
      "Handled customer service, beverage preparation, inventory control, and stockroom management.",
    experience_barista_block_title: "Key Work",
    experience_barista_item_1: "Customer support and beverage preparation",
    experience_barista_item_2: "Inventory and stockroom management",
    experience_pollster_role: "Pollster",
    experience_pollster_org: "Nowon Social Economy Solidarity Social Cooperative · Seoul",
    experience_pollster_period: "2020.09 - 2020.12",
    experience_pollster_summary:
      "Handled field surveys, administrative support, response data cleanup, and documentation.",
    experience_pollster_block_title: "Key Work",
    experience_pollster_item_1: "Conducted field surveys on welfare policy demand among senior residents in Nowon-gu",
    experience_pollster_item_2: "Collected survey responses and organized base data",
    experience_pollster_item_3: "Compiled results and prepared reporting materials",
    experience_education_role: "Bachelor of Engineering",
    experience_education_org: "Kwangwoon University Institute of Information Science Education",
    experience_education_period: "2024 - 2026",
    experience_education_summary:
      "I studied computer engineering and completed practical training covering Python, Django, HTML, JavaScript, and database fundamentals.",
    experience_education_block_title: "Education / Training",
    experience_education_item_1: "Kwangwoon University Institute of Information Science Education · GPA 4.04 / 4.5",
    experience_education_item_2: "Python Instructor Course · 2024.07 - 2024.09",
    experience_bosei_role: "Bosei Sports College",
    experience_bosei_org: "Denmark",
    experience_bosei_period: "2023.08 - 2023.10",
    experience_bosei_summary:
      "Completed a program at Bosei Sports College in Denmark focused on self-development, community collaboration, sports and wellness theory, outdoor activities, and health management.",
    experience_bosei_block_title: "Key Learning Areas",
    experience_bosei_item_1:
      "Self Development: self-management, goal setting, and growth through community living",
    experience_bosei_item_2:
      "Assemblies: communication and collaboration through community activities",
    experience_bosei_item_3:
      "Lectures: theory sessions on sports, health, and culture",
    experience_bosei_item_4:
      "Outdoor Activities: challenge, teamwork, and adaptability through outdoor experience",
    experience_bosei_item_5:
      "Health and Fitness: programs for fitness, health management, and exercise habits",
    section_eyebrow_projects: "Projects",
    section_title_projects: "Projects",
    projects_copy:
      "Each public repository is summarized by implementation focus and operating context. Select a card to inspect the detail panel and jump to the GitHub repository from the detail button.",
    projects_view_all: "View All Projects",
    project_detail_label: "Highlights",
    project_stack_label: "Tech Stack",
    project_related_label: "Related Content",
    project_cta: "Detail Page",
    project_related_empty: "No linked public post. Summary is based on the repository README and code structure.",
    section_eyebrow_skills: "Skills",
    section_title_skills: "Skills",
    skills_view_all: "View All Posts",
    skills_count_suffix: " posts",
    section_eyebrow_contact: "Contact",
    section_title_contact: "Contact",
  },
};

const projectCatalog = [
  {
    slug: "terratform",
    title: "Terraform 기반 AWS 인프라 운영",
    period: "2026.03",
    repoUrl: "https://github.com/juwonparkme/terratform",
    type: { ko: "infra", en: "infra" },
    filter: "infra",
    subtitle: { ko: "Terraform / AWS IaC", en: "Terraform / AWS IaC" },
    cardSummary: {
      ko: "Terraform으로 AWS 인프라를 선언적으로 관리하고 배포 패턴을 재사용 가능한 모듈로 정리한 워크스페이스.",
      en: "A Terraform workspace that manages AWS infrastructure declaratively and standardizes reusable deployment modules.",
    },
    summary: {
      ko: "AWS 인프라를 Terraform으로 관리하고, 서비스별 배포 패턴을 재사용 가능한 모듈로 정리한 저장소입니다. 운영 문서와 환경 구조를 같이 관리해 실제 운영 흐름과 코드가 분리되지 않도록 구성했습니다.",
      en: "A Terraform repository for AWS infrastructure with reusable deployment modules and environment-aware layout. Code and operating structure are kept together so the deployment flow stays explicit.",
    },
    tags: ["Terraform", "AWS", "Lambda", "ALB", "S3", "DynamoDB", "Python"],
    highlights: {
      ko: [
        "DeepLX Lambda Proxy용 ALB + Lambda + S3 artifact + Terraform backend 구성",
        "env -> module -> docs 구조로 운영 가시성과 재사용성 확보",
        "build -> test -> apply -> verify -> destroy 흐름을 문서와 코드로 같이 유지",
      ],
      en: [
        "Built ALB + Lambda + S3 artifact + Terraform backend layout for a DeepLX Lambda proxy",
        "Used an env -> module -> docs structure for reuse and operational visibility",
        "Kept build -> test -> apply -> verify -> destroy flow aligned in code and docs",
      ],
    },
    related: [
      { label: "Terraform 1", url: "https://juwonpark.me/Terraform_1.html" },
    ],
  },
  {
    slug: "quiz_ai_testpro",
    title: "문서 업로드형 AI 퀴즈 플랫폼",
    period: "2025.10 - 2026.03",
    repoUrl: "https://github.com/juwonparkme/quiz_ai_testpro",
    type: { ko: "backend", en: "backend" },
    filter: "backend",
    subtitle: { ko: "Django / AI Quiz Platform", en: "Django / AI Quiz Platform" },
    cardSummary: {
      ko: "문서 업로드 기반 AI 퀴즈 생성 플랫폼. 기능 구현과 배포 운영 이슈 대응 절차까지 문서화한 팀 프로젝트.",
      en: "A document-upload AI quiz platform covering feature work and documented deployment/operations handling.",
    },
    summary: {
      ko: "문서 업로드 기반 AI 퀴즈 생성 플랫폼입니다. Django 앱 구현뿐 아니라 GitHub Actions, ECR, Nginx, Cloudflare를 포함한 배포 경로와 운영 절차를 같이 정리했습니다.",
      en: "A document-upload AI quiz platform built with Django. The repository also captures the deployment route and operating playbook across GitHub Actions, ECR, Nginx, and Cloudflare.",
    },
    tags: ["Django", "Python", "MySQL", "OpenAI", "GitHub Actions", "AWS ECR", "Nginx", "Cloudflare"],
    highlights: {
      ko: [
        "Django, MySQL, OpenAI API 기반 서비스 구현",
        "GitHub Actions OIDC 기반 AWS ECR 이미지 푸시 자동화",
        "Nginx reverse proxy, Cloudflare, 정적 파일 운영 이슈 대응 절차 정리",
      ],
      en: [
        "Implemented the service with Django, MySQL, and the OpenAI API",
        "Automated AWS ECR image push using GitHub Actions OIDC",
        "Documented Nginx reverse proxy, Cloudflare, and static asset operations",
      ],
    },
    related: [
      { label: "프로젝트 구조 분석", url: "https://juwonpark.me/DjangoProject.html" },
      { label: "Docker 이전", url: "https://juwonpark.me/Docker1.html" },
      { label: "Ansible 배포 준비", url: "https://juwonpark.me/ansible.html" },
    ],
  },
  {
    slug: "ai_ppt",
    title: "AI 발표자료 자동 생성 웹앱",
    period: "2025.02 - 2026.03",
    repoUrl: "https://github.com/juwonparkme/ai_ppt",
    type: { ko: "automation", en: "automation" },
    filter: "automation",
    subtitle: { ko: "AI Presentation Automation", en: "AI Presentation Automation" },
    cardSummary: {
      ko: "주제 입력부터 슬라이드 구조화, 웹 에디터 수정, PPT 다운로드까지 이어지는 AI 기반 자동화 웹앱.",
      en: "An AI presentation web app from topic input to slide generation, editing, and PPT download.",
    },
    summary: {
      ko: "주제 입력부터 슬라이드 구조화, 웹 에디터 수정, .pptx 다운로드까지 이어지는 AI 기반 PPT 자동화 웹앱입니다. 생성 계층과 렌더 계층을 분리해 구조를 명확히 했습니다.",
      en: "An AI presentation automation app spanning prompt input, slide structuring, web editing, and .pptx download. Generation and rendering were split to keep the architecture explicit.",
    },
    tags: ["Django", "OpenAI API", "PptxGenJS", "TypeScript", "Docker", "Nginx", "Lightsail"],
    highlights: {
      ko: [
        "Django + OpenAI와 TypeScript 기반 ppt-renderer를 분리해 구성",
        "SlideSpec 계약으로 생성 계층과 렌더 계층 경계 고정",
        "Docker, Nginx, certbot 기반 Lightsail 배포 경로 검증",
      ],
      en: [
        "Separated Django + OpenAI generation from a TypeScript-based ppt renderer",
        "Used a SlideSpec contract to pin down the boundary between generation and rendering",
        "Verified the deployment path on Lightsail with Docker, Nginx, and certbot",
      ],
    },
    related: [
      { label: "삽질 기록 1", url: "https://juwonpark.me/pptauto1.html" },
      { label: "삽질 기록 2", url: "https://juwonpark.me/pptauto2.html" },
      { label: "Lightsail 배포 기록", url: "https://juwonpark.me/pptauto3.html" },
    ],
  },
  {
    slug: "cardnews_auto",
    title: "음악 카드뉴스 제작 자동화 CLI",
    period: "2026.01 - 2026.03",
    repoUrl: "https://github.com/juwonparkme/cardnews_auto",
    type: { ko: "content", en: "content" },
    filter: "automation",
    subtitle: { ko: "Cardnews Production CLI", en: "Cardnews Production CLI" },
    cardSummary: {
      ko: "데이터 수집, 요약 생성, 이미지 처리, 템플릿 반영, PDF 출력까지 자동화한 카드뉴스 제작 CLI.",
      en: "A cardnews CLI automating data collection, summaries, image handling, template fill, and PDF output.",
    },
    summary: {
      ko: "카드뉴스 제작에 필요한 데이터 수집, 요약 생성, 이미지 처리, 템플릿 반영, PDF 출력까지 자동화한 CLI 프로젝트입니다. 실행 기록을 남겨 재실행과 운영 점검이 쉽게 되도록 만들었습니다.",
      en: "A CLI pipeline for cardnews production from data collection to summary generation, image handling, template fill, and PDF export. Run logs were built in for re-runs and operational traceability.",
    },
    tags: ["TypeScript", "Node.js", "CLI", "OpenAI", "Spotify API", "Canva API", "PPTXGenJS"],
    highlights: {
      ko: [
        "멜론, 벅스, 스포티파이 조회와 앨범 요약, 커버 이미지 다운로드 자동화",
        "Canva Brand Template autofill과 PDF export 연결",
        "run-summary.json 기반으로 실행별 결과와 상태 기록 유지",
      ],
      en: [
        "Automated lookup across Melon, Bugs, and Spotify with album summaries and cover downloads",
        "Connected Canva brand template autofill to PDF export",
        "Stored per-run results and state in run-summary.json",
      ],
    },
    related: [],
  },
  {
    slug: "agent-scripts",
    title: "Codex 작업 규칙 · 스킬 허브",
    period: "2026.02 - 2026.03",
    repoUrl: "https://github.com/juwonparkme/agent-scripts",
    type: { ko: "tooling", en: "tooling" },
    filter: "tooling",
    subtitle: { ko: "Codex Guardrails / Skills", en: "Codex Guardrails / Skills" },
    cardSummary: {
      ko: "공용 Codex 가드레일, 재사용 가능한 스킬, 이식성 있는 CLI 도구를 모은 기준 저장소.",
      en: "A baseline repository for Codex guardrails, reusable skills, and portable CLI helpers.",
    },
    summary: {
      ko: "공용 Codex 가드레일, 재사용 가능한 스킬, 이식성 있는 헬퍼 스크립트를 관리하는 기준 저장소입니다. 여러 저장소에서 같은 운영 규칙을 재사용할 수 있게 만드는 데 초점을 뒀습니다.",
      en: "A base repository for shared Codex guardrails, reusable skills, and portable helper scripts. The focus is to reuse the same operating standards across multiple repositories.",
    },
    tags: ["Python", "TypeScript", "Bash", "Bun", "Node.js", "GitHub CLI"],
    highlights: {
      ko: [
        "AGENTS.MD, skills, scripts, docs를 공용 기준으로 관리",
        "committer, docs-list, browser-tools 같은 CLI 도구 유지",
        "하위 저장소가 pointer-style AGENTS 구조를 따르도록 표준화",
      ],
      en: [
        "Maintained AGENTS.MD, skills, scripts, and docs as a shared base",
        "Kept CLI tools such as committer, docs-list, and browser-tools",
        "Standardized a pointer-style AGENTS pattern across downstream repositories",
      ],
    },
    related: [],
  },
  {
    slug: "ai_crawling_books",
    title: "도서 PDF 후보 탐색 CLI",
    period: "2026.02 - 2026.03",
    repoUrl: "https://github.com/juwonparkme/ai_crawling_books",
    type: { ko: "crawler", en: "crawler" },
    filter: "crawler",
    subtitle: { ko: "Book PDF Discovery CLI", en: "Book PDF Discovery CLI" },
    cardSummary: {
      ko: "책 제목/저자 입력 기반으로 PDF 후보를 수집하고 허용된 파일만 내려받는 안전 중심 CLI 크롤러.",
      en: "A safety-oriented CLI crawler that finds book PDF candidates and downloads only allowed files.",
    },
    summary: {
      ko: "책 제목과 저자명을 입력하면 PDF 후보를 수집하고, 라이선스 신호와 신뢰 도메인을 검토한 뒤 허용된 파일만 내려받는 CLI입니다. 검색 공급원과 정책을 분리해 안정성을 높였습니다.",
      en: "A CLI that gathers PDF candidates from a book title and author, checks licensing signals and trusted domains, then downloads only allowed files. Search providers and policy checks were separated for reliability.",
    },
    tags: ["Python", "Selenium", "CLI", "Crawling", "Automation", "Brave Search"],
    highlights: {
      ko: [
        "Google CAPTCHA 이슈 이후 Bing, Brave Search 기반으로 검색 공급원 전환",
        "결과 관련성 점수화, 언어 필터링, direct PDF 신뢰 도메인 정책 적용",
        "--dry-run 중심으로 안전하게 후보를 검토하는 워크플로 설계",
      ],
      en: [
        "Switched search providers to Bing and Brave Search after Google CAPTCHA issues",
        "Applied relevance scoring, language filtering, and trusted-domain policy for direct PDFs",
        "Designed the workflow around --dry-run for safe review before download",
      ],
    },
    related: [
      { label: "도서 PDF 크롤러 프로토타입 점검", url: "https://juwonpark.me/book_crewling.html" },
    ],
  },
];

const projectFilterCatalog = [
  { key: "all", label: { ko: "전체", en: "All" } },
  { key: "infra", label: { ko: "인프라", en: "Infra" } },
  { key: "backend", label: { ko: "백엔드", en: "Backend" } },
  { key: "automation", label: { ko: "자동화", en: "Automation" } },
  { key: "tooling", label: { ko: "툴링", en: "Tooling" } },
  { key: "crawler", label: { ko: "크롤러", en: "Crawler" } },
  { key: "blog", label: { ko: "블로그", en: "Blog" } },
];

const skillsCatalog = [
  {
    key: "platform",
    title: { ko: "PLATFORM & IAC", en: "PLATFORM & IAC" },
    items: [
      {
        slug: "terraform",
        label: { ko: "Terraform", en: "Terraform" },
        summary: {
          ko: "Terraform 기준으로 인프라 설계, state 관리, 배포 검증 기록을 모았습니다.",
          en: "A Terraform-focused set of posts covering infrastructure design, state management, and deployment verification.",
        },
        posts: [
          {
            title: "Terraform 1",
            url: "https://juwonpark.me/Terraform_1.html",
            excerpt: {
              ko: "DeepLX Lambda Proxy를 AWS에 올리고 state backend, ALB, Lambda까지 끝까지 검증한 기록.",
              en: "A full Terraform run covering state backend, ALB, and Lambda deployment for DeepLX Lambda Proxy.",
            },
            tags: ["Terraform", "AWS", "Lambda"],
          },
        ],
      },
      {
        slug: "aws",
        label: { ko: "AWS", en: "AWS" },
        summary: {
          ko: "Lambda, Lightsail, Security Group 기준으로 AWS 운영과 배포 기록을 묶었습니다.",
          en: "A set of AWS posts around Lambda, Lightsail, and Security Group based deployment and operations.",
        },
        posts: [
          {
            title: "Terraform 1",
            url: "https://juwonpark.me/Terraform_1.html",
            excerpt: {
              ko: "DeepLX Lambda Proxy를 AWS에 올리고 state backend, ALB, Lambda까지 끝까지 검증한 기록.",
              en: "A full Terraform run covering state backend, ALB, and Lambda deployment for DeepLX Lambda Proxy.",
            },
            tags: ["Terraform", "AWS", "Lambda"],
          },
          {
            title: "AWS Security Group과 UFW",
            url: "https://juwonpark.me/Firewalld.html",
            excerpt: {
              ko: "클라우드 보안 그룹과 서버 방화벽을 같이 볼 때 헷갈리는 지점을 정리한 글.",
              en: "A post clarifying the difference between cloud security groups and host firewall policies.",
            },
            tags: ["AWS", "Firewall", "Security"],
          },
          {
            title: "Lightsail 배포 경로",
            url: "https://juwonpark.me/pptauto3.html",
            excerpt: {
              ko: "Lightsail 기반 서비스 운영 경로와 실제 배포 흐름을 정리한 기록.",
              en: "A deployment note covering the real service path and operational flow on Lightsail.",
            },
            tags: ["AWS", "Lightsail", "Deploy"],
          },
        ],
      },
      {
        slug: "docker",
        label: { ko: "Docker", en: "Docker" },
        summary: {
          ko: "컨테이너화와 서버 이관 중심의 Docker 기록입니다.",
          en: "A Docker category focused on containerization and server migration.",
        },
        posts: [
          {
            title: "Django 프로젝트를 Docker로 Debian에 옮기기",
            url: "https://juwonpark.me/Docker1.html",
            excerpt: {
              ko: "Ubuntu에서 만든 Django 이미지를 Debian 서버로 이전한 컨테이너 이관 기록.",
              en: "A migration note for moving a Django Docker image from Ubuntu to Debian.",
            },
            tags: ["Docker", "Django", "Debian"],
          },
        ],
      },
      {
        slug: "delivery",
        label: { ko: "Delivery", en: "Delivery" },
        summary: {
          ko: "배포 자동화, 서버 반영, 프록시 경로까지 포함한 전달 체인 기록입니다.",
          en: "A delivery category covering deployment automation, server rollout, and proxy routing.",
        },
        posts: [
          {
            title: "Jekyll 자동배포",
            url: "https://juwonpark.me/firstblogpost.html",
            excerpt: {
              ko: "GitHub Pages와 블로그 배포 흐름을 처음부터 끝까지 정리한 글.",
              en: "An end-to-end note on GitHub Pages based blog deployment.",
            },
            tags: ["GitHub Actions", "Jekyll", "Deploy"],
          },
          {
            title: "Django 프로젝트를 Docker로 Debian에 옮기기",
            url: "https://juwonpark.me/Docker1.html",
            excerpt: {
              ko: "Ubuntu에서 만든 Django 이미지를 Debian 서버로 이전한 컨테이너 이관 기록.",
              en: "A migration note for moving a Django Docker image from Ubuntu to Debian.",
            },
            tags: ["Docker", "Django", "Debian"],
          },
          {
            title: "Reverse Proxy와 Nginx",
            url: "https://juwonpark.me/reverse_proxy.html",
            excerpt: {
              ko: "Nginx reverse proxy 개념과 실제 운영 적용 포인트를 정리한 글.",
              en: "A post on Nginx reverse proxy concepts and real operational considerations.",
            },
            tags: ["Nginx", "Reverse Proxy", "Ops"],
          },
          {
            title: "Ansible 배포 준비",
            url: "https://juwonpark.me/ansible.html",
            excerpt: {
              ko: "반복 서버 작업을 코드로 옮기기 위한 Ansible 기초 정리.",
              en: "A foundational note on using Ansible to turn repetitive server tasks into code.",
            },
            tags: ["Ansible", "Automation", "Deploy"],
          },
        ],
      },
    ],
  },
  {
    key: "operations",
    title: { ko: "OBSERVABILITY & OPS", en: "OBSERVABILITY & OPS" },
    items: [
      {
        slug: "observability",
        label: { ko: "Observability", en: "Observability" },
        summary: {
          ko: "Prometheus, Grafana, Alertmanager, Zabbix, Elastic Stack 중심 운영 관제 묶음입니다.",
          en: "An operations bundle focused on Prometheus, Grafana, Alertmanager, Zabbix, and Elastic Stack.",
        },
        posts: [
          {
            title: "Prometheus + Grafana + Alertmanager",
            url: "https://juwonpark.me/prometheus.html",
            excerpt: {
              ko: "Docker Compose로 모니터링 스택을 만들고 이메일 알림까지 검증한 기록.",
              en: "A monitoring lab using Docker Compose with email alert verification end-to-end.",
            },
            tags: ["Prometheus", "Grafana", "Alertmanager"],
          },
          {
            title: "Zabbix 모니터링",
            url: "https://juwonpark.me/zabbix.html",
            excerpt: {
              ko: "Zabbix 기반 서버 모니터링 설정과 점검 과정을 정리한 글.",
              en: "A note on configuring and validating server monitoring with Zabbix.",
            },
            tags: ["Zabbix", "Monitoring", "Ops"],
          },
          {
            title: "Elastic Stack 로그 관제",
            url: "https://juwonpark.me/ElasticStack.html",
            excerpt: {
              ko: "로그 수집, 적재, 시각화 흐름을 Elastic Stack으로 구성한 기록.",
              en: "A log pipeline note covering collection, indexing, and visualization with Elastic Stack.",
            },
            tags: ["Elastic", "Logging", "Observability"],
          },
        ],
      },
      {
        slug: "network",
        label: { ko: "Network", en: "Network" },
        summary: {
          ko: "리버스 프록시, 로드밸런싱, 네트워크 점검 도구 중심 카테고리입니다.",
          en: "A category around reverse proxy, load balancing, and network diagnostics.",
        },
        posts: [
          {
            title: "Reverse Proxy와 Nginx",
            url: "https://juwonpark.me/reverse_proxy.html",
            excerpt: {
              ko: "서비스 앞단에서 Nginx를 어떻게 배치하고 트래픽을 전달할지 정리한 글.",
              en: "A post on placing Nginx in front of services and forwarding traffic safely.",
            },
            tags: ["Nginx", "Proxy", "Traffic"],
          },
          {
            title: "Nginx 로드 밸런서",
            url: "https://juwonpark.me/loadbalancer.html",
            excerpt: {
              ko: "업스트림 분산과 헬스체크 관점에서 로드 밸런싱을 실습한 기록.",
              en: "A practical note on upstream distribution and health checks with Nginx load balancing.",
            },
            tags: ["Nginx", "Load Balancer", "HA"],
          },
          {
            title: "네트워크 점검 도구",
            url: "https://juwonpark.me/NetworkingTools.html",
            excerpt: {
              ko: "운영 중 바로 쓰는 네트워크 점검 명령과 해석 포인트를 모은 글.",
              en: "A practical guide to network diagnostic commands and how to interpret them.",
            },
            tags: ["Networking", "Troubleshooting", "CLI"],
          },
        ],
      },
      {
        slug: "security",
        label: { ko: "Security", en: "Security" },
        summary: {
          ko: "보안 그룹과 방화벽처럼 운영 보안 기준을 정리한 카테고리입니다.",
          en: "A category for operational security basics such as security groups and host firewalls.",
        },
        posts: [
          {
            title: "AWS Security Group과 UFW",
            url: "https://juwonpark.me/Firewalld.html",
            excerpt: {
              ko: "클라우드와 서버 레벨 보안을 같이 설계할 때 필요한 기준을 정리한 글.",
              en: "A note on the baseline needed when designing cloud-level and host-level security together.",
            },
            tags: ["Firewall", "AWS", "Security"],
          },
        ],
      },
    ],
  },
  {
    key: "automation",
    title: { ko: "BACKEND & AUTOMATION", en: "BACKEND & AUTOMATION" },
    items: [
      {
        slug: "backend",
        label: { ko: "Backend", en: "Backend" },
        summary: {
          ko: "Django 기반 서비스 구조와 서버 흐름 중심의 백엔드 카테고리입니다.",
          en: "A backend category focused on Django service structure and server flow.",
        },
        posts: [
          {
            title: "AI 퀴즈 구조 분석",
            url: "https://juwonpark.me/DjangoProject.html",
            excerpt: {
              ko: "Django 기반 AI 퀴즈 서비스 구조와 서버 흐름을 정리한 글.",
              en: "A structural analysis of a Django-based AI quiz service and its server flow.",
            },
            tags: ["Django", "Backend", "Python"],
          },
        ],
      },
      {
        slug: "automation-skill",
        label: { ko: "Automation", en: "Automation" },
        summary: {
          ko: "크롤링, 문서 생성, 업무 자동화 흐름을 모아둔 카테고리입니다.",
          en: "An automation category for crawling, document generation, and workflow automation.",
        },
        posts: [
          {
            title: "AI 퀴즈 구조 분석",
            url: "https://juwonpark.me/DjangoProject.html",
            excerpt: {
              ko: "Django 기반 AI 퀴즈 서비스 구조와 서버 흐름을 정리한 글.",
              en: "A structural analysis of a Django-based AI quiz service and its server flow.",
            },
            tags: ["Django", "Backend", "Python"],
          },
          {
            title: "도서 PDF 크롤러 프로토타입 점검",
            url: "https://juwonpark.me/book_crewling.html",
            excerpt: {
              ko: "PDF 후보 수집, 필터링, 안전한 다운로드 흐름을 다룬 크롤러 기록.",
              en: "A crawler note focused on candidate discovery, filtering, and safe download flow.",
            },
            tags: ["Crawler", "Python", "Automation"],
          },
          {
            title: "영업보고서 작성 스킬",
            url: "https://juwonpark.me/write-inc-business-report.html",
            excerpt: {
              ko: "DOCX 템플릿과 재무 자료를 조합해 영업보고서를 만드는 자동화 흐름.",
              en: "A document workflow that combines DOCX templates and finance data to produce business reports.",
            },
            tags: ["Automation", "DOCX", "Workflow"],
          },
        ],
      },
    ],
  },
  {
    key: "languages",
    title: { ko: "LANGUAGES", en: "LANGUAGES" },
    items: [
      {
        slug: "lang-python",
        label: { ko: "Python", en: "Python" },
        summary: {
          ko: "GitHub 공개 레포 기준으로 가장 많이 반복된 언어입니다. Django, 크롤링, 자동화, 인프라 검증 글로 연결합니다.",
          en: "One of the most repeated languages across the public repos, linked to Django, crawling, automation, and infra verification posts.",
        },
        posts: [
          { title: "AI 퀴즈 구조 분석", url: "https://juwonpark.me/DjangoProject.html", excerpt: { ko: "Django 기반 서비스 구조를 정리한 글.", en: "A post on Django service structure." }, tags: ["Python", "Django", "Backend"] },
          { title: "도서 PDF 크롤러 프로토타입 점검", url: "https://juwonpark.me/book_crewling.html", excerpt: { ko: "Python 기반 크롤링 자동화 기록.", en: "A Python-based crawling automation note." }, tags: ["Python", "Crawler", "Automation"] },
          { title: "영업보고서 작성 스킬", url: "https://juwonpark.me/write-inc-business-report.html", excerpt: { ko: "문서 자동화 흐름을 정리한 글.", en: "A document automation workflow post." }, tags: ["Python", "Automation", "Workflow"] },
        ],
      },
      {
        slug: "lang-typescript",
        label: { ko: "TypeScript", en: "TypeScript" },
        summary: {
          ko: "cardnews_auto, agent-scripts, ai_ppt 기준으로 확인된 언어입니다. 자동화와 툴링 글로 연결합니다.",
          en: "Confirmed from cardnews_auto, agent-scripts, and ai_ppt. Linked to automation and tooling posts.",
        },
        posts: [
          { title: "pptauto1", url: "https://juwonpark.me/pptauto1.html", excerpt: { ko: "자동화 흐름 초반 설계 기록.", en: "An early automation design note." }, tags: ["TypeScript", "Automation", "Tooling"] },
          { title: "pptauto2", url: "https://juwonpark.me/pptauto2.html", excerpt: { ko: "자동화 파이프라인을 다듬은 기록.", en: "A follow-up post refining the automation pipeline." }, tags: ["TypeScript", "Workflow", "Automation"] },
          { title: "Lightsail 배포 경로", url: "https://juwonpark.me/pptauto3.html", excerpt: { ko: "서비스 배포 경로와 자동화 적용 기록.", en: "A post on service deployment path and automation usage." }, tags: ["TypeScript", "Deploy", "Automation"] },
          { title: "Text Manipulation", url: "https://juwonpark.me/Text_Manipulation.html", excerpt: { ko: "텍스트 처리 자동화 실험 기록.", en: "A note on text manipulation automation." }, tags: ["TypeScript", "CLI", "Automation"] },
        ],
      },
      {
        slug: "lang-javascript",
        label: { ko: "JavaScript", en: "JavaScript" },
        summary: {
          ko: "블로그, 프론트엔드, 자동화 레포에서 확인된 언어입니다.",
          en: "A language confirmed across blog, frontend, and automation repositories.",
        },
        posts: [
          { title: "Jekyll 자동배포", url: "https://juwonpark.me/firstblogpost.html", excerpt: { ko: "블로그와 프론트엔드 배포 흐름 기록.", en: "A note on blog and frontend deployment flow." }, tags: ["JavaScript", "Frontend", "Deploy"] },
          { title: "AI 퀴즈 구조 분석", url: "https://juwonpark.me/DjangoProject.html", excerpt: { ko: "프론트와 백엔드 흐름을 함께 본 구조 분석.", en: "A structural analysis covering both frontend and backend flow." }, tags: ["JavaScript", "Frontend", "Backend"] },
          { title: "Text Manipulation", url: "https://juwonpark.me/Text_Manipulation.html", excerpt: { ko: "JS/TS 기반 텍스트 처리 흐름과 연관된 기록.", en: "A note related to JS/TS text processing workflow." }, tags: ["JavaScript", "Automation", "Tooling"] },
        ],
      },
      {
        slug: "lang-ruby",
        label: { ko: "Ruby", en: "Ruby" },
        summary: {
          ko: "juwon_blog의 Jekyll 기반에서 확인된 언어입니다.",
          en: "A language confirmed from the Jekyll-based juwon_blog repository.",
        },
        posts: [
          { title: "Jekyll 자동배포", url: "https://juwonpark.me/firstblogpost.html", excerpt: { ko: "Jekyll 빌드와 배포 흐름을 정리한 글.", en: "A post on Jekyll build and deployment flow." }, tags: ["Ruby", "Jekyll", "Deploy"] },
        ],
      },
      {
        slug: "lang-shell",
        label: { ko: "Shell", en: "Shell" },
        summary: {
          ko: "여러 공개 레포에서 반복적으로 사용된 운영 스크립트 언어입니다.",
          en: "An operational scripting language used repeatedly across multiple public repositories.",
        },
        posts: [
          { title: "Terraform 1", url: "https://juwonpark.me/Terraform_1.html", excerpt: { ko: "build, test, apply, verify 흐름과 스크립트 운용 기록.", en: "A note on build, test, apply, and verify flow with script-driven operations." }, tags: ["Shell", "Terraform", "Ops"] },
          { title: "Django 프로젝트를 Docker로 Debian에 옮기기", url: "https://juwonpark.me/Docker1.html", excerpt: { ko: "이미지 저장, 전송, 실행까지 CLI 중심 이관 기록.", en: "A CLI-centered migration note from image export to server run." }, tags: ["Shell", "Docker", "CLI"] },
          { title: "네트워크 점검 도구", url: "https://juwonpark.me/NetworkingTools.html", excerpt: { ko: "운영 중 쓰는 명령형 네트워크 점검 글.", en: "A post on command-line network diagnostics for operations." }, tags: ["Shell", "CLI", "Networking"] },
        ],
      },
      {
        slug: "lang-hcl",
        label: { ko: "HCL", en: "HCL" },
        summary: {
          ko: "terratform 저장소에서 확인된 Terraform 구성 언어입니다.",
          en: "A Terraform configuration language confirmed from the terratform repository.",
        },
        posts: [
          { title: "Terraform 1", url: "https://juwonpark.me/Terraform_1.html", excerpt: { ko: "Terraform module과 backend 구성을 직접 다룬 기록.", en: "A post directly covering Terraform modules and backend configuration." }, tags: ["HCL", "Terraform", "IaC"] },
        ],
      },
      {
        slug: "lang-dockerfile",
        label: { ko: "Dockerfile", en: "Dockerfile" },
        summary: {
          ko: "ai_ppt, quiz_ai_testpro 기준으로 확인된 컨테이너 빌드 언어입니다.",
          en: "A container build language confirmed from ai_ppt and quiz_ai_testpro.",
        },
        posts: [
          { title: "Django 프로젝트를 Docker로 Debian에 옮기기", url: "https://juwonpark.me/Docker1.html", excerpt: { ko: "Dockerfile 작성과 이미지 빌드 과정을 담은 글.", en: "A post covering Dockerfile authoring and image build flow." }, tags: ["Dockerfile", "Docker", "Build"] },
          { title: "Prometheus + Grafana + Alertmanager", url: "https://juwonpark.me/prometheus.html", excerpt: { ko: "Compose 기반 컨테이너 운영 관제 실습 기록.", en: "A container-based monitoring lab using Docker Compose." }, tags: ["Dockerfile", "Compose", "Monitoring"] },
        ],
      },
      {
        slug: "lang-swift",
        label: { ko: "PDF Rendering", en: "PDF Rendering" },
        summary: {
          ko: "cardnews_auto 저장소에서 확인된 언어입니다. 자동화 파이프라인과 함께 보이도록 연결했습니다.",
          en: "A language confirmed from the cardnews_auto repository, linked alongside the automation pipeline posts.",
        },
        posts: [
          { title: "pptauto1", url: "https://juwonpark.me/pptauto1.html", excerpt: { ko: "카드뉴스 자동화 초기 설계 기록.", en: "An early cardnews automation design note." }, tags: ["Swift", "Automation", "Cardnews"] },
          { title: "pptauto2", url: "https://juwonpark.me/pptauto2.html", excerpt: { ko: "자동화 파이프라인을 다듬은 후속 기록.", en: "A follow-up post refining the automation pipeline." }, tags: ["Swift", "Workflow", "Automation"] },
        ],
      },
    ],
  },
];

const createProjectCard = (project, lang) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "project-card";
  card.dataset.slug = project.slug;
  card.setAttribute("aria-pressed", project.slug === activeProjectSlug ? "true" : "false");

  if (project.slug === activeProjectSlug) {
    card.classList.add("is-active");
  }

  card.innerHTML = `
    <span class="project-card-type">${project.type[lang]}</span>
    <h3 class="project-card-title">${project.title}</h3>
    <p class="project-card-period">${project.period}</p>
  `;

  card.addEventListener("click", () => {
    activeProjectSlug = project.slug;
    renderProjects(currentLanguage);
  });

  return card;
};

const renderProjectSpotlight = (project, lang) => {
  const bundle = translations[lang] || translations.ko;

  projectSpotlight.innerHTML = `
    <div class="project-spotlight-head">
      <div>
        <span class="project-spotlight-type">${project.type[lang]}</span>
        <h3 class="project-spotlight-title">${project.title}</h3>
        <p class="project-spotlight-subtitle">${project.subtitle[lang]}</p>
      </div>
      <p class="project-spotlight-period">${project.period}</p>
    </div>
    <p class="project-spotlight-summary">${project.summary[lang]}</p>
    <div class="project-tag-row">
      ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
    </div>
    <div class="project-meta">
      <div class="project-meta-block">
        <h4>${bundle.project_detail_label}</h4>
        <ul>
          ${project.highlights[lang].map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
      <div class="project-meta-block">
        <h4>${bundle.project_stack_label}</h4>
        <p>${project.tags.join(", ")}</p>
      </div>
    </div>
    <a class="project-spotlight-cta" href="${project.repoUrl}" target="_blank" rel="noreferrer">${bundle.project_cta}</a>
  `;
};

const renderProjectFilters = (lang) => {
  if (!projectFilters) {
    return;
  }

  projectFilters.innerHTML = "";

  projectFilterCatalog.forEach((filter) => {
    const count =
      filter.key === "all"
        ? projectCatalog.length
        : projectCatalog.filter((project) => project.filter === filter.key).length;

    if (count === 0) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-filter";
    button.textContent = `${filter.label[lang]} (${count})`;
    button.setAttribute("aria-pressed", filter.key === activeProjectFilter ? "true" : "false");

    if (filter.key === activeProjectFilter) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => {
      activeProjectFilter = filter.key;
      renderProjects(currentLanguage);
    });

    projectFilters.appendChild(button);
  });
};

const renderProjects = (lang) => {
  if (!projectList || !projectSpotlight) {
    return;
  }

  const visibleProjects =
    activeProjectFilter === "all"
      ? projectCatalog
      : projectCatalog.filter((project) => project.filter === activeProjectFilter);

  const activeProject =
    visibleProjects.find((project) => project.slug === activeProjectSlug) || visibleProjects[0];

  if (!activeProject) {
    return;
  }

  activeProjectSlug = activeProject.slug;

  renderProjectFilters(lang);
  projectList.innerHTML = "";
  visibleProjects.forEach((project) => {
    projectList.appendChild(createProjectCard(project, lang));
  });

  renderProjectSpotlight(activeProject, lang);
};

const getSkillEntries = () => skillsCatalog.flatMap((group) => group.items);

const renderSkillSpotlight = (skill, lang) => {
  if (!skillsSpotlight) {
    return;
  }

  const bundle = translations[lang] || translations.ko;

  skillsSpotlight.innerHTML = `
    <div class="skills-spotlight-head">
      <div>
        <h3 class="skills-spotlight-title">${skill.label[lang]}</h3>
      </div>
      <p class="skills-spotlight-count">${skill.posts.length}${bundle.skills_count_suffix}</p>
    </div>
    <div class="skills-post-list">
      ${skill.posts
        .map(
          (post) => `
            <a class="skills-post-card" href="${post.url}" target="_blank" rel="noreferrer">
              <h4>${post.title}</h4>
              <p>${post.excerpt[lang]}</p>
              <div class="skills-post-tags">
                ${post.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
            </a>
          `,
        )
        .join("")}
    </div>
  `;
};

const renderSkills = (lang) => {
  if (!skillsGroups || !skillsSpotlight) {
    return;
  }

  const skillEntries = getSkillEntries();
  const activeSkill = skillEntries.find((item) => item.slug === activeSkillSlug) || skillEntries[0];

  if (!activeSkill) {
    return;
  }

  activeSkillSlug = activeSkill.slug;
  skillsGroups.innerHTML = "";

  skillsCatalog.forEach((group) => {
    const block = document.createElement("section");
    block.className = "skills-group";

    const title = document.createElement("h3");
    title.className = "skills-group-title";
    title.textContent = group.title[lang];
    block.appendChild(title);

    const row = document.createElement("div");
    row.className = "skills-pill-row";

    group.items.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "skills-pill";
      button.textContent = `${item.label[lang]} (${item.posts.length})`;
      button.setAttribute("aria-pressed", item.slug === activeSkillSlug ? "true" : "false");

      if (item.slug === activeSkillSlug) {
        button.classList.add("is-active");
      }

      button.addEventListener("click", () => {
        activeSkillSlug = item.slug;
        renderSkills(currentLanguage);
      });

      row.appendChild(button);
    });

    block.appendChild(row);
    skillsGroups.appendChild(block);
  });

  renderSkillSpotlight(activeSkill, lang);
};

const applyLanguage = (lang) => {
  const bundle = translations[lang] || translations.ko;
  currentLanguage = lang;

  document.documentElement.lang = lang === "en" ? "en" : "ko";
  document.title = bundle.document_title;

  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", bundle.meta_description);
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (bundle[key]) {
      element.textContent = bundle[key];
    }
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const key = element.dataset.i18nContent;
    if (bundle[key]) {
      element.setAttribute("content", bundle[key]);
    }
  });

  langButtons.forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  renderProjects(lang);
  renderSkills(lang);
  window.localStorage.setItem("portfolio-lang", lang);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
  },
);

sections.forEach((section) => {
  revealObserver.observe(section);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", active);
    });
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.2, 0.4, 0.6],
  },
);

sections.forEach((section) => {
  navObserver.observe(section);
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang || "ko");
  });
});

const savedLanguage = window.localStorage.getItem("portfolio-lang") || "ko";
applyLanguage(savedLanguage);
