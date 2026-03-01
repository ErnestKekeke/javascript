// import dotenv from "dotenv";
// dotenv.config();
// console.log(process.env.PORT);

// import { appName } from "./math.js";
import { appName, addNum, Rectangle } from './math.js';
// const { appName, addNum, Rectangle } = require("./math.js"); // older version

console.log(appName);
console.log(addNum(3, 4))
console.log(new Rectangle(3, 4).area())

const app = document.getElementById('app')
app.addEventListener('click', ()=>{
    app.innerHTML = appName
})