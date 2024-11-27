import names from "./names.json";

export default class Maze {
  readonly rooms: Room[];
  readonly start: Room;

  #paths: Path[];
  #names: string[];
  #size: number;

  // The total number of names needs to be even,
  // otherwise we can't make a square.
  constructor() {
    this.#names = names;
    this.#size = Math.sqrt(this.#names.length);

    this.rooms = this.createRooms();
    this.start = randEl(this.rooms);

    this.addNeighbors();
    this.placeItems();

    // createPaths cannot be called before addNeighbors.
    this.#paths = this.createPaths();

    this.addPorts();
  }

  // Create rooms based on the total number of names. Rooms know their
  // neighbor's position, but they don't yet have references to said
  // neighboring rooms since not all rooms have been created yet.
  private createRooms(): Room[] {
    const rooms: Room[] = [];
    for (let y = 0; y < this.#size; y++) {
      for (let x = 0; x < this.#size; x++) {
        const position = x + y * this.#size;
        const name = this.#names[position];
        const neighbors = this.findNeighborsPosition(
          position,
          this.#size,
        );
        rooms.push(new Room(position, name, neighbors));
      }
    }
    return rooms;
  }

  // Return the position of a given room's neighbors.
  private findNeighborsPosition(room: number, size: number): number[] {
    const neighbors: number[] = [];

    // Rooms at the maze's boundary don't have neighbors on all sides.
    const hasLeft = room % size !== 0;
    const hasRight = room % size !== size - 1;
    const hasTop = room >= size;
    const hasBottom = room < size * (size - 1);

    if (hasLeft) neighbors.push(room - 1);
    if (hasRight) neighbors.push(room + 1);
    if (hasTop) neighbors.push(room - 4);
    if (hasBottom) neighbors.push(room + 4);

    return neighbors;
  }

  // Randomly places items in the maze.
  private placeItems(): void {
    let freeRooms = this.rooms.filter((r) => r !== this.start);
    const items = ["book", "potion", "wand"];

    for (const i of items) {
      randEl(freeRooms).item = i;
      freeRooms = freeRooms.filter((r) => !r.item);
    }
  }

  // Add references to neighboring rooms.
  private addNeighbors(): void {
    for (const room of this.rooms) {
      for (const position of room.neighborsPosition) {
        room.neighbors.push(this.rooms[position]);
      }
    }
  }

  // Create paths between rooms using a randomized Prim's algorithm.
  private createPaths(): Path[] {
    const start = randEl(this.rooms);
    const visited = [start];
    const perimeter = new Set(start.neighbors);
    const paths: Path[] = [];

    while (visited.length < this.rooms.length) {
      const next = randEl([...perimeter]);
      const visitedNeighbors = next.neighbors.filter((room) => {
        return visited.includes(room);
      });
      const p = new Path(randEl(visitedNeighbors), next);
      paths.push(p);
      visited.push(next);
      perimeter.delete(next);
      const unvisitedNeighbors = next.neighbors.filter((n) => {
        return !visited.includes(n);
      });
      for (const n of unvisitedNeighbors) perimeter.add(n);
    }

    return paths;
  }

  // Add ports to each room.
  private addPorts(): void {
    for (const path of this.#paths) {
      const [room1, room2] = path.endpoints;

      const port1 = new Door(room2, Door.findDirection(room1, room2));
      room1.doors.push(port1);

      const port2 = new Door(room1, Door.findDirection(room2, room1));
      room2.doors.push(port2);
    }
  }
}

export class Path {
  readonly endpoints: [Room, Room];

  constructor(r1: Room, r2: Room) {
    this.endpoints = [r1, r2];
  }
}

export class Door {
  toRoom: Room;
  direction: string;

  constructor(toRoom: Room, direction: string) {
    this.toRoom = toRoom;
    this.direction = direction;
  }

  static findDirection(
    from: Room,
    to: Room,
  ): "top" | "left" | "right" | "bottom" {
    if (to.position - from.position === 1) return "right";
    if (to.position - from.position === -1) return "left";
    if (to.position > from.position) return "bottom";
    return "top";
  }
}

export class Room {
  readonly name: string;

  doors: Door[] = [];
  item: string | null = null;

  #position: number;
  #neighbors: Room[] = [];
  #neighborsPosition: number[];

  constructor(position: number, name: string, neighborsPosition: number[]) {
    this.#position = position;
    this.name = name;
    this.#neighborsPosition = neighborsPosition;
  }

  get position(): number {
    return this.#position;
  }

  get neighbors(): Room[] {
    return this.#neighbors;
  }

  get neighborsPosition(): number[] {
    return this.#neighborsPosition;
  }
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function randEl<T>(arr: T[]): T {
  const randIndex = randInt(0, arr.length);
  return arr[randIndex];
}
