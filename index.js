// const readline = require('readline')

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

// rl.on('line', function (line) {
//   console.log(line.length);
// });

//above causes 'stdin is not a tty' error on terminal when passed 
//$ echo 'data' | node index.js




// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: false
//     })



//************************************************************
//build out with dummy data until stdin problem is solved
//************************************************************


//internal ID incrementor function for Lot class
genId = (function(){ 
    var id = 0; 
    return function(){  
      return id++ 
    } 
  })(); 


//class constructor for new orders
class Lot {
    constructor(date, price, type, quantity) {
      this.id = genId();
      this.date = date;
      this.price = price;
      this.type = type;
      this.quantity = quantity
    }

  }


//dummy data

const order1 = new Lot(20211201, 1000, 'buy', 1)

const order2 = new Lot(20211202, 2000, 'buy', 1)

const order3 = new Lot(20211202, 2200, 'sell', 1)

const order4 = new Lot(20211201, 3000, 'buy', 1)


const buys = [order1, order2, order4]
const sells = [order3]


// console.log(buys)
// console.log(sells)



//this would be used to place orders into approrpriate arrays following receipt from stdin
const sortOrders = ()=>{

}


// process.stdout.write('place your order')

// process.stdin.on('order', function(order){
//     if(order.includes('buy')){
//         buys.push(order)
//     }else if(order.includes('sell')){
//         sells.push(order)
//     }
// })

// console.log(buys)



// process.stdin.pipe(process.stdout)





//template for stdin
// process.stdin.on('data', data => {
//     console.log(`You typed ${data.toString()}`);
//     process.exit();
//   });


//template for stdout
// process.stdout.write('this is an output')




const condenseBuyDuplicates = (buyArray) =>{
    buyArray.sort((a, b) => a.date - b.date);
    for(i=0; i<buyArray.length; i++){
        let x = i + 1
        if(x >= buyArray.length){
           x = 0
        }else{
            if(buyArray[i].date === buyArray[x].date){  
                let weight = ((buyArray[i].price * buyArray[i].quantity) + (buyArray[x].price * buyArray[x].quantity))
                let quantity = (buyArray[i].quantity + buyArray[x].quantity)
                let weightedAvg = weight/quantity
                let newOrder = new Lot(buyArray[i].date, weightedAvg, 'buy', quantity )
                buyArray.splice(i, 2)
                buyArray.push(newOrder)
                buyArray.sort((a, b) => a.date - b.date);
                i = 0
            }
        }
    }
    return buyArray
}

const condenseSellDuplicates = (sellArray) =>{
    sellArray.sort((a, b) => a.date - b.date);
    for(i=0; i<sellArray.length; i++){
        let x = i + 1
        if(x >= sellArray.length){
           x = 0
        }else{
            if(sellArray[i].date === sellArray[x].date){  
                let weight = ((sellArray[i].price * sellArray[i].quantity) + (sellArray[x].price * sellArray[x].quantity))
                let quantity = (sellArray[i].quantity + sellArray[x].quantity)
                let weightedAvg = weight/quantity
                let newOrder = new Lot(sellArray[i].date, weightedAvg, 'sell', quantity )
                sellArray.splice(i, 2)
                sellArray.push(newOrder)
                sellArray.sort((a, b) => a.date - b.date);
                i = 0
            }
        }
    }
    return sellArray
}

console.log(buys)
console.log(condenseBuyDuplicates(buys))
// condenseSellDuplicates(sells)
// console.log(sellArr)





//this will grab the argument passed in with the program from the console (for FIFO and HIFO)
// console.log(process.argv)

//*************************************************************************************************
// FIFO logic
// HIFO logic

if(process.argv.includes("HIFO") || process.argv.includes("hifo")){
    console.log('HIFO')
}else if (process.argv.includes("FIFO") || process.argv.includes('fifo')){
    console.log('FIFO')
}else{
    console.log('log error for incompatible argument')
}

//*************************************************************************************************


//make a constructor class for an order

//each time an order is placed, create a new object and append it to the buy or sell array

//test each new order for overlapping date, if match, run logic to find weighted average price and collapse into a single ID


//need error handler

//need tests & script

//need exe and readme