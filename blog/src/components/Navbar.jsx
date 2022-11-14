import { NavLink } from "react-router-dom";
const getActiveStyle=({isActive})=>({
    color:isActive?"white":"black",
    backgroundColor:isActive?"black":"white",
    padding:"5px"
})
const Navbar = ({login}) => {
    return (  
        <nav className="nav">
            <h2 className="logo">Bro It's A Blog</h2>
            <h3>
                <NavLink to='/'>
                    Home
                </NavLink>
            </h3>
            <h3>
                <NavLink to='/posts' style={getActiveStyle}>
                    Posts
                </NavLink>
            </h3>
            <h3>
                <NavLink to='/about' style={getActiveStyle}>
                    About
                </NavLink>
            </h3>
            <h3>
                {login ?(<NavLink to='/logout' style={getActiveStyle}>Logout</NavLink>):(<NavLink to='/login' style={getActiveStyle}>Login</NavLink>)}
            </h3>
        </nav>
    );
}
 
export default Navbar;