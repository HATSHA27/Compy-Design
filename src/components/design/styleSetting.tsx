import styled from 'styled-components'

export default function StyleSetting() {
  return (
    <Container>
      <div>12</div>
    </Container>
  )
}

const Container = styled.section`
  width:300px;
  height:100%;
  display:flex;
  flex-direction: column;
  border-right: 2px solid rgba(54,54,54,0.1);
`