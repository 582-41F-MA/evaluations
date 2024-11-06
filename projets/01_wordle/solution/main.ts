import * as validate from "./validate.js";
import * as ui from "./ui.js";

function handleSubmit(
    rows: NodeListOf<HTMLFieldSetElement>,
    wordToGuess: string,
): (e: Event) => void {
    let currentRowIndex = 0;
    return async (e) => {
        e.preventDefault();

        const currentRow = rows[currentRowIndex];
        const currentInputs = currentRow.querySelectorAll("input");
        const letters = Array.from(currentInputs).map((input) => input.value);
        const word = letters.join("");

        const isWord = await validate.word(word);
        if (!isWord) return ui.showBadWordModal();

        const results = validate.guess(letters, wordToGuess);
        ui.colorizeInputs(currentInputs, results);
        const hasWon = results.every((r) => r === "correct");
        if (hasWon) return ui.showWinModal();
        const hasLost = currentRowIndex === rows.length - 1;
        if (hasLost) return ui.showLoseModal();

        const nextRow = rows[currentRowIndex + 1];
        ui.setCurrentRow(nextRow);
        currentRowIndex++;
    };
}

function handleInput(e: Event): void {
    if (!(e instanceof InputEvent)) return;
    if (!e.target || !e.data) return;
    const input = e.target as HTMLInputElement;
    ui.moveFocus(input);
}

async function getWordToGuess(): Promise<string> {
    const res = await fetch("/api/word");
    const word = await res.text();
    return word;
}

async function main(): Promise<void> {
    const form = document.querySelector("form") as HTMLFormElement;
    const rows = form.querySelectorAll("fieldset");
    const word = await getWordToGuess();
    ui.setCurrentRow(rows[0]);
    form.addEventListener("input", handleInput);
    form.addEventListener("submit", handleSubmit(rows, word));
}

main();
