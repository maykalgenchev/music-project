import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext.js';

import useLocalStorage from './hooks/useLocaleStorage.js';
// import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import SongList from './components/SongList/SongList.js';
import CreateSong from './components/Create/CreateSong.js';
import Logout from './components/Logout/Logout.js';
import Details from './components/Details/Details.js';
import Edit from './components/Edit/Edit.js';
import MySongs from './components/MySongs/MySongs.js';
import LikedSongs from './components/LikedSongs/LikedSongs.js';
import Home from './components/Home/Home.js'


const initialAuthState = {
  _id: '',
  email: '',
  accessToken: '',
};

function App() {
  let [user, setUser] = useLocalStorage('user', initialAuthState);

  const login = (authData) => {
    setUser(authData);
  }

  const logout = () => {
    setUser(initialAuthState);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div id="container">
        <Header />

        <main id="site-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/all-songs" element={<SongList />} />
            <Route path="/my-songs" element={<MySongs />} />
            <Route path="/create" element={<CreateSong />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/details/:songId" element={<Details />} />
            <Route path="/edit/:songId" element={<Edit />} />
            <Route path="/liked-songs" element={<LikedSongs />} />
          </Routes>
        </main>

        <footer>
          <div className="d-flex justify-content-center border-top fixed-bottom">
            <p>@SongWorld</p>
          </div>
        </footer>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
