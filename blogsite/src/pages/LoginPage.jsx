import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [redirectRegister, setRedirectRegister] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(e){
        e.preventDefault();
       const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if (response.ok){
            response.json().then(userInfo => {
            setUserInfo(userInfo);
            setRedirect(true);
            })
        } else {
            alert('wrong credentials');
        }
    }

    if (redirect){
        return <Navigate to={'/'} />
    }

    if (redirectRegister){
        return <Navigate to={'/register'} />
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

    return (  
        <div className="formMargin">
         <form className="login" onSubmit={login}>
                <div className="defaultFlex">
                    <h1>Login</h1>
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
                    <button>Login</button>
                </div>   
        </form>
        <div className="defaultFlex">
            <div className="formBottom"></div>
                <p>OR</p>
            <div className="formBottom"></div>
        </div>
        <div id="inline" className="defaultFlex">
            <div onClick={() => setRedirectRegister(true)}onMouseEnter={() => showUnderline("ul3")} onMouseLeave={() => hideUnderline("ul3")} className="defaultGrid">
                <p>Create An Account</p>
                <div className="defaultFlex">
                    <div id="ul3" className={"formBottomMini" + " " + "noOpacity"} />
                </div>
            </div>
            <div onMouseEnter={() => showUnderline("ul4")} onMouseLeave={() => hideUnderline("ul4")} className="defaultGrid">
                <a href="mailto: realisticallyspeaking101@gmail.com"><p>Need Help?</p></a>
                <div className="defaultFlex">
                    <div id="ul4" className={"formBottomMini" + " " + "noOpacity"} />
                </div>
            </div>   
        </div>
    </div>
    )
}