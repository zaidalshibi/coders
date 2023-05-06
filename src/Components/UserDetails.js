import React from "react";
import { useUserDispatch, useUserSelector } from "../index";
import Swal from "sweetalert2";
import { deleteUser, logoutUser, update } from "../Redux/userActions";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
    const { user } = useUserSelector( ( state ) => state.user );
    const history = useNavigate();
    const userLocal = JSON.parse( localStorage.getItem( 'user' ) );
    const dispatch = useUserDispatch();
    if ( !user && !userLocal ) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            background: "linear-gradient( -45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB )",
            backgroundSize: "400 % 400 %",
            animation: "Gradient 15s ease infinite",
            boxSizing: "border - box"
        }
        }>
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </div >;
    }
    const userId = user ? user.id : userLocal.id;
    const name = user ? user.name : userLocal.name;
    const email = user ? user.email : userLocal.email;
    const gender = user ? user.gender : userLocal.gender;
    const status = user ? user.status : userLocal.status;

    const handleChangeData = ( e ) => {
        e.preventDefault();
        Swal.fire(
            {
                title: 'Change Your Data',
                html: `<input type="text" id="name" className="swal2-input" placeholder="Name" value="${name}">
                <input type="email" id="email" className="swal2-input" placeholder="Email" value="${email}">
                <select id="status" className=="swal2-input">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>
                `,
                confirmButtonText: 'Change',
                focusConfirm: false,
                preConfirm: () => {
                    const name = Swal.getPopup().querySelector( '#name' ).value;
                    const email = Swal.getPopup().querySelector( '#email' ).value;
                    const status = Swal.getPopup().querySelector( '#status' ).value;
                    if ( !name || !email || !status ) {
                        Swal.showValidationMessage( `Please enter all the fields` );
                    }
                    return { name: name, email: email, status: status };
                }
            }
        ).then( ( result ) => {
            if ( result.isConfirmed ) {
                update( { id: userId, name: result.value.name, email: result.value.email, status: result.value.status }, dispatch );
            }
        } );
    };
    return (
        <div className="main-container">
            <div className="user-profile">
                <section className="user-profile-info">
                    <h1>Your ID is {userId}</h1>
                    <h2>name: {name}</h2>
                    <h2>Email: {email}</h2>
                    <h2>Gender: {gender.toUpperCase()}</h2>
                    <h2>Status: {status}</h2>
                    <div className="button-box">
                        <button className="change" onClick={handleChangeData}>
                            Change Your Data
                        </button>
                        <button className="change" onClick={() => {
                            localStorage.removeItem( 'user' );
                            logoutUser( dispatch, history)
                        }}>
                            Logout
                        </button>
                        <button className="change" onClick={() => {
                            Swal.fire( {
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                            } ).then( ( result ) => {
                                if ( result.isConfirmed ) {
                                    deleteUser( { id: userId }, dispatch, history );
                                }
                            } );
                        }}>
                            Delete Your Account
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserProfile;;