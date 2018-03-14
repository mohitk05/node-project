var TreeNode = require('../models/treenodemodel');

//Index page
exports.index = function(req, res){
  res.send('Main page');
}

//Add a node POST
exports.add_node_post = function(req, res){
  TreeNode.findOne({"_id":req.body.parentId})
    .exec((err, node_parent) => {
      if(err) throw err;
      var new_node = new TreeNode({data: {title: '', body: req.body.body}, children: [], parent: req.body.parentId, depth: node_parent.depth+1,version: node_parent.children.length, storyId: node_parent.storyId});
      new_node.save(function(err, new_node){
        if(err) throw err;
        TreeNode.update({"_id": req.body.parentId}, {$push: {children: new_node}}, function(err, updated_parent){
          res.send(new_node);
        });
    })
  });
}

//Get all nodes
exports.get_all_nodes = function(req, res){
  TreeNode
    .find()
    .exec(function(err, nodes){
      if(err) throw err;
      res.send(nodes);
    })
}

//Get a node
exports.get_node = function(req, res){
  TreeNode
    .findOne({'_id': req.params.id})
    .exec(function(err, node){
      if(err) throw err;
      res.send(node);
  });
}

//Update a node POST
exports.update_node_post = function(req, res){
  TreeNode.update({"_id":req.body.nodeId},{"data.body":req.body.newBody}, (err) => {
    if(err) throw err;
    TreeNode.findOne({"_id":req.body.nodeId}).exec((err, node) => {res.send(node);});
  })
}

//Delete a node POST
exports.delete_node_post = function(req, res){
  res.send('Deletes a node on POST');
}
