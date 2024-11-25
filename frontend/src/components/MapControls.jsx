import React, { useState } from 'react';
import { Map, Layers, Loader, Navigation } from 'lucide-react';

export default function MapControls({ onLocate, onStyleChange, onMarkerToggle, showMarkers }) {
  const [isLocating, setIsLocating] = useState(false);

  const handleLocate = async () => {
    setIsLocating(true);
    try {
      await onLocate();
    } finally {
      setIsLocating(false);
    }
  };

  const handleMarkersToggle = () => {
    onMarkerToggle(!showMarkers);
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2">
      <button
        onClick={handleLocate}
        className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        title="Find my location"
      >
        {isLocating ? (
          <Loader className="w-5 h-5 text-blue-600 animate-spin" />
        ) : (
          <Navigation className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <button
        onClick={handleMarkersToggle}
        className={`bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors ${
          showMarkers ? 'text-blue-600' : 'text-gray-600'
        }`}
        title={showMarkers ? 'Hide markers' : 'Show markers'}
      >
        <Layers className="w-5 h-5" />
      </button>
      <select
        onChange={(e) => onStyleChange(e.target.value)}
        className="bg-white px-3 py-2 rounded-lg shadow-lg hover:bg-gray-50 cursor-pointer text-gray-600 border-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="default">Default</option>
        <option value="night">Night Mode</option>
        <option value="retro">Retro</option>
        <option value="silver">Silver</option>
      </select>
    </div>
  );
}