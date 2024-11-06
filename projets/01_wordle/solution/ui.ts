export function showWinModal(): void {
    disableInputs();
    alert("You have won");
}

export function showLoseModal(): void {
    disableInputs();
    alert("You have lost");
}

export function showBadWordModal(): void {
    alert("The word is not valid");
}

export function disableInputs(): void {
    const inputs = document.querySelectorAll("input");
    for (const i of inputs) {
        i.required = false;
        i.disabled = true;
        i.classList.remove("current");
    }
}

export function moveFocus(currentInput: HTMLInputElement): void {
    const nextInput = currentInput.nextElementSibling as
        | null
        | HTMLInputElement;
    if (!nextInput) return;
    nextInput.focus();
}

export function setCurrentRow(fs: HTMLFieldSetElement): void {
    disableInputs();
    const currentInputs = fs.querySelectorAll("input");
    for (const i of currentInputs) {
        i.required = true;
        i.disabled = false;
        i.classList.add("current");
    }
    currentInputs[0].focus();
}

export function colorizeInputs(
    inputs: NodeListOf<HTMLInputElement>,
    results: string[],
): void {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.add(results[i]);
    }
}
