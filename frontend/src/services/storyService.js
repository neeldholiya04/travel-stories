import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllStories = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createStory = async (formData) => {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  
export const deleteStory = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getStoryImage = (id) => `${API_BASE_URL}/${id}/image`;
