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
  "asia-packing-guide": {
    title: "Asia Packing Guide: What to Bring",
    description: "A comprehensive packing guide for traveling to Asia, covering everything from humid climates and temple dress codes to tech essentials.",
    content: `
      <h2>How to pack for a trip to Asia?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">When packing for Asia, prioritize ultra-breathable, moisture-wicking clothing for humidity, slip-on shoes for temple visits, a modest outfit that covers shoulders and knees, and a robust universal power adapter.</p>
      </div>
      <p>Traveling across Asia often means navigating diverse climates, from the sweltering heat of Southeast Asia to the crisp mountain air in parts of East Asia. The key is lightweight versatility. Roll your clothes to save space and organize them by outfit or function using standard packing cubes. Learn more in our guide on <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">how to pack efficiently to avoid overweight baggage fees</a>.</p>
    `,
    faqs: [
      {
        question: "What should I wear to visit temples in Asia?",
        answer: "Most temples require modest dress. You must cover your shoulders and knees. Pack a lightweight scarf or sarong to drape over your shoulders, and wear loose linen pants or a long skirt. Slip-on shoes are essential as you'll need to remove them frequently."
      },
      {
        question: "Do I need a mosquito net?",
        answer: "Unless you are trekking in very remote jungles, most accommodations provide nets if necessary. Instead, focus on packing a high-quality DEET or Picaridin insect repellent."
      }
    ]
  },
  "japan-packing-guide": {
    title: "Japan Packing Guide: Travel Smart",
    description: "The definitive guide for packing for Japan, from navigating narrow trains to dressing for urban exploration and onsen visits.",
    content: `
      <h2>How to pack for a trip to Japan?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for Japan, prioritize slip-on shoes for frequent removals, a coin purse for the cash-heavy economy, a portable Wi-Fi or eSIM, and a respectful, smart-casual capsule wardrobe.</p>
      </div>
      <p>Japan involves a lot of walking and frequent shoe changes. Choose comfortable, stylish sneakers that are easy to slip on and off. Pack light, as train overhead bins and luggage storage areas are often very compact.</p>
    `,
    faqs: [
      {
        question: "Is Japan a cash-only society?",
        answer: "While credit cards are increasingly accepted, Japan is still quite cash-heavy, especially for small shops, temples, and vending machines. Always carry a coin purse for 1, 5, 10, 50, 100, and 500 yen coins."
      }
    ]
  },
  "mexico-packing-guide": {
    title: "Mexico Packing Guide: Essentials for Every Trip",
    description: "Whether it's the beach, the city, or the ruins, here's everything you need to pack for Mexico.",
    content: `
      <h2>What should I pack for Mexico?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">When packing for Mexico, bring reef-safe sunscreen for the coast, comfortable walking shoes for ruins, lightweight linen layers for the heat, and a robust travel insurance policy.</p>
      </div>
      <p>Mexico's climate varies greatly. Coastal areas require light, breathable fabrics, while Mexico City can be surprisingly cool in the evenings. Pack a versatile light jacket or pashmina for temperature drops.</p>
    `,
    faqs: [
      {
        question: "Do I need to bring my own snorkeling gear?",
        answer: "Most tours provide it, but for hygiene and better fit, bringing your own mask and snorkel can enhance your experience if you plan to spend a lot of time in the water."
      }
    ]
  },
  "europe-packing-guide": {
    title: "Europe Packing Guide: Essentials and Tips",
    description: "Learn how to pack for Europe like a pro. Tips on blending in, avoiding cobblestone catastrophes, and traveling light.",
    content: `
      <h2>What are the essentials for packing for Europe?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Essential items for Europe include a comfortable pair of stylish walking shoes, a versatile capsule wardrobe in neutral colors, a secure cross-body bag for anti-theft, and a travel adapter for EU/UK outlets.</p>
      </div>
      <p>Europe is best explored with a carry-on. Trains have limited luggage space, and dragging heavy bags over cobblestones is a quick way to ruin your trip. Focus on a capsule wardrobe—items that easily mix and match—and use compression packing cubes to fit it all into a 40L backpack or small roller.</p>
    `,
    faqs: [
      {
        question: "What kind of shoes should I pack for Europe?",
        answer: "Comfort is king. Bring a stylish but highly supportive walking shoe or sneaker. Avoid high heels completely due to cobblestone streets. Bring a second, slightly dressier pair of flats or loafers for evenings."
      }
    ]
  },
  "thailand-packing-guide": {
    title: "Thailand Packing Guide: Tropics and Temples",
    description: "What to bring to Thailand. From the humid streets of Bangkok to the pristine beaches of the south.",
    content: `
      <h2>How to pack for Thailand?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Pack for Thailand with ultra-lightweight linen clothing, a modest outfit for temples (covering shoulders/knees), high-SPF reef-safe sunscreen, and waterproof bags for island hopping.</p>
      </div>
      <p>Thailand's humidity is legendary. Natural, breathable fabrics are your best friend. Don't forget to use <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to plan your luggage for those domestic island hopper flights!</p>
    `,
    faqs: [
      {
        question: "What should I wear to the Grand Palace?",
        answer: "Strict dress codes apply. Men must wear long pants and shirts with sleeves. Women must be modestly dressed, covering shoulders and knees. No flip-flops are allowed."
      }
    ]
  },
  "iceland-packing-guide": {
    title: "Iceland Packing Guide: Layering for the Elements",
    description: "The ultimate guide to packing for Iceland's unpredictable weather. Master the three-layer system.",
    content: `
      <h2>What are the essentials for Iceland?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For Iceland, prioritize a high-quality waterproof shell, thermal base layers, sturdy hiking boots, and a swimsuit for the hot springs. Use compression cubes for bulky wool sweaters.</p>
      </div>
      <p>Weather in Iceland changes every five minutes. The key is versatile layering. See our <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">efficiency guide</a> for tips on managing heavy winter gear.</p>
    `,
    faqs: [
      {
        question: "Do I need an umbrella in Iceland?",
        answer: "No. Iceland is too windy for umbrellas. Invest in high-quality waterproof outerwear with a good hood instead."
      }
    ]
  },
  "bali-packing-guide": {
    title: "Bali Packing Guide: Island Life Essentials",
    description: "Pack for paradise. What to bring for Bali's beaches, jungles, and spiritual retreats.",
    content: `
      <h2>What should I pack for Bali?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">When packing for Bali, bring multiple swimsuits, lightweight cover-ups, a reusable water bottle, insect repellent, and a sarong for temple visits. Use standard packing cubes for organization.</p>
      </div>
      <p>Bali is casual and tropical. Focus on swimwear and light evening wear. Plan your exact bag layout with our <a href="/" class="text-brand-orange underline font-semibold">free simulator</a>.</p>
    `,
    faqs: [
      {
        question: "Do I need to bring my own sarong to Bali?",
        answer: "It's a great multi-purpose item to have, but you can also easily buy beautiful local sarongs at any market or rent them at temple entrances."
      }
    ]
  },
  "italy-packing-guide": {
    title: "Italy Packing Guide: Style & Comfort",
    description: "Experience La Dolce Vita with our comprehensive Italy packing guide. Tips for cities, coastlines, and countryside.",
    content: `
      <h2>How to pack for a trip to Italy?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">When packing for Italy, prioritize stylish but comfortable walking shoes, versatile layers in neutral tones, a modest outfit for church visits, and a high-quality cross-body bag for security.</p>
      </div>
      <p>Italy is a destination where style meets history. You'll be doing a lot of walking on cobblestone streets, so your footwear must be supportive yet elegant. Focus on a capsule wardrobe that can transition from a museum visit to a late-night trattoria dinner.</p>
      <h3>Italian Church Etiquette</h3>
      <p>Many major sites like St. Peter's Basilica or the Pantheon require modest dress. Ensure your shoulders and knees are covered. A lightweight silk scarf is a perfect, packable solution for women to drape over their shoulders.</p>
    `,
    faqs: [
      {
        question: "Can I wear sneakers in Italy?",
        answer: "Yes, but opt for stylish, clean 'fashion sneakers' rather than bulky gym shoes. Italians appreciate a polished look even when casual."
      }
    ]
  },
  "australia-packing-guide": {
    title: "Australia Packing Guide: The Land Down Under",
    description: "From the Outback to the Great Barrier Reef, here's everything you need for an Australian adventure.",
    content: `
      <h2>What are the essentials for an Australia packing list?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for Australia, prioritize high-SPF sunscreen, a broad-brimmed hat, comfortable activewear for hiking, swimwear for the coast, and an Australian power adapter (Type I).</p>
      </div>
      <p>Australia is vast and the climate varies significantly between the tropical north and the temperate south. Always pack for sun protection, as the UV index is very high. If you're visiting during the Australian winter (June-August), don't forget warmer layers for cities like Melbourne or Sydney.</p>
    `,
    faqs: [
      {
        question: "Is the sun really that strong in Australia?",
        answer: "Yes. Sun protection is vital. Use SPF 50+, wear a hat, and seek shade during the middle of the day to avoid severe sunburn."
      }
    ]
  },
  "egypt-packing-guide": {
    title: "Egypt Packing Guide: Temples & Tides",
    description: "Navigate the Nile and explore the pyramids with our essential Egypt packing guide.",
    content: `
      <h2>How to pack for a trip to Egypt?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">When packing for Egypt, bring breathable cotton or linen clothing, a sturdy pair of walking shoes for desert terrain, a modest outfit for mosques, and a high-quality camera to capture the ancient wonders.</p>
      </div>
      <p>Egypt is a land of heat and dust. Light-colored, loose-fitting natural fabrics are your best friends. While coastal areas like Hurghada are casual, cities and historical sites require more modest attire. Use compression cubes to manage your layers for those cool desert nights.</p>
    `,
    faqs: [
      {
        question: "What should I wear to visit the Pyramids?",
        answer: "Wear comfortable, closed-toe walking shoes as the terrain is sandy and uneven. A lightweight long-sleeved shirt and a hat will protect you from the intense sun."
      }
    ]
  },
  "brazil-packing-guide": {
    title: "Brazil Packing Guide: Carnival to Coast",
    description: "Everything you need for Brazil. From the vibrant streets of Rio to the lush Amazon rainforest.",
    content: `
      <h2>What should I pack for a trip to Brazil?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For Brazil, pack vibrant but casual clothing, multiple swimsuits, reef-safe sunscreen, comfortable walking sandals, and a lightweight waterproof jacket if visiting the Amazon.</p>
      </div>
      <p>Brazil's energy is infectious. Pack clothes that are comfortable for exploration but also suitable for the country's lively social scene. If you're heading to the Amazon, specialized moisture-wicking gear and insect repellent are essential. Use <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to plan your bag for those domestic flights between Rio and Salvador.</p>
    `,
    faqs: [
      {
        question: "Is it safe to wear jewelry in Brazil?",
        answer: "It is generally recommended to leave expensive jewelry and watches at home. Stick to simple, low-key accessories to avoid attracting unwanted attention in crowded urban areas."
      }
    ]
  },
  "costa-rica-packing-guide": {
    title: "Costa Rica Packing Guide: Jungle to Coast",
    description: "Prepare for 'Pura Vida'. Everything you need to pack for Costa Rica's rainforests, volcanoes, and pristine beaches.",
    content: `
      <h2>How to pack for Costa Rica?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for Costa Rica, prioritize lightweight quick-dry clothing, sturdy hiking sandals (like Chacos or Tevas), reef-safe sunscreen, a high-quality raincoat, and plenty of insect repellent.</p>
      </div>
      <p>Costa Rica is a land of microclimates. While the beaches are hot and humid, the cloud forests of Monteverde can be cool and misty. The key is versatile, moisture-wicking layers. Use standard packing cubes to separate your muddy hiking gear from your clean dinner attire.</p>

      <h3>Rainy Season Essentials</h3>
      <p>If visiting during the 'green season' (May-November), a lightweight, breathable raincoat is non-negotiable. Don't bother with an umbrella; the tropical downpours are often accompanied by wind that makes them useless. A waterproof dry bag for your electronics is also a wise investment for boat tours and jungle treks.</p>
    `,
    faqs: [
      {
        question: "What kind of shoes are best for Costa Rica?",
        answer: "A pair of sturdy, waterproof hiking sandals is ideal for most activities. If you plan on serious trekking, bring lightweight trail runners. Avoid heavy leather boots as they take forever to dry in the humidity."
      },
      {
        question: "Do I need to bring my own snorkeling gear?",
        answer: "Most tours provide basic gear, but if you have a high-quality mask that fits you well, it's worth bringing to ensure the best experience at spots like Cahuita or Cano Island."
      }
    ]
  },
  "greece-packing-guide": {
    title: "Greece Packing Guide: Islands & Antiquities",
    description: "Pack for the Mediterranean dream. Essentials for exploring Athens, island hopping, and relaxing on Greek beaches.",
    content: `
      <h2>What should I pack for a trip to Greece?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For Greece, pack breathable linen clothing, stylish but supportive walking shoes for cobblestones, multiple swimsuits, high-SPF sunscreen, and a versatile light sweater for ferry rides and cool island evenings.</p>
      </div>
      <p>Greece involves a lot of walking on uneven surfaces and frequent transitions between ferries and islands. A capsule wardrobe of light-colored natural fabrics will keep you cool and stylish. Use compression packing cubes to manage your outfits and keep your bag manageable on steep island stairs.</p>

      <h3>Dressing for the Heat</h3>
      <p>The Greek sun is intense. A wide-brimmed hat and polarized sunglasses are essential. If visiting archaeological sites like the Acropolis, ensure your shoes have good grip, as the ancient marble can be surprisingly slippery when worn smooth by millions of feet.</p>
    `,
    faqs: [
      {
        question: "What is the best luggage for Greek island hopping?",
        answer: "A sturdy travel backpack or a small, high-quality four-wheel spinner is best. Large, heavy suitcases are difficult to manage on ferries and when navigating the narrow, hilly streets of islands like Santorini."
      }
    ]
  },
  "vietnam-packing-guide": {
    title: "Vietnam Packing Guide: North to South",
    description: "Navigate Vietnam with ease. What to pack for bustling cities, rural highlands, and stunning coastlines.",
    content: `
      <h2>How to pack for a trip to Vietnam?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for Vietnam, bring lightweight moisture-wicking layers, a modest outfit for temples, comfortable walking shoes, a universal power adapter, and a lightweight raincoat for sudden tropical showers.</p>
      </div>
      <p>Vietnam spans a huge latitude, meaning the weather in Hanoi can be vastly different from Ho Chi Minh City. Layers are your best friend. In the north, especially during winter, you'll want a light jacket, while the south remains tropical year-round. Use <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to optimize your bag for the many domestic flights or train journeys you'll likely take.</p>
    `,
    faqs: [
      {
        question: "Should I pack a lot of warm clothes for Vietnam?",
        answer: "Only if you are visiting Northern Vietnam (Hanoi, Sapa) between December and February, when temperatures can drop significantly. For the rest of the country and other times of year, lightweight clothing is sufficient."
      }
    ]
  },
  "paris-packing-guide": {
    title: "Paris Packing Guide: Chic & Comfortable",
    description: "Master Parisian style and stay comfortable with our comprehensive Paris packing guide. Tips for all seasons.",
    content: `
      <h2>How to pack for a trip to Paris?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">When packing for Paris, prioritize elegant neutral-toned layers, stylish but broken-in walking shoes, a versatile trench coat, and a secure cross-body bag for city exploration.</p>
      </div>
      <p>Parisian style is all about effortless elegance. Focus on a capsule wardrobe of high-quality basics that you can easily mix and match. You'll be doing a lot of walking, so comfortable shoes are essential, but avoid bulky athletic sneakers if you want to blend in. Use compression cubes to fit your stylish layers into a carry-on. Read our <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">Paris baggage guide</a> to stay light.</p>
    `,
    faqs: [
      {
        question: "What is the best footwear for Paris?",
        answer: "Opt for clean, stylish fashion sneakers or high-quality loafers. Avoid high heels due to cobblestones and choose waterproof options if visiting during the rainy season."
      }
    ]
  },
  "london-packing-guide": {
    title: "London Packing Guide: Ready for Rain or Shine",
    description: "Navigate London's unpredictable weather with our essential packing guide. Layers, style, and travel tips.",
    content: `
      <h2>What are the essentials for packing for London?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for London, prioritize a high-quality compact umbrella, a versatile raincoat, moisture-wicking layers, comfortable walking boots, and an Oyster card or contactless payment method.</p>
      </div>
      <p>London weather is famously fickle. The key is versatile layering and being prepared for rain at any moment. Choose a stylish but practical coat and comfortable shoes for exploring the city's diverse neighborhoods. Use standard packing cubes to organize your layers and keep your bag tidy during transit.</p>
    `,
    faqs: [
      {
        question: "Do I need a lot of formal clothes for London?",
        answer: "Most of London is quite casual, but some restaurants and theaters have a 'smart casual' dress code. A nice pair of trousers and a collared shirt or an elegant dress are sufficient."
      }
    ]
  },
  "new-york-packing-guide": {
    title: "New York Packing Guide: The Big Apple",
    description: "Conquer NYC with our comprehensive packing guide. From Manhattan museums to Brooklyn brunches, stay prepared and stylish.",
    content: `
      <h2>How to pack for a trip to New York City?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">When packing for NYC, prioritize versatile urban attire, comfortable walking shoes, a robust power bank, a reusable water bottle, and a secure daypack for city exploration.</p>
      </div>
      <p>New York is a city that never stops, and your packing should reflect that. You'll be doing an incredible amount of walking, so supportive footwear is non-negotiable. Plan your outfits to be versatile enough to transition from a daytime museum visit to a Broadway show. Use <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to ensure your urban gear fits perfectly in your suitcase.</p>
    `,
    faqs: [
      {
        question: "What is the best way to carry my belongings in NYC?",
        answer: "A secure cross-body bag or a small, lightweight backpack is ideal. Keep your valuables in zipped compartments and be mindful of your surroundings in crowded areas like Times Square."
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

export default async function DestinationPage({ params }: PageProps) {
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
        <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-3">Destination Guide</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight mb-4">
          {page.title}
        </h1>
        <div className="text-muted-foreground text-xs mb-4 italic">Last updated: July 13, 2026</div>
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
        <p className="text-muted-foreground mb-6">Plan your exact luggage arrangement for this destination with our free tool.</p>
        <Link href="/simulator">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
            Try the Visual Simulator
          </Button>
        </Link>
      </div>

      <RelatedPages currentSlug={resolvedParams.slug} currentCluster="destinations" />
    </article>
  );
}