import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="content">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;