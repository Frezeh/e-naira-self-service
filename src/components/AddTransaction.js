import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postFxPurchase, postFxSale } from '../redux/ActionCreators';

export default function AddTransaction() {
  const [buytext, setBuyText] = useState('');
  const [buyamount, setBuyAmount] = useState(0);
  const [selltext, setSellText] = useState('');
  const [sellamount, setSellAmount] = useState(0);

  const dispatch = useDispatch();

  const buySubmit = e => {
    e.preventDefault();
    //alert("Current State is: " + JSON.stringify(text, amount));
    dispatch(postFxPurchase(buytext, buyamount));
  }

  const sellSubmit = e => {
    e.preventDefault();
    //alert("Current State is: " + JSON.stringify(text, amount));
    dispatch(postFxSale(selltext, sellamount));
  }

  return (
    <div>
      <h3>Deposit eNaira</h3>
      <form onSubmit={sellSubmit}>
        <div className="form-control">
          <label htmlFor="text">WalletID</label>
          <input className="tellertext" type="text" value={selltext} onChange={(e) => setSellText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input className="telleramount" type="number" value={sellamount} onChange={(e) => setSellAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">
          Deposit
        </button>
      </form>

      <h3>Withdraw eNaira</h3>
      <form onSubmit={buySubmit}>
        <div className="form-control">
          <label htmlFor="text">WalletID</label>
          <input className="tellertext" type="text" value={buytext} onChange={(e) => setBuyText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="text">Amount</label>
          <input className="telleramount" type="number" value={buyamount} onChange={(e) => setBuyAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">
          Withdraw
          </button>
      </form>
    </div>
  )
}
