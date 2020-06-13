import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Example extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.post('http://localhost:8000/login', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                console.log(`Success login`);
                    window.location.replace('http://localhost:8000/home');
            }).catch(res => {
                console.log(`Failed ${res}`);
            });
            
        });
        console.log(this.state.email + ' | ' + this.state.password);
        event.preventDefault();
    }

    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label text-md-right">Email</label>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmail} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label text-md-right">Password</label>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" value={this.state.password} onChange={this.handlePassword} />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button className="btn btn-success">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById('login')) {
    ReactDOM.render(<Example />, document.getElementById('login'));
}
