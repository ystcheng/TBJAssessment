import React, { useEffect, useState } from "react";
import { Col, Row, Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import { getNews } from "../../api/newsAPI";
import './style.css'
import '../../constants/global.css'
import { BULLET } from "../../constants";

const NewsComponent = () => {
  const [newsData, setnewsData] = useState([])

  useEffect(() => {
    getNews().then(data => {
      setnewsData(data)
    }).catch(err => console.log(err))
  }, [])

  const renderNews = () => {
    return (
      newsData.slice(0, 4).map((e, i) => {
        return (
          <Col>
            <Card className="news-card-style" key={i}>
              <CardImg top src={e.img} className="img-fluid"/>
              <CardBody>
                <CardTitle>
                  <a href={e.link} className="news-card-text-style">
                    {e.title}
                  </a>          
                </CardTitle>
                <CardText>
                  <small>
                    { e.author } {BULLET} { e.date }
                  </small>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ) 
      })
    )
  }

  return (
    <Row className="news__layout-style">
      <h4>News</h4>
      <Row className="">
        {renderNews()}  
      </Row>
    </Row>
  )
}


export default NewsComponent