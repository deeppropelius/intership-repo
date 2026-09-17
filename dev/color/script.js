import { properties } from "./data/Properties.js";
import { propertyrecords } from "./data/propertystates.js";
import { users } from "./data/propertystates.js";
console.log(propertyrecords);
console.log(properties);
console.log(users);
let i = 1;
properties.forEach((state) => {
    const Sn = document.getElementById(`p${state.id}`);
    if (!Sn)
        return;
    const im = document.createElement("img");
    im.src = state.image;
    im.alt = state.name;
    const na = document.createElement("h6");
    na.textContent = state.name;
    na.className = "heading";
    Sn.appendChild(im);
    Sn.appendChild(na);
});
