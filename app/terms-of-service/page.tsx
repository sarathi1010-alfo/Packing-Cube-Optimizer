import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for using the PackFit platform and tools.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container max-w-3xl py-16 px-4 mx-auto prose prose-slate">
      <h1 className="text-4xl font-extrabold text-brand-navy mb-8">Terms of Service</h1>

      <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <section className="mb-8">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using PackFit (the &quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2>2. Use of Service</h2>
        <p>
          The Service is provided &quot;as is&quot; for informational and planning purposes only. While we strive to maintain accurate airline baggage dimensions and rules, airlines change their policies frequently. <strong>You are solely responsible for verifying the current baggage rules directly with your airline before travel.</strong> PackFit is not liable for any baggage fees, denied boarding, or other travel disruptions resulting from the use of our Service.
        </p>
      </section>

      <section className="mb-8">
        <h2>3. Local Storage and Data</h2>
        <p>
          PackFit operates primarily as a client-side application. Your packing lists, templates, and configurations are saved locally in your browser&apos;s storage. We are not responsible for the loss of this data due to browser clearing, cache resets, or changing devices.
        </p>
      </section>

      <section className="mb-8">
        <h2>4. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are owned by PackFit and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>
      </section>

      <section className="mb-8">
        <h2>5. Advertising and Links</h2>
        <p>
          Our Service contains links to third-party web sites or services that are not owned or controlled by us, including display advertisements. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
        </p>
      </section>

      <section className="mb-8">
        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding these Terms of Service, please contact us via our <a href="/contact" className="text-primary underline">Contact page</a>.
        </p>
      </section>
    </div>
  );
}
