import Navbar from "../components/Navbar";

const Home = ({login}) => {
    return (  
        <>
            <Navbar login={login}/>
            <div className="home">
                <h1>Bro,</h1>
                <h1>This is a Blog</h1>
                <h1>Where you can</h1>
                <h1>Just</h1>
                <h1>Blog</h1>
            </div>
        </>
    );
}
 
export default Home;