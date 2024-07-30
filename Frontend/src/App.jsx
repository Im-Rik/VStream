import React, { useState } from 'react';
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard';

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
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video, index) => (
            <VideoCard 
              key={index}
              thumbnail={video.thumbnail}
              title={video.title}
              channel={video.channel}
              views={video.views}
              duration={video.duration}
            />
          ))}
        </div>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </main>
    </div>
  );
}

export default App;
