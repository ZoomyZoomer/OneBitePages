import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { faCookie } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {Link, Navigate, useNavigate} from "react-router-dom";
import { UserContext } from '../UserContext'



export default function Navbar() {

  const navigate = useNavigate();

  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://one-bite-pages-9danetx5x-kamil-wisniewskis-projects.vercel.app/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function logout() {
    try {
      await fetch('https://one-bite-pages-9danetx5x-kamil-wisniewskis-projects.vercel.app/logout', {
        credentials: 'include',
        method: 'POST',
      });
  
      setUserInfo(null);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  const username = userInfo?.username;

  function cookieAnimation(){

    if (clicked != 1){
      var fullcookie = document.getElementById("fullcookie");
      var cookie = document.getElementById("cookie");

      cookie.classList.add("noOpacity");
      fullcookie.classList.add("rotateCookie");

      setTimeout(halfCookie, 1000);

      function halfCookie(){
        fullcookie.classList.add("noOpacity");
        cookie.classList.remove("noOpacity");
        cookie.classList.add("eatCookie");
        cookie.classList.add("fullcookieheight");
        clicked = 1;
      }
    }
    
  }

  const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
};

  document.addEventListener('scroll', storeScroll);

  storeScroll();

  return (
    <section id="navbarMainFlex" className="navbarMainFlex">
        <div className='navbarLeftFlex'>
            <div className="cookieHolder" onClick={() => cookieAnimation()}>
              <FontAwesomeIcon id="cookie" icon={faCookieBite} color="#222" size="xl"/>
              <FontAwesomeIcon id="fullcookie" icon={faCookie} color="#222" size="xl"/>
            </div>
            <Link to="/"><p id="textLogo">OneBitePages</p></Link>
            
        </div>
        <div className="navbarRightFlex">
          {username && (
            <>
              <Link to="/create" className="pencilHolder">
                <FontAwesomeIcon id="pencil" icon={faPencil} color="#222" size="xl"/>
                <FontAwesomeIcon id="plus" icon={faPlus} color="#222" size="sm"/>
              </Link>
              <a id="textLogout" onClick={logout}>Logout</a>
            </>
            )}
            {!username && (
              <>
               <Link id="register" to="/register">
                  <div>
                    <p id="textRegister">Register</p>
                  </div>
                </Link>
                <Link id="login" to="/login">
                  <div>
                    <p id="textLogin">Login</p>
                  </div>
                </Link>
              </>
            )}
            
        </div>

    </section>
  )
}
