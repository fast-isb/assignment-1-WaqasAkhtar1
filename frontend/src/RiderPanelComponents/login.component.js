import React, { Component } from 'react'

export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      
    };
     
     this.handleChangeEmail=this.handleChangeEmail.bind(this);
     this.handleChangePassword=this.handleChangePassword.bind(this);
     this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChangeEmail(e) {
    this.setState({value1: e.target.value});
  }

  handleChangePassword(e) {
    this.setState({value2: e.target.value});
  }
  
 
  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value1);


    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={this.state.value1} onChange={this.handleChangeEmail} 
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={this.state.value2} onChange={this.handleChangePassword} 
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}