const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreeNodes = require('./treenodemodel');
const UserSchema = new Schema(
  {
    username: {type: String, required: true, max: 20},
    password: {type: String, required: true, max: 20, min: 8},
    nodes: {type: Schema.ObjectId, ref: TreeNode}
  }
);

module.exports = mongoose.model('User', UserSchema);
