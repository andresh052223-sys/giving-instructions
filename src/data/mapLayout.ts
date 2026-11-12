import {
  DifficultyId,
  MapBuilding,
  MapId,
  MapThemeDefinition,
  MapWaypoint,
} from '../types/game';

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 680;

const STANDARD_ROADS = [
  { x1: 120, y1: 110, x2: 120, y2: 630 },
  { x1: 380, y1: 110, x2: 380, y2: 570 },
  { x1: 640, y1: 110, x2: 640, y2: 570 },
  { x1: 905, y1: 110, x2: 905, y2: 570 },
  { x1: 110, y1: 120, x2: 920, y2: 120 },
  { x1: 110, y1: 340, x2: 920, y2: 340 },
  { x1: 110, y1: 560, x2: 650, y2: 560 },
];

const STANDARD_CROSSWALKS = [
  { x: 152, y: 340, vertical: false },
  { x: 348, y: 340, vertical: false },
  { x: 412, y: 340, vertical: false },
  { x: 380, y: 152, vertical: true },
  { x: 640, y: 372, vertical: true },
];

// Shared orthogonal route templates matching the road grid across maps,
// plus map-specific variations so every map feels fresh and authentic!
const TOWN_ROUTES: Record<DifficultyId, MapWaypoint[]> = {
  EASY: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Explorer Base' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'South-West Corner' },
    { index: 2, x: 120, y: 340, label: 'CP 2', landmarkHint: 'Café Corner' },
    { index: 3, x: 380, y: 340, label: 'CP 3', landmarkHint: 'Central Intersection' },
    { index: 4, x: 380, y: 120, label: 'CP 4', landmarkHint: 'School Corner' },
    { index: 5, x: 515, y: 120, label: 'CP 5', landmarkHint: 'School Entrance' },
    { index: 6, x: 640, y: 120, label: 'CP 6', landmarkHint: 'Library Avenue' },
    { index: 7, x: 640, y: 340, label: 'CP 7', landmarkHint: 'Bank & Hospital' },
    { index: 8, x: 760, y: 340, label: 'CP 8', landmarkHint: 'South Bridge' },
    { index: 9, x: 905, y: 340, label: 'CP 9', landmarkHint: 'East Avenue' },
    { index: 10, x: 905, y: 120, label: 'GOAL', landmarkHint: 'Final Destination' },
  ],
  INTERMEDIATE: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Explorer Base' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'South-West Corner' },
    { index: 2, x: 120, y: 340, label: 'CP 2', landmarkHint: 'Café Corner' },
    { index: 3, x: 120, y: 120, label: 'CP 3', landmarkHint: 'Houses Corner' },
    { index: 4, x: 255, y: 120, label: 'CP 4', landmarkHint: 'North Street' },
    { index: 5, x: 380, y: 120, label: 'CP 5', landmarkHint: 'School Intersection' },
    { index: 6, x: 380, y: 235, label: 'CP 6', landmarkHint: 'Supermarket East' },
    { index: 7, x: 380, y: 340, label: 'CP 7', landmarkHint: 'Central Crosswalk' },
    { index: 8, x: 380, y: 560, label: 'CP 8', landmarkHint: 'Church & Station' },
    { index: 9, x: 520, y: 560, label: 'CP 9', landmarkHint: 'Station Front' },
    { index: 10, x: 640, y: 560, label: 'CP 10', landmarkHint: 'South-East Turn' },
    { index: 11, x: 640, y: 340, label: 'CP 11', landmarkHint: 'Hospital Square' },
    { index: 12, x: 640, y: 230, label: 'CP 12', landmarkHint: 'Bank Corner' },
    { index: 13, x: 640, y: 120, label: 'CP 13', landmarkHint: 'Library Corner' },
    { index: 14, x: 760, y: 120, label: 'CP 14', landmarkHint: 'North River Bridge' },
    { index: 15, x: 905, y: 120, label: 'GOAL', landmarkHint: 'Final Destination' },
  ],
  CHALLENGE: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Explorer Base' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'South-West Corner' },
    { index: 2, x: 120, y: 450, label: 'CP 2', landmarkHint: 'West Avenue' },
    { index: 3, x: 120, y: 340, label: 'CP 3', landmarkHint: 'Café Corner' },
    { index: 4, x: 120, y: 230, label: 'CP 4', landmarkHint: 'Supermarket Gate' },
    { index: 5, x: 120, y: 120, label: 'CP 5', landmarkHint: 'North-West Corner' },
    { index: 6, x: 250, y: 120, label: 'CP 6', landmarkHint: 'Houses Lane' },
    { index: 7, x: 380, y: 120, label: 'CP 7', landmarkHint: 'School Corner' },
    { index: 8, x: 380, y: 230, label: 'CP 8', landmarkHint: 'Park West Gate' },
    { index: 9, x: 510, y: 230, label: 'CP 9', landmarkHint: 'Park Fountain' },
    { index: 10, x: 510, y: 340, label: 'CP 10', landmarkHint: 'Park South Gate' },
    { index: 11, x: 380, y: 340, label: 'CP 11', landmarkHint: 'Central Crosswalk' },
    { index: 12, x: 380, y: 455, label: 'CP 12', landmarkHint: 'Restaurant Sidewalk' },
    { index: 13, x: 380, y: 560, label: 'CP 13', landmarkHint: 'Station Intersection' },
    { index: 14, x: 525, y: 560, label: 'CP 14', landmarkHint: 'South Boulevard' },
    { index: 15, x: 640, y: 560, label: 'CP 15', landmarkHint: 'Hospital Corner' },
    { index: 16, x: 640, y: 340, label: 'CP 16', landmarkHint: 'Main Crossroads' },
    { index: 17, x: 760, y: 340, label: 'CP 17', landmarkHint: 'South River Bridge' },
    { index: 18, x: 905, y: 340, label: 'CP 18', landmarkHint: 'East Avenue' },
    { index: 19, x: 905, y: 230, label: 'CP 19', landmarkHint: 'Riverside Boulevard' },
    { index: 20, x: 905, y: 120, label: 'GOAL', landmarkHint: 'Final Destination' },
  ],
};

// Coastal Harbor routes: Start at South Pier (120, 625), navigate across boardwalks & bridges to Lighthouse Plaza (905, 340)
const HARBOR_ROUTES: Record<DifficultyId, MapWaypoint[]> = {
  EASY: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Harbor Gate' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'Ferry Corner' },
    { index: 2, x: 380, y: 560, label: 'CP 2', landmarkHint: 'Boardwalk South' },
    { index: 3, x: 640, y: 560, label: 'CP 3', landmarkHint: 'South Quay' },
    { index: 4, x: 640, y: 340, label: 'CP 4', landmarkHint: 'Bay Crossroads' },
    { index: 5, x: 380, y: 340, label: 'CP 5', landmarkHint: 'Seafood Plaza' },
    { index: 6, x: 380, y: 120, label: 'CP 6', landmarkHint: 'Aquarium Front' },
    { index: 7, x: 640, y: 120, label: 'CP 7', landmarkHint: 'Naval Museum' },
    { index: 8, x: 760, y: 120, label: 'CP 8', landmarkHint: 'Harbor Bridge' },
    { index: 9, x: 905, y: 120, label: 'CP 9', landmarkHint: 'Sunset Pier' },
    { index: 10, x: 905, y: 340, label: 'GOAL', landmarkHint: 'Lighthouse Plaza' },
  ],
  INTERMEDIATE: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Harbor Gate' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'Ferry Corner' },
    { index: 2, x: 250, y: 560, label: 'CP 2', landmarkHint: 'Beach Houses' },
    { index: 3, x: 380, y: 560, label: 'CP 3', landmarkHint: 'Boardwalk South' },
    { index: 4, x: 640, y: 560, label: 'CP 4', landmarkHint: 'Coast Guard Corner' },
    { index: 5, x: 640, y: 445, label: 'CP 5', landmarkHint: 'Coastal Clinic' },
    { index: 6, x: 640, y: 340, label: 'CP 6', landmarkHint: 'Harbor Square' },
    { index: 7, x: 380, y: 340, label: 'CP 7', landmarkHint: 'Seafood Corner' },
    { index: 8, x: 120, y: 340, label: 'CP 8', landmarkHint: 'Marina Café' },
    { index: 9, x: 120, y: 120, label: 'CP 9', landmarkHint: 'Market North' },
    { index: 10, x: 380, y: 120, label: 'CP 10', landmarkHint: 'Aquarium Entrance' },
    { index: 11, x: 640, y: 120, label: 'CP 11', landmarkHint: 'Museum Corner' },
    { index: 12, x: 760, y: 120, label: 'CP 12', landmarkHint: 'North Pier Bridge' },
    { index: 13, x: 905, y: 120, label: 'CP 13', landmarkHint: 'Island Turn' },
    { index: 14, x: 905, y: 230, label: 'CP 14', landmarkHint: 'Ocean Walkway' },
    { index: 15, x: 905, y: 340, label: 'GOAL', landmarkHint: 'Lighthouse Plaza' },
  ],
  CHALLENGE: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Harbor Gate' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'Ferry Corner' },
    { index: 2, x: 250, y: 560, label: 'CP 2', landmarkHint: 'Beach Cottages' },
    { index: 3, x: 380, y: 560, label: 'CP 3', landmarkHint: 'Ferry Station' },
    { index: 4, x: 380, y: 450, label: 'CP 4', landmarkHint: 'Seafood Alley' },
    { index: 5, x: 380, y: 340, label: 'CP 5', landmarkHint: 'Central Boardwalk' },
    { index: 6, x: 120, y: 340, label: 'CP 6', landmarkHint: 'Marina Café' },
    { index: 7, x: 120, y: 230, label: 'CP 7', landmarkHint: 'Harbor Market' },
    { index: 8, x: 120, y: 120, label: 'CP 8', landmarkHint: 'North-West Quay' },
    { index: 9, x: 250, y: 120, label: 'CP 9', landmarkHint: 'Fisherman Row' },
    { index: 10, x: 380, y: 120, label: 'CP 10', landmarkHint: 'Aquarium Gate' },
    { index: 11, x: 380, y: 230, label: 'CP 11', landmarkHint: 'Bay Park Path' },
    { index: 12, x: 510, y: 230, label: 'CP 12', landmarkHint: 'Bay Fountain' },
    { index: 13, x: 510, y: 340, label: 'CP 13', landmarkHint: 'Bay South Gate' },
    { index: 14, x: 640, y: 340, label: 'CP 14', landmarkHint: 'Pier Junction' },
    { index: 15, x: 640, y: 560, label: 'CP 15', landmarkHint: 'South Quay' },
    { index: 16, x: 640, y: 120, label: 'CP 16', landmarkHint: 'Museum Corner' },
    { index: 17, x: 760, y: 120, label: 'CP 17', landmarkHint: 'North Pier Bridge' },
    { index: 18, x: 905, y: 120, label: 'CP 18', landmarkHint: 'Sunset Cove' },
    { index: 19, x: 905, y: 230, label: 'CP 19', landmarkHint: 'Lighthouse Path' },
    { index: 20, x: 905, y: 340, label: 'GOAL', landmarkHint: 'Lighthouse Plaza' },
  ],
};

// Mountain Village routes: Start at Valley Trailhead (120, 625) -> Summit Overlook (905, 120)
const MOUNTAIN_ROUTES: Record<DifficultyId, MapWaypoint[]> = {
  EASY: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Trailhead' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'Village Gate' },
    { index: 2, x: 380, y: 560, label: 'CP 2', landmarkHint: 'Ranger Station' },
    { index: 3, x: 640, y: 560, label: 'CP 3', landmarkHint: 'Clinic Turn' },
    { index: 4, x: 640, y: 340, label: 'CP 4', landmarkHint: 'Lodge Square' },
    { index: 5, x: 380, y: 340, label: 'CP 5', landmarkHint: 'Bakery Corner' },
    { index: 6, x: 380, y: 120, label: 'CP 6', landmarkHint: 'Village School' },
    { index: 7, x: 640, y: 120, label: 'CP 7', landmarkHint: 'Alpine Library' },
    { index: 8, x: 640, y: 340, label: 'CP 8', landmarkHint: 'Timber Crossroads' },
    { index: 9, x: 905, y: 340, label: 'CP 9', landmarkHint: 'Pine Ridge' },
    { index: 10, x: 905, y: 120, label: 'GOAL', landmarkHint: 'Summit Overlook' },
  ],
  INTERMEDIATE: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Trailhead' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'Village Gate' },
    { index: 2, x: 250, y: 560, label: 'CP 2', landmarkHint: 'Old Chapel' },
    { index: 3, x: 380, y: 560, label: 'CP 3', landmarkHint: 'Ranger Corner' },
    { index: 4, x: 380, y: 340, label: 'CP 4', landmarkHint: 'Town Crosswalk' },
    { index: 5, x: 120, y: 340, label: 'CP 5', landmarkHint: 'Bakery Café' },
    { index: 6, x: 120, y: 230, label: 'CP 6', landmarkHint: 'Stream Bridge' },
    { index: 7, x: 120, y: 120, label: 'CP 7', landmarkHint: 'Cozy Cabins' },
    { index: 8, x: 380, y: 120, label: 'CP 8', landmarkHint: 'Village School' },
    { index: 9, x: 640, y: 120, label: 'CP 9', landmarkHint: 'Alpine Library' },
    { index: 10, x: 640, y: 340, label: 'CP 10', landmarkHint: 'Timber Lodge' },
    { index: 11, x: 640, y: 560, label: 'CP 11', landmarkHint: 'South Meadow' },
    { index: 12, x: 640, y: 340, label: 'CP 12', landmarkHint: 'Creek Crossroads' },
    { index: 13, x: 905, y: 340, label: 'CP 13', landmarkHint: 'East Bridge' },
    { index: 14, x: 905, y: 230, label: 'CP 14', landmarkHint: 'Summit Climb' },
    { index: 15, x: 905, y: 120, label: 'GOAL', landmarkHint: 'Summit Overlook' },
  ],
  CHALLENGE: TOWN_ROUTES.CHALLENGE.map((wp, idx) => ({
    ...wp,
    landmarkHint:
      idx === 0
        ? 'Trailhead'
        : idx === 20
        ? 'Summit Overlook'
        : `Alpine Point ${idx}`,
  })),
};

// Tech Campus routes
const CAMPUS_ROUTES: Record<DifficultyId, MapWaypoint[]> = {
  EASY: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Campus Gate' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'Auditorium Corner' },
    { index: 2, x: 120, y: 340, label: 'CP 2', landmarkHint: 'Campus Cafeteria' },
    { index: 3, x: 120, y: 120, label: 'CP 3', landmarkHint: 'Design Studio' },
    { index: 4, x: 380, y: 120, label: 'CP 4', landmarkHint: 'Engineering School' },
    { index: 5, x: 380, y: 340, label: 'CP 5', landmarkHint: 'Central Quad' },
    { index: 6, x: 640, y: 340, label: 'CP 6', landmarkHint: 'Robotics Hall' },
    { index: 7, x: 640, y: 120, label: 'CP 7', landmarkHint: 'Digital Library' },
    { index: 8, x: 760, y: 120, label: 'CP 8', landmarkHint: 'Solar Walk' },
    { index: 9, x: 905, y: 120, label: 'CP 9', landmarkHint: 'North Tech Plaza' },
    { index: 10, x: 905, y: 340, label: 'GOAL', landmarkHint: 'Graduation Pavilion' },
  ],
  INTERMEDIATE: [
    { index: 0, x: 120, y: 625, label: 'START', landmarkHint: 'Campus Gate' },
    { index: 1, x: 120, y: 560, label: 'CP 1', landmarkHint: 'Auditorium Corner' },
    { index: 2, x: 380, y: 560, label: 'CP 2', landmarkHint: 'Student Hub' },
    { index: 3, x: 640, y: 560, label: 'CP 3', landmarkHint: 'Wellness Corner' },
    { index: 4, x: 640, y: 340, label: 'CP 4', landmarkHint: 'Wellness Center' },
    { index: 5, x: 380, y: 340, label: 'CP 5', landmarkHint: 'Robotics Gate' },
    { index: 6, x: 120, y: 340, label: 'CP 6', landmarkHint: 'Cafeteria Corner' },
    { index: 7, x: 120, y: 120, label: 'CP 7', landmarkHint: 'Design Corner' },
    { index: 8, x: 380, y: 120, label: 'CP 8', landmarkHint: 'Engineering School' },
    { index: 9, x: 380, y: 235, label: 'CP 9', landmarkHint: 'Green Quad' },
    { index: 10, x: 510, y: 235, label: 'CP 10', landmarkHint: 'Campus Plaza' },
    { index: 11, x: 510, y: 120, label: 'CP 11', landmarkHint: 'North Avenue' },
    { index: 12, x: 640, y: 120, label: 'CP 12', landmarkHint: 'Digital Library' },
    { index: 13, x: 905, y: 120, label: 'CP 13', landmarkHint: 'Innovation Corner' },
    { index: 14, x: 905, y: 230, label: 'CP 14', landmarkHint: 'Tech Boulevard' },
    { index: 15, x: 905, y: 340, label: 'GOAL', landmarkHint: 'Graduation Pavilion' },
  ],
  CHALLENGE: HARBOR_ROUTES.CHALLENGE.map((wp, idx) => ({
    ...wp,
    landmarkHint:
      idx === 0
        ? 'Campus Gate'
        : idx === 20
        ? 'Graduation Pavilion'
        : `Campus Stop ${idx}`,
  })),
};

// Fix CAMPUS_ROUTES.INTERMEDIATE step 10->11: (510,235)->(510,120) is vertical, (510,120)->(640,120) is horizontal! All orthogonal!

// Historic Downtown routes
const DOWNTOWN_ROUTES: Record<DifficultyId, MapWaypoint[]> = {
  EASY: TOWN_ROUTES.EASY.map((wp, idx) => ({
    ...wp,
    landmarkHint:
      idx === 0
        ? 'Old Gate'
        : idx === 10
        ? 'Triumph Arch'
        : `Heritage Stop ${idx}`,
  })),
  INTERMEDIATE: TOWN_ROUTES.INTERMEDIATE.map((wp, idx) => ({
    ...wp,
    landmarkHint:
      idx === 0
        ? 'Old Gate'
        : idx === 15
        ? 'Triumph Arch'
        : `Plaza Stop ${idx}`,
  })),
  CHALLENGE: TOWN_ROUTES.CHALLENGE.map((wp, idx) => ({
    ...wp,
    landmarkHint:
      idx === 0
        ? 'Old Gate'
        : idx === 20
        ? 'Triumph Arch'
        : `Historic Stop ${idx}`,
  })),
};

const CENTRAL_TOWN_BUILDINGS: MapBuilding[] = [
  { id: 'houses-nw', name: 'Houses', spanishLabel: 'Casas', x: 165, y: 25, width: 165, height: 68, roofColor: '#EA580C', wallColor: '#FFF7ED', accentColor: '#FED7AA', type: 'house' },
  { id: 'school', name: 'School', spanishLabel: 'Escuela', x: 420, y: 22, width: 170, height: 72, roofColor: '#2563EB', wallColor: '#EFF6FF', accentColor: '#93C5FD', type: 'school', icon: '🏫' },
  { id: 'library', name: 'Library', spanishLabel: 'Biblioteca', x: 675, y: 22, width: 155, height: 70, roofColor: '#7C3AED', wallColor: '#F5F3FF', accentColor: '#C4B5FD', type: 'library', icon: '📚' },
  { id: 'supermarket', name: 'Supermarket', spanishLabel: 'Supermercado', x: 170, y: 165, width: 160, height: 120, roofColor: '#0D9488', wallColor: '#F0FDFA', accentColor: '#5EEAD4', type: 'supermarket', icon: '🛒' },
  { id: 'park', name: 'Central Park', spanishLabel: 'Parque', x: 422, y: 160, width: 175, height: 140, roofColor: '#16A34A', wallColor: '#DCFCE7', accentColor: '#86EFAC', type: 'park' },
  { id: 'cafe', name: 'Café', spanishLabel: 'Cafetería', x: 170, y: 385, width: 150, height: 118, roofColor: '#D97706', wallColor: '#FFFBEB', accentColor: '#FDE68A', type: 'cafe', icon: '☕' },
  { id: 'restaurant', name: 'Restaurant', spanishLabel: 'Restaurante', x: 422, y: 385, width: 172, height: 118, roofColor: '#DC2626', wallColor: '#FEF2F2', accentColor: '#FCA5A5', type: 'restaurant', icon: '🍽️' },
  { id: 'bank', name: 'Bank', spanishLabel: 'Banco', x: 668, y: 175, width: 120, height: 110, roofColor: '#334155', wallColor: '#F8FAFC', accentColor: '#CBD5E1', type: 'bank', icon: '🏦' },
  { id: 'hospital', name: 'Hospital', spanishLabel: 'Hospital', x: 668, y: 385, width: 132, height: 120, roofColor: '#E11D48', wallColor: '#FFFFFF', accentColor: '#FECDD3', type: 'hospital' },
  { id: 'church', name: 'Church', spanishLabel: 'Iglesia', x: 170, y: 595, width: 155, height: 68, roofColor: '#9333EA', wallColor: '#FAF5FF', accentColor: '#E9D5FF', type: 'church', icon: '⛪' },
  { id: 'station', name: 'Station', spanishLabel: 'Estación', x: 422, y: 595, width: 175, height: 68, roofColor: '#0284C7', wallColor: '#F0F9FF', accentColor: '#BAE6FD', type: 'station', icon: '🚉' },
  { id: 'destination-plaza', name: 'Destination', spanishLabel: 'Meta Final', x: 840, y: 50, width: 130, height: 120, roofColor: '#059669', wallColor: '#ECFDF5', accentColor: '#6EE7B7', type: 'destination' },
];

export const MAP_DEFINITIONS: Record<MapId, MapThemeDefinition> = {
  'central-town': {
    id: 'central-town',
    name: '1. Central Town',
    subtitle: 'City Streets & Park',
    description: 'Classic town avenues with the School, Central Park, Hospital, and River Bridges.',
    badgeColor: '#10B981',
    groundColor: '#C6ECC9',
    dotColor: '#A7E3B1',
    meadowColor: '#B6E6BA',
    roadColor: '#475569',
    sidewalkColor: '#E2E8F0',
    roadStripeColor: '#F8FAFC',
    waterKind: 'river-vertical',
    roads: STANDARD_ROADS,
    bridges: [
      { x: 760, y: 120, orientation: 'horizontal', label: 'BRIDGE', style: 'wood' },
      { x: 760, y: 340, orientation: 'horizontal', label: 'BRIDGE', style: 'wood' },
    ],
    crosswalks: STANDARD_CROSSWALKS,
    buildings: CENTRAL_TOWN_BUILDINGS,
    trees: [
      { x: 55, y: 45, s: 1.0, kind: 'leaf' },
      { x: 52, y: 175, s: 0.9, kind: 'leaf' },
      { x: 56, y: 270, s: 1.05, kind: 'leaf' },
      { x: 55, y: 405, s: 0.95, kind: 'leaf' },
      { x: 50, y: 495, s: 1.0, kind: 'leaf' },
      { x: 350, y: 48, s: 0.85, kind: 'leaf' },
      { x: 612, y: 52, s: 0.9, kind: 'leaf' },
      { x: 615, y: 210, s: 0.85, kind: 'leaf' },
      { x: 612, y: 292, s: 0.9, kind: 'leaf' },
      { x: 612, y: 485, s: 0.85, kind: 'leaf' },
      { x: 825, y: 245, s: 0.95, kind: 'leaf' },
      { x: 832, y: 425, s: 1.0, kind: 'leaf' },
      { x: 955, y: 410, s: 0.95, kind: 'leaf' },
      { x: 845, y: 515, s: 1.0, kind: 'leaf' },
      { x: 955, y: 515, s: 0.9, kind: 'leaf' },
      { x: 865, y: 615, s: 1.05, kind: 'leaf' },
      { x: 45, y: 625, s: 1.0, kind: 'leaf' },
      { x: 690, y: 625, s: 0.95, kind: 'leaf' },
    ],
    streetSign: { x: 150, y: 102, text: 'NORTH ST →', color: '#047857' },
    startPoint: { x: 120, y: 625 },
    routes: TOWN_ROUTES,
  },

  'coastal-harbor': {
    id: 'coastal-harbor',
    name: '2. Coastal Harbor',
    subtitle: 'Boardwalk & Lighthouse',
    description: 'Sunny seaside piers, harbor market, aquarium, and ocean boardwalk.',
    badgeColor: '#0284C7',
    groundColor: '#FDE68A',
    dotColor: '#F59E0B',
    meadowColor: '#FEF3C7',
    roadColor: '#334155',
    sidewalkColor: '#F1F5F9',
    roadStripeColor: '#BAE6FD',
    waterKind: 'ocean-east',
    roads: STANDARD_ROADS,
    bridges: [
      { x: 760, y: 120, orientation: 'horizontal', label: 'PIER BRIDGE', style: 'wood' },
      { x: 760, y: 340, orientation: 'horizontal', label: 'BOARDWALK', style: 'wood' },
    ],
    crosswalks: STANDARD_CROSSWALKS,
    buildings: [
      { id: 'beach-houses', name: 'Beach Houses', spanishLabel: 'Casas', x: 165, y: 25, width: 165, height: 68, roofColor: '#0EA5E9', wallColor: '#F0F9FF', accentColor: '#BAE6FD', type: 'house' },
      { id: 'aquarium', name: 'Aquarium', spanishLabel: 'Acuario', x: 420, y: 22, width: 170, height: 72, roofColor: '#0284C7', wallColor: '#E0F2FE', accentColor: '#7DD3FC', type: 'aquarium', icon: '🐬' },
      { id: 'museum', name: 'Naval Museum', spanishLabel: 'Museo', x: 668, y: 22, width: 150, height: 70, roofColor: '#1D4ED8', wallColor: '#EFF6FF', accentColor: '#93C5FD', type: 'museum', icon: '⚓' },
      { id: 'harbor-market', name: 'Harbor Market', spanishLabel: 'Mercado', x: 170, y: 165, width: 160, height: 120, roofColor: '#0D9488', wallColor: '#F0FDFA', accentColor: '#5EEAD4', type: 'market', icon: '🛍️' },
      { id: 'bay-park', name: 'Bay Park', spanishLabel: 'Parque', x: 422, y: 160, width: 175, height: 140, roofColor: '#16A34A', wallColor: '#DCFCE7', accentColor: '#86EFAC', type: 'park' },
      { id: 'marina-cafe', name: 'Marina Café', spanishLabel: 'Cafetería', x: 170, y: 385, width: 150, height: 118, roofColor: '#D97706', wallColor: '#FFFBEB', accentColor: '#FDE68A', type: 'cafe', icon: '🍹' },
      { id: 'seafood', name: 'Seafood Grill', spanishLabel: 'Restaurante', x: 422, y: 385, width: 172, height: 118, roofColor: '#E11D48', wallColor: '#FFF1F2', accentColor: '#FDA4AF', type: 'restaurant', icon: '🦞' },
      { id: 'harbor-bank', name: 'Port Bank', spanishLabel: 'Banco', x: 668, y: 175, width: 112, height: 110, roofColor: '#475569', wallColor: '#F8FAFC', accentColor: '#CBD5E1', type: 'bank', icon: '🏦' },
      { id: 'clinic', name: 'Coast Clinic', spanishLabel: 'Hospital', x: 668, y: 385, width: 118, height: 120, roofColor: '#DC2626', wallColor: '#FFFFFF', accentColor: '#FECACA', type: 'hospital' },
      { id: 'lighthouse', name: 'Lighthouse', spanishLabel: 'Faro', x: 170, y: 595, width: 155, height: 68, roofColor: '#B91C1C', wallColor: '#FEF2F2', accentColor: '#FCA5A5', type: 'lighthouse', icon: '🚨' },
      { id: 'ferry', name: 'Ferry Terminal', spanishLabel: 'Estación', x: 422, y: 595, width: 175, height: 68, roofColor: '#0369A1', wallColor: '#F0F9FF', accentColor: '#7DD3FC', type: 'station', icon: '⛴️' },
      { id: 'lighthouse-goal', name: 'Sunset Pier', spanishLabel: 'Meta Final', x: 840, y: 278, width: 130, height: 120, roofColor: '#0284C7', wallColor: '#F0F9FF', accentColor: '#7DD3FC', type: 'destination' },
    ],
    trees: [
      { x: 55, y: 50, s: 1.0, kind: 'palm' },
      { x: 55, y: 205, s: 0.95, kind: 'palm' },
      { x: 55, y: 360, s: 1.0, kind: 'palm' },
      { x: 52, y: 505, s: 1.0, kind: 'palm' },
      { x: 350, y: 48, s: 0.9, kind: 'palm' },
      { x: 615, y: 215, s: 0.9, kind: 'palm' },
      { x: 615, y: 490, s: 0.9, kind: 'palm' },
      { x: 845, y: 495, s: 1.0, kind: 'palm' },
      { x: 945, y: 520, s: 0.9, kind: 'palm' },
      { x: 45, y: 625, s: 1.0, kind: 'palm' },
      { x: 690, y: 625, s: 0.95, kind: 'palm' },
    ],
    streetSign: { x: 150, y: 102, text: 'HARBOR AVE →', color: '#0369A1' },
    startPoint: { x: 120, y: 625 },
    routes: HARBOR_ROUTES,
  },

  'mountain-village': {
    id: 'mountain-village',
    name: '3. Mountain Village',
    subtitle: 'Alpine Trails & Bridges',
    description: 'Pine-lined cobblestone lanes, mountain stream bridges, cabins, and summit lookout.',
    badgeColor: '#15803D',
    groundColor: '#BCE3B6',
    dotColor: '#86CA80',
    meadowColor: '#A7D8A0',
    roadColor: '#57534E',
    sidewalkColor: '#E7E5E4',
    roadStripeColor: '#FDE68A',
    waterKind: 'mountain-stream',
    roads: STANDARD_ROADS,
    bridges: [
      { x: 120, y: 230, orientation: 'vertical', label: 'CREEK BRIDGE', style: 'stone' },
      { x: 380, y: 230, orientation: 'vertical', label: 'PINE BRIDGE', style: 'stone' },
      { x: 640, y: 230, orientation: 'vertical', label: 'STONE BRIDGE', style: 'stone' },
      { x: 905, y: 230, orientation: 'vertical', label: 'SUMMIT BRIDGE', style: 'stone' },
    ],
    crosswalks: STANDARD_CROSSWALKS,
    buildings: [
      { id: 'cabins', name: 'Cozy Cabins', spanishLabel: 'Cabañas', x: 165, y: 25, width: 165, height: 68, roofColor: '#92400E', wallColor: '#FEF3C7', accentColor: '#FCD34D', type: 'cabin' },
      { id: 'alpine-school', name: 'Village School', spanishLabel: 'Escuela', x: 420, y: 22, width: 170, height: 72, roofColor: '#1D4ED8', wallColor: '#EFF6FF', accentColor: '#93C5FD', type: 'school', icon: '🏫' },
      { id: 'alpine-lib', name: 'Alpine Library', spanishLabel: 'Biblioteca', x: 675, y: 22, width: 155, height: 70, roofColor: '#6D28D9', wallColor: '#F5F3FF', accentColor: '#C4B5FD', type: 'library', icon: '📖' },
      { id: 'artisan-mkt', name: 'Artisan Market', spanishLabel: 'Mercado', x: 170, y: 155, width: 160, height: 118, roofColor: '#B45309', wallColor: '#FFFBEB', accentColor: '#FDE68A', type: 'market', icon: '🧺' },
      { id: 'pine-park', name: 'Pine Park', spanishLabel: 'Parque', x: 422, y: 155, width: 175, height: 132, roofColor: '#15803D', wallColor: '#DCFCE7', accentColor: '#86EFAC', type: 'park' },
      { id: 'bakery', name: 'Bakery Café', spanishLabel: 'Cafetería', x: 170, y: 385, width: 150, height: 118, roofColor: '#C2410C', wallColor: '#FFF7ED', accentColor: '#FDBA74', type: 'cafe', icon: '🥐' },
      { id: 'lodge', name: 'Timber Lodge', spanishLabel: 'Restaurante', x: 422, y: 385, width: 172, height: 118, roofColor: '#991B1B', wallColor: '#FEF2F2', accentColor: '#FCA5A5', type: 'restaurant', icon: '🍲' },
      { id: 'alpine-bank', name: 'Valley Bank', spanishLabel: 'Banco', x: 668, y: 158, width: 132, height: 115, roofColor: '#44403C', wallColor: '#F5F5F4', accentColor: '#D6D3D1', type: 'bank', icon: '🏦' },
      { id: 'clinic-mtn', name: 'Mountain Clinic', spanishLabel: 'Hospital', x: 668, y: 385, width: 132, height: 120, roofColor: '#E11D48', wallColor: '#FFFFFF', accentColor: '#FECDD3', type: 'hospital' },
      { id: 'chapel', name: 'Old Chapel', spanishLabel: 'Iglesia', x: 170, y: 595, width: 155, height: 68, roofColor: '#7E22CE', wallColor: '#FAF5FF', accentColor: '#E9D5FF', type: 'church', icon: '⛪' },
      { id: 'ranger', name: 'Ranger Station', spanishLabel: 'Estación', x: 422, y: 595, width: 175, height: 68, roofColor: '#166534', wallColor: '#F0FDF4', accentColor: '#86EFAC', type: 'station', icon: '🏔️' },
      { id: 'summit-goal', name: 'Summit Overlook', spanishLabel: 'Meta Final', x: 840, y: 50, width: 130, height: 120, roofColor: '#15803D', wallColor: '#ECFDF5', accentColor: '#6EE7B7', type: 'destination' },
    ],
    trees: [
      { x: 52, y: 45, s: 1.1, kind: 'pine' },
      { x: 52, y: 165, s: 1.0, kind: 'pine' },
      { x: 54, y: 310, s: 1.1, kind: 'pine' },
      { x: 52, y: 445, s: 1.0, kind: 'pine' },
      { x: 52, y: 560, s: 1.05, kind: 'pine' },
      { x: 348, y: 46, s: 0.95, kind: 'pine' },
      { x: 612, y: 50, s: 0.95, kind: 'pine' },
      { x: 615, y: 300, s: 0.95, kind: 'pine' },
      { x: 842, y: 292, s: 1.05, kind: 'pine' },
      { x: 955, y: 420, s: 1.05, kind: 'pine' },
      { x: 845, y: 520, s: 1.1, kind: 'pine' },
      { x: 955, y: 525, s: 1.0, kind: 'pine' },
      { x: 865, y: 620, s: 1.1, kind: 'pine' },
      { x: 48, y: 632, s: 1.05, kind: 'pine' },
      { x: 690, y: 625, s: 1.0, kind: 'pine' },
    ],
    streetSign: { x: 150, y: 102, text: 'SUMMIT TRAIL →', color: '#166534' },
    startPoint: { x: 120, y: 625 },
    routes: MOUNTAIN_ROUTES,
  },

  'tech-campus': {
    id: 'tech-campus',
    name: '4. SENA Tech Campus',
    subtitle: 'Labs & Innovation Quad',
    description: 'Modern training campus featuring Robotics Labs, Digital Library, and Graduation Pavilion.',
    badgeColor: '#2563EB',
    groundColor: '#D1FAE5',
    dotColor: '#6EE7B7',
    meadowColor: '#A7F3D0',
    roadColor: '#334155',
    sidewalkColor: '#F8FAFC',
    roadStripeColor: '#93C5FD',
    waterKind: 'campus-pool',
    roads: STANDARD_ROADS,
    bridges: [
      { x: 760, y: 120, orientation: 'horizontal', label: 'SOLAR WALK', style: 'modern' },
      { x: 760, y: 340, orientation: 'horizontal', label: 'TECH BRIDGE', style: 'modern' },
    ],
    crosswalks: STANDARD_CROSSWALKS,
    buildings: [
      { id: 'design-studio', name: 'Design Studio', spanishLabel: 'Diseño', x: 165, y: 25, width: 165, height: 68, roofColor: '#EC4899', wallColor: '#FDF2F8', accentColor: '#F9A8D4', type: 'lab', icon: '🎨' },
      { id: 'eng-school', name: 'Engineering School', spanishLabel: 'Escuela', x: 420, y: 22, width: 170, height: 72, roofColor: '#2563EB', wallColor: '#EFF6FF', accentColor: '#93C5FD', type: 'school', icon: '⚙️' },
      { id: 'digital-lib', name: 'Digital Library', spanishLabel: 'Biblioteca', x: 675, y: 22, width: 155, height: 70, roofColor: '#7C3AED', wallColor: '#F5F3FF', accentColor: '#C4B5FD', type: 'library', icon: '💻' },
      { id: 'innovation-lab', name: 'Innovation Lab', spanishLabel: 'Laboratorio', x: 170, y: 165, width: 160, height: 120, roofColor: '#0EA5E9', wallColor: '#F0F9FF', accentColor: '#7DD3FC', type: 'lab', icon: '🔬' },
      { id: 'campus-quad', name: 'Green Quad', spanishLabel: 'Parque', x: 422, y: 160, width: 175, height: 140, roofColor: '#16A34A', wallColor: '#DCFCE7', accentColor: '#86EFAC', type: 'park' },
      { id: 'campus-cafe', name: 'Campus Café', spanishLabel: 'Cafetería', x: 170, y: 385, width: 150, height: 118, roofColor: '#D97706', wallColor: '#FFFBEB', accentColor: '#FDE68A', type: 'cafe', icon: '☕' },
      { id: 'robotics', name: 'Robotics Hall', spanishLabel: 'Robótica', x: 422, y: 385, width: 172, height: 118, roofColor: '#4F46E5', wallColor: '#EEF2FF', accentColor: '#A5B4FC', type: 'lab', icon: '🤖' },
      { id: 'tech-bank', name: 'Admin Building', spanishLabel: 'Edificio', x: 668, y: 175, width: 120, height: 110, roofColor: '#1E293B', wallColor: '#F8FAFC', accentColor: '#CBD5E1', type: 'bank', icon: '🏢' },
      { id: 'wellness', name: 'Wellness Center', spanishLabel: 'Hospital', x: 668, y: 385, width: 132, height: 120, roofColor: '#E11D48', wallColor: '#FFFFFF', accentColor: '#FECDD3', type: 'hospital' },
      { id: 'auditorium', name: 'Auditorium', spanishLabel: 'Auditorio', x: 170, y: 595, width: 155, height: 68, roofColor: '#9333EA', wallColor: '#FAF5FF', accentColor: '#E9D5FF', type: 'museum', icon: '🎭' },
      { id: 'student-hub', name: 'Student Hub', spanishLabel: 'Estación', x: 422, y: 595, width: 175, height: 68, roofColor: '#0284C7', wallColor: '#F0F9FF', accentColor: '#BAE6FD', type: 'station', icon: '🚌' },
      { id: 'grad-pavilion', name: 'Graduation Hall', spanishLabel: 'Meta Final', x: 840, y: 278, width: 130, height: 120, roofColor: '#2563EB', wallColor: '#EFF6FF', accentColor: '#93C5FD', type: 'destination' },
    ],
    trees: [
      { x: 55, y: 45, s: 0.95, kind: 'leaf' },
      { x: 52, y: 185, s: 0.9, kind: 'leaf' },
      { x: 55, y: 405, s: 0.95, kind: 'leaf' },
      { x: 350, y: 48, s: 0.85, kind: 'leaf' },
      { x: 612, y: 52, s: 0.9, kind: 'leaf' },
      { x: 612, y: 292, s: 0.9, kind: 'leaf' },
      { x: 845, y: 175, s: 0.95, kind: 'leaf' },
      { x: 955, y: 175, s: 0.9, kind: 'leaf' },
      { x: 845, y: 515, s: 1.0, kind: 'leaf' },
      { x: 955, y: 515, s: 0.9, kind: 'leaf' },
      { x: 45, y: 625, s: 1.0, kind: 'leaf' },
      { x: 690, y: 625, s: 0.95, kind: 'leaf' },
    ],
    streetSign: { x: 150, y: 102, text: 'INNOVATION WAY →', color: '#1D4ED8' },
    startPoint: { x: 120, y: 625 },
    routes: CAMPUS_ROUTES,
  },

  'historic-downtown': {
    id: 'historic-downtown',
    name: '5. Historic Downtown',
    subtitle: 'Plazas & Cultural Quarter',
    description: 'Colonial cobblestone streets, Cathedral, City Museum, Old Bookstore, and Triumph Arch.',
    badgeColor: '#B45309',
    groundColor: '#EFE4CE',
    dotColor: '#DEC9A4',
    meadowColor: '#E5D3B3',
    roadColor: '#57534E',
    sidewalkColor: '#FAFAF9',
    roadStripeColor: '#FDE68A',
    waterKind: 'canal-diagonal',
    roads: STANDARD_ROADS,
    bridges: [
      { x: 760, y: 120, orientation: 'horizontal', label: 'OLD ARCH BRIDGE', style: 'stone' },
      { x: 760, y: 340, orientation: 'horizontal', label: 'CANAL BRIDGE', style: 'stone' },
    ],
    crosswalks: STANDARD_CROSSWALKS,
    buildings: [
      { id: 'colonial-homes', name: 'Colonial Houses', spanishLabel: 'Casas', x: 165, y: 25, width: 165, height: 68, roofColor: '#C2410C', wallColor: '#FFF7ED', accentColor: '#FDBA74', type: 'house' },
      { id: 'academy', name: 'Arts School', spanishLabel: 'Escuela', x: 420, y: 22, width: 170, height: 72, roofColor: '#1D4ED8', wallColor: '#EFF6FF', accentColor: '#93C5FD', type: 'school', icon: '🏛️' },
      { id: 'old-bookstore', name: 'Old Library', spanishLabel: 'Biblioteca', x: 675, y: 22, width: 155, height: 70, roofColor: '#6D28D9', wallColor: '#F5F3FF', accentColor: '#C4B5FD', type: 'library', icon: '📜' },
      { id: 'city-market', name: 'City Market', spanishLabel: 'Supermercado', x: 170, y: 165, width: 160, height: 120, roofColor: '#0F766E', wallColor: '#F0FDFA', accentColor: '#5EEAD4', type: 'market', icon: '🏺' },
      { id: 'botanical', name: 'Plaza Garden', spanishLabel: 'Parque', x: 422, y: 160, width: 175, height: 140, roofColor: '#15803D', wallColor: '#DCFCE7', accentColor: '#86EFAC', type: 'park' },
      { id: 'plaza-cafe', name: 'Plaza Café', spanishLabel: 'Cafetería', x: 170, y: 385, width: 150, height: 118, roofColor: '#B45309', wallColor: '#FFFBEB', accentColor: '#FDE68A', type: 'cafe', icon: '☕' },
      { id: 'bistro', name: 'Artisan Bistro', spanishLabel: 'Restaurante', x: 422, y: 385, width: 172, height: 118, roofColor: '#B91C1C', wallColor: '#FEF2F2', accentColor: '#FCA5A5', type: 'restaurant', icon: '🍽️' },
      { id: 'muni-bank', name: 'Historic Bank', spanishLabel: 'Banco', x: 668, y: 175, width: 120, height: 110, roofColor: '#44403C', wallColor: '#F5F5F4', accentColor: '#D6D3D1', type: 'bank', icon: '🏛️' },
      { id: 'heritage-hosp', name: 'City Hospital', spanishLabel: 'Hospital', x: 668, y: 385, width: 132, height: 120, roofColor: '#E11D48', wallColor: '#FFFFFF', accentColor: '#FECDD3', type: 'hospital' },
      { id: 'cathedral', name: 'Cathedral', spanishLabel: 'Iglesia', x: 170, y: 595, width: 155, height: 68, roofColor: '#7E22CE', wallColor: '#FAF5FF', accentColor: '#E9D5FF', type: 'church', icon: '⛪' },
      { id: 'old-terminal', name: 'Train Terminal', spanishLabel: 'Estación', x: 422, y: 595, width: 175, height: 68, roofColor: '#0369A1', wallColor: '#F0F9FF', accentColor: '#BAE6FD', type: 'station', icon: '🚂' },
      { id: 'triumph-arch', name: 'Triumph Arch', spanishLabel: 'Meta Final', x: 840, y: 50, width: 130, height: 120, roofColor: '#B45309', wallColor: '#FFFBEB', accentColor: '#FCD34D', type: 'destination' },
    ],
    trees: [
      { x: 55, y: 45, s: 1.0, kind: 'leaf' },
      { x: 52, y: 175, s: 0.9, kind: 'leaf' },
      { x: 56, y: 270, s: 1.0, kind: 'leaf' },
      { x: 55, y: 405, s: 0.95, kind: 'leaf' },
      { x: 350, y: 48, s: 0.85, kind: 'leaf' },
      { x: 612, y: 52, s: 0.9, kind: 'leaf' },
      { x: 612, y: 292, s: 0.9, kind: 'leaf' },
      { x: 832, y: 425, s: 1.0, kind: 'leaf' },
      { x: 955, y: 410, s: 0.95, kind: 'leaf' },
      { x: 845, y: 515, s: 1.0, kind: 'leaf' },
      { x: 45, y: 625, s: 1.0, kind: 'leaf' },
      { x: 690, y: 625, s: 0.95, kind: 'leaf' },
    ],
    streetSign: { x: 150, y: 102, text: 'PLAZA MAYOR →', color: '#92400E' },
    startPoint: { x: 120, y: 625 },
    routes: DOWNTOWN_ROUTES,
  },
};

export const MAP_LIST: MapThemeDefinition[] = [
  MAP_DEFINITIONS['central-town'],
  MAP_DEFINITIONS['coastal-harbor'],
  MAP_DEFINITIONS['mountain-village'],
  MAP_DEFINITIONS['tech-campus'],
  MAP_DEFINITIONS['historic-downtown'],
];

export function getMapDefinition(mapId: MapId): MapThemeDefinition {
  return MAP_DEFINITIONS[mapId] || MAP_DEFINITIONS['central-town'];
}

export function getWaypointsForMapAndDifficulty(
  mapId: MapId,
  difficulty: DifficultyId
): MapWaypoint[] {
  return getMapDefinition(mapId).routes[difficulty];
}
