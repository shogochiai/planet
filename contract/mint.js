module.exports = {
  initialState: {
    judd: 10,
    matt: 10
  },
  onInput(input, tx, state) {
    console.log('===============')
    console.log('input', input)
    console.log('tx', tx)
    console.log('prestate', state)
    if(isInsufficientTransfer(input, tx, state)) {
      throw Error('This sender doesn\'t have sufficient balance!')
    }
    state[input.senderAddress] -= input.amount
    console.log('poststate', state)
    console.log('===============')
  },

  onOutput(output, tx, state) {
    console.log('===============')
    console.log('output', output)
    console.log('tx', tx)
    console.log('prestate', state)
    state[output.receiverAddress] = (state[output.receiverAddress] || 0) + output.amount
    console.log('poststate', state)
    console.log('===============')
  }
}

function isInsufficientTransfer(input, tx, state){
  let isNatBalance = state[input.senderAddress] > 0
  let isEnough = state[input.senderAddress] >= input.amount
  return !(isNatBalance && isEnough)
}