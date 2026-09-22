# Fined

Aplicação web para simular metas financeiras pessoais e receber orientações financeiras personalizadas com apoio de IA generativa.

O projeto coleta dados como renda mensal, gastos fixos, dívidas e objetivo financeiro, calcula a capacidade de poupança e gera um diagnóstico com recomendações em português.

## Visão geral

O Fined foi desenvolvido em React + TypeScript e se organiza como uma experiência de onboarding em etapas. O fluxo principal é:

1. o usuário informa seus dados financeiros;
2. o sistema calcula a economia mensal disponível;
3. o app compara a meta com o prazo desejado;
4. a API do Gemini gera um diagnóstico, sugestões e motivação personalizada;
5. a simulação pode ser consultada posteriormente via armazenamento local do navegador.

## Principais funcionalidades

- Simulação guiada em etapas de coleta de dados financeiros
- Cálculo de economia mensal disponível com base em renda, despesas e dívidas
- Definição de metas financeiras com nome, valor e prazo
- Diagnóstico de viabilidade da meta no prazo informado
- Recomendação de ações para reduzir gastos e melhorar o planejamento
- Sugestões de renda extra, investimentos e motivação financeira
- Persistência local das simulações no navegador com `localStorage`
- Tema claro/escuro
- Navegação entre página de formulário e página de resultados

## Tecnologias utilizadas

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- Google Gemini API (`generativelanguage.googleapis.com`)
- localStorage do navegador para persistência

## Pré-requisitos

- Node.js instalado no ambiente local
- npm (ou outro gerenciador compatível com `package.json`)
- Chave de API do Google AI Studio para uso do Gemini

Observação: a versão exata do Node.js e do npm não foi especificada no repositório.

## Estrutura do projeto

```text
.
├── .env.example
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── router.tsx
│   ├── assets/
│   │   └── piggy-bank.png
│   ├── components/
│   │   ├── data/
│   │   │   ├── aiPrompt.ts
│   │   │   └── simulation.ts
│   │   ├── layout/
│   │   │   └── RootLayout.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Divider.tsx
│   │       ├── Header.tsx
│   │       ├── Input.tsx
│   │       └── PageHero.tsx
│   ├── context/
│   │   └── theme/
│   │       ├── ThemeContext.tsx
│   │       └── ThemeProvider.tsx
│   ├── features/
│   │   ├── Simulation/
│   │   │   ├── Form.tsx
│   │   │   ├── FormStep.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── Progress.tsx
│   │   └── SimulationResults/
│   │       └── Card.tsx
│   ├── hooks/
│   │   ├── useFinancialInsights.ts
│   │   ├── useSimulationStorage.tsx
│   │   └── useTheme.tsx
│   ├── pages/
│   │   ├── SimulationFormPage.tsx
│   │   └── SimulationResultsPage.tsx
│   ├── services/
│   │   └── gemini.ts
│   ├── styles/
│   │   └── theme.css
│   ├── utils/
│   │   ├── currency.ts
│   │   └── simulation.ts
│   └── vite-env.d.ts
└── .github/   (não identificado no repositório atual)
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/rafachoii/fined_ai.git
cd fined_ai
```

Instale as dependências:

```bash
npm install
```

## Configuração das variáveis de ambiente

O projeto inclui o arquivo `.env.example` com as variáveis esperadas:

```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_MODEL=gemini-3.1-flash-lite
```

Para rodar localmente, crie um arquivo `.env.local` na raiz do projeto com as mesmas chaves, por exemplo:

```bash
cp .env.example .env.local
```

Em seguida, revise e substitua os valores conforme sua conta do Google AI Studio.

### Variáveis disponíveis

- `VITE_GEMINI_API_KEY`: chave da API do Gemini
- `VITE_GEMINI_MODEL`: modelo opcional; o padrão definido no código é `gemini-3.1-flash-lite`

Observação: o projeto não expõe outra configuração de ambiente ou banco de dados em arquivos de configuração.

## Como executar localmente

No diretório raiz do projeto:

```bash
npm run dev
```

O Vite inicia o ambiente de desenvolvimento e normalmente disponibiliza a aplicação em um endereço local como `http://localhost:5173`.

## Como executar os testes

Não foi identificado no repositório uma suíte de testes automatizados configurada.

O arquivo `package.json` define apenas os scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

Não há script `test` nem arquivos de teste (`*.test.*`, `*.spec.*`) no projeto verificado.

Para validar o código localmente, a alternativa disponível no repositório é executar a checagem de lint:

```bash
npm run lint
```

## Build de produção

```bash
npm run build
```

Este comando executa a compilação TypeScript e gera a build do Vite.

## Exemplos de uso

Fluxo típico de uso do aplicativo:

1. Acesse a página inicial.
2. Informe a renda mensal bruta.
3. Informe os custos fixos mensais.
4. Informe as dívidas ou parcelas mensais.
5. Informe o nome da meta, como `Viagem para o Japão`.
6. Informe o valor da meta e o prazo desejado.
7. O sistema calcula a economia mensal e gera um diagnóstico com recomendações.

Exemplo ilustrativo:

```text
Renda mensal: R$ 5.000,00
Custos fixos: R$ 2.000,00
Dívidas: R$ 500,00
Meta: Viagem para o Japão
Custo da meta: R$ 15.000,00
Prazo: 12 meses
```

A partir desses dados, o app calcula a poupança mensal e analisa se a meta é viável no prazo informado.

## Banco de dados e persistência

O projeto não possui configuração de banco de dados relacional ou NoSQL.

A persistência observada é local no navegador, por meio de `localStorage`, em `src/hooks/useSimulationStorage.tsx`.

## Docker / Docker Compose / CI/CD

Não foi identificado:

- `Dockerfile`
- `docker-compose.yml` ou equivalente
- workflow de CI/CD em `.github/workflows/`

Portanto, esses itens estão como "não especificado" para este repositório.

## Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua alteração
3. Instale as dependências com `npm install`
4. Configure o arquivo `.env.local` com sua chave do Gemini
5. Execute o projeto com `npm run dev`
6. Faça commits claros e envie um pull request

## Licença

Licença não especificada no repositório. Não foi encontrado arquivo `LICENSE` ou indicação de licença no código e na estrutura do projeto.

## Observações importantes

- O projeto utiliza IA generativa para gerar os insights financeiros.
- A lógica principal de análise está em `src/services/gemini.ts` e em `src/components/data/aiPrompt.ts`.
- O app depende de uma chave válida de API do Gemini para funcionar em ambiente local.
- A estrutura atual do código indica uma aplicação front-end de simulação financeira, sem backend próprio ou banco de dados persistente.

## Resumo técnico

O Fined é uma aplicação React/TypeScript para planejamento financeiro pessoal com apoio de IA, focada em transformar dados básicos do orçamento em uma avaliação prática de metas financeiras. Sua arquitetura principal é front-end, com cálculo local e integração com o Gemini para geração de diagnóstico e recomendações em português.

## Links úteis

- Repositório: https://github.com/rafachoii/fined_ai
- Documentação da API Gemini: https://ai.google.dev/gemini-api
- Vite: https://vite.dev/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/

---

Se você quiser, posso também criar uma versão mais enxuta para o GitHub, ou uma versão mais detalhada com seções de arquitetura e onboarding para usuários finais.

