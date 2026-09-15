# ADR-0006 — Node.js + TypeScript

**Status:** Accepted  
**Data:** 2026-09-15

## Contexto

O projeto terá uma interface Web e uma CLI e precisa de um ecossistema adequado para ambas, além de permitir compartilhamento do mesmo núcleo de aplicação.

## Decisão

Adotar **Node.js + TypeScript** como stack principal da aplicação.

## Consequências

### Positivas

- uma linguagem principal entre Web, CLI e backend;
- forte suporte de ecossistema para aplicações de servidor e ferramentas de linha de comando;
- tipagem estática útil para contratos entre módulos;
- facilidade de compartilhar modelos e bibliotecas entre componentes da aplicação.

### Negativas

- decisões de persistência e arquitetura modular continuarão sendo necessárias;
- TypeScript não impede acoplamento arquitetural por si só.

## Não decidido por esta ADR

Framework Web, framework de CLI, ORM, banco de dados e bibliotecas específicas ainda não estão definidos.
