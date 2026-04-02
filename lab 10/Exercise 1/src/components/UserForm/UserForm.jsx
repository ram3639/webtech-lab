import { useState } from 'react';
import './UserForm.css';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        let newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error for the field being typed in
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            console.log('Form Submitted Successfully:', formData);
            setIsSubmitted(true);
            
            // Reset form fields
            setFormData({
                name: '',
                email: '',
                password: '',
            });

            // Reset submission state after a delay
            setTimeout(() => setIsSubmitted(false), 3000);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Join Our Community</h2>
            <p className="form-subtitle">Create your account to get started</p>

            <form className="user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error-input' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error-input' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error-input' : ''}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <button type="submit" className="submit-button">
                    Complete Registration
                </button>
            </form>

            {isSubmitted && (
                <div className="success-banner">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10L8 13L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Registration Successful!
                </div>
            )}
        </div>
    );
};

export default UserForm;
