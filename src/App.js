import { Routes, Route } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import SongList from './components/SongList/SongList.js';
import CreateSong from './components/Create/CreateSong.js';


function App() {
  return (
    <div id="container">
      <Header />

      <main id="site-content">
        <Routes>
          <Route path="/all-songs" element={<SongList />} />
          <Route path="/create" element={<CreateSong />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer id="site-footer">
        <p>@SongWorld</p>
      </footer>
    </div>

  );
}

export default App;
