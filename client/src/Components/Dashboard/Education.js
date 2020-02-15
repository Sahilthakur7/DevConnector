import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

const Education = props => {
  const education = props.education.map(edu => {
    return (
      <tr key={edu._id}>
        <td>{edu.degree}</td>
        <td className="hide-sm">{edu.school}</td>
        <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  });

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
        <tbody>{education}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
