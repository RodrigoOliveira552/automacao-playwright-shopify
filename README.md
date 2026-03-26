# 🎭 Playwright E2E Automation - Sauce Demo Shopify

Este projeto apresenta uma suíte de testes automatizados de ponta a ponta (E2E) para a plataforma de e-commerce **Sauce Demo Shopify**. A arquitetura foi desenvolvida focando em **escalabilidade, manutenção simplificada e resiliência**.

## 🚀 Diferenciais do Projeto
- **Page Object Model (POM):** Implementação rigorosa para separação de responsabilidades.
- **Locators por Acessibilidade:** Uso de `getByRole` e `getByTitle`, garantindo testes que não quebram com mudanças simples de CSS.
- **CI/CD Integrado:** Pipeline configurado via **GitHub Actions** para execução automática em cada push.
- **Relatórios Detalhados:** Configuração de trace, vídeo e screenshots para análise de falhas.

## 🛠️ Tecnologias Utilizadas
- **Playwright** (Engine de Automação)
- **Node.js / JavaScript** (Linguagem)
- **GitHub Actions** (Integração Contínua)

## 📋 Cenários de Teste (Home Page)
- **CT01:** Validação de Identidade Visual e Integridade de URL.
- **CT02:** Fluxo de navegação institucional (About Us) com retorno seguro à Home.
- **CT03:** Verificação de carregamento da vitrine de produtos.
- **CT04:** Redirecionamento funcional para a seção de Blog.
- **CT05:** Fluxo de busca no Footer e persistência de navegação.

## ⚙️ Como Executar
1. Instale as dependências: `npm install`
2. Instale os browsers: `npx playwright install`
3. Execute os testes: `npx playwright test --headed`