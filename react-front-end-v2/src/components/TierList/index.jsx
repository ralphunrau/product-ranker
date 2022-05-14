import '../styles/TierList.scss'
import Item from './Item'

// import hooks
import useVisualMode from '../../hooks/useVisualMode'
import useApplicationData from '../../hooks/useApplicationData'


// constants for mode


export default function TierList(props) {
  // const {mode, transition, back} = useVisualMode(props.user ? USER : GUEST);
  const state = useApplicationData();

  const visitProduct = () => {
    // The code to visit a product page will go here
  }
  
  const sortItemsIntoTierList = () => {
    // The code to sort an item into the correct tier list will go here
  }

  const fakeImage = 'https://www.gannett-cdn.com/presto/2021/10/06/USAT/002fd519-2817-4df5-b8bc-df6a9d2021d5-Wendys_cereal_box_3D.png'

  return (
    <div id="tier-list">
      <header>
        This is the category of the tier list.
      </header>
      <div id="tier-list-body">
        <div id="tier-list-left">
          <div className="tier-list-rank">
            S Tier
          </div>
          <div className="tier-list-rank">
            A Tier
          </div>
          <div className="tier-list-rank">
            B Tier
          </div>
          <div className="tier-list-rank">
            C Tier
          </div>
          <div className="tier-list-rank">
            D Tier
          </div>
          <div className="tier-list-rank">
            F Tier
          </div>
        </div>
        <div id="tier-list-right">
          <div className="tier-list-item">
            <Item image={fakeImage} visitproduct={visitProduct}/>
          </div>
          <div className="tier-list-item">
            Products will be appended here upon page load.
          </div>
          <div className="tier-list-item">
            Products will be appended here upon page load.
          </div>
          <div className="tier-list-item">
            Products will be appended here upon page load.
          </div>
          <div className="tier-list-item">
            Products will be appended here upon page load.
          </div>
          <div className="tier-list-item">
            Products will be appended here upon page load.
          </div>
        </div>
      </div>
      <div id="tier-list-footer">
        <button>
          Add item to favorites
        </button>
        <button>
          Compare items on this tier list
        </button>
      </div>

    </div>
  )
}