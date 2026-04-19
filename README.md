# Volley Scout

Sistema de Scout para Voleibol — aplicação web para registrar estatísticas de partidas em tempo real.

Construído com Vite, React, TypeScript, Tailwind CSS, shadcn/ui, React Query e React Router. Os dados da partida são persistidos localmente no navegador (`localStorage`).

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (já vem com o Node) ou outro gerenciador equivalente

Para conferir se está tudo instalado:

```bash
node -v
npm -v
```

## Como baixar

Clone o repositório e entre na pasta do projeto:

```bash
git clone git@github.com:amandabragaa/volley-stats-scout.git
cd volley-stats-scout
```

Se você não usa chave SSH no GitHub, use o link HTTPS:

```bash
git clone https://github.com/amandabragaa/volley-stats-scout.git
```

## Como instalar

Dentro da pasta do projeto, instale as dependências:

```bash
npm install
```

## Como usar

### Rodar em modo de desenvolvimento

```bash
npm run dev
```

O servidor sobe em [http://localhost:8080](http://localhost:8080). O Vite também expõe a aplicação na rede local — útil para testar no celular conectado ao mesmo Wi-Fi (basta acessar o endereço `http://<ip-do-seu-computador>:8080`).

### Gerar build de produção

```bash
npm run build
```

Os arquivos finais ficam em `dist/`.

### Visualizar o build

```bash
npm run preview
```

### Rodar os testes

```bash
npm run test        # executa uma vez
npm run test:watch  # executa em modo watch
```

### Verificar o lint

```bash
npm run lint
```

## Scripts disponíveis

| Comando              | O que faz                                    |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Sobe o servidor de desenvolvimento (Vite)    |
| `npm run build`      | Gera o build de produção                     |
| `npm run build:dev`  | Gera um build em modo desenvolvimento        |
| `npm run preview`    | Serve localmente o build gerado              |
| `npm run lint`       | Roda o ESLint no projeto                     |
| `npm run test`       | Executa os testes (Vitest)                   |
| `npm run test:watch` | Executa os testes em modo watch              |

## Estrutura do projeto

```
src/
├── components/   # Componentes reutilizáveis (inclui shadcn/ui em ui/)
├── hooks/        # Hooks customizados
├── lib/          # Utilitários e configurações
├── pages/        # Páginas da aplicação (Login, Scout, NotFound)
├── services/     # Integrações com APIs externas
├── types/        # Tipagens TypeScript compartilhadas
└── test/         # Configuração e utilitários de teste
```
