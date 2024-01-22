export const monthDictionary = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

export const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

export const isBase64 = (str) => {
    const base64Regex = /^(data:image\/[a-zA-Z]+;base64,)?([A-Za-z0-9+/]+={0,2})(\s|\r|\n)*$/;
    return base64Regex.test(str);
}
