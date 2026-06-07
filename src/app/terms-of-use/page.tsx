// app/terms-of-use/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Find Movie",
  description:
    "Review the Terms of Use governing your programmatic access, user account rights, and technical boundaries when using Find Movie services.",
  alternates: {
    canonical: "/terms-of-use",
  },
};

export default function TermsOfUsePage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10 md:py-16 text-neutral-300 antialiased selection:bg-red-500/30">
      {/* Structural Semantic Header Section */}
      <header className="mb-10 border-b border-neutral-800 pb-8 md:mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Terms of Use
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
            Welcome to <strong className="text-white">Find Movie</strong>. By
            accessing, traversing, or executing instances within this website,
            you programmatically agree to remain bound under these Terms of Use.
            If you disagree with any phrase or operational constraint, please
            cease system interactions instantly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            1. Acceptance of Terms
          </h2>
          <p>
            By continuing your runtime session, you warrant that you have fully
            read, cataloged, and accepted these operational directives along
            with any localized statutory compliance frameworks governing public
            server nodes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            2. Use of the Website
          </h2>
          <p>
            You agree to direct your interface interactions solely toward
            legitimate, lawful, and compliant operational goals.
          </p>

          <div className="mt-4 rounded-xl border border-neutral-800/60 bg-neutral-900/20 p-5">
            <h3 className="mb-3 text-base font-semibold text-neutral-200">
              Strictly Prohibited Exploitation Vectors:
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-neutral-400">
              <li>Executing actions that bypass federal statutory rules</li>
              <li>
                Injecting payloads to trigger unauthorized backend terminal
                entry
              </li>
              <li>
                Saturating bandwidth vectors to break interface performance
                targets
              </li>
              <li>
                Deploying automated headless bots to index, harvest, or scrape
                asset layouts
              </li>
              <li>
                Uploading worms, recursive script packages, or malicious
                software variants
              </li>
              <li>
                Masking technical identities or executing impersonation routines
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            3. Intellectual Property
          </h2>
          <p>
            The structural build layers, design assets, branding components,
            typographic systems, logos, and code engines remain proprietary
            components protected by global copyright frameworks.
          </p>
          <p className="text-neutral-400">
            You may not decompile, copy, refactor, mirror, or generate
            derivative layouts without explicit authorized authorization from
            the domain controller.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            4. Third-Party Content
          </h2>
          <p>
            Our core layout layers map and pipe content feeds managed on
            upstream third-party environments.
          </p>
          <p>
            Media parameters, cinema descriptions, and television indexing rows
            are processed directly through dependencies provided by{" "}
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
            We offer zero explicit validation over the persistent integrity,
            indexing uptime, or policy compliance maintained on external target
            domains.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            5. User Accounts
          </h2>
          <p>
            Where portal authentication configurations are active, you hold
            exclusive onus for masking and securing your verification string
            hashes and session keychains.
          </p>
          <p>
            Any operation launched via your active account token will be
            attributed directly to your profile. We retain absolute operational
            discretion to purge, freeze, or restrict access tokens that
            compromise infrastructure security boundaries.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            6. Disclaimer of Warranties
          </h2>
          <p className="italic text-neutral-400">
            This site instances render deliverables strictly on an &quot;as
            is&quot; and &quot;as available&quot; basis, without architectural
            representations or secondary guarantees.
          </p>
          <p>
            We do not declare that execution loops will remain constantly
            active, error-free, immune to targeted threat vectors, or free from
            latency variances.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            7. Limitation of Liability
          </h2>
          <p>
            To the maximum degree permitted by applicable legal systems, our
            service tier disclaims liability for secondary losses, database
            corruptions, or operational interruptions linked to your usage of
            this digital application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            8. Indemnification
          </h2>
          <p>
            You agree to indemnify, defend, and preserve the system operators,
            engineering teams, and hosting processors clear from active claims,
            damage liabilities, or litigation fees stemming from structural
            terminal abuse or breach of these operating metrics.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            9. Modifications to the Service
          </h2>
          <p>
            We retain full engineering control to adjust, rewrite, or terminate
            operational access routes across any technical layer instantly
            without distribution of advance change logs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            10. Changes to These Terms
          </h2>
          <p>
            Document parameters adapt to capture system layout expansions.
            Continuing to make database calls following update publications
            serves as automated acknowledgment of our updated system rules.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            11. Governing Law
          </h2>
          <p>
            These metrics shall be assessed and controlled under the structural
            litigation laws governing your local administrative region, avoiding
            cross-jurisdictional legal conflicts.
          </p>
        </section>

        {/* Contact Us Block with Address Markup Elements */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            12. Contact Us
          </h2>
          <p>
            For legal interpretations or systematic reports regarding these
            Terms of Use guidelines, please reach out directly to our operations
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
