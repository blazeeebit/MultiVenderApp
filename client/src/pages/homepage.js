import Home from '../components/landingPage';
import Carosel from '../components/carosel';
import HomeBody from '../components/homeBody';

const HomePage = () => {
    return(
        <>
		<div className="container-fluid main-cont">
			<Home />
		</div>
            <Carosel />
            <HomeBody/>
    </>
    )
}

export default HomePage;