import Header from './components/Header'
import Main from './components/Main'
import OptionsMenuManagerProvider from './context/OptionsMenuManagerProvider'
import PopUpProvider from './context/PopUpProvider'

function App() {
  return (
    <div className='bg-zinc-950 w-screen min-h-screen'>
      <div className='flex-1 flex justify-center px-my-sm py-my-lg'>
        <div className='w-full max-w-6xl'>
          <div className='flex flex-col gap-my-lg'>
            <OptionsMenuManagerProvider>
              <PopUpProvider>
                <Header/>
                <Main/>
              </PopUpProvider>
            </OptionsMenuManagerProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
