var Story = require('../models/storymodel');
var TreeNode = require('../models/treenodemodel');
var storyStruc =  require('./story.js');

exports.create_story_post = function(req, res){
  var new_head_node = new TreeNode({data: {title: '', body: req.body.body}, children: [], parent: null, storyId: null, depth: 0, version: 0});
  new_head_node.save(function(err, new_start_node){
    if(err) {throw err;}
    var new_story = new Story({storyTitle: req.body.storyTitle, headNode: new_start_node._id});
    new_story.save(function(err, story){
      if(err) {throw err;}
      TreeNode.update({"_id":new_start_node._id}, {"storyId": story._id}, (err, updated_story) => {
        if(err) throw err;
        res.send(story);
      });
    })
  });
}

exports.get_story = function(req, res){
  TreeNode.find({"storyId":req.params.id}).sort({"depth":1,"version":1})
    .exec((err, result) => {
      res.send(storyStruc.sortStory(result));
    })
}

exports.get_all_stories = function(req, res){
  Story.find().exec((err, stories) => {
    if(err) throw err;
    res.send(stories);
  });
}
