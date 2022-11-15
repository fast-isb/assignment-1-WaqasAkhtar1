import React, { Component, useState } from 'react'
import axios from 'axios'
export default class SignUp extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: ''
    };
     this.handleChangeName=this.handleChangeName.bind(this);
     this.handleChangeEmail=this.handleChangeEmail.bind(this);
     this.handleChangePassword=this.handleChangePassword.bind(this);
     this.handleChangePhone=this.handleChangePhone.bind(this);
     this.handleChangeLicense=this.handleChangeLicense.bind(this);
     this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChangeName(e) {
    this.setState({value1: e.target.value});
  }

  handleChangeEmail(e) {
    this.setState({value2: e.target.value});
  }
  handleChangePassword(e) {
    this.setState({value3: e.target.value});
  }
  handleChangePhone(e) {
    this.setState({value4: e.target.value});
  }
  handleChangeLicense(e) {
    this.setState({value5: e.target.value});
    
  }
 
  handleSubmit = async (event)=> {
    
    event.preventDefault();

    const rider = {
      
      name: this.state.value1,
      Email: this.state.value2,
      password: this.state.value3,
      pNumber: this.state.value4,
      License: this.state.value5,
    };
    
    try {
      await axios
        .post("http://localhost:3001/Rider/Register",rider)
        .then((res) => {
          console.log(res.data);
        });
      alert("Sign up was successful");
    } catch (evnt) {
      
      alert('this Rider already exists or Error has occurred');
    }
  }
  render() {
  return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Full name</label>
          <input
            type="text"
            className="form-control" id="name"
            value={this.state.value1} onChange={this.handleChangeName} 
            placeholder="Full name"
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={this.state.value2} onChange={this.handleChangeEmail} 
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={this.state.value3} onChange={this.handleChangePassword} 
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="0300-1234567"
            value={this.state.value4} onChange={this.handleChangePhone} 
            />
            </div>
        <div className="mb-3">
          <label>Driving License Number</label>
          <input
            type="text"
            className="form-control" id="license"
            placeholder="Enter driving license"
            value={this.state.value5} onChange={this.handleChangeLicense} 
          />
        </div>
        <div className="d-grid">
          <button type="submit"  id ="signup_button" className="btn btn-primary" >
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )

   
  }
}