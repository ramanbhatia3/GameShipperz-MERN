import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        if (!email || !password){
            setError("Please enter email and password.")
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const res = await response.json();

            if (!response.ok) {
                setError(res.msg || "Login failed")
                setIsLoading(false)
                return
            }

            localStorage.setItem("token", res.token)
            alert("Login successful!")

            window.location.href = "/"
        } catch (err) {
            console.error("Network error:", err)
            setError("Something went wrong. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center py-12 px-4 font-rajdhani">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Log In to GameShipperz</h1>
            </div>

            <div className="bg-[#111] p-8 rounded-lg border border-[#333] w-full max-w-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                {error && <div className="bg-gs-red/20 text-gs-red p-3 rounded mb-4 text-center border border-gs-red font-semibold">{error}</div>}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-white font-bold mb-2">Email <span className="text-gs-red">*</span></label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2.5 border border-[#555] rounded bg-black text-white focus:outline-none focus:border-gs-red transition-colors" />
                    </div>
                    
                    <div>
                        <label className="block text-white font-bold mb-2">Password <span className="text-gs-red">*</span></label>
                        <div className='relative'>
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2.5 border border-[#555] rounded bg-black text-white focus:outline-none focus:border-gs-red transition-colors" />
                            
                            <span className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-black' onClick={() => setShowPassword(!showPassword)}>&#128065;</span>
                        </div>
                        
                    </div>

                    <button type='submit' className='w-full py-3 mt-4 bg-white text-black font-bold rounded hover:bg-gray-300 transition-colors duration-200 shadow-[0_0_10px_rgba(255,255,255,0.2)]'>
                        {isLoading && (
                            <svg className="m-auto animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isLoading ? "" : "Log in"}
                    </button>
                </form>

                <p className='mt-6 text-center text-gray-400'>
                    New user? <Link to="/signup" className='text-white underline hover:text-gs-red transition-colors'>Sign up</Link>
                </p>

            </div>
        </div>
    )
}

export default Login