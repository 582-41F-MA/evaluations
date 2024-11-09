type ingredient = { name: string; quantity: number; bought: boolean };
type GroceriesProps = { ingredients: ingredient[] };

export default function Groceries({ ingredients }: GroceriesProps) {
    return ingredients.map((i) => <Ingredient {...i} />);
}

type IngredientProps = ingredient;

function Ingredient({ name, quantity, bought }: IngredientProps) {
    const article = (
        <article>
            <p>{name}</p>
            <p>{quantity}</p>
            <p>{bought}</p>
        </article>
    );
    if (bought) return <s>{article}</s>;
    return article;
}
