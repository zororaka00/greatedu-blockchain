import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenPaymentPage } from './pages/TokenPayment';
import { NFTPage } from './pages/NFT';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TokenPaymentPage />} />
        <Route path="/nft" element={<NFTPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;