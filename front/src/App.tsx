import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductsList from "./views/products/list";
import WarehousesList from "./views/warehouses/list";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>Home Page</h1>
                  <Link to="/products">Go to Products</Link>
                  <br />
                  <Link to="/warehouses">Go to Warehouses</Link>
                </div>
              }
            />

            <Route path="/products" element={<ProductsList />} />
            <Route path="/warehouses" element={<WarehousesList />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;














