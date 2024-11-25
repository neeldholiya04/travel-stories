const Story = require('../models/story');

class StoryService {
  async getAllStories() {
    return await Story.findAll({ attributes: { exclude: ['image'] } });
  }

  async getStoryById(id) {
    return await Story.findByPk(id);
  }

  async createStory(data) {
    return await Story.create(data);
  }

  async deleteStory(id) {
    const story = await Story.findByPk(id);
    if (!story) throw new Error('Story not found');
    await story.destroy();
    return story;
  }
}

module.exports = new StoryService();
