const { NotImplementedError } = require("../lib/errors");
// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class NodeTree {
  constructor(data) {
    this.data = data;
  }
}

class BinarySearchTree {
  root() {
    if (this.rootTree) return this.rootTree;
    return null;
  }

  add(data) {
    if (!this.rootTree) {
      this.rootTree = new NodeTree(data);
      return;
    }
    addNode(new NodeTree(data), this.rootTree);
    function addNode(child, parent) {
      if (child.data < parent.data) {
        if (!parent.left) {
          parent.left = child;
          child.parent = parent;
        } else {
          addNode(child, parent.left);
        }
        return;
      } else {
        if (!parent.right) {
          parent.right = child;
          child.parent = parent;
        } else {
          addNode(child, parent.right);
        }
      }
    }
  }

  find(data) {
    let node = null;
    findNode(data, this.rootTree);
    function findNode(data, parent) {
      if (parent.data === data) {
        node = parent;
      } else if (data > parent.data) {
        if (parent.right) {
          findNode(data, parent.right);
        }
      } else if (data < parent.data) {
        if (parent.left) {
          findNode(data, parent.left);
        }
      }
    }
    return node;
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node.right.parent = node.parent;
          return node.right;
        }
        if (!node.right) {
          node.left.parent = node.parent;
          return node.left;
        }
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }

        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.rootTree) return null;
    let current = this.rootTree;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootTree) return null;
    let current = this.rootTree;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
