// Card.tsx
import React, { useState } from 'react';

type ItemType = {
  id: number;
  htmlCode: string;
  thumbnailUrl: string;
  videoUrl: string; // Add this line
  category: string;
  title: string;
  description: string;
};

interface CardProps {
  item: ItemType;
}
const Card: React.FC<CardProps> = ({ item }) => {
  // Handle click to open the video in a new tab
  const handleClick = () => {
    window.open(item.videoUrl, '_blank'); // Ensure item has a videoUrl property
  };

  return (
    <div
      className="relative shrink-0 cursor-pointer bg-slate-600 border-4 rounded-2xl border-emerald-500 shadow-md transition-all hover:scale-[1.015] hover:shadow-xl overflow-hidden"
      style={{
        width: 350, // Adjust width as needed
        height: 350, // Adjust height as needed
        marginRight: 20, // Adjust margin as needed
      }}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <img
        src={item.thumbnailUrl}
        alt="Thumbnail"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay Container for Text */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-50">
        {/* Title at the top */}
        <p className="text-xl font-bold text-white">{item.title}</p>
        {/* Description at the bottom */}
        <p className="text-sm text-white">{item.description}</p>
      </div>
    </div>
  );
};

export default Card;