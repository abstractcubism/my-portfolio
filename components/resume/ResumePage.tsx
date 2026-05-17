import { FaArrowUpRightFromSquare, FaDownload } from 'react-icons/fa6';
import FooterBottom from '@/components/FooterBottom';
import ResumePreview from '@/components/ResumePreview';

const RESUME_PATH = '/resume.pdf';

export default function ResumePage() {
  return (
    <>
      <main className="relative min-h-[100dvh] bg-[var(--background)] px-3 pb-24 pt-20 text-[var(--foreground)] sm:px-6">
        <div className="mx-auto flex w-full max-w-[1200px] justify-center">
          <section className="w-full">
            <div className="mx-auto w-full max-w-[1140px] rounded-[30px] border border-[var(--border)] bg-[var(--card)]/92 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-4">
              <div className="mb-3 flex flex-col gap-3 rounded-[22px] border border-black/8 bg-[#efe9df] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                </p>

                <div className="flex flex-col items-stretch gap-3 sm:flex-row">
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/88 px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] text-[var(--foreground)] shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:px-5 sm:text-xs"
                  >
                    <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
                    open in new tab
                  </a>
                  <a
                    href={RESUME_PATH}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/92 px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] text-[var(--foreground)] shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] hover:text-[var(--color-accent)] sm:px-5 sm:text-xs"
                  >
                    <FaDownload className="h-3.5 w-3.5" />
                    download pdf
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-[22px] border border-black/8 bg-[#efe9df] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                <ResumePreview src={`${RESUME_PATH}#page=1&zoom=page-width&toolbar=0&navpanes=0`} />
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className="bg-[var(--background)] px-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <FooterBottom />
        </div>
      </div>
    </>
  );
}
