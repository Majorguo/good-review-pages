export async function onRequest({ env }) {
  let list = [];
  let cursor;
  do {
    const { keys, list_complete, cursor: nextCursor } = await env.REVIEWS_KV.list({ cursor });
    cursor = nextCursor;
    for (const key of keys) {
      const val = await env.REVIEWS_KV.get(key.name, { type: 'json' });
      if(val) list.push(val);
    }
  } while(cursor);

  // 过滤已删除并按最新更新时间排序
  list = list.filter(r => !r.deleted)
             .sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));

  return new Response(JSON.stringify(list), {
    headers: { 'Content-Type': 'application/json' }
  });
}
