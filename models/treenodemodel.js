const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreeNodeSchema = new Schema(
  {
    data: {title: String, body: String},
    children: {type: [Schema.ObjectId], ref: 'TreeNodeSchema'},
    headNode: {type: Schema.ObjectId, ref: 'TreeNodeSchema'}
  }
);

//export model
module.exports = mongoose.model('TreeNode', TreeNodeSchema);
