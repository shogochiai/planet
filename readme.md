# Planet
- This is meant to be PlasmaMVP
- Biggest respect for `keppel/lotion` and `mappum/coins`
- `mappum/coins` substate for each handlers(types) are limited to share the state between handlers, hence I decided to put `contract` entity inside each handler and enabled to share state between contract.

## command
- `nmp start` is blockchain local runner
- `npm run test` will publish transaction to send fund, and some other sample contract
- `npm run check` observe state change
  
## Future work
- Plasma contract connection as PlasmaMVP
- input/output validator functions on `/validator` dir
- Plasma PoS sample, Plasma coin sample