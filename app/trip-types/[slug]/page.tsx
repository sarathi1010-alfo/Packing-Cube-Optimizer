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
  "backpacking-europe": {
    title: "Backpacking Europe Packing Guide",
    description: "The ultimate packing guide for backpacking across Europe, featuring lightweight essentials, capsule wardrobes, and packing cube optimization strategies.",
    content: `
      <h2>How to pack for backpacking in Europe?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for backpacking in Europe, prioritize a lightweight 40L travel backpack, use compression packing cubes for space efficiency, build a capsule wardrobe with versatile, quick-dry fabrics, and rely on our tool to simulate your pack layout.</p>
      </div>
      <p>Backpacking Europe requires a strategic approach to packing to avoid dragging a heavy suitcase across cobblestone streets. Opt for a carry-on size backpack to save on budget airline fees and maximize mobility. Pack layerable clothing, comfortable walking shoes, and use packing cubes to compartmentalize your gear. See our guide on <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">how to pack efficiently to avoid overweight baggage fees</a> for more expert tips.</p>

      <h3>Essential Gear for European Hostels</h3>
      <p>When staying in hostels, certain items become indispensable. A quick-dry microfiber towel saves space and dries overnight. High-quality earplugs and an eye mask are non-negotiable for shared dorms. Additionally, a small padlock for your locker ensures your valuables stay secure while you explore the city.</p>

      <h3>The Capsule Wardrobe Strategy</h3>
      <p>Select 3-4 tops and 2-3 bottoms that all match each other. Stick to neutral colors and breathable fabrics like merino wool, which resists odors and dries quickly. This allows you to create over a dozen different outfits from just a handful of items, significantly reducing the weight of your pack.</p>

      <h3>Recommended Packing Cube Configuration</h3>
      <div class="overflow-x-auto my-6">
        <table class="min-w-full divide-y divide-brand-beige border border-brand-beige rounded-lg overflow-hidden">
          <thead class="bg-brand-sand/50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy uppercase tracking-wider">Cube Size</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy uppercase tracking-wider">Contents</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-brand-navy uppercase tracking-wider">Strategy</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-brand-beige">
            <tr>
              <td class="px-4 py-3 text-sm text-foreground font-medium">Large Compression</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">Jeans, Jacket, Sweaters</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">Max compression for bulky items</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm text-foreground font-medium">Medium Standard</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">T-shirts, Blouses, Dresses</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">Roll items vertically (file-style)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-sm text-foreground font-medium">Small Tube Cube</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">Socks, Underwear, Swimwear</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">Stuff into corners of the backpack</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    faqs: [
      {
        question: "What size backpack is best for Europe?",
        answer: "A 40L to 45L travel backpack is generally considered the best size. It fits most airline carry-on limits and is manageable to carry for extended periods."
      },
      {
        question: "Do I need packing cubes for backpacking?",
        answer: "Yes, packing cubes are essential for backpacking. They keep your backpack organized, compress clothing to save space, and make finding specific items much easier without unpacking everything."
      },
      {
        question: "How do I avoid pickpockets in European cities?",
        answer: "Use a money belt or a secure cross-body bag. Be particularly vigilant in crowded areas like metro stations and major tourist landmarks. Avoid keeping your phone or wallet in your back pocket."
      }
    ]
  },
  "family-vacation": {
    title: "Family Vacation Packing Guide",
    description: "Expert tips for packing when traveling with kids. How to organize multiple people in a single bag and ensure you have all the essentials.",
    content: `
      <h2>How to pack for a family vacation?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Pack for a family vacation by using color-coded packing cubes for each child, prioritizing a dedicated 'essentials bag' for mid-flight needs, and utilizing the 5-4-3-2-1 rule to keep clothing volume manageable for everyone.</p>
      </div>
      <p>Family travel can be chaotic, but your packing doesn't have to be. The secret is compartmentalization. Assign each family member a specific color of packing cube. This makes it instantly clear whose clothes are whose when you arrive at your destination.</p>
    `,
    faqs: [
      {
        question: "How do I minimize luggage when traveling with kids?",
        answer: "Pack versatile layers and plan for laundry. You don't need a fresh outfit for every day if you can do a quick wash. Focus on multi-purpose items and share toiletries where possible."
      }
    ]
  },
  "solo-travel": {
    title: "Solo Travel Packing Guide",
    description: "The ultimate guide for solo travelers focusing on safety gear, minimalist packing, and keeping your valuables secure.",
    content: `
      <h2>What are the solo travel packing essentials?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Solo travelers should prioritize a portable door lock for security, a lightweight power bank, a paper backup of important documents, and a minimalist capsule wardrobe organized in compression cubes for maximum mobility.</p>
      </div>
      <p>When you're on your own, you have to be your own backup. Packing light is a safety feature—it allows you to move quickly and keep your hands free. Use compression cubes to keep your pack small and manageable.</p>
    `,
    faqs: [
      {
        question: "Is it safe to travel solo with just a carry-on?",
        answer: "Yes, it's actually safer. You never have to leave your bag unattended at a carousel, and you can easily keep your eyes on all your belongings at all times."
      }
    ]
  },
  "beach-vacation": {
    title: "Beach Vacation Packing Guide",
    description: "Everything you need to pack for a perfect beach vacation, from swimwear and sun protection to evening resort wear.",
    content: `
      <h2>What should you pack for a beach vacation?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For a beach vacation, pack multiple swimsuits, lightweight cover-ups, reef-safe sunscreen, a packable sun hat, polarized sunglasses, and breathable evening wear, organized using medium standard packing cubes.</p>
      </div>
      <p>Packing for the beach is all about lightweight fabrics and sun protection. Roll your beachwear and use standard packing cubes. Don't forget a dedicated wet bag or water-resistant cube for damp swimsuits on your journey home.</p>
    `,
    faqs: [
      {
        question: "How many swimsuits should I pack?",
        answer: "For a typical week-long beach vacation, packing 2 to 3 swimsuits is ideal so you always have a dry one to wear."
      }
    ]
  },
  "business-trip": {
    title: "Business Trip Packing Guide",
    description: "Streamline your business travel packing with tips on keeping suits wrinkle-free, organizing tech accessories, and traveling carry-on only.",
    content: `
      <h2>How to pack efficiently for a business trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Efficient business trip packing involves using a garment folder for dress shirts, a tube cube for ties and belts, a dedicated tech organizer for chargers, and prioritizing a carry-on to skip the baggage carousel.</p>
      </div>
      <p>Business travel demands efficiency. Utilize structured packing cubes to keep professional attire wrinkle-free. Always pack your essential tech and documents in an easily accessible personal item.</p>
    `,
    faqs: [
      {
        question: "How do I pack a suit without wrinkling it?",
        answer: "Use a dedicated garment folder or the 'roll and fold' method. Place the suit jacket in a dry-cleaning bag before folding to reduce friction and wrinkles."
      }
    ]
  },
  "winter-ski-trip": {
    title: "Winter Ski Trip Packing Guide",
    description: "Master the art of packing bulky winter gear and ski clothing without paying oversized baggage fees.",
    content: `
      <h2>How to pack bulky gear for a winter ski trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for a ski trip, use large compression cubes for bulky base layers and sweaters, rent heavy gear at the destination if possible, and wear your bulkiest winter coat on the plane.</p>
      </div>
      <p>Winter trips are notoriously difficult to pack for due to the sheer volume of the clothing. Compression packing cubes are absolutely mandatory here to squeeze the air out of fleeces and base layers.</p>
    `,
    faqs: [
      {
        question: "Should I rent or bring my own ski gear?",
        answer: "If you ski infrequently, renting skis and boots at the resort saves massive baggage fees and hassle. Always bring your own well-fitting base layers and goggles."
      }
    ]
  },
  "digital-nomad-japan": {
    title: "Digital Nomad Japan Packing Guide",
    description: "The ultimate packing list for digital nomads heading to Japan. Balance professional gear with lightweight travel essentials.",
    content: `
      <h2>How to pack for Japan as a digital nomad?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Digital nomads in Japan should pack a reliable universal adapter, a portable Wi-Fi device or eSIM, a minimalist capsule wardrobe for urban environments, and high-quality tech organizers for cables and peripherals.</p>
      </div>
      <p>Japan is a dream destination for digital nomads, offering high-speed internet and incredible co-working spaces. However, the urban environment requires a smart, professional appearance. Pack a capsule wardrobe that transitions from a cafe to a business meeting. Use <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to ensure your tech gear and clothing fit perfectly in a single carry-on.</p>
      <h3>Tech Essentials for Japan</h3>
      <p>Don't forget a robust power bank, as navigating Tokyo's transit system can drain your phone battery quickly. A portable laptop stand and noise-canceling headphones are also vital for staying productive in busy environments.</p>
    `,
    faqs: [
      {
        question: "Is Japan friendly for remote workers?",
        answer: "Yes, Japan has excellent infrastructure, safe public spaces, and an increasing number of nomad-friendly cafes and co-working offices."
      }
    ]
  },
  "luxury-safari": {
    title: "Luxury Safari Packing Guide",
    description: "What to pack for a high-end safari. Practical clothing, essential gear, and how to stay within small plane weight limits.",
    content: `
      <h2>What are the essentials for a luxury safari?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For a luxury safari, pack lightweight, neutral-colored layers, high-quality binoculars, reef-safe sunscreen, and a wide-brimmed hat. Use compression cubes to fit everything into soft-sided luggage required for bush flights.</p>
      </div>
      <p>Safaris often involve small bush planes with very strict weight and luggage type restrictions (usually soft-sided bags only). Efficiency is key. See our guide on <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">avoiding baggage fees</a> to master lightweight packing.</p>
    `,
    faqs: [
      {
        question: "Why do safari bags need to be soft-sided?",
        answer: "Bush planes have small, irregularly shaped cargo holds that cannot accommodate hard-shell suitcases. Soft bags can be squeezed into the available space."
      }
    ]
  },
  "minimalist-trekking": {
    title: "Minimalist Trekking Packing Guide",
    description: "Go further with less. The definitive guide to minimalist trekking gear and packing strategies.",
    content: `
      <h2>How to pack for a minimalist trekking trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Minimalist trekking requires prioritizing multi-functional gear, ultralight synthetic fabrics, a compact first-aid kit, and an efficient weight distribution strategy inside a high-quality trekking pack.</p>
      </div>
      <p>When you're carrying everything on your back, every gram matters. Focus on high-performance materials like merino wool and silnylon. Use our <a href="/" class="text-brand-orange underline font-semibold">visual simulator</a> to plan your pack's center of gravity.</p>
    `,
    faqs: [
      {
        question: "How do I reduce my pack weight for trekking?",
        answer: "Audit every item. If it doesn't serve multiple purposes or isn't vital for safety, leave it behind. Opt for the lightest version of essential gear like tents and sleeping bags."
      }
    ]
  },
  "camping-hiking": {
    title: "Camping & Hiking Packing Guide",
    description: "Essential packing strategies for camping and hiking trips, focusing on ultralight gear and weatherproof clothing.",
    content: `
      <h2>What are the packing essentials for camping and hiking?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For camping and hiking, prioritize moisture-wicking layers, a reliable waterproof shell, sturdy footwear, a first-aid kit, and use ultralight dry sacks or weather-resistant cubes for organization.</p>
      </div>
      <p>When heading into the outdoors, every ounce matters. Focus on synthetic or merino wool layers that dry quickly and resist odors.</p>
    `,
    faqs: [
      {
        question: "How do I organize my hiking backpack?",
        answer: "Place heavy items like food and water close to your back and centered. Use colored packing cubes or dry bags to separate camp clothes, trail clothes, and sleeping gear."
      }
    ]
  },
  "7-day-trip": {
    title: "7-Day Trip Packing Guide",
    description: "The definitive guide for packing for a full week in a carry-on. Master the 5-4-3-2-1 rule and spatial optimization.",
    content: `
      <h2>How to pack for a 7-day trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for a 7-day trip in a carry-on, use the 5-4-3-2-1 rule: 5 sets of socks/underwear, 4 tops, 3 bottoms, 2 pairs of shoes, and 1 hat/accessory. Organize these in one large compression cube and two medium standard cubes.</p>
      </div>
      <p>A week-long trip is the sweet spot for carry-on travel. It's long enough to require variety, but short enough that you don't need to overpack. The key is coordinating your capsule wardrobe so every piece works with at least two others.</p>
    `,
    faqs: [
      {
        question: "Can I fit 7 days of clothes in a carry-on?",
        answer: "Absolutely. By using the rolling method and compression packing cubes, you can easily fit a week's worth of clothing into a standard 40L carry-on bag."
      }
    ]
  },
  "weekend-getaway": {
    title: "Weekend Getaway Packing List",
    description: "Pack light and fast for your next weekend escape. Minimalist tips for 2-3 day trips.",
    content: `
      <h2>What should I pack for a weekend getaway?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For a weekend getaway, focus on one versatile outfit per day plus one dressier option for evening. Use two small packing cubes to keep your personal item or small duffel organized and lightweight.</p>
      </div>
      <p>Weekend trips are about spontaneity and speed. Don't let heavy luggage slow you down. A small backpack or weekend duffel is all you need if you pack modularly.</p>
    `,
    faqs: [
      {
        question: "What is the best bag for a weekend trip?",
        answer: "A 20L to 30L backpack or a structured duffel bag is perfect for a 2-3 day trip. It's easy to carry and fits under the seat of most airplanes."
      }
    ]
  },
  "honeymoon-maldives": {
    title: "Honeymoon Maldives Packing Guide",
    description: "Pack for paradise. The ultimate honeymoon packing list for the Maldives, from sunset dinners to snorkeling adventures.",
    content: `
      <h2>How to pack for a Maldives honeymoon?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For a Maldives honeymoon, pack lightweight resort wear, multiple swimsuits, reef-safe sunscreen, and elegant evening attire. Use standard packing cubes to organize your luxury items and keep them wrinkle-free.</p>
      </div>
      <p>The Maldives is the epitome of tropical luxury. Your packing should reflect a mix of relaxation and elegance. Focus on breathable fabrics like linen and silk. Since most resorts are on private islands, you'll want to ensure you have everything you need before you arrive.</p>
      <h3>Island Essentials</h3>
      <p>Don't forget high-quality polarized sunglasses and a wide-brimmed hat to protect yourself from the intense equatorial sun. A waterproof dry bag is also essential for boat transfers and snorkeling trips.</p>
    `,
    faqs: [
      {
        question: "Do I need dressy clothes for a Maldives resort?",
        answer: "Most high-end resorts have a 'smart casual' dress code for dinner. Think linen trousers and collared shirts for men, and sundresses or elegant separates for women."
      }
    ]
  },
  "music-festival-guide": {
    title: "Music Festival Packing Guide: Survival & Style",
    description: "Don't just survive the festival—thrive! The ultimate packing list for music festivals, focusing on comfort, hydration, and essentials.",
    content: `
      <h2>What are the music festival packing essentials?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For a music festival, prioritize comfortable footwear, a hydration pack, sun protection, portable chargers, and weather-appropriate layers. Use color-coded packing cubes to keep your gear organized in a crowded tent or van.</p>
      </div>
      <p>Festival packing is a balancing act between style and utility. You'll be on your feet for hours, often in unpredictable weather. Plan your outfits in advance and use our <a href="/" class="text-brand-orange underline font-semibold">visual simulator</a> to ensure your hydration pack and essentials fit perfectly in your daypack.</p>
      <h3>Festival Hygiene Tips</h3>
      <p>Pack a dedicated 'hygiene cube' with wet wipes, hand sanitizer, and dry shampoo. Staying fresh in a festival environment significantly improves your overall experience.</p>
    `,
    faqs: [
      {
        question: "What is the best footwear for a music festival?",
        answer: "Broken-in boots or supportive sneakers are best. Avoid brand-new shoes or flip-flops, as you'll be walking and standing on varied terrain all day."
      }
    ]
  },
  "photography-expedition": {
    title: "Photography Expedition Packing Guide",
    description: "Protect your gear and capture the shot. The essential packing guide for photography-focused travel.",
    content: `
      <h2>How to pack for a photography expedition?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">Photography expeditions require a dedicated tech organizer for cables, padded inserts for camera bodies and lenses, extra batteries, and a rugged, weather-resistant backpack. Use our tool to balance the weight of your gear.</p>
      </div>
      <p>When traveling for photography, your gear is your priority. Distributing the weight of heavy lenses and tripods is crucial for long days of shooting. Use <a href="/" class="text-brand-orange underline font-semibold">PackFit</a> to ensure your camera bag remains balanced and within carry-on limits.</p>
    `,
    faqs: [
      {
        question: "How do I protect my camera gear while traveling?",
        answer: "Use padded camera cubes or inserts that fit securely inside your backpack. Always carry your most expensive gear (bodies and lenses) in your carry-on, never in checked luggage."
      }
    ]
  },
  "scuba-diving-trip": {
    title: "Scuba Diving Trip Packing Guide",
    description: "Pack for the deep. Essential strategies for transporting dive gear, protective layers, and tropical essentials safely.",
    content: `
      <h2>How to pack for a scuba diving trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for a scuba trip, prioritize protecting your dive computer and regulator in your carry-on, use mesh bags for wet gear, and optimize heavy fin placement at the bottom of your bag near the wheels.</p>
      </div>
      <p>Scuba diving trips present a unique challenge: heavy, bulky, and often expensive equipment. The key is separating your life-support gear (regulators, computers) from your auxiliary gear (fins, wetsuits). Always carry your most sensitive electronics in your personal item or carry-on. See our guide on <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">avoiding overweight fees</a> to manage the weight of your dive kit.</p>

      <h3>Regulator and Computer Care</h3>
      <p>Never check your regulator or dive computer. These are delicate instruments that can be damaged by the rough handling of checked luggage. Use a padded regulator bag and keep it with you in the cabin. This ensures that even if your checked bag is delayed, you still have your most critical (and personal) pieces of gear.</p>
    `,
    faqs: [
      {
        question: "Should I bring my own BCD and fins?",
        answer: "If you are a frequent diver, bringing your own BCD ensures comfort and familiarity. However, if you are trying to travel light, fins are often the easiest item to rent at your destination to save significant weight and space."
      },
      {
        question: "How do I pack a wet wetsuit for the flight home?",
        answer: "Use a dedicated waterproof dry bag or a TPU-coated packing cube. Try to dry your gear for at least 24 hours before your flight to minimize weight and prevent mildew."
      }
    ]
  },
  "yoga-retreat": {
    title: "Yoga Retreat Packing Guide",
    description: "Find your zen with a perfectly organized bag. What to pack for a yoga retreat, from sustainable activewear to mindfulness essentials.",
    content: `
      <h2>What should I pack for a yoga retreat?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">For a yoga retreat, pack 3-4 sets of moisture-wicking yoga gear, a travel-sized mat or mat towel, a reusable water bottle, and comfortable loungewear for meditation and workshops.</p>
      </div>
      <p>Yoga retreats are about stripping away the noise, and your packing should reflect that. Focus on a minimalist capsule wardrobe of high-quality, breathable fabrics. Use standard packing cubes to organize your practice gear separately from your evening loungewear.</p>

      <h3>The Travel Mat Solution</h3>
      <p>If you prefer your own mat, invest in an ultra-thin travel version that can be folded or rolled tightly. Alternatively, a high-quality mat towel can be used over a rented mat at the retreat center, providing a hygienic and familiar surface while taking up minimal space in your bag.</p>
    `,
    faqs: [
      {
        question: "How many yoga outfits do I need for a week?",
        answer: "3 to 4 sets are usually sufficient if the retreat has laundry facilities. Choose moisture-wicking fabrics that dry quickly if you need to do a quick sink-wash."
      }
    ]
  },
  "golf-trip": {
    title: "Golf Trip Packing Guide",
    description: "Hit the links without the hassle. How to pack golf clubs, specialized apparel, and accessories for a perfect golf getaway.",
    content: `
      <h2>How to pack for a golf trip?</h2>
      <div class="ai-snapshot bg-brand-sand/30 border-l-4 border-brand-orange p-4 my-6 rounded-r-lg">
        <p class="font-medium text-brand-navy m-0">To pack for a golf trip, use a high-quality travel cover for your clubs, protect club heads with a 'Stiff Arm' or extra padding, and pack your golf shoes in a dedicated bag to protect your clothing.</p>
      </div>
      <p>A golf trip requires careful coordination of bulky gear and specific dress codes. Use a hard-sided or high-end soft-sided travel bag for your clubs. To save space, you can often tuck extra towels or even some clothing around your clubs for added protection. Read our <a href="/blog/avoid-overweight-baggage-fees" class="text-brand-orange underline font-semibold">overweight baggage guide</a> to stay within airline limits for heavy golf bags.</p>
    `,
    faqs: [
      {
        question: "How do I prevent my driver from breaking during flight?",
        answer: "Remove the head from your adjustable driver and pack it in its headcover inside your carry-on. Place the shaft back in the bag with the other clubs and use a 'Stiff Arm' to provide vertical protection against impacts."
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

export default async function TripTypePage({ params }: PageProps) {
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
        <div className="text-brand-orange font-semibold text-sm tracking-wider uppercase mb-3">Trip Type Guide</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight mb-4">
          {page.title}
        </h1>
        <div className="text-muted-foreground text-xs mb-4 italic">Last updated: July 12, 2026</div>
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
        <p className="text-muted-foreground mb-6">Plan your exact luggage arrangement for this trip type with our free tool.</p>
        <Link href="/simulator">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8">
            Try the Visual Simulator
          </Button>
        </Link>
      </div>

      <RelatedPages currentSlug={resolvedParams.slug} currentCluster="trip-types" />
    </article>
  );
}
