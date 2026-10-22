import React, { useState, useEffect, useRef } from 'react';
import { X, Download, FileText, CheckCircle2, ExternalLink, Upload, AlertCircle, RefreshCw } from 'lucide-react';

interface PDFDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PdfStatus {
  exists: boolean;
  filename?: string;
  size?: number;
  sizeMb?: string;
  mtime?: string;
}

export const PDFDownloadModal: React.FC<PDFDownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'download' | 'preview' | 'upload'>('download');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ success?: boolean; message?: string }>({});
  const [pdfStatus, setPdfStatus] = useState<PdfStatus | null>(null);
  const [cacheBust, setCacheBust] = useState(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      checkPdfStatus();
    }
  }, [isOpen]);

  const checkPdfStatus = async () => {
    try {
      const res = await fetch('/api/portfolio-pdf-status');
      if (res.ok) {
        const data = await res.json();
        setPdfStatus(data);
      }
    } catch (e) {
      console.error('Failed to check PDF status', e);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setUploadStatus({
        success: false,
        message: 'PDF 형식(.pdf)의 파일만 업로드할 수 있습니다.'
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus({});

    try {
      const arrayBuffer = await file.arrayBuffer();
      const res = await fetch('/api/upload-portfolio-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/pdf'
        },
        body: arrayBuffer
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || '파일 저장에 실패했습니다.');
      }

      const result = await res.json();
      setUploadStatus({
        success: true,
        message: `원본 PDF (${result.sizeMb || (file.size / 1024 / 1024).toFixed(2)} MB)가 손상 없이 등록되었습니다!`
      });
      setCacheBust(Date.now());
      await checkPdfStatus();
      setActiveTab('download');
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadStatus({
        success: false,
        message: err.message || '업로드 중 오류가 발생했습니다.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            신혜진 포트폴리오 PDF
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            신혜진 지원자의 원본 포트폴리오 문서
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-200 mb-5">
          <button
            onClick={() => setActiveTab('download')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'download'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            PDF 다운로드
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'preview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            문서 바로보기
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1 ${
              activeTab === 'upload'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>파일 등록/교체</span>
          </button>
        </div>

        {uploadStatus.message && (
          <div
            className={`mb-4 p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
              uploadStatus.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {uploadStatus.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{uploadStatus.message}</span>
          </div>
        )}

        {activeTab === 'download' && (
          <div className="space-y-4">
            {/* Document Info */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-500">문서 파일명</span>
                <span className="font-bold text-slate-800">2026_포트폴리오_신혜진.pdf</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-500">문서 용량</span>
                <span className="font-bold text-slate-800">
                  {pdfStatus?.sizeMb ? `${pdfStatus.sizeMb} MB` : '1.6 MB'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-500">문서 상태</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>다운로드 준비 완료</span>
                </span>
              </div>
            </div>

            {downloadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>PDF 파일 다운로드를 시작했습니다. 브라우저 다운로드 항목을 확인하세요.</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`/api/download-portfolio-pdf?t=${cacheBust}`}
                download="2026_포트폴리오_신혜진.pdf"
                onClick={() => setDownloadSuccess(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all text-center"
              >
                <Download className="w-4 h-4" />
                <span>포트폴리오 PDF 다운로드</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`/2026_포트폴리오_신혜진.pdf?t=${cacheBust}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>새 창에서 열기</span>
                </a>

                <button
                  onClick={() => setActiveTab('preview')}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>웹에서 바로보기</span>
                </button>
              </div>
            </div>

            {/* Quick Upload Switcher */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>새로운 원본 PDF로 교체하시겠습니까?</span>
              <button
                onClick={() => setActiveTab('upload')}
                className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
              >
                직접 파일 등록하기
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-[440px] flex flex-col">
              <iframe
                src={`/2026_포트폴리오_신혜진.pdf?t=${cacheBust}#view=FitH`}
                title="포트폴리오 PDF 미리보기"
                className="w-full h-full border-0"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <a
                href={`/2026_포트폴리오_신혜진.pdf?t=${cacheBust}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>새 창 전체 화면 열기</span>
              </a>
              <a
                href={`/api/download-portfolio-pdf?t=${cacheBust}`}
                download="2026_포트폴리오_신혜진.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>다운로드</span>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/70 transition-all rounded-2xl p-8 text-center cursor-pointer flex flex-col items-center justify-center gap-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                {isUploading ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm text-slate-800">
                  {isUploading
                    ? '파일을 서버에 안전하게 등록 중입니다...'
                    : '내 원본 PDF 파일 선택 또는 여기로 드래그'}
                </p>
                <p className="text-xs text-slate-500">
                  보유하고 계신 원본 PDF 파일을 등록하면 손상 및 생략 없이 그대로 웹사이트에 반영됩니다.
                </p>
              </div>
              <button
                type="button"
                disabled={isUploading}
                className="mt-2 px-4 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-600 text-xs font-bold shadow-xs hover:bg-indigo-50"
              >
                컴퓨터에서 파일 찾기
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-slate-800">📌 간편 등록 안내</p>
              <p>• 업로드 시 서버의 `public/2026_포트폴리오_신혜진.pdf`에 즉시 원본 바이트 그대로 저장됩니다.</p>
              <p>• AI Studio 좌측 파일 탐색기의 `public` 폴더에 직접 업로드하셔도 동일하게 작동합니다.</p>
            </div>
          </div>
        )}

        <p className="text-[11px] text-center text-slate-400 mt-4">
          * 기기 환경에 따라 브라우저 내 뷰어 또는 다운로드 폴더에서 문서를 확인하실 수 있습니다.
        </p>
      </div>
    </div>
  );
};
