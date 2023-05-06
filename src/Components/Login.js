import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useUserDispatch, useUserSelector } from '../index';
import { login } from '../Redux/userActions';

function Login () {
    let history = useNavigate();
    const dispatch = useUserDispatch();
    const { loading } = useUserSelector( ( state ) => state.user );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        const id = e.target.id.value;
        login( { id }, dispatch, history );
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h2>Do you remember your ID ?</h2>
                <fieldset>
                    <legend>Log In</legend>
                    <ul>
                        <li>
                            <label htmlFor="id">ID:</label>
                            <input type="text" id="id" required />
                        </li>

                    </ul>
                </fieldset>
                <button type='Submit' disabled={loading}>Login</button>
                <Link to="/signup">
                    <button type="button">If not, Create an Account</button>
                </Link>
            </form>
        </div>
    );
}

export default Login;