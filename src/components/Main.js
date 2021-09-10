import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, userFailed, userLoading, addFxHistory } from '../redux/ActionCreators';
import { baseUrl } from '../redux/baseUrl';
//import { numberWithCommas } from '../utils/format';
import AddTransaction from '../components/AddTransaction';
import NavBar from './Navbar';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Main() {
    useEffect(() => {
        User();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const fxhistory = useSelector(state => state.fxhistory);

    const total = user.user.fxbalance;
    const incoming = user.user.fxinflowbalance;
    const outgoing = user.user.fxoutflow;

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSubmit = () => {
        toggleModal();
        alert('👍' + ' ' + 'Printed Successfully !');
        //dispatch(loginUser(creds));
    }

    const User = () => {
        let adress = `${auth.id}`
        dispatch(userLoading());

        return fetch(baseUrl + `users/${adress}`)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then(user => { dispatch(addUser(user)); dispatch(addFxHistory(user)) })
            .catch(error => dispatch(userFailed(error.message)));
    };

    const Balance = () => {
        return (
            <>
                <h4>Your Balance</h4>
                <h1>₦{total}</h1>
            </>
        );
    }

    const IncomeExpenses = () => {
        return (
            <div className="inc-exp-container">
                <div>
                    <h4>Inflow</h4>
                    <p className="money plus">₦{incoming}</p>
                </div>
                <div>
                    <h4>Outflow</h4>
                    <p className="money minus">₦{outgoing}</p>
                </div>
            </div>
        );
    }

    const TransactionList = () => {

        return (
            <>
                <h3>
                    <button type="button" className="history-button" onClick={toggleModal}>
                        History
                    </button>
                </h3>
                <ul className="list">
                    {fxhistory.fxhistory.slice(0, 2).map((fxhistory) => (
                        <div key={fxhistory._id}>
                            <li className={fxhistory.format === 'Add' ? 'plus' : fxhistory.format === 'Buy' ? 'pending' : 'minus'}>
                                {fxhistory.text} <span>{fxhistory.date}</span> <span>{fxhistory.format === 'Buy' ? '+' : '-'}${fxhistory.amount}</span>
                            </li>
                        </div>
                    ))}
                </ul>
            </>
        );
    }

    return (
        <div>
            <NavBar />
            <div>
                <Header />
                <div className="rightside col-lg-12">
                    <Balance />
                    <IncomeExpenses />
                    <TransactionList />
                    <AddTransaction />
                </div>
            </div>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Account Statement</ModalHeader>
                <ModalBody>
                <ul className="list">
                        {fxhistory.fxhistory.map((fxhistory) => (
                            <div key={fxhistory._id}>
                                <li className={fxhistory.format === 'Add' ? 'plus' : fxhistory.format === 'Buy' ? 'pending' : 'minus'}>
                                    {fxhistory.text} <span>{fxhistory.date}</span> <span>{fxhistory.format === 'Buy' ? '+' : '-'}${fxhistory.amount}</span>
                                </li>
                            </div>
                        ))}
                        <Button type="submit" value="submit" onClick={handleSubmit}>
                            Print
                        </Button>
                        </ul>
                </ModalBody>
            </Modal>
        </div>
    );
}