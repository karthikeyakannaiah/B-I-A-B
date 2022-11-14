import { useState } from "react";
import Navbar from "../components/Navbar";

const Login = ({login, handleLogin}) => {
    const [name, setName]=useState("ghost")
    const [password, setPass]=useState("new")
    let doLogin=()=>{
        handleLogin(name,password)
    }
    return (  
        <>
            <Navbar login={login}/>
            <div className="form">
                <input type="text" name="name" value={name} placeholder="username" id="name" onChange={e=>setName(e.target.value)}/>
                <input type="password" name="password" value={password} placeholder="password"  id="password" onChange={e=>setPass(e.target.value)}/>
                <input type="button"
                className="log-btn" id="login" onClick={doLogin} value="login" />
            </div>
        </>
    );
}
 
export default Login;