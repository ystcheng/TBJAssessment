import React from "react";
import { BULLET } from "../../constants";
import '../../constants/global.css'

const TeamHeader = (props) => {

  const convertRankToString = (rank) => {
    if (11 <= (rank % 100) && (rank % 100) <= 13)
      return `${rank}th`
    
    const suffix = ['th', 'st', 'nd', 'rd', 'th'][Math.min(rank % 10, 4)]
    return `${rank}${suffix}`
  }

  const statsToString = () => {
    const teamData = props.teamData
    return `${teamData.wins}-${teamData.losses} (${teamData.pct}) ${BULLET} ${teamData.gb} GB`
  }

  return (
    <div className="flex-box">
      <div>
        <img 
          src={ props.teamData.img } 
          className="rounded-circle" 
          style={{width: "100px", height: "100px", backgroundColor: "white"}} 
        />
      </div>
      <div className="padding-20">
        <span className="header-title">
          {props.teamData.fullName}
        </span>
        <br />
        <div className="subheader">
          <span className="header-text-secondary padding-right-20">
            {`${convertRankToString(props.teamData.divisionRank)} in ${props.teamData.division}`}
          </span>
            {statsToString()}
        </div>
      </div>
    </div>
  ) 
}

export default TeamHeader