import { useState } from 'react';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropogation();
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-3">Reservation Form</h4>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="nameInputText">Name</span>
                        <input type="text" className="form-control" placeholder="John Deaux"
                                aria-label="Name" aria-describedby="nameInputText" 
                                name="name" value={formData.name} onChange={handleChange}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="emailInputText">Email</span>
                        <input type="email" className="form-control" placeholder="john@example.com"
                                aria-label="Email" aria-describedby="emailInputText" 
                                name="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="phoneInputText">Phone Number</span>
                        <input type="tel" className="form-control" placeholder="555-555-5555"
                                aria-label="Phone Number" aria-describedby="phoneInputText" 
                                name="phone" value={formData.phone} onChange={handleChange}/>
                    </div>
                    
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Submit Reservation</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;