import React, { useEffect, useRef } from 'react';
import { Award, CheckCircle2, Download, Lock, X } from 'lucide-react';
import { CompletedMissionRecord } from '../types/game';
import {
  downloadCertificatePng,
  renderCertificateToCanvas,
} from '../utils/certificateGenerator';
import { formatDuration } from './GameHud';

interface CertificateModalProps {
  isOpen: boolean;
  lockedPlayerName: string;
  records: CompletedMissionRecord[];
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  lockedPlayerName,
  records,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const officialName =
    lockedPlayerName.trim() || records[0]?.playerName || 'SENA Apprentice';

  useEffect(() => {
    if (!isOpen || records.length === 0 || !canvasRef.current) return;
    renderCertificateToCanvas(canvasRef.current, officialName, records);
  }, [isOpen, officialName, records]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Award className="h-6 w-6 text-emerald-600" />
            <div>
              <h2
                id="certificate-modal-title"
                className="font-display text-lg font-extrabold text-slate-900 sm:text-xl"
              >
                Certificate of Activity Completion
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Includes all completed maps and levels ({records.length} of 15 missions)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100"
            aria-label="Close certificate preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {records.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="font-display text-lg font-bold text-slate-800">
                No completed levels yet
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Complete at least one level on any map to unlock and download your personalized completion certificate.
              </p>
            </div>
          ) : (
            <>
              {/* Locked Apprentice Name Banner + Download Button */}
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Lock className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Verified apprentice name (locked from start)</span>
                  </div>
                  <p className="mt-0.5 truncate font-display text-lg font-extrabold text-slate-900">
                    {officialName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => downloadCertificatePng(officialName, records)}
                  className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-display text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99] whitespace-nowrap"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Certificate (PNG)</span>
                </button>
              </div>

              {/* Live Canvas Certificate Preview */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <canvas
                  ref={canvasRef}
                  className="block h-auto w-full rounded-xl"
                />
              </div>

              {/* Summary List of Completed Levels */}
              <div>
                <h3 className="text-xs font-bold text-slate-500">
                  Recorded Completed Levels
                </h3>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {records.map((rec) => (
                    <div
                      key={rec.key}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <div className="truncate">
                          <span className="font-bold text-slate-900">
                            {rec.mapName}
                          </span>
                          <span className="mx-1.5 text-slate-400">·</span>
                          <span className="font-semibold text-emerald-700">
                            {rec.difficultyTitle}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono-nums shrink-0 font-bold text-slate-700">
                        {rec.totalCheckpoints} steps ·{' '}
                        {formatDuration(rec.completionSeconds)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
