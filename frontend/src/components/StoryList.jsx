import React from 'react';
import StoryCard from './StoryCard';

const StoryList = ({ stories, onDelete, onStoryClick, selectedStoryId }) => {
  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <p className="text-gray-500 mb-2">No stories found</p>
        <p className="text-sm text-gray-400">Click "Add Story" to create your first story</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          onDelete={onDelete}
          onClick={onStoryClick}
          isSelected={story.id === selectedStoryId}
        />
      ))}
    </div>
  );
};

export default StoryList;
