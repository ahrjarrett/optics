import React, {useEffect, useRef, useState} from 'react'
import {pipe} from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import {mouse} from 'd3'
import {select, ContainerElement, Selection, BaseType} from 'd3-selection'

import {ContextType} from 'types'
import {useAppContext} from 'components/LineChart'

type TooltipOverrides = {}

type TooltipConfig = {
  context: ContextType
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
  },
  foreignObject: {
    height: 130,
    width: 190,
    padding: 15,
  },
  heading: {
    fill: 'black',
    fontWeight: 600,
  },
  subheading: {},
}

function onDOMLoading(): React.ReactNode {
  return null
}

function onDOMLoaded(
  overrides: TooltipOverrides,
): (context: ContextType) => React.ReactNode {
  return context => <DrawTooltip context={context} overrides={overrides} />
}

const DrawTooltip: React.FC<TooltipConfig> = ({context, overrides}) => {
  const {data, xScale, yScale, width, height} = context
  const xs = data.map(d => d.x.week)
  const ys = data.map(d => d.y)
  const [hovering, setHovering] = useState(false)

  const tooltipRef = useRef<SVGGElement | null>(null)
  const boxRef = useRef<SVGRectElement | null>(null)
  const tooltip = select(tooltipRef.current)
  const heading = tooltip.select('.heading')
  const subheading = tooltip.select('.subheading')
  const mousemove = makeMousemove(context, heading, subheading)

  useEffect(() => {
    const overlay = select(context.d3Ref.current)
      .append('rect')
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

  function makeSubheading(
    yValue: number,
    xValue: {weekStart: string; weekEnd: string},
  ): string {
    const nouns = yValue === 1 ? 'Goal' : 'Goals'
    const helperVerb = yValue === 1 ? 'was' : 'were'
    return `${yValue} ${nouns} ${helperVerb} created or updated between ${xValue.weekStart} and ${xValue.weekEnd}`
  }

  function makeMousemove(
    {height, width, data, d3Ref}: ContextType,
    heading: Selection<BaseType, unknown, null, undefined>,
    subheading: Selection<BaseType, unknown, null, undefined>,
  ) {
    return function mousemove(this: ContainerElement) {
      const mouseX = mouse(this)[0]
      const numXs = data.length - 1
      const pixelsPerX = width / numXs
      const floatI = mouseX / pixelsPerX
      const i = Math.floor(floatI)
      const j = Math.ceil(floatI)
      const _index = floatI - i < j - floatI ? i : j
      const index = numXs - _index
      const weekMonth = data[index].x
      const xValue = weekMonth.week
      const yValue = data[index].y
      const x = xScale(xValue)
      const y = yScale(yValue)

      const headingText = weekMonth.weekStart
      const subheadingText = makeSubheading(yValue, {
        weekStart: weekMonth.weekStart,
        weekEnd: weekMonth.weekEnd,
      })

      /* SIDE-EFFECTS: */
      const tooltip = select(tooltipRef.current)
      const heading = select('tspan.heading')
      const subheading = select('tspan.subheading')

      tooltip.attr('transform', `translate(${x}, ${y})`)
      heading.text(headingText)
      subheading.text(subheadingText)
    }
  }

  return (
    <g style={{...styles.outer, opacity: hovering ? 1 : 0}} ref={tooltipRef}>
      <g transform={`translate(50, 40)`} style={styles.inner}>
        <circle r="6" stroke="none" fill="blue" cx="-20" cy="-10" />
        <rect style={styles.rect} className="box" ref={boxRef} />
        <foreignObject style={styles.foreignObject}>
          <tspan x={7.5} y={27.5} className="heading" style={styles.heading} />
          <br />
          <tspan
            dy={50}
            dx={7.5}
            className="subheading"
            style={styles.subheading}
          />
        </foreignObject>
      </g>
    </g>
  )
}

export function Tooltip(props: TooltipOverrides): JSX.Element {
  const context = useAppContext()
  return <>{pipe(context, O.fold(onDOMLoading, onDOMLoaded(props)))}</>
}
