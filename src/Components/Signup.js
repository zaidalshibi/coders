import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useUserDispatch, useUserSelector } from "../index";
import {signup} from '../Redux/userActions';

function Signup () {
    let history = useNavigate();
    const dispatch = useUserDispatch();
    const { loading } = useUserSelector( ( state ) => state.user );
    const handleSignup = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const gender = e.target.gender.value
        const status = 'active';
        signup({name,email,gender,status},dispatch,history)
    };
    return (
        <div className="signup">
            <form onSubmit={handleSignup}>
                <h2>Sign Up!</h2>
                <fieldset>
                    <legend>Create Account</legend>
                    <ul>
                        <li>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" required />
                        </li>
                        <li>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" required />
                        </li>
                        <li>
                            <label htmlFor="gender">Gender:</label>
                            <select name="gender" id="gender">
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </li>
                    </ul>
                </fieldset>
                <button type="Submit" disabled={loading}>Submit</button>
                <Link to="/">
                    <button type="button" >Have an Account?</button>
                </Link>
            </form>
        </div>
    );
}

export default Signup;