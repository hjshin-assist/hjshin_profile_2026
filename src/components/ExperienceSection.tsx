import React from 'react';
import { careerHistory } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-4">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>CAREER HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            경력 사항
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            교육 서비스 기획 및 AI 자동화 개발 실무 경력입니다.
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {careerHistory.map((career, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {career.company}
                  </h3>
                  <p className="text-sm font-bold text-indigo-600 mt-1">
                    {career.role}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{career.period}</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {career.description}
              </p>

              <div className="space-y-2.5 mb-6">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">주요 성과 및 업무:</span>
                {career.achievements.map((ach, achIdx) => (
                  <div key={achIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {career.skills && career.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {career.skills.map((skill, skillIdx) => (
                    <span key={skillIdx} className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
