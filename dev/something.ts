const arry : string[] =["Red","Blue","Green"];
arry.forEach(function(color){
    console.log(color);
})

function myfunction (color:string) {
    console.log(`The color is ${color}`);
}
console.log("Function Declared Outside");
arry.forEach(myfunction);