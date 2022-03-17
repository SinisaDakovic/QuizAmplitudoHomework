
import { Routes, Route} from "react-router-dom";

import Greeting from './components/Greeting/Greeting'
import Quiz from './components/Quiz/Quiz'

function App() {
  return (
   <Routes>
     <Route path="/" element={<Greeting/>}/>
     <Route path="/quiz" element={<Quiz/>}/>
   </Routes>
  );
}

export default App;
