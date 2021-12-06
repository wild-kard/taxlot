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
    var id = 1; 
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

const order2 = new Lot(20211202, 5000, 'buy', 1)

const order3 = new Lot(20211202, 2200, 'sell', 1.5)

const order4 = new Lot(20211201, 3000, 'buy', 1)

const order5 = new Lot(20211125, 500, 'buy', 1)


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

let condBuys = condenseDuplicates(buys)
let condSells = condenseDuplicates(sells)

const sellOrder = (accountingMethod)=>{
    if(accountingMethod === 'price'){
        condBuys.sort((a, b) => b.price - a.price)
        console.log('sorted by price')
        console.log(condBuys)
    }else if( accountingMethod === 'date'){
        condBuys.sort((a, b) => a.date - b.date)
    }
    let sellQtyTotal = 0
    for(i=0; i<condSells.length; i++){
      let addQty = condSells[i].quantity
      sellQtyTotal = sellQtyTotal + addQty
    }
    let x = 0
    if(sellQtyTotal === condBuys[x].quantity){
        condBuys.splice(x, 1)
            console.log('sell equaled first buy')
            return condBuys
    }else if(sellQtyTotal < condBuys[x].quantity){
        let remQty = condBuys[x].quantity - sellQtyTotal 
        condBuys[x].quantity = remQty
            console.log('sell was less than first buy')
            return condBuys
    }
    else if(sellQtyTotal > condBuys[x].quantity){
        let y = 0
        let qtySum = condBuys[x].quantity + condBuys[y].quantity
        console.log('qtySum')
        console.log(qtySum)
        if(sellQtyTotal < qtySum){
            console.log(qtySum)
            y++
            sellQtyTotal = sellQtyTotal - condBuys[y].quantity
            console.log('sellQtyTotal')
            console.log(sellQtyTotal)
        }else if(sellQtyTotal > qtySum){
            console.log('sell exceeded portfolio')
            return false
        }
        let remQty = condBuys[y].quantity + sellQtyTotal
        console.log('remQty')
        console.log(remQty)
        condBuys[y].quantity = remQty
        condBuys.splice(0, y)
            console.log('sell required multiple buy lots')
            return condBuys
    }
}

//this will grab the argument passed in with the program from the console (for FIFO and HIFO)
// console.log(process.argv)
let accountingChecker = process.argv
console.log(accountingChecker)
const hifoOrFifo = (check)=>{
if(check.includes("HIFO") || check.includes("hifo")){
    console.log('HIFO')
    return sellOrder('price')

}else if (check.includes("FIFO") || check.includes('fifo')){
    console.log('FIFO')
    return sellOrder('date')
}else{

    return console.log('log error for incompatible argument')
}

}



const formatOutput =()=>{
    let output = hifoOrFifo(accountingChecker)
    for(i=0; i<output.length; i++){
      delete output[i].type
      let price = output[i].price
      output[i].price = price.toFixed(2)
      let quantity = output[i].quantity
      output[i].quantity = quantity.toFixed(8)
    }

        return output
}


console.log(formatOutput())

//template for stdout
// process.stdout.write(formatOutput())


//need error handler

//need tests



module.exports = {
    formatOutput,
    Lot,
    hifoOrFifo,
    sellOrder,
    condenseDuplicates,
    genId,
    buys,
    sells,
}