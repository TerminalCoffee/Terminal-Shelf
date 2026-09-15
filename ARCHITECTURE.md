# Arquitetura — Estante Virtual

**Estrutura:** adaptada de arc42  
**Status:** Draft inicial  
**Arquitetura atual:** monólito modular  
**Arquitetura-alvo:** microsserviços  

> Este documento descreve o estado e os princípios da arquitetura. Decisões que expliquem por que uma alternativa foi escolhida devem ser registradas nas ADRs.

## 1. Introdução e objetivos

### 1.1. Visão arquitetural

A Estante Virtual é uma aplicação local-first de gestão de acervo pessoal. A V1 é focada em livros físicos e deve possuir uma estrutura que permita múltiplas interfaces sobre o mesmo núcleo de domínio e aplicação.

A arquitetura segue uma estratégia de evolução:

```text
Arquitetura-alvo
      │
      ▼
Microsserviços
      ▲
      │ extração progressiva
      │
Monólito modular
      ▲
      │ implementação inicial
      │
      └── V1
```

O monólito inicial não deve ser tratado como destino final, mas como estágio operacional controlado.

### 1.2. Objetivos arquiteturais

- local-first;
- separação entre domínio, casos de uso e infraestrutura;
- Web e CLI como adaptadores distintos do mesmo núcleo;
- módulos com fronteiras explícitas;
- possibilidade de extração progressiva dos módulos;
- evitar acoplamentos que inviabilizem a futura distribuição.

## 2. Restrições arquiteturais

1. Node.js e TypeScript são as tecnologias-base previstas.
2. A V1 começa como monólito modular.
3. Microsserviços são um hard requirement como arquitetura-alvo.
4. A interface Web é necessária para o caso de Eloy.
5. Uma CLI é uma interface desejada para o caso de Lucas e para automação futura.
6. A operação deve priorizar local-first.
7. O design modular deve considerar futura extração dos módulos para processos independentes.

## 3. Contexto e escopo

### 3.1. Contexto funcional

O sistema fica entre o usuário e seu acervo pessoal:

```text
┌──────────────────────┐
│        Usuário       │
└──────────┬───────────┘
           │
      ┌────┴────┐
      │         │
    Web UI     CLI
      │         │
      └────┬────┘
           │
    Estante Virtual
           │
     Acervo pessoal
```

Na V1, fontes externas não são um componente obrigatório do domínio principal.

### 3.2. Contexto futuro

A evolução para conteúdo digital poderá introduzir fontes externas, identificadores globais, sincronização e novas formas de representação de acompanhamento, sem exigir que o núcleo conceitual seja baseado no site onde o conteúdo está hospedado.

## 4. Estratégia da solução

### 4.1. Local-first

O sistema deve priorizar dados e operações locais. Dependências remotas podem ser adicionadas posteriormente sem transformar conectividade contínua em requisito estrutural da V1.

### 4.2. Monólito modular

A V1 será implantada como um único sistema, porém internamente organizada em módulos com:

- responsabilidade clara;
- APIs internas explícitas;
- baixo acoplamento;
- dependências direcionais;
- acesso controlado a dados e infraestrutura.

### 4.3. Evolução para microsserviços

Cada fronteira modular deve ser avaliada também como candidata à futura extração. Isso não significa que todos os módulos precisem virar serviços nem que a divisão final já esteja definida.

O critério é preservar opções arquiteturais sem introduzir distribuição prematuramente.

### 4.4. Separação de interfaces

Web e CLI devem consumir os mesmos casos de uso e regras de negócio. A interface não deve conter regras centrais do domínio.

### 4.5. Clean Architecture

A arquitetura deve privilegiar uma separação conceitual próxima de:

```text
┌───────────────────────────────────┐
│ Interfaces / Frameworks           │
│ Web, CLI, adapters                │
├───────────────────────────────────┤
│ Application                       │
│ Use cases, orchestration          │
├───────────────────────────────────┤
│ Domain                            │
│ Rules, entities, value objects    │
├───────────────────────────────────┤
│ Infrastructure / persistence      │
│ Storage and external adapters     │
└───────────────────────────────────┘
```

Os detalhes exatos das camadas poderão variar por módulo.

## 5. Visão de blocos de construção

A decomposição abaixo é preliminar. Não constitui ainda uma decisão definitiva de bounded contexts ou futuros serviços.

### 5.1. Núcleo potencial

- **Catalog:** identidade e dados catalográficos das obras/exemplares.
- **Collection Management:** gestão do acervo pessoal.
- **Organization:** formas persistentes de organizar e visualizar o acervo.
- **Reading Lifecycle:** estados e transições relacionados à leitura.
- **Reading Queue:** fila, prioridade e intenção de leitura.
- **Reminders:** lembretes e gatilhos relacionados ao acervo.

O relacionamento entre esses módulos será definido com maior precisão durante a implementação e a evolução do domínio.

### 5.2. Fronteiras

Os módulos devem preferir contratos de aplicação e objetos de domínio explícitos em vez de acesso direto às estruturas internas de outros módulos.

Dependências circulares entre módulos devem ser consideradas um sinal de fronteira mal definida.

## 6. Visão de runtime

### 6.1. Cadastro incremental

Fluxo conceitual:

```text
Usuário → Interface → Caso de uso de cadastro → Domínio → Persistência local
                                      │
                                      └── registro pode ser incompleto
```

O enriquecimento posterior deve ser parte natural do fluxo, e não uma exceção.

### 6.2. Busca

A busca deve consumir o estado atual do acervo e responder à necessidade imediata do usuário. Ela não deve automaticamente alterar a organização persistente.

### 6.3. Organização

A organização representa uma decisão persistente do usuário e pode produzir uma visão diferente da disposição física dos exemplares.

### 6.4. Ciclo de vida de leitura

O sistema deve registrar transições relevantes do relacionamento do usuário com um item. A taxonomia exata ainda está em aberto.

### 6.5. Fila e lembretes

A fila de leitura e os lembretes devem operar sobre informações já conhecidas do acervo, evitando exigir catalogação completa como pré-condição.

## 7. Visão de implantação

### 7.1. V1

```text
                ┌──────────────┐
                │    Usuário   │
                └──────┬───────┘
                       │
                ┌──────┴──────┐
                │             │
           ┌────▼───┐     ┌───▼────┐
           │ Web UI │     │  CLI    │
           └────┬───┘     └───┬────┘
                │             │
                └──────┬──────┘
                       │
               ┌──────▼───────┐
               │ Monólito     │
               │ modular      │
               └──────┬───────┘
                      │
               ┌──────▼───────┐
               │ Armazenamento │
               │ local         │
               └───────────────┘
```

### 7.2. Arquitetura-alvo

A forma exata ainda não está definida, mas a intenção é extrair módulos selecionados para serviços independentes, mantendo interfaces de usuário e contratos estáveis sempre que possível.

```text
             ┌──────────────┐
             │ Web / CLI    │
             └──────┬───────┘
                    │
          ┌─────────┴───────────┐
          │ serviços independentes│
          │                       │
     ┌────▼────┐ ┌──────▼─────┐  │
     │ Catalog │ │ Collection  │  │
     └─────────┘ └─────────────┘  │
           ... outros serviços ...
```

Esta visão representa o destino arquitetural, não a topologia da V1.

## 8. Conceitos transversais

### 8.1. Dados locais

Persistência local é uma preocupação transversal da V1.

### 8.2. Contratos de módulo

Os módulos devem expor operações explícitas e minimizar conhecimento sobre suas estruturas internas.

### 8.3. Identidade

A estratégia de identificação para obra, exemplar e demais conceitos deve ser definida antes de qualquer extração para serviços independentes.

### 8.4. Erros

Falhas esperadas devem ser representadas por contratos de aplicação consistentes, evitando que detalhes da infraestrutura contaminem o domínio.

### 8.5. Observabilidade

O nível de observabilidade necessário para a V1 pode ser simples, mas a arquitetura distribuída futura exigirá correlação, métricas e rastreamento apropriados quando os serviços forem separados.

## 9. Requisitos de qualidade

### 9.1. Baixa fricção

As operações comuns devem exigir poucos passos, especialmente cadastro e consulta.

### 9.2. Evolutividade

Mudanças em um módulo devem ter impacto controlado em outros módulos.

### 9.3. Portabilidade de interface

A regra de negócio não deve depender de Web ou CLI.

### 9.4. Extraibilidade

Módulos devem poder ser isolados progressivamente sem reescrita completa do domínio.

### 9.5. Operação local

A ausência de conectividade externa não deve impedir as operações centrais da V1.

## 10. Riscos e dívida técnica

### Risco 1 — Modularidade apenas nominal

Um monólito pode parecer modular, mas possuir dependências implícitas entre módulos. Isso comprometeria a futura extração.

**Mitigação:** contratos explícitos, regras de dependência e testes arquiteturais.

### Risco 2 — Distribuição prematura

Tentar executar como microsserviços antes de as fronteiras estarem maduras pode aumentar complexidade sem gerar valor.

**Mitigação:** monólito modular como etapa inicial deliberada.

### Risco 3 — Modelo de domínio rígido demais

Modelar estados e entidades excessivamente cedo pode transformar hipóteses em contratos difíceis de mudar.

**Mitigação:** registrar incertezas e evoluir o domínio por casos de uso reais.

### Risco 4 — Cadastro burocrático

Um fluxo de cadastro excessivamente detalhado pode reproduzir o problema da planilha.

**Mitigação:** cadastro incremental como princípio de produto e de UX.

## 11. Decisões arquiteturais relacionadas

As decisões relevantes devem ser consultadas em `ADR/`.

ADRs iniciais:

- ADR-0001 — Local-first;
- ADR-0002 — Monólito modular como arquitetura de implantação inicial;
- ADR-0003 — Microsserviços como arquitetura-alvo e estratégia de evolução;
- ADR-0004 — Separação entre interfaces e núcleo de aplicação/domínio;
- ADR-0005 — Clean Architecture como princípio estrutural;
- ADR-0006 — Node.js + TypeScript.

## 12. Glossário inicial

| Termo | Definição inicial |
|---|---|
| Obra | Conteúdo intelectual catalogado. |
| Exemplar | Instância específica pertencente/acompanhada pelo usuário. |
| Acervo | Conjunto de itens administrados pelo usuário. |
| Localização | Lugar físico associado a um exemplar. |
| Organização | Forma persistente escolhida para estruturar ou visualizar o acervo. |
| Busca | Operação efêmera para localizar informação no acervo. |
| Coleção personalizada | Agrupamento criado pelo usuário para algum objetivo. |
| Ciclo de vida de leitura | Estados e transições do relacionamento do usuário com uma obra/exemplar. |
| Fila de leitura | Conjunto de itens que o usuário pretende ler, potencialmente ordenado/priorizado. |
| Lembrete | Intenção futura associada a item ou contexto do acervo. |
