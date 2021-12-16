import React, { useState } from 'react';
import Index from './components/Routes/index';
import { UidContext } from "./components/AppContext"

function App() {
  const [uid, setUid] = useState(null)
  return (
    <UidContext.Provider value={uid}>
      <Index />
    </UidContext.Provider>
  );
}

export default App;