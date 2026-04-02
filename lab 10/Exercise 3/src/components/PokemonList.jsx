import { useState, useEffect } from "react";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // Introduce a slight delay to show the loading state more visibly
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!response.ok) {
          throw new Error("Failed to fetch data from the PokeAPI");
        }
        
        const data = await response.json();
        
        // Map the results to include an ID and image URL
        const pokemonWithDetails = data.results.map((p, index) => {
          // Extract ID from the URL (e.g. "https://pokeapi.co/api/v2/pokemon/1/")
          const id = p.url.split('/').filter(Boolean).pop();
          return {
            id,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        });

        setPokemon(pokemonWithDetails);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Catching Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oh no! A wild error appeared.</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-grid">
        {pokemon.map((p) => (
          <div key={p.id} className="pokemon-card">
            <img src={p.image} alt={p.name} className="pokemon-image" />
            <h3 className="pokemon-name">{p.name}</h3>
            <p className="pokemon-id">#{p.id.toString().padStart(3, '0')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
