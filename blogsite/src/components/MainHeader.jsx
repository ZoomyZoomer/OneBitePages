import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { faCookie } from '@fortawesome/free-solid-svg-icons'

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


  return (
    <div className="mainHeaderWrap">
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
  )
}

export default MainHeader