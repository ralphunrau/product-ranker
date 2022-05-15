import CategoryListItem from "./CategoryListItem";

export default function Show(props) {

  const categoryListItem = props.categories.map((category) => {

    

  return (
    <CategoryListItem
      key={category.id}
      id={category.id}
      name={category.name}
      selected={category.id === props.category}
      setCategory={(event) => props.onChange(category.id)}
    />
    )
  })

  return (
    <div className="category-lists">
      <ul>{categoryListItem}</ul>
    </div>
  )
}