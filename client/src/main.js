import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

const Web3 = require('web3')
const web3 = new Web3('http://localhost:7545')

async function getBlockNumber () {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

console.log('Block number :')
console.log(getBlockNumber())

// if (window.ethereum != null) {
//     state.web3 = new Web3(window.ethereum)
//     try {
//       // Request account access if needed
//       await window.ethereum.enable()
//       // Acccounts now exposed
//     } catch (error) {
//       // User denied account access...
//     }
//   }
