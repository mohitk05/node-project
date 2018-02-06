var TreeNode = require('../models/treenodemodel');

//Index page
exports.index = function(req, res){
  res.send('Main page');
}

//Add a node GET
exports.add_node_get = function(req, res){
  console.log(req.query);

  var new_node = new TreeNode({data: {title: '', body: req.query.body}, children: [], headNode: req.query.headnode});
  new_node.save(function(err, new_node){
    if(err) throw err;
    if(req.query.parent != null){
      TreeNode.update({'data.body': req.query.parent}, {$push: {children: new_node}}, function(err, updated_parent){});
    }
    res.send(new_node);
  });
  //res.send('Adds a node on GET');
}

//Add a node POST
exports.add_node_post = function(req, res){
  exports.add_node_get(req, res);
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
  console.log('in get');
  TreeNode
    .findOne({'_id': req.params.id})
    .exec(function(err, node){
    if(err) {return next(err);}
    res.send(node);
  });
}

//Update a node GET
exports.update_node_get = function(req, res){
  res.send('Updates a node on GET');
}

//Update a node POST
exports.update_node_post = function(req, res){
  res.send('Updates a node on POST');
}

//Delete a node GET
exports.delete_node_get = function(req, res){
  TreeNode
    .find({'data' : 'Birds'})
    .remove()
    .exec(function(err){
      if(err) throw err;
      console.log("removed");
      res.redirect('/catalog/node/');
    })
  //res.send('Deletes a node on GET');
}

//Delete a node POST
exports.delete_node_post = function(req, res){
  res.send('Deletes a node on POST');
}
