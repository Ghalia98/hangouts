import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import EventEdit from './pages/EventEdit';
import Navbar from './components/Navbar';

function App() {

  return (

    <div className="App background-tint">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/edit" element={<EventEdit />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
