import './App.css';
import AppRouting from './app/routing/AppRouting';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <AppRouting />
    </Provider>
  );
}

export default App;
