import styled from '@emotion/styled'

export const OuterWrapper = styled.div`
  margin-bottom: 15px;
  box-shadow: 0px 2px 4px 1px rgb(84 83 83 / 10%);
`

export const StyledLink = styled.a`
  text-decoration: none;
`

export const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
  position: relative;
  border-radius: 5px;
  svg {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }
`

export const StyledText = styled.div`
  text-align: center;
  width: 100%;
  color: #3365ef;
  font-weight: bold;
`
