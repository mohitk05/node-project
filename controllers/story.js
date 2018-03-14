var TreeNode = require('../models/treenodemodel');

var queue = {
  q: [],
  enqueue: function(obj){
    this.q.push(obj);
  },
  dequeue: function(){
    var obj = this.q[0];
    this.q.slice(1);
    return obj;
  },
  isEmpty: function(){
    return !this.q.length;
  }
}

exports.insertNode = function(story, parent, node){
  var curr_node = story.headNode;
  console.log(curr_node);
  searchFor(curr_node, parent, node);
}

var searchFor = function(cn, parent, node){
  if(cn._id === parent._id){
    saveToMongo(cn, node);
    return true;
  } else{
    TreeNode.findOne({"_id": parent.id}).exec((err, c_node) => {
      c_node.children.forEach((child) => {
        queue.enqueue(child);
      })
      searchFor(queue.dequeue(), parent, node);
      return;
    });
  }
}

var saveToMongo = function(cn, node){
  TreeNode.update({'_id':cn._id}, {$push: {children: node}}, function(err, updated_parent){console.log('Update successfull');});
}
