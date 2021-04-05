# Sobre

- [Instalação](#instalação)
- [Rodar o projeto](#rodar-o-projeto)
- [Teste AB](#teste-ab)
- [LinkedIn](#linkedin)
- [Testes](#testes)
- [Performance e métricas](#performance-e-métricas)
- [Porque dois projetos?](#porque-dois-projetos)
- [Light House](#light-house)
- [Boilerplate](#boilerplate)
- [Referências](#referências)

Projeto iniciado para uma vaga e posteriormente usado para estudos. Compare a [master](https://github1s.com/jefferson-william/candidate-form-next) com a [refactor](https://github1s.com/jefferson-william/candidate-form-next/tree/refactor) para ver os benefícios.

Os estudos estão aplicados neste [PR #15](https://github.com/jefferson-william/candidate-form-next/pull/15) que contempla:

- Melhoras práticas para escrita e organização dos testes;
- Aplicado lógicas e regras de forma centralizada com Hooks;
- Estrutura de pastas modular e Atomic Design visando escalabilidade.

### Instalação

```bash
git clone https://github.com/jefferson-william/candidate-form-next.git
cd candidate-form-next
yarn install
```

### Rodar o projeto

```bash
yarn dev
# yarn build ; yarn start
```

Ferramentas e integração com terceiros podem não funcionar sem as variáveis de ambiente preenchidas ao rodar localmente.

Caso tenha as variáveis de ambiente, preencha o arquivo após executar `cp .env.development .env.local`.

Para evitar isso, veja o projeto em produção.

- https://candidate-form-next.vercel.app

### Teste AB

O teste ab foi aplicado as abas. Elas podem exibir ou não de acordo com a variação do teste. Para testar, [acesse o projeto](https://candidate-form-next.vercel.app) em abas anônimas repetidas vezes até identificar que o teste variou.

Criei contas para o Google Analytics, TagManager e **Optimize**.

As configurações estão em minhas contas pessoas dentre dessas ferramentas.

Exemplos de variáveis que usei estão no `env.development`.

### LinkedIn

Implementei a integração com LinkedIn. Foi minha primeira implementação com essa plataforma. Passei por alguns descobertas mas foi interessante.

Caso queira saber mais detalhes e obter referências, todas estão nos PRs ligados ao LinkedIn.

Exemplos de variáveis que usei estão no `env.development`.

### Testes

Não tive tempo ainda de fazer os testes. Devo fazer o mais breve.

### Performance e métricas

Mais detalhes no PR https://github.com/jefferson-william/candidate-form-next/pull/12.

### Cadê o DevOPS?

Não achei sentido em aplicar ferramentas e serviços para um projeto de frontend.

### Porque dois projetos?

Com React, as variáveis p/ integração com LinkedIn e etc, iriam ficar expostas. Ao notar isso, comecei outro projeto em NextJS.

Mais detalhes neste PR https://github.com/jefferson-william/candidate-form-next/pull/2.

- https://github.com/jefferson-william/candidate-form
- https://github.com/jefferson-william/candidate-form-next

### Light House

```bash
yarn global add lighthouse
lighthouse http://localhost:3000 --budget-path=./budget.json --chrome-flags="--headless" --view # or
lighthouse https://candidate-form-next.vercel.app --budget-path=./budget.json --chrome-flags="--headless" --view # or
```

### Boilerplate

Veja a documentação do boilerplate usado neste projeto.

- https://github.com/jefferson-william/next-boilerplate

### Licença e política de uso

Este projeto está licenciado nos termos da licença GPLv3.

Copyright 2021 Jefferson William Machado Desenvolvimento de Software.

### Referências

- https://create-react-app.dev/docs/getting-started/
- https://nextjs.org/learn/basics/getting-started
- https://web.dev/use-lighthouse-for-performance-budgets
