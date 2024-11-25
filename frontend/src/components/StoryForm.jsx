import React, { useState } from 'react';

export default function StoryForm({ location, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!image) {
      setError('Image is required');
      return false;
    }
    if (!location || !location.lat || !location.lng) {
      setError('Please select a valid location.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Submitting Form:');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Location:', location);
    console.log('Image:', image);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('lat', location.lat);
      formData.append('lng', location.lng);
      if (image) {
        formData.append('image', image);
      }
      onSave(formData);
    } catch (err) {
      setError('Failed to save story. Please try again.');
      console.error('Error during submission:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
          placeholder="Enter a title for your story"
          maxLength={100}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
          rows={3}
          disabled={isSubmitting}
          placeholder="Tell your story about this place..."
          maxLength={500}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
            } else {
              setError('Please select a valid file');
            }
          }}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm 
            text-sm font-medium text-gray-700 hover:bg-gray-50 
            disabled:opacity-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm 
            text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin -ml-1 mr-2 h-4 w-4 text-white">
                ⚪
              </div>
              Saving...
            </>
          ) : (
            'Save Story'
          )}
        </button>
      </div>
    </form>
  );
}
