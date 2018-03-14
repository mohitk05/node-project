const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StorySchema = require('./storymodel');

const TreeNodeSchema = new Schema(
  {
    data: {title: String, body: String},
    children: {type: [Schema.ObjectId], ref: 'TreeNodeSchema'},
    parent: {type: Schema.ObjectId, ref: 'TreeNodeSchema'},
    depth: {type: Number},
    version: {type: Number},
    storyId: {type: Schema.ObjectId, ref: 'StorySchema'}
  }
);

//export model
module.exports = mongoose.model('TreeNode', TreeNodeSchema);
