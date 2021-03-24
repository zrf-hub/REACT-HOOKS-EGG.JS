import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import Header from '../components/Header'
import { CalendarOutlined, FileTextOutlined, FireOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
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
dynamic(import('../public/style/pages/list.css'))
const Link = dynamic(import('next/link'))
import axios from 'axios'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'



const MyList = (promise) => {
    const [mylist, setMylist] = useState(promise.data)

    const renderer = new marked.Renderer()
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



    useEffect(() => {
        setMylist(promise.data)
    })

    return (
        <div className="container">
            <Head>
                <title>张如福的个人博客</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <List
                        header={
                            <div className="bread-div">
                                <Breadcrumb>
                                    <Breadcrumb.Item><Link href="/"><a>首页</a></Link></Breadcrumb.Item>
                                    <Breadcrumb.Item>{mylist[0].typeName}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        }
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={item => (
                            <List.Item>
                                <div className="list-title">
                                    <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                                        <a>{item.title}</a>
                                    </Link>
                                </div>
                                <div className="list-icon">
                                    <span><CalendarOutlined /> {item.addTime}</span>
                                    <span><FileTextOutlined /> {item.typeName}</span>
                                    <span><FireOutlined /> {item.view_count}</span>
                                </div>
                                <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>

                                </div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={6} lg={5} xl={5}>
                    <Author></Author>
                    <Advert></Advert>
                </Col>
            </Row>
            <Footer></Footer>
        </div>
    )
}

MyList.getInitialProps = async (context) => {
    let id = context.query.id
    const promise = new Promise((resolve) => {
        axios(servicePath.getListById + id).then(res => {
            resolve(res.data)
        })
    })

    return promise
}

export default MyList
