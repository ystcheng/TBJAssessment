import React from "react";
import "../../constants/global.css"
import "./style.css"
import { Button } from "reactstrap";

const PlayerHeader = (props) => {

  const headerTeamClick = () => {
    props.updatePageState("team", props.teamData)
  }

  const generateHeaderPlayerInfo = () => {
    const player = props.playerData
    const info = [
      { text: "B/T", value: `${player.batSide}/${player.throwSide}` },
      { text: "Age", value: player.age },
      { text: "H", value: player.height },
      { text: "W", value: player.weight },
      { text: "Drafted", value: player.draftedYear }
    ]

    const layout = info.map(e => {
      return (
        <div>
          <span>{e.text}</span>
          <br />
          <span>{e.value}</span>
        </div>
      )
    })

    return layout
  }

  return (
    <div className="player-header">
      <div>
        <img
          src={`https://content.mlb.com/images/headshots/current/60x60/${props.playerData.id}@2x.png`}
        />
      </div>
      <div>
        <span>
          {props.playerData.name}
        </span>
        <br />
        <div>
          <span>
            {props.playerData.position}
          </span>
          <span onClick={headerTeamClick}>
            {props.teamData.fullName}
          </span>
        </div>
      </div>
      <div>
        { generateHeaderPlayerInfo() }
      </div>
    </div>
  )
}

export default PlayerHeader