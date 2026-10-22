import React, { useState, useEffect } from 'react';
import { portfolioProjects } from '../data/portfolioData';
import { ProjectItem, ProjectCategory, StageInfo } from '../types';
import { 
  ExternalLink, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  X, 
  ZoomIn, 
  ZoomOut,
  Image as ImageIcon,
  RotateCcw,
  Maximize2
} from 'lucide-react';

/* SmartImage component with multi-stage fallback and direct load */
function SmartImage({
  src,
  fallbacks = [],
  alt,
  className,
  onClick,
  style
}: {
  src?: string;
  fallbacks?: string[];
  alt: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const sources = [src, ...(fallbacks || [])].filter(Boolean) as string[];
  const currentSrc = sources[currentSrcIndex];

  useEffect(() => {
    setCurrentSrcIndex(0);
  }, [src]);

  const handleError = () => {
    if (currentSrcIndex < sources.length - 1) {
      setCurrentSrcIndex(prev => prev + 1);
    } else {
      setCurrentSrcIndex(sources.length); // Trigger error box
    }
  };

  if (!currentSrc || currentSrcIndex >= sources.length) {
    return (
      <div 
        className={`flex flex-col items-center justify-center p-6 bg-slate-100 border border-slate-200 rounded-2xl text-center space-y-2 min-h-[160px] cursor-pointer ${className || ''}`}
        onClick={onClick}
      >
        <ImageIcon className="w-8 h-8 text-slate-400" />
        <span className="text-xs text-slate-500 font-medium">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="eager"
      onError={handleError}
      className={className}
      style={style}
      onClick={onClick}
    />
  );
}

/* Rolling Image Carousel for multi-image projects */
function ProjectImageCarousel({
  images,
  imagesFallbacks,
  title,
  onOpenZoom
}: {
  images: string[];
  imagesFallbacks?: string[][];
  title: string;
  onOpenZoom: (src: string, title: string, fallbacks?: string[]) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const currentImage = images[currentIndex];
  const currentFallbacks = imagesFallbacks?.[currentIndex] || [];

  return (
    <div 
      className="mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <SmartImage
          key={currentIndex}
          src={currentImage}
          fallbacks={currentFallbacks}
          alt={`${title} - 화면 ${currentIndex + 1}`}
          className="w-full max-h-[380px] object-contain bg-slate-900/5 cursor-pointer transition-opacity duration-300"
          onClick={() => onOpenZoom(currentImage, `${title} (${currentIndex + 1}/${images.length})`, currentFallbacks)}
        />
        
        {/* Rolling Status Indicator */}
        <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>화면 {currentIndex + 1} / {images.length} (자동 롤링 중)</span>
        </div>

        {/* Zoom Button */}
        <button
          onClick={() => onOpenZoom(currentImage, `${title} (${currentIndex + 1}/${images.length})`, currentFallbacks)}
          className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all z-10"
        >
          <ZoomIn className="w-3.5 h-3.5" />
          <span>고화질 크게보기</span>
        </button>

        {/* Prev / Next Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all hover:scale-105 z-10"
              aria-label="이전 화면"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(prev => (prev + 1) % images.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all hover:scale-105 z-10"
              aria-label="다음 화면"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-2.5 bg-slate-100/90 border-t border-slate-200">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all rounded-full ${
                idx === currentIndex
                  ? 'w-6 h-2 bg-indigo-600'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`화면 ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  
  // Champstudy category selection & stage switcher state (Defaults to 'before' 1단계 per user request)
  const [selectedChampModuleId, setSelectedChampModuleId] = useState<string>('review-event');
  const [activeStage, setActiveStage] = useState<'before' | 'plan' | 'final'>('before');
  
  // Fullscreen image zoom modal with dynamic scale state
  const [zoomImage, setZoomImage] = useState<{ src: string; fallbacks?: string[]; title: string } | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const categories = [
    { id: 'all', label: '전체 프로젝트' },
    { id: 'automation', label: 'AI & 업무 자동화' },
    { id: 'product', label: '해커스 챔프스터디 기획' },
    { id: 'brand', label: '브랜드 콘텐츠' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === selectedCategory);

  const champProject = portfolioProjects.find(p => p.id === 'champstudy-product-plan');
  const selectedChampModule = champProject?.champCategories?.find(m => m.id === selectedChampModuleId) || champProject?.champCategories?.[0];
  const currentStageInfo = selectedChampModule?.stages.find(s => s.stage === activeStage);

  const handleOpenZoom = (src: string, title: string, fallbacks?: string[]) => {
    setZoomImage({ src, title, fallbacks });
    setZoomScale(1);
  };

  return (
    <section id="projects" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>PORTFOLIO PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            주요 프로젝트 및 기획 성과
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            AI 기반 데이터 분석 대시보드, 행정 자동화 시스템부터 챔프스터디의 주요 교육 상품 기획안까지 신혜진 기획자의 대표 성과를 소개합니다.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group p-6 sm:p-8"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {project.organization}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-bold text-indigo-600 mb-4">
                    {project.role}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights / Key Outcomes */}
                  <div className="space-y-2 mb-6">
                    {project.impacts.slice(0, 2).map((impact, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{impact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <span>자세히 보기</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {project.demoUrl && project.id !== 'seating-chart-system' && project.category !== 'brand' && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      <span>웹 시연</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Champstudy Detailed Interactive Proposal Section */}
        {champProject && (selectedCategory === 'all' || selectedCategory === 'product') && (
          <div className="mt-20 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg">
            <div className="border-b border-slate-100 pb-8 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>해커스 챔프스터디 5대 핵심 상품 기획 모듈</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                기획안 (Plan) VS 최종 런칭 페이지 (Final) 비교 분석
              </h3>
              <p className="text-slate-600 text-sm mt-2">
                기존 페이지 분석(Before), 와이어프레임 기획안(Plan), 그리고 최종 완성된 런칭 페이지(Final)를 단계별로 비교해 보세요.
              </p>
            </div>

            {/* Module Selector Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
              {champProject.champCategories?.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setSelectedChampModuleId(module.id);
                    setActiveStage('before'); // Defaults to Before stage (1단계) per user request
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    selectedChampModuleId === module.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {module.name}
                </button>
              ))}
            </div>

            {/* Stage Switcher Buttons */}
            {selectedChampModule && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {selectedChampModule.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedChampModule.description}
                    </p>
                  </div>

                  <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                    {selectedChampModule.stages.map((stage) => (
                      <button
                        key={stage.stage}
                        onClick={() => setActiveStage(stage.stage)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeStage === stage.stage
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {stage.stage === 'before' && '1단계: Before'}
                        {stage.stage === 'plan' && '2단계: 기획안 (Plan)'}
                        {stage.stage === 'final' && '3단계: 최종 페이지 (Final)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stage Detail Card */}
                {currentStageInfo && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Key Points */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                          {currentStageInfo.stage.toUpperCase()} STAGE
                        </span>
                        <h5 className="text-base font-bold text-slate-900 mt-1 mb-2">
                          {currentStageInfo.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                          {currentStageInfo.description}
                        </p>

                        <div className="space-y-2 pt-3 border-t border-slate-100">
                          <span className="text-xs font-bold text-slate-800">주요 기획 핵심 요소:</span>
                          {currentStageInfo.keyPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Stage Image */}
                    <div className="lg:col-span-7">
                      {currentStageInfo.imageUrl && (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm relative group">
                          <SmartImage
                            key={`${selectedChampModuleId}-${activeStage}`}
                            src={currentStageInfo.imageUrl}
                            fallbacks={currentStageInfo.imageFallbacks}
                            alt={currentStageInfo.title}
                            className="w-full max-h-[500px] object-contain bg-slate-900/5 cursor-pointer"
                            onClick={() => handleOpenZoom(currentStageInfo.imageUrl!, currentStageInfo.title, currentStageInfo.imageFallbacks)}
                          />
                          <button
                            onClick={() => handleOpenZoom(currentStageInfo.imageUrl!, currentStageInfo.title, currentStageInfo.imageFallbacks)}
                            className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>고화질 크게보기</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {activeModalProject.organization}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-3 mb-1">
                {activeModalProject.title}
              </h3>
              <p className="text-xs text-indigo-600 font-bold mb-4">
                {activeModalProject.role} ({activeModalProject.period})
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {activeModalProject.description}
              </p>
            </div>

            {/* Modal Image if present */}
            {/* Modal Image Carousel or Single Image */}
            {activeModalProject.images && activeModalProject.images.length > 1 ? (
              <ProjectImageCarousel
                images={activeModalProject.images}
                imagesFallbacks={activeModalProject.imagesFallbacks}
                title={activeModalProject.title}
                onOpenZoom={handleOpenZoom}
              />
            ) : activeModalProject.imageUrl ? (
              <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                <SmartImage
                  src={activeModalProject.imageUrl}
                  fallbacks={activeModalProject.imageFallbacks}
                  alt={activeModalProject.title}
                  className="w-full max-h-[350px] object-contain bg-slate-900/5 cursor-pointer"
                  onClick={() => handleOpenZoom(activeModalProject.imageUrl!, activeModalProject.title, activeModalProject.imageFallbacks)}
                />
                <button
                  onClick={() => handleOpenZoom(activeModalProject.imageUrl!, activeModalProject.title, activeModalProject.imageFallbacks)}
                  className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-all"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>고화질 크게보기</span>
                </button>
              </div>
            ) : null}

            {/* Impact & Outcome */}
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  주요 프로젝트 성과
                </h4>
                <ul className="space-y-1.5">
                  {activeModalProject.impacts.map((impact, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeModalProject.outcome && (
                <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
                    프로젝트 총평
                  </h4>
                  <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
                    {activeModalProject.outcome}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {activeModalProject.demoUrl && activeModalProject.id !== 'seating-chart-system' && activeModalProject.category !== 'brand' && (
                <a
                  href={activeModalProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-colors"
                >
                  <span>웹 데모 페이지 열기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Fullscreen Zoom Lightbox Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-6 animate-fade-in"
          onClick={() => setZoomImage(null)}
        >
          <div 
            className="relative w-full max-w-6xl h-[92vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls Bar */}
            <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-sm font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md">
                {zoomImage.title}
              </span>

              {/* Zoom Action Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 3))}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold px-2.5"
                  title="확대 (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span className="hidden sm:inline">확대</span>
                </button>

                <button
                  onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.5))}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold px-2.5"
                  title="축소 (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                  <span className="hidden sm:inline">축소</span>
                </button>

                <button
                  onClick={() => setZoomScale(1)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold px-2.5"
                  title="초기화 (100%)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">100%</span>
                </button>

                <span className="text-xs font-mono text-indigo-400 bg-slate-800/80 px-2 py-1 rounded-md font-bold">
                  {Math.round(zoomScale * 100)}%
                </span>

                <a
                  href={zoomImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1 text-xs font-bold px-3 ml-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">새 탭에서 원본 보기</span>
                </a>

                <button
                  onClick={() => setZoomImage(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Zoom Canvas */}
            <div className="p-4 overflow-auto flex-1 bg-slate-950 flex justify-center items-start">
              <div 
                className="transition-transform duration-200 origin-top flex justify-center min-w-full"
                style={{ transform: `scale(${zoomScale})` }}
              >
                <SmartImage
                  src={zoomImage.src}
                  fallbacks={zoomImage.fallbacks}
                  alt={zoomImage.title}
                  className="max-w-full h-auto object-contain rounded-lg shadow-2xl bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
