import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../Layout/Spinner";
import DashboardActions from './dashboardActions';

const Dashboard = props => {
  useEffect(() => {props.getCurrentProfile()}, []);
  const {
    loading,
    profile: { profile }
  } = props;
  const {
    auth: { user }
  } = props;

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}{" "}
      </p>
      {profile !== null ? (
        <Fragment><DashboardActions /></Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile. Please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);