import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createDispatchHook, createSelectorHook, Provider } from 'react-redux';
import { store } from './Redux/store';
import './index.css';
import App from './App';
import Signup from './Components/Signup';
import UserProfile from './Components/UserDetails';


const context = React.createContext( store );
export const useUserDispatch = createDispatchHook( context );
export const useUserSelector = createSelectorHook( context );


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <Provider store={store} context={context}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);






