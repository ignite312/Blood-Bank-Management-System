import logo from './image/spectre.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey Welcome
        </p>
        <a
          className="App-link"
          href="https://instagram.com/sajjdemon"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Instagram
        </a>
      </header>
    </div>
  );
}

export default App;



