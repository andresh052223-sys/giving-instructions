import React from 'react';

interface ExplorerAvatarProps {
  isMoving?: boolean;
  mood?: 'ready' | 'happy' | 'oops';
  size?: number;
  className?: string;
}

export const ExplorerAvatar: React.FC<ExplorerAvatarProps> = ({
  isMoving = false,
  mood = 'ready',
  size = 56,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isMoving ? 'animate-character-walk' : 'animate-character-idle'} ${className}`}
      aria-hidden="true"
    >
      {/* Ground Shadow */}
      <ellipse cx="32" cy="58" rx="16" ry="4.5" fill="rgba(15, 23, 42, 0.25)" />

      {/* Explorer Backpack */}
      <rect
        x="15"
        y="31"
        width="34"
        height="18"
        rx="7"
        fill="#D97706"
        stroke="#78350F"
        strokeWidth="2.5"
      />
      <rect x="20" y="34" width="24" height="6" rx="3" fill="#F59E0B" />

      {/* Torso / Adventure Jacket */}
      <rect
        x="19"
        y="33"
        width="26"
        height="20"
        rx="8"
        fill="#2563EB"
        stroke="#1E3A8A"
        strokeWidth="2.5"
      />
      {/* Jacket Collar / Compass Scarf */}
      <path
        d="M24 34 L32 41 L40 34"
        fill="#FACC15"
        stroke="#854D0E"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Shoes */}
      <ellipse
        cx="25"
        cy="54"
        rx="5.5"
        ry="3.5"
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="2"
      />
      <ellipse
        cx="39"
        cy="54"
        rx="5.5"
        ry="3.5"
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="2"
      />

      {/* Head */}
      <circle
        cx="32"
        cy="24"
        r="13.5"
        fill="#FDBA74"
        stroke="#7C2D12"
        strokeWidth="2.5"
      />

      {/* Explorer Cap */}
      <path
        d="M18 22 C18 12, 46 12, 46 22 Z"
        fill="#10B981"
        stroke="#064E3B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 22 L48 22 C49 24.5, 46 26, 32 26 C18 26, 15 24.5, 16 22 Z"
        fill="#059669"
        stroke="#064E3B"
        strokeWidth="2"
      />
      {/* Cap Badge */}
      <circle cx="32" cy="16.5" r="3" fill="#FACC15" stroke="#064E3B" strokeWidth="1.5" />

      {/* Facial Expression */}
      {mood === 'oops' ? (
        <>
          <path d="M25 25 L29 29 M29 25 L25 29" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M35 25 L39 29 M39 25 L35 29" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="32" cy="33" r="2.2" fill="#7C2D12" />
        </>
      ) : (
        <>
          <circle cx="27" cy="27" r="2.1" fill="#0F172A" />
          <circle cx="37" cy="27" r="2.1" fill="#0F172A" />
          <circle cx="27.6" cy="26.3" r="0.7" fill="#FFFFFF" />
          <circle cx="37.6" cy="26.3" r="0.7" fill="#FFFFFF" />
          {mood === 'happy' ? (
            <path
              d="M27.5 31.2 Q32 35.5 36.5 31.2"
              stroke="#7C2D12"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M28.5 31.5 Q32 34 35.5 31.5"
              stroke="#7C2D12"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </>
      )}
    </svg>
  );
};
