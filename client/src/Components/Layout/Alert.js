import React from 'react';
import { connect} from 'react-redux';
import propTypes from 'prop-types';

const Alert = (props) => {
  const {alerts} = props;
  if( alerts !== null && alerts.length > 0){
    let alerts;
    alerts = alerts.map((alert) => {
      return(

      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
        </div>
      )
    });

    return alerts;
  }
};

Alert.propTypes = {

};

const mapStateToProps = (state) => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert);