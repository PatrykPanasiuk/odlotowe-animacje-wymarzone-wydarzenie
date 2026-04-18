'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { pl } from 'date-fns/locale';
import { format } from 'date-fns';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const fieldBtn =
  'w-full flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-left text-gray-200 focus:ring-2 focus:ring-brand-purple focus:outline-none transition-all hover:border-white/20';

const dayPickerClassNames = {
  root: cn(
    'rounded-2xl border border-white/10 bg-gray-950/95 p-3 shadow-2xl backdrop-blur-xl text-gray-100'
  ),
  months: 'flex flex-col gap-3',
  month:
    'grid grid-cols-[2.25rem_minmax(0,1fr)_2.25rem] gap-y-2 [&>[role=grid]]:col-span-3 [&>[role=grid]]:row-start-2',
  month_caption: 'flex h-10 items-center justify-center px-1',
  caption_label: 'font-display text-center text-base font-bold capitalize tracking-tight text-white',
  button_previous: cn(
    'inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10',
    'bg-white/5 text-white transition-colors',
    'hover:border-brand-purple/40 hover:bg-brand-purple/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple'
  ),
  button_next: cn(
    'inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10',
    'bg-white/5 text-white transition-colors',
    'hover:border-brand-purple/40 hover:bg-brand-purple/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple'
  ),
  chevron: 'size-4 fill-current opacity-90',
  month_grid: 'w-full border-collapse',
  weekdays: 'mb-1 flex',
  weekday: 'w-9 pb-1 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500',
  week: 'mt-0.5 flex w-full',
  day: 'relative p-0 text-center',
  day_button: cn(
    'inline-flex size-9 items-center justify-center rounded-xl text-sm font-medium',
    'text-gray-200 transition-colors',
    'hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple',
    'text-inherit'
  ),
  outside: 'opacity-40',
  disabled: 'cursor-not-allowed opacity-25',
  today: 'font-semibold [&:not([data-selected=true])_button]:text-brand-pink',
  selected: cn(
    'rounded-xl shadow-lg',
    'vibrant-gradient text-white [&_button]:text-white [&_button]:hover:bg-white/15'
  ),
};

type EventDateFieldProps = {
  id?: string;
  name?: string;
};

export function EventDateField({ id: idProp, name = 'eventDate' }: EventDateFieldProps) {
  const autoId = useId();
  const triggerId = idProp ?? `event-date-${autoId}`;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = selected
    ? format(selected, 'd MMMM yyyy', { locale: pl })
    : 'Wybierz datę…';

  return (
    <div ref={rootRef} className="relative">
      <input
        type="hidden"
        name={name}
        value={selected ? format(selected, 'yyyy-MM-dd') : ''}
        readOnly
      />
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={`${triggerId}-calendar`}
        onClick={() => setOpen((v) => !v)}
        className={fieldBtn}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <CalendarDays size={18} className="shrink-0 text-brand-purple opacity-90" aria-hidden />
          <span className={cn('truncate', !selected && 'text-gray-500')}>{label}</span>
        </span>
        <ChevronDown
          size={20}
          className={cn('shrink-0 text-gray-500 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={`${triggerId}-calendar`}
          role="dialog"
          aria-label="Kalendarz"
          className="absolute left-0 top-[calc(100%+0.5rem)] z-[80] min-w-[min(100%,19rem)] sm:min-w-[19rem]"
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => {
              setSelected(d);
              setOpen(false);
            }}
            locale={pl}
            weekStartsOn={1}
            showOutsideDays
            navLayout="around"
            classNames={dayPickerClassNames}
          />
        </div>
      )}
    </div>
  );
}
