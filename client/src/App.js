import './App.css';
import React from 'react'
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import EventEdit from './pages/EventEdit';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useEffect } from 'react';

function App() {
  const [backgroundImg, setBackgroundImg] = useState('')
  const renderBgImg = () => {
    fetch(`https://api.unsplash.com/photos/random/?client_id=44tBzWk4AZOOkixpuhybYGVl2yF1dIlzkLnwGEmZ6mA`)
      .then(function (response) {
        return response.json()
      })
      .then(
        function (jsonData) {
          setBackgroundImg(jsonData.urls.regular)
        }
      )
  }
  useEffect(() => {
    renderBgImg()
  }, [])


  return (

    <div className="App background-tint" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <main>
        <Navbar />
        <Routes >
          <Route path="/" element={<Home renderBgImg={renderBgImg} />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/edit" element={<EventEdit />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;
