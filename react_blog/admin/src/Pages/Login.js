import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin, message } from 'antd'
import '../static/css/login.css'
import servicePath from '../confiig/apiUrl'
import axios from 'axios'
import { createFromIconfontCN } from '@ant-design/icons'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1710762_lqgyqmveqk.js'
})

function Login(props) {
    // console.log(props)

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = () => {
        setIsLoading(true)
        if (!userName) {
            message.error('用户名不能为空')
            setUserName('')
            setPassword('')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false;
        } else if (!password) {
            message.error('密码不能为空')
            setUserName('')
            setPassword('')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }

        let dataProps = {
            'userName': userName,
            'password': password
        }

        axios({
            method: 'POST',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true //这句话的意思是前端后端共享session
        }).then(res => {
            // console.log(res)
            setIsLoading(false)
            if (res.data.data == '登录成功') {
                localStorage.setItem('openId', res.data.openId)
                props.history.push('/index')
            } else {
                message.error('用户名密码错误')
                setUserName('')
                setPassword('')
            }
        })

    }

    return (
        <div className="login-div">
            <Spin tip="loading..." spinning={isLoading}>
                <Card title="博客登陆界面v1.0.1" bordered={true} style={{ width: 400 }}>
                    <Input
                        id="username"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<IconFont type="icon-yonghu" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }}
                        value={userName}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<IconFont type="icon-mima" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login