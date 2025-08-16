import {useState} from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import {getRecipeFromMistral} from "../ai.js";

export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [recipeShown, setRecipeShown] = useState(false);
    const [aiText, setAiText] = useState("");
    const [responseLoading, setResponseLoading] = useState(false);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim();
        if (!newIngredient) return;
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function removeIngredient(index) {
        setIngredients(prevIngredients =>
            prevIngredients.filter((_, i) => i !== index)
        );
    }

    async function getRecipe() {
        setResponseLoading(true);
        const aiText = await getRecipeFromMistral(ingredients);
        setResponseLoading(false);

        setAiText(aiText);
        setRecipeShown(true);
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {!!ingredients.length && <IngredientsList
                ingredients={ingredients}
                getRecipe={getRecipe}
                getRecipeDisabled={responseLoading}
                removeIngredient={removeIngredient}
            />}
            {recipeShown && <ClaudeRecipe text={aiText} />}
        </main>
    )
}