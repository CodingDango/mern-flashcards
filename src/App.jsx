import Header from './components/Header'
import Main from './components/Main'
import AppLayout from './components/AppLayout'
import FlashcardsProvider from './context/FlashcardsProvider';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <AppLayout>
        <Sidebar/>

      <FlashcardsProvider>

          <Main/>

      </FlashcardsProvider>
    </AppLayout>
  );
}

export default App