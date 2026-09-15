# ADR-0001 — Local-first

**Status:** Accepted  
**Data:** 2026-09-15

## Contexto

A ferramenta existe para gerenciar um acervo pessoal e deve continuar útil independentemente de conectividade constante. O caso de uso central é a consulta e manutenção dos dados do próprio usuário.

## Decisão

Adotar **local-first** como princípio arquitetural da V1.

As operações centrais do acervo devem funcionar localmente, e os dados primários do usuário devem estar disponíveis localmente.

## Consequências

### Positivas

- maior independência de rede;
- menor latência para operações centrais;
- melhor alinhamento com a natureza pessoal do acervo;
- simplificação do funcionamento offline.

### Negativas

- sincronização futura, caso necessária, exigirá decisões adicionais;
- integração com serviços externos precisará de fronteiras claras;
- arquitetura futura distribuída poderá introduzir desafios de consistência.

## Não decidido por esta ADR

Esta decisão não define o mecanismo específico de persistência, replicação, sincronização ou armazenamento criptográfico.
