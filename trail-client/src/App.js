import { useEffect, useState } from 'react';
import { getEntries } from './api/entries';

function App() {
  const [entries, setEntries] = useState([]);

  // Fetch entries from the backend when the component mounts
  useEffect(() => {
    getEntries().then(setEntries); // calls our API function and stores the data
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Trail Journal</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.id} className="mb-2">
            <strong>{entry.attributes.title}</strong> – {entry.attributes.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
// This is a simple React component that fetches entries from the Strapi backend
// and displays them in a list.