export interface AstroPlanet {
  planet: { en: string };
  fullDegree: number;
  normDegree: number;
  isRetro: string;
  zodiac_sign: {
    number: number;
    name: { en: string };
  };
}

// Music mapping constants
const SIGN_TO_KEY = {
  'Aries': 'C',
  'Taurus': 'D',
  'Gemini': 'E',
  'Cancer': 'F',
  'Leo': 'G',
  'Virgo': 'A',
  'Libra': 'B',
  'Scorpio': 'C#',
  'Sagittarius': 'D#',
  'Capricorn': 'F#',
  'Aquarius': 'G#',
  'Pisces': 'A#'
};

const SIGN_TO_MODE = {
  'Aries': 'major',
  'Taurus': 'major',
  'Gemini': 'major',
  'Cancer': 'minor',
  'Leo': 'major',
  'Virgo': 'minor',
  'Libra': 'major',
  'Scorpio': 'minor',
  'Sagittarius': 'major',
  'Capricorn': 'minor',
  'Aquarius': 'major',
  'Pisces': 'minor'
};

const ELEMENT_TO_TEMPO = {
  'Fire': 120,  // Aries, Leo, Sagittarius
  'Water': 80,  // Cancer, Scorpio, Pisces
  'Air': 100,   // Gemini, Libra, Aquarius
  'Earth': 90    // Taurus, Virgo, Capricorn
};

export function generateMusicFromAstro(planets: AstroPlanet[]) {
  // Find key planets
  const sun = planets.find(p => p.planet.en === 'Sun');
  const moon = planets.find(p => p.planet.en === 'Moon');
  const ascendant = planets.find(p => p.planet.en === 'Ascendant');
  const venus = planets.find(p => p.planet.en === 'Venus');
  const mars = planets.find(p => p.planet.en === 'Mars');

  if (!sun || !moon || !ascendant || !venus || !mars) {
    throw new Error('Missing required planets');
  }

  // Determine key and mode based on Sun sign
  const key = SIGN_TO_KEY[sun.zodiac_sign.name.en] || 'C';
  const mode = SIGN_TO_MODE[sun.zodiac_sign.name.en] || 'major';

  // Determine tempo based on Ascendant element
  const element = getElementForSign(ascendant.zodiac_sign.name.en);
  const tempo = ELEMENT_TO_TEMPO[element] || 100;

  // Determine melody mood based on Moon sign
  const melodyMood = getMelodyMood(moon.zodiac_sign.name.en);

  // Determine instrument based on Venus sign
  const instrument = getInstrumentForSign(venus.zodiac_sign.name.en);

  // Determine rhythm intensity based on Mars sign
  const rhythmIntensity = getRhythmIntensity(mars.zodiac_sign.name.en);

  return {
    key,
    mode,
    tempo,
    melodyMood,
    instrument,
    rhythmIntensity,
    // Add more musical parameters as needed
    duration: 180,  // 3 minutes
    timeSignature: '4/4',
    scale: getScale(key, mode)
  };
}

function getElementForSign(sign: string): string {
  const elements = {
    'Aries': 'Fire',
    'Taurus': 'Earth',
    'Gemini': 'Air',
    'Cancer': 'Water',
    'Leo': 'Fire',
    'Virgo': 'Earth',
    'Libra': 'Air',
    'Scorpio': 'Water',
    'Sagittarius': 'Fire',
    'Capricorn': 'Earth',
    'Aquarius': 'Air',
    'Pisces': 'Water'
  };
  return elements[sign] || 'Air';
}

function getMelodyMood(sign: string): string {
  const moods = {
    'Cancer': 'emotional',
    'Scorpio': 'intense',
    'Pisces': 'dreamy',
    'Leo': 'bold',
    'Aries': 'energetic',
    'Gemini': 'playful',
    'Libra': 'harmonious',
    'Aquarius': 'ethereal',
    'Sagittarius': 'adventurous',
    'Taurus': 'grounded',
    'Virgo': 'precise',
    'Capricorn': 'structured'
  };
  return moods[sign] || 'balanced';
}

function getInstrumentForSign(sign: string): string {
  const instruments = {
    'Venus': {
      'Taurus': 'strings',
      'Libra': 'piano',
      'Pisces': 'synth',
      'Gemini': 'guitar',
      'Cancer': 'flute',
      'Virgo': 'harp',
      'Capricorn': 'cello',
      'Aquarius': 'electric guitar',
      'Aries': 'drums',
      'Leo': 'trumpet',
      'Sagittarius': 'saxophone',
      'Scorpio': 'bass'
    }
  };
  return instruments.Venus[sign] || 'piano';
}

function getRhythmIntensity(sign: string): string {
  const intensities = {
    'Aries': 'aggressive',
    'Taurus': 'steady',
    'Gemini': 'fast',
    'Cancer': 'flowing',
    'Leo': 'powerful',
    'Virgo': 'precise',
    'Libra': 'smooth',
    'Scorpio': 'intense',
    'Sagittarius': 'energetic',
    'Capricorn': 'controlled',
    'Aquarius': 'unpredictable',
    'Pisces': 'floating'
  };
  return intensities[sign] || 'moderate';
}

function getScale(key: string, mode: string): string[] {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const scalePatterns = {
    'major': [0, 2, 4, 5, 7, 9, 11],
    'minor': [0, 2, 3, 5, 7, 8, 10]
  };

  const startIndex = notes.indexOf(key);
  const pattern = scalePatterns[mode];
  
  return pattern.map(interval => {
    const noteIndex = (startIndex + interval) % 12;
    return notes[noteIndex];
  });
}
