let coins = require('coins')
let lotion = require('lotion')

let app = lotion({
  devMode: true
})

app.use(coins({
  name: 'testcoin',
  handlers: {
    test: {
      initialState: {
        judd: 10,
        matt: 10
      },
      onInput(input, tx, state) {
        console.log('===============')
        console.log('input', input)
        console.log('tx', tx)
        console.log('state', state)
        console.log('===============')
        if(isInsufficientTransfer(input, tx, state)) {
          throw Error('This sender doesn\'t have sufficient balance!')
        }
        state[input.senderAddress] -= input.amount
      },

      onOutput(output, tx, state) {
        console.log('===============')
        console.log('output', output)
        console.log('tx', tx)
        console.log('state', state)
        console.log('===============')
        state[output.receiverAddress] = (state[output.receiverAddress] || 0) + output.amount
      }
    }
  }
}))

function isInsufficientTransfer(input, tx, state){
  let isNatBalance = state[input.senderAddress] > 0
  let isEnough = state[input.senderAddress] >= input.amount
  return !(isNatBalance && isEnough)
}


let main = async _=>{
  let res = await app.listen(3000)
  return res.GCI
}

main()
.then((res)=>{ console.log(res) })
.catch(err=>{ console.error(err) })