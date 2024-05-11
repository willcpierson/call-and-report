import PlayerBox from "./components/PlayerBox";
import SetWindow from "./components/SetWindow";

function App() {

  const help = "assist"

  return (
    <div>
      <SetWindow />
      <h1 id="hello">Hell from Set Window</h1>
      <PlayerBox />
    </div>
  );

}



export default App;
