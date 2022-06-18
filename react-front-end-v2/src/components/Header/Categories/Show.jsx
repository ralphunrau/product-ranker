import CategoryListItem from "./CategoryListItem";

export default function Show(props) {

  props.categories.sort((a, b) => {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();
    return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
  });

  const categoryListItem = props.categories.map((category) => {  

  return (
    <CategoryListItem
      key={category.id}
      id={category.id}
      name={category.name}
      childCategories={props.childCategories}
      childCategory={props.childCategory}
      selected={category.id === props.category}
      setMainCategory={props.setMainCategory}
      selectCategory={props.selectCategory}
      setSearch={props.setSearch}
      searchTerm={props.searchTerm}
    />
    )
  })

  return (        
    <div className="category-lists">
      <ul>{categoryListItem}</ul>
    </div>
  )
}