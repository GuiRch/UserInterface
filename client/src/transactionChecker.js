const Web3 = require('web3')

class LastBlock {
    web3;
    account;

    constructor (projectId, account) {
      this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + '711d6e66714e407cb2eb6415faec77f7'))
      this.account = account.toLowerCase()
    }

    async checkBlock () {
      const block = await this.web3.eth.getBlock('latest')
      const number = block.number
      console.log('Searching block ' + number)

      if (block != null && block.transactions != null) {
        for (const txHash of block.transactions) {
          const tx = await this.web3.eth.getTransaction(txHash)
          if (this.account === tx.to.toLowerCase()) {
            console.log('Transaction found on block: ' + number)
            console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() })
          }
        }
      }
    }
}

const txChecker = new LastBlock(process.env.INFURA_ID, '0xe1Dd30fecAb8a63105F2C035B084BfC6Ca5B1493')
// setInterval(() => {
//   txChecker.checkBlock()
// }, 15 * 1000)

txChecker.checkBlock()
