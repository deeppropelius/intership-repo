class Person{
     public  name: string = "Deep" ;
    public readonly age : number = 21; 
    // public constructor(name : string, age:number ){
    //     return this.name =name, this.age=age;
    //}
}
const person = new Person();
try{
    console.log(person);
    console.log (person.name = "Jeeya");
    // person.age = 20
    console.log (person.age);
}
catch(error){
    console.error(`An Error`, error);
}