import logo from './logo.svg';
import './App.css';
import {useState} from "react";

//import the web3 module
import Web3 from "web3";
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';

//import the contract address and the ABI
const ADDRESS = "0x16A94E74bB0e81036E09e440dFdB1c9f10ADe010"
const ABI = [{"inputs":[{"internalType":"uint256","name":"_startingPoint","type":"uint256"},{"internalType":"string","name":"_startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]


function App() {
  
  const [number, setNumber]= useState('none');
  const[currentMessage, setCurrrentMessage]= useState('none');
  const[newMessage, setNewMessage]= useState('none');


  //initialise the web3 object
  const web3 = new Web3(window.ethereum);

  //initialise the contract ABI and ADDRESS
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  //reading functions
  //number
  async function getNumber(){
    const result = await myContract.methods.getNumber().call();

    setNumber(result.toString())
  }

  //message
  async function getMessage(){
    const message = await myContract.methods.message().call();
    setCurrrentMessage(message);
  }

  //writing functions
  //number
  //increasing the number
  async function increaseNumber() {
    //connecting the account i.e the wallet
    const accountsConnected = await web3.eth.requestAccounts();

    const tx = await myContract.methods.increaseNumber().send({ from: accountsConnected[0] });

    getNumber();
  }
  //decreasing the number
  async function decreaseNumber(){
    const accountsPresent = await web3.eth.requestAccounts();

    const transact = await myContract.methods.decreaseNumber().send({ from: accountsPresent[0] });

    getNumber();
  }

  //message
  async function updateMessage(){
    const connectedAccounts = await web3.eth.requestAccounts();

    const Transaction = await myContract.methods.setMessage(newMessage).send({ from: connectedAccounts[0] });

    getMessage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <button onClick={getNumber}>Get Number </button>
      <br />
      <button onClick={increaseNumber}>Increase Number</button>
      <br />
      <button onClick={decreaseNumber}>Decrease number </button>
      <br/>
      <p>Number: {number}</p>
      <br />
      <button onClick={getMessage}>Get Message</button>
      <br />
      <p>Message: {currentMessage} </p>
      <br />
      <input
      type="Text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Enter new Message"
      />
      <br />
      <button onClick={updateMessage}>Update Message</button>
      <br />

      </header>
    </div>
  );
}

export default App;
