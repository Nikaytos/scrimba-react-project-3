const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const apiUrl = (path) => (API_BASE ? `${API_BASE}${path.startsWith('/') ? path : `/${path}`}` : `/api${path.startsWith('/') ? path : `/${path}`}`)

export async function verifyCodeword(codeword) {
    const res = await fetch(apiUrl('/auth/verify'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codeword }),
    })
    return res.ok
}

export async function getRecipeFromChefClaude(ingredientsArr, codeword) {
    const res = await fetch(apiUrl('/claude'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ingredients: ingredientsArr, codeword }),
    })
    if (!res.ok) throw new Error('Claude API error')
    const data = await res.json()
    return data.text
}

export async function getRecipeFromMistral(ingredientsArr, codeword) {
    const res = await fetch(apiUrl('/mistral'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ingredients: ingredientsArr, codeword }),
    })
    if (!res.ok) {
        if (res.status === 401) throw new Error('Invalid codeword')
        throw new Error('Mistral API error')
    }
    const data = await res.json()
    return data.text
}