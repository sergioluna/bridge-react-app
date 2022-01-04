import '../components/RegistrationForm';
import RegistrationForm from '../components/RegistrationForm';

function Registration() {
    return (
        <div className="container p-5">
            <p class="fs-2">Registration</p>
            <p>
                Are you ready to play? We play duplicate bridge twice a week
                (Monday & Thursday from 9am till about 12:30), live at:
            </p>
                
            <p>
                <i>12305 207th Street Lakewood</i>
            </p>

            <p>
                Want to join us? You need to register at least 24 hours in
                advance for the following week.
            </p>

            <p>
                Please complete the reservation form below or call us at: 
                <a href="tel:+15622106265">+1 (562) 210-6265</a>
            </p>

            <p>
                We will confirm your seat availability ASAP.
            </p>

            <RegistrationForm />
        </div>
    );
}

export default Registration;