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
