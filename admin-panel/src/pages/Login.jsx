import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post('http://localhost:5003/api/admin/login', { email, password });
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.leftPanel}
      >
        <div style={styles.logoContainer}>
          <img src="/Ellipse 1.png" alt="BATELEC logo" style={{ height: 100 }} />
        </div>
        <h2 style={styles.title}>BATELEC | Admin Side for EcoTrack</h2>
        <p style={styles.subtitle}>User Management and Reports Tracking</p>
        <form onSubmit={handleLogin} style={styles.form}>
          <h3 style={styles.formTitle}>Sign in</h3>
          <p style={styles.formSubtitle}>For <strong>Employee Access</strong> only</p>

         <div style={styles.inputContainer}>
  <FiMail style={styles.icon} />
  <input
    type="email"
    placeholder="Enter your email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    style={styles.input}
  />
</div>

<div style={styles.inputContainer}>
  <FiLock style={styles.icon} />
  <input
    type="password"
    placeholder="Enter your Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    style={styles.input}
  />
</div>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.footerRow}>
            <label style={{ color: '#112F3E' }}>
              <input type="checkbox" style={{ marginRight: 6 }} /> Remember me
            </label>
            <a href="" style={{ fontSize: 12 }}>Forgot Password?</a>
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.rightPanel}
      >
        <div style={styles.rightHeader}>
          <img src="/ecotack logo.png" height={50} />
          <img src="/Ellipse 1.png" height={50} />
        </div>
        <h1 style={styles.rightTitle}>EcoTrack ADMINISTRATOR Access</h1>
        <p style={styles.missionTitle}>Our Mission</p>
        <p style={styles.missionText}>
          At EcoTrack, we are committed to empowering individuals and businesses with smart energy
          solutions that promote efficiency, sustainability, and cost savings. By leveraging IoT technology
          and real-time data tracking, we aim to help users monitor, manage, and reduce their energy
          consumption for a more eco-friendly future.
        </p>
        <p style={styles.downloadTitle}>Download EcoTrack</p>
        <div style={styles.downloadButtons}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" height={40} />
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" height={40} />
        </div>
        <p style={styles.missionTitle}>Who We Are</p>
        <p style={styles.missionText}>
          EcoTrack is a cutting-edge energy management platform that integrates with smart plugs
          and IoT-enabled devices to provide real-time energy tracking, analytics, and automation.
          Whether you’re looking to optimize your electricity usage at home or manage multiple
          appliances in a commercial space, EcoTrack gives you full control over your energy
          consumption—anytime, anywhere.
        </p>
        <footer style={styles.footer}>2025 EcoTrack Development Team</footer>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    backgroundColor: '#EFFAF0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  leftPanel: {
    flex: 1,
    background: '#112F3E',
    color: '#EFFAF0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    height: '100%',
  },
  rightPanel: {
    flex: 2,
    padding: '5%',
    textAlign: 'left', // Align text to the left in the right panel
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Align content to the left
    justifyContent: 'center',
    height: '100%',
  },
  rightHeader: {
    display: 'flex',
    justifyContent: 'flex-end', // Align images to the right
    width: '100%',
  },
  form: {
    background: '#fff',
    padding: '10%',
    borderRadius: 10,
    maxWidth: 300,
    width: '100%',
    textAlign: 'center',

  },
  formTitle: {
    color: '#1A3C4D',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  formSubtitle: {
    color: '#1A3C4D',
    fontSize: '15px',
    fontStyle: 'italic',
    textAlign: 'left',
    marginBottom: '10px',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: '20px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F0F9F0',
    borderRadius: '6px',
    border: '1px',
    paddingLeft: '16px', // Space for icon
  },
  icon: {
    color: '#1A3C4D',
    fontSize: '18px',
    marginRight: '5px', // Space between icon and input
    flexShrink: 0,
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: 'none',opwiwqmzznxvcbz,mxncbhbmzxcvbnm, 
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    color: '#F0F9F0',

},
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#7AC17B',
    border: 'none',
    borderRadius: 5,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 10,
  },
  rightTitle: {
    color: '#1A3C4D',
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%', // Ensure it takes full width
  },
  missionTitle: {
    fontWeight: 'bold',
    textAlign: 'center', // Center the mission title
    width: '100%',
  },
  downloadTitle: {
    fontWeight: 'bold',
    textAlign: 'center', // Center the download title
    width: '100%',
  },
  missionText: {
    fontSize: '16px',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  footer: {
    marginTop: 40,
    fontSize: '12px',
    color: '#555',
    textAlign: 'center',
    width: '100%',
  },
};

export default Login;
