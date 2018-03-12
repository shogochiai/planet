module.exports = {
  initialState: {
    point: {
      judd: 10,
      matt: 10
    }
  },
  transfer: {
    onInput(input, tx, state) {
      console.log('===============prestate', state)
      if(isInsufficientTransfer(input, tx, state)) {
        throw Error('This sender doesn\'t have sufficient balance!')
      }
      state.point[input.senderAddress] -= input.amount
      console.log('===============poststate', state)
    },

    onOutput(output, tx, state) {
      console.log('===============prestate', state)
      state.point[output.receiverAddress] = (state.point[output.receiverAddress] || 0) + output.amount
      console.log('===============poststate', state)
    }
  },
  airdrop: {
    onInput(input, tx, state){},
    onOutput(output, tx, state){}
  }
}
function isInsufficientTransfer(input, tx, state){
  let isNatBalance = state.point[input.senderAddress] > 0
  let isEnough = state.point[input.senderAddress] >= input.amount
  return !(isNatBalance && isEnough)
}