module.exports = {
  initialState: {
    point: {
      judd: 10,
      matt: 10
    }
  },
  onInput(input, tx, state) {
    console.log('===============')
    console.log('input', input)
    console.log('tx', tx)
    console.log('prestate', state)
    if(isInsufficientTransfer(input, tx, state)) {
      throw Error('This sender doesn\'t have sufficient balance!')
    }
    state.point[input.senderAddress] -= input.amount
    console.log('poststate', state)
    console.log('===============')
  },

  onOutput(output, tx, state) {
    console.log('===============')
    console.log('output', output)
    console.log('tx', tx)
    console.log('prestate', state)
    state.point[output.receiverAddress] = (state.point[output.receiverAddress] || 0) + output.amount
    console.log('poststate', state)
    console.log('===============')
  }
}

function isInsufficientTransfer(input, tx, state){
  let isNatBalance = state.point[input.senderAddress] > 0
  let isEnough = state.point[input.senderAddress] >= input.amount
  return !(isNatBalance && isEnough)
}