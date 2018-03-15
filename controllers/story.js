exports.sortStory = function(storyArray){
  //console.log(storyArray);
  var versions = {};
  var stack = [];
  var root = storyArray[0];
  //console.log(storyArray.find(el => el._id.toString() === root._id.toString()));
  var current_node = root;
  stack.push(current_node._id);
  recursiveDFS(storyArray.slice(), versions, stack, current_node._id,1);
  return versions;
}

var recursiveDFS = function(arr, versions, stack, cnode, iter){
  var terminate = false;
  var node = getNodeFromId(arr, cnode);
  //console.log('Node from id:',node);
  while(node.children.length>0 && !terminate){
    stack.push(node.children.shift());
    if(versions[iter] === undefined){versions[iter] = arr[0]._id}
    versions[iter] += '$' + stack[stack.length-1];
    node = getNodeFromId(arr, stack[stack.length-1]);
  }
  stack.pop();
  //console.log('Outside while');
  if(stack.length === 0){
    terminate = true;
    return;
  } else{
    iter = iter + 1;
    recursiveDFS(arr, versions, stack, stack.slice(stack.length-1,stack.length)[0], iter);
  }

}

var getNodeFromId = function(arr, id){
  //console.log(arr, id);
  return arr.find((obj) => obj._id.toString() === id.toString());
}
