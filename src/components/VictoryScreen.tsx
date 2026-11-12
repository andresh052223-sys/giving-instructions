import React, { useEffect, useRef } from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  Home,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { getMapDefinition } from '../data/mapLayout';
import { DIFFICULTY_CONFIGS } from '../data/questionBank';
import {
  CompletedMissionRecord,
  DifficultyId,
  MapId,
} from '../types/game';
import { ExplorerAvatar } from './ExplorerAvatar';
import { formatDuration } from './GameHud';

interface VictoryScreenProps {
  playerName: string;
  mapId: MapId;
  difficulty: DifficultyId;
  correctCount: number;
  totalCheckpoints: number;
  completionSeconds: number;
  completedRecords: CompletedMissionRecord[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
  onOpenCertificate: () => void;
}

interface ConfettiPiece {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  color: string;
  angle: number;
  spin: number;
}

const CONFETTI_COLORS = [
  '#10B981',
  '#2563EB',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#06B6D4',
];

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  playerName,
  mapId,
  difficulty,
  correctCount,
  totalCheckpoints,
  completionSeconds,
  completedRecords,
  onPlayAgain,
  onBackToMenu,
  onOpenCertificate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const levelConfig = DIFFICULTY_CONFIGS[difficulty];
  const mapDef = getMapDefinition(mapId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const pieces: ConfettiPiece[] = Array.from({ length: 110 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: 7 + Math.random() * 6,
      h: 10 + Math.random() * 8,
      vx: (Math.random() - 0.5) * 2.4,
      vy: 2.2 + Math.random() * 3.2,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.12,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#EEF4F0] px-4 py-10">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-10"
        aria-hidden="true"
      />

      <div className="relative z-20 w-full max-w-2xl rounded-3xl border-2 border-emerald-500 bg-white p-6 text-center shadow-lg sm:p-10 animate-pop-success">
        <div className="mx-auto flex items-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-amber-300 bg-amber-50">
            <Trophy className="h-11 w-11 text-amber-500" />
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-emerald-200 bg-emerald-50">
            <ExplorerAvatar size={64} mood="happy" />
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
          <Award className="h-4 w-4" />
          <span>{mapDef.name} · SENA English Imperatives</span>
        </div>

        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          MISSION COMPLETED!
        </h1>
        <p className="mt-2 text-base font-bold text-emerald-700 sm:text-lg">
          CONGRATULATIONS! YOU REACHED YOUR DESTINATION!
        </p>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="block text-xs font-bold text-slate-500">
              Player Name
            </span>
            <span className="mt-1 block truncate font-display text-lg font-extrabold text-slate-900">
              {playerName}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="block text-xs font-bold text-slate-500">
              Map &amp; Difficulty Level
            </span>
            <span className="mt-1 block font-display text-base font-extrabold text-slate-900">
              {mapDef.name} · {levelConfig.title}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="block text-xs font-bold text-slate-500">
              Total Correct Answers
            </span>
            <span className="font-mono-nums mt-1 block text-xl font-extrabold text-emerald-700">
              {correctCount}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="block text-xs font-bold text-slate-500">
              Checkpoints &amp; Completion Time
            </span>
            <span className="font-mono-nums mt-1 block text-xl font-extrabold text-slate-900">
              {totalCheckpoints} / {totalCheckpoints}{' '}
              <span className="mx-1 text-slate-400">·</span>{' '}
              {formatDuration(completionSeconds)}
            </span>
          </div>
        </div>

        {/* Recorded Completed Levels Summary */}
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-emerald-900">
              Activity Progress Recorded ({completedRecords.length} of 15 levels)
            </span>
            <span className="text-xs font-semibold text-emerald-700">
              Ready for certificate download
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {completedRecords.map((rec) => (
              <span
                key={rec.key}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>
                  {rec.mapName} ({rec.difficultyTitle})
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <button
            type="button"
            onClick={onOpenCertificate}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-display text-base font-extrabold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] whitespace-nowrap"
          >
            <Download className="h-5 w-5" />
            <span>DOWNLOAD CERTIFICATE</span>
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-display text-base font-extrabold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99] whitespace-nowrap"
          >
            <RotateCcw className="h-5 w-5" />
            <span>PLAY AGAIN</span>
          </button>

          <button
            type="button"
            onClick={onBackToMenu}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 font-display text-base font-extrabold text-slate-800 transition hover:bg-slate-50 whitespace-nowrap"
          >
            <Home className="h-5 w-5" />
            <span>BACK TO MAIN MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
