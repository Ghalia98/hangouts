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
import VisitedProfile from './pages/VisitedProfile';
import { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
const alanKey = '41effc0282974b90e440026551d25c8d2e956eca572e1d8b807a3e2338fdd0dc/stage'

function App() {

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, route }) => {
        if (command === 'testCommand') {
          alert('This code was executed')
        }
        if (command === "navigation") {
          //call client code that will react on the received command
          // alert('This code was executed')
          // window.open("profile", "_self")

        }
      }
    })
  }, [])

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
          <Route path="/:id/profile" element={<VisitedProfile />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;
