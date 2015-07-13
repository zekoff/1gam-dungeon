/* global game, Phaser */

var Dungeon = function() {
    this.map = null;
    this.map_size = 64;
    this.rooms = [];
};
Dungeon.prototype = {};

var Room = function() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.connectedRooms = [];
};

Dungeon.prototype.generate = function() {
    console.log('generating dungeon');
    // Init map as 2D array filled with 0s
    this.map = [];
    for (var x = 0; x < this.map_size; x++) {
        this.map[x] = [];
        for (var y = 0; y < this.map_size; y++) {
            this.map[x][y] = 0;
        }
    }

    var room_count = game.rnd.between(10, 20);
    var min_size = 5;
    var max_size = 15;

    for (var i = 0; i < room_count; i++) {
        var room = new Room();

        room.x = game.rnd.between(1, this.map_size - max_size - 1);
        room.y = game.rnd.between(1, this.map_size - max_size - 1);
        room.w = game.rnd.between(min_size, max_size);
        room.h = game.rnd.between(min_size, max_size);

        if (this.doesCollide(room)) {
            i--;
            continue;
        }
        room.w--;
        room.h--;

        this.rooms.push(room);
    }

    // this.squashRooms();

    var pointA, pointB;
    for (i = 1; i < room_count; i++) {
        var roomA = this.rooms[i];
        var roomB = game.rnd.pick(this.rooms.slice(0, i));
        // then, go back and ensure first room is connected

        pointA = {
            x: game.rnd.between(roomA.x, roomA.x + roomA.w),
            y: game.rnd.between(roomA.y, roomA.y + roomA.h)
        };
        pointB = {
            x: game.rnd.between(roomB.x, roomB.x + roomB.w),
            y: game.rnd.between(roomB.y, roomB.y + roomB.h)
        };

        while ((pointB.x != pointA.x) || (pointB.y != pointA.y)) {
            if (pointB.x != pointA.x) {
                if (pointB.x > pointA.x) pointB.x--;
                else pointB.x++;
            }
            else if (pointB.y != pointA.y) {
                if (pointB.y > pointA.y) pointB.y--;
                else pointB.y++;
            }
            // break loop early if laying ground on existing ground
            this.map[pointB.x][pointB.y] = 1;
        }
    }

    for (i = 0; i < room_count; i++) {
        room = this.rooms[i];
        for (var x = room.x; x < room.x + room.w; x++) {
            for (var y = room.y; y < room.y + room.h; y++) {
                this.map[x][y] = 1;
            }
        }
    }

    for (var x = 0; x < this.map_size; x++) {
        for (var y = 0; y < this.map_size; y++) {
            if (this.map[x][y] == 1) {
                for (var xx = x - 1; xx <= x + 1; xx++) {
                    for (var yy = y - 1; yy <= y + 1; yy++) {
                        if (this.map[xx][yy] == 0) this.map[xx][yy] = 2;
                    }
                }
            }
        }
    }
    console.log('finished generating');
};
Dungeon.prototype.findClosestRoom = function(room) {
    var mid = {
        x: room.x + (room.w / 2),
        y: room.y + (room.h / 2)
    };
    var closest = null;
    var closest_distance = 1000;
    for (var i = 0; i < this.rooms.length; i++) {
        var check = this.rooms[i];
        if (check == room) continue;
        var check_mid = {
            x: check.x + (check.w / 2),
            y: check.y + (check.h / 2)
        };
        var distance = Math.min(Math.abs(mid.x - check_mid.x) - (room.w / 2) - (check.w / 2), Math.abs(mid.y - check_mid.y) - (room.h / 2) - (check.h / 2));
        if (distance < closest_distance) {
            closest_distance = distance;
            closest = check;
        }
    }
    return closest;
};
Dungeon.prototype.squashRooms = function() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < this.rooms.length; j++) {
            var room = this.rooms[j];
            while (true) {
                var old_position = {
                    x: room.x,
                    y: room.y
                };
                if (room.x > 1) room.x--;
                if (room.y > 1) room.y--;
                if ((room.x == 1) && (room.y == 1)) break;
                if (this.doesCollide(room, j)) {
                    room.x = old_position.x;
                    room.y = old_position.y;
                    break;
                }
            }
        }
    }
};
Dungeon.prototype.doesCollide = function(room, ignore) {
    for (var i = 0; i < this.rooms.length; i++) {
        if (i == ignore) continue;
        var check = this.rooms[i];
        if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) || (room.y + room.h < check.y) || (room.y > check.y + check.h))) return true;
    }
    return false;
};
Dungeon.prototype.getContainingRoom = function(x, y) {
    var room;
    for (var i = 0; i < this.rooms.length; i++) {
        room = this.rooms[i];
        if (x >= room.x && x < room.x + room.w && y >= room.y && y < room.y + room.h)
            return i;
    }
    return -1;
};
Dungeon.prototype.pickRandomTileInRoom = function(roomNumber) {
    var room = this.rooms[roomNumber];
    return new Phaser.Point(game.rnd.between(room.x + 1, room.x + room.w - 1),
        game.rnd.between(room.y + 1, room.y + room.h - 1));
};

module.exports = Dungeon;