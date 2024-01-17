import { useState } from "react"
import { Navigate } from "react-router-dom";

export default function RegisterPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function register(e){
        e.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        });
        if(response.status === 200) {
            alert('registration successful');
        } else {
            alert('registration failed');
        }
    }

    function showUnderline(id){
        var element = document.getElementById(id);
        element.classList.remove("noOpacity");
        element.classList.add("underlineAnimation");
    }

    function hideUnderline(id){
        var element = document.getElementById(id);
        element.classList.add("noOpacity");
        element.classList.remove("underlineAnimation");
    }

    if (redirect){
        return <Navigate to={'/login'} />
    }

    return (  
        <div className="footerPadding">
            <form className="register" onSubmit={register}>
                <div className="defaultFlex">
                    <h1>Register</h1>
                </div>
                <p>Username</p>
                <input type="text" 
                        placeholder="Enter username" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}/>
                <p>Password</p>
                <input type="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                <div className="defaultFlex">
                    <button>Register</button>
                </div>   
            </form>
                <div className="defaultFlex">
                    <div className="formBottom"></div>
                    <p>OR</p>
                    <div className="formBottom"></div>
                </div>
                <div id="inline" className="defaultFlex">
                    <div onClick={() => setRedirect(true)} onMouseEnter={() => showUnderline("ul1")} onMouseLeave={() => hideUnderline("ul1")} className="defaultGrid">
                        <p>Returning User?</p>
                        <div className="defaultFlex">
                            <div id="ul1" className={"formBottomMini" + " " + "noOpacity"} />
                        </div>
                    </div>
                    <div onMouseEnter={() => showUnderline("ul2")} onMouseLeave={() => hideUnderline("ul2")} className="defaultGrid">
                        <a href="mailto: realisticallyspeaking101@gmail.com"><p>Need Help?</p></a>
                        <div className="defaultFlex">
                            <div id="ul2" className={"formBottomMini" + " " + "noOpacity"} />
                        </div>
                    </div>  
                        
                </div>
        </div>
    )
}