export async function onRequestPost({ request, env }) {
  const { id } = await request.json(); // 不再需要 token

  const item = await env.REVIEWS_KV.get(id, { type: 'json' });
  if (!item) {
    return new Response(JSON.stringify({ error: '未找到此好评' }), { status: 404 });
  }

  item.deleted = true;
  await env.REVIEWS_KV.put(id, JSON.stringify(item));

  return new Response(JSON.stringify({ message: '删除成功' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
