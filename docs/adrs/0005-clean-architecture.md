# ADR-0005 — Clean Architecture como princípio estrutural

**Status:** Accepted  
**Data:** 2026-09-15

## Contexto

O sistema precisa suportar Web e CLI, operar localmente, evoluir em módulos e eventualmente migrar partes do monólito para microsserviços.

## Decisão

Adotar os princípios de **Clean Architecture**, mantendo separação entre:

- domínio;
- aplicação / casos de uso;
- interfaces / adaptadores;
- infraestrutura.

A implementação não precisa reproduzir literalmente qualquer template de Clean Architecture, desde que preserve a independência do domínio em relação a detalhes externos e permita inversão de dependências onde apropriado.

## Consequências

A estrutura do código poderá evoluir sem prender o domínio à Web, CLI, banco de dados ou frameworks específicos.

A arquitetura também terá uma base melhor para testar regras e casos de uso isoladamente.
