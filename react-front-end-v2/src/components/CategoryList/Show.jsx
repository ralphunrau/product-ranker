import CategoryListItem from "./CategoryListItem";

const categories = [
  {
    id: 1,
    name: "Toys"
  },
  {
    id: 2,
    name: "Electronics"
  },
  {
    id: 3,
    name: "Clothings"
  },
  {
    id: 4,
    name: "Outdoors"
  },
  {
    id: 5,
    name: "Health"
  },
  {
    id: 6,
    name: "Music"
  },
  {
    id: 7,
    name: "Movies"
  },
  {
    id: 8,
    name: "Chfsadfildren"
  },
  {
    id: 9,
    name: "Tofsdafs fsdfa ys"
  },
  {
    id: 10,
    name: "sdfasf"
  },
  {
    id: 11,
    name: "asdfsdfsdfs"
  },
  {
    id: 12,
    name: "Outdoasdsa"
  },
  {
    id: 13,
    name: "Heaasdfaslth"
  },
  {
    id: 14,
    name: "sdfsa"
  },
  {
    id: 15,
    name: "asdfsadf"
  },
  {
    id: 16,
    name: "sdfadfsaf"
  },
  {
    id: 17,
    name: "Toys"
  },
  {
    id: 18,
    name: "Electronics"
  },
  {
    id: 19,
    name: "Clothings"
  },
  {
    id: 20,
    name: "Outdoors"
  },
  {
    id: 21,
    name: "Health"
  },
  {
    id: 22,
    name: "Music"
  },
  {
    id: 23,
    name: "Movies"
  },
  {
    id: 24,
    name: "Chfsadfildren"
  },
  {
    id: 25,
    name: "Tofsdafs fsdfa ys"
  },
  {
    id: 26,
    name: "sdfasf"
  },
  {
    id: 27,
    name: "asdfsdfsdfs"
  },
  {
    id: 28,
    name: "Outdoasdsa"
  },
  {
    id: 29,
    name: "Heaasdfaslth"
  },
  {
    id: 30,
    name: "sdfsa"
  },
  {
    id: 31,
    name: "asdfsadf"
  },
  {
    id: 32,
    name: "sdfadfsaf"
  }
]

export default function Show(props) {

  const categoryListItem = categories.map((category) => {

    

    return (
      <CategoryListItem
        key={category.id}
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