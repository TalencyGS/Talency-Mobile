# Talency Mobile

Aplicativo mobile desenvolvido em React Native com Expo para a Global Solution de Fevereiro de 2025 da FIAP na disciplina Mobile Application Development. O app integra o ecossistema Talency, focado em trilhas profissionais do futuro, metas de desenvolvimento e apoio com IA.

## Contexto da solução

O Talency é uma plataforma que ajuda estudantes e profissionais a planejarem e acompanharem sua evolução em carreiras de alta demanda, como

- Desenvolvedor Fullstack  
- Cientista de Dados  
- Designer de UX  
- Técnico em Energia Verde  
- Analista de Cibersegurança  
- Outras profissões emergentes ligadas a dados, ESG e automação  

Na web e no backend, a solução oferece trilhas pré definidas, testes práticos, roadmaps de metas e um módulo de IA Advisor.  
O aplicativo mobile concentra no celular as principais funcionalidades do Talency relacionadas a autenticação, visualização de trilhas, acompanhamento de roadmap e interação com a IA de orientação.

## Integrantes do grupo

- Felipe Menezes Prometti  · RM558976 · Turma 2TDSPM  
- Maria Eduarda Pires Vieira  · RM55514 · Turma 2TDSPZ  
- Samuel Damasceno Silva  · RM558876 · Turma 2TDSPM  

## Links importantes

- Vídeo de demonstração no YouTube: https://youtu.be/ZeT1-ZGnQUA  

## Principais tecnologias

- React Native com Expo  
- Expo Router para navegação  
- TypeScript  
- Axios para consumo da API  
- AsyncStorage para armazenamento do token de autenticação  
- React Navigation Stack integrado ao Expo Router  
- ESLint para padronização de código  

### Backend utilizado

- API .NET publicada em Azure
  - Base atual configurada no projeto  
    ```ts
    export const api = axios.create({
      baseURL: "http://talency-webapp-gs.azurewebsites.net/api",
    });
    ```

## Arquitetura do projeto

Estrutura principal de pastas do app

- `app`  
  - `_layout.tsx`  configuração do Stack e do `AuthProvider`  
  - `index.tsx`  decide se o usuário vai para login ou home de acordo com o token  
  - `login.tsx`  tela de login  
  - `cadastro.tsx`  tela de cadastro  
  - `home.tsx`  hub principal depois do login  
  - `trilhas/index.tsx`  listagem das trilhas profissionais cadastradas na API  
  - `trilhas/[id].tsx`  detalhe da trilha com etapas simuladas  
  - `roadmap/index.tsx`  visão geral do roadmap de carreira do usuário  
  - `roadmap/[roadmapId].tsx`  lista e CRUD de metas de carreira  
  - `ia-advisor/index.tsx`  tela de interação com o módulo de IA  
  - `sobre.tsx`  tela Sobre o App, incluindo hash do commit  
- `hooks`  
  - `AuthContext.tsx`  contexto de autenticação e gerenciamento de sessão  
- `constants`  
  - `api.ts`  instância do Axios com baseURL e injeção automática do Bearer token  
  - `theme.ts`  paleta de cores, fontes e espaçamentos globais  
- `components`  
  - componentes de UI reutilizáveis e helpers (por exemplo `ThemedText`, `ThemedView` etc)  
- `assets`  
  - ícones e imagens utilizadas no app  

A navegação é controlada pelo Expo Router, usando Stack como raiz.  
As telas protegidas ficam atrás da verificação de autenticação em `app/index.tsx`, o que garante que apenas usuários logados acessem o conteúdo principal.

## Funcionalidades implementadas

### 1. Telas e navegação

O aplicativo possui mais de 6 telas distintas, com navegação fluida entre elas

- Login  
- Cadastro  
- Home  
- Lista de Trilhas  
- Detalhe da Trilha  
- Lista de Roadmaps  
- Detalhe do Roadmap com metas  
- IA Advisor  
- Sobre o App  

A navegação utiliza Expo Router com `useRouter` e Stack sem cabeçalho padrão, seguindo boas práticas de usabilidade.

### 2. Autenticação

A autenticação é centralizada no `AuthContext`

- Tela de cadastro (`cadastro.tsx`) usando `signUp`  
  - Envia `nome`, `email`, `senha` e `areaInteresse` para a API em `/Usuario/register`  
- Tela de login (`login.tsx`) usando `signIn`  
  - Envia `email` e `senha` para `/auth/login`  
  - Em caso de sucesso, o app armazena o token JWT e os dados do usuário no AsyncStorage (`@talency:token` e `@talency:user`)  
  - Em caso de erro de autenticação, o contexto utiliza um usuário mockado com token de demonstração para modo apresentação, evitando travar o fluxo do vídeo  
- Logout funcional na `Home`  
  - Botão chama `signOut`, limpa o AsyncStorage e redireciona para `/login`  
- Rotas protegidas  
  - `app/index.tsx` verifica se existe token  
  - Usuário autenticado é redirecionado para `/home`  
  - Usuário sem token é mandado para `/login`  

### 3. CRUD com API no módulo de Roadmap

O CRUD principal do app está na gestão de metas do roadmap de carreira

- Tela `app/roadmap/index.tsx`  
  - Consome `/Roadmap/usuario/{idUsuario}` para trazer o roadmap vinculado ao usuário logado  
  - Exibe trilha associada, status e percentual concluído usando cards e destaques visuais  
  - Em caso de falha de rede, o app utiliza um roadmap mockado para manter o fluxo da apresentação  

- Tela `app/roadmap/[roadmapId].tsx`  
  - `GET /roadmaps/{roadmapId}/metas` lista metas existentes  
  - `POST /roadmaps/{roadmapId}/metas` cria nova meta a partir da descrição digitada  
  - `PUT /metas/{idMeta}` alterna o status entre Pendente e Concluída  
  - `DELETE /metas/{idMeta}` exclui metas, com confirmação via `Alert`  

Todas as chamadas usam Axios através da instância `api`, com token anexado automaticamente pelo interceptor definido em `constants/api.ts`.  
Em situações de erro de rede, o aplicativo exibe mensagens amigáveis e mantém dados mockados prontos para demonstração.

Além do CRUD de metas, o app também consome a API para

- Listar trilhas na tela `app/trilhas/index.tsx` com `GET /Trilha`  
- Enviar solicitações ao módulo de IA na tela `app/ia-advisor/index.tsx` com `POST /ia/solicitar`  

### 4. IA Advisor

Na tela `app/ia-advisor/index.tsx` o usuário escolhe entre opções como

- Mensagem de motivação  
- Sugestão de estudos  
- Resumo de tendências de mercado  

A tela envia requisições para `/ia/solicitar`, incluindo `usuarioId` e o tipo de solicitação.  
Em caso de indisponibilidade da API Java, a tela apresenta mensagens mockadas coerentes com cada opção, permitindo demonstrar o fluxo completo.

### 5. Estilização e identidade visual

Todo o app utiliza a paleta definida em `constants/theme.ts`

- Cores primárias e secundárias alinhadas à identidade visual do Talency  
- Fundos em tons claros, cartões com sombras suaves e bordas arredondadas  
- Tipografia configurada por plataforma com `fontFamily` apropriada  
- Uso consistente de ícones `Ionicons` para indicar ações e navegação  

A `Home` destaca trilhas, ferramentas inteligentes, roadmap e IA Advisor com cartões organizados em seções bem marcadas.

### 6. Tela Sobre o App e hash do commit

A tela `app/sobre.tsx` apresenta

- Descrição da solução Talency  
- Principais funcionalidades do ecossistema  
- Integrantes com nome, RM e turma  
- Hash do commit configurado na constante `COMMIT_HASH` no código  
  ```ts
  const COMMIT_HASH = "e7b89f2";
  ```

Esta tela atende ao requisito da disciplina que pede a exibição do hash do commit referente à versão do código publicada.

## Como executar o projeto localmente

### Pré requisitos

- Node.js LTS  
- NPM ou Yarn  
- Aplicativo Expo Go instalado no dispositivo físico ou emulador configurado  

### Passos

1. Clonar o repositório do GitHub Classroom  
2. Instalar dependências  

   ```bash
   npm install
   ```

3. Conferir a base da API em `constants/api.ts` e ajustar apenas se a URL de backend estiver diferente na infraestrutura de nuvem  

4. Iniciar o projeto  

   ```bash
   npm start
   ```

   ou  

   ```bash
   npx expo start
   ```

5. Ler o QR Code com o Expo Go ou abrir no emulador Android ou iOS  
