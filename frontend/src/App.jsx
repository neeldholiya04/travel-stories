import React, { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Map as MapIcon, List, Plus, X } from 'lucide-react';
import Map from './components/Map';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import { getAllStories, createStory, deleteStory } from './services/storyService';

const App = () => {
  const [stories, setStories] = useState([]);
  const [tempMarker, setTempMarker] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStoryIds, setSelectedStoryIds] = useState([]);
  const [highlightedMarkerId, setHighlightedMarkerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreatingStory, setIsCreatingStory] = useState(false);

  React.useEffect(() => {
    const fetchStories = async () => {
      try {
        const fetchedStories = await getAllStories();
        setStories(fetchedStories);
      } catch (err) {
        console.error('Error fetching stories:', err);
      }
    };
    fetchStories();
  }, []);

  const groupedStories = useMemo(() => {
    const groups = {};
    stories.forEach((story) => {
      const key = `${story.lat},${story.lng}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(story);
    });
    return groups;
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (!searchQuery) return stories;
    const query = searchQuery.toLowerCase();
    return stories.filter(story =>
      story.title.toLowerCase().includes(query) ||
      story.description.toLowerCase().includes(query)
    );
  }, [stories, searchQuery]);

  const handleAddStory = () => {
    setIsCreatingStory(true);
    setTempMarker(null);
    setSelectedLocation(null);
    setSelectedStoryIds([]);
    setIsSidebarOpen(true);
  };

  const handleCancelAddStory = () => {
    setIsCreatingStory(false);
    setTempMarker(null);
  };

  const handleMapClick = useCallback((location) => {
    if (!isCreatingStory) return;
    setTempMarker(location);
    setSelectedLocation(location);
  }, [isCreatingStory]);

  const handleMarkerClick = (lat, lng) => {
    const key = `${lat},${lng}`;
    const locationStories = groupedStories[key] || [];

    if (isCreatingStory) {
      setTempMarker({ lat, lng });
      setSelectedLocation({ lat, lng });
    } else {
      setHighlightedMarkerId(key);
      setSelectedLocation({ lat, lng });
      setSelectedStoryIds(locationStories.map(story => story.id));
      setIsSidebarOpen(true);
    }
  };

  const handleSaveStory = async (storyData) => {
    try {
      const savedStory = await createStory(storyData);
      setStories(prev => [...prev, savedStory]);

      const key = `${storyData.lat},${storyData.lng}`;
      const locationStories = groupedStories[key] || [];
      setSelectedStoryIds([...locationStories.map(s => s.id), savedStory.id]);
      setSelectedLocation({ lat: storyData.lat, lng: storyData.lng });
      setIsCreatingStory(false);
      setTempMarker(null);
    } catch (err) {
      console.error('Error saving story:', err);
    }
  };

  const handleDeleteStory = async (storyId) => {
    try {
      await deleteStory(storyId);
      setStories(prev => prev.filter(story => story.id !== storyId));
      setSelectedStoryIds(prev => prev.filter(id => id !== storyId));
    } catch (err) {
      console.error('Error deleting story:', err);
    }
  };

  const handleStoryClick = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      setHighlightedMarkerId(`${story.lat},${story.lng}`);
      setSelectedStoryIds([storyId]);
      setIsSidebarOpen(true);
      setSelectedLocation({ lat: story.lat, lng: story.lng });
      setTempMarker(null);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setHighlightedMarkerId(null);
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">StoryMap</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={isCreatingStory ? handleCancelAddStory : handleAddStory}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-colors
                ${isCreatingStory 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
            >
              {isCreatingStory ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Story</span>
                </>
              )}
            </button>
            
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <MapIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <List className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          <Map
            markers={Object.keys(groupedStories).map(key => {
              const [lat, lng] = key.split(',').map(Number);
              return {
                id: key,
                lat,
                lng,
                stories: groupedStories[key],
              };
            })}
            tempMarker={tempMarker}
            highlightedMarkerId={highlightedMarkerId}
            onMapClick={handleMapClick}
            onMarkerClick={(lat, lng) => handleMarkerClick(lat, lng)}
          />
        </div>

        {isSidebarOpen && (
          <div className="w-full max-w-md border-l border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search stories..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Locations</h2>
              <ul className="space-y-2">
                {Object.keys(groupedStories).map((key) => {
                  const [lat, lng] = key.split(',').map(Number);
                  const locationLabel = `${lat.toFixed(3)}, ${lng.toFixed(3)}`;
                  return (
                    <li key={key}>
                      <button
                        onClick={() => {
                          handleMarkerClick(lat, lng);
                          setSearchQuery('');
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        {locationLabel}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex-1 overflow-auto">
              {isCreatingStory ? (
                selectedLocation ? (
                  <div className="p-4">
                    <StoryForm
                      location={selectedLocation}
                      onSave={handleSaveStory}
                      onCancel={handleCancelAddStory}
                    />
                  </div>
                ) : (
                  <p className="p-4 text-gray-500">
                    Click on the map to select a location for your story.
                  </p>
                )
              ) : (
                <StoryList
                  stories={filteredStories.filter(story =>
                    selectedStoryIds.length === 0 || selectedStoryIds.includes(story.id)
                  )}
                  onDelete={handleDeleteStory}
                  onStoryClick={handleStoryClick}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
