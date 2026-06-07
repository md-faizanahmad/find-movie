import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Find Movie",
  description:
    "Read our Privacy Policy to understand how Find Movie collects, handles, and secures your personal data and analytics metrics.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10 md:py-16 text-neutral-300 antialiased selection:bg-red-500/30">
      {/* Structural Semantic Header Section */}
      <header className="mb-10 border-b border-neutral-800 pb-8 md:mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-xs font-medium tracking-wide text-neutral-500 uppercase md:text-sm">
          Last Updated:{" "}
          <time dateTime="2026-06-02" className="text-neutral-400">
            June 2, 2026
          </time>
        </p>
      </header>

      {/* Main Legal Copy Blocks */}
      <div className="space-y-10 text-sm leading-6 sm:text-base sm:leading-7 md:space-y-12">
        <section className="prose prose-invert max-w-none">
          <p>
            Welcome to <strong className="text-white">Find Movie</strong>. Your
            privacy is paramount to us. This Privacy Policy documents how we
            collect, use, disclose, and secure your information when you
            interact with our website platform and API utilities.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            1. Information We Collect
          </h2>
          <p>
            We process different sets of informational profiles depending on
            your direct ecosystem interaction patterns with our site framework:
          </p>

          <div className="mt-4 space-y-4 rounded-xl border border-neutral-800/60 bg-neutral-900/20 p-5">
            <div>
              <h3 className="mb-2 text-base font-semibold text-neutral-200">
                Information You Provide
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-neutral-400">
                <li>Name credentials</li>
                <li>Email address handles</li>
                <li>
                  Account parameters (if registration modules are enabled)
                </li>
                <li>
                  Messages submitted through secure internal contact forms
                </li>
              </ul>
            </div>

            <hr className="border-neutral-800/60" />

            <div>
              <h3 className="mb-2 text-base font-semibold text-neutral-200">
                Automatically Collected Information
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-neutral-400">
                <li>Internet Protocol (IP) address traces</li>
                <li>
                  Browser variant definitions and running version metadata
                </li>
                <li>Hardware device descriptors</li>
                <li>Visited structural sub-pages</li>
                <li>Time stamp matrices and visitor interaction timestamps</li>
                <li>Upstream referring node configurations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            2. How We Use Your Information
          </h2>
          <p>We process analytics data strictly under the following scopes:</p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-400">
            <li>To construct, operate, and maintain web platform interfaces</li>
            <li>
              To polish structural code configurations and frontend layout UX
            </li>
            <li>To service inbound queries, ticketing, and support claims</li>
            <li>To map comprehensive system traffic analytics matrices</li>
            <li>To inspect, trap, and mitigate malicious security events</li>
            <li>
              To execute protocols demanded under federal statutory frameworks
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            3. Cookies and Tracking Technologies
          </h2>
          <p>
            We deploy tracking configurations like cookie sets to cache user
            setup preferences, maintain persistence tokens, and map aggregated
            data flow streams.
          </p>
          <p className="text-neutral-400">
            You maintain full agency to disable cookie processing rules via
            individual web browser preference panels.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            4. Third-Party Services
          </h2>
          <p>
            Certain application dependencies run through cloud integrations to
            maximize core delivery speeds:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-400">
            <li>Global diagnostic systems and performance engines</li>
            <li>User credential validation gateways</li>
            <li>Cloud hosting storage clusters</li>
            <li>High-performance content delivery networks (CDNs)</li>
          </ul>
          <p className="pt-2">
            This platform pulls reference material provided by{" "}
            <strong className="text-neutral-200">
              The Movie Database (TMDB)
            </strong>
            .
          </p>
          <blockquote className="border-l-2 border-red-500 bg-red-950/10 px-4 py-3 text-xs italic text-neutral-400 rounded-r-lg md:text-sm">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </blockquote>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            5. Data Sharing
          </h2>
          <p>
            We do not market, lease, or distribute data profiles to third-party
            ad brokers.
          </p>
          <p className="font-medium text-neutral-200">
            Information is disclosed strictly under:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-400">
            <li>Valid regulatory mandates or judicial execution orders</li>
            <li>Actions taken to safeguard our systemic legal status</li>
            <li>Authorized technical processors operating system structures</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            6. Data Security
          </h2>
          <p>
            We run protective architecture to counter data leakage risk vectors.
            However, no database schema or transport link over public network
            nodes is fully breach-proof.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            7. Data Retention
          </h2>
          <p>
            We retain informational metadata profiles strictly for durations
            needed to complete operational terms, fulfill structural data
            frameworks, or execute ongoing technical auditing.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            8. Your Rights
          </h2>
          <p>
            Depending on your regional legal frameworks, you maintain the
            following capabilities:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-400">
            <li>The power to export individual profile records</li>
            <li>The power to scrub errant entry elements</li>
            <li>The power to request programmatic asset deletion</li>
            <li>The power to halt targeted processing operations</li>
            <li>The power to cancel active consent tokens</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            9. Children&apos;s Privacy
          </h2>
          <p>
            Our components are restricted from processing user files if the
            target individual is under 13. We do not consciously store profiles
            relating to minors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            10. External Links
          </h2>
          <p>
            Our presentation layer exposes pointers pointing to external
            domains. We assume zero control over the programmatic privacy
            schemas deployed inside separate ecosystems.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            11. Changes to This Privacy Policy
          </h2>
          <p>
            We modify document rules dynamically. All updates overwrite active
            content instantly on this URL along with a refreshed modification
            timestamp.
          </p>
        </section>

        {/* Contact Us Block with Address Markup Elements */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            12. Contact Us
          </h2>
          <p>
            For queries about our operational data handling configurations,
            contact our controller:
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
                {/* md.faizan.ahmad.web@gmail.com */}
              </a>
            </p>
          </address>
        </section>
      </div>
    </main>
  );
}
