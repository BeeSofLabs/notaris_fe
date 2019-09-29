import React from 'react';

const Footer = () => (
  <div className="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="logo" />
        </div>
        <div className="col-md-4">
          <div className="title-footer">
            <h4>Layanan</h4>
          </div>
          <div className="body-footer">
            <ul>
              <li>Notaris</li>
              <li>SKMHT</li>
              <li>APHT</li>
              <li>Fidusia</li>
            </ul>
          </div>
        </div>
        <div className="col-md-5">
          <div className="title-footer">
            <h4>Menu</h4>
          </div>
          <div className="body-footer">
            <ul>
              <li>Home</li>
              <li>Layanan</li>
              <li>Tentang Kami</li>
              <li>Hubungi Kami</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
