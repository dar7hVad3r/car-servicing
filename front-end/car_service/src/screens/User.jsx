import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { url } from "../common/constants";

const User = () => {
	const location = useLocation()
	const [vehicletype, setVehicleType] = useState('')
	const [sdate, setSdate] = useState('')
	const [stime, setStime] = useState('')
	const [wash, setWash] = useState('')
	const [priceList, setPriceList] = useState([])
	const [v_price, setvPrice] = useState(0)
	const [s_price, setsPrice] = useState(0)
	useEffect(()=>{
		fetchPrices()
	},[])

	const fetchPrices = () => {
		axios.get(url + 'prices').then(response=>{
			const result = response.data
			setPriceList(result.data)
		})
	}

	const schedule = () => {
		const data = {
			"vehicle_type":vehicletype, 
			"s_date":sdate, 
			"s_time":stime, 
			"wash":wash
		}
		console.log(data)
	}

  return (
    <div className="container">
			<br /><br />
      <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <table className="table table-striped">
						<tr>
							<th colSpan="2" > Profile </th>
						</tr>
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
          </table>
        </div>

        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
					<button className="btn btn-danger">Clear Schedule</button>
					<div> <b>Schedule Car Wash Service</b> </div> <br />
					<div> Select Type of Vehicle </div>
					<select name="" id="" className="form-control" onChange={e=>{
						setVehicleType(e.target.value)
						if(e.target.value === 'Car') setvPrice(priceList[4].price)
						else if (e.target.value === 'Bike') setvPrice(priceList[5].price)
					}} >
						<option value="Car">Car</option>
						<option value="Bike">Bike</option>
					</select> <br />
					<div>
						<div>Date</div>
						<input type="date" className="form-control" onChange={e=>setSdate(e.target.value)} />
					</div> <br />
					<div>Select time Slot</div>
					<select name="" id="" className="form-control" onChange={e=>setStime(e.target.value)} >
						<option value="10:00 AM to 01:00 PM">10:00 AM to 01:00 PM</option>
						<option value="02:00 PM to 05:00 PM">02:00 PM to 05:00 PM</option>
					</select> <br />
					<div>Select Wash Type</div>
					<select name="" id="" className="form-control" onChange={e=>{
						setWash(e.target.value)
						if ( e.target.value === 'Hand Wash' ) setsPrice(priceList[0].price)
						else if ( e.target.value === 'Machine Dryer Wash' ) setsPrice(priceList[1].price)
						else if ( e.target.value === 'Normal Wash' ) setsPrice(priceList[2].price)
						else if ( e.target.value === 'Waterless Wash' ) setsPrice(priceList[3].price)
					}} >
						<option value="Hand Wash">Hand Wash</option>
						<option value="Machine Dryer Wash">Machine Dryer Wash</option>
						<option value="Normal Wash">Normal Wash</option>
						<option value="Waterless Wash">Waterless Wash</option>
					</select> <br />
					<div>Price </div>
					{v_price + s_price}
					<br />
					<button className="btn btn-success" onClick={schedule} >Schedule</button>
				</div>
      </div>
    </div>
  );
};

export default User;
