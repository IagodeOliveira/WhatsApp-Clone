import './App.css';
import { AppProvider } from './contexts/ThemeContext';
import Division from './components/Division';

export default () => {
  return (
    <AppProvider>
      <div className="App">
        <Division />
      </div>
    </AppProvider>
  );
}
