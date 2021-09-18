import axios from "axios"
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { url } from "../common/constants";
const Admin = () => {
	const history = useHistory()
  useEffect(()=>{
		fetchSchedules()
	},[])
	const [schList, setschList] = useState([])
	const fetchSchedules = () => {
		axios.get(url + 'list').then(response=>{
			if ( response.data.status === 'error') alert('something went wrong')
			else {
				setschList(response.data.data)
			}
		})
	}
	const logout = () => {
		history.push('/login')
	}
	const togglePayment = (e) => {
		console.log(e.target.innerHTML)
		if (e.target.innerHTML === 'done'){
			const data = {
				'payment':'pending'
			}
			axios.post(url+'payment/'+e.target.id,data).then(response=>{
				if ( response.data.status === 'failed ') alert('something went wrong')
			})
		} else if (e.target.innerHTML === 'pending'){
			const data = {
				'payment':'done'
			}
			axios.post(url+'payment/'+e.target.id,data).then(response=>{
				if ( response.data.status === 'failed ') alert('something went wrong')
			})
		}
		history.push('/adminreload')
	}

	const toggleComplition = (e) => {

		console.log(e.target.innerHTML)
		if (e.target.innerHTML === 'done'){
			const data = {
				'washstatus':'pending'
			}
			axios.post(url+'washstatus/'+e.target.id,data).then(response=>{
				if ( response.data.status === 'failed ') alert('something went wrong')
			})
		} else if (e.target.innerHTML === 'pending'){
			const data = {
				'washstatus':'done'
			}
			axios.post(url+'washstatus/'+e.target.id,data).then(response=>{
				if ( response.data.status === 'failed ') alert('something went wrong')
			})
		}
		history.push('/adminreload')
	}

  return (
    <div className="login-container">
      <h1 style={{textAlign:"center", paddingTop:'80px'}}>Schedules Today</h1>
      <div class="row">
        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" />
        <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
			<button style={{float:"right", marginBottom:'10px'}} onClick={logout} className="btn btn-dark ">Log Out</button>
            <table className="table table-dark table-bordered">
							<thead>
								<tr>
								<th>Name</th>
								<th>Phone</th>
								<th>Vehicle Type</th>
								<th>Date</th>
								<th>Time</th>
								<th>Wash Type</th>
								<th>Payment Status</th>
								<th>Wash Status</th>
								</tr>
							</thead>
                <tbody>
									{
										schList.map(sch=>{
											return (
												<tr>
													<td> {sch.name} </td>
													<td> {sch.phone} </td>
													<td> {sch.vehicle_type} </td>
													<td> {sch.s_date} </td>
													<td> {sch.s_time} </td>
													<td> {sch.wash} </td>
													<td onClick={togglePayment}  >
														<button className="btn btn-light" id={sch.id} >{sch.payment}</button> 
													</td>
													<td onClick={toggleComplition}  >
														<button className="btn btn-light" id={sch.id} >{sch.wash_status}</button> 
													</td>
												</tr>
											);
										})
									}
                </tbody>
            </table>
        </div>
        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" />
      </div>
    </div>
  );
};

export default Admin;
