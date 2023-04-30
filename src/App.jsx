import Hero from './components/Hero/Hero'
import Demo from './components/Demo/Demo'
import aibg from './assets/aibg.png'

import './App.css'

function App() {
  

  return (
    <>
      <main>
        <div className="main">
          <div className="gradient">
            <img src={aibg} alt="reload" />
          </div>
          <div className="app">
            <Hero/>
            <Demo/>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
