# Ryanair Test — Playwright

This repository contains a **Test Document** and an end-to-end **automation test built with [Playwright](https://playwright.dev/)** for the [Ryanair](https://www.ryanair.com/) website.

## Overview

The project automates a typical flight-booking journey on Ryanair, following the user story:

> As a user I want to book a flight from Porto to Milan so that I can travel for a weekend in August.

The automated scenario covers the main steps of the booking flow:

- **TC01 — Search for valid flights:** open the Ryanair homepage, accept cookies, pick the destination (Milan), choose departure and return dates in August, and run the search.
- **TC02 — Select basic fare:** select the outbound and return flights and continue with the Basic fare, then fill in the passenger details.
- **TC03 — Skip seat selection:** continue through the booking flow without choosing seats.

Each step includes assertions to verify that the application behaves as expected throughout the journey.

## Repository structure

```
.
├── .github/workflows/
│   └── playwright.yml                # CI workflow that runs the tests on push / pull request
├── Docs/
│   └── Test_Document_Ryanair.xlsx    # Manual test documentation
├── tests/
│   └── Ryanair.spec.js               # Playwright automation test
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js              # Playwright configuration
```

## Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

## Setup

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Brunolzx/Ryanair_test_playwright.git
cd Ryanair_test_playwright
npm install
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Running the tests

Run all tests:

```bash
npx playwright test
```

Run the tests in headed mode (visible browser):

```bash
npx playwright test --headed
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## Configuration

The test configuration is defined in `playwright.config.js`. By default the tests:

- Run from the `./tests` directory
- Run fully in parallel
- Target the **Chromium** browser (Desktop Chrome)
- Use the `html` reporter
- Collect a trace on the first retry

## Continuous Integration

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the Playwright tests automatically on every `push` and `pull_request` targeting the `main` / `master` branches. The generated `playwright-report` is uploaded as a build artifact and retained for 30 days.

## Test documentation

The `Docs/` folder contains `Test_Document_Ryanair.xlsx`, the manual test documentation describing the test cases for the Ryanair booking flow.

## Author

**Bruno Moreira**
