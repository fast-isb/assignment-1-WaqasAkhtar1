/*
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/ManageRider.css";

const WorkerFeildViewTile = (props) => {
  return(
      <tr>
          <td>
              {props.rider.name}
          </td>
          <td>
              {props.rider.email}
          </td>
          <td>
              {props.rider.license}
          </td>
          <td>
              {props.rider.pNO}
          </td>
          <td>
              {props.customer.status}
          </td>

          <td>
              <a href='#' onClick={() => { props.method(props.rider.email) }}>Approve |</a>
              <a href='#' onClick={() => { props.method2( props.rider.email)}}>| Reject</a>
          </td>
      </tr>
  )
  
}


const ManageRider = () => {
  let location = useLocation();
  let email = { email: location.state.email };

  const [rider, setRider] = useState({
    name:"",
    email: "",
    password: "",
    pNo : "",
    license : " ",
    status: false,

  });

  useEffect(() => {
    let fetchData = async () => {
      let response = await axios.post(
        "http://localhost:3001/Rider/getRider",
        email
      );
      console.log(response);
      setRider(response.data[0]);
    };
    fetchData();
  });

  let checkStatus = () => {
    if (rider.status === false) {
      return "Requested";
    }
    return "Approved";
  };

  let statusConversion = () => {
    if (rider.status === true) {
      rider.status=false;
      return "Approved";
    }
    rider.status=true;
    return "Declined";
  };

  let deleteRider = () => {
    let requestObejct = { email: rider.email };

    axios
      .post("http://localhost:3001/Rider/delete", requestObejct)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // needs to be updated
    //navigate("/admin/search/worker");
  };

  let changeStatus = () => {
    let updated = !rider.status;
    let requestObejct = { email: rider.email, status: updated };

    console.log(updated);

    axios
      .post("http://localhost:3001/Rider/status", requestObejct)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // needs to be updated
    };
  return (
    <div>
      <div className="adminview-worker-data-display">
        <h1 className="adminview-worker-data-display-title">
        {rider.name}
        </h1>
        <hr className="adminview-worker-data-display-title-hr" />
        <button
          className="adminview-worker-data-display-button"
          onClick={deleteRider}
        >
          {" "}
          Delete{" "}
        </button>
        <button
          className="adminview-worker-data-display-button"
          onClick={changeStatus}
        >
          {" "}
          {checkStatus()}{" "}
        </button>

        <div className="adminview-worker-data-display-table">
          <br />
          <table>
            <thead>
              <tr>
                <th className="adminview-worker-data-display-table-th1">
                  Field
                </th>
                <th className="adminview-worker-data-display-table-th1">
                  Value
                </th>
                <th className="adminview-worker-data-display-table-th2">
                  Modify
                </th>
              </tr>
            </thead>
            <tbody>
              <WorkerFeildViewTile field="Email" value={rider.email} />
              <WorkerFeildViewTile field="Name" value={rider.name} />
              <WorkerFeildViewTile
                field="Status"
                value={statusConversion()}
              />
              <WorkerFeildViewTile field="Phone Number" value={rider.pNo} />
              <WorkerFeildViewTile field="Password" value={rider.password} />
              <WorkerFeildViewTile field="Driving License" value={rider.license} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ManageRider;
*/
import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";
import {Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/ManageRider.css";


let Trow = props => {
    return(
        <tr>
            <td>
                {props.rider.name}
            </td>
            <td>
                {props.rider.email}
            </td>
            <td>
                {props.rider.license}
            </td>
            <td>
                {props.rider.pNo}
            </td>
            <td>
                {props.rider.status}
            </td>

            <td>
                <a href='#' onClick={() => { props.method(props.rider.email) }}>Approve |</a>
                <a href='#' onClick={() => { props.method2( props.rider.email )}}>| Reject</a>
            </td>
        </tr>
    )
    
}


class ManageRider extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            riders: [],
        } 
    }

    acceptapplication = async (user) => {
        var accepted
        for (let index = 0; index < this.state.riders.length; index++) {
            if (this.state.riders[index].email==user) {
                accepted = this.state.riders[index]
            } 
        }
        this.setState({
            riders: this.state.riders.filter(element=>element.email!=user)
        })
    
        const status = await axios.post('http://localhost:3001/Rider/accept_appliaction',accepted).then(res => {
            console.log(res.data)
        }).catch(err => { console.log('error occured') })
    }
    rejectapplication=async (user)=> {
        var rejected
        for (let index = 0; index < this.state.riders.length; index++) {
            if (this.state.riders[index].email==user) {
                rejected = this.state.riders[index]
            } 
        }
        this.setState({
            riders: this.state.riders.filter(element=>element.email!=user)
        })
        const status = await axios.post('http://localhost:3001/Rider/reject_appliaction',rejected).then(res => {
            console.log(res.data)
        }).catch(err => { console.log('error occured') })
    }
    componentDidMount = async () => {
        const status = await axios.get('http://localhost:3001/Rider/list');
         const temp= status.data.filter(element=>element.status==false)
        this.setState({

            riders:temp
        })
        console.log(this.state.riders)
    }
    displayCustomerList = () => {
        return this.state.riders.map(temp => {
            return <Trow rider={temp} method={this.acceptapplication} method2={ this.rejectapplication } key={ temp._id } />
        })
    }
    render() {
        return (
            <div className='Admin123'>
                <br />
                <Form>
                    <h3>Customer Applications</h3>
                    <br />                
                    <table className='table' >
                        <thead className='thead-light'>
                            <tr>
                                <th>Full Name</th>
                                <th>Email  </th>
                                <th>Driving  License  </th>
                                <th>Phone Number  </th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayCustomerList()}
                        </tbody>
                    </table>
                </Form>
                
            </div>
        );
    }
}
 
export default ManageRider;



