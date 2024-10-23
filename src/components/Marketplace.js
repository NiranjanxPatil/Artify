import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState, useEffect } from "react";

// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Import social media icons
import { BsFillEnvelopeOpenFill, BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

// Define the social media array
const SOCIAL_MEDIA = [
  {
    id: "linkedin",
    icon: <BsLinkedin className="hover:-translate-y-1 transition-transform cursor-pointer" />,
    title: "Visit LinkedIn profile",
    url: "https://www.linkedin.com/in/niranjanxpatil",
  },
  {
    id: "github",
    icon: <BsGithub className="hover:-translate-y-1 transition-transform cursor-pointer" />,
    title: "Visit GitHub profile",
    url: "https://github.com/NiranjanxPatil",
  },
  {
    id: "mail",
    icon: <BsFillEnvelopeOpenFill className="hover:-translate-y-1 transition-transform cursor-pointer" />,
    title: "Send me an email",
    url: "mailto:niranjan41210@gmail.com",
  },
  {
    id: "twitter",
    icon: <BsTwitter className="hover:-translate-y-1 transition-transform cursor-pointer" />,
    title: "Connect on Twitter",
    url: "https://twitter.com/NiranjanxPatil",
  },
];

export default function Marketplace() {
  const sampleData = [
    {
      name: "NFT#1",
      description: "",
      website: "http://axieinfinity.io",
      image: "",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#2",
      description: "",
      website: "http://axieinfinity.io",
      image: "",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#3",
      description: "",
      website: "http://axieinfinity.io",
      image: "",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];

  const [data, updateData] = useState(sampleData);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
    let transaction = await contract.getAllNFTs();

    const items = await Promise.all(transaction.map(async (i) => {
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
      };
      return item;
    }));

    updateFetched(true);
    updateData(items);
  }

  useEffect(() => {
    if (!dataFetched) getAllNFTs();
  }, [dataFetched]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col place-items-center mt-20 flex-grow">
        <div className="md:text-xl font-bold text-white">
          Top NFTs
        </div>
        <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
          {data.map((value, index) => (
            <NFTTile data={value} key={index} />
          ))}
        </div>
      </div>

      {/* Footer with Social Media Icons */}
      <footer className="bg-transparent text-black p-4 flex flex-col items-center mx-4">
  {/* Horizontal line */}
  <div className="relative before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-gray-100 mb-4">
    <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-5">
      <p className="font-light">Copyright © 2024 Niranjan_Patil</p>
      <div className="flex items-center">
        <span className="mr-2">Connect_with:</span>
        <a
          href="https://www.linkedin.com/in/niranjanxpatil"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-black hover:text-gray-600 mr-2"
        >
          <BsLinkedin className="hover:-translate-y-1 transition-transform cursor-pointer" />
        </a>
        <a
          href="https://github.com/NiranjanxPatil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600 mr-2"
        >
          <BsGithub className="hover:-translate-y-1 transition-transform cursor-pointer" />
        </a>
        <a
          href="mailto:niranjan41210@gmail.com"
          className="text-black hover:text-gray-600 mr-2"
        >
          <BsFillEnvelopeOpenFill className="hover:-translate-y-1 transition-transform cursor-pointer" />
        </a>
        <a
          href="https://twitter.com/NiranjanxPatil"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600"
        >
          <BsTwitter className="hover:-translate-y-1 transition-transform cursor-pointer" />
        </a>
      </div>
    </div>
  </div>
</footer>



    </div>
  );
}
