// src/components/LoginForm.jsx
const LoginForm = ({ onSubmit, loading, error, email, setEmail, password, setPassword }) => (
  <><form onSubmit={onSubmit}>
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
    <input 
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-2 mb-4 border border-gray-300 rounded" 
    required 
    />
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
    <input
    id="password"
     type="password"
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 mb-4 border border-gray-300 rounded"
       required 
       />
    {error && <p className="text-red-600">{error}</p>}
    <button type="submit" disabled={loading}
     className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >{loading ? "Logging in..." : "Login"}</button>
  </form>
  <p className="text-center text-xs mt-4 text-gray-600">
            By signing in, I agree to the <strong>Privacy Policy.</strong>
          </p></>
);

export default LoginForm;
