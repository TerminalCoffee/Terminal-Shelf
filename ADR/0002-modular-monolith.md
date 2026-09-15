# ADR-0002 — Monólito modular como implantação inicial

**Status:** Accepted  
**Data:** 2026-09-15

## Contexto

Microsserviços são a arquitetura-alvo do projeto, mas distribuí-los desde a primeira implementação introduziria complexidade operacional antes que os limites dos módulos e as necessidades de distribuição estivessem maduras.

O projeto precisa, ao mesmo tempo, evoluir em direção a microsserviços sem construir um monólito acidentalmente difícil de separar.

## Decisão

Começar como **monólito modular**.

Os módulos serão tratados como unidades arquiteturais explícitas, com responsabilidades e contratos claros, mesmo compartilhando o mesmo processo na V1.

## Consequências

### Positivas

- menor complexidade operacional inicial;
- iteração mais rápida sobre o domínio;
- facilidade de depuração local;
- possibilidade de validar fronteiras antes da distribuição.

### Negativas

- existe risco de acoplamento crescente entre módulos;
- algumas propriedades de sistemas distribuídos não serão exercitadas inicialmente;
- será necessário disciplina arquitetural para preservar as fronteiras.

## Critério de sucesso

A implementação inicial deve permitir identificar módulos que possam ser extraídos progressivamente sem reescrever o domínio inteiro.
