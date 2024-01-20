import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { faCookie } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useNavigate } from 'react-router-dom';

function MainHeader() {

    const [visible, setVisible] = useState(true);

    let clicked = 0;

    function cookieAnimation(){

        if (clicked != 1){
          var fullcookie = document.getElementById("fullcookieMain");
          var cookie = document.getElementById("cookieMain");
    
          fullcookie.classList.remove("idleCookie");


            fullcookie.classList.add("rotateCookie");
        
            setTimeout(halfCookie, 1000);
        
            function halfCookie(){
                document.getElementById("blackhole").classList.add("noOpacity");
                fullcookie.classList.add("noOpacity");
                cookie.classList.remove("noOpacity");
                cookie.classList.add("eatCookieMain");
                setVisible(false);
                clicked = 1;
            }
        
    
        }
    
        
      }

      function blackhole() {
        if (visible){
            document.getElementById("blackhole").classList.remove("noOpacity");
        }
      }

      function blackholeRemove() {
        document.getElementById("blackhole").classList.add("noOpacity");
      }

      const [redirect, setRedirect] = useState(0);

      async function checkIfLoggedIn() {
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
        })
        if (response.status === 401){
          setRedirect(1);
        } else {
          setRedirect(2);
        }
      }

      if (redirect === 1){
        return <Navigate to={'/login'} />
      }

      if (redirect === 2) {
        return <Navigate to={'/create'} />
      }
    

      


  return (
    <>
    <div id="navbarTag" />
    <div className="mainHeaderWrap">
      <div className="defaultFlex">
        <div>
          <div className="cookieHolderMain">
              <FontAwesomeIcon id="cookieMain" className="noOpacity" icon={faCookieBite} color="#222" size="xl"/>
              <img id="blackhole" className="noOpacity" src="blackhole.png"></img>
              {visible && <FontAwesomeIcon onMouseLeave={() => blackholeRemove()} onMouseEnter={() => blackhole()} onClick={() => cookieAnimation()}id="fullcookieMain" icon={faCookie} className={"idleCookie" + " " + "fullcookieMain"} color="#222" size="10x"/>}
              {!visible && <div className="mimicHeight"></div>}
          </div>
          <div className="miniText">
              <p>Want A Bite?</p> 
              <h4>Take A Try At A Random Post</h4>
          </div>
        </div>
        <div className={"absoluteButton" + " " + "leftDashAnimation"}>
          <div className="defaultGrid">
              <div className="defaultFlexLeft">
                <h1 id="introMainText">Don't want the crumbs?</h1>
              </div>
              <div className="defaultFlexLeft">
                <p id="introText">Create your own bite-sized story, article, or thought bubble.</p>
              </div>
              <div className="defaultFlexLeft">
                <button onClick={() => checkIfLoggedIn()}>Start Posting</button>
              </div>
              
          </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default MainHeader