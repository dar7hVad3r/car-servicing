import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import bg from './images/bg.jpg'
import userHome from './screens/User';
import adminHome from './screens/Admin'
import Login from './screens/Login';

function App() {
  return(
      <div className="bg-img-style" >
        <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path="/userprofile" component={userHome} />
          <Route path="/adminprofile" component={adminHome} />
        </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
