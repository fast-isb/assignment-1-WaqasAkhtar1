import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/ManageRider.css";

const WorkerFeildViewTile = (props) => {
  return (
    <tr>
      <td>{props.field}</td>
      <td>{props.value}</td>
      <td>
        <button className="adminview-worker-data-display-modify-button">
          {" "}
          Modify{" "}
        </button>{" "}
      </td>
    </tr>

  );
};

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
      return "Approved";
    }
    return "Requested";
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
