import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Compass,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { ActiveQuestion, GameState } from '../types/game';

interface QuestionPanelProps {
  question: ActiveQuestion;
  checkpointNumber: number;
  totalCheckpoints: number;
  gameState: GameState;
  selectedOptionIndex: number | null;
  landmarkHint?: string;
  onSelectOption: (optionIndex: number) => void;
  onRestartMission: () => void;
  onBackToMenu: () => void;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  checkpointNumber,
  totalCheckpoints,
  gameState,
  selectedOptionIndex,
  landmarkHint,
  onSelectOption,
  onRestartMission,
  onBackToMenu,
}) => {
  const isLocked = gameState !== 'PLAYING';
  const isCorrectState = gameState === 'CORRECT_ANSWER';
  const isGameOverState = gameState === 'GAME_OVER';

  return (
    <section
      aria-live="polite"
      className={`flex h-full flex-col justify-between rounded-3xl border-2 bg-white p-5 shadow-sm sm:p-6 ${
        isCorrectState
          ? 'border-emerald-500 animate-pop-success'
          : isGameOverState
          ? 'border-red-500 animate-shake-error'
          : 'border-slate-200'
      }`}
    >
      <div>
        {/* Checkpoint Title & Category Metadata */}
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
          <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-900">
            CHECKPOINT {checkpointNumber}
            <span className="font-mono-nums ml-2 text-sm font-semibold text-slate-500">
              of {totalCheckpoints}
            </span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {question.item.category}
          </span>
        </div>

        {/* Spanish Instruction Box */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-blue-600" />
              <span>Your instruction (Spanish):</span>
            </span>
            {landmarkHint && (
              <span className="text-slate-500">Next stop: {landmarkHint}</span>
            )}
          </div>
          <p className="font-display mt-2 text-xl font-extrabold leading-snug text-slate-900 sm:text-2xl">
            &ldquo;{question.item.spanish}&rdquo;
          </p>
        </div>

        {/* Feedback Banners */}
        {isCorrectState && (
          <div
            role="status"
            className="mt-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-4 text-emerald-950"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
              <div>
                <p className="font-display text-base font-extrabold text-emerald-800">
                  EXCELLENT! CORRECT ANSWER!
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-900">
                  English instruction:{' '}
                  <span className="underline decoration-emerald-400 decoration-2 underline-offset-2">
                    {question.item.correctEnglish}
                  </span>
                </p>
                <p className="mt-1 text-xs font-medium text-emerald-700">
                  Moving explorer to the next checkpoint...
                </p>
              </div>
            </div>
          </div>
        )}

        {isGameOverState && (
          <div
            role="alert"
            className="mt-4 rounded-2xl border-2 border-red-500 bg-red-50 p-4 text-red-950"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-extrabold text-red-700">
                  WRONG ANSWER! MISSION FAILED!
                </p>
                <div className="mt-2 space-y-1 text-sm text-red-950">
                  <p>
                    <strong className="font-bold">Spanish:</strong>{' '}
                    &ldquo;{question.item.spanish}&rdquo;
                  </p>
                  <p>
                    <strong className="font-bold">Correct English:</strong>{' '}
                    <span className="font-bold text-emerald-800">
                      {question.item.correctEnglish}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onRestartMission}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-display text-sm font-extrabold text-white shadow-xs transition hover:bg-red-700 active:scale-[0.99]"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>RESTART MISSION</span>
                  </button>
                  <button
                    type="button"
                    onClick={onBackToMenu}
                    className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-800 transition hover:bg-red-100"
                  >
                    Change Level
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Six English Answer Options */}
        <div className="mt-5">
          <div className="mb-2.5 flex items-center justify-between text-sm font-bold text-slate-700">
            <span>Choose the correct instruction in English:</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
              <Volume2 className="h-3.5 w-3.5" />
              <span>6 options</span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const showAsCorrect =
                (isCorrectState || isGameOverState) && opt.isCorrect;
              const showAsWrong = isGameOverState && isSelected && !opt.isCorrect;

              let buttonStyles =
                'border-slate-200 bg-white text-slate-800 hover:border-blue-500 hover:bg-blue-50/70';
              let badgeStyles = 'bg-slate-100 text-slate-700';

              if (showAsCorrect) {
                buttonStyles =
                  'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
                badgeStyles = 'bg-emerald-600 text-white';
              } else if (showAsWrong) {
                buttonStyles =
                  'border-red-500 bg-red-50 text-red-950 font-bold';
                badgeStyles = 'bg-red-600 text-white';
              } else if (isLocked) {
                buttonStyles =
                  'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed';
                badgeStyles = 'bg-slate-200 text-slate-500';
              }

              return (
                <button
                  key={`${question.item.id}-${opt.label}`}
                  type="button"
                  disabled={isLocked}
                  onClick={() => onSelectOption(idx)}
                  className={`flex min-h-[50px] w-full items-center gap-3.5 rounded-2xl border-2 px-4 py-2.5 text-left text-sm font-semibold transition sm:text-base ${buttonStyles}`}
                >
                  <span
                    className={`font-mono-nums inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold transition ${badgeStyles}`}
                  >
                    {opt.label}
                  </span>
                  <span className="flex-1 leading-snug">{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Rule Reminder */}
      <p className="mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
        One wrong answer restarts the route from Checkpoint 1. Take your time and read carefully.
      </p>
    </section>
  );
};
