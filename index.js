/**********************
 * First Unique Character (387)
 **********************/
//TC: O(N)
// SC: O(N) --> this is wrong. we can only have O(64) a-z and A-Z keys so constant time; O(1);
var firstUniqChar = function(s) {
    if(s.length === 0 || !s) return -1; 
    const freqCounter = {}; // objects have no order so keep that in mind; 
    for(let i = 0; i < s.length; i++){
        freqCounter[s[i]] ? freqCounter[s[i]]++ : freqCounter[s[i]] = 1;  
    }
    for(let i = 0; i < s.length; i++){
        if(freqCounter[s[i]] < 2) return i; 
    }
    return -1; 
};



// s = "leetcode"
// return 0.

// s = "loveleetcode"
// return 2.


/**********************
 * Group Anagrams (49)
 **********************/
//TC: O(N * M Log(M))
// N is the length of "strs"
// M is the longest String
//SC: O(N)
var groupAnagrams = function(strs){
    let sortedStr; 
    const ht = {};
    const list = [];
    for(const str of strs){
        sortedStr = str.split('').sort().join('') // O(Nlog(N))
        ht[sortedStr] ? ht[sortedStr].push(str) : ht[sortedStr] = [str];
    }
    for(const key in ht){
        list.push(ht[key])
    }

    return list;

    // return Object.values(ht)
}



/**********************
 * Valid Palindrone (125)
 **********************/
// TC: O(N)
// SC: implicit O(N)
// Naive Approach
var isPalindromeNaive = function(s){
    const sanitizeStr = sanitize(s); 
    return sanitizeStr.split('').reverse().join("") === sanitizeStr; // O(3N)
}

// TC: O(N)
// SC: O(1) we relapce the local variable s with the new sanitize string.
var isPalindromePointers = function(s){
    if (s.length === 0) return true;
    s = sanitize(s);
    let left = 0; 
    let right = s.length -1; 
    while(left <= right){
        if(s[left] !== s[right]){
            return false
        }
        left++;
        right--;
    }
    return true;
}

function sanitize(str){
    return str.replace(/[^a-zA-Z0-9]/g,'').toLowerCase();
}


/**********************
 * Valid Paranthesis (125)
 **********************/
// TC: O(N)
// SC: O(N) all values could be open parenthesis
// My solution
var isValidMySolution = function(s) {
    if(s.length === 0) return true; 
    const stack = []; 
    const validParenthesis = ['{}', '[]', '()'];
    let revomeParenthesis; 
    let combineParenthesis; 
    for(let i = 0; i< s.length; i++){
        if(s[i] === '{' || s[i] === '[' || s[i] === '(' ){
            stack.push(s[i])
        } else if (s[i] === '}' || s[i] === ']' || s[i] === ')' ){
            revomeParenthesis = stack.pop();
            combineParenthesis = revomeParenthesis + s[i]
            let valid = validParenthesis.find(parenthesis => {
                return parenthesis === combineParenthesis;
            })
            if(!valid) return false;
            
        } else {
            return false; 
        }
    }
    if(stack.length === 0){
        return true; 
    } else {
        return false; 
    }
};

// TC: O(N);
// SC: O(N) all values could be open parenthesis

var isValid = function(s){
    const stack = [];
    const pairs = {
        '(': ')', 
        '[': ']',
        '{': '}'
    };
    for(let char of s){
        if(char in pairs){
            stack.push(char)
        } else {
            if(stack.length === 0) return false; 
            const last = stack.pop();
            if(pairs[last] !== char) return false;

        }
    }
    if(stack.length === 0){
        return true; 
    } else {
        return false; 
    }
}

// ([{}])



/**********************
 * Search Insert Position (35)
 **********************/
// TC: O(log(N))
// SC: o(1)
var searchInsert = function(nums, target) {
    let left = 0; 
    let right = nums.length - 1; 
    let middle; 
    while(left <= right){
        middle = Math.floor((right + left)/2)
        if(nums[middle] > target){
            right = middle -1;
        } else if( nums[middle] < target){
            left = middle + 1;
        } else {
            return middle; 
        }
    }
    if(right >= nums.length){
        return right;
    } else {
        return left; 
    }
};

console.log(searchInsert([1,3,5,6]))
 //[1,3,4,7,8] target = 30



 
/**********************
 * Rotate Image (48)
 **********************/
var rotate = function(matrix){
    // it does mutate the original array; 
    matrix.reverse(); // SC: O(N)
    let temp; 
    for(let i =0; i < matrix.length;  i++){
        for(let j=0; j< i;  j++){
            if(i !== j){
                temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp; 
            }
        }
    }
    debugger
}; 

// console.log(rotate([
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
// ]))


/*************************
 * Two Sum (1)
 ************************/
//TC: O(N);
//SC: O(N);
var twoSum = function(nums, target) {
    const potentialMatchHash = {}; 
    let potentialMatch; 
    for(let i =0; i < nums.length; i++){ 
        potentialMatch = target - nums[i];
        if(potentialMatchHash[potentialMatch] !== undefined){
            return [potentialMatchHash[potentialMatch], i] 
        } else {
            potentialMatchHash[arr[i]] = i; 
        }
    }
    return false;
};



/*************************
 * Three Sum 
 ************************/
var threeSum = function(nums){
    const output = []; 
    nums.sort((a,b) => a -b); 
    for(let i = 0; i < nums.length - 2; i++){
        let left = i + 1; 
        let right = nums.length - 1; 
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        while(left < right){
            let total = nums[i] + nums[left] + nums[right]
            if(total === 0){
                output.push(nums[i], nums[left], nums[right]);
                while(left < right && nums[rigth - 1] === nums[right]){ 
                    right--;
                }
                while(left < right && nums[left + 1] === nums[left]){ 
                    left++
                }
                right--; 
                left++; 
            } else if(total > 0){
                right--
            } else {
                left++
            }
        }
    }
    return output; 
}