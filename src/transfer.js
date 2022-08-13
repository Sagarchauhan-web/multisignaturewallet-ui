import React, { useState } from 'react';

const Transfer = ({ createTransfer }) => {
  const [transfer, setTransfer] = useState([]);

  const setTransferFunc = (e, name) => {
    setTransfer({ ...transfer, [name]: e.target.value });
  };

  const createTransferSubmit = (e) => {
    e.preventDefault();
    createTransfer(transfer);
  };

  return (
    <div>
      <form onSubmit={(e) => createTransferSubmit(e)}>
        <label htmlFor="amount">amount</label>
        <input
          type="text"
          id="amount"
          name="amount"
          onChange={(e) => setTransferFunc(e, 'amount')}
        />
        <label htmlFor="to">To</label>
        <input
          type="text"
          id="to"
          name="to"
          onChange={(e) => setTransferFunc(e, 'to')}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Transfer;
