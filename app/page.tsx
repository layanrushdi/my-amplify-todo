import "./../app/app.css";
import Todo from "./components/todo";
import LocationFinderServer from "./components/LocationFinderServer";
import LocationFinderClient from "./components/LocationFinderClient";



export default function App() {
  

 return (
  <main>
      <LocationFinderClient/>     
      <LocationFinderServer/>       
      <Todo/>
      
  </main>
 );
}
