import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='bg-yellow-100'>hello</div>
  </StrictMode>
);
