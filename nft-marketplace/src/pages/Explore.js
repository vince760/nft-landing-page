import CardList from "../components/CardList";
import { exploreList } from "../constants/MockupData";
import "../styles/Explore.css";
import Header from "../components/Header";
import Search from "../components/Search";
const Explore = (props) => {
  return (
    <div id="explore">
      <Header socket={props.socket}/>
      <Search />
      <div id="list-container">
        <CardList socket={props.socket} list={exploreList} />
      </div>
    </div>
  );
};

export default Explore;
