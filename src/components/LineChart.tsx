import React, { createContext, useContext, useRef } from 'react'
import * as d3 from 'd3'
import { scaleTime, scaleLinear } from 'd3-scale'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'
import { some, none, Option } from 'fp-ts/lib/Option'

import { ContextType, AppData, Update } from '../types'
import { Axis } from './Axes'
import { identity, min, max } from '../helpers/utils'

type Props = {
  data: ReadonlyRecord<string, Array<Update>>,
  width: number,
  height: number,
  x: number,
  y: number,
}

const NUMBER_OF_TICKS_Y = 3

export const Context = createContext<Option<ContextType<AppData>>>(none)

export const useAppContext = () => useContext(Context)

export const LineChart: React.FC<Props> = ({ data, width, height, x, y }) => {
  const weeks = Object.keys(data).map(str => parseInt(str, 10)).slice().sort((a, b) => b > a ? 1 : 0)

  const xScale = scaleTime()
    .domain([min(weeks), max(weeks, identity)])
    .range([0, width])

  const yScale = scaleLinear()
    .domain([0, max<Array<Update>>(Object.values(data), (updates) => updates.length)])
    .range([height, 0])

  const line = d3.line<number>()
    .x(week => xScale(week))
    .y(week => yScale(data[week].length))

  const d3Ref = useRef<SVGSVGElement | null>(null)

  const contextValue = some({ d3Ref: d3Ref, xScale, yScale, data })

  return (
    <Context.Provider value={contextValue}>
      <svg width="100%" height="500" ref={d3Ref}>
        <g transform={`translate(${x}, ${y})`}>
          <path
            d={line(weeks) as string | undefined}
            style={{ stroke: "#2A5CDB", strokeWidth: 2, fillOpacity: 0 }}
          />
        </g>
        <Axis ticks={NUMBER_OF_TICKS_Y} orientation={'LEFT'} />
      </svg>
    </Context.Provider>
  )
}

