let coins = require('coins')
let lotion = require('lotion')
let point_handler = require('./handlers/point')
let certificate_handler = require('./handlers/certificate')

let app = lotion({
  initialState: {
    // This is gonna be economic constants
  },
  devMode: true
})



app.use(coins({
  name: 'planet',
  handlers: {
    point: point_handler,
    certificate: certificate_handler
  }
}))

let main = async _=>{
  let res = await app.listen(3000)
  return res.GCI
}

main()
.then((gci)=>{
  console.log('GCI: ', gci)
  require('fs').writeFileSync('.planet.gci', gci)
})
.catch(err=>{ console.error(err) })