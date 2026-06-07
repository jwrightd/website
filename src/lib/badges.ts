export interface BadgeTone {
  fg: string;
  bg: string;
  border: string;
}

const GOLD: BadgeTone = { fg: '#ffd60a', bg: 'rgba(255,214,10,0.12)', border: 'rgba(255,214,10,0.30)' };
const CYAN: BadgeTone = { fg: '#22d3ee', bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.28)' };
const GREEN: BadgeTone = { fg: '#32d74b', bg: 'rgba(50,215,75,0.12)', border: 'rgba(50,215,75,0.28)' };
const BLUE: BadgeTone = { fg: '#4f8ef7', bg: 'rgba(79,142,247,0.14)', border: 'rgba(79,142,247,0.30)' };
const SLATE: BadgeTone = { fg: '#cbd5e1', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.24)' };

/** Map a free-text status into an accolade tone so wins/publications pop. */
export function getStatusTone(status: string): BadgeTone {
  const s = status.toLowerCase();
  if (s.includes('winner') || s.includes('award') || s.includes('champion')) return GOLD;
  if (s.includes('preprint') || s.includes('published') || s.includes('co-author')) return CYAN;
  if (s.includes('top ') || s.includes('elo') || /\d/.test(s)) return BLUE;
  if (s.includes('ongoing') || s.includes('progress')) return GREEN;
  return SLATE;
}

export function getProjectProofTone(tone: string): BadgeTone {
  if (tone === 'winner') return GOLD;
  if (tone === 'published') return CYAN;
  if (tone === 'research') return GREEN;
  if (tone === 'vision') return BLUE;
  if (tone === 'engine') return { fg: '#c4b5fd', bg: 'rgba(167,139,250,0.13)', border: 'rgba(167,139,250,0.28)' };
  if (tone === 'sustainability') return { fg: '#86efac', bg: 'rgba(34,197,94,0.11)', border: 'rgba(34,197,94,0.24)' };
  return SLATE;
}
