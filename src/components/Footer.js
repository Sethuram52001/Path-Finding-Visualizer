import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return ( 
        <div className="bg-dark text-white text-center">
            Footer
            <a href="https://github.com/Sethuram52001">
                <FontAwesomeIcon icon={faGithub} />
            </a>    
            <a href="https://www.linkedin.com/in/sethuram-s-v-171719194/">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>    
        </div>
     );
}
 
export default Footer;
