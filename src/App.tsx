import './App.css'
import HomePage from './pages/HomePage'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    <HomePage />
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
