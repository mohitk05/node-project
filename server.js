/*var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var TreeNode = require('./models/treenodemodel');
mongoose.connect('localhost:27017/data');
var app = express();
/*var myTree = require('./tree.js');


console.log(myTree.add);
var tree = new myTree.Tree();
tree.add('animals');
console.log(tree);*/

/*app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());


app.get('/', (req, res) => {
  TreeNode.find(function(err, nodes){
    if(err) throw err;
    res.send(nodes);
  });
});

app.get('/add', (req, res) => {
  TreeNode.create({data: 'Head', children: []}, function(err, nodes){
    if(err) throw err;
    res.send(nodes);
  });
});

app.get('/addnode', (req, res) => {

  TreeNode.create({data: 'Child1', children: []}, function(err, node){
    if(err) throw err;
    console.log(node);
    res.new_node = node;
  });

  TreeNode.find({data: 'Head'}, (err, node) => {
    if(err) throw err;
    res.head_node_children = node.children;
  });
  console.log(res.new_node, res.head_node_children);
  TreeNode.update({data: 'Head'}, {children: res.head_node_children.push(res.new_node._id)}, function(err, newnodes){
    res.send(newnodes);
  });
})*/
var app = require('./app');
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening on port 3000');
})
