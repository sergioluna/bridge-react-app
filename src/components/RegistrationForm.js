import { useState } from 'react';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [submitButton, setSubmitButton] = useState(
        <button type="submit" className="btn btn-primary">Submit Reservation</button>
    )

    const [alert, setAlert] = useState(null)

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        event.stopPropagation();

        setSubmitButton(
            <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Submitting...
            </button>
        )

        const response = await fetch('/api/reservation', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json()
            
            if (data['status'] < 400) {
                setSubmitButton(
                    <button type="submit" className="btn btn-primary" disabled>Submission Complete</button>
                );
                setAlert(
                    <div className="alert alert-success" role="alert">
                        Success! Your reservation has been submitted.
                    </div>
                )
            } else {
                setSubmitButton(
                    <button type="submit" className="btn btn-primary">Submit Reservation</button>
                );
                setAlert(
                    <div className="alert alert-danger" role="alert">
                        Error! Something went wrong on our end. Please complete your reservation by phone.
                    </div>
                )
            }

        } else {
            setAlert(
                <div className="alert alert-danger" role="alert">
                    Error! Something went wrong on our end. Please complete your reservation by phone.
                </div>
            )
        }
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
                                name="name" value={formData.name} onChange={handleChange} required/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="emailInputText">Email</span>
                        <input type="email" className="form-control" placeholder="john@example.com"
                                aria-label="Email" aria-describedby="emailInputText" 
                                name="email" value={formData.email} onChange={handleChange} required/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="phoneInputText">Phone Number</span>
                        <input type="tel" className="form-control" placeholder="555-555-5555"
                                aria-label="Phone Number" aria-describedby="phoneInputText" 
                                name="phone" value={formData.phone} onChange={handleChange} required/>
                    </div>
                    
                    <div className="d-flex justify-content-end mb-3">
                        {submitButton}
                    </div>

                    {alert}
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;