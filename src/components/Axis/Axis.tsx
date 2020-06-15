import React, {useEffect, useRef} from 'react'
import {pipe} from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import {AxisDomain, axisLeft, axisBottom} from 'd3-axis'
import {select} from 'd3-selection'

import {ContextType, Datum, SVGNode} from 'types'
import {useAppContext} from 'components/LineChart/index'

type Orientation = 'LEFT' | 'BOTTOM'
const orientation = {
  LEFT: 'LEFT',
  BOTTOM: 'BOTTOM',
}

interface AxisOverrides {
  orientation: Orientation
  ticks: number
  formatter?: (format: AxisDomain) => string
}

type DrawAxisProps = AxisOverrides & ContextType

const monthDomain = (data: Datum[]): string[] =>
  data
    .map(d => d.x.monthString)
    .reduce(
      (set: Array<any>, curr) => (set.includes(curr) ? set : set.concat(curr)),
      [],
    )

type TextOffset = {
  x: number
  y: number
}

type ComputedProps = {
  axisDirection: any
  scale: any
  x: number
  y: number
  uniqueMonths?: string[]
  textOffset: TextOffset
}

const config = (
  orient: Orientation,
  props: DrawAxisProps,
): ComputedProps | TypeError => {
  switch (orient) {
    case orientation.LEFT:
      return {
        axisDirection: axisLeft,
        scale: props.yScale,
        x: 20,
        y: 20,
        textOffset: {
          x: 0,
          y: 0,
        },
      }
    case orientation.BOTTOM:
      return {
        axisDirection: axisBottom,
        scale: props.xScale,
        x: 30,
        y: 30 + props.height,
        uniqueMonths: monthDomain(props.data).reverse(),
        textOffset: {
          x: 20,
          y: -15,
        },
      }
    default:
      return new TypeError(`oops, orientation ${orient}does not exist`)
  }
}

function onDOMLoading(): React.ReactNode {
  return null
}

function onDOMLoaded(
  overrides: AxisOverrides,
): (context: ContextType) => React.ReactNode {
  return context => {
    const axisProps = {...context, ...overrides}
    return <DrawAxis {...axisProps} />
  }
}

const DrawAxis: React.FC<DrawAxisProps> = props => {
  const {orientation, ticks} = props
  const computedProps = config(orientation, props) as ComputedProps
  const {axisDirection, scale, x, y, textOffset} = computedProps

  const gRef = useRef<SVGNode>(null)

  const axis = axisDirection(scale)

  if (orientation === 'LEFT') {
    axis.ticks(ticks)
  }
  if (orientation === 'BOTTOM') {
    if (computedProps.uniqueMonths?.length) {
      axis
        .ticks(computedProps.uniqueMonths?.length)
        .tickFormat(
          (_: AxisDomain, i: number) => computedProps.uniqueMonths?.[i],
        )
    }
  }

  useEffect(() => {
    if (gRef.current)
      select(gRef.current)
        .call(axis)
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('.tick line').remove())
        .call(g =>
          g
            .selectAll('.tick text')
            .attr('x', textOffset.x)
            .attr('y', textOffset.y)
            .attr('font-size', 20)
            .attr('font-family', 'GothamNarrowMedium'),
        )
  }, [gRef, axis, textOffset.x, textOffset.y])

  return <g ref={gRef} transform={`translate(${x}, ${y})`}></g>
}

export function Axis(props: AxisOverrides) {
  const context = useAppContext()
  return <>{pipe(context, O.fold(onDOMLoading, onDOMLoaded(props)))}</>
}
