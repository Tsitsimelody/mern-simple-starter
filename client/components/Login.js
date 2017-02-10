import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/auth';

const form = reduxForm({
  form: 'login',
});

const LoginStyle = {
  width: '400px',
  margin: '0 auto',
  backgroundColor: 'white',
  padding: '40px',
  textAlign: 'center',
  marginTop: '200px'
}

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div style={LoginStyle}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <div>
            <label>Email</label>
            <Field name="email" className="form-control" component="input" type="text" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" className="form-control" component="input" type="password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <br />
        <Link to="/register">Dont Have an Account?</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
