import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = (props) => {
    const authLinks = (
      <ul>
        <li>
          <a onClick={props.logout}>
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
                <li><a className="pointer ">Developers</a></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/Login">Login</Link></li>
            </ul>
    );

    const { loading , isAuthenticated} = props.auth;

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
