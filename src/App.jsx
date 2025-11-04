import React, { useState } from 'react';
// Assuming the CSS file is present or you can add simple styles later.
import './index.css'; 

const App = () => {
    // *** 1. State Management (CRITICAL for Form Handling in React) ***
    // Controlled components: State tracks and controls the value of every input.
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5, // Default rating
        feedback: '',
    });
    const [message, setMessage] = useState(''); // State for user feedback (success/error)

    // Handle input change: Updates the corresponding piece of formData
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value // Dynamic key update
        }));
    };

    // *** 2. Form Submission Handler (CRITICAL for Form Handling) ***
    const handleSubmit = async (e) => {
        // Stop the browser from performing a default page reload/navigation
        e.preventDefault(); 
        setMessage('Submitting...');

        try {
            // Send POST request to the Express Server (Q1) running on port 3001
            const response = await fetch('http://localhost:3001/submit-feedback', {
                method: 'POST',
                headers: {
                    // Specify that the data being sent is JSON
                    'Content-Type': 'application/json',
                },
                // Convert the JavaScript state object into a JSON string
                body: JSON.stringify(formData), 
            });

            const data = await response.json();

            if (response.ok) {
                // Proof Point: Tells the user to check the server terminal (Q1 success)
                setMessage(`✅ Q2 Success: Feedback received by the server! Check Express terminal for proof.`);
                setFormData({ name: '', email: '', rating: 5, feedback: '' }); // Clear form
            } else {
                setMessage(`Error: ${data.message || 'Submission failed.'}`);
            }
        } catch (error) {
            // Error if Express server (Q1) is not running
            setMessage('Network Error: Could not connect to the Express server. Is it running on port 3001?');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
            <h2>2. React Feedback Form (Frontend)</h2>
            <p style={{ color: 'red', fontWeight: 'bold' }}>Ensure your Express server (Q1) is running in a separate terminal.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px' }}
                />
                
                <label>Rating (1-5):</label>
                <input
                    type="number"
                    name="rating"
                    min="1" max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px' }}
                />
                
                <label>Feedback:</label>
                <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', height: '100px' }}
                ></textarea>

                <button type="submit" style={{ padding: '10px', background: 'navy', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Submit to Express Server (Q1)
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', fontWeight: 'bold', color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default App;