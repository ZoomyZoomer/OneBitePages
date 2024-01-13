import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { faCookie } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import { UserContext } from '../UserContext'



export default function Navbar() {

const {setUserInfo, userInfo} = useContext(UserContext);
const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(res => {
      res.json().then(userInfo => {
        setUsername(userInfo?.username);
      })
    })
  })

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  let clicked = 0;

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
                <div>
                  <Link id="register" to="/register">Register</Link>
                </div>
                <div>
                  <Link id="login" to="/login">Login</Link>
                </div>
              </>
            )}
            
        </div>

    </section>
  )
}
