import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, UserPlus, LogIn, LogOut, DollarSign, MapPin } from 'lucide-react';

interface JobOffer {
    id: string;
    title: string;
    company: string;
    salary: string;
}

// --- Komponent Logowania ---
const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/token', credentials);
            localStorage.setItem('token', response.data.token);
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error(error);
            setError('Błąd logowania. Sprawdź dane.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600 flex items-center gap-2"><LogIn /> Logowanie</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input type="text" placeholder="Login" className="w-full p-3 border rounded-xl"
                       onChange={e => setCredentials({...credentials, username: e.target.value})} />
                <input type="password" placeholder="Hasło" className="w-full p-3 border rounded-xl"
                       onChange={e => setCredentials({...credentials, password: e.target.value})} />
                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">Zaloguj się</button>
            </form>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
    );
};

// --- Komponent Rejestracji ---
const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [msg, setMsg] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/register', formData); //
            setMsg('Rejestracja udana! Możesz się zalogować.');
        } catch (error) {
            console.error(error);
            setMsg('Błąd rejestracji.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600 flex items-center gap-2"><UserPlus /> Rejestracja</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input type="text" placeholder="Nowy login" className="w-full p-3 border rounded-xl"
                       onChange={e => setFormData({...formData, username: e.target.value})} />
                <input type="password" placeholder="Nowe hasło" className="w-full p-3 border rounded-xl"
                       onChange={e => setFormData({...formData, password: e.target.value})} />
                <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700">Utwórz konto</button>
            </form>
            {msg && <p className="mt-4 text-center font-medium text-indigo-500">{msg}</p>}
        </div>
    );
};

// --- Komponent Listy Ofert ---
const OfferList = () => {
    // 1. Informujemy hook useState, że będzie przechowywał tablicę obiektów JobOffer
    const [offers, setOffers] = useState<JobOffer[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/offers')
            .then((res) => setOffers(res.data))
            .catch((error) => console.error("Błąd API:", error));
    }, []);

    return (
        <div className="grid gap-6 mt-8">
            {/* 2. Tutaj TypeScript już wie, że 'offer' to JobOffer, więc usuwamy :any */}
            {offers.map((offer) => (
                <div key={offer.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{offer.title}</h3>
                            <div className="flex items-center gap-2 text-gray-500 mt-1">
                                <Briefcase size={16} /> <span>{offer.company}</span>
                            </div>
                        </div>
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Nowa</span>
                    </div>
                    <div className="mt-6 flex gap-6 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600"><MapPin size={16}/> Zdalnie</div>
                        <div className="flex items-center gap-1.5 font-bold text-green-700"><DollarSign size={16}/> {offer.salary}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Główna Aplikacja ---
const App = () => {
    const token = localStorage.getItem('token');
    const logout = () => { localStorage.removeItem('token'); window.location.reload(); };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm border-b px-8 py-4 sticky top-0 z-10">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <Link to="/" className="text-2xl font-black text-indigo-600 italic">JobOffers</Link>
                        <div className="flex gap-6 items-center font-semibold text-gray-600">
                            <Link to="/" className="hover:text-indigo-600">Oferty</Link>
                            {!token ? (
                                <>
                                    <Link to="/register" className="hover:text-indigo-600">Rejestracja</Link>
                                    <Link to="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-100">Zaloguj</Link>
                                </>
                            ) : (
                                <button onClick={logout} className="flex items-center gap-2 text-red-500 hover:text-red-700">
                                    <LogOut size={18} /> Wyloguj
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto py-12 px-4">
                    <Routes>
                        <Route path="/" element={<OfferList />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;