import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the disclaimer regarding the use of information, content, and services provided on this website.",
};

export default function DisclaimerPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Disclaimer</h1>
          <p className="mt-3 text-muted-foreground">
            Last Updated: June 2, 2026
          </p>
        </div>

        <section className="space-y-4">
          <p>
            The information and services provided on this website are for
            general informational and entertainment purposes only. By using this
            website, you agree to the terms outlined in this Disclaimer.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. General Information
          </h2>

          <p>
            While we strive to keep information accurate and up to date, we make
            no representations or warranties of any kind regarding the accuracy,
            completeness, reliability, suitability, or availability of any
            content displayed on this website.
          </p>

          <p>
            Any reliance you place on information obtained through this website
            is strictly at your own risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. TMDB Data Disclaimer
          </h2>

          <p>
            This website uses movie, television, cast, crew, and related
            metadata provided by The Movie Database (TMDB).
          </p>

          <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </blockquote>

          <p>
            Information provided through TMDB may change, be incomplete, contain
            inaccuracies, or become outdated. We do not independently verify all
            third-party data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. No Professional Advice
          </h2>

          <p>
            Content available on this website does not constitute professional,
            legal, financial, medical, or other specialized advice.
          </p>

          <p>
            Users should seek appropriate professional guidance when making
            decisions based on information obtained from external sources.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. External Links
          </h2>

          <p>
            This website may contain links to third-party websites and services.
            These links are provided for convenience only.
          </p>

          <p>
            We do not control, endorse, or assume responsibility for the
            content, privacy practices, availability, or accuracy of third-party
            websites.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Service Availability
          </h2>

          <p>
            We do not guarantee that the website will always be available,
            uninterrupted, secure, or error-free.
          </p>

          <p>
            Access to the website may be suspended temporarily or permanently
            without notice due to maintenance, technical issues, updates, or
            circumstances beyond our control.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Limitation of Liability
          </h2>

          <p>
            To the fullest extent permitted by applicable law, we shall not be
            liable for any direct, indirect, incidental, consequential, special,
            or punitive damages arising from the use of, or inability to use,
            this website or its content.
          </p>

          <p>
            This includes damages resulting from errors, omissions,
            interruptions, loss of data, service outages, or inaccuracies in
            third-party information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            7. Copyright and Trademarks
          </h2>

          <p>
            All trademarks, logos, brand names, movie titles, television titles,
            and related intellectual property displayed on this website remain
            the property of their respective owners.
          </p>

          <p>
            Their appearance on this website does not imply ownership,
            endorsement, or affiliation unless explicitly stated.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            8. Changes to This Disclaimer
          </h2>

          <p>
            We reserve the right to update, modify, or replace this Disclaimer
            at any time without prior notice.
          </p>

          <p>
            Continued use of the website after updates constitutes acceptance of
            the revised Disclaimer.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Contact Information</h2>

          <p>
            If you have questions regarding this Disclaimer, please contact:
          </p>

          <div className="rounded-lg border p-4">
            <p className="font-medium">Md Faizan Ahmad</p>
            <p>Email: md.faizan.ahmad.web@gmail.com</p>
          </div>
        </section>
      </div>
    </main>
  );
}