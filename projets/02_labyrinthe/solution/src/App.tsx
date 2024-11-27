import Maze from "./lib/Maze.ts";
import Route from "./Route.tsx";
import Cell, { newCellProps } from "./Cell.tsx";
import findRoute from "./route.ts";
import "./App.css";

export default function App() {
  const maze = new Maze();
  const route = findRoute(maze.start);
  const cells = newCellProps(maze, route);
  return (
    <main>
      <section>
        {cells.map((cell) => <Cell key={cell.name} {...cell} />)}
      </section>
      <Route route={route} />
    </main>
  );
}
