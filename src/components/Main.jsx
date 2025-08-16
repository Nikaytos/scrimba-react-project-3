import {useState} from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import {getRecipeFromMistral} from "../ai.js";

export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [recipeShown, setRecipeShown] = useState(false);
    const [aiText, setAiText] = useState("");

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function getRecipe() {
        const aiText = await getRecipeFromMistral(ingredients);

        setAiText(aiText);

        setRecipeShown(true)
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
            />}
            {recipeShown && <ClaudeRecipe text={aiText} />}
        </main>
    )
}