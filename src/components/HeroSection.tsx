import React from 'react';
import { Download, Sparkles, Layers, FileSpreadsheet, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenPDFModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPDFModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI Automation Engineer & Product Planner</span>
          </div>

          {/* Name & Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            신혜진 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">포트폴리오</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
            "데이터 기반 서비스 기획과 AI 업무 자동화로 교육 가치 및 조직 생산성을 혁신합니다."
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            aSSIST 경영대학원에서 AI 기반 대시보드 및 수료증 자동 발급 플랫폼을 구축하고, 해커스 챔프스터디에서 주요 영어 교육 상품 및 이벤트를 총괄 기획한 융합형 인재입니다.
          </p>

          {/* Core Competencies Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-medium">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>상품 & 이벤트 기획 (해커스 챔프스터디)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-medium">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>AI 자동화 & 대시보드 (aSSIST)</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              onClick={onOpenPDFModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>포트폴리오 PDF 다운로드</span>
            </button>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all duration-200"
            >
              <span>프로젝트 미리보기</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
