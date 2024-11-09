import Groceries from "./Groceries.tsx";
import ingredients from "./data.json";

export default function App() {
    return <Groceries ingredients={ingredients} />;
}
