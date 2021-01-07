import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";

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
            <a href="https://sethuram52001.medium.com/data-structures-weighted-graphs-3cd86b1b5aa9">
                <FontAwesomeIcon icon={faMedium} />
            </a>    
        </div>
     );
}
 
export default Footer;
