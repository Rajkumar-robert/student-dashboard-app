import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import EditStudent from './components/EditStudent';
import AddStudent from './components/AddStudent';
import pic from './t.png'

const Dashboard = () => <div className="p-4"><img src={pic} width={1200}/></div>;
const Chapter = () => <div className="p-4">Chapter Details Section.</div>;
const Help = () => <div className="p-4">Need Help? Contact Support.</div>;
const Reports = () => <div className="p-4">View Reports Here.</div>;
const Settings = () => <div className="p-4">Adjust Your Settings Here.</div>;

function App() {
  return (
    <Router>
      <div className="App flex h-screen">
        {/* Sidebar */}
        <div className="">
          <Sidebar />
        </div>
        {/* Main Content Area */}
        <div className="flex-1 ml-64 flex flex-col">
          <Navbar />
          <div className="flex-1 px-6 pt-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/edit/:id" element={<EditStudent />} />
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/chapters" element={<Chapter />} />
              <Route path="/help" element={<Help />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
