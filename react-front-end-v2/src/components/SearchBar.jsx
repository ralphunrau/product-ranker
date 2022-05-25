import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch  } from '@fortawesome/free-solid-svg-icons';



export default function SearchBar(props) {

  const onEnter = (event) => {
    if(event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      props.searchProducts();
    };
  };
  
  return (
    <div className='search-bar'>
      <input
        onKeyDown={onEnter}
        name="searchTerm"
        type="text"
        placeholder='Search...'
        className="search-bar--text"
        onChange={event =>  props.setSearch(event.target.value)}
        data-testid="search-term"
        value={props.searchTerm ? props.searchTerm : ''}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={props.searchProducts}/>
    </div>
  )
}