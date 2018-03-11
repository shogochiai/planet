let lotion = require('lotion')
let YOUR_APP_GCI = require('fs').readFileSync('.planet.cgi').toString()

let main = async _=>{

  let client = await lotion.connect(YOUR_APP_GCI)
  const OP_TYPE = 'test'
  // console.log(await client.getState())

  let result = await client.send({
    from: [
      // tx inputs. each must include an amount:
      { amount: 4, type: OP_TYPE, senderAddress: 'judd' }
    ],
    to: [
      // tx outputs. sum of amounts must equal sum of amounts of inputs.
      { amount: 4, type: OP_TYPE, receiverAddress: 'matt' }
    ]
  })
  // console.log(await client.getState())
  
  return result
}

main()
.then((res)=>{
  console.log(res.hash, res.check_tx.log)
  process.exit(0)
 })
.catch(err=>{
  console.error(err)
  process.exit(1)
})
// { ok: true, height: 42 }