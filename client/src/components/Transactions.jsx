import React, {useContext} from "react";
import {TransactionContext } from '../context/TransctionContext';
import dummyData from '../utils/dummyData';
import { shortenAdd } from "../utils/shortenAdd";

const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url} ) => {
    return (
        <div className="bg-[#181918] m-4 flex flex-1
                2xl:min-w[450]
                2xl:min-w[450]
                sm:min-w[270]
                sm:max-w[300]
                flex-col p-3 rounded-md hover:showdow-2xl"
                 >
                    <div className="flex flex-col items-center w-full mt-3">
                        <div className=" w-full mb:6 p-2">
                            <a href={`https://ropsten.ethereum.io/address/${addressFrom}`}
                                target="_blank" rel="noopener noreferrer">
                                    <p className="text-white text-base">From: {shortenAdd(addressFrom)}</p>
                                </a>
                                <a href={`https://ropsten.ethereum.io/address/${addressTo}`}
                                target="_blank" rel="noopener noreferrer">
                                    <p className="text-white text-base">To: {shortenAdd(addressTo)}</p>
                                </a>
                                
                                <p className="text-white text-base"> Amount: {amount} ETH</p>
                                {/* if there is a message to dispaly the message */}
                                {message && (
                                    <> 
                                    <br />
                                    <p> Message: {message}</p>
                                    </>
                                )}
                                        {/* transactionCard timestamps  */}
                                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shodow-2xl"> 
                                <p className="text-[#37c7d1] font-bold">{timestamp}</p>
                                </div>
                        </div>

                    </div>
        </div>
    )
}


const Transactions = () => { 
    // to get transactions for the current account
    const {currentAccount, transactions } = useContext(TransactionContext); 
    return(
        <div className="flex w-full justify-center items-center 2xl:px20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {/* here we need 2 things latest transactions if wallet connected */}
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                            Latest Transactions
                    </h3>
                    // {/* otherwise it will connect your account to see latest transactions */}
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                            Connect Account to See the Latest Transactions
                    </h3>
                )}

                {/* latest transaction section on website we will pass the dummyData map them in reverse to latest and dispay in new component TransactionCard */}
                <div className="flex flex-wrap justify-center items-center mt-10"> 
                    {transactions.reverse().map((transaction, i ) => (
                        <TransactionCard key={i} {...transaction }/> 
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Transactions; 