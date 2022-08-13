import Web3 from 'web3/dist/web3.min.js';
import Wallet from './contracts/Wallet.json';

export const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          resolve(web3);
        } catch (e) {
          reject(e);
        }
      } else if (window.web3) {
        resolve(window.web3);
      } else {
        reject('must install metamask');
      }
    });
  });
};

export const getWallet = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const contractDeployed = Wallet.networks[networkId];
  return new web3.eth.Contract(
    Wallet.abi,
    contractDeployed && contractDeployed.address,
  );
};
