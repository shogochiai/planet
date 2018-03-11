let lotion = require('lotion')
let coins = require('coins')

let app = lotion({ initialState: {} })

app.use(coins({
  name: 'kittycoin',
  initialBalances: {
    // map addresses to balances
    '04oDVBPIYP8h5V1eC1PSc/JU6Vo': 10,
    'OGccsuLV2xuoDau1XRc6hc7uO24': 20
  }
}))

app.listen(3000)