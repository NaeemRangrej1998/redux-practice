// import {useLocation} from "react-router-dom";
import React from "react";
import {Card} from "react-bootstrap";

const IndexDashboard = () => {
    // const location = useLocation();
    console.log("Current location:");
    return (
        <>
            <div>
               <Card width="40vh">
                   {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                   <h1 style={{fontSize:"105px"}}></h1>
               </Card>
            </div>
        </>
    )
}

export default IndexDashboard