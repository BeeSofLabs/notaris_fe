import React from 'react';
import { Row, Col } from 'antd';

const Header = props => {
  if (false) {
    return ' ';
  }
  return (
    <div className="header">
      <div className="container">
        <Row>
          <Col md={18}>
            <div className="logo" />
            <div className="navigation">
              <ul>
                <li>Tentang Kami</li>
                <li>Layanan Kami</li>
                <li>Kebijakan Privasi</li>
                <li>Hubungi Kami</li>
              </ul>
            </div>
          </Col>
          <Col md={6}>
            <div className="link-login">
              <a href="/">Login</a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
