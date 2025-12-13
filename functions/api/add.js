export async function onRequestPost({ request, env }) {
  const { content, token } = await request.json();

  if (token !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: '无权限' }), { status: 401 });
  }

  const id = Date.now().toString();

  await env.REVIEWS_KV.put(id, JSON.stringify({
    id,
    content,
    deleted: false
  }));

  return new Response(JSON.stringify({ message: '添加成功' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
