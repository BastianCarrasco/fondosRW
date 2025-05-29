// src/components/api.js

const API_URL = 'https://backendrw-production.up.railway.app/postulaciones';

export async function postPostulacion(link) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ link })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al enviar la sugerencia: ${err}`);
  }

  return await res.json();
}
