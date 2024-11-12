import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Hls from 'hls.js';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/video/${videoId}`);
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    // Initialize HLS playback if videoData and HLS support are present [See Documentation]
    if (videoData?.videoFile && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(`http://localhost:4500${videoData.videoFile}`);
      hls.attachMedia(document.getElementById('video-player'));
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        document.getElementById('video-player').play();
      });
    }
  }, [videoData]);

  if (!videoData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="lg:w-3/4">
          <div className="aspect-video mb-4">
            {/* HLS-enabled video player */}
            <video id="video-player" controls className="w-full" />
          </div>
          <div className="bg-yellow-500 p-4 mb-4">
            <h2 className="text-xl font-semibold">{videoData.title}</h2>
            <p>{videoData.description}</p>
          </div>
          <div className="bg-gray-200 p-4">Comments section</div>
        </div>
        <div className="lg:w-1/4 bg-purple-500 p-4 mt-4 lg:mt-0">
          Related videos
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
