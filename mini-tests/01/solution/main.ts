// @ts-ignore: ne pas modifier
import { expect } from "jsr:@std/expect";

// Placez votre code ici.

type pixels = number;
type point = { x: number; y: number };

function translate2d(h: pixels, v: pixels): (p: point) => point {
    return (p) => ({ x: p.x + h, y: p.y + v });
}

// @ts-ignore: ne pas modifier
Deno.test("doit retourner une fermeture qui permet de translater un point", () => {
    const translateUp = translate2d(0, 10);
    let actual = translateUp({ x: 0, y: 0 });
    let expected = { x: 0, y: 10 };
    expect(actual).toEqual(expected);

    const translateRight = translate2d(10, 0);
    actual = translateRight({ x: 0, y: 0 });
    expected = { x: 10, y: 0 };
    expect(actual).toEqual(expected);
});

// @ts-ignore: ne pas modifier
Deno.test("la fermeture ne doit pas muter le point original", () => {
    const translateDiag = translate2d(10, 10);
    const p = { x: 0, y: 0 };
    translateDiag(p);
    const actual = p;
    const expected = { x: 0, y: 0 };
    expect(actual).toEqual(expected);
});
