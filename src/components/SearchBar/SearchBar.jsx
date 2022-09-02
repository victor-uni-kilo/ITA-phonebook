import styles from './SearchBar.module.scss';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
    };
  }

  render() {
    return (
      <>
        <input type="text" placeholder='search'/>
      </>
    )
  }
}

export default SearchBar;