const fs = require('fs/promises');
const storyService = require('../services/storyService');

class StoryController {
  async getAllStories(req, res, next) {
    try {
      const stories = await storyService.getAllStories();
      res.json(stories);
    } catch (error) {
      next(error);
    }
  }
  async createStory(req, res, next) {
    try {
      console.log('Request Body:', req.body);
      console.log('Uploaded File:', req.file);

      const { title, description, lat, lng } = req.body;
      let imageBuffer = null;

      if (req.file) {
        imageBuffer = await fs.readFile(req.file.path);
      }

      const story = await storyService.createStory({
        title,
        description,
        image: imageBuffer,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        timestamp: new Date(),
      });

      if (req.file) await fs.unlink(req.file.path);

      res.status(201).json(story);
    } catch (error) {
      console.error('Error creating story:', error);
      next(error);
    }
  }

  async getStoryImage(req, res, next) {
    try {
      const { id } = req.params;
      const story = await storyService.getStoryById(id);

      if (!story || !story.image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      res.set('Content-Type', 'image/jpeg');
      res.send(story.image);
    } catch (error) {
      next(error);
    }
  }

  async deleteStory(req, res, next) {
    try {
      const { id } = req.params;
      await storyService.deleteStory(id);
      res.json({ message: 'Story deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StoryController();
