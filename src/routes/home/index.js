import { h } from "preact";
import ColorComponent from "../../components/ColorComponent";
import style from "./style.css";

const Home = () => (
  <div class={style.home}>
    <h1>Web Palette Generator</h1>
    <ColorComponent />
  </div>
);

export default Home;
