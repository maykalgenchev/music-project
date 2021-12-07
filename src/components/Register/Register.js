import { useContext } from 'react';
import { useNavigate } from 'react-router';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        authService.register(email, password)
            .then(authData => {
                login(authData);

                navigate('/all-songs');
            });
    }

    return (
        <div className="d-flex justify-content-center">
            <form className="w-50" onSubmit={registerSubmitHandler} method="POST">
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1">Repeat Password</label>
                    <input type="password" className="form-control" id="re-password" name="re-password" placeholder="Repeat password" />
                </div>

                <div className="d-flex justify-content-center mx-5 my-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default Register;