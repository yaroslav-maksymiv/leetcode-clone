const startCode = `function canJump(nums) {
  // Write your own code or uncomment the sample code below!
  
  // // Base condition...
  // if(nums.length <= 1)
  //   return true;
  // // To keep the maximum index that can be reached...
  // let maximum = nums[0];
  // // Traverse all the elements through loop...
  // for(let i = 0; i < nums.length; i++){
  //   //if there is no way to jump to next...
  //   // so we should return false...
  //   if(maximum <= i && nums[i] == 0) 
  //       return false;
  //   //update the maximum jump...    
  //   if(i + nums[i] > maximum){
  //       maximum = i + nums[i];
  //   }
  //   //maximum is enough to reach the end...
  //   if(maximum >= nums.length-1) 
  //       return true;
  // }
  // return false;
}`

const testCases = [
    {
        parameters: [{n: [2, 3, 1, 1, 4]}],
        expectedOutput: true
    },
    {
        parameters: [{n: [3, 2, 1, 0, 4]}],
        expectedOutput: false
    },
    {
        parameters: [{n: [2, 0, 0]}],
        expectedOutput: true
    },
    {
        parameters: [{n: [2, 5, 0, 0]}],
        expectedOutput: true
    }
]

const handlerFunction = (fn) => {
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
        if (result === testCases[i].expectedOutput) {
            resultsTF[i] = true
        } else {
            resultsTF[i] = false
            success = false
        }
    }

    return [results, resultsTF, success]
}

export const jumpGame = {
    id: 'jump-game',
    title: "Jump Game",
    statement: `<p class='mt-3'>
  You are given an integer array <code>nums</code>. You are initially positioned at the <strong>first index</strong>
  and each element in the array represents your maximum jump length at that position.
</p>
  <p class='mt-3'>
  Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
  </p>`,
    examples: [
        {
            id: 0,
            inputText: 'nums = [2,3,1,1,4]',
            outputText: "true",
        },
        {
            id: 1,
            inputText: 'nums = [3,2,1,0,4]',
            outputText: "false",
        },
    ],
    constraints: `<li><code>1 <= nums.length <= 10<sup>4</sup></code></li>
    <li><code>0 <= nums[i] <= 10<sup>5</sup></code></li>`,
    handlerFunction: handlerFunction,
    startCode: startCode,
    testCases: testCases
}