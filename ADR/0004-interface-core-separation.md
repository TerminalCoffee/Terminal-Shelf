# ADR-0004 — Separar interfaces do núcleo de aplicação e domínio

**Status:** Accepted  
**Data:** 2026-09-15

## Contexto

Eloy precisa de uma interface Web, enquanto Lucas deseja uma CLI. As duas interfaces devem representar maneiras diferentes de operar sobre o mesmo sistema.

## Decisão

Web e CLI serão tratadas como **adaptadores de entrada** sobre os mesmos casos de uso e regras de negócio.

As regras centrais não devem ser implementadas diretamente na interface.

## Consequências

### Positivas

- evita duplicação de regras;
- permite adicionar novas interfaces posteriormente;
- facilita testes dos casos de uso sem depender de UI;
- favorece a futura extração de módulos para serviços independentes.

### Negativas

- exige uma camada de aplicação bem definida;
- pode parecer mais indireto do que colocar lógica diretamente em handlers/commands.
