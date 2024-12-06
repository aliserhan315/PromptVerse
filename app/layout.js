import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Suspense } from 'react';
export const metadata = {
  title: "PromptVerse",
  description: "Discover and Share AI Prompts",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Suspense>
        <Provider>
      <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav/>
          {children}
        </main>
      </Provider>
      </Suspense>
        
      </body>
    </html>
  );
};

export default Rootlayout;
