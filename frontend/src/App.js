import './App.css';
import NavBar from './feature/navbar/NavBar';
import AppRouter from './AppRouter';

function App() {
  return (
    <div>
      <NavBar />
      <div className='content-settings'>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
