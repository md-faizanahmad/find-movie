// app/terms-of-use/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the Terms of Use governing access to and use of our platform and services.",
};

export default function TermsOfUsePage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Terms of Use</h1>
          <p className="mt-3 text-muted-foreground">
            Last Updated: June 2, 2026
          </p>
        </div>

        <section className="space-y-4">
          <p>
            Welcome to <strong>Your Website Name</strong>. By accessing or using
            this website, you agree to be bound by these Terms of Use. If you do
            not agree with any part of these terms, please do not use our
            services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Acceptance of Terms
          </h2>

          <p>
            By accessing or using this website, you confirm that you have read,
            understood, and agreed to comply with these Terms of Use and all
            applicable laws and regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. Use of the Website
          </h2>

          <p>You agree to use the website only for lawful purposes.</p>

          <p>You must not:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Violate any applicable laws or regulations</li>
            <li>Attempt unauthorized access to our systems or services</li>
            <li>Disrupt or interfere with website functionality</li>
            <li>Use automated tools to scrape or abuse our services</li>
            <li>Upload malicious software, viruses, or harmful code</li>
            <li>Impersonate another person or entity</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Intellectual Property
          </h2>

          <p>
            All website content, including text, design, graphics, logos,
            trademarks, and software, is owned by or licensed to us and is
            protected by applicable intellectual property laws.
          </p>

          <p>
            You may not copy, distribute, reproduce, modify, or create
            derivative works without prior written permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Third-Party Content
          </h2>

          <p>
            This website may include content, services, or links provided by
            third parties.
          </p>

          <p>
            Movie, television, and related metadata may be sourced from The
            Movie Database (TMDB).
          </p>

          <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </blockquote>

          <p>
            We are not responsible for the accuracy, availability, or content
            of third-party websites or services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. User Accounts
          </h2>

          <p>
            If user accounts are available, you are responsible for maintaining
            the confidentiality of your account credentials.
          </p>

          <p>
            You are responsible for all activities conducted through your
            account.
          </p>

          <p>
            We reserve the right to suspend or terminate accounts that violate
            these Terms of Use.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Disclaimer of Warranties
          </h2>

          <p>
            The website and its content are provided on an "as is" and "as
            available" basis without warranties of any kind.
          </p>

          <p>
            We do not guarantee that the website will be uninterrupted,
            error-free, secure, or free from harmful components.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            7. Limitation of Liability
          </h2>

          <p>
            To the fullest extent permitted by law, we shall not be liable for
            any indirect, incidental, consequential, special, or punitive
            damages arising from your use of the website.
          </p>

          <p>
            Your use of the website is at your own risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            8. Indemnification
          </h2>

          <p>
            You agree to indemnify and hold harmless the website owner,
            affiliates, partners, and service providers from claims, damages,
            liabilities, costs, and expenses resulting from your use of the
            website or violation of these terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            9. Modifications to the Service
          </h2>

          <p>
            We reserve the right to modify, suspend, or discontinue any part of
            the website at any time without prior notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            10. Changes to These Terms
          </h2>

          <p>
            We may update these Terms of Use from time to time. Continued use of
            the website after changes become effective constitutes acceptance of
            the revised terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            11. Governing Law
          </h2>

          <p>
            These Terms of Use shall be governed and interpreted in accordance
            with the laws applicable in your jurisdiction, without regard to
            conflict of law principles.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Contact Us</h2>

          <p>
            If you have any questions regarding these Terms of Use, please
            contact:
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