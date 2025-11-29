import HeroSection from '../components/HeroSection'
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

      <Products/>
    </>
  )
}

export default HomePage