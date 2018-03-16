var TreeNode = require('../models/treenodemodel');

//Index page
exports.index = function(req, res){
  res.send('Main page');
}

//Add a node POST
exports.add_node_post = async function(req, res, next){
  try{
    const node_parent = await TreeNode.findOne({'_id':req.body.parentId}).exec();
    const new_node = new TreeNode({data: {title: '', body: req.body.body}, children: [], parent: req.body.parentId, depth: node_parent.depth+1,version: node_parent.children.length, storyId: node_parent.storyId});
    const saved_node = await new_node.save();
    await TreeNode.update({"_id": req.body.parentId}, {$push: {children: new_node}});
    res.send(saved_node);
  } catch(err){
    next(err);
  }
}

//Get all nodes
exports.get_all_nodes = async function(req, res, next){
  try{
    const nodes = await TreeNode.find().exec();
    res.send(nodes);
  } catch(err) {
    next(err);
  }
}

//Get a node
exports.get_node = async function(req, res, next){
  try{
    const node = await TreeNode.findOne({'_id': req.params.id}).exec();
    res.send(node);
  } catch(err){
    next(err);
  }
}

//Update a node POST
exports.update_node_post = async function(req, res){
  try{
    await TreeNode.update({"_id":req.body.nodeId},{"data.body":req.body.newBody});
    const updated_node = await TreeNode.findOne({"_id":req.body.nodeId}).exec();
    res.send(updated_node);
  } catch(err){
    next(err);
  }
}

//Delete a node POST
exports.delete_node_post = function(req, res){
  res.send('Deletes a node on POST');
}
