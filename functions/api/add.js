export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { content, token } = body;

    if (!env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: '服务器未配置管理员密码' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (token !== env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: '无权限' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 临时返回成功（不写数据库，先验证权限）
    return new Response(
      JSON.stringify({ message: '添加成功（权限验证通过）' }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
