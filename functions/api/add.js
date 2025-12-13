export async function onRequestPost({ request, env }) {
  const { content, token } = await request.json();

  if (token !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: '无权限' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const ts = Date.now();
  const id = ts.toString(); // 用时间戳做 id（唯一 & 可排序）

  const record = {
    id,
    content,
    created_at: new Date(ts).toISOString(),
    updated_at: new Date(ts).toISOString(),
    created_at_ts: ts,
    updated_at_ts: ts,
    deleted: false
  };

  await env.REVIEWS_KV.put(id, JSON.stringify(record));

  return new Response(JSON.stringify({
    message: '添加成功',
    data: record
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
