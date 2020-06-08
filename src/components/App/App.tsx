import React, { useEffect, useState } from 'react';
import { some, none, fold as foldOption } from 'fp-ts/lib/Option'
import { left, right, fold as foldEither } from 'fp-ts/lib/Either'
import { pipe } from "fp-ts/lib/pipeable"

import { LineChart } from '../LineChart'
import { Loading } from '../Loading'
import { mockData } from '../../helpers/mockData'
import { groupBy, groupByWeek } from '../../helpers/utils'

import { AppData, AppState, Error } from '../../types'
import './App.css'

declare global {
    interface Window { __namespace__: any }
}

const margin = { top: 0, bottom: 30, left: 30, right: 0 }

const onLoading = () => <Loading />
const onError = (err: Error) => <p>Error: {err}</p>
const onSuccess = (data: AppData) => <div style={{ height: 220, width: 1000 }}>
    <LineChart data={data} x={100} y={100} width={1000} height={220} margin={margin} />
</div>

export function App() {
    const [state, setState] = useState<AppState>(none)

    useEffect(() => {
        (async () => {
            try {
                const data = await mockData()
                const groupedByWeek = groupBy(groupByWeek, data.updates)
                setState(some(right(groupedByWeek)))
            } catch (e) {
                setState(some(left(e)))
            }
        })()
    }, [])

    return pipe(state, foldOption(onLoading, foldEither(onError, onSuccess)))
}
