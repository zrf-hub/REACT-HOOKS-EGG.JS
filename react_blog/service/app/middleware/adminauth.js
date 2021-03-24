module.exports=options=>{ //路由守卫，通过中间件实现，在路由执行之前执行
    return async function adminauth(ctx,next){
        // console.log(ctx.session.openId)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}