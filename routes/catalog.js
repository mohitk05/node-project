var express = require('express');
var router = express.Router();

var nodeController = require('../controllers/nodeController');
var storyController = require('../controllers/storyController');


//Node routes
router.post('/node/add', nodeController.add_node_post);
router.get('/', nodeController.index);
router.get('/node/', nodeController.get_all_nodes);
router.get('/node/:id', nodeController.get_node);
router.post('/node/:id/update', nodeController.update_node_post);
router.post('/node/:id/delete', nodeController.delete_node_post);
//router.get('/node/:id/deleteAll', nodeController.delete_all);


//Story routes
router.post('/story/create', storyController.create_story_post);
//router.post('/story/create', storyController.create_story_post);
router.get('/story/:id', storyController.get_story);
router.get('/story/', storyController.get_all_stories);

module.exports = router;
