const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '') // без кінцевого слеша

const apiUrl = (path) => {
    const p = path.startsWith('/') ? path : `/${path}`
    return API_BASE ? `${API_BASE}${p}` : `/api${p}`
}

export async function getRecipeFromChefClaude(ingredientsArr) {
    const res = await fetch(apiUrl('/claude'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients: ingredientsArr}),
    })
    if (!res.ok) throw new Error('Claude API error')
    const data = await res.json()
    return data.text
}

export async function getRecipeFromMistral(ingredientsArr) {
    const res = await fetch(apiUrl('/mistral'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients: ingredientsArr}),
    })
    if (!res.ok) throw new Error('Mistral API error')
    const data = await res.json()
    return data.text
}