import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AddressForm from "../components/AddressForm";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [isExecutable, setIsExecutable] = useState(false);

  const addressSubmittedHandler = async (address: string) => {
    setAddress(address);
    try {
      const pubkey = new PublicKey(address);
      const connection = new Connection(clusterApiUrl("mainnet-beta"));
      const balance = await connection.getBalance(pubkey);
      setBalance(balance / LAMPORTS_PER_SOL);
      const info = await connection.getAccountInfo(pubkey);
      console.log(info);
      setIsExecutable(!!info?.executable);
    } catch (error) {
      setAddress("");
      setBalance(0);
      setIsExecutable(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>Start Your Solana Journey</p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Executable?: ${isExecutable ? "Yezzir" : "Nah"}`}</p>
      </header>
    </div>
  );
};

export default Home;
