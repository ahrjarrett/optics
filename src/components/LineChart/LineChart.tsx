import React, {createContext, useContext, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import {scaleTime, scaleLinear} from 'd3-scale'
import {AxisDomain} from 'd3-axis'
import {select} from 'd3-selection'
import {some, none, Option} from 'fp-ts/lib/Option'
import {pipe} from 'fp-ts/lib/pipeable'

import {Axis} from 'components/Axis'
import {Tooltip} from 'components/Tooltip'
import {
  AppData,
  ContextType,
  Datum,
  GroupedInput,
  Margin,
  WeekMonth,
  SVGNode,
  D3Ref,
  YScale,
} from 'types'

import {
  groupBy,
  groupByWeek,
  isNotNil,
  max,
  min,
  prop,
  zipRecord,
} from 'helpers/utils'

dayjs.extend(minMax)
dayjs.extend(weekOfYear)

// const toDesc = (a: number, b: number) => (a > b ? 1 : -1)
// const sortData = (d: Datum[]) => d.sort((d1, d2) => (d1.x > d2.x ? 1 : -1))

const styles = {
  title: {
    textAlign: 'center' as const,
    fontFamily: 'GothamNarrowLight',
    fontSize: 30,
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center' as const,
    fontFamily: 'GothamNarrowLight',
    marginTop: 10,
  },
  area: {
    fill: 'url(#area-gradient)',
    strokeWidth: '05px',
  },
}

type Props = {
  input: AppData
  width: number
  height: number
  x: number
  y: number
  margin: Margin
  title?: string
  subtitle?: string
}

const NUMBER_OF_TICKS_Y = 3
const NUMBER_OF_TICKS_X = 4

const formatY = (domain: AxisDomain) => {
  console.log('domain', domain)
  return domain.toString().slice(4, 7).toUpperCase()
}

export const Context = createContext<Option<ContextType>>(none)

export const useAppContext = () => useContext(Context)

// function head<A>(as: NonEmptyArray<A>): A { return as[0] }
// function tail<A>(as: NonEmptyArray<any>): Array<A> { return as.slice(1) }

// const grouped = groupBy(groupByWeek)(result)

function freeMonoid<A>(a: A) {
  return [a]
}

const months: Record<number, string> = {
  0: 'JAN',
  1: 'FEB',
  2: 'MAR',
  3: 'APR',
  4: 'MAY',
  5: 'JUN',
  6: 'JUL',
  7: 'AUG',
  8: 'SEP',
  9: 'OCT',
  10: 'NOV',
  11: 'DEC',
}

const toX = (datum: GroupedInput): {x: WeekMonth} =>
  freeMonoid(datum)
    .map(prop('week'))
    .map(Number)
    .map(x => new Date(x))
    .map(d => dayjs(d))
    .map(d => ({
      x: {
        week: d.week().valueOf(),
        month: d.month(),
        monthString: months[d.month()],
        weekStart: d.format('M-D-YYYY'),
        weekEnd: d.add(7, 'day').format('M-D-YYYY'),
      },
    }))[0]
const getUpdates = prop('updates')
const getUpdatesLength = (d: GroupedInput) => prop('updates')(d).length

const toY = (datum: GroupedInput) => ({
  updates: getUpdates(datum),
  y: getUpdatesLength(datum),
})

const buildDataObjs = (datum: GroupedInput): Datum => ({
  ...toX(datum),
  ...toY(datum),
})

function useGradient(ref: D3Ref, yScale: YScale) {
  useEffect(() => {
    select(ref.current)
      .append('linearGradient')
      /****  vvv `id` must match the fill-source `url` in styles.area ^^^  ***/
      .attr('id', 'area-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(10))
      .attr('x2', 0)
      .attr('y2', yScale(2))
      .selectAll('stop')
      .data([
        {offset: '0%', color: 'rgba(42, 92, 219, 0.1)'},
        {offset: '86.62%', color: 'rgba(46, 91, 255, 1e-05)'},
      ])
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color)
  }, [ref, yScale])
}

export const LineChart: React.FC<Props> = ({
  input,
  width,
  height,
  x,
  y,
  title,
  subtitle,
}) => {
  const data = pipe(input.updates, groupBy(groupByWeek), zipRecord).map(
    buildDataObjs,
  )

  const xs = data.map(prop('x'))
  const ys = data.map(prop('y'))
  const wks = xs.map(prop('week'))
  const mos = xs.map(prop('month'))
  //const updates = data.map(prop('updates'))

  const xmin = min(wks)
  const xmax = max(wks)
  const ymax = max(ys)

  const d3Ref = useRef<SVGNode>(null)
  const xScale = scaleTime().domain([xmin, xmax]).range([0, width])
  const yScale = scaleLinear().domain([0, ymax]).range([height, 0])
  const contextValue = some({
    d3Ref: d3Ref,
    data,
    width,
    height,
    xScale,
    yScale,
    mos,
  })

  const line = d3
    .line<Datum>()
    .x(d => xScale(d.x.week))
    .y(d => yScale(d.y))

  const area = d3
    .area<Datum>()
    .x(d => xScale(d.x.week))
    .y0(height)
    .y1(d => yScale(d.y))

  useGradient(d3Ref, yScale)

  return (
    <Context.Provider value={contextValue}>
      <svg ref={d3Ref} width="100%" height={height + 30} overflow="overlay">
        <g transform={`translate(30, 30)`}>
          <path
            d={line(data) as string | undefined}
            style={{
              stroke: '#2A5CDB',
              strokeWidth: 3,
              /*strokeMiterlimit: 0.5,*/ fillOpacity: 0,
            }}
          />
        </g>
        <g transform={`translate(30, 30)`}>
          <path
            className="area"
            d={area(data) as string | undefined}
            style={styles.area}
          />
        </g>
        <Axis ticks={NUMBER_OF_TICKS_Y} orientation={'LEFT'} />
        <Axis
          ticks={NUMBER_OF_TICKS_X}
          orientation={'BOTTOM'}
          /*formatter={formatY}*/
        />
        <Tooltip />
      </svg>
      {isNotNil(title) && <h3 style={styles.title}>{title}</h3>}
      {isNotNil(subtitle) && <p style={styles.subtitle}>{subtitle}</p>}
    </Context.Provider>
  )
}
