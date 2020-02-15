import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link, WithRouter } from "react-router-dom";

const AddEducation = props => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofStudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofStudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">Add Your Education</h1>
        <p class="lead">Add any school or bootcamp that you have attended</p>
        <small>* = required field</small>
        <form
          class="form"
          onSubmit={e => {
            e.preventDefault();
            props.addEducation(formData, props.history);
          }}
        >
          <div class="form-group">
            <input
              type="text"
              placeholder="* Degree"
              name="degree"
              value={degree}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* School"
              name="school"
              value={school}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Field Of Study"
              name="fieldofStudy"
              value={fieldofStudy}
              onChange={e => onChange(e)}
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={e => onChange(e)}
            />
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={e => onChange(e)}
              disabled={toDateDisabled ? true : false}
            />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <a class="btn btn-light my-1" href="dashboard.html">
            Go Back
          </a>
        </form>
      </section>
    </Fragment>
  );
};

export default connect(null, { addEducation })(AddEducation);
