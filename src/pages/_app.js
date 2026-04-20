import '../css/main.css';
import '../styles/globals.scss';
import '../components/Navbar/Navbar.scss';
import '../components/HeroSection/HeroSection.scss';
import '../components/ScrollCamera/ScrollCamera.scss';
import '../components/StorySection/StorySection.scss';
import '../components/Footer/Footer.scss';

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
