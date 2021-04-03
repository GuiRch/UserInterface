<template>
    <div id="demo">
        <h1>Ethereum</h1>
        <form @submit.prevent="catchAddress">
            <p>
                <label for="userAddress">Your Ethereum address : </label>
                <input type="text" v-model="userAddress" id="ethAddress" placeholder="Your ETH address">
            </p>
        </form>
        <vue-metamask
            userMessage="msg"
            @onComplete="onComplete">
        </vue-metamask>
        <button @click="showLastBlock">
            The last block is : {{ lastBlock }}
        </button>
    </div>
</template>

<script>
import VueMetamask from 'vue-metamask'
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
export default {
  components: {
    VueMetamask
  },
  data () {
    return {
      msg: 'This is demo net work',
      lastBlock: '',
      userAddress: undefined
    }
  },
  methods: {
    catchAddress () {
      const userAddress = this.userAddress
      this.$store.dispatch('userAddress', { userAddress })
    },
    onComplete (data) {
      console.log('data:', data)
    },
    findLastBlock () {
      const block = this.web3.eth.getBlock('latest')
      const number = block.number
      return number
    },
    showLastBlock (event) {
      const lastBlock = new LastBlock(process.env.INFURA_ID, '0xe1Dd30fecAb8a63105F2C035B084BfC6Ca5B1493')
      this.lastBlock = lastBlock.checkBlock()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
