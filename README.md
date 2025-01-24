# Ganhos e Gastos - Back-End

O **Ganhos e Gastos** é uma plataforma web desenvolvida para auxiliar usuários no gerenciamento de suas finanças pessoais, permitindo o acompanhamento detalhado de receitas e despesas. Esta seção refere-se à parte de back-end da aplicação.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express.js**: Framework minimalista para Node.js, facilitando a criação de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados financeiros.
- **Mongoose**: Biblioteca ODM para MongoDB, simplificando a interação com o banco de dados.
- **Firebase Authentication**: Serviço para autenticação de usuários de forma segura e escalável.
- **Render**: Plataforma de cloud utilizada para deploy e hospedagem do back-end.

## Funcionalidades

- **Autenticação de Usuários**: Implementação de login e registro de usuários utilizando Firebase Authentication, garantindo segurança e escalabilidade.
- **Gerenciamento de Despesas**: Endpoints para criação, leitura, atualização e exclusão de registros de despesas.
- **Dashboard de Despesas**: Endpoint que fornece dados agregados sobre as despesas do usuário, facilitando a visualização e análise financeira.


## Design de código e organização das pastas

### Clean Architecture no Projeto

A **Clean Architecture** foi aplicada no projeto para garantir uma separação clara de responsabilidades e facilitar a manutenção, escalabilidade e testabilidade do sistema. A arquitetura é dividida em camadas que se comunicam de forma desacoplada:

1. **Camada de Interface**: Responsável por interagir com o usuário, como os controladores de API (`chat-controller`, `despesa-controller`).
2. **Camada de Aplicação**: Contém os casos de uso e regras de negócio, como `create-chat-use-case` e `create-despesa-use-case`.
3. **Camada de Domínio**: Define os modelos de dados, como a entidade `Despesa`.
4. **Camada de Infraestrutura**: Implementa a persistência dos dados e integrações externas, como os repositórios de `chat` e `despesa`.

### Inversão de Injeção de Dependência

A **Inversão de Injeção de Dependências** é uma prática que visa desacoplar componentes do sistema, onde as dependências são injetadas em vez de serem criadas diretamente nas classes. Isso é alcançado no projeto através de um mecanismo de injeção de dependências usada para passar instâncias de casos de uso e repositórios para os controladores (`chatController`, `despesaController`).

````
src/
├── application/
│   ├── repositories/
│   │   ├── chat-repository.ts
│   │   └── despesa-repository.ts
│   ├── usecases/
│   │   ├── create-chat-use-case.ts
│   │   ├── create-despesa-use-case.ts
│   │   └── get-despesas-by-user-use-case.ts
├── domain/
│   └── despesa.ts
├── infrastructure/
│   ├── database/
│   │   ├── connection.ts
│   │   ├── model.ts
│   │   └── repository.ts
│   ├── genai/
│   │   ├── connection.ts
│   │   └── repository.ts
│   └── utils/
│       └── config.ts
├── interface/
│   ├── chat-controller.ts
│   ├── despesa-controller.ts
│   └── index.ts

````
Observação: Para uma experiência completa, é recomendável utilizar o front-end correspondente, disponível em:

Repositório do front-end: https://github.com/SilvaCris/controle-gastos