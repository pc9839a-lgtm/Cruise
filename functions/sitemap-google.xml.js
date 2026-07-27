const XML_HEADERS = {
  'Content-Type': 'application/xml; charset=UTF-8',
  'Cache-Control': 'public, max-age=0, must-revalidate, no-transform',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'all'
};

export async function onRequest({ request, env }) {
  const assetResponse = await env.ASSETS.fetch(request);

  if (!assetResponse.ok) {
    return new Response('Google sitemap asset unavailable\n', {
      status: 503,
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }

  return new Response(assetResponse.body, {
    status: 200,
    headers: XML_HEADERS
  });
}
