import { Room } from "./lib/Maze.ts";

// Find the route to get all items.
export default function findRoute(start: Room): Room[] {
  let items = ["book", "wand", "potion"];
  const route: Room[] = [];

  while (items.length !== 0) {
    const [routeToItem, item] = findClosestItem(start, items);
    items = items.filter((i) => i !== item);
    route.push(...routeToItem);
    start = route[route.length - 1];
  }

  // Since the route to an item ends at a room, and the route to the next item
  // starts at the same room, we need to remove adjacent duplicate rooms.
  return removeAdjacentDuplicates(route);
}

function removeAdjacentDuplicates(rooms: Room[]): Room[] {
  return rooms.filter((room, i) => {
    const nextRoom = rooms.at(i + 1);
    if (!nextRoom) return true;
    if (room === nextRoom) return false;
    return true;
  });
}

// Given a room and items to find, find the closest item.
// Return the route to said item as well as its name.
function findClosestItem(start: Room, items: string[]): [Room[], item: string] {
  let route: Room[] = [];
  let item = "";
  for (const i of items) {
    const r = findItem(start, i);
    if (route.length !== 0 && r.length > route.length) continue;
    route = r;
    item = i;
  }
  return [route, item];
}

// Find the route to a given item.
function findItem(start: Room, item: string): Room[] {
  const route: Room[] = [];
  const visited: Room[] = [];

  // Recursively traverse the tree in search of the item. Crumbs represent the
  // route we're currently trying. They are discarded if the route reaches a
  // dead end.
  function walk(current: Room, crumbs: Room[] = []): void {
    visited.push(current);
    const roomsToVisit = current.doors
      .map((door) => door.toRoom)
      .filter((roomToVisit) => !visited.includes(roomToVisit));

    const foundItem = current.item === item;
    if (foundItem) {
      route.push(...crumbs, current);
      return;
    }

    const isDeadEnd = roomsToVisit.length === 0;
    if (isDeadEnd) return;

    for (const room of roomsToVisit) {
      walk(room, crumbs.concat([current]));
    }
  }

  walk(start);

  return route;
}
