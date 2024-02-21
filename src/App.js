import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailure";
import "./index.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failure" element={<PaymentFailure />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
