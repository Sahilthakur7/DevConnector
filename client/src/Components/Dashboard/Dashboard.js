import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile} from '../../actions/profile';

const Dashboard = (props) => {
  useEffect(() => props.getCurrentProfile(), []);

  return(<div>Dashboard</div>);
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}


export default connect(mapStateToProps, { getCurrentProfile })( Dashboard );