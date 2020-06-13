import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
 } from "react-router-dom";
import SignIn from '../components/SignIn';
import axios from 'axios';

 class Routing extends React.Component {
     render() {
         return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/sign-in'>
                            <SignIn />
                        </Route>
                        <Route exact path='/dashboard'>
                            <Dashboard />
                        </Route>
                        <Route path='*'>
                            <NotMatch />
                        </Route>
                    </Switch>
                </div>
            </Router>
         );
     }
 }

 function Home() {
     return(
        <div>
            <p>A looks through all its children elements and renders the first one whose path matches the current URL. Use a any time you have multiple routes, but you want only one of them to render at a time</p>
            <Link to="/sign-in" className="text-success font-weight-bold">Sign in</Link>
        </div>
     );
 }

 function NotMatch() {
     return(
        <div>
            <h1>404</h1>
        </div>
     );
 }

 class Dashboard extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
            name: '',
            email: '',
            nameClass: 'p-2 bg-light',
            emailClass: 'p-2 mb-0 bg-light'
         };
     }
     componentDidMount() {
        axios.get('http://localhost:8000/api/profile')
        .then(res => {
            // console.log(res);
            this.setState({
                name: 'Name : ' + res.data.name,
                email: 'Email : ' + res.data.email,
                nameClass: 'm-0',
                emailClass: 'm-0'
            });
        })
        .catch(res => {
            console.log(res);
        });
     }
     render() {
         return(
             <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card border-0 shadow">
                                <div className="card-body">
                                    <p className={this.state.nameClass}>{this.state.name}</p>
                                    <p className={this.state.emailClass}>{this.state.email}</p>
                                    <hr></hr>
                                    <div className="d-flex justify-content-center">
                                        <Link to="/" className="bg-success text-light btn btn-sm btn-success">Root</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     );
    }
 }

 export default Routing;

 if (document.getElementById('root')) {
    ReactDOM.render(<Routing />, document.getElementById('root'));
}
