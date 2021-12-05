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
        <form onSubmit={registerSubmitHandler} method="POST">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Repeat Password</label>
                <input type="password" className="form-control" id="re-password" name="re-password" placeholder="Repeat password" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )

}

export default Register;