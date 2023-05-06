import axios from 'axios';
import Swal from 'sweetalert2';
import {
    loginStart,
    loginSuccess,
    loginFailure,
    signupStart,
    signupSuccess,
    signupFailure,
    updateStart,
    updateSuccess,
    updateFailure,
    deleteStart,
    deleteSuccess,
    deleteFailure,
    logout,
} from './slicer';



export const login = async ( payload, dispatch, location ) => {
    dispatch( loginStart() );
    try {
        const resp = await axios.get( `https://gorest.co.in/public/v2/users/${payload.id}`, {
            headers: {
                Authorization: `Bearer c39ab2c4ef0eeb123566f4f33c2462536c169d2695be56305d4a13eabcb3f681`,
            },
        } );
        localStorage.setItem( 'user', JSON.stringify( resp.data ) );
        dispatch( loginSuccess( resp.data ) );
        Swal.fire( {
            icon: 'success',
            title: 'Login Successful',
            text: `Welcome Back ${resp.data.name}!`,
            showConfirmButton: false,
            timer: 3000,
        } );
        location( '/profile' );
    } catch ( err ) {
        dispatch( loginFailure( err.message ) );
        Swal.fire( {
            icon: 'error',
            title: `${err.message}`,
            text: 'Please try again',
            showConfirmButton: false,
            timer: 3000,
        } );
    }
};

export const signup = async ( payload, dispatch, location ) => {
    dispatch( signupStart() );
    try {
        const res = await axios.post( 'https://gorest.co.in/public/v2/users', payload, {
            headers: {
                Authorization: `Bearer c39ab2c4ef0eeb123566f4f33c2462536c169d2695be56305d4a13eabcb3f681`,
            },
        } );
        localStorage.setItem( 'user', JSON.stringify( res.data ) );
        dispatch( signupSuccess( res.data ) );
        Swal.fire( {
            icon: 'success',
            title: 'Signup Successful',
            text: 'Welcome!',
            showConfirmButton: false,
            timer: 3000,
        } );
        location( '/profile' );
    } catch ( err ) {
        dispatch( signupFailure( err.message ) );
        Swal.fire( {
            icon: 'error',
            title: 'Signup Failed',
            text: 'Please try again',
            showConfirmButton: false,
            timer: 3000,
        } );
    }
};

export const update = async ( payload, dispatch ) => {
    dispatch( updateStart() );
    try {
        const res = await axios.patch( `https://gorest.co.in/public/v2/users/${payload.id}`, payload,
            {
                headers: {
                    Authorization: `Bearer c39ab2c4ef0eeb123566f4f33c2462536c169d2695be56305d4a13eabcb3f681`,
                },
            } );
        localStorage.setItem( 'user', JSON.stringify( res.data ) );
        dispatch( updateSuccess( res.data ) );
        Swal.fire( {
            icon: 'success',
            title: 'Update Successful',
            text: 'Your profile has been updated',
            showConfirmButton: false,
            timer: 3000,
        } );
    } catch ( err ) {
        dispatch( updateFailure( err.message ) );
        Swal.fire( {
            icon: 'error',
            title: 'Update Failed',
            text: 'Please try again',
            showConfirmButton: false,
            timer: 3000,
        } );
    }
};

export const deleteUser = async ( payload, dispatch, location ) => {
    dispatch( deleteStart() );
    try {
        await axios.delete( `https://gorest.co.in/public/v2/users/${payload.id}`,
            {
                headers: {
                    Authorization: `Bearer c39ab2c4ef0eeb123566f4f33c2462536c169d2695be56305d4a13eabcb3f681`,
                },
            } );
        localStorage.removeItem( 'user' );
        dispatch( deleteSuccess() );
        Swal.fire( {
            icon: 'success',
            title: 'Delete Successful',
            text: 'Your profile has been deleted',
            showConfirmButton: false,
            timer: 3000,
        } );
        location( '/' );
    } catch ( err ) {
        dispatch( deleteFailure( err.message ) );
        Swal.fire( {
            icon: 'error',
            title: 'Delete Failed',
            text: 'Please try again',
            showConfirmButton: false,
            timer: 3000,
        } );
    }
};

export const logoutUser = ( dispatch, location ) => {
    dispatch( logout() );
    localStorage.removeItem( 'user' );
    Swal.fire( {
        icon: 'success',
        title: 'Logout Successful',
        text: 'See you next time!',
        showConfirmButton: false,
        timer: 3000,
    } );
    location( '/' );
};