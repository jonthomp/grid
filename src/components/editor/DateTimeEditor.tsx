import * as React from 'react';
import { EditorProps } from '@supabase/react-data-grid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

interface DateTimeEditorProps<TRow, TSummaryRow = unknown>
  extends EditorProps<TRow, TSummaryRow> {
  format: string;
}
const INPUT_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

function BaseEditor<TRow, TSummaryRow = unknown>({
  row,
  column,
  format,
  onRowChange,
  onClose,
}: DateTimeEditorProps<TRow, TSummaryRow>) {
  const value = row[column.key as keyof TRow] as unknown as string;
  const timeValue = value
    ? dayjs(value, format).format(INPUT_DATE_TIME_FORMAT)
    : value;

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    let _value = event.target.value;
    if (_value == '') {
      onRowChange({ ...row, [column.key]: null });
    } else {
      const _timeValue = dayjs(_value, INPUT_DATE_TIME_FORMAT).format(format);
      onRowChange({ ...row, [column.key]: _timeValue });
    }
  }

  return (
    <input
      className="sb-grid-datetime-editor"
      ref={autoFocusAndSelect}
      value={timeValue ?? ''}
      onChange={onChange}
      onBlur={() => onClose(true)}
      type="datetime-local"
      step="1"
    />
  );
}

export function DateTimeEditor<TRow, TSummaryRow = unknown>(
  props: EditorProps<TRow, TSummaryRow>
) {
  return <BaseEditor {...props} format="YYYY-MM-DDTHH:mm:ss" />;
}

export function DateTimeWithTimezoneEditor<TRow, TSummaryRow = unknown>(
  props: EditorProps<TRow, TSummaryRow>
) {
  return <BaseEditor {...props} format="YYYY-MM-DDTHH:mm:ssZ" />;
}
