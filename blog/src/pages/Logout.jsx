import Navbar from "../components/Navbar";

const Logout = ({login, handleLogout}) => {
    return (  
        <>
            <Navbar login={login}/>
            <div className="logout">
                Are you sure you wanna logout<br/>
                <input 
                className="log-btn" type='button' value="Yes bro please" onClick={handleLogout}/>
            </div>
        </>
    );
}
 
export default Logout;