export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const isValid = value => {
  return typeof (value) !== 'undefined' && value !== null && value > 0;
}
