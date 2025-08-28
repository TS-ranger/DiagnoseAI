import { NextResponse } from 'next/server';

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file uploaded' }, { status: 400 });
    }

    // Prepare FormData to send to local FastAPI
    const localForm = new FormData();
    localForm.append('file', audioFile);

    // Send to local Whisper server
    const response = await fetch('https://5b1cab464343.ngrok-free.app/transcribe', {
      method: 'POST',
      body: localForm,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ text: data.text });
  } catch (err) {
    console.error('Transcription error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
