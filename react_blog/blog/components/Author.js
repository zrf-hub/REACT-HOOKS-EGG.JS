import { Avatar, Divider, Tag, Popover } from "antd"
import '../public/style/components/author.css'
import { QqOutlined, WechatOutlined, GithubOutlined } from '@ant-design/icons'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="/二哈.jpg" /></div>
            <div className="author-introduction">
                专注于web前端开发
                <div>
                    <Tag color="magenta">React</Tag>
                    <Tag color="red">webpack</Tag>
                    <Tag color="green">NextJs</Tag>
                    <Tag color="blue">NodeJs</Tag>
                    <Tag color="lime">MongoDB</Tag>
                </div>
                <Divider>社交账号</Divider>
                <Popover trigger="hover" content={<a className="github" href="https://github.com/zrf-hub">https://github.com/zrf-hub</a>}>
                    <Avatar size={34} icon={<GithubOutlined />} className="account" />
                </Popover>
                <Popover trigger="hover" content="QQ:1224865162">
                    <Avatar size={34} icon={<QqOutlined />} className="account" />
                </Popover>
                <Popover trigger="hover" content="wechat:zhangrufu147">
                    <Avatar size={34} icon={<WechatOutlined />} className="account" />
                </Popover>

            </div>
        </div>
    )
}


export default Author