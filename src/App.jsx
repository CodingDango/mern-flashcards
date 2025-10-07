import Header from './components/Header'
import Main from './components/Main'
import OptionsMenuManagerProvider from './context/OptionsMenuManagerProvider'

function App() {
  return (
    <div className='bg-zinc-950 w-screen min-h-screen'>
      <div className='flex-1 flex justify-center px-my-sm py-my-lg'>
        <div className='w-full max-w-6xl'>
          <div className='flex flex-col gap-my-lg'>
            <Header/>
            
            <OptionsMenuManagerProvider>
              <Main/>
            </OptionsMenuManagerProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
