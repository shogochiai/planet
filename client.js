let lotion = require('lotion')
let YOUR_APP_GCI = require('fs').readFileSync('.planet.gci').toString()

let main = async _=>{
  let client = await lotion.connect(YOUR_APP_GCI)
  let results = []
  let r1 = await client.send({
    from: [
      { amount: 4, senderAddress: 'judd', type: 'point', action: 'transfer' }
    ],
    to: [
      { amount: 4, receiverAddress: 'matt', type: 'point', action: 'transfer' }
    ]
  })
  results.push(r1)

  let r2 = await client.send({
    from: [
      { amount: 1, senderAddress: 'matt', type: 'certificate', action: 'apply' }
    ],
    to: [
      { amount: 1, receiverAddress: 'owen', type: 'certificate', action: 'apply' }
    ]
  })
  results.push(r2)

  let r3 = await client.send({
    from: [
      { amount: 1, senderAddress: 'owen', type: 'certificate', action: 'addCertificate' }
    ],
    to: [
      { amount: 1, receiverAddress: 'matt', type: 'certificate', action: 'addCertificate' }
    ]
  })
  results.push(r3)

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