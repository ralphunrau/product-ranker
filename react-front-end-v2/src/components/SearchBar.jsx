import Button from "./Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch  } from '@fortawesome/free-solid-svg-icons';


export default function SearchBar(props) {

  return (
    <div className='search-bar'>
      <input
        name="searchTerm"
        type="text"
        placeholder='Search...'
        className="search-bar--text"
        onChange={event =>  props.setSearch(event.target.value)}
        data-testid="search-term"
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={props.searchProducts}/>
    </div>
  )
}