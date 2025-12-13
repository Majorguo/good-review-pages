export async function onRequest({ env }) {
  let list = [];
  let cursor;

  do {
    const res = await env.REVIEWS_KV.list({ cursor });
    cursor = res.cursor;

    for (const key of res.keys) {
      const val = await env.REVIEWS_KV.get(key.name, { type: 'json' });
      if (val) list.push(val);
    }
  } while (cursor);

  // ⭐只用时间戳排序（绝对稳定）
  list = list
    .filter(item => !item.deleted)
    .sort((a, b) => {
      const tA = a.updated_at_ts || a.created_at_ts || 0;
      const tB = b.updated_at_ts || b.created_at_ts || 0;
      return tB - tA; // 最新在前
    });

  return new Response(JSON.stringify(list), {
    headers: { 'Content-Type': 'application/json' }
  });
}
