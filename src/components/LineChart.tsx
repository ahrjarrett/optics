import React, { createContext, useContext, useRef } from 'react'
import * as d3 from 'd3'
import { scaleTime, scaleLinear } from 'd3-scale'
import { timeMonth } from 'd3-time'
import { AxisDomain } from 'd3-axis'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'
import { some, none, Option } from 'fp-ts/lib/Option'

import { Axis } from './Axes'
import { Tooltip } from './Tooltip'
import { AppData, ContextType, Margin, Update } from '../types'
import { identity, min, max } from '../helpers/utils'

type Props = {
  data: ReadonlyRecord<string, Array<Update>>,
  width: number,
  height: number,
  x: number,
  y: number,
  margin: Margin
}

const NUMBER_OF_TICKS_Y = 3
const NUMBER_OF_TICKS_X = 4

const formatY = (d: AxisDomain) => {
  return d.toString().slice(4, 7).toUpperCase()
}

export const Context = createContext<Option<ContextType<AppData, Update>>>(none)

export const useAppContext = () => useContext(Context)

export const LineChart: React.FC<Props> = ({ data, width, height, x, y }) => {
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

  console.log('weeks', xs)
  console.log('counts', ys)

  return (
    <Context.Provider value={contextValue}>
      <svg ref={d3Ref} width="100%" height={height + 30} transform={`translate(${x + 30}, ${y - 30})`}>
        <g transform={`translate(30, 30)`}>
          <path
            d={line(xs) as string | undefined}
            style={{ stroke: "#2A5CDB", strokeWidth: 3, /*strokeMiterlimit: 0.5,*/ fillOpacity: 0 }}
          />
        </g>

        <Axis ticks={NUMBER_OF_TICKS_Y} orientation={'LEFT'} />
        <Axis ticks={NUMBER_OF_TICKS_X} formatter={formatY} orientation={'BOTTOM'} />
        <Tooltip />
      </svg>
    </Context.Provider>
  )
}

