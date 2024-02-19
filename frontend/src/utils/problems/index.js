import {twoSum} from "./two-sum";
import {validParentheses} from "./valid-parentheses";
import {jumpGame} from "./jump-game";
import {reverseLinkedList} from "./reverse-linked-list";

export const equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

export const getProblemData = (problemId) => {
    switch (problemId) {
        case 'two-sum':
            return twoSum
        case 'valid-parentheses':
            return validParentheses
        case 'jump-game':
            return jumpGame
        case 'reverse-linked-list':
            return reverseLinkedList
        default:
            return
    }
}