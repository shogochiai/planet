module.exports = {
  // Basically substate is closed within contract
  // Contract coin's tranfer can be within here, but global coin transfer is done by account modules of mappum/coins
  initialState: {
    administrators: {
      owen: {
        expireBlockHeight: 200000
      }
    },
    users: {
    }
  },
  actions: {
    apply: {
      onInput(input, tx, state){
        state.users[input.senderAddress] = {
          status: 'applied',
          appliedBlockHeight: 80000,//current
          expireBlockHeight: 100000//current+X
        }
      },
      onOutput(output, tx, state){}
    },
    addCertificate: {
      onInput(input, tx, state){
        if(state.administrators[input.senderAddress] == null){
          throw Error('This sender doesn\'t have any right to give certification!')
        }
      },
      onOutput(output, tx, state){
        console.log('===============prestate', state)
        if(state.users[output.receiverAddress] && state.users[output.receiverAddress].status !== 'applied'){
          throw Error('Target user did not apply for this cerification.')
        }
        
        state.users[output.receiverAddress].status = 'certified'
        state.users[output.receiverAddress].certifiedBlockHeight = 80001//current
        state.users[output.receiverAddress].expireBlockHeight = 120000// current + Y
        console.log('===============poststate', state)
      }
    },
    removeCertificate: {
      onInput(input, tx, state){},
      onOutput(output, tx, state){}
    },
    updateAdministraterExpiration: {
      onInput(input, tx, state){},
      onOutput(output, tx, state){}
    },
    updateUserExpiration: {
      onInput(input, tx, state){},
      onOutput(output, tx, state){}
    }
  }
}