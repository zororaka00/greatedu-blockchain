import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenPaymentPage } from './pages/TokenPayment';
import { NFTPage } from './pages/NFT';
import { HealthcarePage } from './pages/Healthcare';
import { IdentityPage } from './pages/Identity';
import { LogisticsPage } from './pages/Logistics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TokenPaymentPage />} />
        <Route path="/nft" element={<NFTPage />} />
        <Route path="/healthcare" element={<HealthcarePage />} />
        <Route path="/identity" element={<IdentityPage />} />
        <Route path="/logistics" element={<LogisticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;