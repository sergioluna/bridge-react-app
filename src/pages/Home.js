import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container p-5">
            <p className="fs-2">Welcome to Palms Park Bridge</p>
            <p>We are happy that you stopped by today!</p>
            <p>Did you know that according to experts, Bridge is a "Mental Sport?"</p>
            <p>With that said...</p>
            <p>All Mental Atheletes are welcome here.</p>
            <p>Enter for <Link to="registration">registration</Link> to our next event and access to our <Link to="score-calculator">scoring calculator</Link></p>
        </div>    
    );
}

export default Home;