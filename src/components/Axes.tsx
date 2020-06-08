import React, { useEffect } from 'react'
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'

import { Context } from '../types'
import { useAppContext } from './LineChart'

type Orientation = "LEFT" | "TOP" | "BOTTOM" | "RIGHT"


type AxisProps = {
  orientation: Orientation
  ticks: number
}

type AxisConfig = {
  context: Context
  overrides: AxisProps
}

function onDOMLoading(): React.ReactNode {
  return null
}

function onDOMLoaded(overrides: AxisProps): (context: Context) => React.ReactNode {
  return (context) => <DrawAxis context={context} overrides={overrides} />
}

const DrawAxis: React.FC<AxisConfig> = ({ context, overrides }) => {
  useEffect(() => {
    console.log(context.d3Ref)
  }, [context])
  return <></>
}


export function Axis(props: AxisProps) {
  const context = useAppContext()

  return <>
    {pipe(context, O.fold(onDOMLoading, onDOMLoaded(props)))}
  </>
}
