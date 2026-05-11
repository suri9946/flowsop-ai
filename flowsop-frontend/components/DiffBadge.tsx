"use client";

interface DiffBadgeProps {
  status: 'unchanged' | 'modified' | 'added' | 'removed';
}

export default function DiffBadge({ status }: DiffBadgeProps) {
  if (status === 'unchanged') return null;

  const config = {
    added: { label: 'NEW', classes: 'bg-green-500/10 text-green-500 border-green-500/20' },
    modified: { label: 'MODIFIED', classes: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    removed: { label: 'REMOVED', classes: 'bg-red-500/10 text-red-500 border-red-500/20' }
  };

  const { label, classes } = config[status as keyof typeof config] || { label: '', classes: '' };
  if (!label) return null;

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${classes}`}>
      {label}
    </span>
  );
}
