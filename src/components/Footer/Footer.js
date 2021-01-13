import React, { Component } from 'react';
import "./Footer.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLinkedin, faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return ( 
        <div className="bg-dark text-center">
            {/* <FontAwesomeIcon icon={faGithub} className="m-2" />
            <FontAwesomeIcon icon={faLinkedin} className="m-2" />
            <FontAwesomeIcon icon={faMedium} className="m-2" />  */}
            <a href="" className="fa fa-linkedin"></a>
            <a href="" className="fa fa-github"></a>
            <a href="" className="fa fa-medium"></a>
        </div>
     );
}
 
export default Footer;
