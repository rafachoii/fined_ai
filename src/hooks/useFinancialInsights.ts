import { useEffect, useState } from 'react'
import type { SimulationRecord } from '../components/data/simulation'
import {
    analyzeSimulation,
    type FinancialInsights,
} from '../services/gemini'

export function useFinancialInsights(simulation: SimulationRecord | null) {
    const [insights, setInsights] = useState<FinancialInsights | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!simulation) {
            return
        }

        let cancelled = false

        const currentSimulation = simulation

        async function loadInsights() {
            setIsLoading(true)
            setError(null)

            try {
                const result = await analyzeSimulation(currentSimulation)

                if (!cancelled) {
                    setInsights(result)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'Não foi possível gerar os insights.'
                    )
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        void loadInsights()

        return () => {
            cancelled = true
        }
    }, [simulation?.id])

    return { insights, isLoading, error }
}
