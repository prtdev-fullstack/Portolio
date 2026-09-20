import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CursorGlow } from './components/layout/CursorGlow';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { useLenis } from './hooks/useLenis';

const CommandPalette = lazy(() =>
  import('./components/layout/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

function HomeLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <Navbar onOpenCommandPalette={() => setPaletteOpen(true)} />
      <Suspense fallback={null}>
        <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      </Suspense>
      <Home />
      <Footer />
    </>
  );
}

function App() {
  useLenis();

  return (
    <BrowserRouter>
      <LoadingScreen />
      <CursorGlow />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
