import React from 'react';

const VideoCard = ({ thumbnail, title, channel, views, duration }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <img className="w-full" src={thumbnail} alt={title} />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-0.5 rounded">
          {duration}
        </span>
      </div>
      <div className='flex justify-between items-center p-3'>
        <p className="text-gray-500 text-sm">{channel}</p>
        <p className="text-gray-500 text-sm">{views} views</p>
      </div>
      <div className="px-3 pb-3">
        <h3 className="font-bold text-sm text-gray-800">{title}</h3>
      </div>
    </div>

  );
}

export default VideoCard;
