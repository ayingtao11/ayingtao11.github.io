import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PEMDASCalculator from "./pages/PEMDASCalculator";
import SimpleCalculator from "./pages/SimpleCalculator";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pemdascalculator" element={<PEMDASCalculator />} />
          <Route path="simplecalculator" element={<SimpleCalculator />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

//remember to import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
     <App />
   </BrowserRouter>
  
);
/*
<React.StrictMode>
    <App />
  </React.StrictMode>
  
ReactDOM.render is no longer supported in React 18. Use createRoot instead.
Until you switch to the new API, your app will behave as if it's running React 17.

ReactDOM.render(<App />, document.getElementById("root"));
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
