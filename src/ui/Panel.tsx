import React from 'react';
import { PanelProps } from '@/types/Components';

const Panel = React.memo(function Panel({
  title,
  children,
  isActive,
  onShow,
  buttonLabel = 'Show',
}: PanelProps) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>{buttonLabel}</button>
      )}
    </section>
  );
});

export default Panel;
