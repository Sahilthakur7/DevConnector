import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../Layout/Spinner";
import DashboardActions from "./dashboardActions";
import Education from "./Education";
import Experience from "./Experience";
import { deleteAccount } from "../../actions/profile";

const Dashboard = props => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);
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
        <Fragment>
          <DashboardActions />
          <Education education={profile.education} />
          <Experience experience={profile.experience} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={props.deleteAccount}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile. Please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
