import type { Subject } from '../data/curriculum';
import { subjectColorClasses } from '../data/curriculum';
import { useLangStore } from '../store/langStore';
import { t } from '../data/translations';

export function SubjectBadge({ subject }: { subject: Subject }) {
  const lang = useLangStore((s) => s.lang);
  const colors = subjectColorClasses[subject];

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} ${colors.border}`}>
      {t(lang, subject)}
    </span>
  );
}
