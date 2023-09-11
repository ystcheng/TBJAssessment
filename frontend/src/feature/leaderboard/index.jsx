import React, { useEffect, useState } from "react";
import { getAllLeaderboard } from "../../api/leaderboardAPI";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Button, Container, Row } from "reactstrap";
import 'react-tabs/style/react-tabs.css';
import './style.css'

import "../../constants/global.css"
import LeaderboardPitcherPanel from "./LeaderboardPitcherPanel";
import LeaderboardHitterPanel from "./LeaderboardHitterPanel";
import LoadingScreen from "../loadingScreen/loadingScreen";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({status: false, data: {}}) 

  useEffect(() => {
    getAllLeaderboard(['pitching', 'hitting']).then(data => {
      setLeaderboardData({status: true, data})})
  }, [])

  return (
    <Container>
      <Row>
        <div className="header-title">
          Leaderboard 
        </div>
      </Row>
      <Row>
        <Tabs selectedTabClassName="react-tabs__tab--selected-leaderboard">
          <TabList className="react-tabs__tab-list-leaderboard">
            <Tab className="react-tabs__tab-leaderboard" >
              Hitters
            </Tab>
            <Tab className="react-tabs__tab-leaderboard">
              Pitchers
            </Tab>
          </TabList>

          {
            leaderboardData.status ?
            <>
              <TabPanel>
                  <LeaderboardHitterPanel data={leaderboardData.data.hitting} />
              </TabPanel>
              <TabPanel>
                  <LeaderboardPitcherPanel data={leaderboardData.data.pitching} />
              </TabPanel>
            </> :
            <LoadingScreen className="loading-style__preset" />
          }

        </Tabs>
      </Row>
    </Container>
  )

}

export default Leaderboard