# ADR-0003 — Microsserviços como arquitetura-alvo

**Status:** Accepted  
**Data:** 2026-09-15

## Contexto

O objetivo arquitetural de longo prazo do projeto é evoluir para uma arquitetura de microsserviços. A adoção não será imediata, pois os limites corretos dos serviços precisam ser aprendidos a partir do domínio e da operação real.

## Decisão

Microsserviços são um **hard requirement da arquitetura-alvo**.

A arquitetura V1 deve, portanto, preservar a possibilidade de extrair módulos para serviços independentes de forma progressiva.

## Estratégia

1. modelar o domínio e os casos de uso;
2. estabelecer fronteiras modulares dentro do monólito;
3. reduzir dependências internas não explícitas;
4. identificar módulos candidatos à extração;
5. extrair serviços quando houver justificativa arquitetural ou operacional.

## Consequências

A arquitetura não deve tratar "monólito" como estado final nem "microsserviços" como justificativa para distribuir tudo prematuramente.

## Não decidido por esta ADR

Esta ADR não define:

- quantidade de serviços;
- protocolo de comunicação;
- service mesh;
- infraestrutura de deploy;
- estratégia de banco por serviço;
- processo ou momento exato de cada extração.
