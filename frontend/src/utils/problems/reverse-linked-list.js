import {equalsCheck} from "./index";

const startCode = `function reverseLinkedList(head) {
 // Write your own code or uncomment the sample code below!
 
 // if (head === null) {
 //   return head;
 // }
 
 // let current = head;
 // let previous = null;
 
 // while (current !== null) {
 //   let temp = current.next;
 //   current.next = previous;
 //   previous = current;
 //   current = temp;
 // }
 
 // return previous;
};`

const testCases = [
    {
        parameters: [{h: [1, 2, 3, 4, 5]}],
        expectedOutput: [5, 4, 3, 2, 1]
    },
    {
        parameters: [{h: [1, 2, 3]}],
        expectedOutput: [3, 2, 1]
    },
    {
        parameters: [{h: [1]}],
        expectedOutput: [1]
    },
]

function createLinkedList(values) {
    const head = new LinkedList(values[0])
    let current = head
    for (let i = 1; i < values.length; i++) {
        const node = new LinkedList(values[i])
        current.next = node
        current = node
    }
    return head
}

class LinkedList {
    constructor(value) {
        this.value = value
        this.next = null
    }

    reverse() {
        let current = this
        let prev = null
        while (current !== null) {
            const next = current.next
            current.next = prev
            prev = current
            current = next
        }
        return prev
    }
}


function getListValues(head) {
    const values = []
    let current = head
    while (current !== null) {
        values.push(current.value)
        current = current.next
    }
    return values
}


const handlerFunction = (fn) => {
    const results = []
    const resultsTF = []
    let success = true

    for (let i = 0; i < testCases.length; i++) {
        const values = testCases[i].parameters.map(param => {
            const key = Object.keys(param)[0]
            return createLinkedList(param[key])
        })
        const result = fn(...values)
        results[i] = result
        if (equalsCheck(getListValues(result), testCases[i].expectedOutput)) {
            resultsTF[i] = true
        } else {
            resultsTF[i] = false
            success = false
        }
    }

    return [results, resultsTF, success]
}

export const reverseLinkedList = {
    id: 'reverse-linked-list',
    title: "Reverse Linked List",
    statement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>`,
    examples: [
        {
            id: 0,
            inputText: "head = [1,2,3,4,5]",
            outputText: "[5,4,3,2,1]",
            img: 'https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg',
        },
        {
            id: 1,
            inputText: "head = [1,2,3]",
            outputText: "[3,2,1]",
        },
    ],
    constraints: `<li>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>
<li><code>-5000 <= Node.val <= 5000</code></li>`,
    handlerFunction: handlerFunction,
    startCode: startCode,
    testCases: testCases
}