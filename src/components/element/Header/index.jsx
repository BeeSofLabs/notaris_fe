import React, { Component } from 'react';
import { Row, Col, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';
import { decompressFromEncodedURIComponent } from 'lz-string' 

const cookieStorage = new CookieStorage({
  path: '/'
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: '',
      visible: false,
      profile: {}
    };

    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  componentDidMount() {
    if (cookieStorage.getItem('auth_token')) {
      const dataProf = cookieStorage.getItem('prof')
      const data = JSON.parse(decompressFromEncodedURIComponent(dataProf))
      this.setState({
        auth: 'info',
        profile: data
      });
    } else {
      this.setState({
        auth: 'login'
      });
    }
    
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  handleLogout() {
    cookieStorage.clear();
    window.location = '/';
  }

  render() {
    const { auth, profile } = this.state;
    console.log('asdads', profile)
    const menu = (
      <Menu>
        <ul className="menu-profile-logout">
          <li>
            <button type="button" onClick={this.handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </Menu>
    );

    return (
      <div className="header">
        <div className="container">
          <Row>
            <Col md={18}>
              <Row>
                <Col md={6}>
                  <a href="/">
                    {/* <div className="logo" /> */}
                    <img src={require('../../../app/assets/img/imageMenuIcon/logo-notarius.jpeg')} alt="icon-logo" width="50px" />
                  </a>
                </Col>
                <Col md={18}>
                  {this.props.showNav ? (
                    <div className="navigation">
                      <ul>
                        <li><a href="/notaris">Notaris</a></li>
                        <li><a href="/notaris?type=skmht">SKMHT</a></li>
                        <li><a href="/notaris?type=apht">APHT</a></li>
                        <li><a href="/notaris?type=fidusia">Fidusia</a></li>
                      </ul>
                    </div>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </Col>
            {!this.props.buttonLogin && auth == 'login' ? (
              <Col md={6}>
                <div className="link-login">
                  <a href="/login">Login</a>
                </div>
              </Col>
            ) : (
              ''
            )}
            {auth == 'info' ? (
              <Col md={6}>
                <Dropdown
                  overlay={menu}
                  onVisibleChange={this.handleVisibleChange}
                  visible={this.state.visible}
                  overlayStyle={{
                    width: '200px'
                  }}
                  placement="bottomRight"
                >
                  <span className="profile-info">{profile.name || ''}</span>
                </Dropdown>
              </Col>
            ) : (
              ''
            )}
          </Row>
        </div>
      </div>
    );
  }
}

export default Header;
