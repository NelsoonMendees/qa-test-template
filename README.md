# Testes API / E2E - Ploomes

> Projeto de testes automatizados API / E2E - Teste QA Ploomes

## Tecnologias

> Framework: Cypress 12.2.0
> Reporter: Allure Report 2.34.0

## Configurar projeto

> Para gerar reports com Allure Report é necessário ter instalado JAVA 8 ou superior e JAVA_HOME configurado.

> Terminal recomendado: Git Bash (necessário para executar os comandos de gerar report)

```bash
# instalar dependencias
npm install
```

## Executar testes - CLI

```bash
# Allure reporter (local) - Utilizar terminal Git Bash
npm run cy:allure:report
# Ao finalizar execução digitar
npm run allure:open
```

```bash
# Executar sem gerar report
npx cypress run
```

## Abrir interface do Cypress

```bash
# cypress runner
npm run cy:open
```

## Apagar reports

```bash
# apagar arquivos de reports nos diretorios
npm run allure:clear
```

## Observações

> Ao realizar os testes de API, tanto em POST /Contacts e /Deals foi possivel utilizar o mesmo documento e nome sem validação de cadastro já existente.

> Front-end possui alguns erros sem tratamento que acarretam em erros na execução via Cypress. O mesmo intercepta todas as requisições realizadas em background no navegador e o teste é encerrado caso ocorra algum erro de uncaught:exception.

> Devido a quantidade de requisições realizadas no front a performance é afetada e o processo de login se torna lento.

> É possivel cadastrar Cliente ou Negocio sem informar qualquer tipo de dado e os campos nome e documento não possuem validação de campo obrigatório. (Como não tenho conhecimento da regra de negocios creio que seja bug)

> Front-End não possui tags de [data-test='input-nome'], [data-id='input-nome'] ou [data-cy='input-nome'] a implementação destas tags ajudam o time de qualidade a indentificar os seletores CSS contribuindo em uma maior assertividade na execução dos testes e facilitando a manutenção do mesmo. O uso destas tags também são uma boa pratica para projetos que possuem testes automatizados.
