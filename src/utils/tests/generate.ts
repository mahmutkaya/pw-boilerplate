import env from '../../helpers/environmentVariables';
import log from '../../helpers/logging/logging';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

export const generateUuid = () => {
  return uuidv4();
};

export const getEnvironmentValue = () => {
  const value = env.ENV_NAME;
  return value === 'development' ? 'dev' : 'acc';
};

export const getParameterValue = (input: string) => {
  const regexp = /\((.+?)\)/;

  if (!input.match(regexp)) {
    return input;
  }

  const groups = input.match(regexp) ?? '';
  return groups[1].replace(/ /g, '');
};

export const generateSentence = (stringLength: number) => {
  const string: string = faker.lorem.sentence(stringLength).slice(0, stringLength);
  const lastCharacter = string.substring(stringLength - 1, stringLength);
  return lastCharacter === ' ' ? string.slice(0, -1) + '.' : string;
};

const getLastDayOfCurrentMonth = () => {
  const currentDate = new Date();
  currentDate.setDate(0);
  return DateTime.fromJSDate(currentDate).toFormat('yyyy-MM-dd');
};

export const generateValue = (valueToGenerate: string) => {
  let value!: string;
  let iban!: string;
  const ibanRegex =
    /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/i;
  const parameterValue: string = getParameterValue(valueToGenerate);

  log.debug(`valueToGenerate = ${valueToGenerate}`);

  switch (valueToGenerate) {
    case 'getEnvironmentValue':
      value = getEnvironmentValue();
      break;

    case 'randomUuid':
      value = generateUuid();
      break;

    case 'timestamp':
      value = String(new Date().getTime());
      break;

    case 'currentISOTimestamp':
      value = String(new Date().toISOString());
      break;

    case 'randomEmail':
      value = `test_${generateUuid()}@atbank.nl`;
      break;

    case 'lastDayOfCurrentMonth':
      value = getLastDayOfCurrentMonth();
      break;

    case 'randomFirstName':
      value = faker.name.firstName();
      break;

    case 'randomPhoneNumber':
      value = String(faker.random.number({ min: 100000000, max: 999999999 }));
      break;

    case 'randomLastName':
      value = faker.name.lastName();
      break;

    case 'randomBirthDate':
      value = DateTime.fromJSDate(faker.date.between('1935-01-01', '2000-01-01')).toISODate();
      break;

    case 'todayBirthDate':
      value = DateTime.now().toFormat('yyyy-MM-dd');
      break;

    case 'randomIban':
      while (!ibanRegex.test(iban)) {
        iban = faker.finance.iban();
      }

      value = iban;
      break;

    case 'getTestingBic':
      value = 'ABNANL5A';
      break;

    case 'getTestingIban':
      value = 'NL66ATBA6321207233';
      break;

    case 'randomBic':
      value = faker.finance.bic();
      break;

    case 'randomCompanyName':
      value = faker.company.companyName();
      break;

    case `randomStringOfLength(${parameterValue})`:
      value = generateSentence(Number(parameterValue));
      break;
  }

  log.debug(`generatedValue = ${value}`);

  return value;
};
