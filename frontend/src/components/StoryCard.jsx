import React from 'react';
import { X } from 'lucide-react';
import { getStoryImage } from '../services/storyService';

const StoryCard = ({ story, onDelete, onClick, isSelected }) => {
  const imageUrl = getStoryImage(story.id);

  return (
    <div 
      className={`relative rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:scale-[1.02]'}`}
      onClick={() => onClick(story.id)}
    >
      <img
        src={imageUrl}
        alt={story.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{story.description}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(story.id);
        }}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white 
          text-gray-600 hover:text-red-600 transition-colors shadow-sm"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StoryCard;
