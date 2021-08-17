import React from 'react'
import styled from 'styled-components';

const GradientSpinner = (props: {className?: string}) => {
  return(
    <div className={props.className}>
      <div className="loader gradient-loader">
        <div className="inner-circle"></div>
      </div>
    </div>
  )
}

const StyledGradientSpinner = styled(GradientSpinner)`
  /*
 ---- GENERIC PROPERTIES ----
*/

  width: 80px;
  height: 80px;


.loader {
  height: 100%;
  width: 100%;

  position: relative;

  border-radius: 100%;

}

.inner-circle {
  width: 90%;
  height: 90%;

  position: absolute;

  left: 5%;
  top: 5%;

  background-color: var(--background-color);

  margin: 0 auto;

  border-radius: 100%;
}

/*
 ---- CIRCLE LOADER ----
*/
.circle-loader {
  background-color: #2980b9;

  animation: rotateAnimation 1s infinite cubic-bezier(.24, .85, .84, .2);
}

.circle-loader .circle {
  width: 10%;
  height: 10%;

  background-color: #FFF;

  margin: 0 auto;

  border-radius: 200%;
}

/*
 ---- GRADIENT LOADER ----
*/

.gradient-loader {
  background-image: linear-gradient(135deg,#ff891d 0%,#d01cfb 100%);

  animation: rotateAnimation 1s infinite linear;
}

/*
 ---- Animations ----
*/
@keyframes rotateAnimation {
  100% { transform: rotate(360deg) }
}
`

export default StyledGradientSpinner