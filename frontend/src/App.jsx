import React from 'react'
import './styles/style.css';
  
import { Navbar, Footer, Main, TopBar } from './layouts';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home, Products, About, Contact, NotFound, ProductSingle } from './routes'

// Hooks
import useDocumentTitle from './hooks/useDocumentTitle';
import useScrollTop from './hooks/useScrollTop';
import useAppScale from './hooks/useAppScale'

function App() {

  useAppScale()
  useDocumentTitle();
  useScrollTop();

  return (
    <>
      <TopBar />
      <Navbar />
      <Main>
        <Routes>
          <Route path='/'             element={<Home />} />

          <Route path='/products'     element={<Products />} />
          <Route path='/products/:id' element={<ProductSingle />} />

          <Route path='/about'        element={<About />} />
          <Route path='/contact'      element={<Contact />} />

          <Route path='*'             element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App
