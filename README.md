# ProFuturo

Plataforma educacional gamificada para alunos e professores, com suporte a uso offline.

## Visão Geral
O ProFuturo é uma plataforma de aprendizagem ativa, gamificada e responsiva, voltada para o ensino fundamental. Possui módulos para alunos, professores e uma versão offline, promovendo engajamento, evolução por níveis, quizzes, repetição espaçada e acompanhamento de desempenho.

## Módulos
- **Aluno:**
  - Login simples
  - Home moderna com atalhos
  - Desafios (quizzes gamificados com evolução de animal/nível)
  - Missões, Trilha, Perfil
  - Sistema de maestria e repetição espaçada (SRS)
  - Progresso salvo localmente
- **Professor:**
  - Login em etapas
  - Dashboard com visão geral
  - Acompanhamento de alunos, desempenho, trilhas e recompensas
  - Configurações e relatórios
- **Offline:**
  - Sincronização de dados
  - Banco local para uso sem internet

## Tecnologias
- React (frontend)
- Node.js (backend/offline)
- React Router DOM
- LocalStorage para progresso offline
- Ícones: react-icons

## Como rodar o projeto
1. **Pré-requisitos:** Node.js 16+ e npm instalados.
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Inicie o frontend:**
   ```bash
   cd src/aluno && npm start
   # ou para professor:
   cd ../professor && npm start
   ```
   Ou rode o unificador na raiz para acessar ambos os módulos.
4. **Acesse:**
   - Aluno: http://localhost:3000/aluno
   - Professor: http://localhost:3000/professor

## Estrutura de Pastas
- `src/aluno` — Módulo do aluno
- `src/professor` — Módulo do professor
- `offlinebox/` — Backend e sincronização offline
- `src/Unificador.js` — Menu inicial para escolher módulo

## Funcionalidades de Destaque
- Gamificação com evolução de animal/nível
- Progresso salvo localmente (mesmo offline)
- Repetição espaçada (SRS) para quizzes
- Relatórios e acompanhamento para professores
- Interface responsiva e moderna

## Para desenvolvedores
- Cada módulo tem seu próprio package.json
- Use React Router para navegação
- O estado global de maestria é passado por props
- O progresso dos quizzes é salvo no localStorage por usuário

---

Projeto desenvolvido para fins educacionais e prototipagem rápida. 