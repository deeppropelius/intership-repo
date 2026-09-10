"use strict";
const list = new Map();
list.set("Deep", "Deep Rajput");
list.set("User0", "user0");
list.set("User1", "user1");
list.set("User2", "user2");
console.log(list);
console.log([...list][0]);
console.log(`With key valve known "Deep" : ${list.get("Deep")}`);
