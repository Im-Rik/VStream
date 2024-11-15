import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LoginForm'
import VideoPlayerLayout from './components/VideoPlayer';
import VideoUploadForm from './components/VideoUploadForm';
import { AuthProvider } from './context/AuthContext.jsx';

// import TestComponent from './components/Test';

axios.defaults.withCredentials = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:4500/home');
        setVideos(response.data.allVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);


  // const videos = [
  //   {
  //     thumbnail: 'https://via.placeholder.com/320x180',
  //     title: 'Sample Video 1',
  //     channel: 'Channel 1',
  //     views: '1.2M',
  //     duration: '12:34'
  //   },
  //   {
  //     thumbnail: 'https://via.placeholder.com/320x180',
  //     title: 'Sample Video 2',
  //     channel: 'Channel 2',
  //     views: '850K',
  //     duration: '8:56'
  //   },
  //   {
  //     thumbnail: 'https://via.placeholder.com/320x180',
  //     title: 'Sample Video 3',
  //     channel: 'Channel 3',
  //     views: '1.2M',
  //     duration: '12:34'
  //   },
    
  // ];

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
                      key={video._id}
                      id={video._id}
                      thumbnail={`http://localhost:4500${video.thumbnail}`}
                      title={video.title}
                      channel={video.owner.name}
                      views={video.views}
                      duration={video.duration}
                    />
                  ))}
                </div>
              } 
            />
            <Route path="/video/:videoId" element={<VideoPlayerLayout videos={videos} />} />
            <Route path= "/signup" element={<SignUpForm/>}/>
            <Route path= "/login" element={<LogInForm/>}/>
            <Route path= "/upload" element={<VideoUploadForm/>}/>
          </Routes>
        </main>
      </div>
    </Router>
    // <div> <TestComponent /> </div>
  );
}

export default App;
