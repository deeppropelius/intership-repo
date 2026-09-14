const objects=[
    {
        name: "Deep",
        intern : true
    },
    {
        name: "something",
        intern: false 
    },
    {
        name: "something",
        intern: true
    }
]
let user= objects.filter(
    function(object){
        return object.name==="Deep";
    }
);
console.log("START");
console.log(user);
const finds = objects.find(function (fi){
    return fi.name==="something";
});
console.log(finds);
console.log("Using Using every:");
const all = objects.every(function(ele){
    return ele.intern===true;
})
console.log("every one is intern :" , all);
console.log("Using the Some")
const Som = objects.some(function(so){
    return so.intern===true;
})
console.log("Is some one intern :", Som);
