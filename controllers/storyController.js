var Story = require('../models/storymodel');
var TreeNode = require('../models/treenodemodel');
var storyStruc =  require('./story.js');

exports.create_story_post = async function(req, res, next){
  try{
    const new_head_node = new TreeNode({data: {title: '', body: req.body.body}, children: [], parent: null, storyId: null, depth: 0, version: 0});
    const new_start_node = await new_head_node.save();
    const new_story = new Story({storyTitle: req.body.storyTitle, headNode: new_start_node._id});
    const story = await new_story.save();
    await TreeNode.update({"_id":new_start_node._id}, {"storyId": story._id});
    res.send(story);
  } catch(err){
    next(err);
  }
}

exports.get_story = async function(req, res, next){
  try{
    const result = await TreeNode.find({"storyId":req.params.id}).sort({"depth":1,"version":1}).exec();
    var obj = storyStruc.sortStory(result);
    obj.all = result;
    res.send(obj);
  } catch(err){
    console.log(err);
    next(err);
  }
}

exports.get_all_stories = async function(req, res, next){
  try{
    const stories = await Story.find().exec();
    res.send(stories);
  } catch(err){
    next(err);
  }
}
