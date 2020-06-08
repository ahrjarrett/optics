import React, { createContext, useContext, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { scaleTime, scaleLinear } from 'd3-scale'
import { timeMonth } from 'd3-time'
import { AxisDomain } from 'd3-axis'
import { select } from 'd3-selection'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'
import { some, none, Option } from 'fp-ts/lib/Option'

import { Axis } from '../Axis'
import { Tooltip } from '../Tooltip'
import { AppData, ContextType, Margin, Update } from '../../types'
import { identity, isNotNil, min, max } from '../../helpers/utils'

const styles = {
  title: {
    textAlign: 'center' as const,
    fontFamily: 'GothamNarrowLight',
    fontSize: 30,
    marginBottom: 10
  },
  subtitle: {
    textAlign: 'center' as const,
    fontFamily: 'GothamNarrowLight',
    marginTop: 10
  },
  area: {
    fill: 'url(#area-gradient)',
    //fill: 'rgba(0, 0, 0, 0.5)',
    strokeWidth: '05px'
  }
}

type Props = {
  data: ReadonlyRecord<string, Array<Update>>,
  width: number,
  height: number,
  x: number,
  y: number,
  margin: Margin,
  title?: string,
  subtitle?: string
}

const NUMBER_OF_TICKS_Y = 3
const NUMBER_OF_TICKS_X = 4

const formatY = (d: AxisDomain) => {
  return d.toString().slice(4, 7).toUpperCase()
}

export const Context = createContext<Option<ContextType<AppData, Update>>>(none)

export const useAppContext = () => useContext(Context)

export const LineChart: React.FC<Props> = ({ data, width, height, x, y, title, subtitle }) => {
  const xs = Object.keys(data).map(str => parseInt(str, 10)).slice().sort((a, b) => b > a ? 1 : 0)
  const ys = xs.map(week => data[week])
  const d3Ref = useRef<SVGSVGElement | null>(null)
  const xScale = scaleTime()
    .domain([min(xs), max(xs, identity)])
    .range([0, width])
  const yScale = scaleLinear()
    .domain([0, max<Array<Update>>(ys, (updates) => updates.length)])
    .range([height, 0])
  const contextValue = some({ d3Ref: d3Ref, data, width, height, xScale, yScale, x, y, xs, ys })

  const line = d3.line<number>()
    .x(week => xScale(week))
    .y(week => yScale(data[week].length))

  const area = d3.area<number>().x(week => xScale(week)).y0(height).y1(week => yScale(data[week].length))

  useEffect(() => {
    select(d3Ref.current)
      .append('linearGradient')
      // ^^ `id` must match the fill-source `url` in styles.area ^^
      .attr('id', 'area-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', yScale(10))
      .attr('x2', 0).attr('y2', yScale(2))
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'rgba(42, 92, 219, 0.1)' },
        { offset: '86.62%', color: 'rgba(46, 91, 255, 1e-05)' },
        // { offset: '1', color: 'rgba(46, 91, 255, 0.01)' }

      ])
      .enter().append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color)



  }, [])

  //background: linear-gradient(180deg, rgba(42, 92, 219, 0.1) 0%, rgba(46, 91, 255, 1e-05) 86.62%)

  return (
    <Context.Provider value={contextValue}>
      <svg ref={d3Ref} width="100%" height={height + 30} overflow='overlay'>
        <g transform={`translate(30, 30)`}>
          <path
            d={line(xs) as string | undefined}
            style={{ stroke: "#2A5CDB", strokeWidth: 3, /*strokeMiterlimit: 0.5,*/ fillOpacity: 0 }}
          />
        </g>
        <g transform={`translate(30, 30)`}>
          <path className='area' d={area(xs) as string | undefined} style={styles.area} />
        </g>

        <Axis ticks={NUMBER_OF_TICKS_Y} orientation={'LEFT'} />
        <Axis ticks={NUMBER_OF_TICKS_X} formatter={formatY} orientation={'BOTTOM'} />
        <Tooltip />

      </svg>

      {isNotNil(title) && <h3 style={styles.title}>{title}</h3>}
      {isNotNil(subtitle) && <p style={styles.subtitle}>{subtitle}</p>}
    </Context.Provider >
  )
}

/* Path 5 */

// position: absolute;
// left: 11.36 %;
// right: 11.66 %;
// top: 51.82 %;
// bottom: 36.36 %;

// background: linear - gradient(180deg, rgba(42, 92, 219, 0.1) 0 %, rgba(46, 91, 255, 1e-05) 86.62 %);


// function C() {
//   <svg width="482" height="106" viewBox="0 0 482 106" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path fill-rule="evenodd" clip-rule="evenodd" d="M0 63.1733L27.9588 71.1128L56.3835 46.3604L85.9621 37.7204L113.233 8.06422L141.192 0.591797L169.617 22.075L197.575 33.7507L226.466 24.8772L254.425 22.075L282.85 31.4155L311.557 21.8415L339.233 37.9539L367.658 42.6242L396.083 24.8772H424.041L452.466 22.075L481.106 63.1733V105.213L0 79.9863" fill="url(#paint0_linear)" fill-opacity="0.1" />
//     <defs>
//       <linearGradient id="paint0_linear" x1="32.19" y1="0.591797" x2="32.19" y2="91.2132" gradientUnits="userSpaceOnUse">
//         <stop stop-color="#2A5CDB" />
//         <stop offset="1" stop-color="#2E5BFF" stop-opacity="0.01" />
//       </linearGradient>
//     </defs>
//   </svg>
// }
