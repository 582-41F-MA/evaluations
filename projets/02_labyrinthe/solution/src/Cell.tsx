import Maze, { Door, Room } from "./lib/Maze.ts";
import "./Cell.css";

export type direction = "top" | "right" | "bottom" | "left";

export type CellProps = {
  name: string;
  item: null | string;
  doors: Door[];
  start: boolean;
  arrows: direction[];
};

export default function Cell({ name, item, doors, start, arrows }: CellProps) {
  let icon = "";
  if (item === "book") icon = "📖";
  if (item === "potion") icon = "🍵";
  if (item === "wand") icon = "🪄";

  const player = start ? "😵‍💫" : "";

  return (
    <article>
      {name} <span>{icon || player}</span>
      {doors.map((d) => (
        <div key={d.direction} className={"door-" + d.direction} />
      ))}
      {arrows.map((a) => (
        <div key={a} className={"arrow-" + a}>
          →
        </div>
      ))}
    </article>
  );
}

export function newCellProps(maze: Maze, route: Room[]): CellProps[] {
  let props: CellProps[] = maze.rooms.map((room) => {
    return { start: maze.start === room, ...room, arrows: [] };
  });
  props = addArrows(props, route);
  return props;
}

function addArrows(props: CellProps[], route: Room[]): CellProps[] {
  props = [...props]; // avoid mutating the original
  route.forEach((room, i) => {
    const nextRoom = route.at(i + 1);
    if (!nextRoom) return;
    const currentProps = props.find((p) => p.name === room.name);
    if (!currentProps) return;
    const door = room.doors.find((d) => d.toRoom === nextRoom);
    if (!door) return;
    currentProps.arrows.push(door.direction as direction);
  });
  return props;
}
