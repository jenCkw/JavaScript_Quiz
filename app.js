let arrayNum = [2, 7, 11, 15];
let t1 = 26;

function sums(nums, target) {
  let arr = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + nums[i + 1] === target) {
      arr.push(nums[i], nums[i + 1]);
      break;
    }
  }
  return arr;
}

console.log(sums(arrayNum, t1));
