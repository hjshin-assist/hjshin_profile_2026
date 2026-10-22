import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { PDFDownloadModal } from './components/PDFDownloadModal';
import { FileText, Download } from 'lucide-react';

export default function App() {
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm">
              HJ
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight">
              신혜진 <span className="text-slate-400 font-normal text-xs sm:text-sm">Portfolio 2026</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
            <a href="#projects" className="hover:text-white transition-colors">프로젝트</a>
            <a href="#experience" className="hover:text-white transition-colors">경력사항</a>
          </nav>

          <button
            onClick={() => setIsPDFModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF 받기</span>
          </button>
        </div>
      </header>

      {/* Main Content Sections */}
      <main>
        <HeroSection onOpenPDFModal={() => setIsPDFModalOpen(true)} />
        <ProjectsSection />
        <ExperienceSection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="font-bold text-slate-300">
            © 2026 신혜진 (Shin Hyejin). All rights reserved.
          </p>
          <p className="text-slate-500 max-w-xl mx-auto">
            aSSIST 경영대학원 AI 자동화 개발 & 해커스 챔프스터디 상품 기획 포트폴리오
          </p>
        </div>
      </footer>

      {/* PDF Modal */}
      <PDFDownloadModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
      />
    </div>
  );
}
