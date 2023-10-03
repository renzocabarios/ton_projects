import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { NFTStorage, File, Blob } from "nft.storage";
import { ethers, BrowserProvider, Contract } from "ethers";

import { getContract } from "./config";

const NFT_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBBMDk3NDZFQzRhOTdhMjE5MDQ3ZmY4NWJjMTRGNjAzMmQxNkE4MTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5Mjg5NTgwNjQ1MywibmFtZSI6IlAwMSJ9.dNXXL9OOaG20ol2GGQs97Od9MM5i49Db0ArzUI1Cubc";
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

function App() {
  const [count, setCount] = useState(0);
  const [tempfile, settempfile] = useState("");
  const [provider, setProvider] = useState<null | BrowserProvider>(null);
  const [wallet, setWallet] = useState<null | string>(null);

  const onChange = (event: any) => {
    settempfile(event.target.files[0]);
  };

  const storemetadata = async () => {
    const imageFile = new File([tempfile], "nft.png", {
      type: "image/png",
    });
    const metadata = await client.store({
      name: "My sweet NFT",
      description: "Just try to funge it. You can't do it.",
      image: imageFile,
    });

    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(wallet, `ipfs://${metadata.ipnft}`);
      await tx.wait();
      console.log(tx);

      alert(`Transaction Hash: ${tx} Succefully minted`);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Transaction failed: ${decodedError?.args}`);
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window as any;

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWallet(accounts[0]);
  };

  useEffect(() => {
    const checkProvider = async () => {
      const { ethereum } = window as any;
      try {
        const provider = new BrowserProvider(ethereum);
        setProvider(provider);
      } catch (e: any) {}
    };

    checkProvider();
  }, []);

  return (
    <>
      <input type="file" onChange={onChange} />
      <button onClick={storemetadata}>Upload</button>
      <button onClick={connectWallet}>{wallet}</button>
    </>
  );
}

export default App;
