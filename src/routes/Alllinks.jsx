import React from "react";
import { Routes, Route } from "react-router-dom";
import Mainlayout from "../components/Mainlayout";
import Progress from "../pages/Progress";
import Home from "../pages/Home";
import Getstarted from "../pages/Getstarted";
import Workout from "../pages/Workout";
import Dashboard from "../pages/Dashboard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Loseweight from "../pages/Lossweight";
import Buildmuscle from "../pages/Buildmuscle";
import Stayfit from "../pages/Stayfit";
import Profile from "../components/Profile";
import Community from "../pages/Community";
import Challenges from "../pages/Challenges";

const Alllinks = () => {
  return (


    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/getstarted" element={<Getstarted/>}/>
        <Route path="/workout" element={<Workout/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/challenges" element={<Challenges/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>

      </Route>
     
        <Route path="/loseweight" element={<Loseweight/>}/>
        <Route path="/build-muscle" element={<Buildmuscle/>}/> 
        <Route path="/stay-fit" element={<Stayfit/>}/> 
     
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>


  );
};

export default Alllinks;
