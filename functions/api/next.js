export async function onRequest({ env }) {
  const row = await env.DB.prepare("SELECT id,content FROM reviews WHERE deleted=0 ORDER BY id LIMIT 1").first();
  return Response.json(row || {});
}