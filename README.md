Objetivo:
Integrar com API pública do TMDB(The Movie Database), possibilitando pesquisas e filtragem dos filmes. Implementar controle de acesso, ou seja, deveremos poder nos cadastrar e efetuar login.
O consumo da API do TMDB não deve ficar exposta. Deve ser consumida pelo backend.
Instruções
Cadastro de usuários
Crie um endpoint para que novos usuários possam se registrar na aplicação.
Autenticação de usuários
Implemente o fluxo completo de autenticação, utilizando JWT para proteção de rotas privadas.
Integração com a API pública do TMDB (The Movie Database)
Crie um endpoint que busque filme pelo nome.
Crie um endpoint que liste todos os filmes.
Crie um endpoint que traga o detalhe de um filme.
Crie um endpoint que o usuário possa favoritar um filme.
Crie um endpoint para que o usuário possa visualizar a lista dos filmes favoritos.
Crie um endpoint para que seja possível remover filmes favoritos.
Disponibilizar logs de acessos quando o usuário efetuou o login.
Logs de visualização de um filme
Quando o usuário abrir o detalhe de um filme, registrar essa visualização.
Crie um endpoint que liste os últimos logs de filmes visualizados.
Diferenciais:
Adicionar cache para chamadas repetidas ao TMDB, evitando chamadas desnecessárias a API;
Implementar tratamento global de erros;
O que esperamos da entrega:
Instrução de instalação e execução;
Documentação da API;
Enviar o projeto zipado;
Todas as listagens(listagem geral e favoritos) devem possuir paginação;
É obrigatório o uso de NodeJs ≥ 18;
É obrigatório o uso do TypeScript;
Não deve ser utilizado nenhum tipo de ORM;
Recomendado banco de dados MySQL;
Avaliação
Entre os critérios de avaliação estão:
Clareza e organização de código;
Documentação de código e do projeto;
Tipagem do código com TypeScript;
Tempo para realização do Desafio: 7 dias corridos.