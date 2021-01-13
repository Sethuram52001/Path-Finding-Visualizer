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
            <a href="https://www.linkedin.com/in/sethuram-s-v-171719194/" className="fa fa-linkedin"></a>
            <a href="https://github.com/Sethuram52001" className="fa fa-github"></a>
            <a href="https://sethuram52001.medium.com/" className="fa fa-medium"></a>
        </div>
     );
}
 
export default Footer;
