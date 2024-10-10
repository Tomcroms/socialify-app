import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const FLASK_SERVER_URL = 'http://127.0.0.1:5000';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get('endpoint');

  // Vérifier si l'endpoint est fourni
  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  try {
    // Construire l'URL vers le serveur Flask
    const url = `${FLASK_SERVER_URL}/${endpoint}`;

    // Lire le corps de la requête (body)
    const body = await req.json();

    // Faire l'appel POST vers l'API Flask
    const response = await axios.post(url, body);

    // Retourner la réponse à Next.js
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get('campaignId');
  
    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }
  
    try {
      // Construire l'URL pour vérifier l'état du script
      const url = `${FLASK_SERVER_URL}/check-status/${campaignId}`;
  
      // Faire l'appel GET vers l'API Flask
      const response = await axios.get(url);
  
      // Retourner l'état du script à Next.js
      return NextResponse.json(response.data);
    } catch (error: any) {
      console.error('API Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
  
