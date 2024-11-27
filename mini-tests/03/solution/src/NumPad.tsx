import { useState } from "react";
import Key from "./Key.tsx";

export default function NumPad() {
    const [nip, setNip] = useState("");

    const keys = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "CLEAR"];

    function handleClick(value: string): void {
        if (value === "CLEAR") return setNip("");
        if (nip.length === 4) return;
        setNip(nip + value);
    }

    let shownNip: string;
    if (nip === "") shownNip = "";
    else shownNip = "*".repeat(nip.length - 1) + nip[nip.length - 1];

    return (
        <>
            <p>{shownNip}</p>
            <div className="keypad">
                {keys.map((k) => <Key value={k} onClick={handleClick} />)}
            </div>
        </>
    );
}
