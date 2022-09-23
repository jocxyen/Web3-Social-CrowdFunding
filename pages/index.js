import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import styles from '../styles/Home.module.css'
import axios from "axios";
import { useState } from 'react';
export default function Home() {
  const [cover, setCover] = useState("");
  function handleChange(event) {
    setCover(event.target.files[0])
  }
const form = new FormData();
form.append("file", cover);

const options = {
  method: 'POST',
  url: 'https://api.nftport.xyz/v0/files',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
    Authorization: process.env.NEXT_PUBLIC_NFTPORT_KEY
  },
  data: form
};
function handleSubmit(event) {
  event.preventDefault()
  console.log(options)
axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});}
  return (
    <div className={styles.container}>
      <Head>
        <title>Just For Society</title>
        <meta name="description" content="Web3 Decentralized Funding Platform For Public Good" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  )
}
