let coins = require('coins')
let lotion = require('lotion')
let test_contract = require('./contract/test')
let mint_contract = require('./contract/mint')

let app = lotion({
  devMode: true
})

app.use(coins({
  name: 'testcoin',
  handlers: {
    test: test_contract,
    mint: mint_contract
  }
}))

let main = async _=>{
  let res = await app.listen(3000)
  return res.GCI
}

main()
.then((gci)=>{
  require('fs').writeFileSync('.planet.cgi', gci)
})
.catch(err=>{ console.error(err) })