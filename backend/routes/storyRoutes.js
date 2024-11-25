const express = require('express');
const multer = require('multer');
const storyController = require('../controllers/storyController');

const router = express.Router();

const upload = multer({
  dest: './uploads',
  limits: {
    fileSize: 5 * 1024 * 1024,
    fieldSize: 5 * 1024 * 1024,
  },
});

router.get('/', storyController.getAllStories);
router.post('/', upload.single('image'), storyController.createStory);
router.get('/:id/image', storyController.getStoryImage);
router.delete('/:id', storyController.deleteStory);

module.exports = router;
