import React, { useState } from "react";
import axios from "axios";

  function Login() {
      let [rider, setrider] = useState({
        email: "",
        password: "",
      });
      let updateemail = (e) => {

        setrider({ email: e.target.value, password: rider.password });
      };
      let updatepassword = (e) => {
      
        setrider({ email: rider.email, password: e.target.value });
      };
      let onLogin = async (e) => {
        e.preventDefault();
        const user = {
          email: rider.email,
          password: rider.password,
        };
        console.log(user);
    
        try {
          let response = await axios.post(
            "http://localhost:3001/Rider/login",
            user
          );
          

          if (response.data[0].email === rider.email) {
            if (response.data[0].password === rider.password) {
          
              alert("Login is sucessfull");
            }
          }
        } catch (e) {
          alert("Your Credentials are not correct");
        }
      };
    return (
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={rider.email}
              onChange={updateemail}
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={rider.password}
            onChange={updatepassword}
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
          <button type="submit" className="btn btn-primary" onClick={onLogin}>
            Login in 
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
export default Login;