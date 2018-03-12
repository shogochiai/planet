let lotion = require('lotion')
let YOUR_APP_GCI = require('fs').readFileSync('.planet.gci').toString()

function tx(am, ty, ac){
  return { amount: am, type: ty, action: ac }
}
function inTx(am, ad, ty, ac){
  let transaction = tx(am, ty, ac)
  transaction.senderAddress = ad
  return transaction
}
function outTx(am, ad, ty, ac){
  let transaction = tx(am, ty, ac)
  transaction.receiverAddress = ad
  return transaction
}

let main = async _=>{
  let client = await lotion.connect(YOUR_APP_GCI)
  let results = []

  // judd is an user
  // matt is also an user
  let r1 = await client.send({
    from: [inTx(4,'judd','point','transfer')],
    to: [outTx(4,'matt','point','transfer')]
  })
  results.push(r1)

  // matt is applied user
  // owen is administrator
  let r2 = await client.send({
    from: [inTx(1,'matt','certificate','apply')],
    to: [outTx(1,'owen','certificate','apply')]
  })
  results.push(r2)

  // owen is administrator
  // matt is applied user
  let r3 = await client.send({
    from: [inTx(1,'owen','certificate','addCertificate')],
    to:  [outTx(1,'matt','certificate','addCertificate')]
  })
  results.push(r3)

  // owen is administrator
  // matt is applied user
  let r4 = await client.send({
    from: [inTx(0,'owen','certificate','removeCertificate')],
    to:  [outTx(0,'matt','certificate','removeCertificate')]
  })
  results.push(r4)

  return results
}

main()
.then((results)=>{
  console.log(results.map(r=>{ return r.check_tx.log }))
  process.exit(0)
 })
.catch(err=>{
  console.error(err)
  process.exit(1)
})
// { ok: true, height: 42 }