let fs = require('fs')
let coins = require('coins')
let lotion = require('lotion')
let chainHandlerConnecter = require('./lib/chain_handler_connecter')

let app = lotion({
  initialState: { /* This is gonna be economic constants for PoS chain or something */ },
  devMode: true // This config enables to kill chain cache
})

app.use(coins({
  name: 'planet',
  handlers: chainHandlerConnecter.getHandlers()
}))

let main = async _=>{
  let res = await app.listen(3000)
  return res.GCI
}

main()
.then((gci)=>{
  console.log('GCI: ', gci)
  fs.writeFileSync('.planet.gci', gci)
})
.catch(err=>{ console.error(err) })