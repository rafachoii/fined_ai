import { buildAPIPrompt } from '../components/data/aiPrompt'
import type { SimulationRecord } from '../components/data/simulation'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models'
const DEFAULT_MODEL = 'gemini-3.1-flash-lite'

export type FeasibilityStatus = 'viable' | 'needs_adjustment' | 'unfeasible'

export interface FinancialInsights {
    feasibility: {
        status: FeasibilityStatus
        content: string
    }
    diagnosis: {
        content: string
    }
    suggestions: {
        items: string[]
    }
    extraIncome: {
        items: string[]
    }
    investment: {
        items: string[]
    }
    motivation: {
        content: string
    }
}

interface GeminiPart {
    text?: string
}

interface GeminiResponse {
    candidates?: Array<{
        content?: {
            parts?: GeminiPart[]
        }
        finishReason?: string
    }>
    error?: {
        message?: string
        status?: string
    }
}

function getApiKey() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim()

    if (!apiKey) {
        throw new Error(
            'Defina VITE_GEMINI_API_KEY no arquivo .env.local e reinicie o servidor (`npm run dev`).'
        )
    }

    return apiKey
}

function getModel() {
    return import.meta.env.VITE_GEMINI_MODEL?.trim() || DEFAULT_MODEL
}

function extractText(payload: GeminiResponse) {
    const text = payload.candidates
        ?.flatMap((candidate) => candidate.content?.parts ?? [])
        .map((part) => part.text ?? '')
        .join('')
        .trim()

    if (!text) {
        throw new Error('A API do Gemini não retornou texto na resposta.')
    }

    return text
}

function parseInsights(text: string): FinancialInsights {
    const cleaned = text
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim()

    try {
        return JSON.parse(cleaned) as FinancialInsights
    } catch {
        throw new Error('Não foi possível interpretar o JSON retornado pelo Gemini.')
    }
}

export async function analyzeSimulation(
    simulation: SimulationRecord
): Promise<FinancialInsights> {
    const apiKey = getApiKey()
    const model = getModel()
    const prompt = buildAPIPrompt(simulation)

    const response = await fetch(
        `${GEMINI_API_URL}/${model}:generateContent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.4,
                    responseMimeType: 'application/json',
                },
            }),
        }
    )

    const payload = (await response.json()) as GeminiResponse

    if (!response.ok) {
        throw new Error(
            payload.error?.message ??
                `Falha ao chamar o Gemini (${response.status}).`
        )
    }

    return parseInsights(extractText(payload))
}
