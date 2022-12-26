import {Suspense} from "react";
import Layout from "./Layout/Layout";
import './App.css';

function App() {
  return (
    <Suspense fallback={'Loading...'}>
        <div className="App">
            <Layout/>
        </div>
    </Suspense>
  );
}

export default App;
