import '../styles/TierList.scss'

// import hooks
import useVisualMode from '../../hooks/useVisualMode'


// constants for mode


export default function TierList(props) {
  // const {mode, transition, back} = useVisualMode(props.user ? USER : GUEST);

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