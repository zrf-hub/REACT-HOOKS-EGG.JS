import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import Header from '../components/Header'
import '../public/style/pages/detail.css'
import { CalendarOutlined, FileTextOutlined, FireOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
const Author = dynamic(import('../components/Author'))
const Advert = dynamic(
  import('../components/Advert'),
  {
    loading: () => <div className="lazy-loading">正在加载中...</div>,
    ssr: false
  }
)
const Footer = dynamic(import('../components/Footer'))
import '../public/style/pages/detail.css'
const Link = dynamic(import('next/link'))
import axios from 'axios'
import servicePath from '../config/apiUrl'


import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'


const Detail = (promise) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(promise.article_content)
  return (
    <div className="container">
      <Head>
        <title>Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><Link href="/"><a>首页</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item>{promise.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item> {promise.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="detailed-title">
              {promise.title}
            </div>
            <div className="list-icon center">
              <span> <CalendarOutlined />{promise.addTime}</span>
              <span> <FileTextOutlined /> {promise.typeName}</span>
              <span> <FireOutlined /> {promise.view_count}</span>
            </div>
            <div className="detailed-content"
              dangerouslySetInnerHTML={{ __html: html }}
            >
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={6} lg={5} xl={5}>
          <Author></Author>
          <Advert></Advert>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {
                tocify && tocify.render()
              }
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detail.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then(res => {
      resolve(res.data.data[0])
    })
  })

  return promise
}


export default Detail
