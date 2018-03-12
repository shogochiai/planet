const APPLIED = 'applied'
const CERTIFIED = 'certified'
const BLANK = 'blank'
module.exports = {
  // Basically substate is closed within contract
  // Contract coin's tranfer can be within here, but global coin transfer is done by account modules of mappum/coins
  initialState: {
    administrators: {
      owen: {
        balance: 5,
        expireBlockHeight: 200000
      }
    },
    users: {
      matt: {
        balance: 2
      }
    }
  },
  actions: {
    apply: {
      onInput(input, tx, state){
        let user = state.users[input.senderAddress]
        user.status = APPLIED
        user.appliedBlockHeight = 80000//current
        user.expireBlockHeight = 100000//current+X
        
        state.users[input.senderAddress] = user
      },
      onOutput(output, tx, state){}
    },
    addCertificate: {
      onInput(input, tx, state){
        let admin = state.administrators[input.senderAddress]
        if(admin == null){
          throw Error('This sender doesn\'t have any right to give certificate!')
        }
        if(input.amount !== 1){
          throw Error('Certification cost is not 1, too few or too much.')
        }
        
        admin.balance += 1 // TODO: Is it reasonable to add balance first before finish substracting? Feel like bad manner.

        // apply state change
        state.administrators[input.senderAddress] = admin
      },
      onOutput(output, tx, state){
        console.log('===============prestate', state)
        let user = state.users[output.receiverAddress]
        if(user && user.status !== APPLIED){
          throw Error('Target user is not applying for this cerificate.')
        }
        if(user.balance < 1) {
          throw Error('Not enough balance to get this certificate.')
        }

        user.balance -= 1
        user.status = CERTIFIED
        user.certifiedBlockHeight = 80001//current
        user.expireBlockHeight = 120000// current + Y
        
        // apply state change
        state.users[output.receiverAddress] = user
        console.log('===============poststate', state)
      }
    },
    removeCertificate: {
      onInput(input, tx, state){
        if(state.administrators[input.senderAddress] == null){
          throw Error('This sender doesn\'t have any right to remove certificate!')
        }
      },
      onOutput(output, tx, state){
        if(!state.users[output.receiverAddress] || state.users[output.receiverAddress].status !== CERTIFIED){
          throw Error('Target user is not certified on this cerificate.')
        }
        state.users[output.receiverAddress].status = BLANK
      }
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