# Planet

## Overview
- This is gonna be PoS Chain framework in order to integrate with PlasmaMVP
- First read: `chain.js -> lib/chain_handler_connector.js -> contracts/certificate.js`
  - Biggest respect for `keppel/lotion` and `mappum/coins`
    - `lotion` and `coins` docs are also good resource to tweak this repo
      - `mappum/coins` substate for each handlers(types) are limited to share the state between handlers, hence I decided to put `contract` entity inside each handler and enabled to share state between contract's actions.

## command
- `nmp start` is blockchain local runner
- `npm run test` will publish transaction to send fund, and some other sample contract
- `npm run check` for observing state change
  
## Future work
- Plasma contract connection as PlasmaMVP
- input/output validator functions on `/validator` dir
- Plasma PoS sample, Plasma coin sample