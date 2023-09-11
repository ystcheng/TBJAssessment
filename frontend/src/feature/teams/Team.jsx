import React, { useEffect, useState } from "react";
import TeamHittersTable from "./TeamHittersTable";
import { Container, Row } from "reactstrap";
import { getTeamRoster } from "../../api/teamAPI";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import "../../constants/global.css";
import TeamHeader from "./TeamHeader";
import TeamPitchersTable from "./TeamPitchersTable";
import LoadingScreen from "../loadingScreen/loadingScreen";


const Team = (props) => {
  const [hittersRoster, setHittersRoster] = useState([])
  const [pitchersRoster, setPitchersRoster] = useState([])
  const [teamData, setTeamData] = useState(props.data)
  const [dataState, setDataState] = useState(false)

  useEffect(() => {
    getTeamRoster(teamData.id).then(data => {
      setHittersRoster(data.hitters)
      setPitchersRoster(data.pitchers)
      setDataState(true)
    }).catch(err => console.log(err))
  }, [])
  


  return (
    <Container>
      <Row>
        <TeamHeader teamData={teamData} />
      </Row>
      <Row className="margin-top-25">
        <Tabs selectedTabClassName="react-tabs__tab--selected-custom">
          <TabList className="react-tabs__tab-list-custom">
            <Tab className="react-tabs__tab-custom" >
              Hitters
            </Tab>
            <Tab className="react-tabs__tab-custom">
              Pitchers
            </Tab>
          </TabList>

          {
            dataState && props.metaDataState ? 
              <>
                <TabPanel selectedClassName="react-tabs__tab-panel--selected ">
                  { dataState && props.metaDataState }
                  <TeamHittersTable 
                    data={hittersRoster}
                    teamData={teamData}
                    updatePageState={props.updatePageState}
                  />
                </TabPanel>
                <TabPanel selectedClassName="react-tabs__tab-panel--selected ">
                  <TeamPitchersTable
                    data={pitchersRoster}
                    teamData={teamData}
                    updatePageState={props.updatePageState}
                  />
                </TabPanel>
              </>
              : 
              <LoadingScreen className="loading-style__preset" />
          }

        </Tabs>
      </Row>
    </Container>
  )
  
}


export default Team