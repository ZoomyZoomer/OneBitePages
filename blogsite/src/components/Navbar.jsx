import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { faCookie } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {Link, Navigate} from "react-router-dom";
import { UserContext } from '../UserContext'



export default function Navbar() {

  const [redirect, setRedirect] = useState(false);

  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setRedirect(true);
    setUserInfo(null);
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

    if (redirect){
      return <Navigate to={'/'} />
  }

    
  }

  return (
    <section className="navbarMainFlex">
        <div className='navbarLeftFlex'>
            <div className="cookieHolder" onClick={() => cookieAnimation()}>
              <FontAwesomeIcon id="cookie" icon={faCookieBite} color="#f8f8f8" size="xl"/>
              <FontAwesomeIcon id="fullcookie" icon={faCookie} color="#f8f8f8" size="xl"/>
            </div>
            <Link to="/">OneBitePages</Link>
            
        </div>
        <div className="navbarRightFlex">
          {username && (
            <>
              <Link to="/create" className="pencilHolder">
                <FontAwesomeIcon id="pencil" icon={faPencil} color="#f8f8f8" size="xl"/>
                <FontAwesomeIcon id="plus" icon={faPlus} color="#f8f8f8" size="sm"/>
              </Link>
              <a onClick={logout}>Logout</a>
            </>
            )}
            {!username && (
              <>
               <Link id="register" to="/register">
                  <div>
                    Register
                  </div>
                </Link>
                <Link id="login" to="/login">
                  <div>
                    Login
                  </div>
                </Link>
              </>
            )}
            
        </div>

    </section>
  )
}
