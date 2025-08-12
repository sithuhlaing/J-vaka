import React from 'react';

const Header = () => {
    return (
        <header className="nhsuk-header" role="banner">
            <div className="nhsuk-width-container nhsuk-header__container">
                <div className="nhsuk-header__logo">
                    <a className="nhsuk-header__link nhsuk-header__link--service" href="/" aria-label="NHS homepage">
                        <svg className="nhsuk-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 16" height="40" width="100">
                            <path className="nhsuk-logo__background" fill="#005eb8" d="M0 0h40v16H0z"></path>
                            <path className="nhsuk-logo__text" fill="#fff" d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"></path>
                        </svg>
                        <span className="nhsuk-header__service-name">
                            NHS EHR System
                        </span>
                    </a>
                </div>
                
                <div className="nhsuk-header__content" id="content-header">
                    <div className="nhsuk-header__search">
                        <div className="nhsuk-header__search-wrap" id="wrap-search">
                            <form className="nhsuk-header__search-form" id="search" action="/search" method="get" role="search">
                                <label className="nhsuk-u-visually-hidden" htmlFor="search-field">Search the NHS website</label>
                                <input 
                                    className="nhsuk-header__search-input" 
                                    id="search-field" 
                                    name="q" 
                                    type="search" 
                                    placeholder="Search patients, records..."
                                    autoComplete="off"
                                />
                                <button className="nhsuk-header__search-submit" type="submit">
                                    <svg className="nhsuk-icon nhsuk-icon__search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                        <path d="m19 17-4-4c0.904-0.732 1.5-1.859 1.5-3.124a6.5 6.5 0 1 0 -6.5 6.5c1.265 0 2.392-0.596 3.124-1.5l4 4 1.876-1.876zM6.5 9.124a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1 -5 0z"></path>
                                    </svg>
                                    <span className="nhsuk-u-visually-hidden">Search</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="nhsuk-header__menu" id="header-menu">
                    <div className="nhsuk-header__menu-toggle">
                        <button className="nhsuk-header__menu-toggle-button" id="toggle-menu" aria-controls="header-navigation" aria-label="Open menu">Menu</button>
                    </div>
                    <nav className="nhsuk-header__navigation" id="header-navigation" role="navigation" aria-label="Primary navigation" aria-labelledby="label-navigation">
                        <div className="nhsuk-width-container">
                            <p className="nhsuk-header__navigation-title"><span id="label-navigation">Menu</span>
                                <button className="nhsuk-header__navigation-close" id="close-menu">
                                    <svg className="nhsuk-icon nhsuk-icon__close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                        <path d="M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 1.42 1.42l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42-1.42z"></path>
                                    </svg>
                                    <span className="nhsuk-u-visually-hidden">Close menu</span>
                                </button>
                            </p>
                            <ul className="nhsuk-header__navigation-list">
                                <li className="nhsuk-header__navigation-item">
                                    <a className="nhsuk-header__navigation-link" href="/dashboard">
                                        Dashboard
                                        <svg className="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="m15.5 12-4-4v3h-7v2h7v3z"></path>
                                        </svg>
                                    </a>
                                </li>
                                <li className="nhsuk-header__navigation-item">
                                    <a className="nhsuk-header__navigation-link" href="/patients">
                                        Patients
                                        <svg className="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="m15.5 12-4-4v3h-7v2h7v3z"></path>
                                        </svg>
                                    </a>
                                </li>
                                <li className="nhsuk-header__navigation-item">
                                    <a className="nhsuk-header__navigation-link" href="/appointments">
                                        Appointments
                                        <svg className="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="m15.5 12-4-4v3h-7v2h7v3z"></path>
                                        </svg>
                                    </a>
                                </li>
                                <li className="nhsuk-header__navigation-item">
                                    <a className="nhsuk-header__navigation-link" href="/reports">
                                        Reports
                                        <svg className="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="m15.5 12-4-4v3h-7v2h7v3z"></path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                
                <div className="nhsuk-header__account">
                    <span className="nhsuk-header__account-text">Dr. Evelyn Reed</span>
                </div>
            </div>
        </header>
    );
};

export default Header;