import React, {Component} from 'react';
import FotoItem from './FotoItem';

export default class Timeline extends Component {
    constructor(props){
        super(props);
        this.state = {fotos : []};
        this.login = this.props.login;
    }

    carregaFotos() {
        let urlPerfil;
        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } 
        else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)
            .then(res => res.json())
            .then(fotos => {
                this.setState({fotos: fotos});
            });  
    }

    componentDidMount() {
         this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== this.login){
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => (
                        <FotoItem key={foto.id} foto={foto}/>
                    ))
                }
            </div>
        );
    }
}