const utils = require('./index.js')

const testBuys = [{id:1, date:20211201, price:1000, type:'buy', quantity:1 },
{id:2, date:20211201, price:1200, type:'buy', quantity:1 },
{id:3, date:20211202, price:5000, type:'buy', quantity:1 }]

const testSells = [{id:4, date: 20211205, price:6969, type:'sell', quantity: 10}]

const expectCondense = [{id:1, date:20211201, price:1100, type:'buy', quantity:2},
{id:3, date:20211202, price:5000, type:'buy', quantity:1 }]



describe('check that buy and sell arrays contain data', ()=>{
    test('checks that buy array contains data', ()=>{
        expect(utils.buys).not.toBeNull()
    })
    test('checks that sell array contains data', ()=>{
        expect(utils.sells).not.toBeNull()
    })
})


describe('check that a new lot is given a sequential id', ()=>{
    test('check new lot ID', ()=>{
        let testId = new utils.Lot(20211205, 69420, 'buy', 1)
        expect(testId.id).toBeGreaterThan(utils.buys.length + utils.sells.length)

    })
})

//data related tests broken due to hard coded data, requires refactor of primary functions for STDIN data feed

// describe('sell order cannot exceed cummulative bought value', ()=>{
//     test('give bad HIFO sell order', ()=>{
//         condBuys = utils.condenseDuplicates(testBuys)
//         condSells = utils.condenseDuplicates(testSells)
//         expect(utils.sellOrder('price')).toBe(false)
//     })
// })


//cannot do with hardcoded data
// describe('FIFO tests', ()=>{
//     test('Sell less than first buy lot', ()=>{
    
//     })
//     test('Sell equal to first buy lot', ()=>{

//     })
//     test('Sell greater than first buy lot', ()=>{

//     })
// })

// describe('HIFO tests', ()=>{
//     test('Sell less than first buy lot', ()=>{

//     })
//     test('Sell equal to first buy lot', ()=>{

//     })
//     test('Sell greater than first buy lot', ()=>{

//     })

// })



describe('buy or sell orders on the same date are condensed to one lot', ()=>{
    test('2 buy orders from the same date are condensed to one order', ()=>{
        
        expect(utils.condenseDuplicates(testBuys)).toEqual(expectCondense)
    })
})



describe('process argument designates HIFO or FIFO', ()=>{
    test('checks if process.argv has been assigned a value', ()=>{
     expect(process.argv).toContain('node')
    })
    test('checks if process.argv is either HIFO or FIFO', ()=>{
    expect(process.argv).toContain('HIFO'|| 'FIFO')
    })

})

describe('HIFO and FIFO takes from correct Buy lot', ()=>{
    test('FIFO removes oldest date lot first', ()=>{
        expect(utils.sellOrder('date')).not.toContain(
            { id: 5, date: 20211125, price: 500, type: 'buy', quantity: 1 }
            )
        })
    //cannot do with hardcoded data
    // test('HIFO removes highest price lot first', ()=>{
    //     expect(utils.sellOrder('price')).not.toContain(
    //         { id: 2, date: 20211202, price: 5000, type: 'buy', quantity: 1 }
    //         )
    //     })
})

