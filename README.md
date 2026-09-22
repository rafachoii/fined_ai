# Fined

O Fined é um Educador financeiro web para simular metas pessoais e gerar insights personalizados com o Google Gemini.
Criei esse projeto para o curso de Frontend React 

## Funcionalidades

- Simulação financeira em etapas
- Cálculo da economia mensal disponível
- Análise de viabilidade da meta
- Sugestões de economia, renda extra e investimentos
- Tema claro e escuro

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini API

## Instalação

```bash
git clone https://github.com/rafachoii/fined_ai.git
cd fined_ai
npm install
```

Crie um arquivo `.env.local` na raiz:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
VITE_GEMINI_MODEL=gemini-3.1-flash-lite
```

A variável `VITE_GEMINI_MODEL` é opcional.

## Execução

```bash
npm run dev
```

Acesse a URL exibida pelo Vite, normalmente:

```text
http://localhost:5173
```

## Outros comandos

```bash
npm run build
npm run preview
npm run lint
```

## Estrutura

```text
src/
├── components/   componentes compartilhados e dados
├── context/      gerenciamento do tema
├── features/     formulário e resultados
├── hooks/        hooks da aplicação
├── pages/        páginas
├── services/     integração com o Gemini
└── utils/        cálculos e formatação de moeda
```
