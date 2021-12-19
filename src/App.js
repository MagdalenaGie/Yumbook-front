import './App.css';
import Layout from './components/Layout';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import SearchPage from './components/SearchPage';
import UserPage from './components/UserPage';
import LoginPage from './components/LoginPage';
import Recommender from './components/Recommender';
import { Logout } from './components/Logout';
import { useState } from 'react';

function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [userName, setUserName] = useState("")

  const isLoggedRoutes = (
    <Routes>
        <Route path="/logout" element={<Logout setLogged={setIsLogged} setUser={setUserName}/>} />
        <Route path="/" element={<SearchPage/>} userName={userName}/>
        <Route path="/search" element={<SearchPage userName={userName}/>} />
        <Route path="/user" element={<UserPage userName={userName}/>}/>
        <Route path="/recommend" element={<Recommender userName={userName}/>}/>
      </Routes>
  )

  const isNotLoggedRoutes = (
    <Routes>
        <Route path="/" element={<LoginPage setLogged={setIsLogged} setUser={setUserName}/>}/>
        <Route path="/login" element={<LoginPage setLogged={setIsLogged} setUser={setUserName}/>}/>
        <Route path="/logout" element={<Logout setLogged={setIsLogged} setUser={setUserName}/>}/>
      </Routes>
  )
  return (
    <Layout isLogged={isLogged}>
      {isLogged ? isLoggedRoutes : isNotLoggedRoutes}
    </Layout>
  );
}

export default App;
