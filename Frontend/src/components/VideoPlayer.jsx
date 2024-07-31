import React, { useState, useRef, useEffect } from 'react';
import 'tailwindcss/tailwind.css';





const VideoPlayer = () => {
    return(
        <div className="container mx-auto px-4">
             <div className="flex flex-col lg:flex-row lg:space-x-4 ">
                <div className="lg:w-3/4">
                 <div className="bg-red-500 aspect-video mb-4">Video Player</div>
                 <div className="bg-yellow-500 p-4 mb-4">Video info</div>
                 <div className="bg-gray-200 p-4">Comments section</div>
                </div>

               <div className="lg:w-1/4 bg-purple-500 p-4 mt-4 lg:mt-0">
                 Related videos
               </div>
             </div>
        </div>
    )
}


export default VideoPlayer;
