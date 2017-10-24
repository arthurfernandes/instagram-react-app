import React, {Component} from 'react';
import {browserHistory} from  'react-router';

class Login extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {msg : this.props.location.query.msg}
    }

    envia(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            headers: new Headers({
                'Content-type' : 'application/json'
            }),
            body: JSON.stringify({login: this.login.value, senha: this.senha.value})
        }

        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(response => {
                if (response.ok)
                    return response.text();
                throw new Error(`Não foi possível fazer o login:  ${response.status}`)
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                browserHistory.push('/timeline');
            })
            .catch(error => {
                console.log(error);
                this.setState({msg: 'Não foi possível fazer login'});
            });
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}

export default Login;