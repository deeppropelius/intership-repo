"use strict";
let myarray = [];
for (let i = 0; i < 10; i++) {
    myarray.push(Math.floor(Math.random() * 101));
}
console.log("Before:", myarray);
let small = 0;
let max = myarray.length - 1;
while (small < max) {
    let minIndex = small;
    let maxIndex = small;
    for (let i = small; i <= max; i++) {
        if (myarray[i] < myarray[minIndex]) {
            minIndex = i;
        }
        if (myarray[i] > myarray[maxIndex]) {
            maxIndex = i;
        }
    }
    swap(small, minIndex);
    if (maxIndex === small) {
        maxIndex = minIndex;
    }
    swap(max, maxIndex);
    small++;
    max--;
}
function swap(a, b) {
    const temp = myarray[a];
    myarray[a] = myarray[b];
    myarray[b] = temp;
}
console.log("After:", myarray);
