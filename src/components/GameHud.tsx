import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Compass,
  Flag,
  MapPin,
  Navigation,
  User,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import { getMapDefinition } from '../data/mapLayout';
import { DIFFICULTY_CONFIGS } from '../data/questionBank';
import { DifficultyId, GameState, MapId } from '../types/game';

interface GameHudProps {
  playerName: string;
  mapId: MapId;
  difficulty: DifficultyId;
  currentCheckpointIndex: number;
  totalCheckpoints: number;
  correctCount: number;
  elapsedSeconds: number;
  gameState: GameState;
  muted: boolean;
  onToggleMute: () => void;
  onBackToMenu: () => void;
}

export function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const GameHud: React.FC<GameHudProps> = ({
  playerName,
  mapId,
  difficulty,
  currentCheckpointIndex,
  totalCheckpoints,
  correctCount,
  elapsedSeconds,
  gameState,
  muted,
  onToggleMute,
  onBackToMenu,
}) => {
  const levelConfig = DIFFICULTY_CONFIGS[difficulty];
  const mapDef = getMapDefinition(mapId);
  const progressPercent = Math.round((correctCount / totalCheckpoints) * 100);
  const displayCheckpoint = Math.min(
    currentCheckpointIndex + 1,
    totalCheckpoints
  );

  const renderStatus = () => {
    switch (gameState) {
      case 'CORRECT_ANSWER':
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Advancing</span>
          </span>
        );
      case 'GAME_OVER':
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-red-700">
            <XCircle className="h-4 w-4 shrink-0" />
            <span>Mission Failed</span>
          </span>
        );
      case 'VICTORY':
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
            <Flag className="h-4 w-4 shrink-0" />
            <span>Mission Completed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 font-semibold text-blue-700">
            <Navigation className="h-4 w-4 shrink-0" />
            <span>In Progress</span>
          </span>
        );
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <Compass className="h-6 w-6 text-emerald-600" />
            <span className="font-display text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
              MISSION: FOLLOW THE INSTRUCTIONS!
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
              <User className="h-4 w-4 text-slate-500" />
              <span className="max-w-[140px] truncate">{playerName}</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-blue-700 whitespace-nowrap">
              <MapPin className="h-3.5 w-3.5" />
              <span>{mapDef.name}</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            <span className="font-semibold text-slate-800 whitespace-nowrap">
              {levelConfig.title}
            </span>
            <span aria-hidden="true" className="text-slate-300">
              |
            </span>
            {renderStatus()}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onToggleMute}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 whitespace-nowrap"
              aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {muted ? (
                <>
                  <VolumeX className="h-4 w-4 text-slate-500" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 text-emerald-600" />
                  <span className="hidden sm:inline">Sound</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBackToMenu}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Main Menu</span>
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-2.5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold text-slate-600 sm:text-sm">
            <span>
              Checkpoint:{' '}
              <strong className="font-mono-nums text-slate-900">
                {displayCheckpoint} / {totalCheckpoints}
              </strong>
            </span>
            <span>
              Correct Answers:{' '}
              <strong className="font-mono-nums text-emerald-700">
                {correctCount}
              </strong>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Time:</span>
              <strong className="font-mono-nums text-slate-900">
                {formatDuration(elapsedSeconds)}
              </strong>
            </span>
          </div>

          <div className="flex min-w-[200px] flex-1 max-w-md items-center gap-3">
            <div
              className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Mission progress"
            >
              <div
                className="h-full rounded-full bg-emerald-600 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono-nums w-11 text-right text-xs font-bold text-slate-900 sm:text-sm">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
