# Finance Dashboard API
Bem-vindo ao repositório do **Finance Dashboard API**! Este projeto foi desenvolvido para fornecer uma API robusta e escalável para gerenciar e monitorar dados financeiros.

![image](https://github.com/user-attachments/assets/f1715f37-eee4-4629-87b7-bd236417ae64)

## 📝 Descrição

A **Finance Dashboard API** é uma solução backend desenvolvida para lidar com operações financeiras, como rastreamento de despesas, receitas e geração de relatórios. O objetivo principal é servir como a base para um painel financeiro completo.

A API foi construída utilizando boas práticas de desenvolvimento, incluindo:
- Uso do **Prisma** para gerenciamento de banco de dados.
- Implementação de testes com **Jest**.
- Estilização e formatação de código com **ESLint** e **Prettier**.
- Suporte para configuração e execução em contêineres via **Docker**.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma** (ORM)
- **PostgreSQL** (Banco de dados)
- **Docker** (Containerização)
- **Jest** (Testes)
- **Swagger** (Documentação da API)
- **ESLint** e **Prettier** (Qualidade e padronização do código)

## 📚 Documentação

A documentação completa da API está disponível no Swagger. Você pode acessá-la no seguinte link:

👉 [Swagger UI - Finance Dashboard API](https://finance-dashboard-api-ip86.onrender.com/docs/#/)

No Swagger, você encontrará detalhes sobre os endpoints disponíveis, exemplos de requisições e respostas e também os contratos dos dados.


```bash
## 🛠️ Configuração do Ambiente de Desenvolvimento

Siga os passos abaixo para configurar o ambiente local.

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **Docker** (opcional, para rodar a aplicação em contêineres)
- Um gerenciador de pacotes como **npm** ou **yarn**

### Passo 1: Clonar o Repositório

Clone este repositório para o seu computador:

git clone https://github.com/JoaoGomesss/finance_dashboard_api.git
cd finance_dashboard_api

### Passo 2: Instalar Dependências

Instale as dependências do projeto usando npm ou yarn:
npm install
# ou
yarn install

### Passo 3: Configurar as Variáveis de Ambiente

Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente necessárias:

DATABASE_URL=postgresql://<user>:<password>@localhost:5432/finance_dashboard
PORT=3000
Certifique-se de que a URL do banco de dados e outras variáveis estão corretas.

### Passo 4: Executar a Aplicação

Inicie a aplicação localmente:

npm run dev
A API estará disponível em http://localhost:3000.

Usando Docker
Caso prefira usar Docker:

Certifique-se de que o Docker está instalado e executando.
Suba os contêineres usando o comando:
docker-compose up

A API será disponibilizada no endereço configurado no arquivo docker-compose.yaml.

### Passo 5: Rodar Testes

Execute os testes automatizados com o comando:
npm test

📦 Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:

finance_dashboard_api/
├── .husky/               # Hooks do Git configurados pelo Husky
├── .github/workflows/    # Configurações de CI/CD
├── docs/                 # Documentação adicional
├── prisma/               # Configurações do Prisma
├── src/                  # Código-fonte da aplicação
│   ├── controllers/      # Controladores da API
│   ├── middlewares/      # Middlewares para validação e autenticação
│   ├── models/           # Modelos de dados
│   ├── routes/           # Rotas da API
│   └── services/         # Lógica de negócios
├── .env.example          # Exemplo de variáveis de ambiente
├── .lintstagedrc.json    # Configuração do lint-staged
├── .prettierrc.json      # Configuração do Prettier
├── docker-compose.yaml   # Configuração do Docker Compose
├── package.json          # Dependências e scripts
└── README.md             # Documentação do projeto

🤝 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias no projeto.

Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas alterações (git commit -m 'Adiciona nova feature').
Suba sua branch (git push origin feature/nova-feature).
Abra um Pull Request.

🛡️ Licença
Este projeto não possui uma licença definida no momento.

📬 Contato
Se você tiver dúvidas ou sugestões, sinta-se à vontade para entrar em contato
Email: jowgomes3@gmail.com
