const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema(
  {
    storyTitle: String,
    headNode: {type: Schema.ObjectId, ref: 'TreeNode', required: true}
  }
);

module.exports = mongoose.model('Story', StorySchema);
