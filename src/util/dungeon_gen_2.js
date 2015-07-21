var print = print || console.log.bind(console);

var DUNGEON_WIDTH = 128; // tiles
var DUNGEON_HEIGHT = 64; // tiles
var RECURSION_LEVEL = 4;
var SPLIT_LOCATION_MIN = 0.3;
var SPLIT_LOCATION_MAX = 0.7;

var randomFloatBetween = function(min, max) {
    return Math.random() * (max - min) + min;
};

var Room = function() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
};

/*
A node in the Binary Space Partioned tree. If `parent` param is null at creation,
assume this is the tree root and set up defaults.
@param parent the parent node
@param splitLocation where the split between sub-nodes in the parent occurred, between 0 and 1
@param splitType a string, either 'vertical' or 'horizontal'
*/
var TreeNode = function(parent, splitLocation, splitType) {
    this.parent = parent;
    this.splitType = splitType;
    this.leftChild = null;
    this.rightChild = null;
    this.xOffset = 0;
    this.yOffset = 0;
    if (!parent) {
        this.width = DUNGEON_WIDTH;
        this.height = DUNGEON_HEIGHT;
        this.splitType = this.SPLIT_HORIZONTAL;
    }
    else {
        this.width = Math.floor(parent.width *
            (splitType === TreeNode.SPLIT_VERTICAL ? splitLocation : 1));
        this.height = Math.floor(parent.height *
            (splitType === TreeNode.SPLIT_HORIZONTAL ? splitLocation : 1));
        // set xOffset
        // set yOffset
    }
    this.room = null;
};
TreeNode.prototype = {};
TreeNode.prototype.SPLIT_VERTICAL = 'vertical';
TreeNode.prototype.SPLIT_HORIZONTAL = 'horizontal';
TreeNode.prototype.createChildren = function(recursionDepth) {
    if (recursionDepth === 0) {
        this.createLeafRoom();
        return;
    }
    var splitLocation = randomFloatBetween(SPLIT_LOCATION_MIN, SPLIT_LOCATION_MAX);
    var splitType = this.splitType === TreeNode.SPLIT_HORIZONTAL ?
        TreeNode.SPLIT_VERTICAL : TreeNode.SPLIT_HORIZONTAL;
    this.leftChild = new TreeNode(this, splitLocation, splitType);
    this.rightChild = new TreeNode(this, splitLocation, splitType);
    this.leftChild.createChildren(recursionDepth - 1);
    this.rightChild.createChildren(recursionDepth - 1);
};
TreeNode.prototype.createLeafRoom = function() {
    print('leaf room');
};

var Dungeon = function() {
    this.rooms = [];
    this.map = [];
    var temp;
    for (var i = 0; i < DUNGEON_WIDTH; i++) {
        temp = [];
        for (var j = 0; j < DUNGEON_HEIGHT; j++)
            temp.push(0);
        this.map.push(temp);
    }
    this.tree = new TreeNode;
    this.tree.createChildren(RECURSION_LEVEL);
};
Dungeon.prototype = {};
Dungeon.prototype.prettyPrint = function() {
    var line;
    for (var y = 0; y < DUNGEON_HEIGHT; y++) {
        line = "";
        for (var x = 0; x < DUNGEON_WIDTH; x++)
            line += this.map[x][y].toString();
        print(line);
    }
};

module.exports = Dungeon;