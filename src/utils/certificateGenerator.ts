import { CompletedMissionRecord } from '../types/game';
import { formatDuration } from '../components/GameHud';

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function renderCertificateToCanvas(
  canvas: HTMLCanvasElement,
  playerName: string,
  records: CompletedMissionRecord[]
) {
  const width = 1600;
  const height = 1130;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clean Parchment / Off-White Certificate Canvas
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, width, height);

  // Subtle geometric corner accents
  ctx.fillStyle = '#ECFDF5';
  ctx.fillRect(42, 42, width - 84, height - 84);

  // Outer Emerald Double Frame
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 10;
  ctx.strokeRect(42, 42, width - 84, height - 84);

  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 3;
  ctx.strokeRect(62, 62, width - 124, height - 124);

  // Inner White Card Area
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, 84, 84, width - 168, height - 168, 22);
  ctx.fill();
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Top Header Strip
  ctx.fillStyle = '#059669';
  ctx.font = '700 22px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'SENA ENGLISH LEARNING ACTIVITY · INTERACTIVE IMPERATIVES PRACTICE',
    width / 2,
    148
  );

  // Main Certificate Title
  ctx.fillStyle = '#0F172A';
  ctx.font = '800 54px "Outfit", system-ui, sans-serif';
  ctx.fillText('CERTIFICATE OF ACTIVITY COMPLETION', width / 2, 214);

  // Subtitle
  ctx.fillStyle = '#2563EB';
  ctx.font = '700 26px "Outfit", system-ui, sans-serif';
  ctx.fillText('MISSION: FOLLOW THE INSTRUCTIONS!', width / 2, 258);

  // Divider
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(320, 286);
  ctx.lineTo(width - 320, 286);
  ctx.stroke();

  // Presented To Label
  ctx.fillStyle = '#475569';
  ctx.font = '600 24px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('This certifies that the apprentice', width / 2, 336);

  // Player Name
  const displayName = playerName.trim() || 'SENA Apprentice';
  ctx.fillStyle = '#0F172A';
  ctx.font = '800 56px "Outfit", system-ui, sans-serif';
  ctx.fillText(displayName, width / 2, 405);

  // Underline under name
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(410, 424);
  ctx.lineTo(width - 410, 424);
  ctx.stroke();

  // Description
  ctx.fillStyle = '#334155';
  ctx.font = '500 22px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(
    'has successfully completed the following English navigation routes and imperative checkpoints:',
    width / 2,
    472
  );

  // Completed Levels Table Header
  const tableX = 140;
  const tableY = 505;
  const tableW = width - 280;

  ctx.fillStyle = '#F1F5F9';
  drawRoundedRect(ctx, tableX, tableY, tableW, 46, 10);
  ctx.fill();

  ctx.fillStyle = '#334155';
  ctx.font = '700 18px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('MAP / SCENARIO', tableX + 24, tableY + 29);
  ctx.fillText('COMPLETED LEVEL', tableX + 430, tableY + 29);
  ctx.fillText('CHECKPOINTS', tableX + 820, tableY + 29);
  ctx.fillText('TIME', tableX + 1040, tableY + 29);
  ctx.fillText('DATE', tableX + 1170, tableY + 29);

  // Sort records by mapName then difficulty order
  const diffOrder: Record<string, number> = {
    EASY: 1,
    INTERMEDIATE: 2,
    CHALLENGE: 3,
  };
  const sorted = [...records].sort((a, b) => {
    if (a.mapName !== b.mapName) return a.mapName.localeCompare(b.mapName);
    return (diffOrder[a.difficulty] || 9) - (diffOrder[b.difficulty] || 9);
  });

  // Render up to 8 rows cleanly in the certificate table (or compact 2-column summary if > 8)
  if (sorted.length <= 8) {
    sorted.forEach((rec, idx) => {
      const rowY = tableY + 56 + idx * 46;
      ctx.fillStyle = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
      ctx.fillRect(tableX, rowY, tableW, 42);

      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tableX, rowY + 42);
      ctx.lineTo(tableX + tableW, rowY + 42);
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = '700 18px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(rec.mapName, tableX + 24, rowY + 27);

      ctx.fillStyle = '#047857';
      ctx.font = '700 17px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(rec.difficultyTitle, tableX + 430, rowY + 27);

      ctx.fillStyle = '#0F172A';
      ctx.font = '600 17px "JetBrains Mono", monospace';
      ctx.fillText(
        `${rec.correctCount} / ${rec.totalCheckpoints}`,
        tableX + 820,
        rowY + 27
      );
      ctx.fillText(formatDuration(rec.completionSeconds), tableX + 1040, rowY + 27);

      ctx.fillStyle = '#475569';
      ctx.font = '500 16px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(
        new Date(rec.completedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        tableX + 1170,
        rowY + 27
      );
    });
  } else {
    // 2-column layout when learner completes 9..15 missions!
    const colW = (tableW - 24) / 2;
    sorted.slice(0, 15).forEach((rec, idx) => {
      const col = idx < 8 ? 0 : 1;
      const row = idx < 8 ? idx : idx - 8;
      const cellX = tableX + col * (colW + 24);
      const cellY = tableY + 56 + row * 45;

      ctx.fillStyle = row % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
      drawRoundedRect(ctx, cellX, cellY, colW, 40, 8);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = '700 15px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(rec.mapName, cellX + 14, cellY + 25);

      ctx.fillStyle = '#047857';
      ctx.font = '700 14px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(rec.difficultyTitle, cellX + 215, cellY + 25);

      ctx.fillStyle = '#334155';
      ctx.font = '600 14px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(
        `${rec.totalCheckpoints}/${rec.totalCheckpoints} · ${formatDuration(
          rec.completionSeconds
        )}`,
        cellX + colW - 14,
        cellY + 25
      );
    });
  }

  // Footer Summary, Date, Seal & Signature
  const footerY = 965;
  const totalCheckpointsDone = sorted.reduce(
    (acc, r) => acc + r.totalCheckpoints,
    0
  );

  ctx.textAlign = 'left';
  ctx.fillStyle = '#475569';
  ctx.font = '600 18px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(
    `Total Missions Completed: ${sorted.length} / 15  ·  Total Checkpoints Mastered: ${totalCheckpointsDone}`,
    140,
    footerY - 36
  );

  // Left Signature Block
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(140, footerY + 22);
  ctx.lineTo(490, footerY + 22);
  ctx.stroke();

  ctx.fillStyle = '#0F172A';
  ctx.font = '700 18px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('English Learning Program', 140, footerY + 48);
  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('MISSION: FOLLOW THE INSTRUCTIONS!', 140, footerY + 70);

  // Center Official Verification Seal
  const sealX = width / 2;
  const sealY = footerY + 24;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 56, 0, Math.PI * 2);
  ctx.fillStyle = '#ECFDF5';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#059669';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sealX, sealY, 45, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#F59E0B';
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#047857';
  ctx.font = '800 15px "Outfit", system-ui, sans-serif';
  ctx.fillText('VERIFIED', sealX, sealY - 8);
  ctx.font = '800 22px "Outfit", system-ui, sans-serif';
  ctx.fillText('★ ★ ★', sealX, sealY + 14);
  ctx.font = '700 12px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('SENA A1–A2', sealX, sealY + 32);

  // Right Issue Date Block
  ctx.textAlign = 'right';
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width - 490, footerY + 22);
  ctx.lineTo(width - 140, footerY + 22);
  ctx.stroke();

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  ctx.fillStyle = '#0F172A';
  ctx.font = '700 18px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText(todayFormatted, width - 140, footerY + 48);
  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillText('Date of Issue', width - 140, footerY + 70);
}

export function downloadCertificatePng(
  playerName: string,
  records: CompletedMissionRecord[]
) {
  if (records.length === 0) return;
  const canvas = document.createElement('canvas');
  renderCertificateToCanvas(canvas, playerName, records);

  const safeName = (playerName.trim() || 'Apprentice')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `Certificate_Mission_Follow_Instructions_${safeName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
