import React, { useEffect, useRef } from 'react'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import { AxisDomain, axisLeft, axisBottom } from 'd3-axis'
import { select } from 'd3-selection'

import { Context } from '../types'
import { useAppContext } from './LineChart'

type Orientation = 'LEFT' | 'BOTTOM' //"LEFT" | "TOP" | "BOTTOM" | "RIGHT"

type AxisOverrides = {
  orientation: Orientation,
  ticks: number,
  formatter?: (format: AxisDomain) => string
}

type AxisConfig = {
  context: Context,
  overrides: AxisOverrides,
}

const config = (context: Context) => ({
  LEFT: {
    axisDirection: axisLeft,
    scale: context.yScale,
    x: 20,
    y: 20,
    textOffset: {
      x: 0,
      y: 0
    }
  },
  BOTTOM: {
    axisDirection: axisBottom,
    scale: context.xScale,
    x: 30,
    y: 30 + context.height,
    textOffset: {
      x: 20,
      y: -15
    }
  }
})

function onDOMLoading(): React.ReactNode {
  return null
}

function onDOMLoaded(overrides: AxisOverrides): (context: Context) => React.ReactNode {
  return (context) => <DrawAxis context={context} overrides={overrides} />
}

const DrawAxis: React.FC<AxisConfig> = ({ context, overrides, }) => {
  const { axisDirection, scale, x, y, textOffset } = config(context)[overrides.orientation]
  const gRef = useRef<SVGGElement | null>(null)
  const axis = axisDirection(scale)
    .ticks(overrides.ticks)

  useEffect(() => {
    if (overrides.formatter)
      axis.tickFormat(overrides.formatter)

    if (gRef.current) select(gRef.current)
      .call(axis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').remove())
      .call(g => g.selectAll('.tick text')
        .attr('x', textOffset.x)
        .attr('y', textOffset.y)
        .attr('font-size', 20)
        .attr('font-family', 'GothamNarrowMedium'))
  }, [gRef.current, axis])

  return (
    <g ref={gRef} transform={`translate(${x}, ${y})`}></g>
  )
}


export function Axis(props: AxisOverrides) {
  const context = useAppContext()
  return <>
    {pipe(context, O.fold(onDOMLoading, onDOMLoaded(props)))}
  </>
}
