var Story = require('../models/storymodel');
var TreeNode = require('../models/treenodemodel');


exports.create_story_get = function(req, res){
  var new_head_node = new TreeNode({data: {title: '', body: req.query.body}, children: [], headNode:null});
  new_head_node.save(function(err, node){
    if(err) {throw err;}
  });
  var new_story = new Story({storyTitle: req.query.storyTitle, headNode: new_head_node});
  new_story.save(function(err, story){
    if(err) {throw err;}
    res.send(story);
  })
}

exports.get_all_stories = function(req, res){
  Story
    .find()
    .exec(function(err, stories){
      if(err) throw err;
      res.send(stories);
    })
}

exports.get_story = function(req, res){
  Story
    .findOne({storyTitle: req.params.id})
    .exec(function(err, story){
      if(err) throw err;
       TreeNode
        .find({'_id': story.headNode})
        .exec(function(err, head_node){
          if(err) throw err;
          TreeNode
            .find({'headNode': head_node._id})
            .exec(function(err, nodes){
              if(err) throw err;
              res.send(nodes);
            })
          //console.log(headNode);
          //res.send(headNode);
        })
    })
}

exports.get_story_children = function(req, res){
  Story
    .findOne({storyTitle: req.params.id})
    .exec(function(err, story){
      //console.log(story);
      TreeNode
        .findOne({_id: story.headNode})
        .exec(function(err, head_node){
          if(err) throw err;
          res.send(head_node.children);
        })
    })
}
