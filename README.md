## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installing/Run locally

- Make sure you have `nodejs`, `postgres` installed.

- Clone or fork repo🤷‍♂

  ```bash
    - git clone https://github.com/meetKazuki/QuickCredit.git
    - cd QuickCredit
    - npm install
  ```

- Create a PostgreSQL database by running the command below in `psql`

  ```bash
    createdb -h localhost -p 5432 -U postgres quickdev
  ```

- Create/configure `.env` environment with your credentials. A sample `.env.example` file has been provided to get you started. Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials.

- Run `npm run start:dev` to start the server and watch for changes

### Testing

Test specs are implemented using [_mocha_](https://mochajs.org) & [_chai_](https://chiajs.com).

- To test or consume the API locally, you can make use of [_Postman_](https://www.getpostman.com) to simulate a front-end client.

- If you want to take the step below, first create a PostgreSQL database by running the command below in `psql`.

  ```bash
   createdb -h localhost -p 5432 -U postgres quicktest
  ```

- There is also a test script that you can fire up by running `npm test`. `npm test` performs a single full test suite run, including code coverage reporting.

## Resources
* The `Response` class and all its methods were originally implemented by Steven Victor. The tutorial that I followed can be found [here](https://github.com/victorsteven/Book-app-NodeJS-PostgreSQL-Travis-Coveralls-Code-Climate)