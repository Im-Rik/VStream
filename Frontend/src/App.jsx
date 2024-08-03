import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LoginForm'
import VideoPlayerLayout from './components/VideoPlayer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const videos = [
    {
      thumbnail: 'https://via.placeholder.com/320x180',
      title: 'Sample Video 1',
      channel: 'Channel 1',
      views: '1.2M',
      duration: '12:34'
    },
    {
      thumbnail: 'https://via.placeholder.com/320x180',
      title: 'Sample Video 2',
      channel: 'Channel 2',
      views: '850K',
      duration: '8:56'
    },
    {
      thumbnail: 'https://via.placeholder.com/320x180',
      title: 'Sample Video 3',
      channel: 'Channel 3',
      views: '1.2M',
      duration: '12:34'
    },
    
  ];

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {videos.map((video) => (
                    <VideoCard 
                      key={video.id}
                      id={video.id}
                      thumbnail={video.thumbnail}
                      title={video.title}
                      channel={video.channel}
                      views={video.views}
                      duration={video.duration}
                    />
                  ))}
                </div>
              } 
            />
            <Route path="/video" element={<VideoPlayerLayout videos={videos} />} />
            <Route path= "/signup" element={<SignUpForm/>}/>
            <Route path= "/login" element={<LogInForm/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
