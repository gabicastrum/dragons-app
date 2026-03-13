# 🐉 Dragon APP — Desafio React

> Aplicação frontend desenvolvida em React para gerenciamento de dragões, consumindo uma API com as operações CRUD.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| ⚛️ **React** | Biblioteca principal para construção da interface |
| 🪝 **React Hooks** | Controle de estados e efeitos colaterais |
| 🛣️ **React Router DOM** | Gerenciamento de rotas da aplicação |
| 🟦 **TypeScript** | Tipagem estática |
| 🌐 **HTML & CSS** | Estrutura e estilização da interface |
| ⚡ **Vite** | Ferramenta de build |
| 🧪 **Vitest** | Framework de testes unitários |
| 🧰 **React Testing Library** | Simulação de interação do usuário nos testes |
| ✅ **Jest-DOM** | Extensão para verificações de elementos do DOM |

---

## 📡 Endpoints Implementados

Todos os endpoints da API foram implementados e integrados na aplicação:

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/v1/dragon` | Lista todos os dragões |
| `GET` | `/api/v1/dragon/:id` | Retorna os detalhes de um dragão específico |
| `POST` | `/api/v1/dragon` | Cria um novo dragão |
| `PUT` | `/api/v1/dragon/:id` | Edita os dados de um dragão existente |
| `DELETE` | `/api/v1/dragon/:id` | Remove um dragão |

### 🚣🏽‍♀️ Acesso para navegar no sistema: 

- E-mail: admin@dragoes.com
- Senha: SenhaForte@123

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabicastrum/dragons-app.git

# Acesse a pasta do projeto
cd dragons-app

# Instale as dependências
npm install
```

### Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Executa os testes
npm run test

# Gera o relatório de cobertura de testes
npm run coverage

# Abre a interface visual do Vitest
npm run test:ui
```
---

<p align="center">Feito com apoio de ☕ por <strong> 👩‍💻 Gabriela de Castro Laurindo</strong></p>