import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./User/Pages/Home";
import UpdatePlace from "./Places/Pages/UpdatePlace";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation";
import UserPlaces from "./Places/Pages/UserPlaces";
import NewPlace from "./Places/Pages/NewPlace";
import Auth from "./User/Pages/Auth";
import { AuthContext } from "./Shared/context/auth-context";
//import { Navigate } from "react-router-dom";



const App = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();
  

  const login = useCallback((uid,token) => {
    setUserId(uid)
    setToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({userId: uid,token:token})
    )
  }, []);
  const logout = useCallback(() => {
    setUserId(null)
    setToken(null);
    localStorage.removeItem('userData')
  }, []);
  useEffect(()=>{
    const storedData= JSON.parse(localStorage.getItem('userData'))
      
    if(storedData && storedData.token){
      setUserId(null)
    setToken(null);
      login(storedData.userId,storedData.token)
    }
  })

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/" element={<Home />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:pid" element={<UpdatePlace />} />
        <Route path="*" element={<Home />} />
        {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
        {/* <Redirect to="/" /> */} 
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Home />} />
        {/* <Redirect to="/auth" /> */}
      </>
    );
  }

  console.log(token);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn:!!token,token, login, logout,userId }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <>{routes}</>
            {/* <Route path="/:uid/places" element={<UserPlaces />} />
     <Route path="/" element={<Home />} /> 
     <Route path="/places/new" element={<NewPlace />}/>
     <Route path="/places/:pid" element={<UpdatePlace />}/>
     <Route path="/auth" element={<Auth />} /> */}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;