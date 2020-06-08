import React, { useEffect, useRef } from 'react'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import { select, ContainerElement } from 'd3-selection'
import { bisect, bisector, mouse } from 'd3'

import { Context } from '../types'
import { useAppContext } from './LineChart'

type TooltipOverrides = {}

type TooltipConfig = {
  context: Context,
  overrides: TooltipOverrides
}

const tooltipStyles = {
  display: 'none'
}


function onDOMLoading(): React.ReactNode {
  return null
}

function onDOMLoaded(overrides: TooltipOverrides): (context: Context) => React.ReactNode {
  return (context) => <DrawTooltip context={context} overrides={overrides} />
}

function dToMs(d: Date): number {
  return new Date(d).getTime()
}

const DrawTooltip: React.FC<TooltipConfig> = ({ context, overrides }) => {
  const tooltipRef = useRef<SVGGElement | null>(null)
  const { xs, ys, xScale, yScale } = context

  function mousemove(this: ContainerElement) {
    const week = xScale.invert(mouse(this)[0])
    const w = dToMs(week)
    // const dayOfWeek = new Date(week).getDay()

    const bisect = bisector<number, number>((a, b) => {
      return w - a > w - b ? 1 : -1
    }).left

    const i = bisect(xs, w) - 1

    const tooltip = select(tooltipRef.current).attr('transform', `translate(${xScale(xs[i])}, ${yScale(ys[i].length)})`)
  }

  useEffect(() => {
    const rect = select(context.d3Ref.current)
      .append('rect')
      .attr('width', context.width)
      .attr('height', context.height)
      .attr('transform', 'translate(30, 30)')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')

    if (tooltipRef.current) {
      rect.on('mouseover', () => {
        select(tooltipRef.current).style('display', null)
      })
      rect.on('mouseout', () => {
        select(tooltipRef.current).style('display', 'none')
      })
      rect.on('mousemove', mousemove)
    }
  }, [])

  return (
    <g style={tooltipStyles} ref={tooltipRef}>
      <text x={0} y={30}><tspan>heading</tspan></text>
    </g>
  )
}

export function Tooltip(props: TooltipOverrides): JSX.Element {
  const context = useAppContext()
  return <>
    {pipe(context, O.fold(onDOMLoading, onDOMLoaded(props)))}
  </>
}
