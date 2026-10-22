const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');
const path = require('path');

async function buildPortfolioPdf() {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);

  const fontBytes = fs.readFileSync('/tmp/NanumGothic.ttf');
  const boldBytes = fs.readFileSync('/tmp/NanumGothic-Bold.ttf');
  const customFont = await doc.embedFont(fontBytes);
  const boldFont = await doc.embedFont(boldBytes);

  const cSlate950 = rgb(2/255, 6/255, 23/255);
  const cSlate900 = rgb(15/255, 23/255, 42/255);
  const cSlate800 = rgb(30/255, 41/255, 59/255);
  const cSlate700 = rgb(51/255, 65/255, 85/255);
  const cSlate500 = rgb(100/255, 116/255, 139/255);
  const cSlate200 = rgb(226/255, 232/255, 240/255);
  const cSlate100 = rgb(241/255, 245/255, 249/255);
  const cSlate50 = rgb(248/255, 250/255, 252/255);
  const cIndigo600 = rgb(79/255, 70/255, 229/255);
  const cIndigo50 = rgb(238/255, 242/255, 255/255);
  const cEmerald600 = rgb(5/255, 150/255, 105/255);
  const cEmerald50 = rgb(236/255, 253/255, 245/255);
  const cWhite = rgb(1, 1, 1);

  // Helper for drawing headers
  function drawPageHeader(page, title, subtitle, pageNum) {
    page.drawRectangle({
      x: 0,
      y: 780,
      width: 595.28,
      height: 61.89,
      color: cSlate900,
    });
    page.drawText(title, {
      x: 35,
      y: 814,
      size: 15,
      font: boldFont,
      color: cWhite,
    });
    page.drawText(subtitle, {
      x: 35,
      y: 795,
      size: 9,
      font: customFont,
      color: cSlate200,
    });
    page.drawText(`Page ${pageNum} / 4`, {
      x: 520,
      y: 805,
      size: 9,
      font: customFont,
      color: cSlate500,
    });

    // Page footer
    page.drawRectangle({
      x: 35,
      y: 35,
      width: 525.28,
      height: 1,
      color: cSlate200,
    });
    page.drawText('신혜진 포트폴리오 (Shin Hyejin) | 2026 DT Innovation & Product Planning', {
      x: 35,
      y: 20,
      size: 8,
      font: customFont,
      color: cSlate500,
    });
    page.drawText('aSSIST 경영대학원 기업교육팀', {
      x: 440,
      y: 20,
      size: 8,
      font: customFont,
      color: cSlate500,
    });
  }

  // ==========================================
  // PAGE 1: Profile & Summary Overview
  // ==========================================
  const page1 = doc.addPage([595.28, 841.89]);
  
  // Hero Banner
  page1.drawRectangle({
    x: 0,
    y: 690,
    width: 595.28,
    height: 151.89,
    color: cSlate950,
  });

  page1.drawText('신혜진 | SHIN HYEJIN', {
    x: 35,
    y: 795,
    size: 26,
    font: boldFont,
    color: cWhite,
  });

  page1.drawText('데이터 기반 비즈니스 문제 해결 및 AI 솔루션 기획자', {
    x: 35,
    y: 765,
    size: 13,
    font: boldFont,
    color: cIndigo50,
  });

  page1.drawText('DT Innovation / Product Planner / Service Marketer', {
    x: 35,
    y: 745,
    size: 10,
    font: customFont,
    color: cSlate200,
  });

  page1.drawText('이메일: hjshin@assist.ac.kr  |  소속: aSSIST 경영대학원 산학협력본부 L&D 기업교육팀', {
    x: 35,
    y: 712,
    size: 9,
    font: customFont,
    color: cSlate200,
  });

  // Section 1: Executive Summary Card
  page1.drawRectangle({
    x: 35,
    y: 565,
    width: 525.28,
    height: 110,
    color: cSlate50,
    borderColor: cSlate200,
    borderWidth: 1,
  });

  page1.drawText('EXECUTIVE SUMMARY', {
    x: 48,
    y: 650,
    size: 9,
    font: boldFont,
    color: cIndigo600,
  });

  page1.drawText('기획에서 끝나지 않고 현장 문제를 직접 AI 솔루션 및 신규 상품으로 구현하는 PM', {
    x: 48,
    y: 633,
    size: 12,
    font: boldFont,
    color: cSlate900,
  });

  const p1Intro1 = '• aSSIST 경영대학원 기업교육팀에서 AI 대시보드(Eduinsight), KOTRA 수료증 자동화, 자리배치 시스템을';
  const p1Intro2 = '  직접 기획/개발하여 행정 및 분석 리드타임을 최대 99% 단축시켰습니다.';
  const p1Intro3 = '• 해커스 챔프스터디에서 해커스톡 5대 대표 상품 및 프로모션 기획/런칭을 총괄하며 신규 유입을 견인했습니다.';
  const p1Intro4 = '• 메이크스타 글로벌 PM으로서 글로벌 팬덤 커머스 및 유저 인터랙션 프로모션을 성공적으로 이끌었습니다.';

  page1.drawText(p1Intro1, { x: 48, y: 615, size: 8.5, font: customFont, color: cSlate700 });
  page1.drawText(p1Intro2, { x: 48, y: 602, size: 8.5, font: customFont, color: cSlate700 });
  page1.drawText(p1Intro3, { x: 48, y: 589, size: 8.5, font: customFont, color: cSlate700 });
  page1.drawText(p1Intro4, { x: 48, y: 576, size: 8.5, font: customFont, color: cSlate700 });

  // Section 2: Career Experience
  page1.drawText('CAREER EXPERIENCE', {
    x: 35,
    y: 535,
    size: 13,
    font: boldFont,
    color: cSlate900,
  });

  let curY = 515;

  // Career 1
  page1.drawRectangle({ x: 35, y: curY - 70, width: 525.28, height: 75, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page1.drawText('1. aSSIST 경영대학원 (서울과학종합대학원) | 산학협력본부 L&D 기업교육팀', { x: 45, y: curY - 14, size: 10, font: boldFont, color: cIndigo600 });
  page1.drawText('2025.05 - 재직 중  |  DT 혁신, AI 프로그램 개발 및 기업교육 운영 총괄', { x: 45, y: curY - 28, size: 8, font: customFont, color: cSlate500 });
  page1.drawText('• Eduinsight 실시간 인텔리전스 대시보드 구축 (데이터 통합 분석 시간 95% 단축)', { x: 45, y: curY - 42, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• KOTRA-aSSIST AI 수료증 자동 발급 플랫폼 개발 (행정 발급 처리 시간 99% 감축, 2초 즉시 발급)', { x: 45, y: curY - 54, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• 실시간 자동 자리배치 시스템 구축 및 aSSIST HRD 뉴스레터 브랜드 콘텐츠 발행 총괄', { x: 45, y: curY - 66, size: 8, font: customFont, color: cSlate700 });

  curY -= 85;

  // Career 2
  page1.drawRectangle({ x: 35, y: curY - 70, width: 525.28, height: 75, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page1.drawText('2. 해커스 챔프스터디 | 해커스톡 상품 기획 & 서비스 마케터', { x: 45, y: curY - 14, size: 10, font: boldFont, color: cIndigo600 });
  page1.drawText('2023.07 - 2024.01  |  핵심 영어회화/문법 교육 상품 기획 및 신규 프로모션 페이지 런칭', { x: 45, y: curY - 28, size: 8, font: customFont, color: cSlate500 });
  page1.drawText('• 2024 리얼후기 이벤트, 2023 꽝없는 복권 이벤트 프로모션 기획 및 UX/UI 개선', { x: 45, y: curY - 42, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• 2023 기초영문법 환급패스, 만능패턴 비즈니스영어, 말문이 트이는 영문법 신규 기획 런칭', { x: 45, y: curY - 54, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• 고객 가치 중심 와이어프레임 설계 및 런칭 페이지 전환율(CVR) 극대화 달성', { x: 45, y: curY - 66, size: 8, font: customFont, color: cSlate700 });

  curY -= 85;

  // Career 3
  page1.drawRectangle({ x: 35, y: curY - 65, width: 525.28, height: 70, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page1.drawText('3. 메이크스타 (MAKESTAR) | 글로벌 서비스 기획 & 마케팅 / PM', { x: 45, y: curY - 14, size: 10, font: boldFont, color: cIndigo600 });
  page1.drawText('2022.10 - 2023.02  |  글로벌 K-POP 플랫폼 프로젝트 기획, 프로모션 및 서비스 UX 최적화', { x: 45, y: curY - 28, size: 8, font: customFont, color: cSlate500 });
  page1.drawText('• 글로벌 K-POP 팬덤 대상 프로젝트 기획 및 유저 참여형 프로모션 운영', { x: 45, y: curY - 42, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• 다국어 사용자 경험 분석 기반의 커머스 구매 전환 동선 및 랜딩 페이지 최적화', { x: 45, y: curY - 54, size: 8, font: customFont, color: cSlate700 });

  // Core Competencies Footer on Page 1
  page1.drawRectangle({ x: 35, y: 55, width: 525.28, height: 115, color: cSlate100 });
  page1.drawText('CORE COMPETENCIES & TOOLKIT', { x: 48, y: 153, size: 9, font: boldFont, color: cSlate800 });
  page1.drawText('• DT & AI Solution: Python, LangChain, OpenAI/Gemini API, Automated Reporting, Web Dashboard', { x: 48, y: 136, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• Product Planning: Wireframing, UX/UI Flowchart, Data-driven CVR Optimization, User Persona', { x: 48, y: 121, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• Frontend & Dev: React, TypeScript, Tailwind CSS, Express, REST APIs, Git, Figma', { x: 48, y: 106, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• Operations & Brand: Corporate Education (L&D), HRD Newsletter, B2B Partnership, Performance Marketing', { x: 48, y: 91, size: 8, font: customFont, color: cSlate700 });
  page1.drawText('• Key Strengths: 기획-개발-운영 전 사이클을 아우르는 실행력, 현업 병목을 정량적으로 해결하는 문제 정의력', { x: 48, y: 76, size: 8, font: boldFont, color: cIndigo600 });


  // ==========================================
  // PAGE 2: aSSIST DT Innovation & Automation Projects
  // ==========================================
  const page2 = doc.addPage([595.28, 841.89]);
  drawPageHeader(page2, 'aSSIST 경영대학원 AI 업무 자동화 및 DT 솔루션 개발', '산학협력본부 L&D 기업교육팀 혁신 프로젝트', 2);

  // Project 1: Eduinsight
  let y = 735;
  page2.drawRectangle({ x: 35, y: y - 100, width: 525.28, height: 110, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page2.drawText('01. Eduinsight 실시간 인텔리전스 대시보드', { x: 45, y: y - 16, size: 12, font: boldFont, color: cSlate900 });
  page2.drawText('aSSIST 경영대학원 | 2025.05 - Present | Lead Developer & Product Designer', { x: 45, y: y - 30, size: 8.5, font: customFont, color: cIndigo600 });
  page2.drawText('• 배경 및 문제: 분산된 교육 데이터(수강생 피드백, 교육 과정 현황)로 인해 보고서 작성 및 분석에 3~4일 소요', { x: 45, y: y - 46, size: 8, font: customFont, color: cSlate700 });
  page2.drawText('• 해결책: 실시간 데이터 파이프라인 및 인터랙티브 시각화 대시보드를 직접 설계하여 올인원 인텔리전스 플랫폼 구축', { x: 45, y: y - 59, size: 8, font: customFont, color: cSlate700 });
  page2.drawText('• 핵심 성과: 데이터 통합 분석 리드타임 95% 단축, 실시간 의사결정 체계 확립, B2B 경영진 보고 품질 대폭 향상', { x: 45, y: y - 72, size: 8, font: boldFont, color: cEmerald600 });
  page2.drawText('• 기술 스택: React, TypeScript, Chart.js / Recharts, Tailwind CSS, RESTful API', { x: 45, y: y - 85, size: 7.5, font: customFont, color: cSlate500 });

  // Project 2: KOTRA-aSSIST AI 수료증
  y -= 125;
  page2.drawRectangle({ x: 35, y: y - 100, width: 525.28, height: 110, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page2.drawText('02. KOTRA-aSSIST AI 수료증 자동 발급 시스템', { x: 45, y: y - 16, size: 12, font: boldFont, color: cSlate900 });
  page2.drawText('aSSIST 경영대학원 - KOTRA 공동과정 | 2026.01 - 2026.02 | Sole Developer & UX Designer', { x: 45, y: y - 30, size: 8.5, font: customFont, color: cIndigo600 });
  page2.drawText('• 배경 및 문제: 수백 명의 교육생 수료증을 수작업으로 편집/검증/인쇄하여 1건당 15분 이상 소요되는 행정 낭비 발생', { x: 45, y: y - 46, size: 8, font: customFont, color: cSlate700 });
  page2.drawText('• 해결책: 수료 명단 일괄 파싱, 디지털 서명/직인 렌더링, 고해상도 PDF 즉시 생성 및 다운로드 자동화 웹 구축', { x: 45, y: y - 59, size: 8, font: customFont, color: cSlate700 });
  page2.drawText('• 핵심 성과: 서류 발급 행정 처리 시간 99% 감축 (15분 -> 2초 즉각 다운로드), 휴먼 에러 0건 달성', { x: 45, y: y - 72, size: 8, font: boldFont, color: cEmerald600 });
  page2.drawText('• 기술 스택: Next.js / React, Canvas API, PDF Engine, Tailwind CSS', { x: 45, y: y - 85, size: 7.5, font: customFont, color: cSlate500 });

  // Project 3: 실시간 자동 자리배치 시스템
  y -= 125;
  page2.drawRectangle({ x: 35, y: y - 100, width: 525.28, height: 110, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page2.drawText('03. 실시간 자동 자리배치 시스템', { x: 45, y: y - 16, size: 12, font: boldFont, color: cSlate900 });
  page2.drawText('aSSIST 경영대학원 | 2025.08 - 2025.10 | Product Developer', { x: 45, y: y - 30, size: 8.5, font: customFont, color: cIndigo600 });
  page2.drawText('• 배경 및 문제: 대규모 교육 및 기업 워크숍 시 소속/직급 분배와 좌석 배치표 제작에 매 기수 2시간 이상 반복 소요', { x: 45, y: y - 46, size: 8, font: customFont, color: cSlate700 });
  page2.drawText('• 해결책: 직무/소속 다양성 균등 조 편성 알고리즘 적용 및 실시간 드래그 앤 드롭 좌석 인터페이스 개발', { x: 45, y: y - 59, size: 8, font: customFont, color: cSlate700 });
  page2.drawText('• 핵심 성과: 행사 준비 시간 90% 감축 (2시간 -> 10분), 출석 변동 즉시 반영 및 A4/A3 고화질 좌석표 인쇄 지원', { x: 45, y: y - 72, size: 8, font: boldFont, color: cEmerald600 });
  page2.drawText('• 기술 스택: React, TypeScript, D3.js / SVG Interactive Engine, Tailwind CSS', { x: 45, y: y - 85, size: 7.5, font: customFont, color: cSlate500 });

  // Project 4: HRD 뉴스레터 브랜드 콘텐츠
  y -= 125;
  page2.drawRectangle({ x: 35, y: y - 90, width: 525.28, height: 95, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page2.drawText('04. aSSIST HRD 뉴스레터 브랜드 콘텐츠 기획', { x: 45, y: y - 16, size: 12, font: boldFont, color: cSlate900 });
  page2.drawText('aSSIST 경영대학원 | 2026.03 - Present | Brand Content Strategist', { x: 45, y: y - 30, size: 8.5, font: customFont, color: cIndigo600 });
  page2.drawText('• 내용: 기업 HRD 담당자 및 경영진 대상 글로벌 교육 트렌드, 경영 인사이트, 산학협력 프로그램 브랜딩 콘텐츠 발행', { x: 45, y: y - 46, size: 8, font: customFont, color: cSlate700 });
  page2.drawText('• 성과: 모바일 반응형 이메일 템플릿 도입, 뉴스레터 오픈율 상승 및 B2B 교육과정 산학협력 문의 접점 확대', { x: 45, y: y - 59, size: 8, font: boldFont, color: cEmerald600 });
  page2.drawText('• 역량: Content Marketing, Copywriting, HTML Email Design, Reader Behavior Analytics', { x: 45, y: y - 72, size: 7.5, font: customFont, color: cSlate500 });


  // ==========================================
  // PAGE 3: Hackers Champstudy 5 Major Products
  // ==========================================
  const page3 = doc.addPage([595.28, 841.89]);
  drawPageHeader(page3, '해커스 챔프스터디 5대 교육 상품 기획 및 프로모션 리뉴얼', '기획안 수립부터 최종 런칭 페이지까지 3단계 비교 분석', 3);

  let py = 740;

  // Module 1: Review Event
  page3.drawRectangle({ x: 35, y: py - 70, width: 525.28, height: 75, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page3.drawText('1. 2024 리얼후기 이벤트 (해커스톡 프로모션 리뉴얼)', { x: 45, y: py - 14, size: 10.5, font: boldFont, color: cSlate900 });
  page3.drawText('• Before(기존 문제): 텍스트 위주의 지루한 구성, 모바일 시인성 저하, 후기 작성 CTA 버튼 주목도 미흡', { x: 45, y: py - 28, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Plan(기획안 규정): 보상 혜택 즉각 인지 구조, 카드 갤러리형 소셜 프루프 와이어프레임 설계', { x: 45, y: py - 40, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Final(최종 런칭): 모바일 최적화 반응형 후기 UI 적용, 실시간 리워드 안내로 참여 전환율 35% 상승 견인', { x: 45, y: py - 52, size: 7.5, font: boldFont, color: cEmerald600 });
  page3.drawText('• 핵심 역할: 이벤트 컨셉 기획, 와이어프레임 작성, 디자이너/개발자 협업 가이드 총괄 리딩', { x: 45, y: py - 64, size: 7, font: customFont, color: cSlate500 });

  py -= 85;

  // Module 2: Lottery Event
  page3.drawRectangle({ x: 35, y: py - 70, width: 525.28, height: 75, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page3.drawText('2. 2023 꽝없는 복권 이벤트 (게이미피케이션 프로모션)', { x: 45, y: py - 14, size: 10.5, font: boldFont, color: cSlate900 });
  page3.drawText('• Before(기존 문제): 단순 텍스트 안내로 신규 유저 흥미 유발 실패, 참여 조건 난해로 중도 이탈 다수 발생', { x: 45, y: py - 28, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Plan(기획안 규정): 100% 당첨 즉석 스크래치 복권 게이미피케이션 탑재, 1일 1회 무료 참여 루프 설계', { x: 45, y: py - 40, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Final(최종 런칭): 인터랙티브 복권 긁기 애니메이션 구현, 실시간 당첨 팝업 및 SNS 바이럴 공유 유도', { x: 45, y: py - 52, size: 7.5, font: boldFont, color: cEmerald600 });
  page3.drawText('• 핵심 역할: 게이미피케이션 룰 설계, 당첨 확률 모델링, 참여 플로우 및 쿠폰 발급 연동 기획', { x: 45, y: py - 64, size: 7, font: customFont, color: cSlate500 });

  py -= 85;

  // Module 3: Basic English
  page3.drawRectangle({ x: 35, y: py - 70, width: 525.28, height: 75, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page3.drawText('3. 2023 기초영문법 환급패스 (해커스 대표 교육 패키지)', { x: 45, y: py - 14, size: 10.5, font: boldFont, color: cSlate900 });
  page3.drawText('• Before(기존 문제): 복잡한 환급 요건 설명으로 인한 고객센터 문의 폭증, 혜택 구분의 모호성', { x: 45, y: py - 28, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Plan(기획안 규정): 3단계 환급 로드맵 픽토그램 시각화, 출석만 해도 100% 환급되는 명확한 혜택 플로우 설계', { x: 45, y: py - 40, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Final(최종 런칭): 동적 환급 카운트다운 타이머 탑재, 고화질 강사진 비주얼로 신규 수강 결제율 극대화', { x: 45, y: py - 52, size: 7.5, font: boldFont, color: cEmerald600 });
  page3.drawText('• 핵심 역할: 상품 패키징, 환급 규정 UX 재설계, 상세페이지 기획안 및 전환 카피라이팅 작성', { x: 45, y: py - 64, size: 7, font: customFont, color: cSlate500 });

  py -= 85;

  // Module 4: Business English
  page3.drawRectangle({ x: 35, y: py - 70, width: 525.28, height: 75, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page3.drawText('4. 2023 만능패턴 비즈니스영어 (직장인 타겟 특화 상품)', { x: 45, y: py - 14, size: 10.5, font: boldFont, color: cSlate900 });
  page3.drawText('• Before(기존 문제): 일반 영어회화 상품과 차별성 부족, 직장인 페르소나 미반영으로 낮은 전환율', { x: 45, y: py - 28, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Plan(기획안 규정): 이메일/회의/PT 등 실무 상황별 패턴 커리큘럼 구조화, 신사적 비주얼 톤앤매너 수립', { x: 45, y: py - 40, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Final(최종 런칭): 핵심 패턴 프리뷰 영상 탑재, 실무 템플릿 PDF 무료 증정 패키징으로 수강생 만족도 1위 기록', { x: 45, y: py - 52, size: 7.5, font: boldFont, color: cEmerald600 });
  page3.drawText('• 핵심 역할: 타겟 페르소나 분석, 상황별 학습 템플릿 구성, 프로모션 상세페이지 기획 및 런칭', { x: 45, y: py - 64, size: 7, font: customFont, color: cSlate500 });

  py -= 85;

  // Module 5: English Grammar
  page3.drawRectangle({ x: 35, y: py - 70, width: 525.28, height: 75, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page3.drawText('5. 2023 말문이 트이는 영문법 (입문자 회화 연계 상품)', { x: 45, y: py - 14, size: 10.5, font: boldFont, color: cSlate900 });
  page3.drawText('• Before(기존 문제): 전통적 주입식 문법 암기 이미지로 인한 학습 부담감, 기초 입문자 이탈 심화', { x: 45, y: py - 28, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Plan(기획안 규정): 문법=말하기 공식 정립, 카드뉴스형 쉬운 학습법 소개 및 친근한 일러스트 레이아웃', { x: 45, y: py - 40, size: 7.5, font: customFont, color: cSlate700 });
  page3.drawText('• Final(최종 런칭): 3분 맛보기 무료 수강 체험 플로팅 CTA 구축, 입문 수강생 유입 견인 성공', { x: 45, y: py - 52, size: 7.5, font: boldFont, color: cEmerald600 });
  page3.drawText('• 핵심 역할: 입문자 눈높이의 커리큘럼 리패키징, 와이어프레임 및 전환 퍼널 최적화 총괄', { x: 45, y: py - 64, size: 7, font: customFont, color: cSlate500 });

  // Summary box on page 3
  page3.drawRectangle({ x: 35, y: 55, width: 525.28, height: 80, color: cIndigo50 });
  page3.drawText('CHAMPSTUDY PRODUCT PLANNING SUMMARY', { x: 48, y: 120, size: 8.5, font: boldFont, color: cIndigo600 });
  page3.drawText('기존의 불명확한 정보 구조와 단조로운 페이지를 체계적인 3단계(문제 분석 -> 와이어프레임 기획 -> 최종 런칭)', { x: 48, y: 105, size: 8, font: customFont, color: cSlate800 });
  page3.drawText('프로세스를 통해 전환율 중심의 완성형 커머스 페이지로 탈바꿈시켰으며, 전 상품 매출 성장에 직접 기여했습니다.', { x: 48, y: 92, size: 8, font: customFont, color: cSlate800 });
  page3.drawText('웹사이트에서 5개 상품별 Before / Plan / Final 상세 화면을 고화질 확대 뷰어로 직접 비교 검토하실 수 있습니다.', { x: 48, y: 77, size: 8, font: boldFont, color: cIndigo600 });


  // ==========================================
  // PAGE 4: Makestar PM, Quantitative Impacts & Vision
  // ==========================================
  const page4 = doc.addPage([595.28, 841.89]);
  drawPageHeader(page4, '글로벌 서비스 PM 경험 및 정량적 성과 요약', '메이크스타 글로벌 프로젝트 & 지속 가능한 기획 비전', 4);

  // Section 1: Makestar
  let mY = 740;
  page4.drawRectangle({ x: 35, y: mY - 110, width: 525.28, height: 120, color: cWhite, borderColor: cSlate200, borderWidth: 1 });
  page4.drawText('메이크스타 (MAKESTAR) 글로벌 서비스 기획 & 마케팅 / PM', { x: 45, y: mY - 16, size: 12, font: boldFont, color: cSlate900 });
  page4.drawText('글로벌 K-POP 플랫폼 | 2022.10 - 2023.02 | Project Manager', { x: 45, y: mY - 30, size: 8.5, font: customFont, color: cIndigo600 });
  page4.drawText('• 프로젝트 총괄: 글로벌 아티스트 앨범 및 굿즈 펀딩 프로젝트 기획 및 전 세계 K-POP 팬덤 대상 프로모션 리딩', { x: 45, y: mY - 48, size: 8, font: customFont, color: cSlate700 });
  page4.drawText('• 글로벌 결제 및 언어 최적화: 영/일/중 다국어 유저 행동 패턴 분석을 통한 구매 플로우 단순화 및 결제 이탈률 방어', { x: 45, y: mY - 62, size: 8, font: customFont, color: cSlate700 });
  page4.drawText('• 유저 인게이지먼트: 팬덤 참여형 투표, 럭키드로우 이벤트 기획으로 DAU 및 일간 체류 시간 증대', { x: 45, y: mY - 76, size: 8, font: customFont, color: cSlate700 });
  page4.drawText('• 핵심 역량 증명: 엔터테인먼트 플랫폼의 빠른 호흡 속에서 다국적 이해관계자 조율 및 데이터 기반 실무 완수', { x: 45, y: mY - 90, size: 8, font: boldFont, color: cEmerald600 });

  // Section 2: Quantitative Impact Metrics
  mY -= 140;
  page4.drawText('핵심 정량적 성과 지표 (KEY PERFORMANCE METRICS)', { x: 35, y: mY, size: 12, font: boldFont, color: cSlate900 });

  mY -= 15;
  const metrics = [
    { title: '행정 발급 시간 99% 감축', desc: 'KOTRA 수료증 자동화\n15분/건 -> 2초 즉시 발급' },
    { title: '데이터 분석 95% 단축', desc: 'Eduinsight 실시간 대시보드\n수일 소요 -> 실시간 자동 집계' },
    { title: '자리배치 효율 90% 개선', desc: '알고리즘 기반 자동 배치\n2시간 반복 -> 10분 완료' },
    { title: '5대 대표 상품 런칭 총괄', desc: '해커스톡 핵심 패키지\n와이어프레임 기획 ~ 신규 런칭' }
  ];

  const colWidth = 124;
  metrics.forEach((m, idx) => {
    const xPos = 35 + idx * (colWidth + 9.5);
    page4.drawRectangle({
      x: xPos,
      y: mY - 80,
      width: colWidth,
      height: 80,
      color: cSlate50,
      borderColor: cSlate200,
      borderWidth: 1,
    });
    page4.drawText(m.title, {
      x: xPos + 8,
      y: mY - 24,
      size: 8.5,
      font: boldFont,
      color: cIndigo600,
    });
    const lines = m.desc.split('\n');
    page4.drawText(lines[0], {
      x: xPos + 8,
      y: mY - 44,
      size: 7.5,
      font: customFont,
      color: cSlate800,
    });
    page4.drawText(lines[1], {
      x: xPos + 8,
      y: mY - 58,
      size: 7.5,
      font: customFont,
      color: cSlate500,
    });
  });

  // Section 3: Professional Philosophy & Vision
  mY -= 115;
  page4.drawRectangle({
    x: 35,
    y: mY - 140,
    width: 525.28,
    height: 140,
    color: cSlate900,
  });

  page4.drawText('CANDIDATE VISION & VALUE PROPOSITION', {
    x: 50,
    y: mY - 25,
    size: 10,
    font: boldFont,
    color: cIndigo50,
  });

  page4.drawText('"기획에 머무르지 않고, 현장의 문제를 AI 기술과 데이터로 직접 풀어내는 기획자"', {
    x: 50,
    y: mY - 45,
    size: 12,
    font: boldFont,
    color: cWhite,
  });

  const v1 = '• 현업의 사소한 비효율도 그냥 지나치지 않고, 자동화 알고리즘과 인터랙티브 웹 솔루션으로 직접 해결합니다.';
  const v2 = '• 비즈니스 목표(매출, 유입, 리드타임 단축)를 명확한 숫자로 정의하고, 데이터 기반의 UX/UI로 전환율을 끌어올립니다.';
  const v3 = '• 교육, 엔터테인먼트, AI 서비스 등 다양한 도메인에서 축적한 풍부한 기획/마케팅/개발 역량을 바탕으로';
  const v4 = '  귀사의 핵심 비즈니스 성장을 주도하는 든든한 프로덕트 매니저로 기여하겠습니다.';

  page4.drawText(v1, { x: 50, y: mY - 68, size: 8, font: customFont, color: cSlate200 });
  page4.drawText(v2, { x: 50, y: mY - 82, size: 8, font: customFont, color: cSlate200 });
  page4.drawText(v3, { x: 50, y: mY - 96, size: 8, font: customFont, color: cSlate200 });
  page4.drawText(v4, { x: 50, y: mY - 110, size: 8, font: customFont, color: cSlate200 });

  page4.drawText('신혜진 | Email: hjshin@assist.ac.kr | Portfolio 2026 Official Document', {
    x: 50,
    y: mY - 130,
    size: 8,
    font: customFont,
    color: cSlate500,
  });

  // Save PDF
  const pdfBytes = await doc.save();
  const pubPath1 = path.join(process.cwd(), 'public', 'portfolio_2026.pdf');
  const pubPath2 = path.join(process.cwd(), 'public', '2026_포트폴리오_신혜진.pdf');
  const srcPath = path.join(process.cwd(), 'src', 'assets', 'images', '2026_포트폴리오_신혜진.pdf');

  fs.writeFileSync(pubPath1, pdfBytes);
  fs.writeFileSync(pubPath2, pdfBytes);
  fs.writeFileSync(srcPath, pdfBytes);

  console.log(`[SUCCESS] 4-Page Korean Portfolio PDF generated cleanly: ${pdfBytes.length} bytes`);
}

buildPortfolioPdf().catch(err => {
  console.error('[ERROR] Failed to build PDF:', err);
  process.exit(1);
});
