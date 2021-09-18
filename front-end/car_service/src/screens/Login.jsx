import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { db, url } from "../common/constants";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    const cred = {
      email: email,
      password: password,
    };
    axios.post(url + "login", cred).then((response) => {
      const result = response.data;
      if (result != undefined && result.data.role === "user") {
        history.push("/userprofile", result.data);
      } else if (result != undefined && result.data.role === "admin") {
        history.push("/adminprofile");
      } else {
        alert("invalid");
      }
    });
  };

  const signup = () => {
	  history.push('/signup')
  }

  return (
    <div className="login-container">
      <br />

      <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>

        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
			
          <table className="table table-hover table-bordered center-table">
            <tbody>
              <tr>
                <th>Email</th>
                <td>
                  
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Password</th>
                <td>
                  
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {" "}
                  <button className="btn btn-success" onClick={login}>
                    Login
                  </button>
				  <button style={{marginLeft:"50px"}} className="btn btn-secondary" onClick={signup} >Sign Up</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
		
		<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
			
		</div>
		
      </div>
    </div>
  );
};

export default Login;
