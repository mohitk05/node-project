# node-project
#### Experimenting with trees.
Link to live app: https://node-contribute.herokuapp.com

Data models:
* TreeNode: It is the most elementary structure of a tree. It contains the node data and pointers to its children. Here a TreeNode has:
    * data: title, body
    * children: [array of referrences to child nodes]
    * headNode: referrence to the head node.

* Story: This is a presentational structure and is basically a whole tree. Eventually it contains a head-node only. Head-node then has its children and they have their children and so on, forming a story. Structure of story model is as:
    * storyTitle: the story title
    * headNode: referrence to the head-node of the story.

* User: To be decided.

### Routes
Following routes can be used with https://node-contribute.herokuapp.com/catalog to perform various operations.
* Create a story: /story/create?body={Story Body}&storyTitle={Story title} (must be always performed first as node creation requires a parent to be present)
* View a story: /story/{Story title}
* Add a node: /node/add?body={Node body}&parent={this node's parent}
* View a node: /node/{node body}
* View all stories: /story
* View all nodes: /node