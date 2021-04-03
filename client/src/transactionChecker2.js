const Web3 = require('web3')

class TransactionChecker {
    web3;
    web3ws;
    account;
    subscription;

    constructor (projectId, account) {
      this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/' + '711d6e66714e407cb2eb6415faec77f7'))
      this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + '711d6e66714e407cb2eb6415faec77f7'))
      this.account = account.toLowerCase()
    }

    subscribe (topic) {
      this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
        if (err) console.error(err)
      })
    }

    watchTransactions () {
      console.log('Watching all pending transactions...')
      this.subscription.on('data', (txHash) => {
        setTimeout(async () => {
          try {
            const tx = await this.web3.eth.getTransaction(txHash)
            if (tx != null) {
              if (this.account === tx.to.toLowerCase()) {
                console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() })
              }
            }
          } catch (err) {
            console.error(err)
          }
        }, 60000)
      })
    }
}

const txChecker = new TransactionChecker(process.env.INFURA_ID, '0x004a84209a0021b8ff182ffd8bb874c53f65e90e')
txChecker.subscribe('pendingTransactions')
txChecker.watchTransactions()
