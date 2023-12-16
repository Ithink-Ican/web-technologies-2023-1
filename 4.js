function sumOfTwo(nums, target){
    for(let i = 0; i < nums.length; i++){
        diff = target - nums[i];
        idx = nums.indexOf(diff);
        if(idx != -1){
            return [i, idx];
        }
    }
}