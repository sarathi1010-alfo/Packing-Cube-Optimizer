import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedPages } from "@/components/seo/RelatedPages";


interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PAGES = {
  "weekend-getaway": {
    title: "Weekend Getaway Packing List",
    description: "The ultimate minimalist packing list for a quick weekend getaway. Fit everything into a personal item and skip the overhead bin.",
    content: `
      <h2>How to pack for a quick weekend getaway?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Pack for a weekend getaway by using a single personal item-sized bag, packing just two versatile outfits, using one small packing cube for clothing and a clear TSA-approved bag for toiletries.</p>
      </div>
      <p>A weekend trip shouldn't require a large suitcase. The goal is to travel 'Personal Item Only' to breeze through the airport. Stick to a strict limit: the clothes on your back, one extra outfit, sleepwear, and basic toiletries.</p>
    `,
    faqs: [
      {
        question: "Can I pack for a weekend in just a backpack?",
        answer: "Absolutely. A standard 25L to 30L backpack is plenty of space for 2-3 days if you roll your clothes and use a small packing cube to organize them."
      }
    ]
  },
  "business-trip-checklist": {
    title: "Business Trip Checklist: Professional & Portable",
    description: "The ultimate business trip checklist for professionals who want to travel with a single carry-on and keep their attire wrinkle-free.",
    content: `
      <h2>What's on the essential business trip checklist?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">The essential business checklist includes 2-3 dress shirts in a garment folder, 1 tailored blazer, 2 pairs of trousers, a dedicated tech organizer for adapters, and a professional-grade carry-on bag.</p>
      </div>
      <p>Business travel is all about efficiency. Your checklist should prioritize high-quality fabrics that resist wrinkling and a streamlined tech setup that allows you to work from anywhere.</p>
    `,
    faqs: [
      {
        question: "How do I pack a suit without a garment bag?",
        answer: "Turn the jacket inside out, fold it in half, and roll it loosely around soft items like t-shirts. This minimizes sharp creases and protects the outer fabric."
      }
    ]
  },
  "digital-nomad-packing-list": {
    title: "Digital Nomad Packing List: Long-Term Essentials",
    description: "Pack for a life on the road. The essential gear, tech, and clothing for digital nomads living out of a single bag.",
    content: `
      <h2>What should a digital nomad pack for long-term travel?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Digital nomads should pack a high-performance laptop, universal power adapter, noise-canceling headphones, a versatile 5-4-3-2-1 capsule wardrobe, and a secure cloud backup system for all work data.</p>
      </div>
      <p>When your home is in your bag, quality matters more than quantity. Invest in durable, high-performance gear that can withstand daily use across different climates and environments.</p>
    `,
    faqs: [
      {
        question: "How much clothing does a digital nomad really need?",
        answer: "Enough for 7-10 days. Rely on regular laundry and choose items that can be layered to suit different weather conditions."
      }
    ]
  },
  "ultralight-backpacking-list": {
    title: "Ultralight Backpacking List: Every Ounce Counts",
    description: "Cut your pack weight and move faster. The ultimate ultralight backpacking list for serious travelers.",
    content: `
      <h2>How do I create an ultralight packing list?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">An ultralight list prioritizes multi-functional gear, minimalist toiletries, lightweight synthetic or merino fabrics, and a streamlined 'personal item only' approach whenever possible.</p>
      </div>
      <p>Ultralight travel is a mindset. Every item must earn its place in your bag. If an item only has one use and isn't vital, it's a candidate for removal.</p>
    `,
    faqs: [
      {
        question: "Is ultralight travel expensive?",
        answer: "It can be, as high-tech, lightweight materials often cost more. However, you can also travel ultralight by simply bringing less stuff, which costs nothing!"
      }
    ]
  },
  "winter-getaway-checklist": {
    title: "Winter Getaway Checklist: Bulk-Free Warmth",
    description: "Stay warm without the bulk. The essential winter getaway checklist for traveling light in cold climates.",
    content: `
      <h2>What's on the winter getaway checklist?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">The winter checklist focuses on high-quality thermal base layers, a packable down jacket, waterproof footwear, and using large compression cubes to manage the volume of bulky sweaters.</p>
      </div>
      <p>Winter packing doesn't have to mean giant suitcases. By choosing the right materials and using compression technology, you can stay warm while still traveling with just a carry-on.</p>
    `,
    faqs: [
      {
        question: "How do I fit a heavy coat in a carry-on?",
        answer: "Don't! Wear your bulkiest coat on the plane. It saves massive space and weight in your bag, and you can use it as a pillow or blanket during the flight."
      }
    ]
  },
  "summer-camp-checklist": {
    title: "Summer Camp Packing Checklist",
    description: "Everything your child needs for a successful summer camp experience. Stay organized and label everything!",
    content: `
      <h2>What's on the summer camp checklist?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">A summer camp checklist should include durable outdoor clothing, swimwear, a sleeping bag, toiletries, a flashlight, and plenty of extra socks and underwear, all organized in color-coded cubes.</p>
      </div>
      <p>Organization is key for kids at camp. Use color-coded packing cubes to keep different categories of gear separate. Check out our <a href="/templates" class="text-brand-orange underline font-semibold">Packing Checklist</a> section for more templates.</p>
    `,
    faqs: [
      {
        question: "How do I prevent my child from losing their gear?",
        answer: "Label everything with their name using a permanent marker or iron-on labels. Using distinctively colored packing cubes also helps them identify their belongings quickly."
      }
    ]
  },
  "cruise-ship-packing-list": {
    title: "Cruise Ship Packing List: Sea & Shore",
    description: "Master the art of packing for a cruise. From formal nights to tropical excursions.",
    content: `
      <h2>How to pack for a cruise?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For a cruise, pack a mix of casual daywear, a formal outfit for dinner, comfortable excursion shoes, a small daypack for ports, and a magnetic hook for extra cabin storage.</p>
      </div>
      <p>Cruise cabins can be compact. Efficient spatial planning is vital. Use our <a href="/" class="text-brand-orange underline font-semibold">simulator</a> to plan your luggage. Read our guide on <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">avoiding baggage fees</a> for your flights to the port.</p>
    `,
    faqs: [
      {
        question: "Do I need to bring a lot of formal clothes for a cruise?",
        answer: "Most modern cruises are becoming more casual, but usually have one or two 'formal nights'. Check your specific cruise line's dress code before packing."
      }
    ]
  },
  "safari-packing-list": {
    title: "Ultimate Safari Packing List: Gear & Clothing",
    description: "Prepare for the adventure of a lifetime with our comprehensive safari packing list. Tips for bush flights and wildlife viewing.",
    content: `
      <h2>What's on the essential safari packing list?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">The essential safari checklist includes neutral-colored lightweight layers, high-quality binoculars, a wide-brimmed hat, sturdy closed-toe shoes, and a high-performance camera with a zoom lens.</p>
      </div>
      <p>Safari travel often involves small planes with strict weight limits. Choosing the right materials—like moisture-wicking synthetics or breathable cotton—is key. Stick to khakis, tans, and olives to blend in with the environment and avoid attracting insects. Use compression cubes to fit everything into a soft-sided duffel bag as required by bush pilots.</p>
    `,
    faqs: [
      {
        question: "Why should I avoid bright colors on safari?",
        answer: "Bright colors can startle the animals. Additionally, dark blue and black can attract tsetse flies. Neutral colors like khaki, beige, and light green are the most practical and respectful choices."
      }
    ]
  },
  "ski-trip-checklist": {
    title: "Ski Trip Checklist: Peak Performance Packing",
    description: "Don't forget a thing! Our ski trip checklist ensures you have all the layers, gear, and après-ski essentials for the mountains.",
    content: `
      <h2>What are the must-haves for a ski trip checklist?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">The ultimate ski checklist covers thermal base layers, a waterproof ski jacket and pants, moisture-wicking socks, goggles, gloves, and a warm hat. Use large compression cubes for bulky fleeces and sweaters.</p>
      </div>
      <p>Skiing involves a lot of specialized gear. If you're traveling carry-on only, wearing your heaviest jacket and boots on the plane is a must. Plan your packing cube configuration with <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to maximize every inch of your suitcase. For more tips on managing heavy winter gear, see our guide on <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">avoiding overweight fees</a>.</p>
    `,
    faqs: [
      {
        question: "How many pairs of ski socks do I need?",
        answer: "Pack at least 3-4 pairs of high-quality wool or synthetic ski socks for a week-long trip. Never wear two pairs at once as it can restrict circulation and actually make your feet colder."
      }
    ]
  },
  "maternity-travel-checklist": {
    title: "Maternity Travel Checklist: Comfort & Care",
    description: "Travel comfortably during pregnancy. The essential maternity travel checklist for safety, support, and well-being.",
    content: `
      <h2>What should be on a maternity travel checklist?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">A maternity travel checklist should prioritize compression socks for circulation, a supportive belly band, comfortable slip-on shoes, prenatal vitamins, and a copy of your medical records.</p>
      </div>
      <p>Traveling while pregnant requires extra planning for comfort and safety. Focus on breathable, stretchy fabrics and items that alleviate common travel discomforts like swelling and back pain. Use our <a href="/" class="text-brand-orange underline font-semibold">simulator</a> to plan your bag so that frequent essentials are always within easy reach.</p>

      <h3>Staying Comfortable on Long Flights</h3>
      <p>Compression socks are vital for preventing deep vein thrombosis (DVT) and reducing swelling in the legs and feet. Additionally, bring a small pillow for lumbar support and stay hydrated throughout your journey. Always consult with your healthcare provider before any significant travel during pregnancy.</p>
    `,
    faqs: [
      {
        question: "Is it safe to fly during the third trimester?",
        answer: "Most airlines allow travel up to 36 weeks, but rules vary. Always check your airline's specific policy and consult with your doctor before booking a flight in your third trimester."
      }
    ]
  },
  "student-study-abroad": {
    title: "Student Study Abroad Packing List",
    description: "Prepare for your semester of a lifetime. The essential packing list for students studying abroad, from tech to lifestyle.",
    content: `
      <h2>What are the essentials for a study abroad packing list?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For study abroad, pack a reliable laptop and universal power adapter, a versatile capsule wardrobe for diverse social and academic settings, a secure way to carry your passport, and essential medications.</p>
      </div>
      <p>Studying abroad is a long-term commitment that requires a balance between academic needs and personal travel. Focus on items that are durable and multi-functional. Use compression packing cubes to fit a semester's worth of basics into a manageable suitcase. Read our <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">baggage fee guide</a> to ensure you don't start your semester with a heavy airline penalty.</p>
    `,
    faqs: [
      {
        question: "Should I pack a lot of school supplies?",
        answer: "No. Most stationery and basic supplies can be bought cheaply at your destination. Focus your luggage space on specialized electronics and clothing that might be harder to find or more expensive abroad."
      }
    ]
  },
  "toddler-travel-essentials": {
    title: "Toddler Travel Essentials Checklist",
    description: "Keep your little one happy and organized on the go. The ultimate checklist for traveling with a toddler.",
    content: `
      <h2>What are the toddler travel essentials?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Toddler travel essentials include plenty of snacks, a favorite comfort item, a compact stroller, a robust diaper bag, and using color-coded packing cubes to keep toys and clothes organized.</p>
      </div>
      <p>Traveling with a toddler requires extra organization and patience. Plan your packing to be as modular as possible. Use dedicated packing cubes for different categories: one for clothes, one for toys, and one for essentials like diapers and wipes. Check out our <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">toddler baggage tips</a> for more advice.</p>
    `,
    faqs: [
      {
        question: "How do I keep my toddler entertained on a flight?",
        answer: "Pack a variety of small, quiet toys and activities. Novelty is key—new toys that they haven't seen before can hold their attention for longer. Don't forget their favorite comfort object!"
      }
    ]
  },
  "senior-cruise-checklist": {
    title: "Senior Cruise Packing Checklist",
    description: "Enjoy your cruise with comfort and peace of mind. The ultimate packing checklist for seniors.",
    content: `
      <h2>What's on the senior cruise packing checklist?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">The senior cruise checklist prioritizes comfortable walking shoes with good grip, a comprehensive medication organizer, elegant evening attire, sun protection, and a copy of all important medical records.</p>
      </div>
      <p>A cruise is a wonderful way to travel, offering comfort and variety. Focus on packing versatile layers for both on-board and shore excursions. Use standard packing cubes to keep your belongings organized and easy to find in your cabin. Read our guide on <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">avoiding baggage fees</a> for your flights to the embarkation port.</p>
    `,
    faqs: [
      {
        question: "What should I pack for medical needs on a cruise?",
        answer: "Bring a full supply of all medications in their original containers, plus a few extra days' worth just in case. A list of your prescriptions and your doctor's contact information is also essential."
      }
    ]
  },
  "glamping-checklist": {
    title: "The Ultimate Glamping Checklist",
    description: "Combine comfort with the great outdoors. Our glamping checklist covers all the luxury essentials for your next high-end camping trip.",
    content: `
      <h2>What's on the essential glamping checklist?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">A glamping checklist prioritizes 'luxe' comfort items like cozy loungewear, portable ambient lighting, high-quality toiletries, a dedicated coffee setup, and versatile footwear for both camp and trails.</p>
      </div>
      <p>Glamping is about the experience. Use standard packing cubes to keep your luxury items organized and clean. Plan your packing with <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to ensure your gear fits perfectly in your vehicle or travel bag.</p>
    `,
    faqs: [
      {
        question: "What is the difference between camping and glamping?",
        answer: "Glamping (glamorous camping) typically involves more amenities and creature comforts than traditional camping, such as comfortable beds, electricity, and often more gourmet food options."
      }
    ]
  },
  "hiking-day-trip-checklist": {
    title: "Hiking Day Trip Checklist: Trail Essentials",
    description: "Don't get caught unprepared on the trail. Our hiking day trip checklist covers everything from safety gear to hydration.",
    content: `
      <h2>What should I bring on a hiking day trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">The hiking day trip checklist focuses on the 'Ten Essentials', including navigation, sun protection, insulation, illumination, first-aid, fire, repair kit, nutrition, hydration, and emergency shelter.</p>
      </div>
      <p>For a day trip, weight and balance are key. Use our <a href="/" class="text-brand-orange underline font-semibold">visual simulator</a> to ensure your daypack's center of gravity is close to your back. Check out our <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">spatial optimization guide</a> for tips on packing a balanced pack.</p>
    `,
    faqs: [
      {
        question: "How much water should I carry on a day hike?",
        answer: "A general rule of thumb is about 0.5 liters of water for every hour of moderate activity in moderate temperatures. Adjust based on intensity, terrain, and weather conditions."
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const page = PAGES[resolvedParams.slug as keyof typeof PAGES];

  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${page.title} | PackFit`,
    description: page.description,
  };
}

export default async function PackingListPage({ params }: PageProps) {
  const resolvedParams = await params;
  const page = PAGES[resolvedParams.slug as keyof typeof PAGES];

  if (!page) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <article className="container max-w-3xl py-12 px-4 mx-auto">
      <JsonLd data={faqSchema} />
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-orange mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-3">Packing List</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight mb-4">
          {page.title}
        </h1>
        <div className="text-muted-foreground text-xs mb-4 italic">Last updated: July 14, 2026</div>
      </div>

      <div
        className="prose prose-lg prose-slate max-w-none prose-headings:text-brand-navy prose-a:text-brand-orange hover:prose-a:text-brand-orange/80"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />

      <div className="mt-12">
         <h2 className="text-2xl font-bold text-brand-navy mb-6">Frequently Asked Questions</h2>
         <div className="space-y-6">
            {page.faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
            ))}
         </div>
      </div>

      <div className="mt-16 bg-brand-sand/30 border border-brand-beige rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-brand-navy mb-3">Optimize your spatial planning</h3>
        <p className="text-muted-foreground mb-6">Plan your exact luggage arrangement for this trip with our free tool.</p>
        <Link href="/simulator">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
            Try the Visual Simulator
          </Button>
        </Link>
      </div>

      <RelatedPages currentSlug={resolvedParams.slug} currentCluster="packing-lists" />
    </article>
  );
}