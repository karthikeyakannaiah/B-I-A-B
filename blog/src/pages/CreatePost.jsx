import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const CreatePost = ({login,username, createPost}) => {
    const [title, setTitle]=useState("")
    const [content, setContent] =useState("")
    return (  
        <>
        <Navbar login={login}/>
        {login?<>
            <div className="create-form">
                <h1>Here is your chance, cry out loud bro, or just <Link to='/posts'>Go back</Link></h1>
                <input type="text" name="title" placeholder="what you thinking bout title huh?" onChange={e=>setTitle(e.target.value)} id="title" />
                <textarea placeholder="Ok let me know, what's up?" onChange={e=>setContent(e.target.value)}/>
                <input type="button" value="pov I am posting" className="create-post" onClick={()=>createPost(title,content,username)}/>
            </div></>:
            <div className="message">
                Oh no, looks like you haven't logged in<br/>
                Let me help you login
                <Link to='/login'>click here</Link>
            </div>}
        </>
    );
}
 
export default CreatePost;