import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Funnel from './Funnel'
import Live from './pages/Live'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Funnel />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </BrowserRouter>
  )
}
