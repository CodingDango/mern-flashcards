import Header from './components/Header'
import Main from './components/Main'
import AppLayout from './components/AppLayout'
import FlashcardsProvider from './context/FlashcardsProvider';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <AppLayout>
      <div className='row-span-2'>
        <Sidebar/>
      </div>
      <FlashcardsProvider>
        <Main/>
      </FlashcardsProvider>
    </AppLayout>
  );
}

export default App