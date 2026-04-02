import Counter from './components/Counter/Counter'
import './App.css'

function App() {
  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Counter</h1>
        <p>Dynamic Counter System using React Hooks</p>
      </header>
      <section className="counter-section">
        <Counter />
      </section>
      <footer className="author-footer">
        <p>© 2026 React Lab Application</p>
      </footer>
    </main>
  )
}

export default App
