'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    this.ctx.body='api hi'
  }

  //得到文章列表
  async getArticleList(){
    let sql=`select article.id as id,
              article.title as title,
              article.introduce as introduce,
              FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
              article.view_count as view_count,
              type.typeName as typeName
              from article left join type on article.type_id=type.id
              `

    // let sql = 'SELECT article.id as id,'+
    //              'article.title as title,'+
    //              'article.introduce as introduce,'+
    //              //主要代码----------start(转化时间戳为时间格式，时间戳只能为十位)
    //              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    //              //主要代码----------end
    //              'article.view_count as view_count ,'+
    //              'type.typeName as typeName '+
    //              'FROM article LEFT JOIN type ON article.type_id = type.id'

    const results=await this.app.mysql.query(sql)
    this.ctx.body={data:results}

  }

  //通过id查询具体的某个文章
  async getArticleById(){
    let id=this.ctx.params.id
    let sql=`select article.id as id,
              article.title as title,
              article.introduce as introduce,
              article.article_content as article_content,
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

  //得到类别名称和编号
  async getTypeInfo(){
    const result=await this.app.mysql.select('type')
    this.ctx.body={data:result}
  }
  //根据文章类别ID获得文章列表

  async getListById(){
    let id=this.ctx.params.id
    let sql=`select article.id as id,
              article.title as title,
              article.introduce as introduce,
              FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,
              article.view_count as view_count,
              type.typeName as typeName
              from article left join type on article.type_id=type.id
              where type_id=${id}
              `
    const results=await this.app.mysql.query(sql)
    this.ctx.body={data:results}
  }

}

module.exports = HomeController;







/*RESTful简介和约束方式
RESTful是目前最流行的网络应用程序设计风格和开发方式，大量使用在移动端App上和前后端分离的接口设计。这种形式更直观并且接口也有了一定的约束性。

约束的请求方式和对应的操作。

GET(SELECT) ： 从服务端取出资源，可以同时取出一项或者多项。
POST(CREATE) ：在服务器新建一个资源。
PUT(UPDATE) ：在服务器更新资源（客户端提供改变后的完整资源）。
DELETE(DELETE) ：从服务器删除资源。
*/