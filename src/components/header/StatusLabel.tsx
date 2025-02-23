import * as React from 'react';
import { SupabaseGridQueue } from '../../constants';
import { Typography } from '@supabase/ui';

type StatusLabelProps = {};

const StatusLabel: React.FC<StatusLabelProps> = ({}) => {
  const [msg, setMsg] = React.useState<string | undefined>(undefined);
  let timer = React.useRef<number | null>(null);

  SupabaseGridQueue.on('active', () => {
    if (timer && timer.current) clearTimeout(timer.current!);
    setMsg('Saving...');
  });
  SupabaseGridQueue.on('idle', () => {
    setMsg('All changes saved');
    timer.current = window.setTimeout(() => setMsg(undefined), 2000);
  });

  return (
    <div className="text-white text-sm">
      {msg && <Typography.Text>{msg}</Typography.Text>}
      {!msg && (
        <div className="flex w-5 h-5">
          <div className="m-auto w-2 h-2 rounded-full bg-green-500" />
        </div>
      )}
    </div>
  );
};
export default StatusLabel;
