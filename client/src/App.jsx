import { Route, Routes } from 'react-router'; 
import './App.css';
import Header from './components/Header/Header.jsx';
import Register from './components/Register/Register.jsx';
import Logout from './components/Logout/Logout.jsx';
import { UserProvider } from './context/UserContext.jsx'; 
import Create from './components/CreateImg/Create.jsx';
import Images from './components/Images/Images.jsx';
import Login from './components/login/login.jsx';
import FavoriteImages from './components/FavoriteImages/FavoriteImages.jsx';
import About from './components/About/About.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomePage from './components/Home/Home.jsx';

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
            <Route path='/about' element={<About />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </main>
      </div>
        <Footer /> 
    </UserProvider>
  );
}


export default App;
