import './App.css';
import { AppProvider } from './contexts/ThemeContext';
import Division from './components/Division';

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <Division />
      </div>
    </AppProvider>
  );
}

export default App;
