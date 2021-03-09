import * as React from 'react';
import { SupabaseGridQueue } from '../../constants';

type StatusLabelProps = {};

const StatusLabel: React.FC<StatusLabelProps> = ({}) => {
  const [msg, setMsg] = React.useState('idel');
  let timer = React.useRef<NodeJS.Timeout | null>(null);

  SupabaseGridQueue.on('add', () => {
    console.log(
      `Task is added.  Size: ${SupabaseGridQueue.size}  Pending: ${SupabaseGridQueue.pending}`
    );
  });

  SupabaseGridQueue.on('active', () => {
    if (timer && timer.current) clearTimeout(timer.current!);
    setMsg('Saving ...');
    console.log(
      `Queue is active.  Size: ${SupabaseGridQueue.size}  Pending: ${SupabaseGridQueue.pending}`
    );
  });
  SupabaseGridQueue.on('idle', () => {
    setMsg('All changes saved');
    timer.current = setTimeout(() => setMsg('idel'), 3000);
    console.log(
      `Queue is idle.  Size: ${SupabaseGridQueue.size}  Pending: ${SupabaseGridQueue.pending}`
    );
  });

  return (
    <div className="text-white">
      <label>{msg}</label>
    </div>
  );
};
export default StatusLabel;
