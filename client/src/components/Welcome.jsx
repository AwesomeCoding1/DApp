
import React, {useContext} from 'react';
import {AiFillPlayCircle} from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { TransactionContext } from '../context/TransctionContext';
import {Loader } from './';
import { shortenAdd } from '../utils/shortenAdd';


// common styls for some components we leave it as empty string 
const commonStyles = "min-h-[70px] sm:px-0 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// input holder for our input boxes for the addresses message box under the 
const Input =({placeholder, name, type, value, handleChange}) => (
    <input 
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
            // e is for the event on value change..it could be names whatever..e is just a name for the event change
        onChange={(e) => handleChange(e, name)}
        className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm border-none white-glassmorphism'
    />
);


const Welcome = () => {
    // so here we use the transaction context with useContext hook with TransactionContext as arg 
    const { currentAccount, connectWallet, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);

    // submit button for transaction function 
    const handleSubmit = (e) => {
        // when button is submitted we need the box fields we created to handle the values for it 
        const {addressTo, amount, keyword, message } = formData;

        e.preventDefault(); //this prevent page reload when button pressed--then check if user filled the fields like addressTo

        if(!addressTo || !amount || !keyword || !message ) return; //return nothing otherwise send transaction 
        
        sendTransaction(); 
    };


    return (
        <div className="flex w-full justiify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br/> across the world
                    </h1>
                            {/* text portion of the page  */}
                    <p className="text-left mt-5 text-white font-light md:9/12 w-11/12 text-base "
                    > Explore the world of Crypto. Buy and sell crypto as well as deposit into your account easily.
                     </p>

                            {/* buy buttons--if there is a currentAccount  */} 
                     { !currentAccount && (
                        <button 
                            type='button' 
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] 
                                    p-3 rounded-full cursor-pointer hover:bg-[#2546bd"
                            > 
                            <AiFillPlayCircle className='text-white mr-2' />
                            <p className="text-white text-base font-semibold"> 
                                Connect Wallet
                            </p> 
                        </button>
                     )}

                 {/* grid for the features to list  */} 
                 <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                     <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability </div>
                     <div className={ commonStyles }> Security </div>
                     <div className={`sm:rounded-tr-2xl ${commonStyles}`} >Ethereum </div> 
                     <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Web 3.0 </div>
                     <div className={commonStyles}>Low Fees </div>                       
                     <div className={`rounded-br-2xl ${commonStyles}`}> Blockchain </div>
                 </div>
                </div>

                
                {/* the right side of website with card and accoun connect info */}
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10  ">
                    <div className="p-3 flex justify-end itmes-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full ">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    {/* inside gradient ether symbol */}
                                    <SiEthereum  fontSize={21} color='#fff'/> 
                                </div>
                                <BsInfoCircle fontSize={17} color='#fff'/> 
                            </div>
                            <div>
                                <p className="text-white font font-light text-sm">
                                    {shortenAdd(currentAccount)} 
                                    {/* but this address shows long string over the card edge so we created a component shortenAddress under utils */}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1 "> 
                                Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* addressTo, message etc...box form goes here under the eth card  */}
                    <div className="p-5 flex-col flex-1 justify-start items-center blue-glassmorphism">
                    <Input placeholder="Address To" name="AddressTo" type="text" handleChange={handleChange} /> 
                    <Input placeholder="Amount (ETH)" name="Amount" type="number" handleChange={handleChange} /> 
                    <Input placeholder="Keyword (GIF)" name="keyword" type="text" handleChange={handleChange} /> 
                    <Input placeholder="Enter Message" name="Message" type="text" handleChange={handleChange} /> 
                           
                            {/* /*  now if our app is loading show something if not then show button   */}
                        <div className="h-[1px] w-full bg-gray-400 my-2"/>
                       
                            {/* if it is loading show the loader component if not show button */}
                        { isLoading  ? ( 
                            <Loader />
                        ) : (
                            // send button on bottom of box
                            <button 
                            type='button' 
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            > 
                            Send Now 
                            </button>  
                        )}
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default Welcome;