import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollCatAnimation } from './components/ScrollCatAnimation';
import { HorizontalFeatures } from './components/HorizontalFeatures';
import { CatGallery } from './components/CatGallery';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Download } from './pages/Download';
import { Comparison } from './pages/Comparison';
import { Documentation } from './pages/Documentation';

function Layout() {
  return (
    <div className="relative theme-shell">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const targetId = hash.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [hash]);

  return null;
}

function Home() {
  return (
    <>
      <ScrollCatAnimation />
      <Hero />
      <HorizontalFeatures />
      <CatGallery />
      <Testimonials />
      <CTA />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/download" element={<Download />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/docs/:version/:slug" element={<Documentation />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
