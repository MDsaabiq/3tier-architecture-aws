
    import React, {Component} from 'react';
    import architecture from '../../assets/3TierArch.png'
    import './Home.css';

    class Home extends Component {
        render () {
        return (
            <div className="home">
              <div className="home__content">
                <div className="home__text">
                  <p className="home__eyebrow">AWS 3‑Tier Architecture</p>
                  <h1 className="home__title">Web Application Demo</h1>
                  <p className="home__credit">Created by Saabiq</p>
                  <p className="home__subtitle">
                    A modern, cloud‑native sample that separates web, application, and database tiers for scale and resilience.
                  </p>
                  <div className="home__cards">
                    <div className="home__card">
                      <h3>Web Tier</h3>
                      <p>React UI delivers a responsive experience and connects to the API layer.</p>
                    </div>
                    <div className="home__card">
                      <h3>App Tier</h3>
                      <p>Express APIs manage transactions and orchestrate database operations.</p>
                    </div>
                    <div className="home__card">
                      <h3>Database Tier</h3>
                      <p>Aurora stores transactions and powers the live demo table.</p>
                    </div>
                  </div>
                </div>
                <div className="home__media">
                  <img src={architecture} alt="3-Tier Web App Architecture" />
                  <span className="home__caption">Reference architecture overview</span>
                </div>
              </div>
            </div>
        );
      }
    }

    export default Home;