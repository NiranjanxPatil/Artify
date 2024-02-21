import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";

export default function Marketplace() {
const sampleData = [
    {
        "name": "NFT#1",
        "description": "",
        "website":"http://axieinfinity.io",
        "image":"",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#2",
        "description": "",
        "website":"http://axieinfinity.io",
        "image":"",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#3",
        "description": "",
        "website":"http://axieinfinity.io",
        "image":"",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}

/*
import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import MarketplaceJSON from "../Marketplace.json";
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";

export default function Marketplace() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    async function fetchNfts() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          MarketplaceJSON.address,
          MarketplaceJSON.abi,
          signer
        );

        const tx = await contract.getAllNFTs();
        const nftPromises = tx.map(async (item) => {
          const tokenURI = await contract.tokenURI(item.tokenId);
          const metadata = await axios.get(tokenURI);
          return {
            tokenId: item.tokenId.toNumber(),
            seller: item.seller,
            owner: item.owner,
            price: ethers.utils.formatUnits(item.price.toString(), "ether"),
            image: metadata.data.image,
            name: metadata.data.name,
            description: metadata.data.description,
          };
        });

        const nfts = await Promise.all(nftPromises);
        setNfts(nfts);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNfts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col place-items-center mt-20">
        <div className="md:text-xl font-bold text-white">Top NFTs</div>
        <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
          {nfts.map((nft) => (
            <NFTTile key={nft.tokenId} data={nft} />
          ))}
        </div>
      </div>
    </div>
  );
}*/