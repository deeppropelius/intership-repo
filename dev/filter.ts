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
