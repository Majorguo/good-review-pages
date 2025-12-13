export async function onRequestPost({ request, env }) {
  const { content, token } = await request.json();
  if(token !== env.ADMIN_TOKEN) return Response.json({error:'无权限'},{status:403});
  const exist = await env.DB.prepare("SELECT 1 FROM reviews WHERE content=?").bind(content).first();
  if(exist) return Response.json({error:'重复内容'});
  await env.DB.prepare("INSERT INTO reviews(content,deleted) VALUES(?,0)").bind(content).run();
  return Response.json({message:'添加成功'});
}