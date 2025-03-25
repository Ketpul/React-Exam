import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header.jsx';
import Login from './components/login/login.jsx';
import Register from './components/Register/Register.jsx';
import Logout from './components/Logout/Logout.jsx';
import { UserProvider } from './context/UserContext.jsx';

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
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
