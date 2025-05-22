import { NextResponse } from 'next/server';
import { generateMusicFromAstro } from '../../lib/musicGenerator';
import { headers } from 'next/headers';

// Define headers type
interface Headers {
  [key: string]: string;
}

// Handle CORS preflight requests
export async function OPTIONS() {
  const headers: Headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  return NextResponse.json({}, { headers });
}

export async function POST(request: Request) {
  try {
    // Add CORS headers
    const headers: Headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    const data = await request.json();
    
    // Validate the input data
    if (!data.output || !Array.isArray(data.output)) {
      return NextResponse.json(
        { error: 'Invalid input data format' },
        { status: 400, headers }
      );
    }

    // Generate music based on astrological data
    const musicData = generateMusicFromAstro(data.output);

    // Return the generated music data
    return NextResponse.json({
      success: true,
      music: musicData
    }, { headers });
  } catch (error) {
    console.error('Error processing astro data:', error);
    const errorHeaders: Headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    return NextResponse.json(
      { error: 'Failed to process astrological data' },
      { status: 500, headers: errorHeaders }
    );
  }
}
