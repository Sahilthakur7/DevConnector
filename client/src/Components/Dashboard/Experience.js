import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = props => {
  const experience = props.experience.map(exp => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => props.deleteExperience(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <th> Company </th>
          <th className="hide-sm"> Title</th>
          <th className="hide-sm"> Years</th>
          <th />
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </Fragment>
  );
};

export default connect(null, { deleteExperience })(Experience);
