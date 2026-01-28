function twoSum(nums: number[], target: number): number[] {
    // Create a hash map to store number -> index mapping
    const numMap = new Map<number, number>();
    
    // Iterate through the array once
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if the complement exists in our map
        if (numMap.has(complement)) {
            // Found a solution - return both indices
            return [ numMap.get(complement)!, i ];
        }
        
        // If no solution found, add current number and index to map
        numMap.set(nums[i], i);
    }
    
    // No solution found (although problem states there will always be a solution)
    return [];
}

// Test cases
console.log(twoSum([2,7,11,15], 9));  // Expected output: [0,1]
console.log(twoSum([3,2,4], 6));      // Expected output: [1,2]
console.log(twoSum([3,3], 6));        // Expected output: [0,1]