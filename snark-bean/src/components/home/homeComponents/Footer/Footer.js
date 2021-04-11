import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='text-center'>
          <h4 className='font-weight-bold'>Follow Us</h4>
          <div className='d-flex flex-row justify-content-center'>
            <span>
              <i className='fab fa-facebook fa-2x'></i>
            </span>
            <span>
              <i className='fab fa-twitter fa-2x'></i>
            </span>
            <span>
              <i className='fab fa-instagram fa-2x'></i>
            </span>
            <span>
              <i className='fab fa-pinterest fa-2x'></i>
            </span>
          </div>
          <p>&copy; Copyright 2021 | Snark Bean</p>
          <div class='top'>
            <a href='#home'>
              <i class='fas fa-arrow-circle-up fa-2x'></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
