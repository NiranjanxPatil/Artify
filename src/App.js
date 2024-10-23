// src/App.js
import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <div className="content flex-grow"> {/* Wrapper around Routes */}
        <Routes>
          <Route path="/" element={<Marketplace />}/>
          <Route path="/nftPage" element={<NFTPage />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/sellNFT" element={<SellNFT />}/>
        </Routes>
      </div>
      {/* Footer built here with Tailwind CSS */}
      <footer className="bg-black text-white p-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Your NFT Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
