import Dashboard from "../src/Dashboard/Dashboard.jsx"
import Asset from "./Wallet/Asset/Asset.jsx";
import Deposit from "./Wallet/Deposit/Deposit.jsx";
import Withdraw from "./Wallet/Withdraw/Withdraw.jsx";
import Transaction from "./Orders/Transaction/Transaction.jsx";
import Spot from "./Orders/Spot/Spot.jsx";
import Market from "./Market/Market.jsx";
import LiveMarket from "./Market/LiveMarket.jsx";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/asset" element={<Asset />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/spot" element={<Spot />} />
        <Route path="/market" element={<Market />} />
        <Route path="/live-market" element={<LiveMarket />} />
      </Routes>
    </Router>
  );
}