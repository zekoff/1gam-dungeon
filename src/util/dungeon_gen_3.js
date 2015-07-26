var print = print || console.log.bind(console);

/*
Constraints:
* Dungeon height and width must be powers of 2.
* Dungeon width must be >= dungeon height. (Well, I guess it doesn't have to be,
but you'll get weird results otherwise.)
*/
var DUNGEON_WIDTH = 64;
var DUNGEON_HEIGHT = 32;
var SPLIT_LOCATION_MIN = 0.25;
var SPLIT_LOCATION_MAX = 0.75;
var RECURSION_LEVEL = 3;
var ROOM_SIZE_MIN = 5;
var ROOM_SIZE_MAX = 20;

var randomFloatBetween = function(min, max) {
    return Math.random() * (max - min) + min;
};

var randomIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var pickFromArray = function(array) {
    return array[randomIntBetween(0, array.length - 1)];
};

var clonePoint = function(point) {
    return {
        x: point.x,
        y: point.y
    };
};

var Room = function() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.sides = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
};

var TreeNode = function(parent, childSide) {
    if (!parent) {
        this.parent = null;
        this.xOffset = 0;
        this.yOffset = 0;
        this.width = DUNGEON_WIDTH;
        this.height = DUNGEON_HEIGHT;
        this.childSide = null;
    }
    else {
        this.parent = parent;
        this.childSide = childSide;
        if (childSide === this.CHILD_LEFT) {
            this.xOffset = parent.xOffset;
            this.yOffset = parent.yOffset;
            this.width = parent.splitType === this.SPLIT_HORIZONTAL ?
                parent.width : Math.floor(parent.width * parent.splitLocation);
            this.height = parent.splitType === this.SPLIT_VERTICAL ?
                parent.height : Math.floor(parent.height * parent.splitLocation);
        }
        else {
            this.xOffset = parent.splitType === this.SPLIT_HORIZONTAL ?
                parent.xOffset : Math.floor(parent.width * parent.splitLocation) + parent.xOffset;
            this.yOffset = parent.splitType === this.SPLIT_VERTICAL ?
                parent.yOffset : Math.floor(parent.height * parent.splitLocation) + parent.yOffset;
            this.width = parent.splitType === this.SPLIT_HORIZONTAL ?
                parent.width : Math.floor(parent.width * (1 - parent.splitLocation));
            this.height = parent.splitType === this.SPLIT_VERTICAL ?
                parent.height : Math.floor(parent.height * (1 - parent.splitLocation));
        }
    }
};
TreeNode.prototype = {};
TreeNode.prototype.SPLIT_HORIZONTAL = 'horizontal';
TreeNode.prototype.SPLIT_VERTICAL = 'vertical';
TreeNode.prototype.CHILD_LEFT = 'left/upper';
TreeNode.prototype.CHILD_RIGHT = 'right/lower';
TreeNode.prototype.createChildren = function(depth) {
    if (depth < 1)
        return this.createRoom();
    if (!this.parent) this.splitType = this.SPLIT_VERTICAL;
    else
        this.splitType = this.parent.splitType === this.SPLIT_HORIZONTAL ?
        this.SPLIT_VERTICAL : this.SPLIT_HORIZONTAL;
    this.splitLocation = randomFloatBetween(SPLIT_LOCATION_MIN, SPLIT_LOCATION_MAX);
    this.leftChild = new TreeNode(this, this.CHILD_LEFT);
    this.rightChild = new TreeNode(this, this.CHILD_RIGHT);
    this.leftChild.createChildren(depth - 1);
    this.rightChild.createChildren(depth - 1);
};
TreeNode.prototype.createRoom = function() {
    var room = new Room;
    room.width = randomIntBetween(ROOM_SIZE_MIN, Math.min(ROOM_SIZE_MAX, this.width - 1));
    room.height = randomIntBetween(ROOM_SIZE_MIN, Math.min(ROOM_SIZE_MAX, this.height - 1));
    room.x = this.xOffset + 1 + randomIntBetween(0, this.width - room.width - 1);
    room.y = this.yOffset + 1 + randomIntBetween(0, this.height - room.height - 1);
    this.room = room;
    return room;
};
TreeNode.prototype.connectRooms = function() {
    if (this.room) return;
    this.leftChild.connectRooms();
    this.rightChild.connectRooms();
    var leftRoom = pickFromArray(this.leftChild.getRooms());
    var rightRoom = pickFromArray(this.rightChild.getRooms());
    this.hallway = [];
    this.leftTerminus = null;
    this.rightTerminus = null;
    if (this.splitType === this.SPLIT_HORIZONTAL) {
        this.leftTerminus = {
            x: leftRoom.x + leftRoom.width,
            y: Math.floor(leftRoom.y + leftRoom.height / 2)
        };
        this.rightTerminus = {
            x: rightRoom.x,
            y: Math.floor(rightRoom.y + rightRoom.height - 2)
        };
    }
    else {
        this.leftTerminus = {
            x: Math.floor(leftRoom.x + leftRoom.width / 2),
            y: leftRoom.y + leftRoom.height
        };
        this.rightTerminus = {
            x: Math.floor(rightRoom.x + rightRoom.width / 2),
            y: rightRoom.y
        };
    }
    var nextPoint = clonePoint(this.leftTerminus);
    var distance;
    while (nextPoint.x !== this.rightTerminus.x) {
        distance = this.rightTerminus.x - nextPoint.x;
        nextPoint.x += distance / Math.abs(distance);
        this.hallway.push(clonePoint(nextPoint));
    }
    while (nextPoint.y !== this.rightTerminus.y) {
        distance = this.rightTerminus.y - nextPoint.y;
        nextPoint.y += distance / Math.abs(distance);
        this.hallway.push(clonePoint(nextPoint));
    }
};
TreeNode.prototype.createMap = function() {
    var map = [];
    for (var i = 0; i < this.width; i++) {
        map[i] = [];
        for (var j = 0; j < this.height; j++)
            map[i].push(0);
    }
    this.getRooms().forEach(function(room) {
        for (var cellX = room.x; cellX < room.width + room.x; cellX++)
            for (var cellY = room.y; cellY < room.height + room.y; cellY++)
                map[cellX][cellY] = 1;
    });
    this.getHallways([]).forEach(function(hallway) {
        hallway.forEach(function(point) {
            // if (map[point.x][point.y] === "0") return;
            map[point.x][point.y] = 1;
        });
    });
    return map;
};
TreeNode.prototype.getRooms = function() {
    if (this.room) return [this.room];
    else {
        var rooms = [];
        this.leftChild.getRooms().forEach(function(room) {
            rooms.push(room);
        });
        this.rightChild.getRooms().forEach(function(room) {
            rooms.push(room);
        });
        return rooms;
    }
};
TreeNode.prototype.getHallways = function(hallways) {
    if (!this.hallway) return;
    hallways.push(this.hallway);
    this.leftChild.getHallways(hallways);
    this.rightChild.getHallways(hallways);
    return hallways;
};
TreeNode.prototype.buildWalls = function(map) {
    var i, j;
    for (i = 0; i < map.length; i++) {
        map[i].unshift(0);
        map[i].push(0);
    }
    map.unshift([]);
    for (i = 0; i < DUNGEON_WIDTH + 2; i++) map[0].push(0);
    map.push([]);
    for (i = 0; i < DUNGEON_WIDTH + 2; i++) map[0].push(0);
    var buildWallIfEmpty = function(x, y) {
        try {
            if (map[x][y] === 0) map[x][y] = 2;
        }
        catch (e) {}
    };
    for (i = 0; i < map.length; i++)
        for (j = 0; j < map[0].length; j++)
            if (map[i][j] === 1)
                [i - 1, i, i + 1].forEach(function(m) {
                    [j - 1, j, j + 1].forEach(function(n) {
                        buildWallIfEmpty(m, n);
                    });
                });
};

var Dungeon = function() {
    this.tree = new TreeNode;
    this.tree.createChildren(RECURSION_LEVEL);
    this.tree.connectRooms();
    this.map = this.tree.createMap();
    this.tree.buildWalls(this.map);
    this.rooms = this.tree.getRooms();
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
/*
Get the room containing this entity, given x/y values in tiles.
*/
Dungeon.prototype.getContainingRoom = function(x, y) {
    var room;
    for (var i = 0; i < this.rooms.length; i++) {
        room = this.rooms[i];
        if (x >= room.x && x < room.x + room.width && y >= room.y && y < room.y + room.height)
            return i;
    }
    return -1;
};

/*
Get the room containing this entity, given x/y values in pixels.
*/
Dungeon.prototype.getContainingRoomPixels = function(x, y) {
    return this.getContainingRoom(Math.floor(x / 32), Math.floor(y / 32));
};

/*
Pick a random tile inside the given room and return its x/y location in tiles.
*/
Dungeon.prototype.pickRandomTileInRoom = function(roomNumber) {
    var room = this.rooms[roomNumber];
    return {
        x: randomIntBetween(room.x + 1, room.x + room.width - 1),
        y: randomIntBetween(room.y + 1, room.y + room.height - 1)
    };
};

if (typeof module !== 'undefined')
    module.exports = Dungeon;