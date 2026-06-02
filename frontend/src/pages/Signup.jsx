import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phoneNumber: '', password: '', confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        setMessage({ type: '', text: '' })
        setIsLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: "Passwords do not match!" })
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            const res = await response.json()

            if (!response.ok) {
                setMessage({ type: 'error', text: res.msg || res.error || "Signup failed." })
                setIsLoading(false)
                return
            }

            setMessage({ type: 'success', text: "Signup successful! Redirecting to login..." })
            
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error("Signup error:", error)
            setMessage({ type: 'error', text: "Network error. Please try again later." })
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center py-12 px-4 font-rajdhani">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Sign Up for GameShipperz</h1>
            </div>

            <div className="bg-[#111] p-8 rounded-lg border border-[#333] w-full max-w-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                
                {message.text && (
                    <div className={`p-3 rounded mb-4 text-center border font-semibold ${
                        message.type === 'error' ? 'bg-gs-red/20 text-gs-red border-gs-red' : 'bg-green-500/20 text-green-400 border-green-500'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-white font-bold mb-1">Name <span className="text-gs-red">*</span></label>
                        <input type="text" name="name" onChange={handleChange} placeholder="Name" required className="w-full p-2.5 border border-[#555] rounded bg-black text-white focus:outline-none focus:border-gs-red transition-colors"/>
                    </div>

                    <div>
                        <label className="block text-white font-bold mb-1">Email <span className="text-gs-red">*</span></label>
                        <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="w-full p-2.5 border border-[#555] rounded bg-black text-white focus:outline-none focus:border-gs-red transition-colors"/>
                    </div>

                    <div>
                        <label className="block text-white font-bold mb-1">Phone Number <span className="text-gs-red">*</span></label>
                        <input type="number" name="phoneNumber" onChange={handleChange} placeholder="Phone Number" required className="w-full p-2.5 border border-[#555] rounded bg-black text-white focus:outline-none focus:border-gs-red transition-colors"/>
                    </div>

                    <div>
                        <label className="block text-white font-bold mb-1">Password <span className="text-gs-red">*</span></label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="Password" required className="w-full p-2.5 border border-[#555] rounded bg-black text-white focus:outline-none focus:border-gs-red pr-10"/>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>&#128065;</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white font-bold mb-1">Confirm Password <span className="text-gs-red">*</span></label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" required className="w-full p-2.5 border border-[#555] rounded bg-black text-white focus:outline-none focus:border-gs-red pr-10"/>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>&#128065;</span>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 mt-4 bg-white text-black font-bold rounded hover:bg-gray-300 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        {isLoading && (
                            <svg className="m-auto animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isLoading ? "" : "Sign up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Already a user? <Link to="/login" className="text-white underline hover:text-gs-red transition-colors">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;