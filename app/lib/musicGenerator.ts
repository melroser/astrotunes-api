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

type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

// Music mapping constants
const SIGN_TO_KEY: Record<ZodiacSign, string> = {
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

const SIGN_TO_MODE: Record<ZodiacSign, string> = {
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
  const ascendant = planets.find(p => p.planet.en === 'Ascendant');

  // Validate required planets
  if (!sun || !ascendant) {
    throw new Error('Sun and Ascendant positions are required');
  }

  // Determine key and mode based on Sun sign
  const sunSign = sun.zodiac_sign.name.en as ZodiacSign;
  const key = SIGN_TO_KEY[sunSign] || 'C';
  const mode = SIGN_TO_MODE[sunSign] || 'major';

  // Determine tempo based on Ascendant element
  const ascendantSign = ascendant.zodiac_sign.name.en as ZodiacSign;
  const tempo = ELEMENT_TO_TEMPO[getElementForSign(ascendantSign)] || 100;

  // Determine melody mood based on Moon sign
  const moon = planets.find(p => p.planet.en === 'Moon');
  const melodyMood = moon ? getMelodyMood(moon.zodiac_sign.name.en as ZodiacSign) : 'neutral';

  // Determine instrument based on Venus sign
  const venus = planets.find(p => p.planet.en === 'Venus');
  const instrument = venus ? getInstrumentForSign(venus.zodiac_sign.name.en as ZodiacSign) : 'piano';

  // Determine rhythm intensity based on Mars sign
  const mars = planets.find(p => p.planet.en === 'Mars');
  const rhythmIntensity = mars ? getRhythmIntensity(mars.zodiac_sign.name.en as ZodiacSign) : 'moderate';

  // Generate scale based on key and mode
  const scale = getScale(key, mode);

  return {
    key,
    mode,
    tempo,
    melodyMood,
    instrument,
    rhythmIntensity,
    duration: 180, // seconds
    timeSignature: '4/4',
    scale
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
