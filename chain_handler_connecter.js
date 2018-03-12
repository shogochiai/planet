module.exports = {
  connect: connect
}

function connect(handlerName){
  let contracts = require('./contracts/'+handlerName)
  return {
    initialState: contracts.initialState,
    onInput(input, tx, state) {
      if(!input.contract) throw Error('A txInput must have a valid type and contract.')

      contracts[input.contract].onInput(input, tx, state)
    },

    onOutput(output, tx, state) {
      if(!output.contract) throw Error('A txOutput must have a valid type and contract.')

      contracts[output.contract].onOutput(output, tx, state)
    }
  }
}