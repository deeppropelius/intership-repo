interface UserGreating{
    name : string ;
    age : number;
    greet(): string;

}
class User implements UserGreating{
    name: string;
    age: number;
    constructor (name:string, age : number){
        this.name = name ;
        this.age = age ;
        
        }  
        greet(): string{
            return `Greetings `+ this.name ;      
    }
}
const user =new User("Deep", 21);
console.log(user.greet());