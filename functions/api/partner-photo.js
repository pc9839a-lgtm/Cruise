const IMAGE_FILES = {
  ship: '/img/partner/actual/cruise-01.webp.b64',
  wake: '/img/partner/actual/cruise-02.webp.b64',
  balcony: '/img/partner/actual/v7-balcony.webp.b64'
};

function decodeBase64(base64) {
  const binary = atob(base64.replace(/\s+/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export async function onRequestGet(context) {
  const requestUrl = new URL(context.request.url);
  const name = String(requestUrl.searchParams.get('name') || 'ship').trim();
  const filePath = IMAGE_FILES[name] || IMAGE_FILES.ship;
  const assetUrl = new URL(filePath, requestUrl.origin);
  const assetResponse = await context.env.ASSETS.fetch(assetUrl);

  if (!assetResponse.ok) {
    return new Response('Image source not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
    });
  }

  try {
    const base64 = await assetResponse.text();
    const bytes = decodeBase64(base64);
    return new Response(bytes, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    return new Response('Image decode failed', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
    });
  }
}
