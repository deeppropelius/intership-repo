let num: number = 453;
console.log(typeof(num))
const person:{Name:string , Age : number , Hobbies: string[] , Married : boolean }={
    Name:"Deep",
    Age : 21,
    Hobbies: ["Football", "Cricket", "Coding", "Music Listing"],
    Married: false

}
console.log(typeof(person));
console.log(person);
console.log(`My name is ${person.Name} and hobbies ${person.Hobbies[3]} , and type of hobbies ${typeof(person.Hobbies[0])}`);