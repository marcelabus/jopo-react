import React from 'react';
import { Route, Routes } from "react-router-dom";

// import '../assets/css/ContentWrapper.css';

import HomePage from '../pages/HomePage.js';
import ProductDetail from '../pages/ProductDetail.js';
import ProductList from '../pages/ProductList.js';
import NotFound from '../pages/NotFound.js';

function ContentWrapper ({allData}) {

  // const id = 15;

  return (
    <React.Fragment>
      <div id="content-wrapper">

       {/* <HomePage allData={allData}  /> */}

       <Routes>
					<Route 
            path="/productDetail/:id" 
            element={<ProductDetail products={allData.products} />}
          />
          <Route 
            path="/productList/:category?" 
            element={<ProductList allData={allData} />}
          />					
          <Route 
            exact path="/" 
            element={<HomePage allData={allData} />} 
          />
					<Route path="*" element={<NotFound />} />
				</Routes>

      </div>

    </React.Fragment>

  );
}

export default ContentWrapper;
