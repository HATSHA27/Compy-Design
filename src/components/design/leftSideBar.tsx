import { useState } from 'react'
import styled from 'styled-components'
import WidgetList from './widgetList'
import Layer from './layer'

export default function LeftSideBar() {
  const [select, setSelect] = useState("Basic")
  const textProps = (name: string) => ({
    onClick: () => setSelect(name),
    style: { opacity: select === name ? "1" : "0.6" }
  })
  return (
    <Container>
      <Nav>
        <PageName {...textProps("Basic")}>Basic</PageName>
        <PageName {...textProps("Widget")}>Widget</PageName>
        <PageName {...textProps("Layer")}>Layer</PageName>
      </Nav>
      <WidgetList show={select === "Basic"} />
      <Layer show={select === "Layer"} />
    </Container>
  )
}

const Container = styled.section`
  width:310px;
  z-index: 2;
  overflow-y: scroll;
  display:flex;
  flex-direction: column;
  background-color: white;
  margin-top: 40px;
`
const Nav = styled.div`
  display:flex;
  align-items:center;
  padding:0px 18px;
  height:44px;
  border-bottom: 1.5px solid rgba(0,0,0,0.1);
  position: fixed;
  width:calc(310px - 36px);
  z-index: 2;
  background-color: white;
  margin-top: -40px;
`
const PageName = styled.h4`
  cursor:pointer;
  margin-right:16px;
  font-weight: bold;
`