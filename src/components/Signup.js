import React, { useState, useEffect } from 'react';
import { Link, useLocation,useNavigate, Navigate } from 'react-router-dom';
import '../components/style.css';
import axios from 'axios';  // For API calls
import { toast } from 'react-toastify';  // For notifications
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
    const [FullName, setFullname] = useState('');
    const [email, setemail] = useState('');
    const [userid, setuserid] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const [animate, setAnimate] = useState(false);
    const location = useLocation();

    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        generateCaptcha();
        if (location.state?.fromLogin) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 1000);
        }
    }, [location]);

    const generateCaptcha = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
        setCaptcha(randomNum.toString());
    };

    const submitHandler = async (event) => {
        event.preventDefault();
    
        setLoading(true);
        navigate('/Login');

        // axios.post('')
        // .then(res=>{
        //     setLoading(false);
        //     toast.success('Your Account is Created...');
        //     Navigate('/Dashboard')
        //     console.log(res)
        // })
        // .catch(err=>{
        //     setLoading(false);
        //     toast.success('Something went wrong...');
        //     console.log(err)
        // })
    };
     const handleButtonClick = () => {
            // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
        toast.success('Account created successfully!'); // Show success toast if valid
        } else {
        toast.error('Please enter a valid email.'); // Show error toast if invalid
        }
      };
    

    return (
        <div className={`signup-wrapper page-transition`}>
            <div className='signup-box'>
                <div className='signup-left'>
                    <img alt='ERP logo' src={require('../assets/mainlogo.png')} />
                    <h1 className='signup-left-heading'>College Management System</h1>
                    <p>Manage your all data in an easy way</p>
                </div>

                <div className='signup-right'>
                    <form onSubmit={submitHandler} className='signup-form'>
                        <h1 className='fade-in-heading'>Create Your Account</h1>
                        <input onChange={e => setFullname(e.target.value)} type='text' placeholder='Student Name' required />
                        <input onChange={e => setemail(e.target.value)} value={email} type='email' placeholder='College email Id' required />
                        <input onChange={e => setuserid(e.target.value)} type='text' placeholder='User Id' required />
                        <input onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' required />

                        <button onClick={handleButtonClick} className='submit-button' type='submit'>
                            {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>} Signup
                        </button>
                        <p>Already have an account? <Link className='link' to='/login' state={{ fromSignup: true }}>Login here</Link></p>
                    </form>
                    <div className='login-footer'>
                    <p>Copyright &copy; 2025 modernCollegeERP_System. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
