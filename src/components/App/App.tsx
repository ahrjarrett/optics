import React, { useEffect, useState } from 'react';
import { some, none, fold as foldOption } from 'fp-ts/lib/Option'
import { left, right, fold as foldEither } from 'fp-ts/lib/Either'
import { pipe } from "fp-ts/lib/pipeable"
import * as d3time from 'd3-time'

import { LineChart } from '../LineChart'
import { Loading } from '../Loading'
import { mockData } from '../../helpers/mockData'
import { groupBy, groupByWeek } from '../../helpers/utils'

import { AppData, AppState, Error } from '../../types'
import './App.css'

declare global {
    interface Window { __namespace__: any }
}

window.__namespace__ = window.__namespace__ || { d3time: d3time }

const onLoading = () => <Loading />
const onError = (err: Error) => <p>Error: {err}</p>
const onSuccess = (data: AppData) =>
    <LineChart data={data} x={100} y={100} width={1000} height={220} />

export function App() {
    const [state, setState] = useState<AppState>(none)

    useEffect(() => {
        (async () => {
            try {
                const data = await mockData()
                const groupedByWeek = groupBy(groupByWeek, data.updates)
                setState(some(right(groupedByWeek)))
            }
            catch (e) {
                setState(some(left(e)))
            }
        })()
    }, [])

    return <div>
        {pipe(state, foldOption(onLoading, foldEither(onError, onSuccess)))}
    </div>
}
