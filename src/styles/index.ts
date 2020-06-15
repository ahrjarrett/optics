import { addPx } from 'styles/helpers'

export enum FontWeights {
  Light = 300,
  Book = 400,
  Medium = 500,
}

export const fonts = {
  [FontWeights.Light]: 'GothamNarrowLight',
  [FontWeights.Book]: 'GothamNarrow',
  [FontWeights.Medium]: 'GothamNarrowMedium'
}

const __ = {
  noMargin: addPx(0),
  font: { ...fonts }
}

export default function styles() {
  return {
    body: {
      margin: __.noMargin,
      fontFamily: __.font[FontWeights.Book]
    }
  }
}
/*

body {
  margin: 0;
  font - family: -apple - system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans - serif;
  -webkit - font - smoothing: antialiased;
  -moz - osx - font - smoothing: grayscale;
}

*/
