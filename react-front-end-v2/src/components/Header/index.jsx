import ClickAwayListener from '@mui/material/ClickAwayListener';

import '../styles/Header.scss'

import useVisualMode from '../../hooks/useVisualMode';
import Nav from './Nav';
import CategoryList from './Categories';

import Login from './Login';
import Register from './Register';

import { HIDDEN, LOGIN, REGISTER, SHOW } from '../../helper/modes';

export default function Header(props) {
  const {mode, transition} = useVisualMode(HIDDEN);

  const onCancel = () => {
    transition(HIDDEN)
  }

  const toggleForm = (form) => {
    mode === form ? onCancel() : transition(form)
  }

  const toggleBar = () => {
    transition(mode === SHOW ? HIDDEN : SHOW);
  };

  const onChange = (category) => {
    props.selectCategory(category)
    toggleBar();
  };

  const onLogin = (input) => {
    toggleForm(mode);
    props.setUser(input);
  }

  const handleClickAway = () => {
    transition(HIDDEN);
  }


  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <header className="header">
        <Nav
          toggleForm={toggleForm}
          onChange={props.setSearch}
          onSearch={props.searchProducts}
          searchTerm={props.searchTerm}
          toggleBar={toggleBar}
          user={props.user}
          signOut={props.signOut}
          mode={mode}
          getWishes={props.getWishes}
        />
        {mode === SHOW && (
          <CategoryList 
            category={props.category}
            categories={props.categories}
            childCategories={props.childCategories}
            childCategory={props.childCategory}
            setMainCategory={props.setMainCategory}
            selectCategory={onChange}
            toggleBar={toggleBar}
            searchTerm={props.searchTerm}
            setSearch={props.setSearch}
          />
        )}
        {mode === HIDDEN && <></>}
        {mode === LOGIN && <Login cancel={onCancel} onLogin={onLogin} getWishes={props.getWishes} />}
        {mode === REGISTER && <Register cancel={onCancel}/>}
      </header>
    </ClickAwayListener>
    {mode === SHOW && <div className='background-shade' />}
    </>
  )
}