import React from 'react';
import { Leaf } from 'lucide-react';
import { BreathingBubble } from './components/BreathingBubble';
import { Controls } from './components/Controls';
import { Settings } from './components/Settings';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100">
      <header className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="text-indigo-600" />
          <h1 className="text-3xl font-bold text-indigo-600">Breathe Easy</h1>
        </div>
        <p className="text-gray-600">Find your calm, one breath at a time</p>
      </header>

      <main className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
          <BreathingBubble />
          <Controls />
          <div className="w-full mt-8 pt-8 border-t border-gray-200">
            <Settings />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;