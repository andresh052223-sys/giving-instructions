export type GameState =
  | 'START_SCREEN'
  | 'PLAYING'
  | 'CORRECT_ANSWER'
  | 'GAME_OVER'
  | 'VICTORY';

export type DifficultyId = 'EASY' | 'INTERMEDIATE' | 'CHALLENGE';

export type MapId =
  | 'central-town'
  | 'coastal-harbor'
  | 'mountain-village'
  | 'tech-campus'
  | 'historic-downtown';

export type QuestionCategory =
  | 'CATEGORY A – BASIC DIRECTIONS'
  | 'CATEGORY B – MOVEMENT AND NAVIGATION'
  | 'CATEGORY C – PLACES AND LOCATIONS'
  | 'CATEGORY D – MORE COMPLEX INSTRUCTIONS';

export type QuestionTier = 'easy' | 'intermediate' | 'challenge';

export interface QuestionItem {
  id: string;
  category: QuestionCategory;
  tier: QuestionTier;
  spanish: string;
  correctEnglish: string;
  distractors: [string, string, string, string, string];
}

export interface ShuffledOption {
  label: string; // 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  text: string;
  isCorrect: boolean;
}

export interface ActiveQuestion {
  item: QuestionItem;
  options: ShuffledOption[];
}

export interface DifficultyConfig {
  id: DifficultyId;
  title: string;
  subtitle: string;
  checkpoints: number;
  badgeText: string;
  description: string;
}

export interface Point {
  x: number;
  y: number;
}

export type BuildingType =
  | 'school'
  | 'park'
  | 'restaurant'
  | 'supermarket'
  | 'hospital'
  | 'library'
  | 'house'
  | 'bank'
  | 'cafe'
  | 'church'
  | 'station'
  | 'lighthouse'
  | 'aquarium'
  | 'lab'
  | 'museum'
  | 'market'
  | 'cabin'
  | 'destination';

export interface MapBuilding {
  id: string;
  name: string;
  spanishLabel: string;
  x: number;
  y: number;
  width: number;
  height: number;
  roofColor: string;
  wallColor: string;
  accentColor: string;
  type: BuildingType;
  icon?: string;
}

export interface MapWaypoint {
  index: number;
  x: number;
  y: number;
  label: string;
  landmarkHint?: string;
}

export interface MapRoadSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface MapBridge {
  x: number;
  y: number;
  orientation: 'horizontal' | 'vertical';
  label: string;
  style: 'wood' | 'stone' | 'modern';
}

export interface MapTree {
  x: number;
  y: number;
  s: number;
  kind?: 'leaf' | 'pine' | 'palm';
}

export interface MapThemeDefinition {
  id: MapId;
  name: string;
  subtitle: string;
  description: string;
  badgeColor: string;
  groundColor: string;
  dotColor: string;
  meadowColor: string;
  roadColor: string;
  sidewalkColor: string;
  roadStripeColor: string;
  waterKind: 'river-vertical' | 'ocean-east' | 'mountain-stream' | 'campus-pool' | 'canal-diagonal';
  roads: MapRoadSegment[];
  bridges: MapBridge[];
  crosswalks: { x: number; y: number; vertical: boolean }[];
  buildings: MapBuilding[];
  trees: MapTree[];
  streetSign: { x: number; y: number; text: string; color: string };
  startPoint: { x: number; y: number };
  routes: Record<DifficultyId, MapWaypoint[]>;
}

export interface CompletedMissionRecord {
  key: string; // `${mapId}::${difficulty}`
  mapId: MapId;
  mapName: string;
  difficulty: DifficultyId;
  difficultyTitle: string;
  playerName: string;
  correctCount: number;
  totalCheckpoints: number;
  completionSeconds: number;
  completedAt: string;
}
