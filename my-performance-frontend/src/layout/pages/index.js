import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import Router from './components/Router';
import HeaderRight from './components/HeaderRight';
import { urlArr } from './components/Config';
import { style } from './index.less';

const { Header, Content, Footer } = Layout;
const MenuItem = Menu.Item;

class index extends Component {
  state = {
    activeKey: 1,
  }

  render() {
    const { activeKey } = this.state;

    return (<div className={style}>

      <div className={"header"}>
        性能监控系统
        <span className="f-fr">
          <HeaderRight />
        </span>
      </div>
      <div className={"container"}>
        <div className={"sider"}>
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            selectedKeys={[`${activeKey}`]}
          >
            {
              urlArr.map(it => <MenuItem key={it.key}>
              <Link to={it.url} onClick={() => this.setState({ activeKey: it.key })}>{it.title}</Link>
              </MenuItem>)
            }
          </Menu>
        </div>
        <div className={"main"}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Router />
          </Content>
          <Footer style={{ textAlign: 'center' }}> ©2020</Footer>
        </div>
      </div>
    </div>)
  }
}

export default index;