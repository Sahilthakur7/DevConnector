import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

const Education = props => {
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <th> Degree</th>
          <th className="hide-sm"> School</th>
          <th className="hide-sm"> Years</th>
          <th />
        </thead>
      </table>
    </Fragment>
  );
};

export default connect(null)(Education);
