import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        },3000)
    })
    return (  
        <div className="not-found">
            <h1>404</h1>
            <h2>Bro you are in wrong page</h2>
            <h2>Redirecting you to Home in a bit</h2>
        </div>
    );
}
 
export default NotFound;