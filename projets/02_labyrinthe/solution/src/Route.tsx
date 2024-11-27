import { Room } from "./lib/Maze.ts";

type RouteProps = { route: Room[] };

export default function Route({ route }: RouteProps) {
  return <p>{route.map((r) => r.name).join(" → ")}</p>;
}
