import { CameraFeed } from "./components/cameraFeed";
import './App.css'

function App() {
  return (
    <>
      <div className='wholePage'>
        <div className='logo'> 
          <h3>ASL Translator</h3>
        </div>
        <div className='cameraBody'>
          <CameraFeed />
        </div>
      </div>
    </>
  )
}

export default App
