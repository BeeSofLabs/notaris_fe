import React from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
const Header = props => {
  return (
    <div className="header">
      <div className="container">
        <Row>
          <Col md={18}>
            <Link to="/">
              <div className="logo" />
            </Link>
            <div className="navigation">
              <ul>
                <li>Tentang Kami</li>
                <li>Layanan Kami</li>
                <li>Kebijakan Privasi</li>
                <li>Hubungi Kami</li>
              </ul>
            </div>
          </Col>
          {!props.buttonLogin ? (<Col md={6}>
            <div className="link-login">
              <Link to="/login">Login</Link>
            </div>
          </Col>) : ''}
        </Row>
      </div>
    </div>
  );
};

export default Header;
