import Button from "../Button"
import TabPanel from '../TierList/TabPanel';


export default function Share(props) {

  return (
    <TabPanel value={props.value} index={props.index} >
      <div className="share-panel">
        <h3>Share the link!</h3>
        <div className="sharable-link">
          <Button onClick={props.onCopy}>Copy</Button>
        </div>
      </div>
    </TabPanel>
  )
}