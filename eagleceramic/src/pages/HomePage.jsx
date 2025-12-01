import HeroSection from '../components/HeroSection'
import OurClients from '../components/OurClients'
import Testimonials from '../components/Testimonials'
import TrustedChoise from '../components/TrustedChoise'
import WhyOurProducts from '../components/WhyOurProducts'
import AboutUs from './AboutUs'
import Products from './Products'
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <WhyOurProducts/>
            <TrustedChoise/>
  <OurClients/>
  <Testimonials/>
      <Products/>
    
    </>
  )
}

export default HomePage