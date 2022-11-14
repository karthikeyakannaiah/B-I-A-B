import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Posts from './pages/Posts';
import About from './pages/About';
import Login from './pages/Login';
import Logout from './pages/Logout';
import CreatePost from './pages/CreatePost';
function App() {
  const url = 'https://biab-api.herokuapp.com'
  const navigate = useNavigate()
  const [user, setuser] = useState({})
  const [login, setLogin] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async (url, login, setPosts) => {
      if (login) {
        await axios.get(url + '/posts').then(res => res.data).then(posts => setPosts(posts))
      } else {
        setPosts([])
      }
    }
    fetchData(url, login, setPosts)
  }, [login])
  let doLogin = async (name, password) => {
    let cred = {
      name: name,
      password: password
    }
    await axios.post(url + '/login', cred).then(res => res.data).then(data => {
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
    })
    setuser({ name: cred.name })
    setLogin(true)
    navigate('/posts')
  }
  let doLogout = async () => {
    await axios.delete(url + '/logout', { token: localStorage.getItem('refreshToken') })
    setuser({})
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setLogin(false)
    navigate('/')
  }
  let createPost = async (title, content, username) => {
    await axios.post(url + '/posts/create-a-post', {
      post: {
        username: username,
        title: title,
        content: content
      }
    }).then(res => res.data).then(data => data.posts).then(posts => setPosts(posts))
    window.alert("success bro")
  }
  let deletePost = async (id) => {
    await axios.delete(url + '/posts/delete-post', {
      id: id
    }).then(res => res.data.posts).then(posts => setPosts(posts))
  }
  return (
    <Routes>
      <Route index={true} path='/' element={<Home login={login} />} />
      <Route
        path='/posts'
        element={<Posts login={login} posts={posts} deletePost={deletePost} />}
      />
      <Route
        path='/posts/create-a-post'
        element={<CreatePost login={login} createPost={createPost} username={user.name} posts={posts} />}
      />
      <Route
        path='/about'
        element={<About login={login} />}
      />
      <Route
        path='/login'
        element={<Login handleLogin={doLogin} login={login} />}
      />
      <Route
        path='/logout'
        element={<Logout handleLogout={doLogout} login={login} />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
