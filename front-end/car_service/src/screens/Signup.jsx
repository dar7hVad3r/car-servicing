import { useState } from "react";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { url } from "../common/constants";
const Signup = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [passwore, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')
	const history = useHistory()
	const signup = () => {
		const data = {
			'name':name,
			'email':email,
			'password':passwore,
			'phone':phone,
			'address':address
		}
		axios.post(url + 'signup', data).then(response=>{
			const result = response.data
			if ( result.status === "success") {
				alert('Sign Up Successfull')
				history.push('/login')
			}
			else {
				alert('something went wrong, try signing up again')
			}
		})
	}
	const cancel = () => {
		history.push('/login')
	}
  return (
    <div className="container login-container">
      <div class="row">
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" />
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div style={{ marginTop: "150px" }}>
            <h1 style={{textAlign:"center"}} > Sign Up </h1>
            <table className="table table-dark table-bordered">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>
                    {" "}
                    <input type="text" className="form-control" onChange={e=>setName(e.target.value)} />{" "}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    {" "}
                    <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)} />{" "}
                  </td>
                </tr>
                <tr>
                  <th>Password</th>
                  <td>
                    {" "}
                    <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)} />{" "}
                  </td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>
                    {" "}
                    <input type="number" className="form-control" onChange={e=>setPhone(e.target.value)} />{" "}
                  </td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>
                    {" "}
                    <input type="text" className="form-control" onChange={e=>setAddress(e.target.value)} />{" "}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <button className="btn btn-dark" onClick={signup} > Signup </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-dark"
											onClick={cancel}
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" />
      </div>
    </div>
  );
};

export default Signup;
