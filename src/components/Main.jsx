import {useEffect, useRef, useState} from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import {getRecipeFromMistral} from "../ai.js";
import CodewordInput from "./CodewordInput.jsx";

export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("");
    const [responseLoading, setResponseLoading] = useState(false);
    const recipeSection = useRef(null);

    const [codeword, setCodeword] = useState("");
    const [codeStatus, setCodeStatus] = useState(null);
    const isAccessOk = !!codeword.trim() && codeStatus === "ok";

    useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipe])

    function addIngredient(formData) {
        if (!isAccessOk) return;
        const newIngredient = formData.get("ingredient").trim();
        if (!newIngredient) return;
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function removeIngredient(index) {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    }

    async function getRecipe() {
        if (!isAccessOk) return;
        setResponseLoading(true);
        try {
            const text = await getRecipeFromMistral(ingredients, codeword);
            setRecipe(text);
        } catch (e) {
            alert(e.message || "Request failed");
        } finally {
            setResponseLoading(false);
        }
    }

    return (
        <main>
            <CodewordInput
                value={codeword}
                onChange={setCodeword}
                onStatusChange={setCodeStatus}
            />

            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    disabled={!isAccessOk}
                />
                <button disabled={!isAccessOk}>
                    Add ingredient
                </button>
            </form>

            {!!ingredients.length && <IngredientsList
                ref={recipeSection}
                ingredients={ingredients}
                getRecipe={getRecipe}
                getRecipeDisabled={responseLoading || !isAccessOk}
                removeIngredient={removeIngredient}
            />}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}