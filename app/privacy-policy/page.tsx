import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for PackFit, detailing our data collection, local storage approach, and handling practices.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl py-16 px-4 mx-auto prose prose-slate">
      <h1 className="text-4xl font-extrabold text-brand-navy mb-8">Privacy Policy</h1>

      <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <section className="mb-8">
        <h2>1. Introduction</h2>
        <p>
          At PackFit, we prioritize your privacy. This Privacy Policy outlines how we handle any information when you use our website and web applications.
        </p>
      </section>

      <section className="mb-8">
        <h2>2. Local Storage First</h2>
        <p>
          PackFit is designed to run primarily in your browser. The core functionality—such as your packing configurations, selected templates, and usage streaks—are saved locally on your device using browser Local Storage. <strong>We do not transmit your personal packing data to external servers.</strong>
        </p>
      </section>

      <section className="mb-8">
        <h2>3. Third-Party Services & Analytics</h2>
        <p>While we do not collect personal data directly, we use the following third-party services which may collect anonymous usage data:</p>
        <ul>
          <li><strong>Google Analytics (GA4):</strong> Used to understand how visitors interact with our site (e.g., page views, time on site). This data is anonymized and aggregate.</li>
          <li><strong>Google AdSense & Monetag:</strong> We display advertisements to keep the tool free. These services may use cookies to serve ads based on your prior visits to our website or other websites on the internet.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>4. Cookies</h2>
        <p>
          Our third-party advertising partners use cookies. You can choose to disable cookies through your individual browser options. To learn more about how Google uses cookies in advertising, please visit the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Advertising Privacy & Terms</a> page.
        </p>
      </section>

      <section className="mb-8">
        <h2>5. Data Retention</h2>
        <p>
          Because your personal packing data is stored in your browser, you control how long it is retained. You can clear this data at any time by clearing your browser&apos;s local storage or cache.
        </p>
      </section>

      <section className="mb-8">
        <h2>6. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please visit our <a href="/contact" className="text-primary underline">Contact page</a>.
        </p>
      </section>
    </div>
  );
}
