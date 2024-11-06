// @ts-ignore
import { expect, test } from "https://maxime-pigeon.github.io/t/test.js";

const absent = "absent";
const present = "present";
const correct = "correct";

type result = "absent" | "present" | "correct";

export function guess(
    letters: string[],
    wordToGuess: string,
): result[] {
    const results: result[] = [];
    for (let i = 0; i < letters.length; i++) {
        const { word, result } = letter(letters[i], i, wordToGuess);
        wordToGuess = word;
        results.push(result);
    }
    return results;
}

test("should validate the guess", () => {
    const actual = guess(["d", "p", "l", "l", "e"], "apple");
    const expected = [absent, correct, present, absent, correct];
    expect(actual).toBe(expected);
});

test("should validate the guess", () => {
    const actual = guess(["l", "l", "l", "l", "e"], "apple");
    const expected = [present, absent, absent, absent, correct];
    expect(actual).toBe(expected);
});

function letter(
    letter: string,
    position: number,
    word: string,
): { result: result; word: string } {
    letter = letter.toLowerCase();
    const isCorrect = letter === word[position];
    const isPresent = word.includes(letter);
    if (isCorrect) return { result: correct, word: word.replace(letter, " ") };
    if (isPresent) {
        const i = word.indexOf(letter);
        return {
            result: present,
            word: word.slice(0, i) + " " + word.slice(i + 1),
        };
    }
    return { result: absent, word: word };
}

test("should return correct and remove the given letter from word", () => {
    const actual = letter("p", 1, "apple");
    const expected = { result: correct, word: "a ple" };
    expect(actual).toBe(expected);
});

test("should return present and remove the given letter from word", () => {
    const actual = letter("l", 1, "apple");
    const expected = { result: present, word: "app e" };
    expect(actual).toBe(expected);
});

test("should return absent and not change word", () => {
    const actual = letter("z", 1, "apple");
    const expected = { result: absent, word: "apple" };
    expect(actual).toBe(expected);
});

export async function word(w: string): Promise<boolean> {
    const data = new URLSearchParams();
    data.append("word", w);
    const options = {
        method: "POST",
        body: data,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
    };
    const res = await fetch("/api/validate", options);
    if (!res.ok) return false;
    return true;
}
