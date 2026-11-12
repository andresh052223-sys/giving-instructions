import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Compass,
  MapPin,
  Play,
  RotateCcw,
  ShieldCheck,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { MAP_LIST, getMapDefinition } from '../data/mapLayout';
import { DIFFICULTY_CONFIGS } from '../data/questionBank';
import {
  CompletedMissionRecord,
  DifficultyId,
  MapId,
} from '../types/game';
import { AdventureMap } from './AdventureMap';
import { ExplorerAvatar } from './ExplorerAvatar';

interface ResumableMissionSummary {
  mapId: MapId;
  difficulty: DifficultyId;
  checkpointNumber: number;
  totalCheckpoints: number;
}

interface StartScreenProps {
  registeredPlayerName: string;
  initialMapId: MapId;
  initialDifficulty: DifficultyId;
  completedRecords: CompletedMissionRecord[];
  resumableMission: ResumableMissionSummary | null;
  muted: boolean;
  onToggleMute: () => void;
  onOpenCertificate: () => void;
  onResumeMission: () => void;
  onStartMission: (
    playerName: string,
    mapId: MapId,
    difficulty: DifficultyId
  ) => void;
  onResetAppForNewPlayer: (newName?: string) => void;
}

const HOW_TO_PLAY_STEPS = [
  'Follow the route on the map.',
  'Read each instruction in Spanish.',
  'Choose the correct instruction in English.',
  'If your answer is correct, move to the next checkpoint.',
  'If your answer is incorrect, restart the mission.',
  'Complete the entire route to win!',
];

const LEVEL_ABBR: Record<DifficultyId, string> = {
  EASY: 'L1',
  INTERMEDIATE: 'L2',
  CHALLENGE: 'L3',
};

export const StartScreen: React.FC<StartScreenProps> = ({
  registeredPlayerName,
  initialMapId,
  initialDifficulty,
  completedRecords,
  resumableMission,
  muted,
  onToggleMute,
  onOpenCertificate,
  onResumeMission,
  onStartMission,
  onResetAppForNewPlayer,
}) => {
  const [nameInput, setNameInput] = useState(registeredPlayerName);
  const [selectedMapId, setSelectedMapId] = useState<MapId>(initialMapId);
  const [difficulty, setDifficulty] = useState<DifficultyId>(initialDifficulty);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    setNameInput(registeredPlayerName);
  }, [registeredPlayerName]);

  const activeMapDef = getMapDefinition(selectedMapId);
  const cleanedInput = nameInput.trim();
  const hasRegisteredPlayer = registeredPlayerName.trim().length > 0;
  const isNameChanged =
    hasRegisteredPlayer &&
    cleanedInput.length > 0 &&
    cleanedInput.toLowerCase() !== registeredPlayerName.trim().toLowerCase();

  const isCompleted = (mId: MapId, diff: DifficultyId) =>
    completedRecords.some((r) => r.mapId === mId && r.difficulty === diff);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanedInput) {
      setNameError('Please enter your name to begin the mission.');
      return;
    }
    setNameError('');

    if (isNameChanged) {
      // Changing apprentice name resets all prior progress and restarts cleanly
      onResetAppForNewPlayer(cleanedInput);
      return;
    }

    onStartMission(cleanedInput, selectedMapId, difficulty);
  };

  return (
    <div className="min-h-screen bg-[#EEF4F0] text-slate-900">
      {/* Top Bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <Compass className="h-6 w-6 text-emerald-600" />
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
              MISSION: FOLLOW THE INSTRUCTIONS!
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-slate-600">
            <span className="whitespace-nowrap">5 Adventure Maps</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">3 Levels per Map</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-nums whitespace-nowrap font-semibold text-emerald-700">
              {completedRecords.length} / 15 Completed
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenCertificate}
              className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition whitespace-nowrap ${
                completedRecords.length > 0
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Award className="h-4 w-4 text-emerald-600" />
              <span>Certificate ({completedRecords.length})</span>
            </button>

            <button
              type="button"
              onClick={onToggleMute}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 whitespace-nowrap"
              aria-label={muted ? 'Unmute game sounds' : 'Mute game sounds'}
            >
              {muted ? (
                <>
                  <VolumeX className="h-4 w-4 text-slate-500" />
                  <span className="hidden sm:inline">Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 text-emerald-600" />
                  <span className="hidden sm:inline">Sound On</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:py-8">
        <div className="grid grid-cols-1 items-stretch gap-7 lg:grid-cols-12">
          {/* Left Column: Setup Form & Instructions */}
          <section className="flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7 lg:col-span-5">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50">
                  <ExplorerAvatar size={56} mood="ready" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    Learn English while exploring!
                  </p>
                  <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-slate-900 text-balance">
                    MISSION: FOLLOW THE INSTRUCTIONS!
                  </h1>
                </div>
              </div>

              {/* Saved In-Progress Mission Banner */}
              {resumableMission && !isNameChanged && (
                <div className="mt-5 rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold text-blue-800">
                        Saved mission in progress
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-slate-900">
                        {getMapDefinition(resumableMission.mapId).name} ·{' '}
                        {DIFFICULTY_CONFIGS[resumableMission.difficulty].title}
                      </p>
                      <p className="font-mono-nums text-xs font-semibold text-slate-600">
                        Checkpoint {resumableMission.checkpointNumber} /{' '}
                        {resumableMission.totalCheckpoints}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onResumeMission}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-display text-sm font-extrabold text-white transition hover:bg-blue-700 whitespace-nowrap"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      <span>Resume Mission</span>
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                {/* Player Name Input */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="player-name-input"
                      className="block text-sm font-bold text-slate-800"
                    >
                      Enter your name
                    </label>
                    {hasRegisteredPlayer && (
                      <button
                        type="button"
                        onClick={() => onResetAppForNewPlayer('')}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-600"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>New player / Reset</span>
                      </button>
                    )}
                  </div>
                  <input
                    id="player-name-input"
                    type="text"
                    maxLength={28}
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="e.g., Sofía Martínez"
                    className="mt-1.5 w-full min-h-[46px] rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2.5 text-base font-medium text-slate-900 placeholder:text-slate-400 transition focus:border-emerald-600 focus:bg-white focus:outline-none"
                  />
                  {nameError && (
                    <p className="mt-1.5 text-sm font-semibold text-red-600">
                      {nameError}
                    </p>
                  )}

                  {isNameChanged && (
                    <div className="mt-2 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <span>
                        Changing the apprentice name will reset all previous progress and restart the application from zero.
                      </span>
                    </div>
                  )}
                </div>

                {/* 5-Map Selector */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="block text-sm font-bold text-slate-800">
                      1. Choose an adventure map (5 maps)
                    </span>
                    <span className="font-mono-nums text-xs font-semibold text-slate-500">
                      {isNameChanged ? 0 : completedRecords.length}/15 cleared
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {MAP_LIST.map((m) => {
                      const active = selectedMapId === m.id;
                      const doneCount = isNameChanged
                        ? 0
                        : (
                            [
                              'EASY',
                              'INTERMEDIATE',
                              'CHALLENGE',
                            ] as DifficultyId[]
                          ).filter((d) => isCompleted(m.id, d)).length;

                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedMapId(m.id)}
                          className={`flex min-h-[58px] flex-col justify-between rounded-xl border-2 px-3.5 py-2.5 text-left transition ${
                            active
                              ? 'border-blue-600 bg-blue-50/80 text-slate-900'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="font-display text-sm font-extrabold truncate">
                              {m.name}
                            </span>
                            <span className="font-mono-nums shrink-0 text-[11px] font-bold text-slate-500">
                              {doneCount}/3
                            </span>
                          </div>
                          <div className="mt-1 flex w-full items-center justify-between gap-2">
                            <span className="text-xs text-slate-600 truncate">
                              {m.subtitle}
                            </span>
                            <span className="flex shrink-0 items-center gap-1">
                              {(
                                [
                                  'EASY',
                                  'INTERMEDIATE',
                                  'CHALLENGE',
                                ] as DifficultyId[]
                              ).map((lvl) => {
                                const done =
                                  !isNameChanged && isCompleted(m.id, lvl);
                                return (
                                  <span
                                    key={lvl}
                                    title={`${DIFFICULTY_CONFIGS[lvl].title}${
                                      done ? ' (Completed)' : ''
                                    }`}
                                    className={`font-mono-nums inline-flex h-4 items-center justify-center rounded px-1 text-[10px] font-bold ${
                                      done
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-200 text-slate-600'
                                    }`}
                                  >
                                    {LEVEL_ABBR[lvl]}
                                  </span>
                                );
                              })}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3-Level Difficulty Selector */}
                <div>
                  <span className="block text-sm font-bold text-slate-800">
                    2. Choose mission level (3 levels per map)
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    {(Object.keys(DIFFICULTY_CONFIGS) as DifficultyId[]).map(
                      (id) => {
                        const cfg = DIFFICULTY_CONFIGS[id];
                        const isSelected = difficulty === id;
                        const clearedOnMap =
                          !isNameChanged && isCompleted(selectedMapId, id);

                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setDifficulty(id)}
                            className={`flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-2.5 text-left transition ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-50 text-slate-900'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-display text-sm font-extrabold tracking-wide">
                                  {cfg.title}
                                </span>
                                {clearedOnMap && (
                                  <CheckCircle2
                                    className="h-4 w-4 shrink-0 text-emerald-600"
                                    aria-label="Completed"
                                  />
                                )}
                              </div>
                              <div className="text-xs text-slate-600">
                                {cfg.description}
                              </div>
                            </div>
                            <span
                              className={`shrink-0 font-mono-nums text-xs font-bold whitespace-nowrap ${
                                isSelected
                                  ? 'text-emerald-700'
                                  : 'text-slate-500'
                              }`}
                            >
                              {cfg.checkpoints} steps
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Primary Start / Switch Player CTA */}
                {isNameChanged ? (
                  <button
                    type="submit"
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-amber-600 px-6 py-3 font-display text-base font-extrabold text-white shadow-sm transition hover:bg-amber-700 active:scale-[0.99]"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>CHANGE NAME &amp; RESTART APP</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-3 font-display text-lg font-extrabold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    <span>START MISSION</span>
                  </button>
                )}
              </form>
            </div>

            {/* How to Play Box */}
            <div className="mt-6 border-t border-slate-200 pt-5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>How to play</span>
              </div>
              <ol className="mt-2.5 grid grid-cols-1 gap-1.5 text-xs text-slate-700 sm:grid-cols-2 sm:text-sm">
                {HOW_TO_PLAY_STEPS.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="font-mono-nums mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-700">
                      {index + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Right Column: Live Selected Map Preview */}
          <section className="flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-extrabold text-slate-900">
                  {activeMapDef.name} — {activeMapDef.subtitle}
                </h2>
                <p className="text-sm text-slate-600">
                  {activeMapDef.description}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                <MapPin className="h-4 w-4" />
                <span className="font-mono-nums">
                  {DIFFICULTY_CONFIGS[difficulty].checkpoints} Checkpoints
                </span>
              </div>
            </div>

            <AdventureMap
              mapId={selectedMapId}
              difficulty={difficulty}
              characterPositionIndex={0}
              gameState="START_SCREEN"
              playerName={registeredPlayerName || cleanedInput || 'Explorer'}
              isPreview={true}
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs font-medium text-slate-600">
              <div className="flex flex-wrap items-center gap-2">
                <span>Progress saved automatically</span>
                <span aria-hidden="true">·</span>
                <span>Certificate locked to initial name</span>
              </div>
              {completedRecords.length > 0 && !isNameChanged && (
                <button
                  type="button"
                  onClick={onOpenCertificate}
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:underline"
                >
                  <Award className="h-4 w-4" />
                  <span>Download activity certificate</span>
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
