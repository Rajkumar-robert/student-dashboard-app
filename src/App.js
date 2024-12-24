import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import EditStudent from './components/EditStudent';
import AddStudent from './components/AddStudent';


const Dashboard = () => <div className="p-4 flex justify-between items-center font-medium text-xl"><h1>Welcome to Student Dashboard!!</h1></div>;
const Chapter = () => <div className="p-4 flex justify-between items-center font-medium text-xl"><h1>Chapter Details Section.</h1></div>;
const Help = () => <div className="p-4 flex justify-between items-center font-medium text-xl"><h1>Need Help? Contact Support.</h1></div>;
const Reports = () => <div className="p-4 flex justify-between items-center font-medium text-xl"><h1>View Reports Here.</h1></div>;
const Settings = () => <div className="p-4 flex justify-between items-center font-medium text-xl"><h1>Adjust Your Settings Here.</h1></div>;

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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<StudentList />} />
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
