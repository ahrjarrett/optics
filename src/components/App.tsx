import React, { useEffect, useState } from 'react';
import { some, none, fold as foldOption } from 'fp-ts/lib/Option'
import { left, right, fold as foldEither } from 'fp-ts/lib/Either'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'
import { pipe } from "fp-ts/lib/pipeable"

import { LineChart } from './LineChart'
import { Loading } from './Loading'
import { mockData } from '../helpers/mockData'
import { groupBy, groupByWeek } from '../helpers/utils'
import * as d3time from 'd3-time'
import './App.css'

import { AsyncData, Error, Update } from '../types'

declare global {
    interface Window { __namespace__: any }
}

type AppState = AsyncData<Error, ReadonlyRecord<string, Array<Update>>>

const onLoading = () => <Loading />
const onError = (err: string) => <p>Error: {err}</p>
const onSuccess = (data: ReadonlyRecord<string, Array<Update>>) => <svg width="100%" height="500">
    <LineChart data={data} x={0} y={0} width={500} height={500} />
</svg>

export function App() {
    const [state, setState] = useState<AppState>(none)

    window.__namespace__ = window.__namespace__ || { d3time: d3time }

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


