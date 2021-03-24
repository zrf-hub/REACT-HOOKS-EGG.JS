import '../public/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1710762_6g1psbkd46o.js',
});

const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo)
                .then(res => {
                    return res.data.data
                })
            setNavArray(result)
        }
        fetchData()
    }, [])
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={14} lg={15} xl={14}>
                    <span className="header-logo">博客</span>
                    <span className="header-txt">前端知识汇总</span>
                </Col>
                <Col xs={0} sm={0} md={10} lg={9} xl={6}>
                    <Menu mode="horizontal">
                        <Menu.Item key="0">
                            <Link href="/">
                                <a>
                                    <IconFont type="icon-zhuye" />
                                    首页
                                </a>
                            </Link>
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id}>
                                        <Link href={{pathname:'/list',query:{id:item.id}}}>
                                            <a>
                                                <IconFont type={item.icon} />
                                                {item.typeName}
                                            </a>
                                        </Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header