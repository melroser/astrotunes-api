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
type Element = 'Fire' | 'Water' | 'Air' | 'Earth';

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

const ELEMENT_TO_TEMPO: Record<Element, number> = {
  'Fire': 120,  // Aries, Leo, Sagittarius
  'Water': 80,  // Cancer, Scorpio, Pisces
  'Air': 100,   // Gemini, Libra, Aquarius
  'Earth': 90    // Taurus, Virgo, Capricorn
};

const SIGN_TO_ELEMENT: Record<ZodiacSign, Element> = {
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

function getElementForSign(sign: ZodiacSign): Element {
  return SIGN_TO_ELEMENT[sign];
}

export interface AstroPlanet {
  planet: {
    en: string;
  };
  zodiac_sign: {
    number: number;
    name: {
      en: string;
    };
  };
}

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
  const mode = SIGN_TO_MODE[sunSign] || 'major' as ScaleMode;

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

type Mood = 'emotional' | 'intense' | 'dreamy' | 'dramatic' | 'energetic' | 'playful' | 'harmonious' | 'innovative' | 'adventurous' | 'grounded' | 'precise' | 'structured' | 'balanced';

function getMelodyMood(sign: ZodiacSign): Mood {
  const moods: Record<ZodiacSign, Mood> = {
    'Cancer': 'emotional',
    'Scorpio': 'intense',
    'Pisces': 'dreamy',
    'Leo': 'dramatic',
    'Aries': 'energetic',
    'Gemini': 'playful',
    'Libra': 'harmonious',
    'Aquarius': 'innovative',
    'Sagittarius': 'adventurous',
    'Taurus': 'grounded',
    'Virgo': 'precise',
    'Capricorn': 'structured'
  };
  return moods[sign] || 'balanced';
}

type Instrument = 'cello' | 'violin' | 'flute' | 'piano' | 'harmonica' | 'clarinet' | 'bass' | 'synthesizer' | 'drums' | 'guitar' | 'saxophone' | 'trumpet';

function getInstrumentForSign(sign: ZodiacSign): Instrument {
  const instruments: Record<'Venus', Record<ZodiacSign, Instrument>> = {
    'Venus': {
      'Taurus': 'cello',
      'Libra': 'violin',
      'Pisces': 'flute',
      'Gemini': 'piano',
      'Cancer': 'harmonica',
      'Virgo': 'clarinet',
      'Capricorn': 'bass',
      'Aquarius': 'synthesizer',
      'Aries': 'drums',
      'Leo': 'guitar',
      'Sagittarius': 'saxophone',
      'Scorpio': 'trumpet'
    }
  };
  return instruments.Venus[sign] || 'piano';
}

type RhythmIntensity = 'intense' | 'steady' | 'variable' | 'flowing' | 'powerful' | 'precise' | 'balanced' | 'passionate' | 'free-form' | 'structured' | 'experimental' | 'dreamy' | 'moderate';

function getRhythmIntensity(sign: ZodiacSign): RhythmIntensity {
  const rhythms: Record<'Mars', Record<ZodiacSign, RhythmIntensity>> = {
    'Mars': {
      'Aries': 'intense',
      'Taurus': 'steady',
      'Gemini': 'variable',
      'Cancer': 'flowing',
      'Leo': 'powerful',
      'Virgo': 'precise',
      'Libra': 'balanced',
      'Scorpio': 'passionate',
      'Sagittarius': 'free-form',
      'Capricorn': 'structured',
      'Aquarius': 'experimental',
      'Pisces': 'dreamy'
    }
  };
  return rhythms.Mars[sign] || 'moderate';
}

type ScaleMode = 'major' | 'minor';
type Scale = string[];

function getScale(key: string, mode: ScaleMode): Scale {
  const intervals: Record<ScaleMode, number[]> = {
    'major': [0, 2, 4, 5, 7, 9, 11],
    'minor': [0, 2, 3, 5, 7, 8, 10]
  };
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const scale: Scale = [];
  const rootIndex = notes.indexOf(key);
  if (rootIndex === -1) return ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  for (const interval of intervals[mode]) {
    scale.push(notes[(rootIndex + interval) % 12]);
  }
  return scale;
}
