const utils = require('./index.js')

const testBuys = [{id:1, date:20211201, price:1000, type:'buy', quantity:1 },
{id:2, date:20211201, price:1200, type:'buy', quantity:1 },
{id:3, date:20211202, price:5000, type:'buy', quantity:1 }]

const expectCondense = [{id:1, date:20211201, price:1100, type:'buy', quantity:2},
{id:3, date:20211202, price:5000, type:'buy', quantity:1 }]


describe('check that buy and sell arrays contain data', ()=>{
    test('checks that buy array contains data', ()=>{

    })
})

describe('check that a new lot is given a sequential id', ()=>{
    test('check new lot ID', ()=>{
        
    })
})

describe('sell order cannot exceed cummulative bought value', ()=>{

})

describe('buy or sell orders on the same date are condensed to one lot', ()=>{
    test('2 buy orders from the same date are condensed to one order', ()=>{
        
        expect(utils.condenseDuplicates(testBuys)).toEqual(expectCondense)
    })
})



describe('process argument designates HIFO or FIFO', ()=>{
    test('checks if process.argv has been assigned a value', ()=>{
     
    })
    test('checks if process.argv is either HIFO or FIFO', ()=>{

    })

})

describe('HIFO and FIFO', ()=>{
    test('HIFO removes highest price lot first', ()=>{

    })
    test('FIFO removes oldest date lot first', ()=>{

    })
})

describe('sells successfully carry over to successive lots if quantity exceeds first lot chosen',()=>{

})
