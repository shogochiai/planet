module.exports = {
  connect: connect
}

function connect(handlerName){
  let { initialState, actions } = require(`../contracts/${handlerName}`)
  return {
    initialState: initialState,
    onInput(input, tx, state) {
      if(!input.action) throw Error('A txInput must have a valid type(=contractName) and action.')

      actions[input.action].onInput(input, tx, state)
    },

    onOutput(output, tx, state) {
      if(!output.action) throw Error('A txOutput must have a valid type(=contractName) and action.')

      actions[output.action].onOutput(output, tx, state)
    }
  }
}