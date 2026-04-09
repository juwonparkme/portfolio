const sections = Array.from(document.querySelectorAll(".section"));
const navLinks = Array.from(document.querySelectorAll(".sidebar-nav a"));
const langButtons = Array.from(document.querySelectorAll(".lang-toggle button"));
const descriptionMeta = document.querySelector('meta[name="description"]');

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
    experience_service_role: "Service / Operations Background",
    experience_service_org: "서울 · 고객 응대 / 현장 운영",
    experience_service_period: "2020.09 - 2025.11",
    experience_service_summary:
      "고객 응대, 현장 운영, 설문 조사, 문서 정리 경험을 바탕으로 실제 사용자 상황과 운영 맥락을 이해하는 데 강점이 있습니다.",
    experience_service_block_title: "이전 경험",
    experience_education_role: "Education / Training",
    experience_education_org: "광운대학교 · Bosei Sports College · Python 강사 과정",
    experience_education_period: "학력 / 교육",
    experience_education_summary:
      "컴퓨터공학 기반 학업과 실무형 교육 과정을 통해 Python, Django, HTML, JavaScript, 데이터베이스 기초를 체계적으로 학습했습니다.",
    experience_education_block_title: "학력 / 교육",
    earlier_experience_eyebrow: "Earlier Experience",
    earlier_experience_title: "이전 경험",
    education_eyebrow: "Education",
    education_title: "학력 / 교육",
    section_eyebrow_projects: "Projects",
    section_title_projects: "GitHub 공개 저장소 기준",
    section_eyebrow_skills: "Skills",
    section_title_skills: "GitHub + 블로그 글 기준 스킬",
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
    experience_service_role: "Service / Operations Background",
    experience_service_org: "Seoul · Customer-facing / On-site operations",
    experience_service_period: "2020.09 - 2025.11",
    experience_service_summary:
      "This background gave me strong context for real user situations, on-site operations, and documentation discipline before moving fully into engineering work.",
    experience_service_block_title: "Earlier Experience",
    experience_education_role: "Education / Training",
    experience_education_org: "Kwangwoon University · Bosei Sports College · Python Instructor Course",
    experience_education_period: "Education / Training",
    experience_education_summary:
      "I studied computer engineering and completed practical training covering Python, Django, HTML, JavaScript, and database fundamentals.",
    experience_education_block_title: "Education / Training",
    earlier_experience_eyebrow: "Earlier Experience",
    earlier_experience_title: "Earlier Experience",
    education_eyebrow: "Education",
    education_title: "Education",
    section_eyebrow_projects: "Projects",
    section_title_projects: "Based on Public GitHub Repositories",
    section_eyebrow_skills: "Skills",
    section_title_skills: "Skills Based on GitHub + Blog Posts",
    section_eyebrow_contact: "Contact",
    section_title_contact: "Contact",
  },
};

const applyLanguage = (lang) => {
  const bundle = translations[lang] || translations.ko;

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
