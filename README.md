# Supertest API with Jest — TypeScript Reference

[![CI](https://github.com/lucas-porto1/supertest-api-jest-ts/actions/workflows/api-tests.yml/badge.svg?branch=main)](https://github.com/lucas-porto1/supertest-api-jest-ts/actions/workflows/api-tests.yml)

_Part of [Lucas Porto's QA Automation Reference Collection](https://github.com/lucas-porto1): QA-first templates built for readability, reproducibility, and sustainable maintenance._

A TypeScript reference architecture for API test automation with Supertest, Jest, Joi, reusable endpoint modules, response contract validation, static type checking, coverage, and CI execution.

## Design principles

- **Tests describe behavior:** status, payload, and contract expectations belong in `*.spec.ts` files.
- **Endpoints encapsulate API interactions:** each resource file keeps its path and typed HTTP request functions together.
- **The API client stays focused:** it centralizes only the base URL and shared Supertest instance.
- **Test data stays explicit:** typed request payload builders, exact expected responses, and response schemas have separate responsibilities.
- **Types complement runtime validation:** TypeScript checks code usage while Joi validates actual API responses.
- **Jest remains visible:** tests use its native assertions, runner, parallel execution, watch mode, and coverage.
- **Tests remain deterministic:** scenarios use known records rather than random identifiers.
- **Configuration fails fast:** required environment variables are validated with actionable messages.

## Prerequisites

- Node.js 24 LTS
- npm
- A free [ReqRes API key](https://reqres.in/signup)

The `.nvmrc` file allows compatible Node version managers such as nvm or fnm to select Node.js 24 with `nvm use` or `fnm use`.

## Getting started

```bash
git clone https://github.com/lucas-porto1/supertest-api-jest-ts.git
cd supertest-api-jest-ts
npm ci
```

Create the local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Replace `API_KEY` with a key from ReqRes. Never commit `.env` or real API keys.

## Running the tests

```bash
npm test                  # run the complete API suite
npm run test:watch        # rerun related tests while files change
npm run test:coverage     # generate text, HTML, and LCOV coverage reports
npm run typecheck         # validate TypeScript types without emitting files
npm run lint              # static analysis, including focused-test protection
npm run format            # format project files
npm run format:check      # verify formatting without changing files
npm run check             # lint, formatting, types, and tests
```

Jest runs test files in parallel by default. For sequential debugging, use:

```bash
npm test -- --runInBand
```

## Project structure

```text
.
|-- .github/
|   |-- workflows/                # continuous integration pipeline
|   `-- dependabot.yml            # semiannual dependency update configuration
|-- config/                        # typed and validated environment configuration
|-- core/                          # shared Supertest instance and base URL
|-- endpoints/                     # typed resource files with paths and HTTP functions
|   |-- auth/
|   |   |-- login.ts
|   |   `-- register.ts
|   `-- users/
|       `-- users.ts
|-- test-data/
|   |-- requests/                  # typed request payload builders
|   `-- responses/
|       |-- expected/              # exact response bodies used in assertions
|       `-- schemas/               # Joi response contracts
|-- tests/                         # behavior-focused Jest API scenarios
|-- jest.config.js                 # Jest, ESM, timeout, and coverage configuration
|-- eslint.config.js               # TypeScript and Jest quality rules
|-- tsconfig.json                  # strict TypeScript configuration
`-- package.json                   # scripts and dependencies
```

## Request flow

```text
Test -> Endpoint -> API client
```

For example, a test calls `postLogin()` from `endpoints/auth/login.ts`. That file keeps the `/login` path, typed payload, and complete request construction together, while `core/apiClient.ts` only provides the Supertest instance with the configured base URL.

## Jest and TypeScript

Jest provides the test runner, assertions, watch mode, parallel test-file execution, mocks, and coverage. `ts-jest` transforms TypeScript for Jest while `tsc --noEmit` performs the authoritative static type check. Tests import APIs from `@jest/globals` explicitly, which keeps ESM usage clear and avoids hidden globals.

The package scripts start Jest through Node's VM modules support because this template uses native ESM. Source imports use `.js` extensions to follow Node.js ESM resolution; TypeScript and `ts-jest` resolve them to the corresponding `.ts` files during development and test execution.

## Type safety and runtime validation

TypeScript validates configuration, payloads, endpoint parameters, and code usage. It cannot guarantee what an external API sends at runtime, so Joi schemas validate the real response body. Return types that Supertest can infer are intentionally not repeated, keeping the tests concise.

## Payload strategies

The project demonstrates two payload factory strategies:

- `createAuthPayload()` includes only explicitly provided fields, which is useful for negative scenarios that distinguish an omitted field from an empty value.
- `createUserPayload()` starts with complete valid defaults and accepts typed overrides, including a nested address merge, which keeps larger payloads readable.

Choose the simplest strategy that matches the payload and scenario instead of forcing every request through one generic builder.

## Adding an endpoint

1. Create or update the resource file in `endpoints/`, keeping its path and supported HTTP methods together.
2. Define request types close to their payload builders when they improve safety or reuse.
3. Add request payload builders or expected responses only when they are reused or improve readability.
4. Add or update a Joi schema for the response contract.
5. Write behavior and assertions in a `*.spec.ts` file under the relevant domain in `tests/`.
6. Run `npm run check` before submitting the change.

## Coverage

`npm run test:coverage` instruments the project source and writes HTML and LCOV reports under `coverage/`. The folder is ignored by Git. No arbitrary coverage threshold is enforced in the template; teams should define one after understanding the risk and test strategy of the real project.

## CI configuration

The workflow runs linting, formatting validation, type checking, and Jest API tests on pushes and pull requests. ESLint rejects committed focused tests such as `test.only`, while intentional skipped tests remain allowed.

Add the ReqRes key as a GitHub Actions repository secret named `REQRES_API_KEY`. Because workflows triggered by Dependabot cannot access regular Actions secrets, add the same key as a Dependabot repository secret with the same name so its pull requests can run the API tests.

Dependabot checks npm packages and GitHub Actions twice a year and opens grouped pull requests for minor and patch updates. Major updates remain separate so breaking changes can be reviewed carefully. TypeScript major updates are held until `ts-jest` supports them, and `@types/node` remains on the same major version as the Node.js runtime.

Public example credentials can remain in the workflow, but API keys and credentials for real systems must always use repository secrets.
