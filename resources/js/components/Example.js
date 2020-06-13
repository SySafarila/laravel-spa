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
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    email:
                                    <input type="text" value={this.state.email} onChange={this.handleEmail} />
                                </label>
                                <label>
                                    password:
                                    <input type="text" value={this.state.password} onChange={this.handlePassword} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
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
