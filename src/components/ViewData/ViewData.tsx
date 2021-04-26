import React, { useEffect, useState } from 'react';

import { AppData } from 'types';

type Props = {
  data: AppData;
};

const styles = {
  position: 'absolute' as const,
  top: 50,
  left: 1200,
};

export const ViewData: React.FC<Props> = ({ data }) => {
  const [show, setShow] = useState<boolean>(false);
  const toggleData = (): void => setShow((shown) => !shown);

  return (
    <div style={styles}>
      <button onClick={toggleData}>{show ? 'Hide' : 'Show'} Data</button>
      {show && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
