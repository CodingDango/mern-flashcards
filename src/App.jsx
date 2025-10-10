import Header from './components/Header'
import Main from './components/Main'
import AppLayout from './components/AppLayout'
import FlashcardsProvider from './context/FlashcardsProvider';

function App() {
  return (
    <AppLayout>
      <Header/>
      <FlashcardsProvider>
        <Main/>
      </FlashcardsProvider>
    </AppLayout>
  );
}

export default App