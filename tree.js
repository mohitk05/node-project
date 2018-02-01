var TreeNode = function(data){
  this.data = data;
  this.children = [];
}

var Tree = function(){
  this.root = null;
}

Tree.prototype.add = function(data, toNodeData){
  var isUniqueChild = true;
  var node = new TreeNode(data);
  var parent = toNodeData ? this.findNode(toNodeData) : null;
  //console.log(parent);
  if(parent){
    for(i = 0; i<parent.children.length;i++){
      if(node.data === parent.children[i].data){
        isUniqueChild = false;
      }
    }
    if(isUniqueChild){
      parent.children.push(node);
      return true;
    } else {
      console.log('Child already exists!');
      return false;
    }
  } else {
    if(!this.root) {
      this.root = node;
      return true;
    } else {
      console.log('Error');
      return false;
    }
  }
}

Tree.prototype.findNode = function(data){
  var queue = [this.root];
  while(queue.length) {
    console.log(queue)
    var node = queue.shift();
    if(node.data === data) {
      return node;
    }
    for(var i = 0; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
  return null;
}

module.exports = {
  TreeNode : TreeNode,
  Tree : Tree,
  add : Tree.prototype.add,
  findNode : Tree.prototype.findNode
}
