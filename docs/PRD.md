# PRD — Estante Virtual

**Status:** Draft inicial
**Versão:** 0.1
**Escopo:** V1 física / coleção pessoal

## 1. Visão do produto

A Estante Virtual é uma ferramenta de gestão pessoal de acervo, inicialmente focada em livros físicos. Seu objetivo não é reproduzir um catálogo social de livros, mas ajudar uma pessoa a **registrar, encontrar, organizar e acompanhar o ciclo de vida de sua própria coleção**.

A principal diferença em relação a produtos como Goodreads, IMDb ou MyAnimeList é de prioridade: a coleção do usuário não é uma consequência secundária do catálogo; **ela é o objeto central do sistema**.

A V1 será construída em torno do domínio físico de livros. A extensão futura para acervos digitais e outros tipos de obras é um objetivo de evolução, mas está fora do escopo funcional da primeira versão.

## 2. Problema

A gestão de um acervo pessoal apresenta problemas que ferramentas genéricas de catálogo, planilhas e a própria organização física não resolvem de forma satisfatória.

Esses problemas se tornam mais evidentes quando a coleção cresce, quando existem limitações físicas de armazenamento ou quando o usuário precisa manter diferentes formas de organização e acompanhamento do acervo.

### 2.1. Limitações da organização física

A disposição física dos itens nem sempre consegue acompanhar a forma como o usuário gostaria de organizar sua coleção. Limitações de espaço, disponibilidade de mobiliário e mudanças frequentes nos critérios de organização tornam inviável depender exclusivamente da disposição física para representar a estrutura desejada do acervo.

Isso dificulta:

* localizar rapidamente um item;
* manter diferentes critérios de organização simultaneamente;
* representar agrupamentos que não correspondem à posição física;
* reorganizar conceitualmente a coleção sem realizar alterações físicas.

### 2.2. Fragmentação das informações

A manutenção de informações sobre o acervo frequentemente depende de ferramentas genéricas, como planilhas, tabelas ou sistemas de anotações.

Embora essas ferramentas permitam registrar informações, elas não são necessariamente projetadas para as operações específicas de gerenciamento de um acervo pessoal, fazendo com que tarefas como cadastro, consulta, organização e acompanhamento dependam de processos manuais.

### 2.3. Baixa aderência de ferramentas genéricas

Soluções genéricas normalmente exigem que o usuário mantenha manualmente uma quantidade significativa de informações e estruturas auxiliares.

Quando o esforço necessário para registrar ou atualizar um item é alto, existe uma tendência de o acervo ficar desatualizado ou incompleto.

Isso é especialmente problemático para um sistema cujo valor depende da disponibilidade de informações confiáveis sobre a própria coleção.

### 2.4. Dificuldade de recuperar informações relevantes

À medida que o acervo cresce, lembrar onde um item está, quais itens já foram lidos, quais ainda precisam ser lidos ou quais pertencem a determinado conjunto torna-se progressivamente mais difícil.

A simples existência de um registro não é suficiente: é necessário conseguir recuperar essas informações de maneira rápida e compatível com diferentes necessidades momentâneas.

### 2.5. Representação insuficiente do ciclo de leitura

Um estado binário como "lido" e "não lido" não representa adequadamente todos os estados pelos quais um item pode passar.

Um item pode, por exemplo, estar:

* planejado para leitura;
* sendo lido;
* concluído;
* aguardando alguma condição para continuar;
* temporariamente interrompido;
* destinado a ser relido.

O sistema precisa representar o ciclo de vida de forma suficientemente expressiva para apoiar decisões e consultas relacionadas ao acervo.

### 2.6. Necessidade de organização sem excesso de manutenção

O usuário precisa conseguir manter uma representação útil do acervo sem transformar a ferramenta em outra atividade administrativa.

O custo de manter os registros deve ser baixo o suficiente para que o sistema continue sendo utilizado mesmo quando o usuário não estiver disposto a preencher ou atualizar todas as informações disponíveis.

### 2.7. Problema central

Os problemas acima apontam para uma necessidade comum:

> **Uma ferramenta dedicada à gestão do acervo pessoal deve facilitar o registro, recuperação, organização e acompanhamento dos itens sem exigir que o usuário mantenha manualmente uma estrutura complexa para isso.**

O objetivo não é apenas catalogar obras, mas **auxiliar a pessoa a administrar a própria coleção e seu ciclo de vida**, preservando a possibilidade de representar diferentes perspectivas sobre o mesmo acervo.

## 3. Objetivos

### 3.1. Objetivos do produto

1. Tornar o acervo pessoal consultável e administrável com baixa fricção.
2. Facilitar o cadastro rápido mesmo quando as informações estão incompletas.
3. Permitir diferentes formas de organizar e visualizar a mesma coleção.
4. Representar o ciclo de vida de leitura de forma mais precisa do que um único estado "lido/não lido".
5. Facilitar a recuperação de informações e o planejamento do que ler.
6. Substituir planilhas e processos manuais por uma ferramenta dedicada ao domínio do acervo.

### 3.2. Objetivos arquiteturais

1. Construir o sistema com abordagem **local-first**.
2. Começar como **monólito modular**.
3. Projetar fronteiras modulares tendo em vista a evolução para **microsserviços**.
4. Permitir múltiplas interfaces, incluindo Web e CLI, sem duplicar o núcleo do domínio e da aplicação.
5. Manter a arquitetura preparada para evolução incremental sem introduzir distribuição antes da necessidade operacional.

## 4. Princípios do produto

### 4.1. Cadastro incremental

Registrar uma informação parcialmente deve ser melhor do que não registrá-la. O usuário deve poder cadastrar rapidamente e enriquecer os dados depois.

### 4.2. Baixa fricção

A manutenção do acervo não pode depender de disciplina equivalente à manutenção de uma planilha detalhada. O sistema deve reduzir o número de decisões e campos necessários para registrar algo.

### 4.3. A coleção pertence ao usuário

O sistema deve organizar e ajudar a gerir a coleção pessoal. Não deve ter como objetivo principal criar um catálogo universal ou uma experiência social.

### 4.4. Organização é independente da busca

A busca serve para responder a uma necessidade imediata e efêmera. A organização representa uma preferência persistente sobre como o usuário quer estruturar ou visualizar seu acervo.

### 4.5. A organização virtual não deve exigir uma mudança física

A ferramenta deve permitir representar logicamente diferentes organizações do acervo sem exigir a mesma disposição na estante física.

## 5. Escopo da V1

### 5.1. Dentro do escopo

* catálogo pessoal;
* cadastro simplificado e incremental;
* busca no acervo;
* organização e reorganização lógica;
* representação de localização física;
* gestão do ciclo de vida de leitura;
* criação e gestão de coleções pessoais;
* lembretes;
* sugestão e gestão de fila de leitura;
* interface Web;
* armazenamento e operação local;
* estrutura modular compatível com evolução futura para microsserviços.

### 5.2. Fora do escopo da V1

* catálogo universal ou social de livros;
* recursos sociais entre usuários;
* domínio digital de mangas, manhwas, manhuas e outros conteúdos distribuídos em sites;
* agregação de links de sites de leitura;
* integração obrigatória com um conjunto amplo de fontes externas;
* arquitetura distribuída em microsserviços como deployment inicial.

## 6. Funcionalidades principais

### 6.1. Catálogo

Manter os registros do acervo pessoal e as informações conhecidas sobre cada item.

### 6.2. Cadastro simplificado

Permitir registrar um item com o mínimo de informações possível e evoluir o cadastro posteriormente.

### 6.3. Busca

Permitir encontrar rapidamente itens do acervo usando os atributos disponíveis.

A busca é uma operação efêmera: encontrar algo agora não implica que a forma de busca se torne uma organização persistente da coleção.

### 6.4. Sistema de organização

Permitir estruturar a coleção de formas diferentes, potencialmente incluindo agrupamentos, ordenações e outras visões persistentes.

### 6.5. Gestão do ciclo de vida

Registrar estados relevantes do relacionamento do usuário com uma obra ou exemplar, evitando reduzir o processo a "lido" e "não lido".

A taxonomia exata dos estados será consolidada durante a modelagem do domínio.

### 6.6. Coleções

Permitir que o usuário crie agrupamentos próprios para representar interesses, projetos de leitura ou outras formas de segmentar o acervo.

### 6.7. Lembretes e fila de leitura

Permitir registrar intenções futuras e apoiar a decisão sobre o que ler em seguida.

## 7. Requisitos funcionais de alto nível

| ID | Requisito |
| --- | --- |
| FR-01 | O sistema deve permitir cadastrar itens da coleção com informações incompletas. |
| FR-02 | O sistema deve permitir enriquecer e corrigir o cadastro posteriormente. |
| FR-03 | O usuário deve conseguir localizar rapidamente itens do seu acervo. |
| FR-04 | O sistema deve representar localização física dos itens quando aplicável. |
| FR-05 | O usuário deve conseguir manter formas persistentes de organização da coleção. |
| FR-06 | O usuário deve conseguir criar e gerenciar coleções pessoais. |
| FR-07 | O usuário deve conseguir registrar o ciclo de vida de leitura. |
| FR-08 | O usuário deve conseguir registrar lembretes relacionados ao acervo. |
| FR-09 | O sistema deve permitir manter uma fila de leitura. |
| FR-10 | O sistema deve conseguir sugerir itens para a fila de leitura a partir das informações disponíveis. |
| FR-11 | O domínio e os casos de uso devem ser reutilizáveis por diferentes interfaces. |
| FR-12 | O sistema deve operar com prioridade local-first. |

## 8. Requisitos não funcionais / qualidades

| ID | Requisito |
| --- | --- |
| NFR-01 | O sistema deve priorizar operação local e acesso aos dados sem depender de conectividade contínua. |
| NFR-02 | O cadastro e a consulta devem apresentar baixa fricção para o usuário. |
| NFR-03 | A arquitetura deve permitir testes e evolução dos módulos de forma independente sempre que possível. |
| NFR-04 | As fronteiras dos módulos devem ser definidas de forma compatível com futura extração para microsserviços. |
| NFR-05 | O núcleo de domínio não deve depender de uma interface específica. |
| NFR-06 | O sistema deve permitir evolução do modelo sem exigir o preenchimento retroativo imediato de todos os registros. |
| NFR-07 | A arquitetura inicial deve evitar complexidade distribuída desnecessária, sem abandonar o objetivo de evolução para microsserviços. |

## 9. Modelo mental inicial do domínio

O modelo ainda não está fechado, mas os seguintes conceitos já são candidatos centrais:

* **Obra:** representação do conteúdo intelectual catalogado.
* **Exemplar:** instância possuída ou acompanhada pelo usuário.
* **Acervo/Coleção pessoal:** conjunto de itens administrados pelo usuário.
* **Localização:** representação de onde um exemplar está fisicamente guardado.
* **Estado de leitura:** posição do usuário no ciclo de leitura/acompanhamento.
* **Coleção personalizada:** agrupamento definido pelo usuário.
* **Fila de leitura:** conjunto ordenado ou priorizado de itens que o usuário pretende ler.
* **Lembrete:** intenção futura associada a um item ou contexto do acervo.

Esses conceitos são deliberadamente provisórios até a modelagem detalhada do domínio.

## 10. Personas iniciais

### Eloy — leitor de acervo físico

Possui livros físicos, sofre com limitações de espaço e usa hoje uma planilha/Power BI. Valoriza localização, visão geral do acervo, organização lógica e acompanhamento do ciclo de leitura.

### Lucas — leitor digital

É um usuário-alvo futuro. Possui um acervo distribuído em várias fontes e precisa recuperar obras, classificá-las, acompanhar lançamentos e manter uma fila de leitura sem depender de disciplina manual.

## 11. Indicadores de sucesso

A V1 será considerada bem-sucedida se:

1. O usuário conseguir cadastrar rapidamente um livro mesmo sem ter todos os dados em mãos.
2. O usuário conseguir encontrar um livro sem depender da disposição atual da estante.
3. O usuário conseguir representar mais de uma organização útil sobre o mesmo acervo.
4. O usuário conseguir entender o que está lendo, o que terminou e o que pretende ler em seguida.
5. A manutenção do acervo for percebida como mais simples do que manter uma planilha manual equivalente.

## 12. Questões em aberto

* Quais estados de ciclo de vida serão oficialmente suportados?
* Qual é a relação exata entre Obra e Exemplar?
* Quais formas de organização são necessárias na V1?
* Como coleções interagem com organizações e localização física?
* Como a fila de leitura será priorizada e sugerida?
* Qual mecanismo de armazenamento local será adotado?
* Quais módulos constituirão as primeiras fronteiras do monólito?
* Como e quando os módulos serão extraídos para serviços independentes?

## 13. Critério de evolução

Novas funcionalidades devem ser avaliadas primeiro pelo problema de gestão do acervo que resolvem. A adição de funcionalidades que reproduzem comportamentos de catálogos sociais ou agregadores de mídia deve ser evitada quando não contribuir diretamente para a gestão pessoal do acervo.
