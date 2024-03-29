import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Home = () => (
  <div> <h2>TKTL notes app</h2></div>
)
const Notes = () => (
  <div> <h2>Notes</h2></div>
)
const Users = () => (
  <div> <h2>Users</h2></div>
)

function App() {


  const padding = {
    padding: 5
  }

  return (
    <div className='container'>

      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/notes">notes</Link>
          <Link style={padding} to="/users">users</Link>
        </div>

        <Routes>
          <Route path="/notes" element={<Notes />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <div>
          <i>Note app, 2022</i>
        </div>
      </Router>
    </div>
  );
}

export default App;
