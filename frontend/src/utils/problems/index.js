import {twoSum} from "./two-sum";
import {validParentheses} from "./valid-parentheses";

export const getProblemData = (problemId) => {
    switch (problemId) {
        case 'two-sum':
            return twoSum
        case 'valid-parentheses':
            return validParentheses
        default:
            return
    }
}