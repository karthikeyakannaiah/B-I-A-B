const Post = ({id, post, deletePost}) => {
    let handleDelete=()=>{
        deletePost(id)
    }
    return (  
        <div id={id} className="post">
            <h3>{post.title}</h3>
            <hr />
            <p>{post.content}</p>
            <h5>by {`<`}{post.username}{`>`}</h5>
            <input className="delete-btn" type="button" value="Delete Post" onClick={handleDelete}/>
        </div>
    );
}
 
export default Post;