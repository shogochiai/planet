let lotion = require('lotion')
let YOUR_APP_GCI = require('fs').readFileSync('.planet.gci').toString()

let main = async _=>{
  let client = await lotion.connect(YOUR_APP_GCI)
  let results = []
  let r1 = await client.send({
    from: [
      { amount: 4, type: 'point', senderAddress: 'judd', contract: 'airdrop' }
    ],
    to: [
      { amount: 4, type: 'point', receiverAddress: 'matt', contract: 'airdrop' }
    ]
  })
  results.push(r1)

  let r2 = await client.send({
    from: [
      { amount: 1, type: 'certificate', senderAddress: 'matt', contract: 'apply' }
    ],
    to: [
      { amount: 1, type: 'certificate', receiverAddress: 'owen', contract: 'apply' }
    ]
  })
  results.push(r2)

  let r3 = await client.send({
    from: [
      { amount: 1, type: 'certificate', senderAddress: 'owen', contract: 'addCertificate' }
    ],
    to: [
      { amount: 1, type: 'certificate', receiverAddress: 'matt', contract: 'addCertificate' }
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