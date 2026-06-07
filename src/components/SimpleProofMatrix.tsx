'use client';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { AudienceLens } from '@/data/highlights';

export interface ProofMatrixRow {
  id: string;
  name: string;
  signal: string;
  outcome: string;
  proof: string;
  href?: string;
  proofLabel?: string;
}

interface SimpleProofMatrixProps {
  rows: ProofMatrixRow[];
  lens?: AudienceLens;
}

function rowMatchesLens(row: ProofMatrixRow, lens: AudienceLens) {
  if (lens === 'systems') {
    return /Systems|Product|Computer Vision/i.test(row.signal);
  }

  return /Quant|Research|ML|Search/i.test(row.signal);
}

export default function SimpleProofMatrix({ rows, lens = 'systems' }: SimpleProofMatrixProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'signal', desc: false }]);
  const columns = useMemo<ColumnDef<ProofMatrixRow>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Work',
        cell: ({ row }) => (
          <div className="min-w-[150px]">
            <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.86)' }}>
              {row.original.name}
            </p>
            <p className="mt-1 text-[11.5px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {row.original.proof}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'signal',
        header: 'Signal',
        cell: ({ getValue }) => (
          <span className="text-[12.5px] font-medium" style={{ color: '#c7d9ff' }}>
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'outcome',
        header: 'Why it matters',
        enableSorting: false,
        cell: ({ getValue }) => (
          <p className="max-w-[420px] text-[12.5px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.58)' }}>
            {getValue<string>()}
          </p>
        ),
      },
      {
        id: 'proof',
        header: 'Proof',
        enableSorting: false,
        cell: ({ row }) =>
          row.original.href ? (
            <a
              href={row.original.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[12px] font-semibold"
              style={{ color: '#c7d9ff' }}
            >
              {row.original.proofLabel ?? 'Link'}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ) : (
            <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.34)' }}>
              Listed
            </span>
          ),
      },
    ],
    []
  );
  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table intentionally powers this isolated recruiter scan.
  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="simple-proof-table overflow-hidden rounded-xl border">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortable = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      className="border-b px-4 py-3 text-[11px] font-semibold"
                      style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                    >
                      {sortable ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1.5 text-left transition-colors hover:text-white/70"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <ArrowUpDown size={11} aria-hidden="true" />
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="simple-proof-row"
                data-lens-match={rowMatchesLens(row.original, lens) ? 'true' : 'false'}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b px-4 py-3.5 align-top last:border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.045)' }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-0 md:hidden">
        {rows.map((row) => (
          <article
            key={row.id}
            className="simple-proof-row border-b px-4 py-4 last:border-b-0"
            data-lens-match={rowMatchesLens(row, lens) ? 'true' : 'false'}
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[14px] font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  {row.name}
                </h3>
                <p className="mt-1 text-[12px] font-medium" style={{ color: '#c7d9ff' }}>
                  {row.signal}
                </p>
              </div>
              {row.href ? (
                <a
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold"
                  style={{ color: '#c7d9ff' }}
                >
                  {row.proofLabel ?? 'Proof'}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <p className="mt-3 text-[12.5px] leading-[1.6]" style={{ color: 'rgba(255,255,255,0.56)' }}>
              {row.outcome}
            </p>
            <p className="mt-2 text-[11.5px] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.36)' }}>
              {row.proof}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
