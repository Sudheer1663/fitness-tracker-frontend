import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "./Mainlayout.css";

function Mainlayout() {
    return (

        <div className="mainLayout">
            <div className="navbarlayout">
                <Navbar />
            </div>
            <div className="outletLayout">
                <Outlet />
            </div>
        </div>


    );
}
export default Mainlayout;

