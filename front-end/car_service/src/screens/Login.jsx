import { useState } from "react";
import axios from "axios"
import { useHistory } from "react-router";
import { db, url } from "../common/constants";
const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const login = () => {
		const cred = {
			"email":email,
			"password":password
		}
		axios.post(url+'login', cred).then(response=>{
			const result = response.data
			if ( result != undefined && result.data.role === 'user' ){
				history.push('/userprofile', result.data)
			} else if ( result != undefined && result.data.role === 'admin' ){
				history.push('/adminprofile')
			} else {
				alert("invalid")
			}
		})
	}

	return (
		<div className="container">
			<br /><br />
			<table>
				<tr>
					<td>Email</td>
					<td> <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)} /> </td>
				</tr>
				<tr>
					<td>Password</td>
					<td> <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)} /> </td>
				</tr>
				<tr>
					<td colSpan='2' > <button className="btn btn-success" onClick={login} >Login </button> </td>
				</tr>
			</table>
		</div>
	);
}

export default Login