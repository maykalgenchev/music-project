import { Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext.js';
import { AuthProvider } from './contexts/AuthContext';
// import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import SongList from './components/SongList/SongList.js';
import CreateSong from './components/Create/CreateSong.js';
import Logout from './components/Logout/Logout.js';
import Details from './components/Details/Details.js';
import Notification from './components/Notification/Notification.js';
import Edit from './components/Edit/Edit.js';
import MySongs from './components/MySongs/MySongs.js';
import LikedSongs from './components/LikedSongs/LikedSongs.js';
import Home from './components/Home/Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteGuard from './components/Guard/RouteGuard.js';




function App() {

  return (
    <AuthProvider>
      <NotificationProvider>
        <div id="container">
          <Header />

          <Notification />

          <main id="site-content">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/all-songs" element={<SongList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/details/:songId" element={<Details />} />

              <Route element={<RouteGuard />}>
                <Route path="/create" element={<CreateSong />} />
                <Route path="/my-songs" element={<MySongs />} />
                <Route path="/edit/:songId" element={<Edit />} />
                <Route path="/liked-songs" element={<LikedSongs />} />
              </Route>
            </Routes>
          </main>

          <footer>
            <div className="d-flex justify-content-center border-top fixed-bottom">
              <p>@SongWorld</p>
            </div>
          </footer>
        </div>
      </NotificationProvider>
    </AuthProvider>

  );
}

export default App;
