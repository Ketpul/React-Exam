import { Route, Routes } from 'react-router'; // Забележка: Импортирай от 'react-router-dom'
import './App.css';
import Header from './components/Header/Header.jsx';
import Register from './components/Register/Register.jsx';
import Logout from './components/Logout/Logout.jsx';
import { UserProvider } from './context/UserContext.jsx'; // Импортиране на UserProvider
import Create from './components/CreateImg/Create.jsx';
import Images from './components/Images/Images.jsx';
import Login from './components/login/login.jsx';
import FavoriteImages from './components/FavoriteImages/FavoriteImages.jsx';

function App() {
  return (
    <UserProvider>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:imageId' element={<Create />} />
            <Route path='/gallery' element={<Images />} />
            <Route path='/favorite' element={<FavoriteImages />} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
