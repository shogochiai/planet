module.exports = {
  initialState: {
    point: {
      judd: 10,
      matt: 10
    }
  },
  actions: {
    transfer: {
      onInput(input, tx, state) {
        if(isInsufficientTransfer(input, tx, state)) {
          throw Error('This sender doesn\'t have sufficient balance!')
        }
        state.point[input.senderAddress] -= input.amount
      },

      onOutput(output, tx, state) {
        state.point[output.receiverAddress] = (state.point[output.receiverAddress] || 0) + output.amount
      }
    },
    airdrop: {
      onInput(input, tx, state){},
      onOutput(output, tx, state){}
    }
  }
}
function isInsufficientTransfer(input, tx, state){
  let isNatBalance = state.point[input.senderAddress] > 0
  let isEnough = state.point[input.senderAddress] >= input.amount
  return !(isNatBalance && isEnough)
}