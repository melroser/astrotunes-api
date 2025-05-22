import { NextResponse } from 'next/server';
import { generateMusicFromAstro } from '../../lib/musicGenerator';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the input data
    if (!data.output || !Array.isArray(data.output)) {
      return NextResponse.json(
        { error: 'Invalid input data format' },
        { status: 400 }
      );
    }

    // Generate music based on astrological data
    const musicData = generateMusicFromAstro(data.output);

    // Return the generated music data
    return NextResponse.json({
      success: true,
      music: musicData
    });
  } catch (error) {
    console.error('Error processing astro data:', error);
    return NextResponse.json(
      { error: 'Failed to process astrological data' },
      { status: 500 }
    );
  }
}
