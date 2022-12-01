const common = `
  --require-module ts-node/register
  --require src/**/*.ts
  --require projects/**/*.ts
  --format json:reports/report.json 
  --format message:reports/report.ndjson
  --format html:reports/report.html
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  --format @cucumber/pretty-formatter
  `;

const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};
