import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AdventureMap } from './components/AdventureMap';
import { CertificateModal } from './components/CertificateModal';
import { GameHud } from './components/GameHud';
import { QuestionPanel } from './components/QuestionPanel';
import { StartScreen } from './components/StartScreen';
import { VictoryScreen } from './components/VictoryScreen';
import {
  getMapDefinition,
  getWaypointsForMapAndDifficulty,
} from './data/mapLayout';
import {
  DIFFICULTY_CONFIGS,
  generateMissionQuestions,
} from './data/questionBank';
import {
  ActiveQuestion,
  CompletedMissionRecord,
  DifficultyId,
  GameState,
  MapId,
} from './types/game';
import { soundFX } from './utils/soundEffects';

const APP_STORAGE_KEY = 'sena_mission_app_state_v2';

interface SavedActiveSession {
  gameState: GameState;
  mapId: MapId;
  difficulty: DifficultyId;
  questions: ActiveQuestion[];
  currentCheckpointIndex: number;
  characterPositionIndex: number;
  selectedOptionIndex: number | null;
  correctCount: number;
  elapsedSeconds: number;
  completionSeconds: number;
}

interface PersistedAppState {
  registeredPlayerName: string;
  selectedMapId: MapId;
  difficulty: DifficultyId;
  completedRecords: CompletedMissionRecord[];
  activeSession: SavedActiveSession | null;
}

function loadInitialPersistedState(): PersistedAppState {
  const fallback: PersistedAppState = {
    registeredPlayerName: '',
    selectedMapId: 'central-town',
    difficulty: 'EASY',
    completedRecords: [],
    activeSession: null,
  };

  try {
    const raw = window.localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedAppState>;

    let activeSession = parsed.activeSession ?? null;
    if (activeSession && activeSession.questions?.length > 0) {
      const total = DIFFICULTY_CONFIGS[activeSession.difficulty]?.checkpoints ?? 10;
      // If user closed tab during CORRECT_ANSWER transition, settle cleanly into next state
      if (activeSession.gameState === 'CORRECT_ANSWER') {
        const nextPos = activeSession.currentCheckpointIndex + 1;
        if (nextPos >= total) {
          activeSession = {
            ...activeSession,
            gameState: 'VICTORY',
            characterPositionIndex: nextPos,
            completionSeconds: activeSession.elapsedSeconds,
          };
        } else {
          activeSession = {
            ...activeSession,
            gameState: 'PLAYING',
            currentCheckpointIndex: nextPos,
            characterPositionIndex: nextPos,
            selectedOptionIndex: null,
          };
        }
      }
    } else {
      activeSession = null;
    }

    return {
      registeredPlayerName:
        typeof parsed.registeredPlayerName === 'string'
          ? parsed.registeredPlayerName
          : '',
      selectedMapId: parsed.selectedMapId || 'central-town',
      difficulty: parsed.difficulty || 'EASY',
      completedRecords: Array.isArray(parsed.completedRecords)
        ? parsed.completedRecords
        : [],
      activeSession,
    };
  } catch {
    return fallback;
  }
}

export default function App() {
  const initialData = useMemo(() => loadInitialPersistedState(), []);

  // Registered player name (locked for certificate integrity until full app reset)
  const [registeredPlayerName, setRegisteredPlayerName] = useState<string>(
    initialData.registeredPlayerName
  );
  const [selectedMapId, setSelectedMapId] = useState<MapId>(
    initialData.activeSession?.mapId || initialData.selectedMapId
  );
  const [difficulty, setDifficulty] = useState<DifficultyId>(
    initialData.activeSession?.difficulty || initialData.difficulty
  );

  // Centralized Game State Machine (restored seamlessly on reload)
  const [gameState, setGameState] = useState<GameState>(
    initialData.activeSession?.gameState || 'START_SCREEN'
  );
  const [questions, setQuestions] = useState<ActiveQuestion[]>(
    initialData.activeSession?.questions || []
  );
  const [previousQuestionIds, setPreviousQuestionIds] = useState<string[]>(
    initialData.activeSession?.questions.map((q) => q.item.id) || []
  );
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState<number>(
    initialData.activeSession?.currentCheckpointIndex || 0
  );
  const [characterPositionIndex, setCharacterPositionIndex] = useState<number>(
    initialData.activeSession?.characterPositionIndex || 0
  );
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    initialData.activeSession?.selectedOptionIndex ?? null
  );
  const [correctCount, setCorrectCount] = useState<number>(
    initialData.activeSession?.correctCount || 0
  );

  // Completed Levels & Certificate Modal State
  const [completedRecords, setCompletedRecords] = useState<
    CompletedMissionRecord[]
  >(initialData.completedRecords);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Saved paused session when user clicks Main Menu mid-game
  const [pausedSession, setPausedSession] = useState<SavedActiveSession | null>(
    null
  );

  // Timer & Audio State
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(
    initialData.activeSession?.elapsedSeconds || 0
  );
  const [completionSeconds, setCompletionSeconds] = useState<number>(
    initialData.activeSession?.completionSeconds || 0
  );
  const [muted, setMuted] = useState<boolean>(false);

  const advanceTimerRef = useRef<number | null>(null);
  const answerLockRef = useRef<boolean>(false);

  // Persist complete application state & progress continuously
  useEffect(() => {
    try {
      const sessionToSave: SavedActiveSession | null =
        gameState !== 'START_SCREEN' && questions.length > 0
          ? {
              gameState,
              mapId: selectedMapId,
              difficulty,
              questions,
              currentCheckpointIndex,
              characterPositionIndex,
              selectedOptionIndex,
              correctCount,
              elapsedSeconds,
              completionSeconds,
            }
          : pausedSession;

      const payload: PersistedAppState = {
        registeredPlayerName,
        selectedMapId,
        difficulty,
        completedRecords,
        activeSession: sessionToSave,
      };
      window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [
    characterPositionIndex,
    completedRecords,
    completionSeconds,
    correctCount,
    currentCheckpointIndex,
    difficulty,
    elapsedSeconds,
    gameState,
    pausedSession,
    questions,
    registeredPlayerName,
    selectedMapId,
    selectedOptionIndex,
  ]);

  const clearPendingTransition = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearPendingTransition();
  }, [clearPendingTransition]);

  useEffect(() => {
    if (gameState !== 'PLAYING' && gameState !== 'CORRECT_ANSWER') {
      return;
    }
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [gameState]);

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      soundFX.setMuted(next);
      return next;
    });
  }, []);

  const recordCompletedMission = useCallback(
    (
      name: string,
      mapId: MapId,
      level: DifficultyId,
      correct: number,
      total: number,
      durationSecs: number
    ) => {
      const mapDef = getMapDefinition(mapId);
      const levelCfg = DIFFICULTY_CONFIGS[level];
      const key = `${mapId}::${level}`;

      const newRecord: CompletedMissionRecord = {
        key,
        mapId,
        mapName: mapDef.name,
        difficulty: level,
        difficultyTitle: levelCfg.title,
        playerName: name,
        correctCount: correct,
        totalCheckpoints: total,
        completionSeconds: durationSecs,
        completedAt: new Date().toISOString(),
      };

      setCompletedRecords((prev) => {
        const filtered = prev.filter((item) => item.key !== key);
        return [...filtered, newRecord];
      });
    },
    []
  );

  const handleResetAppForNewPlayer = useCallback(
    (newName = '') => {
      clearPendingTransition();
      answerLockRef.current = false;

      setRegisteredPlayerName(newName);
      setSelectedMapId('central-town');
      setDifficulty('EASY');
      setCompletedRecords([]);
      setPausedSession(null);
      setQuestions([]);
      setPreviousQuestionIds([]);
      setCurrentCheckpointIndex(0);
      setCharacterPositionIndex(0);
      setSelectedOptionIndex(null);
      setCorrectCount(0);
      setElapsedSeconds(0);
      setCompletionSeconds(0);
      setIsCertificateOpen(false);
      setGameState('START_SCREEN');

      try {
        window.localStorage.removeItem(APP_STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }
    },
    [clearPendingTransition]
  );

  const launchFreshMission = useCallback(
    (name: string, mapId: MapId, level: DifficultyId) => {
      clearPendingTransition();
      answerLockRef.current = false;

      const cleanedName = name.trim();
      const nextQuestions = generateMissionQuestions(
        level,
        previousQuestionIds
      );
      setPreviousQuestionIds(nextQuestions.map((q) => q.item.id));

      // Lock initial player name on first mission start
      setRegisteredPlayerName((prev) => prev || cleanedName);
      setPausedSession(null);
      setSelectedMapId(mapId);
      setDifficulty(level);
      setQuestions(nextQuestions);
      setCurrentCheckpointIndex(0);
      setCharacterPositionIndex(0);
      setSelectedOptionIndex(null);
      setCorrectCount(0);
      setElapsedSeconds(0);
      setCompletionSeconds(0);
      setGameState('PLAYING');

      soundFX.playStartMission();
    },
    [clearPendingTransition, previousQuestionIds]
  );

  const handleResumeMission = useCallback(() => {
    if (!pausedSession) return;
    clearPendingTransition();
    answerLockRef.current = false;

    setSelectedMapId(pausedSession.mapId);
    setDifficulty(pausedSession.difficulty);
    setQuestions(pausedSession.questions);
    setCurrentCheckpointIndex(pausedSession.currentCheckpointIndex);
    setCharacterPositionIndex(pausedSession.characterPositionIndex);
    setSelectedOptionIndex(pausedSession.selectedOptionIndex);
    setCorrectCount(pausedSession.correctCount);
    setElapsedSeconds(pausedSession.elapsedSeconds);
    setCompletionSeconds(pausedSession.completionSeconds);
    setGameState(pausedSession.gameState);
    setPausedSession(null);
  }, [clearPendingTransition, pausedSession]);

  const handleRestartMission = useCallback(() => {
    launchFreshMission(registeredPlayerName, selectedMapId, difficulty);
  }, [launchFreshMission, registeredPlayerName, selectedMapId, difficulty]);

  const handleBackToMenu = useCallback(() => {
    clearPendingTransition();
    answerLockRef.current = false;

    // Preserve active mission if player is mid-route so progress is never lost
    if (gameState === 'PLAYING' && questions.length > 0) {
      setPausedSession({
        gameState: 'PLAYING',
        mapId: selectedMapId,
        difficulty,
        questions,
        currentCheckpointIndex,
        characterPositionIndex,
        selectedOptionIndex: null,
        correctCount,
        elapsedSeconds,
        completionSeconds: 0,
      });
    } else {
      setPausedSession(null);
    }

    setQuestions([]);
    setCurrentCheckpointIndex(0);
    setCharacterPositionIndex(0);
    setSelectedOptionIndex(null);
    setCorrectCount(0);
    setElapsedSeconds(0);
    setCompletionSeconds(0);
    setGameState('START_SCREEN');
  }, [
    characterPositionIndex,
    clearPendingTransition,
    correctCount,
    currentCheckpointIndex,
    difficulty,
    elapsedSeconds,
    gameState,
    questions,
    selectedMapId,
  ]);

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (gameState !== 'PLAYING' || answerLockRef.current) {
        return;
      }
      const activeQuestion = questions[currentCheckpointIndex];
      if (!activeQuestion) return;

      const chosen = activeQuestion.options[optionIndex];
      if (!chosen) return;

      answerLockRef.current = true;
      setSelectedOptionIndex(optionIndex);

      if (chosen.isCorrect) {
        const nextPos = currentCheckpointIndex + 1;
        const total = DIFFICULTY_CONFIGS[difficulty].checkpoints;
        const nextCorrectCount = correctCount + 1;

        setGameState('CORRECT_ANSWER');
        setCorrectCount(nextCorrectCount);
        setCharacterPositionIndex(nextPos);

        soundFX.playCorrect();
        soundFX.playMoveStep();

        clearPendingTransition();
        advanceTimerRef.current = window.setTimeout(() => {
          if (nextPos >= total) {
            setCompletionSeconds(elapsedSeconds);
            setPausedSession(null);
            recordCompletedMission(
              registeredPlayerName,
              selectedMapId,
              difficulty,
              nextCorrectCount,
              total,
              elapsedSeconds
            );
            setGameState('VICTORY');
            soundFX.playVictory();
            answerLockRef.current = false;
          } else {
            setCurrentCheckpointIndex(nextPos);
            setSelectedOptionIndex(null);
            setGameState('PLAYING');
            answerLockRef.current = false;
          }
        }, 1250);
      } else {
        setPausedSession(null);
        setGameState('GAME_OVER');
        soundFX.playWrong();
      }
    },
    [
      clearPendingTransition,
      correctCount,
      currentCheckpointIndex,
      difficulty,
      elapsedSeconds,
      gameState,
      questions,
      recordCompletedMission,
      registeredPlayerName,
      selectedMapId,
    ]
  );

  const waypoints = useMemo(
    () => getWaypointsForMapAndDifficulty(selectedMapId, difficulty),
    [selectedMapId, difficulty]
  );

  const totalCheckpoints = DIFFICULTY_CONFIGS[difficulty].checkpoints;
  const activeQuestion = questions[currentCheckpointIndex];
  const nextWaypointHint =
    waypoints[Math.min(currentCheckpointIndex + 1, waypoints.length - 1)]
      ?.landmarkHint;

  const resumableSummary = pausedSession
    ? {
        mapId: pausedSession.mapId,
        difficulty: pausedSession.difficulty,
        checkpointNumber: pausedSession.currentCheckpointIndex + 1,
        totalCheckpoints:
          DIFFICULTY_CONFIGS[pausedSession.difficulty].checkpoints,
      }
    : null;

  return (
    <>
      {gameState === 'START_SCREEN' ? (
        <StartScreen
          registeredPlayerName={registeredPlayerName}
          initialMapId={selectedMapId}
          initialDifficulty={difficulty}
          completedRecords={completedRecords}
          resumableMission={resumableSummary}
          muted={muted}
          onToggleMute={handleToggleMute}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          onResumeMission={handleResumeMission}
          onStartMission={launchFreshMission}
          onResetAppForNewPlayer={handleResetAppForNewPlayer}
        />
      ) : gameState === 'VICTORY' ? (
        <VictoryScreen
          playerName={registeredPlayerName}
          mapId={selectedMapId}
          difficulty={difficulty}
          correctCount={correctCount}
          totalCheckpoints={totalCheckpoints}
          completionSeconds={completionSeconds}
          completedRecords={completedRecords}
          onPlayAgain={handleRestartMission}
          onBackToMenu={handleBackToMenu}
          onOpenCertificate={() => setIsCertificateOpen(true)}
        />
      ) : (
        <div className="min-h-screen bg-[#EEF4F0] text-slate-900">
          <GameHud
            playerName={registeredPlayerName}
            mapId={selectedMapId}
            difficulty={difficulty}
            currentCheckpointIndex={currentCheckpointIndex}
            totalCheckpoints={totalCheckpoints}
            correctCount={correctCount}
            elapsedSeconds={elapsedSeconds}
            gameState={gameState}
            muted={muted}
            onToggleMute={handleToggleMute}
            onBackToMenu={handleBackToMenu}
          />

          <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:py-6">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7 xl:col-span-7">
                <AdventureMap
                  mapId={selectedMapId}
                  difficulty={difficulty}
                  characterPositionIndex={characterPositionIndex}
                  gameState={gameState}
                  playerName={registeredPlayerName}
                />
              </div>

              <div className="lg:col-span-5 xl:col-span-5">
                {activeQuestion && (
                  <QuestionPanel
                    question={activeQuestion}
                    checkpointNumber={currentCheckpointIndex + 1}
                    totalCheckpoints={totalCheckpoints}
                    gameState={gameState}
                    selectedOptionIndex={selectedOptionIndex}
                    landmarkHint={nextWaypointHint}
                    onSelectOption={handleSelectOption}
                    onRestartMission={handleRestartMission}
                    onBackToMenu={handleBackToMenu}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      <CertificateModal
        isOpen={isCertificateOpen}
        lockedPlayerName={registeredPlayerName}
        records={completedRecords}
        onClose={() => setIsCertificateOpen(false)}
      />
    </>
  );
}
