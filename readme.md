# Planet
- This is meant to be PlasmaMVP
- Biggest respect for `keppel/lotion` and `mappum/coins`
- `mappum/coins` substate for each handlers(types) are limited to share the state between handlers, hence I decided to put `contract` entity inside each handler and enabled to share state between contract.

## command
- `node chain.js` is blockchain local runner, you can get `GCI(Global Chain Id)` from stdout
  - This chain is devmode, every restart will initialize your chain and persisted state. And GCI will be renewed.
- `node client.js` will publish transaction to send fund.
  - GCI must be refreshed