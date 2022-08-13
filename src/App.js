import React, { useEffect, useState } from 'react';
import Transfer from './transfer';
import { getWallet, getWeb3 } from './utils';

const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState(undefined);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers2 = await wallet.methods.getTransfers().call();
      setTransfers(transfers2);
      setApprovers(approvers);
      setQuorum(quorum);
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
    };

    init();
  }, []);

  console.log(transfers);
  if (
    web3 === undefined ||
    wallet === undefined ||
    accounts === undefined ||
    quorum === undefined ||
    approvers === undefined
  )
    return <div>loading</div>;

  console.log(transfers);
  const createTransferfucn = (transfer) => {
    console.log(transfer);
    try {
      wallet.methods
        .createTransfer(transfer.amount, transfer.to)
        .send({ from: accounts[0] });
    } catch (error) {
      console.log(error);
    }
  };
  const approveTransfer = (transferId) => {
    wallet.methods.approveTransfer(transferId).send({ from: accounts[0] });
  };
  return (
    <div>
      approversList:
      <ul>
        {approvers.map((val) => (
          <li>{val}</li>
        ))}
      </ul>
      Quorum: <h2>{quorum}</h2>
      <Transfer createTransfer={createTransferfucn} />
      <ul>
        {transfers.map((transfer) => (
          <div>
            <li>amount: {transfer.amount}</li>
            <li>approvals: {transfer.approvals}</li>
            <li>id: {transfer.id}</li>
            <li>sent: {transfer.sent}</li>
            <li>to: {transfer.to}</li>
            <button onClick={() => approveTransfer(transfer.id)}>
              approve
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
