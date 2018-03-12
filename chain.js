let fs = require('fs')
let entities = fs.readdirSync('./contracts').map(name=> name.replace(".js", "") )

let coins = require('coins')
let lotion = require('lotion')

let chain_handler_connecter = require('./chain_handler_connecter')

let handlers = {}
entities.map(name=>{
  handlers[name] = chain_handler_connecter.connect(name)
})

let app = lotion({
  initialState: {
    // This is gonna be economic constants
  },
  devMode: true
})

app.use(coins({
  name: 'planet',
  handlers: handlers
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