import React from "react";
import { Button } from "reactstrap";


const CustomButtonGroup = (props) => {

  const generateButton = () => {
    const layout = props.buttons.map(e => {
      const activeClass = e === props.buttonState ? "custom-button-style__active" : "custom-button-style__not_active"
      return (
        <span>
          <button className={activeClass} onClick={props.updateButtonState} value={e}>
            {e}
          </button>
        </span>
      )
    })

    return layout
  }

  return(
    <div className="custom-button-style">

      {generateButton()}

      {/* <span>
        <button className="custom-button-style__active">
          testing 1
        </button>
      </span>
      <span>
        <button className="custom-button-style__not_active">
          testing 1
        </button>
      </span>
      <span>
        <button className="custom-button-style__not_active">
          testing 1
        </button>
      </span> */}
    </div>
  )
}

export default CustomButtonGroup
