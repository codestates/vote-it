import { Transform } from 'class-transformer';

export function NumericTransform() {
  return Transform(({ value }) => stringToNumeric(value));
}

function stringToNumeric(value: string) {
  const valueIsNumeric = /^-?\d+$/.test(value);
  return valueIsNumeric ? parseInt(value, 10) : value;
}
