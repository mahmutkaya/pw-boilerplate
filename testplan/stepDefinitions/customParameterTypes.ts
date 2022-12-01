import { defineParameterType } from '@cucumber/cucumber';

defineParameterType({
  name: 'requestTypes',
  regexp: /POST|GET|PATCH|DELETE/,
  transformer: (parameter) => parameter,
});
