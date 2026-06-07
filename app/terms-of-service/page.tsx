import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Packing Cube Optimizer",
  description: "Terms of Service for using the Packing Cube Optimizer platform and tools.",
};

export default function TermsOfServicePage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container max-w-3xl py-12 px-4 mx-auto prose prose-slate">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Packing Cube Optimizer (the &quot;Service&quot; or &quot;Tool&quot;), you accept and agree to be
          bound by the terms and provision of this agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p>
          Packing Cube Optimizer is an interactive web tool designed to assist users in visually planning
          and optimizing their luggage space. The tool provides simulations based on generic and specific
          airline carry-on dimensions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Disclaimer of Warranties</h2>
        <p>
          The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind.
          While we strive for accuracy in our packing simulations and airline allowance data,
          airline rules change frequently and without notice. <strong>We do not guarantee that your
          luggage will be accepted by an airline.</strong> Always verify baggage restrictions directly
          with your airline before traveling.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
        <p>
          In no event shall Packing Cube Optimizer, its developers, or its affiliates be liable for any
          indirect, incidental, special, consequential or punitive damages, including without limitation,
          excess baggage fees, missed flights, or any other loss resulting from your access to or use of,
          or inability to access or use the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Modifications to Service</h2>
        <p>
          We reserve the right at any time and from time to time to modify or discontinue, temporarily or
          permanently, the Service (or any part thereof) with or without notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
        <p>
          If you have any questions or concerns regarding these Terms of Service, please contact us via our <a href="/contact" className="text-primary underline">Contact page</a>.
        </p>
      </section>
    </div>
  );
}
