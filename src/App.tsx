import './App.scss';
import AppRouter from './App.route';
import { Provider } from 'react-redux';
import {store} from './Redux/store';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <AppRouter></AppRouter>
      </div>
    </Provider>
  );
}

export default App;
