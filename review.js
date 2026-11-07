'use strict';

const library = Object.freeze([
  { id: 'C-014', version: 2, source: '2025 onboarding pilot', owner: 'Morgan', metric: 'onboarding time', value: 40, qualifier: 'up to', population: 'Pro-plan teams', timeframe: '2025 pilot', wording: 'In our 2025 pilot, Pro-plan teams reduced onboarding time by up to 40%.' },
  { id: 'C-031', version: 1, source: 'Lumen support handbook', owner: 'Morgan', metric: 'support availability', population: 'Pro-plan teams', wording: 'Pro-plan teams have weekday support.' },
  { id: 'C-052', version: 1, source: 'Lumen product specification', owner: 'Morgan', metric: 'data export', population: 'All plans', wording: 'All plans support CSV exports.' }
]);

function inspectDraft(draft) {
  const notes = [];
  const verified = new Set();
  const fields = [['Caption', draft.caption], ['Banner', draft.banner]];
  for (const [field, value] of fields) {
    if (field === 'Banner' && draft.image && draft.imageText === 'none') continue;
    for (const { segment } of new Intl.Segmenter('en', { granularity: 'sentence' }).segment(value)) {
      const sentence = segment.trim();
      if (!sentence || /^Book a 15-minute demo\.?$/i.test(sentence)) continue;
      const match = library.find(claim => claim.wording === sentence);
      if (match) {
        verified.add(match.id);
        continue;
      }
      const percent = sentence.match(/(\d+(?:\.\d+)?)\s*%/);
      const onboarding = /onboarding/i.test(sentence) && (percent || /halves|twice|faster|guarantee/i.test(sentence));
      if (onboarding) {
        const differences = [];
        if (percent && Number(percent[1]) !== 40) differences.push('The approved value is 40%.');
        if (!/up to/i.test(sentence)) differences.push('Add “up to” to qualify the result.');
        if (!/pro.plan/i.test(sentence) || /every team|all teams/i.test(sentence)) differences.push('Limit the audience to Pro-plan teams.');
        if (!/2025 pilot/i.test(sentence)) differences.push('Include the 2025 pilot context.');
        if (!/onboarding time/i.test(sentence)) differences.push('Use the approved measure of onboarding time.');
        const verdict = percent && Number(percent[1]) !== 40 ? 'Contradicted' : 'Out of scope';
        notes.push([field, verdict, 'C-014 v2. ' + (differences.join(' ') || 'Use the exact approved statement to preserve its meaning.')]);
      } else {
        notes.push([field, percent || /guarantee|#1|best in/i.test(sentence) ? 'Unsupported' : 'Needs human', 'No approved claim matches “' + sentence + '”. Check the evidence library or revise this sentence.']);
      }
    }
    if (/customers? success team/i.test(value)) notes.push([field, 'Terminology', 'R-001 v1. Use “Customer Success” as the team name.']);
  }
  if (!(draft.image && draft.imageText === 'none') && library.some(claim => draft.caption.includes(claim.wording) !== draft.banner.includes(claim.wording))) {
    notes.push(['Caption and banner', 'Mismatch', 'The caption and banner use different approved claims. Compare both with the evidence library.']);
  }
  if (draft.image && !draft.imageText) notes.push(['Banner', 'Needs human', 'Run OCR or have a reviewer verify the image transcription.']);
  if (!draft.alt.trim()) notes.push(['Alternative text', 'Missing', 'Add alternative text for the banner.']);
  if (draft.image && draft.imageText !== 'none' && !draft.banner.trim()) notes.push(['Banner', 'Missing', 'Enter the text visible in the image.']);
  if (draft.font === 'Other') notes.push(['Banner design', 'Font', 'R-002 v1. Use Georgia or the system sans font.']);
  if (draft.inkColor || draft.paperColor) {
    const colors = [draft.inkColor || '#1c1b18', draft.paperColor || '#f3eee3'];
    const luminance = colors.map(hex => [0.2126, 0.7152, 0.0722].reduce((sum, weight, index) => {
      const channel = parseInt(hex.slice(1 + 2 * index, 3 + 2 * index), 16) / 255;
      return sum + weight * (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    }, 0));
    const ratio = (Math.max(...luminance) + 0.05) / (Math.min(...luminance) + 0.05);
    if (ratio < 4.5) notes.push(['Banner design', 'Low contrast', 'R-003 v1. Declared colors have a ' + ratio.toFixed(2) + ':1 ratio. Use at least 4.5:1.']);
    const palette = ['#1c1b18', '#f3eee3', '#1f4d3f', '#fffdf6', '#ffffff'];
    if (colors.some(color => !palette.includes(color))) notes.push(['Banner design', 'Palette', 'R-004 v1. Choose a color from the approved ink, paper, green, or white palette.']);
  }
  return { notes, verified: [...verified] };
}


if (typeof module !== 'undefined') module.exports = { library, inspectDraft };
