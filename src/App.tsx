import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteProvider } from './lib/site'
import { Shopfront } from './components/Shopfront'
import { ThisWeek } from './components/ThisWeek'
import { DoughStory } from './components/DoughStory'
import { People } from './components/People'
import { Menu } from './components/Menu'
import { Delivery } from './components/Delivery'
import { Rooms } from './components/Rooms'
import { WriteToUs } from './components/WriteToUs'
import { Footer } from './components/Footer'
import { ActionBar } from './components/ActionBar'

function Home() {
  return (
    <SiteProvider>
      <Shopfront />
      <main>
        <ThisWeek />
        <DoughStory />
        <People />
        <Menu />
        <Delivery />
        <Rooms />
        <WriteToUs />
      </main>
      <Footer />
      <ActionBar />
    </SiteProvider>
  )
}

export default function App() {
  return (
    <Routes>
      {/* One route, so switching between /brixton and /croydon keeps the page mounted. */}
      <Route path="/:site?" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
