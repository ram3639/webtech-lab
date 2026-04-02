import PokemonList from './components/PokemonList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pokédex Fetcher</h1>
        <p>A simple application demonstrating side effects and API data fetching in React using the PokéAPI.</p>
      </header>
      <main>
        <PokemonList />
      </main>
    </div>
  );
}

export default App;
