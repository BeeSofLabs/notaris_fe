import React, { Component } from "react";
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import { CookieStorage } from 'cookie-storage';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const cookieStorage = new CookieStorage({
  path: '/'
});
class DashboardWrapper extends Component {

  handleLogout() {
    cookieStorage.clear();
    window.location = '/';
  }
  render() {
    const { children } = this.props 
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {!this.props.noMenu && <Sider
          width="256"
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            background: '#fff'
          }}
          onBreakpoint={(broken) => {

          }}
          onCollapse={(collapsed, type) => {

          }}
        >
          <div className="header-left">
            <Row gutter={12}>
              <Col md={6}>
                <div className="image-wrapper">
                  <img src={require('../../../app/assets/img/photo-profil.png')} alt="" />
                </div>
              </Col>
              <Col md={14}>
                <div className="name-profile">
                  <h4>Ary Suryawan</h4>
                </div>
              </Col>
              <Col md={4}>

              </Col>
            </Row>
          </div>
          <Menu defaultSelectedKeys={['3']} mode="inline">

            <Menu.Item key="1">Dashboard</Menu.Item>
            <Menu.Item key="1">
              <a href="/dashboard/profile">
                Profile
              </a>
            </Menu.Item>
            <Menu.Item key="1">
              <a href="/dashboard/list-order">
                Order
              </a>
            </Menu.Item>
            <button
              type="button"
              style={{
                background: 'none',
                border: '1px solid rgba(0, 0, 0, 0.65)',
                marginTop: '20px',
                color: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 'bold',
                fontFamily: 'Lato',
                borderRadius: '90px',
                padding: '10px 20px',
                marginLeft: '16px'
              }}
              onClick={this.handleLogout}
            >
              Logout
            </button>
            {/* <SubMenu
              key="sub1"
              title={
                <span>
                  <span>Order</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Link to="/dashboard/list-order">List Order</Link>
              </Menu.Item>
              <Menu.Item key="4">Edit Akta</Menu.Item>
              <Menu.Item key="5">Kelengkapan Pihak Lain</Menu.Item>
            </SubMenu> */}
          </Menu>
          
        </Sider>}
        <Layout>
          <Content style={{ margin: '0 16px', padding: '40px 40px', background: '#f8f8f8' }}>
            {
              children
            }
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default DashboardWrapper