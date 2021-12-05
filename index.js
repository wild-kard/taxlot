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


//hardcode dummy data

const order1 = new Lot(20211201, 1000, 'buy', 1)

const order2 = new Lot(20211202, 2000, 'buy', 1)

const order3 = new Lot(20211202, 2200, 'sell', 2)

const order4 = new Lot(20211201, 3000, 'buy', 1)

const order5 = new Lot(20211125, 5000, 'buy', 1)


const buys = [order1, order2, order4, order5]
const sells = [order3]


// console.log(buys)
// console.log(sells)



//this would be used to place orders into approrpriate arrays following receipt from stdin
// const sortOrders = ()=>{

// }


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




const condenseDuplicates = (arr) =>{
    arr.sort((a, b) => a.date - b.date);
    for(i=0; i<arr.length; i++){
        let x = i + 1
        if(x >= arr.length){
           x = 0
        }else{
            if(arr[i].date === arr[x].date){  
                let weight = ((arr[i].price * arr[i].quantity) + (arr[x].price * arr[x].quantity))
                let newQuantity = (arr[i].quantity + arr[x].quantity)
                let weightedAvg = weight/newQuantity
                // let orderType = arr[i].type
                arr[i].quantity = newQuantity
                arr[i].price = weightedAvg

                // let newOrder = new Lot(arr[i].date, weightedAvg, orderType, quantity )
                arr.splice(x, 1)
                // arr.push(newOrder)
                arr.sort((a, b) => a.date - b.date);
                i = 0
            }
        }
    }
    return arr
}


console.log(condenseDuplicates(buys))


//*************************************************************************************************
// FIFO logic
// HIFO logic

const sellOrder = (accountingMethod)=>{
    let condBuys = condenseDuplicates(buys)
    let condSells = condenseDuplicates(sells)
    if(accountingMethod === 'price'){
        condBuys.sort((a, b) => a.price - b.price)
    }else if( accountingMethod === 'date'){
        condBuys.sort((a, b) => a.date - b.date)
    }
    let sellQuantity = 0
    for(i=0; i<condSells.length; i++){
      let addQty = condSells[i].quantity
      sellQuantity = sellQuantity + addQty
    }
    let x = 0
    if(sellQuantity === condBuys[x].quantity){
        condBuys.splice(x, 1)
            return condBuys
    }else if(sellQuantity < condBuys[x].quantity){
        let remQuant = condBuys[x].quantity - sellQuantity 
        condBuys[x].quantity = remQuant
            return condBuys
    }else if(sellQuantity > condBuys[x].quantity){
        let y = x + 1
        let quantSum = condBuys[x].quantity + condBuys[y].quantity
        if(sellQuantity < quantSum){
            y++
            quantSum = quantSum + condBuys[y].quantity
        }
        let remQuant = quantSum - sellQuantity
        condBuys[y].quantity = remQuant
        condBuys.splice(0, y)
            return condBuys
    }
}

//this will grab the argument passed in with the program from the console (for FIFO and HIFO)
// console.log(process.argv)
const hifoOrFifo = ()=>{
if(process.argv.includes("HIFO") || process.argv.includes("hifo")){
    console.log('HIFO')
    return sellOrder('price')

}else if (process.argv.includes("FIFO") || process.argv.includes('fifo')){
    console.log('FIFO')
    return sellOrder('date')
}else{

    return console.log('log error for incompatible argument')
}

}

// console.log(hifoOrFifo())

//*************************************************************************************************



//need error handler

//need tests & script

//need exe and readme