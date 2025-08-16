export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map((ingredient, i) => (
        <li key={i}>
            <span className="ingredient-text">{ingredient}</span>
            <button
                className="remove-btn"
                onClick={() => props.removeIngredient(i)}
                aria-label={`Remove ${ingredient}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     width="18" height="18"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4h6v2" />
                </svg>
            </button>
        </li>
    ));

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe} disabled={props.getRecipeDisabled}>
                    Get a recipe
                </button>
            </div>}
        </section>
    )
}