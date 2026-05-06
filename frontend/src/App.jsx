import React from 'react'
import { Navbar, Footer, Main, TopBar } from './layouts';
import { Routes, Route, useNavigate } from 'react-router-dom'
import './styles/style.css';
import Home from './routes/Home.jsx'
import Products from './routes/Products.jsx';

function App() {

  return (
    <>
      <TopBar></TopBar>
      <Navbar></Navbar>
      <Main>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />

          <Route
            path='/products'
            element={<Products />}
          />
        </Routes>
      </Main>
      <Footer></Footer>
    </>
  )
}

export default App
