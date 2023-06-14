import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar';
import NoteProvider from './context/notes/Noteprovider';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteProvider>
        <NavBar />
        <Alert message={"Hello This is Alert"}/>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About/>} />
        </Routes>
    </NoteProvider>
    </>
  );
}

export default App;
