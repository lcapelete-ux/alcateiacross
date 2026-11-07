# 1º Campeonato CrossFit da Alcatéia — Plataforma Oficial de Inscrições, Ranking & Divulgação

Sistema completo para o 1º Campeonato de CrossFit da academia Alcatéia, reunindo portal público de inscrições individuais com simulação e upload de PIX, briefing e feed de notícias em tempo real, leaderboard oficial de pontuações por bateria/WOD e painel administrativo protegido para baixa de pagamentos, inclusão/edição de categorias personalizadas e lançamento de notas.

## Decisões Confirmadas & Respostas do Usuário

> [!IMPORTANT]
> As preferências informadas na etapa anterior foram incorporadas como diretrizes centrais do projeto:

- **Formato da Competição**: **Individual (Masculino e Feminino)** com divisão por categorias.
- **Categorias Personalizáveis pelo Admin**: O administrador pode cadastrar, renomear, editar faixas e taxas de qualquer categoria diretamente no painel (com pré-configuração das categorias clássicas: Scale, Intermediário, RX e Master 35+).
- **Fluxo de Pagamento**: Chave e QR Code PIX com upload ou inserção do comprovante pelo atleta, ficando com status `"Pendente"` até que o Administrador revise e dê a **baixa manual** para `"Confirmado"`.

---

## 1. Visão Geral & Conceito

- **Proposta de Valor**: Uma plataforma com espírito de arena e forte identidade de matilha (*Alcatéia*), que celebra o esforço e a união da comunidade CrossFit, simplificando o processo de inscrição e centralizando a divulgação de notícias e classificação ao vivo durante o torneio.
- **Público-Alvo**: Atletas da Alcatéia e boxes convidados, torcida e organizadores/árbitros do evento.
- **Identidade do Lobo da Alcatéia**: Criação de um logotipo geométrico marcante com silhueta de lobo estilizado, barras olímpicas e tipografia atlética robusta, transmitindo coragem, força coletiva e resiliência.

---

## 2. Experiência do Usuário & Design Visual

### Jornadas do Usuário (User Flows)
1. **Público & Atletas**:
   - **Hero da Arena**: Data, contagem regressiva, local oficial, briefing do evento e botão principal *"Garantir Minha Vaga"*.
   - **Inscrição Ágil**: Formulário com validação completa (Nome, CPF/Documento, Box de Origem, WhatsApp, E-mail, Categoria cadastrada pelo Admin, Tamanho da Camiseta e Contato de Emergência).
   - **Checkout PIX Transparente**: Exibição de QR Code gerado, chave PIX Copia-e-Cola da Alcatéia, valor da inscrição e campo de anexo/código do comprovante.
   - **Leaderboard Oficial**: Tabela com filtros por categoria e gênero, visualização de pontuações de cada Workout (WOD 1, WOD 2, WOD 3 e Final), desempates e pódio.
   - **Feed de Notícias & Briefing**: Timeline oficial com avisos de baterias, horários de credenciamento, liberação de padrões de movimento dos WODs e fotos dos treinos.
2. **Painel do Administrador (Área Restrita)**:
   - **Autenticação Segura**: Modal/página de login rápido com credenciais predefinidas e logout com 1 clique.
   - **Gestão de Inscrições & Baixa de Pagamentos**: Tabela com filtros (Todos, Pendentes, Confirmados), busca por nome e botão de 1 clique para *"Dar Baixa no Pagamento"*, além de visualização do comprovante enviado.
   - **Gestão de Categorias ("o admin digita")**: Interface para criar novas categorias (ex: "Master 40+", "Iniciante Teen", "Elite Open"), editar vagas e valores.
   - **Lançamento de Pontos & Ranking**: Edição direta das pontuações dos atletas por WOD (tempo, repetições ou carga) com recálculo automático de pontos e classificação geral.
   - **Gerenciador de Notícias**: Publicação de novos comunicados com título, conteúdo, tag e data.

### Identidade Visual & Tipografia
- **Paleta de Cores**:
  - *Canvas Neutro*: Preto obsidiana profundo (`#0B0F14` e `#111822`) com textura sutil de borracha de piso de box e aço industrial.
  - *Superfícies*: Cinza grafite estrutural (`#1A222D` e `#24303F`) com bordas suaves de contraste.
  - *Destaque Atlético*: Âmbar vulcânico / Dourado troféu (`#F59E0B` e `#E11D48`) para status, vitórias e botões de ação máxima.
- **Tipografia**:
  - *Títulos e Numerais*: Tipografia atlética e condensada inspirada em placares de crossfit e levantamento de peso (estilo *Archivo / Oswald*).
  - *Corpo*: Sans-serif contemporânea de alta legibilidade (*Plus Jakarta Sans* / *DM Sans*).
  - *Tabelas & Pontuações*: Numerais tabulares alinhados (`tabular-nums font-mono`).
- **Disciplina Anti-Slop**:
  - Sem selos ou pills genéricos flutuantes; metadados em texto limpo com separadores tipográficos (`·`).
  - Navegação no contrato padrão de 3 zonas sem poluição.
  - Logo exclusivo da Alcatéia integrado nativamente em SVG vetorizado de alta precisão.

---

## 3. Decisões Técnicas & Arquitetura de Dados

```
┌────────────────────────────────────────────────────────────────────────┐
│                   App CrossFit Alcatéia (Frontend)                     │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────┐  ┌─────────────────┐  ┌───────────────────┐ │
│  │   Hero & Divulgação   │  │ Inscrição + PIX │  │ Feed de Notícias  │ │
│  └───────────────────────┘  └─────────────────┘  └───────────────────┘ │
│                                                                        │
│  ┌───────────────────────┐  ┌────────────────────────────────────────┐ │
│  │   Ranking & WODs      │  │ Painel Admin (Baixa PIX, Categorias,   │ │
│  │   (Filtros Categorias)│  │ Lançamento de Pontos & Publicações)     │ │
│  └───────────────────────┘  └────────────────────────────────────────┘ │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│  State & Persistence Layer (localStorage com sincronização reativa)    │
│  - Athletes Collection (status pagamento, categoria, contatos)         │
│  - Categories Collection (configurável pelo admin)                     │
│  - Workouts & Scores Collection (pontuação por prova & ranking)        │
│  - News Feed Posts (atualizações e comunicados oficiais)               │
└────────────────────────────────────────────────────────────────────────┘
```

### Entidades do Sistema
1. **Athlete**: `id`, `name`, `cpf`, `boxAffiliation`, `gender`, `categorySlug`, `tshirtSize`, `whatsapp`, `emergencyContact`, `paymentStatus ('pendente' | 'pago')`, `paymentProofDetails`, `registrationDate`.
2. **Category**: `id`, `slug`, `name`, `gender`, `description`, `price`, `maxSpots`, `active`.
3. **Workout**: `id`, `number`, `name`, `scoreType ('time' | 'reps' | 'weight')`, `timeCap`, `description`.
4. **WorkoutScore**: `athleteId`, `workoutId`, `scoreValue`, `displayScore`, `points`, `tiebreak`.
5. **NewsPost**: `id`, `title`, `categoryTag`, `content`, `date`, `important`.

---

## 4. Fases de Execução

1. **Geração de Imagens & Branding Temático**: Produzir fotografias cinematográficas do box da Alcatéia e design do logo em vetor de lobo atlético.
2. **Setup do Tema & Dependências**: Configurar tipografia atlética, tokens no Tailwind v4 e estrutura de layout.
3. **Módulo Público**:
   - Hero com briefing, estatísticas e cronograma.
   - Formulário de inscrição com seleção de categorias dinâmicas, validação de campos e tela de pagamento PIX com chave Copia-e-Cola e upload/comprovante.
   - Feed de notícias e avisos técnicos.
   - Leaderboard público interativo com filtros e ordenação por WOD e pontuação geral.
4. **Módulo Administrativo**:
   - Login com senha de administrador e feedback de sessão.
   - Tabela de participantes com filtro de pagamento e botão instantâneo de **dar baixa**.
   - Criador e editor de categorias ("o admin digita").
   - Painel de lançamento de resultados por WOD para atualização ao vivo do ranking.
   - Editor de publicações no feed de notícias.
5. **Verificação & Testes**:
   - Validação de compilação TypeScript e linter (`compile_applet` + `lint_applet`).
   - Teste de fluxo completo: inscrição de novo atleta -> visualização no painel admin -> baixa no pagamento -> lançamento de notas -> conferência no leaderboard público.
