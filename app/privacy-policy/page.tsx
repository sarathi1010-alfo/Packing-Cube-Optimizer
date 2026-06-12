import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Packing Cube Optimizer",
  description: "Privacy Policy for Packing Cube Optimizer, detailing our data collection and handling practices.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container max-w-3xl py-12 px-4 mx-auto prose prose-slate">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>
          Welcome to Packing Cube Optimizer (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy
          and ensuring you have a positive experience on our website. This Privacy Policy applies to our website
          at packfit.alfo.online and explains how we collect, use, and share your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
        <p>
          Currently, Packing Cube Optimizer operates primarily as a client-side application. We do not require
          you to create an account or provide direct personal identifying information to use our core features.
        </p>
        <p>However, we may collect the following data through third-party services:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Usage Data:</strong> Information on how you interact with our website, pages visited, and time spent, collected via analytics tools (like Google Analytics).</li>
          <li><strong>Device Information:</strong> Browser type, operating system, and potentially IP addresses via analytics and hosting providers.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Use of Cookies and Tracking</h2>
        <p>
          We and our third-party partners (such as Google AdSense and Google Analytics) use cookies and similar tracking
          technologies to track activity on our service and hold certain information.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          However, if you do not accept cookies, you may not be able to use some portions of our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. CCPA and GDPR Compliance</h2>
        <p>
          Depending on your location, you may have specific rights regarding your personal data. If you are a
          resident of the European Economic Area (EEA) or California, you have the right to access, correct,
          update, or request deletion of your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please visit our <a href="/contact" className="text-primary underline">Contact page</a>.
        </p>
      </section>
    </div>
  );
}
