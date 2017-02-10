import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Account from './Account';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import RequireAuth from './require_auth';


const App = () => {
  return (
    <Router>
      <div>
       <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/login">Login</Link></li>
         <li><Link to="/register">Register</Link></li>
         <li><Link to="/account">Account</Link></li>
         <li><Link to="/about">About</Link></li>
         <li><Link to="/logout">Logout</Link></li>
       </ul>

       <hr/>

       <Route exact path="/" component={Home}/>
       <Route path="/about" component={About}/>
       <Route path="/login" component={Login}/>
       <Route path="/register" component={Register}/>
       <Route path="/account" component={RequireAuth(Account)}/>
       <Route path="/logout" component={Logout}/>
    </div>
  </Router>
  )
}

const Home = () => (
  <div>
    <h2>Home Page</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About Page</h2>
  </div>
)

export default App;
