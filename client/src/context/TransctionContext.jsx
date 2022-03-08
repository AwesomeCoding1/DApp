// this will work with entire react API so instead of making 
//component for each page we make one component then export it
import { ethers } from "ethers";
import React from "react";
import { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

//so when Metamask was installed then by default a metamask window object was created that we can use
const { ethereum } = window; 

//1st we make a function to fetch our contract 
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum); 
    const signer = provider.getSigner(); 
    // we also need the these three items to get our contract 
    const TransactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return TransactionContract; 
}

// so now we need a place to export this and use it...this is metamask 
// every context provider need children as props and every context provider needs to return somemthing
// so through <Transaction>Provider> we wrap it with all the data that will pass through it
//then to the main.jsx and import it there 
export const TransactionProvider = ( {children} ) => { 
    
            // useState to get current account
    const [currentAccount, setCurrentAccount] = useState();

        // we need state of data form from accounts
    const [formData, setFormData ] = useState ({addressTo: '', amount: '', keyword: '', messaage: ''});
        // now function to handle state changes then pass these values on TransactionContext.ptovider values //then also pass it in our welcome screen function 

        //isLoading function while transaction processes 
    const [isLoading, setIsLoading ] = useState(false); 

    // state for transaction count
    const [transactionCount, setTransactionCount ] = useState(localStorage.getItem('transactionCount'));

    const [transactions, setTransactions] = useState([]); 


        const handleChange = (e, name ) => {
            setFormData((prevState) => ({ ...prevState, [name]: e.target.value}));
        }

        // function to get all the transactions
        const getAllTransactions = async () => {
            try {
                if(!ethereum) return alert("Please Install Metamask!");
                const transactionContract = getEthereumContract();

                const availableTransactions = await transactionContract.getAllTransactions();
                    console.log(availableTransactions);
                    const structuredTransactions = availableTransactions.map((transaction) => ({
                        addressTo: transaction.reciever,
                        addressFrom: transaction.sender,
                        timestamps: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                        messaage: transaction.messaage,
                        keyword: transaction.keyword,
                        amount: parseInt(transaction.amount._hex) / (10 ** 18)
                    }))
                    setTransactions(structuredTransactions);
            } catch (error) {

                console.log(error);
            }
        }


            // now we need to check the user has installed metamask
const checkIfwalletIsConnected = async () => {
    try{
        if (!ethereum) return alert("Please Install Metamask"); 
            // then we await for installation and request account connection 
    const accounts = await ethereum.request({method: 'eth_accounts'});

             //connect to default account[0]
    if(accounts.length) {
        setCurrentAccount(accounts[0]);
            // then we need function to getAllTransactions
            getAllTransactions();
    } else {
        console.log('No Accounts found. ')
    }
    } catch (error) {
        console.log(error);
        throw new Error("No Ethereum Object found")
    }  
}

// to get list of transaction and display them on transaction list components 
const checkIfTransactionsExist = async () => {
    try {
        const TransactionContract = getEthereumContract();
        const transactionCount = await TransactionContract.getTransactionCount(); 

        window.localStorage.setItem("transactionCount", transactionCount)
    } catch (error) {
        console.log(error);

        throw new Error("No Ethereum Object Found")
    }
}



// connecting the wallet using try/catch 
const connectWallet = async () => {
    try {
        if(!ethereum) return alet ("Please Install Metamask"); 
        const accounts = await ethereum.request({method: 'eth_requestAccounts'}); 

        // set default account connection-then  utilize useState to update our app state 
        setCurrentAccount(accounts[0]);
    } catch (error) {
        console.log(error);

        throw new Error ("No etherum object found.")

    }
}

//send transaction button
const sendTransaction = async () => {
    try {
        if (!ethereum) return alert("Please Install Metamask");

            //get the data from the form...
        const { addressTo, amount, keyword, messaage } = formData; 
        const TransactionContract = getEthereumContract(); 
        const parsedAmount = ethers.utils.parseEther(amount); 

        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', //this 21000 gwei
               // value: amount, //this amount needs to be parsed to convert to gwei
               value: parsedAmount._hex, 
            }]
        });
        
        // now function to add transactions to blockchain
        const transactionHash = TransactionContract.addToBlockchain(addressTo, parsedAmount, messaage, keyword);  //this takes awhile so we need to have a loading state useState isLoading

            //loading functions
            setIsLoading(true); 
            console.log(`Loading - ${transactionHash.hash}`); 
            await transactionHash.wait(); 

            setIsLoading(false); 
            console.log(`Success - ${transactionHash.hash}`); 
            await transactionHash.wait();

            //we also need the transaction counter
            const transactionCount = await TransactionContract.getTransactionCount(); 
            setTransactionCount(transactionCount.toNumber()); 

            // to auto reload after transaction is approved
            window.reload()

    } catch (error) {
        console.log(error);
        throw new Error("No Ethereum Object found")
    }
}


//useEffect to check
useEffect(() => {
    checkIfwalletIsConnected();
    checkIfTransactionsExist();
}, []);


    return (
        <TransactionProvider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
            {children}

        </TransactionProvider>
    );
}
