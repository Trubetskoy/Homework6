function isPrime(num) {
    if (num % 2 == 0) return false;
    for (let i = 3; i * i <= num; i += 2)
        if (num % i == 0) return false;
    return true;
}


function factorialize(number) {
    if (number === 0 || number === 1)
      return 1;
    for (let i = number - 1; i >= 1; i--) {
        number *= i;
    }
    return number;
  }
  factorialize(5);

function fibonacci(number){
    let a = 1, b = 0, temp;
  
    while (number >= 0){
      temp = a;
      a = a + b;
      b = temp;
      number--;
    }
  
    return b;
  }

  function isSorted(arr) {
    const limit = arr.length - 1;
    return arr.every((_, i) => (i < limit ? arr[i] <= arr[i + 1] : true));
  }

  function reverseArray(arr) {
    var newArray = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      newArray.push(arr[i]);
    }
    return newArray;
  }

  function checkPalindrom(str) {
    return str == str.split('').reverse().join('');
}

function isMissed (array){
    array.sort (function(a,b){return a-b})
    var mia = array.reduce(function(acc, cur, ind, arr) {
    var diff = cur - arr[ind-1];
    if (diff > 1) {
        var i = 1;
        while (i < diff) {
        acc.push(arr[ind-1]+i);
        i++;
        }
    }
    return acc;
    }, []);
    console.log(mia);
}

function isBalanced (string){
    let array = string.split('');
    let open = [];

    let openBrackets = {
        '(': true,
        '[': true,
        '{': true,
    };

    let closedBrackets = {
        ')': '(',
        ']': '[',
        '}': '{',
    };
    for (let i = 0; i < array.length; i++) {
        if (openBrackets[array[i]]) {
          open.push(array[i]);
        } else if (closedBrackets[array[i]] && open.pop() !== closedBrackets[array[i]]) {
          return false;
        }
      }
      return !open.length
}

function myIndexOf (array, element, startElement) {
    let index;
       for (let i=startElement; i<= array.length; i++) {
        if (element === array[i]){
            index = i;
        }
        if (i===array.length && !index) {
           index = -1;
       } 
    }
    return index
}