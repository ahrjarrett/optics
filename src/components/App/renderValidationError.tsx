import * as React from 'react';
import * as t from 'io-ts';

const RenderFullError = ({v}: {v: t.ValidationError}) => {
  const [hidden, setHidden] = React.useState(true);
  return (
    <>
      <br />
      <br />
      <h3>
        Show entire error:
        <button
          style={{
            transform: hidden ? `rotate(0)` : `rotate(270)`,
            marginLeft: '1.5em',
          }}
          onClick={() => setHidden(b => !b)}
        >
          ▶
        </button>
      </h3>
      <pre
        style={{
          backgroundColor: '#f7f7f7',
          display: hidden ? 'none' : undefined,
          border: '1px solid #ececec',
          marginLeft: '1em',
        }}
      >
        {JSON.stringify(v, null, 2)}
      </pre>
      <br />
      <br />
    </>
  );
};

export const renderValidationError = (keys: string) => (
  v: t.ValidationError,
) => (
  <h2 style={{marginBottom: 60}}>
    <br />
    <br />
    Offending value:
    <br />
    <br />
    <span
      style={{
        color: 'orangered',
        fontFamily: 'monospace',
        marginLeft: '1em',
      }}
    >
      {(v.value as string)?.length > 1
        ? `"${v.value as string}`
        : '<missing value>'}
    </span>
    <br />
    <br />
    Object:
    <br />
    <pre style={{color: 'gray', marginLeft: '1em'}}>
      {JSON.stringify(v.context[v.context.length - 2].actual, null, 2)}
    </pre>
    <br />
    Context/Location:
    <br />
    <br />
    <span style={{color: 'gray', fontFamily: 'monospace', marginLeft: '1em'}}>
      {keys}
    </span>
    <br />
    <br />
    Expected type:
    <br />
    <br />
    <span
      style={{
        fontWeight: 700,
        fontFamily: 'monospace',
        marginLeft: '1em',
        color: 'cadetblue',
      }}
    >
      {v.context[v.context.length - 1].type.name}
    </span>
    {v.message && (
      <>
        <br />
        <br />
        <span style={{color: 'cadetblue', marginLeft: '1em'}}>
          Message: {v.message}
        </span>
        <br />
        <br />
      </>
    )}
    <RenderFullError v={v} />
  </h2>
);
