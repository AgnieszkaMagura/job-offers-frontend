import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Copy, Check } from 'lucide-react';
import axios, { AxiosError } from 'axios';

// --- Interface synchronized with OfferResponseDto.java ---
interface JobOffer {
    id: string;
    companyName: string;
    position: string;
    salary: string;
    offerUrl: string;
}

// --- Helper Component: Clickable ID for copying to clipboard ---
const CopyableId = ({ id }: { id: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            type="button"
            title="Click to copy ID"
            className="group relative inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-full text-sm font-mono font-bold uppercase tracking-tighter text-gray-500 dark:text-blue-300 transform hover:-translate-y-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
        >
            <span>ID: {id}</span>
            {copied ? (
                <Check size={14} className="text-green-500 animate-bounce" />
            ) : (
                <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded opacity-100">
                    Copied!
                </span>
            )}
        </button>
    );
};

// --- Component: Offer List (Main View) ---
const OfferList = () => {
    const [offers, setOffers] = useState<JobOffer[]>([]);
    const token = localStorage.getItem('token');

    const fetchOffers = useCallback(async () => {
        if (!token) return;
        try {
            const res = await axios.get('http://localhost:8080/offers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const reversedOffers = [...res.data].reverse();
            setOffers(reversedOffers);
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to fetch offers. Check if backend is running.");
        }
    }, [token]);

    // View for unauthorized users
    if (!token) return (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-[50px] shadow-sm px-6">
            <p className="text-2xl font-bold text-red-500 mb-6 uppercase tracking-widest">
                Please login to see job offers
            </p>
            <Link
                to="/login"
                className="px-12 py-4 bg-black text-white rounded-[25px] font-bold text-xl uppercase inline-block transform hover:-translate-y-1 transition-all duration-300"
            >
                Go to Login
            </Link>
        </div>
    );

    return (
        <div className="flex flex-col items-center space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-6xl font-black tracking-tighter dark:text-white uppercase">Job Offers</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 uppercase tracking-widest">Explore new job offers.</p>
                <div className="flex gap-4 justify-center pt-6">
                    <Link to="/search" className="px-8 py-3 bg-[#e8f1ff] border-2 border-black rounded-[15px] font-bold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-sm uppercase text-sm">
                        Search offer by ID
                    </Link>
                    <button onClick={() => { void fetchOffers(); }} className="px-10 py-3 bg-black text-white rounded-[15px] font-bold hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg uppercase text-sm">
                        Get Offers
                    </button>
                    <Link to="/add-offer" className="px-8 py-3 bg-[#e8f1ff] border-2 border-black rounded-[15px] font-bold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-sm uppercase text-sm">
                        Add new offer
                    </Link>
                </div>
            </div>

            <div className="w-full max-w-3xl space-y-8 pb-20">
                {offers.length === 0 ? (
                    <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-[30px] dark:border-gray-700">
                        <p className="text-gray-500 uppercase font-bold">Click "Get Offers" to load data from database</p>
                    </div>
                ) : (
                    offers.map((offer, index) => {
                        const isLatest = index === 0;
                        return (
                            <div key={offer.id} className={`bg-white dark:bg-gray-800 p-8 rounded-[30px] shadow-sm text-center space-y-2 border transition-all duration-500 relative ${isLatest ? 'border-green-500 border-4 scale-105' : 'border-gray-100'}`}>
                                {isLatest && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">
                                        Newest Offer
                                    </div>
                                )}
                                <p className="text-gray-600 dark:text-gray-400"><strong>Position:</strong> {offer.position}</p>
                                <p className="text-gray-600 dark:text-gray-400"><strong>Company:</strong> {offer.companyName}</p>
                                <p className="text-gray-600 dark:text-gray-400"><strong>Salary:</strong> <span className="font-medium text-black dark:text-white">{offer.salary}</span></p>
                                {offer.offerUrl && (
                                    <p className="text-gray-600 dark:text-gray-400 break-all pb-4">
                                        <strong>URL:</strong> <a href={offer.offerUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{offer.offerUrl}</a>
                                    </p>
                                )}
                                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <CopyableId id={offer.id} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

// --- Component: Search View ---
const SearchOffer = () => {
    const [id, setId] = useState('');
    const [offer, setOffer] = useState<JobOffer | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id.trim()) return;
        setLoading(true);
        setError('');
        setOffer(null);
        try {
            const res = await axios.get<JobOffer>(`http://localhost:8080/offers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOffer(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.status === 404 ? "Offer not found" : "Connection error");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-10 py-10">
            <h2 className="text-3xl font-light text-gray-700 dark:text-gray-300 uppercase">Offer ID:</h2>
            <form onSubmit={handleSearch} className="w-full max-w-xl flex flex-col items-center gap-6">
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="w-full p-4 border border-gray-300 rounded-md text-center text-xl outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white" />
                <div className="flex gap-4">
                    <button type="button" onClick={() => navigate('/')} className="px-10 py-3 bg-white border-2 border-black rounded-[15px] font-bold uppercase hover:bg-gray-100 transform hover:-translate-y-1 transition-all">Go back</button>
                    <button type="submit" className="px-10 py-3 bg-black text-white rounded-[15px] font-bold uppercase shadow-lg transform hover:-translate-y-1 transition-all">{loading ? 'Searching...' : 'Search'}</button>
                </div>
            </form>
            {offer && (
                <div className="w-full max-w-2xl mt-12 bg-white dark:bg-gray-800 p-10 rounded-[40px] shadow-xl text-center border border-gray-100">
                    <p className="text-gray-600 dark:text-gray-400"><strong>Position:</strong> {offer.position}</p>
                    <p className="text-gray-600 dark:text-gray-400"><strong>Company:</strong> {offer.companyName}</p>
                    <p className="text-gray-600 dark:text-gray-400"><strong>Salary:</strong> {offer.salary}</p>
                    {offer.offerUrl && (
                        <p className="text-gray-600 dark:text-gray-400 break-all pb-4">
                            <strong>URL:</strong> <a href={offer.offerUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{offer.offerUrl}</a>
                        </p>
                    )}
                    <div className="pt-4 border-t border-gray-100"><CopyableId id={offer.id} /></div>
                </div>
            )}
            {error && <div className="text-red-600 font-bold uppercase mt-4">{error}</div>}
        </div>
    );
};

// --- Component: Login ---
const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/token', credentials);
            localStorage.setItem('token', res.data.token);
            navigate('/');
            window.location.reload();
        } catch {
            alert("Login failed!");
        }
    };
    return (
        <div className="flex flex-col items-center space-y-10">
            <h2 className="text-4xl font-medium dark:text-white uppercase">Login</h2>
            <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
                <input type="text" placeholder="Username" className="w-full p-4 rounded-[25px] bg-white shadow-sm text-center text-xl outline-none focus:ring-2 focus:ring-black" onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
                <input type="password" placeholder="Password" className="w-full p-4 rounded-[25px] bg-white shadow-sm text-center text-xl outline-none focus:ring-2 focus:ring-black" onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
                <button type="submit" className="w-full px-10 py-4 bg-black text-white rounded-[25px] font-bold text-xl transform hover:-translate-y-1 transition-all">Sign In</button>
            </form>
        </div>
    );
};

// --- Component: Register ---
const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/-]).{6,}$/;

        if (!usernameRegex.test(formData.username)) {
            setError("Username: min. 3 characters (letters, numbers, or underscores only).");
            return;
        }

        if (!passwordRegex.test(formData.password)) {
            setError("Password: min. 6 chars, including 1 uppercase, 1 digit, and 1 special character.");
            return;
        }

        try {
            await axios.post('http://localhost:8080/register', formData);
            alert("Account created! You can now login.");
            navigate('/login');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    setError("This username is already taken.");
                } else {
                    setError("Registration failed. Server error.");
                }
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center space-y-10">
            <h2 className="text-4xl font-medium dark:text-white uppercase">Register</h2>
            <form onSubmit={handleRegister} className="w-full max-w-md space-y-6">
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-4 rounded-[25px] bg-white shadow-sm text-center text-xl outline-none focus:ring-2 focus:ring-black"
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                        />
                        <p className="text-[10px] text-gray-400 mt-1 text-center uppercase">Letters, numbers, underscores (min. 3)</p>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-4 rounded-[25px] bg-white shadow-sm text-center text-xl outline-none focus:ring-2 focus:ring-black"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                        <p className="text-[10px] text-gray-400 mt-1 text-center uppercase">Min. 6 chars, 1 uppercase, 1 digit, 1 special</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 rounded-[20px] text-center text-sm font-bold animate-shake">
                        {error}
                    </div>
                )}

                <button type="submit" className="w-full px-10 py-4 bg-black text-white rounded-[25px] font-bold text-xl transform hover:-translate-y-1 transition-all">
                    Create Account
                </button>
            </form>
        </div>
    );
};

// --- Component: Add New Offer Form ---
const AddOfferForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        position: '',
        salary: '',
        offerUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post('http://localhost:8080/offers', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (res.status === 201 || res.status === 200) {
                alert("Success! Offer saved in MongoDB.");
                navigate('/');
            }
        } catch (err) {
            const error = err as AxiosError<{ messages?: string[] }>;
            // Enhanced logging for debugging
            console.error("Backend Error Response:", error.response?.data);

            const serverMessages = error.response?.data?.messages;
            const errorMessage = Array.isArray(serverMessages)
                ? serverMessages.join(", ")
                : "Failed to save offer. Check console for details.";

            alert("Error: " + errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col items-center space-y-10">
            <h2 className="text-4xl font-medium dark:text-white uppercase">Add New Offer</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
                <input name="companyName" value={formData.companyName} className="w-full p-4 rounded-full border bg-white dark:bg-gray-800 dark:text-white shadow-sm outline-none focus:ring-2 focus:ring-black" placeholder="Company Name" onChange={handleChange} required />
                <input name="position" value={formData.position} className="w-full p-4 rounded-full border bg-white dark:bg-gray-800 dark:text-white shadow-sm outline-none focus:ring-2 focus:ring-black" placeholder="Position" onChange={handleChange} required />
                <input name="salary" value={formData.salary} className="w-full p-4 rounded-full border bg-white dark:bg-gray-800 dark:text-white shadow-sm outline-none focus:ring-2 focus:ring-black" placeholder="Salary" onChange={handleChange} required />
                <input name="offerUrl" value={formData.offerUrl} className="w-full p-4 rounded-full border bg-white dark:bg-gray-800 dark:text-white shadow-sm outline-none focus:ring-2 focus:ring-black" placeholder="Offer URL" onChange={handleChange} required />
                <div className="flex gap-4">
                    <button type="button" onClick={() => navigate('/')} className="w-1/3 p-4 bg-gray-200 text-black rounded-full font-bold uppercase hover:bg-gray-300 transition-all">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className={`w-2/3 p-4 bg-black text-white rounded-full font-bold shadow-lg uppercase transform hover:-translate-y-1 transition-all ${isSubmitting ? 'opacity-50' : ''}`}>
                        {isSubmitting ? 'Saving...' : 'Save Offer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- MAIN APPLICATION ---
export default function App() {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <Router>
            <div className="min-h-screen bg-[#e8f1ff] dark:bg-gray-900 transition-colors duration-300">
                <nav className="p-8 max-w-5xl mx-auto flex justify-center items-center">
                    <div className="flex gap-10 items-center text-xl text-gray-700 dark:text-gray-300 font-bold">
                        {token ? (
                            <>
                                <span className="uppercase tracking-widest">Hello, Agnieszka!</span>
                                <button onClick={logout} className="underline uppercase transform hover:-translate-y-0.5 transition-all">Logout</button>
                            </>
                        ) : (
                            <div className="flex gap-10">
                                <Link to="/login" className="underline uppercase tracking-widest text-sm transform hover:-translate-y-0.5 transition-all">Login</Link>
                                <Link to="/register" className="underline uppercase tracking-widest text-sm transform hover:-translate-y-0.5 transition-all">Register</Link>
                            </div>
                        )}
                        <button onClick={() => setDarkMode(!darkMode)} className="ml-4 transform hover:scale-110 transition-transform">
                            {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} />}
                        </button>
                    </div>
                </nav>
                <main className="max-w-6xl mx-auto py-10 px-6">
                    <Routes>
                        <Route path="/" element={<OfferList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/add-offer" element={<AddOfferForm />} />
                        <Route path="/search" element={<SearchOffer />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}