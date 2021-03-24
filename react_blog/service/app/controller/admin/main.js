'use strict'

const Controller=require('egg').Controller
const fs=require('fs')
const path=require('path')

class MainController extends Controller{
    async index(){
        // fs.readFile(path.join(__dirname,'../../public/build/index.html'),{encoding:'utf-8'},(err,data)=>{
        //     if(err){
        //         return console.log(err)
        //     }
        //     console.log(data)
        //     this.ctx.render(data)
        // })
        this.ctx.render('build/index')
    }

    //检查登录
    async checkLogin(){
        // console.log(this.ctx.request.body)
        let username=this.ctx.request.body.userName
        let password=this.ctx.request.body.password
        const sql=`select username from admin_user
                     where username='${username}'
                     and password='${password}'`
        const res=await this.app.mysql.query(sql)
        // console.log(res)
        if(res.length>0){
            let openId=new Date().getTime()
            this.ctx.session.openId={'openId':openId}
            this.ctx.body={'data':'登录成功','openId':openId}
        }else{
            this.ctx.body={'data':'登录失败'}
        }
    }

    //获得文章类别信息
    async getTypeInfo(){
        const resType=await this.app.mysql.select('type')
        this.ctx.body={data:resType}
    }

    //添加文章
    async addArticle(){
        let tmpArticle=this.ctx.request.body
        const result=await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess=result.affectedRows===1
        const insertId=result.insertId
        // console.log(result)

        this.ctx.body={
            isSuccess:insertSuccess,
            insertId:insertId
        }

    }


    //更新文章
    async updateArticle(){
        let tempArticle=this.ctx.request.body
        const result=await this.app.mysql.update('article',tempArticle)
        const updateSuccess=result.affectedRows===1
        this.ctx.body={
            isSuccess:updateSuccess
        }
    }

    //获得文章列表
    async getArticleList(){
        let sql=`select article.id as id,
              article.title as title,
              article.introduce as introduce,
              FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
              article.view_count as view_count,
              type.typeName as typeName
              from article left join type on article.type_id=type.id
              order by article.id desc
              `
        const resList=await this.app.mysql.query(sql)
        this.ctx.body={list:resList}

    }

    //删除文章
    async delArticle(){
        let id=this.ctx.params.id
        const res=await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={data:res}
    }

    //根据id获得文章内容
    async getArticleById(){
        let id=this.ctx.params.id
        let sql=`select article.id as id,
              article.title as title,
              article.article_content as article_content,
              article.introduce as introduce,
              FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
              article.view_count as view_count,
              type.typeName as typeName,
              type.id as typeId
              from article left join type on article.type_id=type.id
              where article.id=${id}
              `
        const result=await this.app.mysql.query(sql)
        this.ctx.body={data:result}

    }

}
module.exports=MainController