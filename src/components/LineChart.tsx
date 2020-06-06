import React from 'react'
import * as d3 from 'd3'
import { scaleTime, scaleLinear } from 'd3-scale'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'

import { Update } from '../types'

type Props = {
  data: ReadonlyRecord<string, Array<Update>>,
  width: number,
  height: number,
  x: number,
  y: number,
}

function min(list: ReadonlyArray<number>): number {
  return list.reduce((acc, curr) => curr < acc ? curr : acc, Infinity)

}

function max<A>(list: ReadonlyArray<A>, accessor: (item: A) => number): number {
  return list.reduce((acc, curr) => accessor(curr) > acc ? accessor(curr) : acc, -Infinity)
}

function identity<A>(a: A) { return a }

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

  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={line(weeks) as string | undefined}
        style={{ stroke: "steelblue", strokeWidth: 1, fillOpacity: 0 }}
      />]]
   </g>
  )
}

