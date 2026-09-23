import { CalendarClock, CreditCardIcon, Goal, Landmark, PiggyBank, Wallet } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { Card } from "../features/SimulationResults/Card";
import { calcMonthlySavings } from "../utils/simulation";
import { useParams } from "react-router-dom";
import { useSimulationStorage } from "../hooks/useSimulationStorage";
import { useFinancialInsights } from "../hooks/useFinancialInsights";

export function SimulationResultsPage() {
    const { id } = useParams<{ id: string}>()
    const { getFormData } = useSimulationStorage()

    const data = id ? getFormData(id) : null
    const { insights, isLoading, error } = useFinancialInsights(data)

    if (!data) {
        return <p>Simulação não encontrada.</p>
    }

    const monthlySavings = calcMonthlySavings(data)
    const feasibilityLabel = {
        viable: 'Viável',
        needs_adjustment: 'Precisa de ajustes',
        unfeasible: 'Inviável no prazo',
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <PageHero
                title="Resultado da sua simulação"
                subtitle="Com base no seu perfil financeiro e objetivos."
            />
            <div className="mb-6 grid gird-cols-1 gap-4 lg:grid-cols-3">
                <Card
                    icon={Goal}
                    label="Custo da meta"
                    value={data.goalAmount}
                    subtitle={data.goalName}
                />
                <Card
                    icon={CalendarClock}
                    label="Prazo"
                    value={ `${data.goalDeadline} meses`}
                    subtitle={'Prazo para atingir a meta'}
                />                
                <Card
                    variant="primary"
                    icon={PiggyBank}
                    label="Economia mensal"
                    value={ `R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    subtitle={'Economia mensal necessária'}
                />                
            </div>
            <div className="grid gap-6 lg:grid-cols-3">            
                <div className="bg-card order-2 space-y-5 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
                    <h2 className="text-lg font-semibold">Painel de Insights</h2>
                    {isLoading && (
                        <p className="text-muted-foreground text-sm">
                            Gerando diagnóstico com o Gemini...
                        </p>
                    )}
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                    {insights && (
                        <div className="space-y-5 text-sm leading-relaxed">
                            <section>
                                <h3 className="mb-1 font-semibold">
                                    Viabilidade ({feasibilityLabel[insights.feasibility.status]})
                                </h3>
                                <p>{insights.feasibility.content}</p>
                            </section>
                            <section>
                                <h3 className="mb-1 font-semibold">Diagnóstico</h3>
                                <p>{insights.diagnosis.content}</p>
                            </section>
                            <section>
                                <h3 className="mb-1 font-semibold">Sugestões</h3>
                                <ul className="list-disc space-y-1 pl-5">
                                    {insights.suggestions.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                            <section>
                                <h3 className="mb-1 font-semibold">Renda extra</h3>
                                <ul className="list-disc space-y-1 pl-5">
                                    {insights.extraIncome.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                            <section>
                                <h3 className="mb-1 font-semibold">Investimentos</h3>
                                <ul className="list-disc space-y-1 pl-5">
                                    {insights.investment.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                            <section>
                                <h3 className="mb-1 font-semibold">Motivação</h3>
                                <p>{insights.motivation.content}</p>
                            </section>
                        </div>
                    )}
                </div>
                <div className="order-1 flex flex-col gap-6 lg:order-2">
                    <Card
                        icon={Wallet}
                        label="Renda mensal"
                        value={data.income}
                        subtitle={'Renda total bruta por mês'}
                    />
                    <Card
                        icon={CreditCardIcon}
                        label="Custos fixos de vida"
                        value={data.expenses}
                        subtitle={'Gastos essenciais por mês'}
                        />                
                    <Card
                        icon={Landmark}
                        label="Dívidas / Parcelas"
                        value={data.debts}
                        subtitle={'Valor comprometido em parcelas/depósito'}
                        />                
                </div>
            </div>
        </main>
    )
}