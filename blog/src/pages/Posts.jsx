import { Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Footer from "../components/Footer";
const Posts = ({login, posts, deletePost}) => {
    return (  
        <>
            <Navbar login={login}/>
            {login? 
                <>
                    <div className="posts">
                        <div className="feed">
                            <h2>Wanna post something <Link to='/posts/create-a-post'>Click here broo..</Link></h2>
                            <h1>The <span>Feed</span></h1>
                            <p>{`>`} Check out what all are posting</p>
                        </div>
                        <AllPosts posts={posts} deletePost={deletePost}/>
                    </div>
                    <Footer/>
                </>
                :
                <div className="message">
                    Oh no, looks like you haven't logged in<br/>
                    Let me help you login
                    <Link to='/login'>click here</Link>
                </div>
            }
        </>
    );
}
const AllPosts=({posts, deletePost})=>{
    const list = posts?.map((post,i)=>(<Post key={i} id={i} post={post} deletePost={deletePost}/>))
    return(
        list
    )
}
 
export default Posts;