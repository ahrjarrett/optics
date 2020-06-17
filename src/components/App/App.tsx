import React, {useEffect, useState} from 'react';
import {some, none, fold as foldOption} from 'fp-ts/lib/Option';
import {left, right, fold as foldEither} from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';

import {LineChart} from 'components/LineChart';
import {Loading} from 'components/Loading';
import {ViewData} from 'components/ViewData';
import {renderValidationError} from './';
import {AppData, AppState, Error, Margin} from 'types';
import {InputCodec, Input} from 'types/codecs';
import {identity} from 'helpers/utils';
import {image} from 'd3';

const margin: Margin = {top: 0, bottom: 30, left: 30, right: 0};

function DrawChart(decodedData: Input) {
  return (
    <>
      <div style={{height: 220, width: 1000, marginLeft: 130, marginTop: 70}}>
        <LineChart
          input={decodedData}
          x={100}
          y={100}
          width={1000}
          height={220}
          margin={margin}
          title="Update frequency"
          subtitle="Weekly update frequency of aligned goals since goal creation."
        />
      </div>
      <ViewData data={decodedData} />
    </>
  );
}

const onLoading = () => <Loading />;
const onFetchError = (err: Error) => <p>Fetch Error: {err}</p>;
const onFetchSuccess = (data: AppData) => {
  const result = InputCodec.decode(data);
  return pipe(result, foldEither(onInvalidData, DrawChart));
};

const onInvalidData = (validationErrors: t.Errors) => {
  const keys = validationErrors
    .map(vs =>
      vs.context
        .map(ctx => ctx.key)
        .filter(identity)
        .reduce((keys, key, i) =>
          i === 0 ? ''.concat(key) : keys.concat(`[${key}]`, ''),
        ),
    )
    .join();

  validationErrors.forEach(e => console.log(e, '\n\n\n'));
  console.log('validationErrors', validationErrors);

  return (
    <>
      <h1>Data validation errors: ({validationErrors.length})</h1>
      {validationErrors.map(renderValidationError(keys))}
    </>
  );
};

// Invalid data provided: <pre>{JSON.stringify(validationErrors, null, 2)}</pre>

export function App() {
  const [state, setState] = useState<AppState>(none);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/data.json');
        const data = await res.json();
        setState(some(right(data)));
      } catch (e) {
        setState(some(left(e)));
      }
    })();
  }, []);

  return (
    <>
      {pipe(
        state,
        foldOption(onLoading, foldEither(onFetchError, onFetchSuccess)),
      )}
    </>
  );
}
