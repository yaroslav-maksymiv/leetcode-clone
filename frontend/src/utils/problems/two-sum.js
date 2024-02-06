const startCode = `function twoSum(nums, target) {
  // const hashTable = {}
  // for (let i=0; i<nums.length; i++) {
  //   let neededVal = target - nums[i]
  //   if (!(neededVal in hashTable)) {
  //     hashTable[nums[i]] = i
  //   } else {
  //     return [hashTable[neededVal],i]
  //   }
  // }
}`

const testCases = [
    {
        parameters: [{nums: [2, 7, 11, 15]}, {target: 9}],
        expectedOutput: [0, 1]
    },
    {
        parameters: [{nums: [3, 2, 4]}, {target: 6}],
        expectedOutput: [1, 2]
    },
    {
        parameters: [{nums: [3, 3]}, {target: 6}],
        expectedOutput: [0, 1]
    },
]

const equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

const handleTwoSum = (fn) => {
    const results = []
    const resultsTF = []
    let success = true

    for (let i = 0; i < testCases.length; i++) {
        const values = testCases[i].parameters.map(param => {
            const key = Object.keys(param)[0]
            return param[key]
        })
        const result = fn(...values)
        results[i] = result
        if (equalsCheck(result, testCases[i].expectedOutput)) {
            resultsTF[i] = true
        } else {
            resultsTF[i] = false
            success = false
        }
    }

    return [results, resultsTF, success]
}

export const twoSum = {
    id: 'two-sum',
    title: 'Two sum',
    statement: `<p class="mt-3">
  Given an array of integers <code>nums</code> and an integer <code>target</code>, return
  <em>indices of the two numbers such that they add up to</em> <code>target</code>.
</p>
<p class="mt-3">
  You may assume that each input would have <strong>exactly one solution</strong>, and you
  may not use thesame element twice.
</p>
<p class="mt-3">You can return the answer in any order.</p>`,
    examples: [
        {
            id: 1,
            inputText: "nums = [2,7,11,15], target = 9",
            outputText: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0,1].",
        },
        {
            id: 2,
            inputText: "nums = [3,2,4], target = 6",
            outputText: "[1,2]",
            explanation: "Because nums[1] + nums[2] == 6, we return [1,2].",
        },
        {
            id: 3,
            inputText: "nums = [3,3], target = 6",
            outputText: "[0,1]",
        },
    ],
    constraints: `<li class='mt-2'>
  <code>2 ≤ nums.length ≤ 10<sup>4</sup></code>
</li> <li class='mt-2'>
<code>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></code>
</li> <li class='mt-2'>
<code>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></code>
</li>
<li class='mt-2 text-sm'>
<strong>Only one valid answer exists.</strong>
</li>`,
    handlerFunction: handleTwoSum,
    startCode: startCode,
    testCases: testCases
}