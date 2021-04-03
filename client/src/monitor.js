'use strict'

module.exports = Web3 => {
  const provider = new Web3.provider.HttpProvider(
    'https://rinkeby.infura.io/v3/711d6e66714e407cb2eb6415faec77f7'
  )
  return new Web3(provider)
}
