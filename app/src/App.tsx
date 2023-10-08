import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenPaymentPage } from './pages/TokenPayment';
import { NFTPage } from './pages/NFT';
import { HealthcarePage } from './pages/Healthcare';
import { IdentityPage } from './pages/Identity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TokenPaymentPage />} />
        <Route path="/nft" element={<NFTPage />} />
        <Route path="/healthcare" element={<HealthcarePage />} />
        <Route path="/identity" element={<IdentityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;