export async function onRequestGet({ env }) {
  const list = await env.REVIEWS_KV.list();
  const reviews = [];

  for (const key of list.keys) {
    const item = await env.REVIEWS_KV.get(key.name, { type: 'json' });
    if (item && !item.deleted) reviews.push(item);
  }

  return new Response(JSON.stringify(reviews), {
    headers: { 'Content-Type': 'application/json' }
  });
}
