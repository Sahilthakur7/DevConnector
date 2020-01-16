import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = (props) => {
    const authLinks = (
      <ul>
        <li>
          <a onClick={logout} href="#!">
              <i className="fas fa-sign-out-alt" ></i>{ ' '}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
      </ul>
    ); ;
    const guestLinks = (
            <ul>
                <li><a href="profiles.html">Developers</a></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/Login">Login</Link></li>
            </ul>
    );

    return(
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
    { !loading && <Fragment> { isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {logout})( Navbar );
