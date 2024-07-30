import React from 'react';

const VideoCard = ({ thumbnail, title, channel, views, duration }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <img className="w-full" src={thumbnail} alt={title} />
        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
          {duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-1">{channel}</p>
        <p className="text-gray-500 text-sm">{views} views</p>
      </div>
    </div>
  );
}

export default VideoCard;
