import React, { useState } from "react";
import LeaderboardTable from "./tables/leaderboardTable";
import { Container, Row } from "reactstrap";
import CustomButtonGroup from "./ButtonGroup";

const LeaderboardPitcherPanel = (props) => {
  const [buttonState, setButtonState] = useState('ERA')

  const updateButtonState = (e) => {
    setButtonState(e.target.value)
  }

  const generateTable = () => {
    const keyMap = {
      'ERA': 'era',
      'WHIP': 'whip',
      'SO': 'strikeOuts'
    }

    const data = props.data[keyMap[buttonState]]

    return (
      <LeaderboardTable tableType={buttonState} data={data} />
    )
  }


  return (
    <Container>
      <Row>
        <CustomButtonGroup buttons={['ERA', 'WHIP', 'SO']} buttonState={buttonState} updateButtonState={updateButtonState} />
      </Row>
      <Row className="leaderboard-table__style">
        {generateTable()}
      </Row>
    </Container>
  )
}

export default LeaderboardPitcherPanel