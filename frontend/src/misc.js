import axios from "axios";

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

export const languageCodes = {
    54: 'C++',
    94: 'Type Script',
    83: 'Swift',
    72: 'Ruby',
    71: 'Python',
    68: 'PHP',
    93: 'Java Script',
    62: 'Java',
    95: 'GO',
    51: 'C#'
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const handleRequest = async () => {
    const config = {
        headers: {
            'X-RapidAPI-Key': 'd01ff1e4e9msh7c776ea78f5da42p14d486jsnf48c931f157a',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'content-type': 'application/json',
        }
    }

    // const response = await axios.get('https://ce.judge0.com/languages/', config)
    // console.log(response)

    // const body = {
    //     'language_id': 71,
    //     'source_code': "print('hello world!')",
    //     'expected_output': 'hello world!'
    // }
    //
    // const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', body, config)
    // console.log(response)

    const response = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/08a28ca5-bc4d-4941-9e32-af43463ea3a7`, config)
    console.log(response)
}