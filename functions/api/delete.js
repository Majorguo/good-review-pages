export async function onRequestPost({ request, env }) {
  const { token } = await request.json();
  if(token !== env.ADMIN_TOKEN) return Response.json({error:'无权限'},{status:403});
  await env.DB.prepare("UPDATE reviews SET deleted=1 WHERE deleted=0 LIMIT 1").run();
  return Response.json({message:'删除成功'});
}