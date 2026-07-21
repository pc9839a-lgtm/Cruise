export async function onRequest() {
  return new Response(
    'google.com, pub-1906196934401001, DIRECT, f08c47fec0942fa0\n',
    {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
        'X-Content-Type-Options': 'nosniff'
      }
    }
  );
}
