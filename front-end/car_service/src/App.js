import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import { db } from './common/constants';
import userHome from './screens/User';
import adminHome from './screens/Admin'
import Login from './screens/Login';

function App() {
  return(
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path="/userprofile" component={userHome} />
          <Route path="/adminprofile" component={adminHome} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
