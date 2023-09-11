import React, { useEffect, useState } from "react";
import { getPlayerHistory } from "../../api/playerAPI";
import PlayerHitterTable from "./PlayerHitterTable";

import { Container, Row } from "reactstrap";
import PlayerHeader from "./PlayerHeader";
import PlayerPitcherTable from "./PlayerPitcherTable";
import LoadingScreen from "../loadingScreen/loadingScreen";

const Player = (props) => {
  const [playerData, setPlayerData] = useState(props.data.player)
  const [teamData, setTeamData] = useState(props.data.teamData)
  const [data, setData] = useState([])
  const [dataState, setDataState] = useState(false)

  useEffect(() => {
    getPlayerHistory(playerData.id, playerData.type)
      .then(data => setData(data.map(e => {
        
        let team = props.teamMap[e.team]
        if (team === undefined) {
          team = {
            img: "",
            name: ""
          }
        }

        return {...e, teamImg: team.img, team: team.name }
      })))
      .catch(err => console.log(err))

      setDataState(true)
  }, [])

  return (
    <Container>
      <Row>
        <PlayerHeader playerData={playerData} teamData={teamData} updatePageState={props.updatePageState} />
      </Row>
      <Row>
        {
          props.metaDataState && dataState ? 
          (playerData.type === "hitting" ? 
            <PlayerHitterTable 
              playerID={playerData.id}
              data={data}
            /> : (playerData.type === "pitching" ?
              <PlayerPitcherTable
                playerID={playerData.id}
                data={data}
              /> : <></>

            )
          ) : <LoadingScreen className="loading-style__preset" />
        }
      </Row>
    </Container>
  )

}

export default Player