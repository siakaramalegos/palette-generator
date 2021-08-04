import { h } from "preact";
import ColorComponent from "../../components/ColorComponent";
import style from "./style.css";

const Home = () => (
  <div class={style.home}>
    <h1>Web Palette Generator</h1>
    <ColorComponent defaultColor={"#e6b919"} />
    <ColorComponent defaultColor={"#663399"} />
    <ColorComponent defaultColor={"#19e60a"} />
    <ColorComponent defaultColor={"#FFFFFF"} />
    <ColorComponent defaultColor={"#000000"} />
  </div>
);

export default Home;
