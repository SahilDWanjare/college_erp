import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import '../components/style.css';
import axios from 'axios';  // For API calls
import { toast } from 'react-toastify';  // For notifications
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [userid, setuserid] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const [isSwitched, setIsSwitched] = useState(false);
    const location = useLocation();

    const [count, setCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        generateCaptcha();
        if (location.state?.fromSignup) {
            setIsSwitched(true);
            setTimeout(() => setIsSwitched(false), 1000);
        }
    }, [location]);

    const generateCaptcha = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
        setCaptcha(randomNum.toString());
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (captchaInput !== captcha) {
            setCaptchaError('Incorrect CAPTCHA. Please try again.');
            generateCaptcha();
            return;
        }

        setCaptchaError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userid, password })
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert("Login Successful!");
            } else {
                alert(data.message);
            }
        } catch (err) {
            setLoading(false);
            console.error("Error:", err);
            // alert("Something went wrong!");
        }
        navigate('/Dashboard');
        setLoading(false);

        // axios.post('')
        //     .then(res => {
        //         setLoading(false);
        //         toast.success('Your Account is Created...');

        //         console.log(res)
        //     })
        //     .catch(err => {
        //         setLoading(false);
        //         toast.success('Something went wrong...');
        //         console.log(err)
        //     })
    };

     // Function to handle button click and show toast
  const handleButtonClick = () => {
    toast.success('Login Successful!'); // Display success toast
  };


    return (

        <div className={`signup-wrapper page-transition`}>
            <div className='signup-box'>
                <div className='signup-left'>
                    <img className='login-image' alt='ERP logo' src={require('../assets/Daily_lifeBusiness_man_working_on_laptop_computer___vetor_Premium_gerado_com_IA-removebg-preview.png')} />
                    <h1 className='signup-left-heading'>College Management System</h1>
                    <p>Manage your all data in an easy way</p>
                </div>

                <div className='signup-right'>
                    <form onSubmit={submitHandler} className='signup-form'>
                        <h1 className='fade-in-heading'>Login to Account</h1>
                        <input onChange={e => setuserid(e.target.value)} type='text' placeholder='User Id' required />
                        <input onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' required />

                        <div className='captcha-section'>
                            <span
                                className='captcha'
                                style={{ userSelect: 'none', pointerEvents: 'none' }}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                {captcha}
                            </span>
                            <button type='button' onClick={generateCaptcha} className='refresh-captcha'>🔄</button>
                        </div>
                        <input className='captcha-input'
                            onChange={e => setCaptchaInput(e.target.value)}
                            type='text'
                            placeholder='Enter CAPTCHA'
                            required
                        />
                        {captchaError && <p className='captcha-error'>{captchaError}</p>}

                        <button onClick={handleButtonClick} className='submit-button' type='submit'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>} Login</button>
                        <p>Create new Account? <Link className='link' to='/signup' state={{ fromLogin: true }}>Signup here</Link></p>
                    </form>
                    <div className='login-footer'>
                        <p>Copyright &copy; 2025 modernCollegeERP_System. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
