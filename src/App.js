import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar';
import NoteProvider from './context/notes/Noteprovider';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AlertProvider from './context/notes/Alertprovider';

function App() {
  return (
    <>
    <NoteProvider>
    <AlertProvider>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<SignUp/>} />
        </Routes>
      </AlertProvider>
    </NoteProvider>
    </>
  );
}

export default App;
