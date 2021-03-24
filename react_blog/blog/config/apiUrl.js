let ipUrl='http://127.0.0.1:7001/default/'
// let ipUrl='http://rufu.fun:7001/default/'

let servicePath={
    getArticleList:ipUrl+'getArticleList/',//主页列表
    getArticleById:ipUrl+'getArticleById/', //文章详情
    getTypeInfo:ipUrl+'getTypeInfo/',        //获得文章类别
    getListById:ipUrl+'getListById/'
}
export default servicePath

// import axios from 'axios'
// const myAxios=axios.create({
//     baseURL:'http://127.0.0.1:7001/default'
// })

// export default myAxios