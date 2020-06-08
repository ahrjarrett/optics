import React, { useEffect, useRef, useState } from 'react'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import { select, ContainerElement } from 'd3-selection'
import { bisect, bisector, mouse } from 'd3'
import { timeWeek } from 'd3-time'


import { Context } from '../types'
import { useAppContext } from './LineChart'

type TooltipOverrides = {}

type TooltipConfig = {
  context: Context,
  overrides: TooltipOverrides
}

const styles = {
  outer: {
    height: 130,
    width: 190,
  },
  inner: {
    border: '1px solid #F1F1F1',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.16)',
  },
  rect: {
    height: 130,
    width: 190,
    fill: '#fff',
    borderRadius: 4,
    outline: '1px solid rgba(0, 0, 0, 0.16)',
    // transform: `translate(30px, 30px)`
  },
  foreignObject: {
    height: 130,
    width: 190,
    padding: 15
  },
  heading: {
    fill: 'black',
    fontWeight: 600
  },
  subheading: {
  }
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

function dateToWeekString(dn: Date): string {
  return new Date(timeWeek(dn).valueOf()) + ''
}

function humanizeDateString(ds: string): string {
  return ds.slice(4).slice(0, 11)
}

const DrawTooltip: React.FC<TooltipConfig> = ({ context, overrides }) => {
  const { xs, ys, xScale, yScale } = context
  const [hovering, setHovering] = useState(false)

  const tooltipRef = useRef<SVGGElement | null>(null)
  const boxRef = useRef<SVGRectElement | null>(null)
  const tooltip = select(tooltipRef.current)

  useEffect(() => {
    const overlay = select(context.d3Ref.current).append('rect')
      .attr('width', context.width)
      .attr('height', context.height)
      .attr('transform', 'translate(30, 30)')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('cursor', 'pointer')

    overlay.on('mouseover', () => {
      setHovering(true)
    })
    overlay.on('mouseout', () => {
      setHovering(false)
    })
    overlay.on('touchmove mousemove', mousemove)
  }, [])

  function makeSubtitle(yValue: number): string {
    const nouns = yValue === 1 ? 'Goal' : 'Goals'
    const helperVerb = yValue === 1 ? 'was' : 'were'
    return `${yValue} ${nouns} ${helperVerb} created or updated between mm / dd / yyyy and mm / dd / yyyy`
  }

  function mousemove(this: ContainerElement) {
    const week = xScale.invert(mouse(this)[0])
    const w = dToMs(week)
    const bisect = bisector<number, number>((a, b) => {
      return w - a > w - b ? 1 : -1
    }).left

    const i = bisect(xs, w) - 1
    const y = ys[i].length
    const x = xs[i]
    const yValue = yScale(y)
    const xValue = xScale(xs[i])
    /*** SIDE-EFFECTS: ***/
    const tooltip = select(tooltipRef.current).attr('transform', `translate(${xValue}, ${yValue})`)
    const heading = tooltip.select('tspan.heading')
      .text(humanizeDateString(dateToWeekString(week)))
    const subheading = tooltip.select('tspan.subheading').text(makeSubtitle(y))
    /*** END SIDE-EFFECTS: ***/
  }

  return (
    <g style={{ ...styles.outer, display: hovering ? undefined : 'none' }} ref={tooltipRef}>
      <g transform={`translate(50, 40)`} style={styles.inner}>
        <circle r='6' stroke='none' fill='blue' cx='-20' cy='-10' />
        <rect style={styles.rect} className='box' ref={boxRef} />
        <foreignObject style={styles.foreignObject}>
          <tspan x={7.5} y={27.5} className='heading' style={styles.heading} />
          <br />
          <tspan dy={50} dx={7.5} className='subheading' style={styles.subheading} />
        </foreignObject>
      </g>
    </g>
  )
}

export function Tooltip(props: TooltipOverrides): JSX.Element {
  const context = useAppContext()
  return <>
    {pipe(context, O.fold(onDOMLoading, onDOMLoaded(props)))}
  </>
}
