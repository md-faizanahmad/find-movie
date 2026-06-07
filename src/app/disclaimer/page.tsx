// app/disclaimer/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Find Movie",
  description:
    "Read the structural legal disclaimer regarding content accuracy, automated TMDB database sourcing, and limited system liabilities on Find Movie.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10 md:py-16 text-neutral-300 antialiased selection:bg-red-500/30">
      {/* Structural Semantic Header Section */}
      <header className="mb-10 border-b border-neutral-800 pb-8 md:mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Disclaimer
        </h1>
        <p className="mt-4 text-xs font-medium tracking-wide text-neutral-500 uppercase md:text-sm">
          Last Updated:{" "}
          <time dateTime="2026-06-02" className="text-neutral-400">
            June 2, 2026
          </time>
        </p>
      </header>

      {/* Main Structural Legal Copy Blocks */}
      <div className="space-y-10 text-sm leading-6 sm:text-base sm:leading-7 md:space-y-12">
        <section className="prose prose-invert max-w-none">
          <p>
            The informational catalogs, media layers, and interface utilities
            provided on this website are delivered strictly for{" "}
            <strong className="text-white">
              general informational and entertainment scopes
            </strong>{" "}
            only. By interacting with our runtime code, you declare
            acknowledgment of all operational rules and boundaries documented
            inside this Disclaimer layout.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            1. General Information
          </h2>
          <p>
            While our continuous delivery pipes aim to keep index entries
            updated, we state no warranties or absolute guarantees regarding the
            consistency, accuracy, structural completeness, or downstream
            availability of datasets mirrored on this domain.
          </p>
          <p className="text-neutral-400">
            Any reliance you commit to records discovered via our presentation
            layers remains exclusively at your own operational risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            2. TMDB Data Disclaimer
          </h2>
          <p>
            This system queries, streams, and aggregates data vectors containing
            cast biographies, cinematic listings, backdrop images, and video
            metadata powered via external APIs.
          </p>
          <p>
            All such elements are handled via structures managed by{" "}
            <strong className="text-neutral-200">
              The Movie Database (TMDB)
            </strong>
            .
          </p>
          <blockquote className="border-l-2 border-red-500 bg-red-950/10 px-4 py-3 text-xs italic text-neutral-400 rounded-r-lg md:text-sm">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </blockquote>
          <p className="text-neutral-400 pt-2">
            Third-party database states alter independently without system
            alert. We perform no manual structural audits or verification runs
            over individual remote asset properties pulled via dynamic endpoint
            routes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            3. No Professional Advice
          </h2>
          <p>
            The textual strings on this layout do not form financial, technical,
            legal, copyright, or specialized expert advice.
          </p>
          <p className="text-neutral-400">
            Users must execute custom due diligence processing loops before
            applying actions based on unverified informational layers discovered
            on consumer web systems.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            4. External Links
          </h2>
          <p>
            Our view components expose hyperlinks pointing toward separate
            remote server platforms. These pointers are routed purely as
            reference conveniences.
          </p>
          <p className="text-neutral-400">
            We operate no technical moderation, tracking verification, or
            architecture review loops inside external domain spaces, assuming
            zero liability for downstream tracking methods running there.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            5. Service Availability
          </h2>
          <p>
            We deploy no implicit technical promises guaranteeing that the web
            application framework will persistently stay online, error-free,
            latency-free, or clear from database exceptions.
          </p>
          <p className="text-neutral-400">
            Operational connections may experience transient pauses or absolute
            terminations without advanced text distributions due to build
            deployments, server maintenance runs, infrastructure upgrades, or
            generic hardware errors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            6. Limitation of Liability
          </h2>
          <p>
            Under limits approved by sovereign jurisdictions, the core site
            operators, managers, and system host nodes stand insulated from
            tracking claims, resource damages, data leakages, or execution
            errors linked to your interaction or interface downtime with this
            application layout.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            7. Copyright and Trademarks
          </h2>
          <p>
            All external brand configurations, production trademarks, logo
            vectors, title art blocks, and artwork properties mirrored inside
            video modules are held exclusively by their legal copyright
            entities.
          </p>
          <p className="text-neutral-400">
            Their rendering inside our UI nodes serves an informative/index
            reference profile only and signifies no corporate sponsorship,
            official alliance, or endorsement between parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            8. Changes to This Disclaimer
          </h2>
          <p>
            We update operational parameters inside this disclosure block at our
            own technical discretion. Continued use of active system routes
            following document edits serves as full acknowledgment of updated
            limits.
          </p>
        </section>

        {/* Contact Information Block with Address Markup Elements */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            9. Contact Information
          </h2>
          <p>
            For analytical questions or operational clarifications regarding our
            content data exclusions, reach out directly to our compliance
            anchor:
          </p>

          <address className="not-italic rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-1.5 shadow-sm max-w-md">
            <p className="font-semibold text-white text-base">
              Md Faizan Ahmad
            </p>
            <p className="text-sm text-neutral-400 flex items-center gap-2">
              <span>Email:</span>
              <a
                href="mailto:md.faizan.ahmad.web@gmail.com"
                className="text-red-400 hover:text-red-300 hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-red-500 rounded px-0.5"
              >
                md.faizan.ahmad.web@gmail.com
              </a>
            </p>
          </address>
        </section>
      </div>
    </main>
  );
}
