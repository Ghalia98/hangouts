import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import EventEdit from './pages/EventEdit';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {

  return (

    <div className="App background-tint">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/edit" element={<EventEdit />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
