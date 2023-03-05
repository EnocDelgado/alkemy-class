import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();
    
    const submitHandler = ( event ) => {
        // avoid a default action
        event.preventDefault();

        // get field values
        const email = event.target.email.value;
        const password = event.target.password.value;

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( email === '' || password === '' ) {
            Swal.fire('Campos vacios', 'Los campos no pueden estar vacios ', 'error');
            return;
        }

        if ( email !== '' && !regexEmail.test( email ) ) {
            Swal.fire('Correo inválido', 'Debe escribir una dirección de correo electrónico válida. ', 'error');
            return;
        }

        if ( email !== 'challenge@alkemy.org' || password !== 'react' ) {
            Swal.fire('Credenciales invalidas', 'Credenciales invalidas! ', 'error');
            return;
        }

        console.log( 'Estamos listos para enviar la informacion' );
        // Send form values
        axios
            .post ( 'http://challenge-react.alkemy.org', { email, password } )
            .then( res => {
                Swal.fire('Acceso Confirmado ', 'Ingresaste de forma correcta ', 'success');
                const token = res.data.token ;
                // Save on navigator
                sessionStorage.setItem( 'token', token );
                navigate('/listado');
            } )

    };

    let token = sessionStorage.getItem('token');

    return (
        <>
            { token && navigate('/listado') }
            <div className="row">
                <div className="col-6 offset-3">
                    <h2>Login</h2>
                    <form onSubmit={ submitHandler }>
                        <label className="form-label d-block mt-2">
                            <span>Correo electronico:</span> <br/>
                            <input className="form-control" type="email" name='email' placeholder='Email'/>
                        </label>
                        <br />
                        <label className="form-label d-block mt-2">
                            <span>Contraseña:</span> <br/>
                            <input className="form-control" type="password" name='password' placeholder='Contraseña'/>
                        </label>
                        <br />

                        <button className="btn btn-success mt-2" type='submit'>Ingresar</button>
                    </form>
                </div>
            </div>
        </>
    )
}
