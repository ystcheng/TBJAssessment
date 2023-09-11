import React, { useState } from "react";
import LeaderboardTable from "./tables/leaderboardTable";
import { Container, Row } from "reactstrap";
import CustomButtonGroup from "./ButtonGroup";

const LeaderboardHitterPanel = (props) => {
  const [buttonState, setButtonState] = useState('Home Runs')

  const updateButtonState = (e) => {
    setButtonState(e.target.value)
  }

  const generateTable = () => {
    const keyMap = {
      'Home Runs': 'homeRuns',
      'RBI': 'rbi',
      'AVG': 'avg'
    }

    const data = props.data[keyMap[buttonState]]

    return (
      <LeaderboardTable tableType={buttonState} data={data} />
    )
  }


  return (
    <Container>
      <Row>
        <CustomButtonGroup buttons={['Home Runs', 'RBI', 'AVG']} buttonState={buttonState} updateButtonState={updateButtonState} />
      </Row>
      <Row className="leaderboard-table__style">
        {generateTable()}
      </Row>
    </Container>
  )
}

export default LeaderboardHitterPanel