/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { InputSearch, PageWrapper } from 'components/element';
import { usersAction } from '../../actions';
import type { Home as HomeType, Dispatch, ReduxState } from '../../types';
import styles from './styles.scss';

type Props = { home: HomeType, fetchUsersIfNeeded: () => void };

// Export this for unit testing more easily
export class Home extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { fetchUsersIfNeeded } = this.props;
    fetchUsersIfNeeded();
  }

  onChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  render() {
    const { search } = this.state;

    const listService = [
      {
        label: 'Notaris/PPAT',
        id: 1
      },
      {
        label: 'SKMHT',
        id: 2
      },
      {
        label: 'APHT',
        id: 3
      },
      {
        label: 'Fidusa',
        id: 4
      }
    ];

    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        <PageWrapper>
          <img
            src={require('../../app/assets/img/banner-home.svg')}
            alt="banner-home"
            className="background-cover"
          />
          <div className="banner">
            <div className="container">
              <div className="body-banner">
                <div className="row">
                  <div className="col-md-6">
                    <h4>
                      Kini Mencari Notaris <br /> Hanya Dengan Satu Klik
                    </h4>
                    <div className="search-section">
                      <InputSearch
                        id="search"
                        value={search}
                        onChange={this.onChange}
                        placeholder="Ketik Keperluan Anda eg, PPAT,SKMHT"
                      />
                      <img
                        src={require('../../app/assets/img/search.svg')}
                        alt="search"
                        className="icon-search"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="option-service-section">
            <div className="container">
              <div className="title-section">
                <h4>Pilih Layanan Sesuai Kebutuhan</h4>
              </div>
              <div className="body-section">
                <div className="row">
                  {listService.map(label => (
                    <div className="col-md-3" key={label.id}>
                      <div className="box">
                        <div className="icon-box" />
                        <div className="desc-box">
                          <h5>{label.label}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="map-section">
            <div className="container">
              <div className="body-wrapper">
                <div className="title-section">
                  <h4>Maps Wilayah Kerja Notaris</h4>
                </div>
                <div className="body-section">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.9926461960652!2d106.99321490817624!3d-6.265664048866217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698dad74aabaf9%3A0xa51572f828aacd8a!2sWarung%20Tungsen!5e0!3m2!1sen!2sid!4v1569645070317!5m2!1sen!2sid"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: '0' }}
                    allowFullScreen=""
                  />
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ home }: ReduxState) => ({ home });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsersIfNeeded: () => dispatch(usersAction.fetchUsersIfNeeded())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
