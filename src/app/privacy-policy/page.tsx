import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read our Privacy Policy to understand how we collect, use, and protect your information when using our platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-muted-foreground">
            Last Updated: June 2, 2026
          </p>
        </div>

        <section className="space-y-4">
          <p>
            Welcome to <strong>Find Movie</strong>. Your privacy is
            important to us. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our website
            and services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Information We Collect
          </h2>

          <div>
            <h3 className="mb-2 text-lg font-medium">
              Information You Provide
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Account information (if registration is available)</li>
              <li>Messages submitted through contact forms</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">
              Automatically Collected Information
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Date and time of visits</li>
              <li>Referring website information</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc space-y-2 pl-6">
            <li>Provide and maintain our services</li>
            <li>Improve website functionality and user experience</li>
            <li>Respond to inquiries and support requests</li>
            <li>Analyze website usage and performance</li>
            <li>Detect and prevent fraud or security issues</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Cookies and Tracking Technologies
          </h2>

          <p>
            We may use cookies and similar tracking technologies to improve user
            experience, remember preferences, and analyze website traffic.
          </p>

          <p>
            You can control or disable cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Third-Party Services
          </h2>

          <p>
            We may use third-party services that collect, monitor, and analyze
            information to improve our services.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Analytics providers</li>
            <li>Authentication providers</li>
            <li>Hosting providers</li>
            <li>Content delivery networks (CDNs)</li>
          </ul>

          <p>
            This website uses data provided by The Movie Database (TMDB).
          </p>

          <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </blockquote>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Sharing</h2>

          <p>
            We do not sell, rent, or trade your personal information.
          </p>

          <p>Information may be shared only when:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Required by law</li>
            <li>Necessary to protect our legal rights</li>
            <li>
              Required by trusted service providers assisting in operating our
              services
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Data Security</h2>

          <p>
            We implement reasonable administrative, technical, and physical
            safeguards designed to protect your information. However, no method
            of internet transmission or electronic storage is completely secure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Data Retention</h2>

          <p>
            We retain information only as long as necessary to fulfill the
            purposes outlined in this Privacy Policy, comply with legal
            obligations, resolve disputes, and enforce agreements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Your Rights</h2>

          <p>
            Depending on applicable laws, you may have rights regarding your
            personal information, including:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Accessing your information</li>
            <li>Correcting inaccurate information</li>
            <li>Requesting deletion of your information</li>
            <li>Objecting to certain processing activities</li>
            <li>Withdrawing consent where applicable</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Children's Privacy</h2>

          <p>
            Our services are not intended for children under the age of 13. We
            do not knowingly collect personal information from children.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. External Links</h2>

          <p>
            Our website may contain links to external websites that are not
            operated by us. We are not responsible for the content, privacy
            practices, or policies of third-party websites.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            11. Changes to This Privacy Policy
          </h2>

          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page along with the revised effective date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Contact Us</h2>

          <p>
            If you have any questions regarding this Privacy Policy, please
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