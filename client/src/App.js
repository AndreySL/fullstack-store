import './styles/reset.scss'
import './styles/global.scss'
import AppRouter from "./components/AppRouter";
import { Navbar } from './components';


function App() {
  return (
    <div className='main'>
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
