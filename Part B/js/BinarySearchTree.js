class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 26);
            let randomChar = String.fromCharCode('a'.charCodeAt() + randomNum);
            key += randomChar;
        }
        return key;
    }

    putNode(root, leaf) {
        if (root == null || leaf == null) {
            return false;
        }
        let current = root;
        while (true) {
            if (current.key > leaf.key) {
                if (current.left == null) {
                    current.left = leaf;
                    return true;
                }
                else {
                    current = current.left;
                }
            }
            else if (current.key < leaf.key) {
                if (current.right == null) {
                    current.right = leaf;
                    return true;
                }
                else {
                    current = current.right;
                }
            }
            else {
                current.data = leaf.data;
                return false;
            }
        }
    }
    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {
        if (this.root == null) {
            this.root = new Node(key, value, null, null, null);
            return;
        }
        if (this.putNode(this.root, new Node(key, value, null, null, null))) {
            this.size++;
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        if (this.root == null) {
            return null;
        }
        let current = this.root;
        while (current != null && current.key != key) {
            if (current.key > key) {
                current = current.left;
            } else if (current.key < key) {
                current = current.right;
            }
        }
        return current==null?null:current.data;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        if (this.root == null) {
            return;
        }
        if (this.root.key == key) {
            let t = this.root;
            if (this.root.left == null) {
                this.root = this.root.right;
            }
            else if (this.root.right == null) {
                this.root = this.root.left;
            }
            else {
                this.putNode(this.root.left, this.root.right);
                this.root = this.root.left;
            }
            this.size--;
        }
        let parent = this.root;
        let current = this.root;
        while (current != null && current.key != key) {
            if (current.key > key) {
                parent = current;
                current = current.left;
            }
            else if (current.key < key) {
                parent = current;
                current = current.right;
            }
        }
        if (current != null) {
            if (parent.left == current) {
                parent.left = null;
            } else {
                parent.right = null;
            }
            if (current.left == null) {
                this.putNode(parent, current.right);
            }
            else if (current.right == null) {
                this.putNode(parent, current.left);
            }
            else {
                this.putNode(parent, current.left);
                this.putNode(parent, current.right);
            }
            this.size--;
        }
    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}