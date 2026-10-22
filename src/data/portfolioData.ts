import { ProjectItem, CareerItem, SkillCategory } from '../types';
import { projectImages } from '../assets/projectImages';

export const portfolioProjects: ProjectItem[] = [
  {
    id: "eduinsight-dashboard",
    title: "Eduinsight 실시간 인텔리전스 대시보드",
    organization: "aSSIST 경영대학원",
    period: "2026.03 - 2026.04",
    role: "Full Stack Developer / Data Architect",
    category: "automation",
    isHighlighted: true,
    description: "산학협력 교육 과정의 수강생 만족도, 출석률, 핵심 성과 지표(KPI)를 실시간으로 모니터링하고 분석하는 AI 기반 대시보드 시스템입니다.",
    impacts: [
      "데이터 통합 분석 시간 95% 단축 (기존 3일 -> 10분)",
      "수강생 이탈 위험군 사전 감지 및 조기 대응 체계 구축",
      "경영진 및 산학협력 파트너를 위한 자동 리포팅 기능"
    ],
    features: [
      "실시간 KPI 모니터링 (만족도, 출석률, 과제 제출률)",
      "AI 기반 인터랙티브 데이터 시각화 차트",
      "교육과정별 성과 비교 및 맞춤형 분석 리포트"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Lucide Icons"],
    outcome: "기존 수작업 엑셀 정리 체계를 완벽히 대체하여, 실시간 교육 품질 모니터링과 데이터 기반 의사결정이 가능해졌습니다.",
    imageUrl: projectImages.eduinsight1,
    imageFallbacks: ["/에듀인사이트_1.png", "/eduinsight_1.png", "/Eduinsight 캡처본.png", "/eduinsight.png"],
    images: [projectImages.eduinsight1, projectImages.eduinsight2],
    imagesFallbacks: [
      ["/에듀인사이트_1.png", "/eduinsight_1.png", "/Eduinsight 캡처본.png", "/eduinsight.png"],
      ["/에듀인사이트_2.png", "/eduinsight_2.png", "/Eduinsight 캡처본-1.png", "/eduinsight_dashboard_2026.png"]
    ],
    browserMockupTitle: "Eduinsight 실시간 인텔리전스 대시보드"
  },
  {
    id: "kotra-certificate",
    title: "KOTRA-aSSIST AI 수료증 자동 발급 시스템",
    organization: "aSSIST 경영대학원 X KOTRA",
    period: "2026.02 - 2026.03",
    role: "Automated System Engineer",
    category: "automation",
    isHighlighted: true,
    description: "KOTRA 글로벌 비즈니스 수료생을 위한 AI 기반 자동 수료증 검증 및 웹 발급 플랫폼입니다. 수강생이 웹에서 본인 인증 후 수료증을 즉시 PDF로 조회하고 다운로드할 수 있습니다.",
    impacts: [
      "수료증 발급 행정 처리 시간 99% 단축 (건당 15분 -> 3초)",
      "수작업 문서 작성 및 이메일 발신 오류율 0% 달성",
      "수료생 즉시 PDF 발급 만족도 100%"
    ],
    features: [
      "이름/연락처 기반 수료생 DB 즉시 조회 및 인증",
      "실시간 AI 수료증 캔버스 렌더링 및 고화질 PDF 다운로드",
      "QR 코드 포함 위변조 방지 검증 시스템"
    ],
    techStack: ["React", "TypeScript", "HTML5 Canvas", "jsPDF", "Tailwind CSS"],
    outcome: "수강생은 기다림 없이 즉시 서류를 발급받고, 운영진은 수작업 서류 발급 행정 작업에서 완벽히 해방되어 본연의 교육 기획 업무에 집중할 수 있게 되었습니다.",
    demoUrl: "https://kotra-assist-certificate-2026.vercel.app/",
    browserMockupTitle: "KOTRA-aSSIST AI 수료증 자동 발급 시스템",
    browserMockupSubtitle: "https://kotra-assist-certificate-2026.vercel.app/"
  },
  {
    id: "seating-chart-system",
    title: "실시간 자동 자리배치 시스템",
    organization: "aSSIST 경영대학원",
    period: "2026.01 - 2026.02",
    role: "Lead Developer",
    category: "automation",
    isHighlighted: true,
    description: "대규모 강의 및 경영자 과정의 참석자 배치, 조 편성, 좌석 조정을 알고리즘 기반으로 자동화하는 실시간 자리배치 플랫폼입니다.",
    impacts: [
      "좌석 배치 준비 시간 90% 감축 (2시간 -> 10분)",
      "소속/직급별 균등 조 편성 알고리즘 적용으로 교류 극대화",
      "출석 및 현장 변동 상황 즉시 반영 가능"
    ],
    features: [
      "드래그 앤 드롭 기반 인터랙티브 좌석 배치 인터페이스",
      "소속 기업 및 직무 다양성을 고려한 자동 조 배치 알고리즘",
      "고해상도 좌석표 인쇄 및 PDF/이미지 내보내기"
    ],
    techStack: ["React", "TypeScript", "D3.js / SVG", "Tailwind CSS"],
    outcome: "매기수 반복되던 대규모 행사 및 강의의 좌석 배치 업무를 자동화하여 운영 효율성을 획기적으로 개선했습니다.",
    imageUrl: projectImages.seatingChart,
    browserMockupTitle: "실시간 자동 자리배치 시스템"
  },
  {
    id: "champstudy-product-plan",
    title: "챔프스터디 주요 교육 상품 기획 및 이벤트 리뉴얼",
    organization: "해커스 챔프스터디",
    period: "2023.01 - 2024.02",
    role: "Product Planner / Service Marketer",
    category: "product",
    isHighlighted: true,
    description: "해커스톡의 핵심 영어 회화, 문법, 이벤트 패키지의 기획안 수립부터 신규 페이지 런칭까지 상품 전 과정을 총괄 리딩하였습니다.",
    impacts: [
      "핵심 환급반 및 이벤트 신규 런칭을 통한 신규 수강생 유입증대",
      "고객 니즈 분석 기반 UX/UI 구조 개선으로 페이지 전환율 상승",
      "기존 기획 대비 직관적인 정보 전달 및 구매 UX 최적화"
    ],
    features: [
      "기획 단계: 기존 이슈 분석, 핵심 타겟 정의, 와이어프레임 수립",
      "실행 단계: 신규 UI/UX 디자인 가이드, 프로모션 혜택 설계",
      "성과 측정: 수강 전환율, 이벤트 참여율 모니터링 및 개선"
    ],
    techStack: ["Service Planning", "UX/UI Wireframing", "Data Analysis", "Promotion Design"],
    outcome: "5대 주요 교육 패키지 및 프로모션을 성공적으로 리뉴얼 및 신규 런칭하여 타겟별 만족도와 매출 성장을 견인하였습니다.",
    champCategories: [
      {
        id: "review-event",
        name: "2024 리얼후기 이벤트",
        description: "수강생들의 실제 후기를 효과적으로 소셜 증명하고 참여율을 극대화한 후기 프로모션입니다.",
        stages: [
          {
            stage: "before",
            title: "1단계: 기존 페이지 분석 (Before)",
            description: "텍스트 중심의 단조로운 배치와 모바일 가독성 저하 문제점을 도출했습니다.",
            keyPoints: ["정보 밀도가 높아 핵심 혜택 전달 미흡", "후기 작성 유도 CTA 버튼의 시인성 부족"],
            imageUrl: projectImages.reviewEvent.before,
            imageFallbacks: ["/review_event_before.svg"]
          },
          {
            stage: "plan",
            title: "2단계: 기획안 작성 (Plan)",
            description: "작성 혜택과 시각적 후기 갤러리 배치를 명확히 규정한 와이어프레임을 기획했습니다.",
            keyPoints: ["혜택 강조 보상 구조 재설계", "카드형 후기 레이아웃 와이어프레임 규정"],
            imageUrl: projectImages.reviewEvent.plan,
            imageFallbacks: ["/review_event_plan.svg"]
          },
          {
            stage: "final",
            title: "3단계: 최종 신규 페이지 (Final)",
            description: "직관적인 카드 갤러리와 강조된 보상 안내로 참여율을 대폭 상승시킨 완성 페이지입니다.",
            keyPoints: ["모바일 최적화 반응형 후기 UI", "실시간 참여 현황 및 리워드 안내"],
            imageUrl: projectImages.reviewEvent.final,
            imageFallbacks: ["/review_event_final.svg"]
          }
        ]
      },
      {
        id: "lottery-event",
        name: "2023 꽝없는 복권 이벤트",
        description: "게이미피케이션 요소를 도입하여 신규 유저 유입과 일간 방문을 극대화한 복권 이벤트입니다.",
        stages: [
          {
            stage: "before",
            title: "1단계: 기존 페이지 분석 (Before)",
            description: "이벤트 참여 방식 안내가 복잡하여 중도 이탈률이 높은 구조였습니다.",
            keyPoints: ["복권 긁기 재미 요소 부족", "당첨 상품 시각화 미흡"],
            imageUrl: projectImages.lotteryEvent.before,
            imageFallbacks: ["/lottery_event_before.svg"]
          },
          {
            stage: "plan",
            title: "2단계: 기획안 작성 (Plan)",
            description: "100% 당첨 복권 상스펙과 인터랙티브 당첨 모달UX를 기획했습니다.",
            keyPoints: ["게이미피케이션 요소 탑재 기획", "일일 1회 무료 참여 유도 흐름 설계"],
            imageUrl: projectImages.lotteryEvent.plan,
            imageFallbacks: ["/lottery_event_plan.svg"]
          },
          {
            stage: "final",
            title: "3단계: 최종 신규 페이지 (Final)",
            description: "역동적인 복권 긁기 애니메이션과 높은 경품 시각화로 유저 반응을 끌어낸 런칭 페이지입니다.",
            keyPoints: ["실시간 당첨 팝업 및 쿠폰 즉시 지급", "공유하기 기능을 통한 바이럴 유도"],
            imageUrl: projectImages.lotteryEvent.final,
            imageFallbacks: ["/lottery_event_final.svg"]
          }
        ]
      },
      {
        id: "basic-english",
        name: "2023 기초영문법 환급패스",
        description: "동기부여 환급 시스템과 수준별 강의 구성을 결합한 해커스톡 대표 기초영어 패키지입니다.",
        stages: [
          {
            stage: "before",
            title: "1단계: 기존 페이지 분석 (Before)",
            description: "환급 조건 및 혜택 구분이 복잡하여 유저 문의가 빈번했습니다.",
            keyPoints: ["환급 로드맵 시각화 부족", "강사진 및 혜택 모듈 혼재"],
            imageUrl: projectImages.basicEnglish.before,
            imageFallbacks: ["/basic_english_before.svg"]
          },
          {
            stage: "plan",
            title: "2단계: 기획안 작성 (Plan)",
            description: "출석만 해도 100% 환급되는 명확한 혜택 플로우와 커리큘럼 탭을 기획했습니다.",
            keyPoints: ["환급 조건 3단계 픽토그램 시각화", "강의 모듈별 핵심 특징 구조화"],
            imageUrl: projectImages.basicEnglish.plan,
            imageFallbacks: ["/basic_english_plan.svg"]
          },
          {
            stage: "final",
            title: "3단계: 최종 신규 페이지 (Final)",
            description: "강렬한 비주얼과 완벽한 혜택 전달로 신규 매출 상위를 기록한 완성 페이지입니다.",
            keyPoints: ["동적 환급 카운트다운 타이머", "모바일 맞춤형 고화질 비주얼"],
            imageUrl: projectImages.basicEnglish.final,
            imageFallbacks: ["/basic_english_final.svg"]
          }
        ]
      },
      {
        id: "business-english",
        name: "2023 만능패턴 비즈니스영어",
        description: "직장인을 위한 실전 비즈니스 이메일 및 미팅 패턴 중심의 맞춤형 패키지입니다.",
        stages: [
          {
            stage: "before",
            title: "1단계: 기존 페이지 분석 (Before)",
            description: "일반 영어 회화와의 차별점이 드러나지 않고 대상층 소구가 약했습니다.",
            keyPoints: ["직장인 타겟 페르소나 미반영", "실무 활용 커리큘럼 소구 미흡"],
            imageUrl: projectImages.businessEnglish.before,
            imageFallbacks: ["/business_english_before.svg"]
          },
          {
            stage: "plan",
            title: "2단계: 기획안 작성 (Plan)",
            description: "업무 상황별(이메일, 프레젠테이션, 회의) 패턴 학습 가치를 구조화한 기획안입니다.",
            keyPoints: ["상황별 비즈니스 템플릿 제공 소구", "신뢰감을 주는 신사적 비주얼 톤앤매너"],
            imageUrl: projectImages.businessEnglish.plan,
            imageFallbacks: ["/business_english_plan.svg"]
          },
          {
            stage: "final",
            title: "3단계: 최종 신규 페이지 (Final)",
            description: "전문적인 톤앤매너와 실무 혜택 구성으로 직장인 수강생 만족도 높은 페이지입니다.",
            keyPoints: ["핵심 패턴 시연 영상 탑재", "비즈니스 자료집 PDF 무료 증정 패키징"],
            imageUrl: projectImages.businessEnglish.final,
            imageFallbacks: ["/business_english_final.svg"]
          }
        ]
      },
      {
        id: "english-grammar",
        name: "2023 말문이 트이는 영문법",
        description: "어려운 문법 용어 없이 바로 말로 연결되는 회화 중심 영문법 패키지입니다.",
        stages: [
          {
            stage: "before",
            title: "1단계: 기존 페이지 분석 (Before)",
            description: "전통적인 암기식 문법 스타일의 이미지로 지루한 인상을 주는 문제가 있었습니다.",
            keyPoints: ["학습 부담감을 주는 문구 배치", "실제 회화 적용점 미비"],
            imageUrl: projectImages.englishGrammar.before,
            imageFallbacks: ["/english_grammar_before.svg"]
          },
          {
            stage: "plan",
            title: "2단계: 기획안 작성 (Plan)",
            description: "문법=말하기라는 신개념 학습법을 쉽고 친근하게 설명하는 기획안을 도출했습니다.",
            keyPoints: ["쉬운 가독성의 카드뉴스형 기획", "강의 프리뷰 인터랙티브 UI"],
            imageUrl: projectImages.englishGrammar.plan,
            imageFallbacks: ["/english_grammar_plan.svg"]
          },
          {
            stage: "final",
            title: "3단계: 최종 신규 페이지 (Final)",
            description: "친근한 일러스트와 명확한 학습 효과 제시로 기초 입문자 유입을 견인한 완성 페이지입니다.",
            keyPoints: ["입문자 눈높이에 맞춘 가독성", "체험판 수강 신청 플로팅 CTA"],
            imageUrl: projectImages.englishGrammar.final,
            imageFallbacks: ["/english_grammar_final.svg"]
          }
        ]
      }
    ]
  },
  {
    id: "assist-newsletter",
    title: "aSSIST HRD 뉴스레터 브랜드 콘텐츠 기획",
    organization: "aSSIST 경영대학원",
    period: "2026.03 - Present",
    role: "Brand Content Strategist",
    category: "brand",
    isHighlighted: false,
    description: "기업 HRD 담당자 및 경영진을 대상으로 최신 글로벌 교육 트렌드와 경영 인사이트를 제공하는 고품격 뉴스레터 브랜딩 및 콘텐츠 기획입니다.",
    impacts: [
      "뉴스레터 오픈율(OR) 및 B2B 산학협력 문의 수 대폭 증가",
      "브랜드 전문성 강화 및 교육과정 연계 마케팅 효과 창출",
      "구독자층을 위한 모바일 최적화 이메일 레이아웃 수립"
    ],
    features: [
      "월간 트렌드 아티클 및 리더십 인사이트 스페셜 세션",
      "경영 아카데미 추천 도서 및 산학협력 현장 스토리",
      "모바일 반응형 이메일 템플릿 디자인 및 인터랙티브 링크"
    ],
    techStack: ["Content Marketing", "Copywriting", "HTML Email Design", "Analytics"],
    outcome: "뉴스레터를 통한 B2B 고객 접점 확대 및 aSSIST 교육 브랜드의 신뢰도 제고에 크게 기여했습니다.",
    imageUrl: projectImages.assistNewsletter,
    imageFallbacks: ["/뉴스레터_1.png", "/newsletter_1.png", "/aSSIST 뉴스레터 캡처본.png", "/assist_newsletter.png"],
    browserMockupTitle: "aSSIST HRD 뉴스레터 브랜드 콘텐츠"
  }
];

export const careerHistory: CareerItem[] = [
  {
    company: "aSSIST 경영대학원 (서울과학종합대학원)",
    role: "산학협력본부 L&D 기업교육팀",
    period: "2025.05 - 재직 중",
    description: "기업교육 및 오픈과정 기획 운영, 자동화 프로그램 개발, 대시보드 및 수료증 자동발급 플랫폼 구축 등 DT 혁신 총괄",
    achievements: [
      "Eduinsight 실시간 인텔리전스 대시보드 구축으로 데이터 통합 분석 시간 95% 단축",
      "KOTRA-aSSIST AI 수료증 자동 발급 시스템 개발로 서류 발급 행정 처리 시간 99% 감축",
      "실시간 자동 자리배치 시스템 개발로 행사 준비 효율성 90% 증대",
      "aSSIST HRD 뉴스레터 발행 및 브랜드 콘텐츠 기획"
    ],
    skills: []
  },
  {
    company: "해커스 챔프스터디",
    role: "해커스톡 상품 기획 & 서비스 마케터",
    period: "2023.07 - 2024.01",
    description: "해커스톡 핵심 영어회화/문법 교육 상품 기획, 프로모션 기획, 신규 프로모션 페이지 런칭 및 퍼포먼스 관리",
    achievements: [
      "2024 리얼후기 이벤트, 2023 꽝없는 복권 이벤트 등 프로모션 기획 및 UX/UI 개선",
      "2023 기초영문법 환급패스, 만능패턴 비즈니스영어, 말문이 트이는 영문법 신규 상품 기획 및 런칭",
      "고객 가치 기반 메시지 도출 및 프로모션 전환율 개선"
    ],
    skills: []
  },
  {
    company: "메이크스타 (MAKESTAR)",
    role: "글로벌 서비스 기획 & 마케팅 / PM",
    period: "2022.10 - 2023.02",
    description: "글로벌 K-POP 엔터테인먼트 및 Fandom Commerce 플랫폼 메이크스타의 글로벌 프로젝트 기획, 유저 프로모션 및 서비스 UX 최적화 담당",
    achievements: [
      "글로벌 K-POP 아티스트 콜라보 이벤트 및 팬덤 기획 프로모션 총괄 운영",
      "이벤트 결제 및 주문 프로세스 UX/UI 개선을 통한 전환율 증대",
      "글로벌 팬덤 타겟 소셜 마케팅 콘텐츠 기획 및 B2C/B2B 협력 파트너십 구축"
    ],
    skills: []
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Planning & Strategy (기획 및 전략)",
    items: [
      { name: "Service & Product Planning", level: "Expert", description: "고객 분석, 와이어프레임 설계, 상품 라인업 기획" },
      { name: "UX/UI Flow Design", level: "Advanced", description: "사용자 여정 지도, 모바일/웹 가독성 최적화, Conversion UX" },
      { name: "Data-driven Marketing", level: "Advanced", description: "성과 지표(KPI) 설정, A/B 테스트, 전환율 개선 전략" }
    ]
  },
  {
    category: "Development & Automation (개발 및 자동화)",
    items: [
      { name: "React & TypeScript", level: "Advanced", description: "모던 웹 프론트엔드 개발, 타입 안정성 확보, 모듈화" },
      { name: "Tailwind CSS & Modern UI", level: "Expert", description: "반응형 웹 UI, 시각적 계층 구조, 대시보드 디자인" },
      { name: "Workflow & Data Automation", level: "Advanced", description: "업무 자동화 스크립트, PDF 자동 생성, 알고리즘 구현" }
    ]
  }
];
