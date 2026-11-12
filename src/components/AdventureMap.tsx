import React, { useMemo } from 'react';
import {
  MAP_HEIGHT,
  MAP_WIDTH,
  getMapDefinition,
  getWaypointsForMapAndDifficulty,
} from '../data/mapLayout';
import {
  DifficultyId,
  GameState,
  MapBridge,
  MapBuilding,
  MapId,
  MapThemeDefinition,
  MapTree,
} from '../types/game';

interface AdventureMapProps {
  mapId: MapId;
  difficulty: DifficultyId;
  characterPositionIndex: number; // 0..totalCheckpoints
  gameState: GameState;
  playerName: string;
  isPreview?: boolean;
}

const TreeArt: React.FC<{ t: MapTree }> = ({ t }) => {
  if (t.kind === 'pine') {
    return (
      <g transform={`translate(${t.x}, ${t.y}) scale(${t.s})`}>
        <ellipse cx="2" cy="10" rx="12" ry="5" fill="rgba(15, 23, 42, 0.16)" />
        <polygon points="0,-18 -13,8 13,8" fill="#14532D" />
        <polygon points="0,-24 -10,-2 10,-2" fill="#15803D" />
        <polygon points="0,-29 -7,-11 7,-11" fill="#22C55E" />
      </g>
    );
  }
  if (t.kind === 'palm') {
    return (
      <g transform={`translate(${t.x}, ${t.y}) scale(${t.s})`}>
        <ellipse cx="2" cy="10" rx="11" ry="4.5" fill="rgba(15, 23, 42, 0.16)" />
        <circle cx="0" cy="0" r="4.5" fill="#92400E" />
        <path d="M0,0 Q-12,-12 -16,-3 Q-8,-2 0,0" fill="#16A34A" />
        <path d="M0,0 Q12,-12 16,-3 Q8,-2 0,0" fill="#22C55E" />
        <path d="M0,0 Q-12,10 -15,14 Q-4,8 0,0" fill="#15803D" />
        <path d="M0,0 Q12,10 15,14 Q4,8 0,0" fill="#16A34A" />
        <path d="M0,0 Q0,-16 4,-17 Q3,-7 0,0" fill="#4ADE80" />
      </g>
    );
  }
  return (
    <g transform={`translate(${t.x}, ${t.y}) scale(${t.s})`}>
      <ellipse cx="2" cy="8" rx="12" ry="6" fill="rgba(15, 23, 42, 0.14)" />
      <circle cx="0" cy="0" r="14" fill="#15803D" />
      <circle cx="-3" cy="-3" r="10" fill="#22C55E" />
      <circle cx="3" cy="-5" r="5" fill="#4ADE80" opacity="0.7" />
    </g>
  );
};

const WaterFeature: React.FC<{ mapDef: MapThemeDefinition }> = ({ mapDef }) => {
  switch (mapDef.waterKind) {
    case 'ocean-east':
      return (
        <g>
          {/* Sandy Shoreline */}
          <path
            d="M 730 -20 C 760 120, 710 260, 745 400 C 770 520, 735 610, 760 700 L 1020 700 L 1020 -20 Z"
            fill="#FCD34D"
          />
          {/* Turquoise Ocean */}
          <path
            d="M 755 -20 C 785 120, 735 260, 770 400 C 795 520, 760 610, 785 700 L 1020 700 L 1020 -20 Z"
            fill="#0EA5E9"
          />
          <path
            d="M 775 -20 C 805 120, 755 260, 790 400 C 815 520, 780 610, 805 700 L 1020 700 L 1020 -20 Z"
            fill="#0284C7"
            opacity="0.6"
          />
          {/* Animated Wave Ripples */}
          <path
            d="M 805 60 Q 830 50, 855 60 T 905 60 M 820 460 Q 845 450, 870 460 T 920 460 M 830 580 Q 855 570, 880 580 T 930 580"
            fill="none"
            stroke="#E0F2FE"
            strokeWidth="3.5"
            strokeDasharray="14 26"
            className="animate-water-flow"
          />
          {/* Sailboat */}
          <g transform="translate(835, 530)">
            <path d="M-16,4 L16,4 L10,13 L-10,13 Z" fill="#B45309" />
            <polygon points="-2,2 -2,-20 12,-2" fill="#FFFFFF" />
            <polygon points="-4,2 -4,-15 -14,-1" fill="#FDE68A" />
          </g>
        </g>
      );

    case 'mountain-stream':
      return (
        <g>
          {/* Mountain Stream running horizontally around y=230 */}
          <path
            d="M -20 230 C 180 205, 330 252, 500 228 C 670 205, 840 250, 1020 228"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="52"
            strokeLinecap="round"
          />
          <path
            d="M -20 230 C 180 205, 330 252, 500 228 C 670 205, 840 250, 1020 228"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="36"
            strokeLinecap="round"
          />
          <path
            d="M -20 230 C 180 205, 330 252, 500 228 C 670 205, 840 250, 1020 228"
            fill="none"
            stroke="#E0F2FE"
            strokeWidth="3.5"
            strokeDasharray="14 26"
            className="animate-water-flow"
          />
        </g>
      );

    case 'campus-pool':
      return (
        <g>
          {/* Reflecting Waterway on East Campus */}
          <rect x="735" y="-10" width="52" height="700" fill="#7DD3FC" />
          <rect x="743" y="-10" width="36" height="700" fill="#0EA5E9" />
          <line
            x1="761"
            y1="-10"
            x2="761"
            y2="690"
            stroke="#E0F2FE"
            strokeWidth="3"
            strokeDasharray="12 24"
            className="animate-water-flow"
          />
        </g>
      );

    case 'canal-diagonal':
      return (
        <g>
          {/* Historic Stone-lined Canal */}
          <rect x="730" y="-10" width="60" height="700" fill="#D6D3D1" />
          <rect x="738" y="-10" width="44" height="700" fill="#0284C7" />
          <line
            x1="760"
            y1="-10"
            x2="760"
            y2="690"
            stroke="#BAE6FD"
            strokeWidth="3.5"
            strokeDasharray="14 26"
            className="animate-water-flow"
          />
        </g>
      );

    case 'river-vertical':
    default:
      return (
        <g>
          <path
            d="M 755 -20 C 785 110, 730 230, 765 360 C 795 490, 740 590, 765 710"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="62"
            strokeLinecap="round"
          />
          <path
            d="M 755 -20 C 785 110, 730 230, 765 360 C 795 490, 740 590, 765 710"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="44"
            strokeLinecap="round"
          />
          <path
            d="M 755 -20 C 785 110, 730 230, 765 360 C 795 490, 740 590, 765 710"
            fill="none"
            stroke="#E0F2FE"
            strokeWidth="4"
            strokeDasharray="14 26"
            className="animate-water-flow"
          />
        </g>
      );
  }
};

const BridgeArt: React.FC<{ bridge: MapBridge }> = ({ bridge }) => {
  const deckFill =
    bridge.style === 'stone'
      ? '#A8A29E'
      : bridge.style === 'modern'
      ? '#CBD5E1'
      : '#B45309';
  const railFill =
    bridge.style === 'stone'
      ? '#57534E'
      : bridge.style === 'modern'
      ? '#334155'
      : '#78350F';

  if (bridge.orientation === 'vertical') {
    return (
      <g>
        <rect
          x={bridge.x - 24}
          y={bridge.y - 36}
          width="48"
          height="72"
          rx="6"
          fill={deckFill}
          stroke={railFill}
          strokeWidth="2.5"
        />
        <rect x={bridge.x - 26} y={bridge.y - 36} width="6" height="72" rx="2" fill={railFill} />
        <rect x={bridge.x + 20} y={bridge.y - 36} width="6" height="72" rx="2" fill={railFill} />
        <text
          x={bridge.x}
          y={bridge.y - 42}
          textAnchor="middle"
          fill="#1E293B"
          fontSize="8.5"
          fontWeight="800"
        >
          {bridge.label}
        </text>
      </g>
    );
  }

  return (
    <g>
      <rect
        x={bridge.x - 42}
        y={bridge.y - 24}
        width="84"
        height="48"
        rx="6"
        fill={deckFill}
        stroke={railFill}
        strokeWidth="2.5"
      />
      {[0, 1, 2, 3, 4, 5].map((plank) => (
        <line
          key={plank}
          x1={bridge.x - 34 + plank * 13}
          y1={bridge.y - 21}
          x2={bridge.x - 34 + plank * 13}
          y2={bridge.y + 21}
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity="0.45"
        />
      ))}
      <rect x={bridge.x - 44} y={bridge.y - 26} width="88" height="6" rx="2" fill={railFill} />
      <rect x={bridge.x - 44} y={bridge.y + 20} width="88" height="6" rx="2" fill={railFill} />
      <text
        x={bridge.x}
        y={bridge.y - 31}
        textAnchor="middle"
        fill="#1E293B"
        fontSize="8.5"
        fontWeight="800"
      >
        {bridge.label}
      </text>
    </g>
  );
};

const BuildingArt: React.FC<{ b: MapBuilding; unlockedGoal?: boolean }> = ({
  b,
  unlockedGoal = false,
}) => {
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;

  if (b.type === 'park') {
    return (
      <g>
        <rect
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
          rx="16"
          fill="#BBF7D0"
          stroke="#16A34A"
          strokeWidth="3"
        />
        <path
          d={`M ${b.x + 88} ${b.y} L ${b.x + 88} ${b.y + b.height} M ${b.x} ${b.y + 70} L ${b.x + b.width} ${b.y + 70}`}
          stroke="#FEF3C7"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="22" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
        <circle cx={cx} cy={cy} r="10" fill="#E0F2FE" />
        <rect x={b.x + 22} y={b.y + 20} width="24" height="8" rx="2" fill="#92400E" />
        <rect x={b.x + 128} y={b.y + b.height - 30} width="24" height="8" rx="2" fill="#92400E" />
        <circle cx={b.x + 28} cy={b.y + b.height - 28} r="14" fill="#15803D" />
        <circle cx={b.x + 25} cy={b.y + b.height - 31} r="10" fill="#22C55E" />
        <circle cx={b.x + 145} cy={b.y + 28} r="14" fill="#15803D" />
        <circle cx={b.x + 142} cy={b.y + 25} r="10" fill="#22C55E" />
        <rect x={cx - 46} y={b.y + b.height - 22} width="92" height="18" rx="6" fill="#14532D" />
        <text
          x={cx}
          y={b.y + b.height - 9}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="700"
        >
          {b.name.toUpperCase()}
        </text>
      </g>
    );
  }

  if (b.type === 'destination') {
    return (
      <g>
        <rect
          x={b.x - 6}
          y={b.y - 6}
          width={b.width + 12}
          height={b.height + 12}
          rx="20"
          fill={unlockedGoal ? '#A7F3D0' : '#E2E8F0'}
          stroke={unlockedGoal ? '#059669' : '#64748B'}
          strokeWidth="3"
        />
        <rect
          x={b.x}
          y={b.y}
          width={b.width}
          height={b.height}
          rx="16"
          fill={unlockedGoal ? '#10B981' : '#F8FAFC'}
          stroke={unlockedGoal ? '#047857' : '#94A3B8'}
          strokeWidth="2.5"
        />
        <rect x={b.x + 18} y={b.y + 16} width={b.width - 36} height="14" rx="4" fill="#0F172A" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            x={b.x + 20 + i * 13}
            y={b.y + 18 + (i % 2) * 5}
            width="11"
            height="5"
            fill="#FFFFFF"
          />
        ))}
        <circle
          cx={cx}
          cy={cy + 6}
          r="22"
          fill={unlockedGoal ? '#FACC15' : '#CBD5E1'}
          stroke={unlockedGoal ? '#CA8A04' : '#64748B'}
          strokeWidth="2.5"
        />
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="20">
          {unlockedGoal ? '★' : '🔒'}
        </text>
        <text
          x={cx}
          y={b.y + b.height - 12}
          textAnchor="middle"
          fill={unlockedGoal ? '#FFFFFF' : '#334155'}
          fontSize="9.5"
          fontWeight="800"
        >
          {b.name.toUpperCase()}
        </text>
      </g>
    );
  }

  if (b.type === 'house' || b.type === 'cabin') {
    return (
      <g>
        <rect x={b.x} y={b.y} width={b.width} height={b.height} rx="10" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="2" />
        <rect x={b.x + 12} y={b.y + 12} width="62" height="44" rx="6" fill={b.roofColor} stroke="#7C2D12" strokeWidth="2" />
        <line x1={b.x + 12} y1={b.y + 34} x2={b.x + 74} y2={b.y + 34} stroke={b.accentColor} strokeWidth="2" />
        <rect x={b.x + 56} y={b.y + 16} width="10" height="10" rx="2" fill="#7C2D12" />
        <rect x={b.x + 90} y={b.y + 12} width="62" height="44" rx="6" fill={b.type === 'cabin' ? '#B45309' : '#0EA5E9'} stroke="#0C4A6E" strokeWidth="2" />
        <line x1={b.x + 90} y1={b.y + 34} x2={b.x + 152} y2={b.y + 34} stroke={b.accentColor} strokeWidth="2" />
        <rect x={b.x + 98} y={b.y + 16} width="10" height="10" rx="2" fill="#0C4A6E" />
        <rect x={cx - 46} y={b.y + b.height - 16} width="92" height="15" rx="5" fill="#1E293B" />
        <text x={cx} y={b.y + b.height - 5} textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">
          {b.name.toUpperCase()}
        </text>
      </g>
    );
  }

  return (
    <g>
      <rect
        x={b.x + 4}
        y={b.y + 5}
        width={b.width}
        height={b.height}
        rx="12"
        fill="rgba(15, 23, 42, 0.16)"
      />
      <rect
        x={b.x}
        y={b.y}
        width={b.width}
        height={b.height}
        rx="12"
        fill={b.wallColor}
        stroke="#334155"
        strokeWidth="2.2"
      />
      <rect
        x={b.x + 8}
        y={b.y + 8}
        width={b.width - 16}
        height={b.height - 28}
        rx="8"
        fill={b.roofColor}
      />
      <rect
        x={b.x + 16}
        y={b.y + 14}
        width={b.width - 32}
        height={Math.max(12, b.height - 46)}
        rx="5"
        fill={b.accentColor}
        opacity="0.45"
      />

      {b.type === 'hospital' ? (
        <g>
          <circle cx={cx} cy={cy - 8} r="15" fill="#FFFFFF" />
          <rect x={cx - 3.5} y={cy - 17} width="7" height="18" rx="1.5" fill="#E11D48" />
          <rect x={cx - 9} y={cy - 11.5} width="18" height="7" rx="1.5" fill="#E11D48" />
        </g>
      ) : (
        <text
          x={cx}
          y={cy - 3}
          textAnchor="middle"
          fontSize={b.height < 85 ? '17' : '21'}
          fill="#FFFFFF"
        >
          {b.icon || '🏛️'}
        </text>
      )}

      <rect
        x={b.x + 6}
        y={b.y + b.height - 21}
        width={b.width - 12}
        height="16"
        rx="5"
        fill="#0F172A"
      />
      <text
        x={cx}
        y={b.y + b.height - 9.5}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="9.2"
        fontWeight="700"
        letterSpacing="0.03em"
      >
        {b.name.toUpperCase()}
      </text>
    </g>
  );
};

export const AdventureMap: React.FC<AdventureMapProps> = ({
  mapId,
  difficulty,
  characterPositionIndex,
  gameState,
  playerName,
  isPreview = false,
}) => {
  const mapDef = useMemo(() => getMapDefinition(mapId), [mapId]);
  const waypoints = useMemo(
    () => getWaypointsForMapAndDifficulty(mapId, difficulty),
    [mapId, difficulty]
  );

  const clampedPos = Math.min(
    Math.max(0, characterPositionIndex),
    waypoints.length - 1
  );
  const currentPos = waypoints[clampedPos];
  const nextCheckpointIndex = Math.min(clampedPos + 1, waypoints.length - 1);
  const nextTarget = waypoints[nextCheckpointIndex];

  const fullPathD = useMemo(() => {
    return waypoints
      .map((wp, idx) => `${idx === 0 ? 'M' : 'L'} ${wp.x} ${wp.y}`)
      .join(' ');
  }, [waypoints]);

  const completedPathD = useMemo(() => {
    if (clampedPos <= 0) return '';
    return waypoints
      .slice(0, clampedPos + 1)
      .map((wp, idx) => `${idx === 0 ? 'M' : 'L'} ${wp.x} ${wp.y}`)
      .join(' ');
  }, [waypoints, clampedPos]);

  const activeSegmentD = useMemo(() => {
    if (clampedPos >= waypoints.length - 1) return '';
    return `M ${currentPos.x} ${currentPos.y} L ${nextTarget.x} ${nextTarget.y}`;
  }, [currentPos, nextTarget, clampedPos, waypoints.length]);

  const facingAngle = useMemo(() => {
    if (clampedPos >= waypoints.length - 1) return 0;
    const dx = nextTarget.x - currentPos.x;
    const dy = nextTarget.y - currentPos.y;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }, [currentPos, nextTarget, clampedPos, waypoints.length]);

  const unlockedGoal =
    gameState === 'VICTORY' || clampedPos >= waypoints.length - 1;
  const isMoving = gameState === 'CORRECT_ANSWER';

  const patternId = `ground-dots-${mapId}`;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border-2 border-slate-300 bg-slate-100 shadow-sm">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="block h-auto w-full select-none"
        role="img"
        aria-label={`Interactive adventure map ${mapDef.name} (${difficulty}) at checkpoint ${clampedPos} of ${waypoints.length - 1}`}
      >
        <defs>
          <pattern
            id={patternId}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="6" cy="8" r="1.5" fill={mapDef.dotColor} />
            <circle cx="20" cy="21" r="1.5" fill={mapDef.dotColor} />
          </pattern>
        </defs>

        {/* Base Terrain */}
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill={mapDef.groundColor} />
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill={`url(#${patternId})`} />

        {/* Meadow / Sand Patches */}
        <ellipse cx="260" cy="240" rx="140" ry="90" fill={mapDef.meadowColor} opacity="0.55" />
        <ellipse cx="890" cy="480" rx="110" ry="120" fill={mapDef.meadowColor} opacity="0.55" />

        {/* Map-Specific Water Feature */}
        <WaterFeature mapDef={mapDef} />

        {/* Sidewalk Backing Layer */}
        <g
          stroke={mapDef.sidewalkColor}
          strokeWidth="52"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {mapDef.roads.map((r, i) => (
            <line key={`sw-${i}`} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
          ))}
        </g>

        {/* Paved Roads */}
        <g
          stroke={mapDef.roadColor}
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {mapDef.roads.map((r, i) => (
            <line key={`rd-${i}`} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
          ))}
        </g>

        {/* Dashed Road Center Lines */}
        <g
          stroke={mapDef.roadStripeColor}
          strokeWidth="2.5"
          strokeDasharray="12 12"
          strokeLinecap="round"
          fill="none"
          opacity="0.72"
        >
          {mapDef.roads.map((r, i) => (
            <line key={`st-${i}`} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
          ))}
        </g>

        {/* Bridges */}
        {mapDef.bridges.map((br, idx) => (
          <BridgeArt key={idx} bridge={br} />
        ))}

        {/* Zebra Crosswalks */}
        {mapDef.crosswalks.map((cw, idx) => (
          <g key={idx} fill="#FFFFFF" opacity="0.9">
            {[-12, -4, 4, 12].map((offset) =>
              cw.vertical ? (
                <rect key={offset} x={cw.x + offset - 2} y={cw.y - 8} width="4" height="16" rx="1" />
              ) : (
                <rect key={offset} x={cw.x - 8} y={cw.y + offset - 2} width="16" height="4" rx="1" />
              )
            )}
          </g>
        ))}

        {/* Buildings & Landmarks */}
        {mapDef.buildings.map((b) => (
          <BuildingArt key={b.id} b={b} unlockedGoal={unlockedGoal} />
        ))}

        {/* Trees & Foliage */}
        {mapDef.trees.map((t, idx) => (
          <TreeArt key={idx} t={t} />
        ))}

        {/* Traffic Lights */}
        <g transform="translate(668, 305)">
          <rect x="0" y="0" width="14" height="32" rx="4" fill="#0F172A" />
          <circle cx="7" cy="7" r="3.2" fill="#EF4444" />
          <circle cx="7" cy="16" r="3.2" fill="#FACC15" />
          <circle cx="7" cy="25" r="3.2" fill="#22C55E" />
        </g>
        <g transform="translate(345, 305)">
          <rect x="0" y="0" width="14" height="32" rx="4" fill="#0F172A" />
          <circle cx="7" cy="7" r="3.2" fill="#EF4444" />
          <circle cx="7" cy="16" r="3.2" fill="#FACC15" />
          <circle cx="7" cy="25" r="3.2" fill="#22C55E" />
        </g>

        {/* STOP Sign */}
        <g transform="translate(88, 306)">
          <polygon
            points="8,0 18,0 26,8 26,18 18,26 8,26 0,18 0,8"
            fill="#DC2626"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <text x="13" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="800">
            STOP
          </text>
        </g>

        {/* Street Name Sign */}
        <g transform={`translate(${mapDef.streetSign.x}, ${mapDef.streetSign.y})`}>
          <rect x="0" y="0" width="96" height="15" rx="4" fill={mapDef.streetSign.color} />
          <text x="48" y="10.5" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="700">
            {mapDef.streetSign.text}
          </text>
        </g>

        {/* START Base Pad */}
        <g transform={`translate(${mapDef.startPoint.x}, ${mapDef.startPoint.y})`}>
          <rect
            x="-44"
            y="-18"
            width="88"
            height="36"
            rx="12"
            fill="#1E293B"
            stroke="#FACC15"
            strokeWidth="2.5"
          />
          <text x="0" y="4" textAnchor="middle" fill="#FACC15" fontSize="12" fontWeight="800">
            START
          </text>
        </g>

        {/* MISSION ROUTE OVERLAY */}
        <path
          d={fullPathD}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="6"
          strokeDasharray="10 8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />

        {completedPathD && (
          <path
            d={completedPathD}
            fill="none"
            stroke="#10B981"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {!isPreview && activeSegmentD && gameState !== 'VICTORY' && (
          <path
            d={activeSegmentD}
            fill="none"
            stroke="#2563EB"
            strokeWidth="7"
            strokeDasharray="10 7"
            strokeLinecap="round"
            opacity="0.9"
          />
        )}

        {/* Checkpoint Markers */}
        {waypoints.map((wp, idx) => {
          if (idx === 0) return null;

          const isGoal = idx === waypoints.length - 1;
          const isCompleted = idx <= clampedPos;
          const isCurrentTarget = !isPreview && idx === clampedPos + 1 && gameState !== 'VICTORY';

          return (
            <g key={wp.index} transform={`translate(${wp.x}, ${wp.y})`}>
              {isCurrentTarget && (
                <circle
                  cx="0"
                  cy="0"
                  r="18"
                  fill="#2563EB"
                  opacity="0.3"
                  className="animate-pulse-ring"
                />
              )}
              <circle
                cx="0"
                cy="0"
                r={isGoal ? 16 : 12.5}
                fill={
                  isCompleted
                    ? '#10B981'
                    : isCurrentTarget
                    ? '#2563EB'
                    : isGoal
                    ? '#F59E0B'
                    : '#FFFFFF'
                }
                stroke={
                  isCompleted
                    ? '#065F46'
                    : isCurrentTarget
                    ? '#1E3A8A'
                    : isGoal
                    ? '#92400E'
                    : '#475569'
                }
                strokeWidth="2.5"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontSize={isGoal ? '11' : '10'}
                fontWeight="800"
                fill={
                  isCompleted || isCurrentTarget || isGoal
                    ? '#FFFFFF'
                    : '#0F172A'
                }
              >
                {isCompleted ? '✓' : isGoal ? '★' : idx}
              </text>
            </g>
          );
        })}

        {/* Animated Player Character Token */}
        <g
          style={{
            transform: `translate(${currentPos.x}px, ${currentPos.y}px)`,
            transition: 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {!isPreview && clampedPos < waypoints.length - 1 && (
            <g transform={`rotate(${facingAngle}) translate(25, 0)`}>
              <polygon points="0,-5 9,0 0,5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
            </g>
          )}

          <g
            transform="translate(-24, -42)"
            className={isMoving ? 'animate-character-walk' : 'animate-character-idle'}
          >
            <ellipse cx="24" cy="42" rx="14" ry="5" fill="rgba(15, 23, 42, 0.25)" />
            <rect x="11" y="20" width="26" height="14" rx="5" fill="#D97706" stroke="#78350F" strokeWidth="2" />
            <rect x="14" y="22" width="20" height="16" rx="6" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
            <path d="M18 23 L24 28 L30 23" fill="#FACC15" stroke="#854D0E" strokeWidth="1.5" />
            <circle cx="24" cy="14" r="10.5" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2" />
            <path d="M13 12 C13 4, 35 4, 35 12 Z" fill="#10B981" stroke="#064E3B" strokeWidth="2" />
            <rect x="11" y="11" width="26" height="4" rx="2" fill="#059669" stroke="#064E3B" strokeWidth="1.5" />
            <circle cx="20.5" cy="16.5" r="1.6" fill="#0F172A" />
            <circle cx="27.5" cy="16.5" r="1.6" fill="#0F172A" />
          </g>

          {!isPreview && (
            <g transform="translate(0, -48)">
              <rect
                x="-38"
                y="-15"
                width="76"
                height="18"
                rx="6"
                fill="#0F172A"
                stroke="#FACC15"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="-3"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9.5"
                fontWeight="700"
              >
                {playerName.trim().slice(0, 11) || 'EXPLORER'}
              </text>
            </g>
          )}
        </g>
      </svg>

      {!isPreview && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
              Completed route
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-600" />
              Next checkpoint ({nextTarget.landmarkHint})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-amber-500" />
              Final destination
            </span>
          </div>
          <span className="text-slate-500">
            Map: <strong className="text-slate-800">{mapDef.name}</strong> · Position:{' '}
            <strong className="text-slate-800">{currentPos.landmarkHint}</strong>
          </span>
        </div>
      )}
    </div>
  );
};
