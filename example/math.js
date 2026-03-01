// Exporting a variable
export const appName = "My App";

// Exporting a function
export function addNum(a, b) {
  return a + b;
}

// Exporting a Class
export class Rectangle {
    constructor(length, breadth){
        this.length = length
        this.breadth = breadth
    }

    area(){
        return (this.length * this.breadth).toFixed(2)
    }

    perimeter(){
        return (2 * this.length + 2 * this.breadth).toFixed(2)
    }
}


// // // Export the function
// // module.exports = addNum;
// module.exports = { appName, addNum, Rectangle };

// normal logic can still be run does not affect export
const rect01 = new Rectangle(3, 4)
console.log(rect01)