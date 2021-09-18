import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { url } from "../common/constants";

const User = () => {
  const location = useLocation();
  const history = useHistory();
  const [vehicletype, setVehicleType] = useState("");
  const [sdate, setSdate] = useState("");
  const [stime, setStime] = useState("");
  const [wash, setWash] = useState("");
  const [priceList, setPriceList] = useState([]);
  const [v_price, setvPrice] = useState(0);
  const [s_price, setsPrice] = useState(0);
  const [scheduleList, setScheduleList] = useState([]);
  useEffect(() => {
    fetchPrices();
    fetchSchedules();
  }, []);

  const fetchPrices = () => {
    axios.get(url + "prices").then((response) => {
      const result = response.data;
      setPriceList(result.data);
    });
  };

  const fetchSchedules = () => {
    axios.get(url + "schedule/" + location.state.id).then((response) => {
      const result = response.data;
      if (result.status === "success") setScheduleList(result.data);
      else alert("something went wrong" + response.status);
    });
  };

  const clearSched = () => {
    axios.delete(url + "schedule/" + location.state.id).then((response) => {
      if (response.data.status === "success") alert("Schedule cleared");
      else alert("something went wrong");
    });
    
    history.push('/userreload', location.state)
  };

  const schedule = () => {
    const data = {
      vehicle_type: vehicletype,
      s_date: sdate,
      s_time: stime,
      wash: wash,
    };
    axios.post(url + "schedule/" + location.state.id, data).then((response) => {
      if (response.data.status === "success")
        alert("Wash Scheduled Successfully");
      else {
        alert("something went wrong.");
      }
    });
    history.push('/userreload', location.state)
  };

  const logout = () => {
    history.push("/login");
  };

  return (
    <div className="container">
      <h1 className="client-heading" >Car Washing Center</h1>
      <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <table className="table table-secondary table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{location.state.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{location.state.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{location.state.phone}</td>
              </tr>
            </tbody>
          </table>

          <div>
            {scheduleList.map((sch) => {
              return (
                <table className="table table-bordered table-striped table-dark">
                  <tbody>
                    <tr>
                      <td>Type of vehicle</td>
                      <td>{sch.vehicle_type}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>{sch.s_date}</td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td>{sch.s_time}</td>
                    </tr>
                    <tr>
                      <td>Wash Type</td>
                      <td>{sch.wash}</td>
                    </tr>
                    <tr>
                      <td>Wash Status</td>
                      <td>{sch.wash_status}</td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>
        </div>

        <div
          style={{ backgroundColor: "rgba(220, 220, 220, 0.3)" }}
          class="col-xs-8 col-sm-8 col-md-8 col-lg-8"
        >
          <div>
            <button
              style={{ marginLeft: 650 }}
              className="btn btn-dark"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
          <div>
            {" "}
            <b>Schedule Car Wash Service</b>{" "}
          </div>{" "}
          <br />
          <div> Select Type of Vehicle </div>
          <select
            name=""
            id=""
            className="form-control"
            onChange={(e) => {
              setVehicleType(e.target.value);
              if (e.target.value === "Car") setvPrice(priceList[4].price);
              else if (e.target.value === "Bike") setvPrice(priceList[5].price);
            }}
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
          </select>{" "}
          <br />
          <div>
            <div>Date</div>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setSdate(e.target.value)}
            />
          </div>{" "}
          <br />
          <div>Select time Slot</div>
          <select
            name=""
            id=""
            className="form-control"
            onChange={(e) => setStime(e.target.value)}
          >
            <option value="10:00 AM to 01:00 PM">10:00 AM to 01:00 PM</option>
            <option value="02:00 PM to 05:00 PM">02:00 PM to 05:00 PM</option>
          </select>{" "}
          <br />
          <div>Select Wash Type</div>
          <select
            name=""
            id=""
            className="form-control"
            onChange={(e) => {
              setWash(e.target.value);
              if (e.target.value === "Hand Wash") setsPrice(priceList[0].price);
              else if (e.target.value === "Machine Dryer Wash")
                setsPrice(priceList[1].price);
              else if (e.target.value === "Normal Wash")
                setsPrice(priceList[2].price);
              else if (e.target.value === "Waterless Wash")
                setsPrice(priceList[3].price);
            }}
          >
            <option value="Hand Wash">Hand Wash</option>
            <option value="Machine Dryer Wash">Machine Dryer Wash</option>
            <option value="Normal Wash">Normal Wash</option>
            <option value="Waterless Wash">Waterless Wash</option>
          </select>{" "}
          <br />
            <div>Price </div>
            <div style={{ fontSize: "1.3em", backgroundColor:'whitesmoke', paddingLeft:10 }}>{v_price + s_price}</div>
          <br />
          <br />
          <div>
            <button className="btn btn-dark" onClick={schedule}>
              Add Schedule
            </button>
            <button
              style={{ marginLeft: 480 }}
              className="btn btn-dark"
              onClick={clearSched}
            >
              Clear Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
