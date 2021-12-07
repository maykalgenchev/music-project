import { useContext } from 'react';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const onLoginHandler = (e) => {
        e.preventDefault();


        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        authService.login(email, password)
            .then((authData) => {
                login(authData);
                navigate('/')
            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
            });
    }

    return (
        <div className="d-flex justify-content-center">
            <form className="w-50  " onSubmit={onLoginHandler} method="POST" >
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>

                    <input type="email" className="form-control form-control-mr-5" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>


                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control mx-10" name="password" id="password" placeholder="Password" />

                </div>

                <div className="d-flex justify-content-center mx-5 my-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>

    )

}

export default Login;