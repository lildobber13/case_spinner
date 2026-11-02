/* ------------------------------------------------------------------
   CASE DATA  (edit me!)
   Everything the generator can roll lives in this file.
   To add an industry, copy one block below and change the text.
   All clients and people are fictional.
------------------------------------------------------------------- */
window.CASE_DATA = {

  industries: [
    {
      name: "Healthcare", icon: "🏥",
      clients: [
        { n: "Northbeam Family Clinics", d: "12 outpatient clinics across two counties" },
        { n: "Saint Aurelia Medical Center", d: "a 420-bed community hospital" },
        { n: "Pinewell Urgent Care", d: "a fast-growing chain of walk-in clinics" }
      ],
      cases: [
        { p: "Patients wait too long and nobody can tell them why", u: "Patients and families", m: "Cut average wait time by 25%" },
        { p: "Discharge instructions are confusing, so patients call back with the same questions", u: "Patients and families", m: "Drop repeat discharge calls by 40%" },
        { p: "Referral requests get lost between departments", u: "Care coordinators", m: "Cut referral turnaround from 2 weeks to 3 days" },
        { p: "Staff spend more time on paperwork than on patients", u: "Charge nurses", m: "Save each nurse 30 minutes per shift" },
        { p: "No-shows leave empty appointment slots every single day", u: "Front desk coordinators", m: "Reduce no-shows by 20%" }
      ],
      constraints: [
        "Must be usable one-handed while walking",
        "Everything must read at a 6th-grade level",
        "Staff will give it 20 seconds of attention, max"
      ]
    },
    {
      name: "Higher Education", icon: "🎓",
      clients: [
        { n: "Lakeshore State University", d: "a 30,000-student public university" },
        { n: "Redwood Community College", d: "a commuter college with three campuses" },
        { n: "Halden Institute of Technology", d: "a small, research-heavy engineering school" }
      ],
      cases: [
        { p: "Students miss deadlines buried across five different portals", u: "First-year students", m: "Raise first-year retention by 5 points" },
        { p: "Advisors can't spot at-risk students until it's too late", u: "Academic advisors", m: "Flag at-risk students 3 weeks earlier" },
        { p: "Financial aid questions flood a three-person office", u: "Financial aid staff", m: "Answer half of aid questions without staff" },
        { p: "Students can't tell which courses actually count toward their degree", u: "First-year students", m: "Cut routine advising visits by 40%" },
        { p: "Campus events and opportunities are scattered, so most students never find them", u: "First-year students", m: "Lift event attendance by 30%" }
      ],
      constraints: [
        "Must work on phones and locked-down lab computers",
        "Must pass basic accessibility checks (keyboard and screen reader)",
        "Students will only use it if it takes under a minute"
      ]
    },
    {
      name: "Retail", icon: "🛍️",
      clients: [
        { n: "Hartwell & Co. Home Goods", d: "a 60-store home goods chain" },
        { n: "Juniper Street Outfitters", d: "a regional outdoor apparel retailer" },
        { n: "FreshCart Grocers", d: "a neighborhood grocery brand with 25 stores" }
      ],
      cases: [
        { p: "Associates can't check stock without leaving the customer", u: "Store associates", m: "Reduce out-of-stock lost sales by 20%" },
        { p: "Returns are slow and handled differently in every store", u: "Store associates", m: "Cut returns handling time by 40%" },
        { p: "Managers drown in end-of-day reports", u: "Store managers", m: "Save each manager 5 hours a week" },
        { p: "Seasonal hires take weeks to become productive", u: "Store managers", m: "Get new hires productive in 3 days instead of 3 weeks" },
        { p: "Product recommendations ignore what customers already bought", u: "Online shoppers", m: "Raise add-on sales by 15%" }
      ],
      constraints: [
        "Floor staff only have a phone, no desktop",
        "No budget for new hardware",
        "Staff get one shift of training, so it must be self-explanatory"
      ]
    },
    {
      name: "Banking & Credit Unions", icon: "🏦",
      clients: [
        { n: "Cobalt Ridge Credit Union", d: "a member-owned credit union with 90,000 members" },
        { n: "Mercer Bank & Trust", d: "a community bank with 18 branches" },
        { n: "Evergreen Savings Co-op", d: "a small co-op focused on first-time homebuyers" }
      ],
      cases: [
        { p: "Loan applications stall because documents are missing", u: "Loan officers", m: "Cut loan decision time from 10 days to 4" },
        { p: "Members call with the same ten questions all day", u: "Members and customers", m: "Deflect 35% of routine calls" },
        { p: "Fraud alerts overwhelm the review team", u: "Compliance analysts", m: "Reduce false fraud alerts by 30%" },
        { p: "Customers can't tell which product fits them", u: "Members and customers", m: "Raise new-product sign-ups by 15%" },
        { p: "Compliance reports are assembled by hand every month", u: "Compliance analysts", m: "Save compliance 20 hours a month" }
      ],
      constraints: [
        "Every recommendation needs a plain-English explanation",
        "It must never sound like legal or financial advice",
        "Staff must be able to override every AI suggestion"
      ]
    },
    {
      name: "Manufacturing", icon: "🏭",
      clients: [
        { n: "Brightforge Components", d: "a metal parts supplier with 400 employees" },
        { n: "Delta Ridge Plastics", d: "a high-volume injection molding plant" },
        { n: "Ironvale Automotive Parts", d: "a tier-2 supplier to major carmakers" }
      ],
      cases: [
        { p: "Machines break down with no warning", u: "Maintenance technicians", m: "Cut unplanned downtime by 30%" },
        { p: "Defects are caught late, so whole batches get scrapped", u: "Quality inspectors", m: "Drop the scrap rate by 20%" },
        { p: "Shift handoffs lose critical information", u: "Shift supervisors", m: "Cut repeat issues at shift start by 50%" },
        { p: "Safety near-misses are reported on paper, if at all", u: "Line operators", m: "Double the number of near-miss reports" },
        { p: "New operators learn procedures from whoever is standing nearby", u: "Line operators", m: "Train new operators in half the time" }
      ],
      constraints: [
        "Users wear gloves, so big buttons only",
        "Factory Wi-Fi is unreliable, so it must tolerate going offline",
        "Instructions must be readable at arm's length on a tablet"
      ]
    },
    {
      name: "Logistics & Supply Chain", icon: "🚚",
      clients: [
        { n: "Tallgrass Freight", d: "a regional trucking company with 300 drivers" },
        { n: "Harbor & Vine Distribution", d: "a food and beverage distributor" },
        { n: "SwiftLane Couriers", d: "a same-day delivery startup" }
      ],
      cases: [
        { p: "Customers keep asking where their package is", u: "Customer service reps", m: "Cut where-is-my-order calls by 50%" },
        { p: "Routes are planned by hand and ignore real-world delays", u: "Dispatchers", m: "Improve on-time delivery to 96%" },
        { p: "Warehouse pickers walk miles to fill a single order", u: "Warehouse pickers", m: "Reduce picker walking time by 25%" },
        { p: "Proof-of-delivery paperwork is lost or late", u: "Drivers", m: "Get 98% of delivery records submitted the same day" },
        { p: "Damaged shipments are discovered too late to fix", u: "Customer service reps", m: "Resolve damage claims in 2 days instead of 2 weeks" }
      ],
      constraints: [
        "Drivers can only interact for about 10 seconds at a time",
        "Must cope with poor cell signal",
        "Every status update must be understandable by customers, no jargon"
      ]
    },
    {
      name: "Insurance", icon: "🛡️",
      clients: [
        { n: "Beacon Mutual Insurance", d: "a mutual insurer covering homes and cars" },
        { n: "Clearwater Auto & Home", d: "a fast-growing digital-first insurer" },
        { n: "Stonebridge Life", d: "a life and health insurer with a large agent network" }
      ],
      cases: [
        { p: "Claims drag on for weeks because details are missing or scattered", u: "Claims adjusters", m: "Cut claim cycle time by 35%" },
        { p: "Policyholders can't tell where their claim stands", u: "Policyholders", m: "Raise post-claim satisfaction by 20 points" },
        { p: "Underwriters re-key the same info from emails and PDFs", u: "Underwriters", m: "Reduce re-keying time by 60%" },
        { p: "Agents struggle to explain what a policy actually covers", u: "Insurance agents", m: "Cut policy-explanation callbacks by 40%" },
        { p: "Suspicious claims blend in with the legitimate ones", u: "Claims adjusters", m: "Flag 25% more suspicious claims for review" }
      ],
      constraints: [
        "Customers are often stressed, so the tone must be calm and clear",
        "Every decision needs a visible audit trail",
        "Must handle messy, incomplete input gracefully"
      ]
    },
    {
      name: "K-12 Schools", icon: "🏫",
      clients: [
        { n: "Maple Grove School District", d: "a district with 14 schools" },
        { n: "Riverbend Charter Academy", d: "a charter school focused on project-based learning" },
        { n: "Oakhurst Elementary", d: "a lively elementary school with 500 students" }
      ],
      cases: [
        { p: "Teachers spend their evenings on grading and paperwork", u: "Teachers", m: "Give teachers back 3 hours a week" },
        { p: "Parents miss important school updates", u: "Parents and guardians", m: "Raise parent engagement by 40%" },
        { p: "Struggling students are noticed too late", u: "Teachers", m: "Identify struggling students 4 weeks earlier" },
        { p: "Substitute teachers get no useful lesson information", u: "Substitute teachers", m: "Cut substitute prep time to 5 minutes" },
        { p: "Families who speak other languages are left out of communication", u: "Parents and guardians", m: "Reach 95% of families in their home language" }
      ],
      constraints: [
        "Students under 13 are involved, so collect no personal data, ever",
        "Must run on school Chromebooks",
        "Teachers have zero time to learn a new tool"
      ]
    },
    {
      name: "Local Government", icon: "🏛️",
      clients: [
        { n: "City of Fernhaven", d: "a mid-size city of 140,000 residents" },
        { n: "Marlow County Public Services", d: "a county serving rural and suburban areas" },
        { n: "Bayside Transit Authority", d: "a regional bus and rail agency" }
      ],
      cases: [
        { p: "Permit applications bounce back again and again for missing info", u: "Residents", m: "Reduce permit rework by 50%" },
        { p: "Residents don't know which office handles their issue", u: "Residents", m: "Route 90% of requests to the right office on the first try" },
        { p: "311 requests pile up without being sorted", u: "Caseworkers", m: "Clear the 311 backlog 40% faster" },
        { p: "Public records requests take months", u: "Records clerks", m: "Cut records response time to 10 days" },
        { p: "Meeting minutes and decisions are impossible to search", u: "Residents", m: "Let residents find any decision in under a minute" }
      ],
      constraints: [
        "Must be accessible to everyone, since it serves everyone",
        "Plain language only, no jargon",
        "Must be nearly free to run, because it is taxpayer funded"
      ]
    },
    {
      name: "Hospitality & Travel", icon: "🏨",
      clients: [
        { n: "Lumen Hotel Group", d: "a boutique hotel group with 9 properties" },
        { n: "Driftwood Resorts", d: "a seasonal lakeside resort" },
        { n: "Compass Rail Tours", d: "a company running scenic multi-day rail trips" }
      ],
      cases: [
        { p: "Check-in lines are long at peak times", u: "Guests", m: "Cut check-in time in half" },
        { p: "Housekeeping and the front desk disagree on which rooms are ready", u: "Front desk agents", m: "Reduce room-ready delays by 40%" },
        { p: "Guests have questions at 2 a.m. and nobody answers", u: "Guests", m: "Answer 70% of after-hours questions instantly" },
        { p: "Reviews pile up unread", u: "Hotel managers", m: "Raise the guest review score by 0.5 stars" },
        { p: "Upsell offers feel generic and annoying", u: "Guests", m: "Increase add-on revenue by 15%" }
      ],
      constraints: [
        "Must feel warm and personal, never robotic",
        "Must work in three languages",
        "Guests will not install anything"
      ]
    },
    {
      name: "Nonprofit & Community", icon: "🤝",
      clients: [
        { n: "Open Hands Food Bank", d: "a food bank serving 8,000 families a month" },
        { n: "Brightpath Youth Mentoring", d: "a mentoring program run by 6 staff and 200 volunteers" },
        { n: "Greenway Land Trust", d: "a conservation group protecting local green space" }
      ],
      cases: [
        { p: "Volunteers sign up but don't show up", u: "Volunteer coordinators", m: "Raise volunteer show-up rate to 85%" },
        { p: "Grant reports eat weeks of staff time", u: "Program directors", m: "Cut grant reporting time by 60%" },
        { p: "Donors never hear what their gift accomplished", u: "Donors", m: "Increase repeat donors by 20%" },
        { p: "Clients repeat their story to every staff member they meet", u: "Intake staff", m: "Cut intake time per person in half" },
        { p: "Knowledge walks out the door when volunteers leave", u: "Volunteer coordinators", m: "Get new volunteers up to speed in one hour" }
      ],
      constraints: [
        "The budget is basically zero",
        "Staff are not technical, so it must be explainable in 2 minutes",
        "Must respect client privacy, so no real personal info"
      ]
    },
    {
      name: "Real Estate & Property", icon: "🏢",
      clients: [
        { n: "Keystone Property Group", d: "a manager of 4,000 apartment units" },
        { n: "Harbor Row Apartments", d: "a luxury apartment community with 600 units" },
        { n: "Summit Realty Partners", d: "a commercial and residential brokerage" }
      ],
      cases: [
        { p: "Maintenance requests arrive by text, email, and voicemail, then get lost", u: "Maintenance coordinators", m: "Cut repair response time by 40%" },
        { p: "Tenants don't know when repairs will happen", u: "Tenants", m: "Reduce tenant turnover by 10%" },
        { p: "Leasing agents answer the same questions all day", u: "Leasing agents", m: "Answer 60% of leasing questions automatically" },
        { p: "Move-in and move-out inspections are slow and disputed", u: "Property managers", m: "Cut inspection time by 50%" },
        { p: "Lease data lives in spreadsheets nobody trusts", u: "Property managers", m: "Find any lease term in under 30 seconds" }
      ],
      constraints: [
        "Tenants use phones, not computers",
        "Emergencies (flooding, no heat) must jump the queue",
        "Every request needs a paper trail"
      ]
    },
    {
      name: "Automotive & Mobility", icon: "🚗",
      clients: [
        { n: "Motor City Auto Group", d: "a family of 7 car dealerships" },
        { n: "Great Lakes EV Charging", d: "an EV charging network across the Midwest" },
        { n: "Redline Fleet Services", d: "a company managing vehicles for local businesses" }
      ],
      cases: [
        { p: "Customers can't tell why a repair costs what it does", u: "Car owners", m: "Raise repair approval rate by 20%" },
        { p: "Service bays sit idle while someone tracks down parts", u: "Technicians", m: "Cut customer wait time by 30%" },
        { p: "Recall and maintenance reminders get ignored", u: "Car owners", m: "Raise service-reminder bookings by 25%" },
        { p: "EV drivers can't find chargers that actually work", u: "Car owners", m: "Cut failed charging stops by 50%" },
        { p: "Fleet managers learn about breakdowns after the driver is stranded", u: "Fleet managers", m: "Reduce fleet downtime by 20%" }
      ],
      constraints: [
        "The shop floor is noisy and greasy, so big touch targets",
        "Must explain technical issues to non-technical drivers",
        "Must work on whatever phone the customer has"
      ]
    },
    {
      name: "Sports & Entertainment", icon: "🏟️",
      clients: [
        { n: "Great Lakes Arena Co.", d: "an arena hosting 150 events a year" },
        { n: "Northstar Film Festival", d: "a 10-day festival with 200 screenings" },
        { n: "Pixelwave Games Studio", d: "an indie studio with a passionate online community" }
      ],
      cases: [
        { p: "Fans wait in huge concession and entry lines", u: "Fans", m: "Cut line times by 30%" },
        { p: "Event staff coordinate over radio and chaos", u: "Venue staff", m: "Cut incident response time by 40%" },
        { p: "Fans miss events they would have loved", u: "Fans", m: "Raise repeat ticket buyers by 15%" },
        { p: "Player bug reports pile up and never get triaged", u: "Community managers", m: "Triage 90% of community reports within a day" },
        { p: "Post-event feedback is a mountain of unread comments", u: "Event producers", m: "Lift fan satisfaction by 15 points" }
      ],
      constraints: [
        "Thousands of people on bad stadium Wi-Fi, so keep it lightweight",
        "It has to be fun, not another boring form",
        "Must be glanceable in two seconds"
      ]
    },
    {
      name: "Agriculture & Food", icon: "🌾",
      clients: [
        { n: "Prairie Gold Farms Co-op", d: "a co-op of 80 family farms" },
        { n: "Orchard Lane Growers", d: "a fruit grower and packer" },
        { n: "FarmTable Foods", d: "a farm-to-restaurant delivery business" }
      ],
      cases: [
        { p: "Crop problems are spotted too late", u: "Farm managers", m: "Spot crop issues 5 days earlier" },
        { p: "Harvest crews and trucks are scheduled by phone call", u: "Field crews", m: "Raise on-time deliveries to 95%" },
        { p: "Food safety records are paper-based and error-prone", u: "Food safety inspectors", m: "Save 10 hours a week on paperwork" },
        { p: "Buyers can't see what's coming into season", u: "Buyers", m: "Raise pre-orders by 20%" },
        { p: "Surplus produce goes to waste while shelves elsewhere sit empty", u: "Farm managers", m: "Cut food waste by 25%" }
      ],
      constraints: [
        "Users are outdoors in glare, so large text and high contrast",
        "Little or no connectivity in the fields",
        "Farmers distrust tech they can't understand, so show your work"
      ]
    }
  ],

  /* Constraints that can land on ANY industry */
  globalConstraints: [
    "You have 45 minutes, so pick ruthlessly",
    "No logins, no installs: it must work by opening one file",
    "A first-time user must understand it with zero training",
    "The AI must show its reasoning so people can trust or reject it",
    "A human must approve anything 'official' before it happens",
    "It must look good enough to demo on a projector",
    "Use only data you can invent in five minutes",
    "It must work for someone in a hurry or under stress",
    "Mobile first: your main user is on a phone"
  ],

  /* Mid-brief surprises */
  twists: [
    "The CEO saw a competitor's flashy demo yesterday and wants something visual",
    "Your main user tried an AI tool last year, got a wrong answer, and doesn't trust AI",
    "Half the data is messy: typos, duplicates, and missing fields",
    "The person who wrote the requirements just left the company",
    "The client needs it to work in two languages",
    "Everyone loves the current spreadsheet, so you can only improve it, not replace it",
    "Legal will review everything the AI says before launch",
    "Users will only give this 30 seconds a day",
    "The pilot group is five people, and if they hate it the project is dead",
    "The real bottleneck is not where the client thinks it is, so find it",
    "The client's budget was just cut in half, so simplify",
    "You must impress an executive who has never used AI",
    "Your solution must also make one other team's job easier",
    "The client wants to see it handle the worst input imaginable"
  ],

  /* Sealed envelope: revealed halfway through the build sprint */
  curveballs: [
    "New requirement: users must be able to give feedback on the AI's answer.",
    "The client's boss wants a simple dashboard summarizing what happened today.",
    "A second type of user just got added. Support them too.",
    "Add an 'Explain why' button next to every AI output.",
    "Users need to export their results (copy, print, or download).",
    "Handle the case where the AI is unsure, and ask a follow-up question instead of guessing.",
    "Add a 30-second first-time tour for brand-new users.",
    "Make it work well in high-contrast mode for users with low vision.",
    "The client wants to see it with the worst possible input. Make it survive.",
    "Add a way to undo the last action."
  ],

  /* The eight AI capabilities from the workshop deck */
  aiRoles: [
    { key: "search",    name: "Search + Q&A", verb: "find grounded answers",       tip: "Prototype: a search box over sample FAQs or documents that returns the best match and says where the answer came from." },
    { key: "summarize", name: "Summarize",    verb: "condense long content",       tip: "Prototype: paste in a long text and get a short summary with key points and next steps." },
    { key: "extract",   name: "Extract",      verb: "pull key details",            tip: "Prototype: paste messy text (an email, a form) and fill in a clean table of names, dates, amounts." },
    { key: "classify",  name: "Classify",     verb: "sort and route items",        tip: "Prototype: paste a request and see its category, urgency, and who should handle it." },
    { key: "generate",  name: "Generate",     verb: "draft new content",           tip: "Prototype: pick a few options and get a ready-to-edit draft message, report, or plan." },
    { key: "recommend", name: "Recommend",    verb: "suggest the best next step",  tip: "Prototype: answer a few questions and get a ranked list of options with a reason for each." },
    { key: "automate",  name: "Automate",     verb: "run a repeatable workflow",   tip: "Prototype: a step-by-step flow that does the boring parts for the user and asks for approval at the end." },
    { key: "agent",     name: "Agent",        verb: "coordinate tools and tasks",  tip: "Prototype: a task board where the 'agent' plans steps, shows what it's doing, and asks before acting." }
  ],

  contactFirst: ["Dana", "Marcus", "Priya", "Elena", "Theo", "Naomi", "Jordan", "Sofia", "Andre", "Lila", "Caleb", "Mei", "Omar", "Hannah", "Devon", "Rosa", "Felix", "Imani", "Gabe", "Tessa"],
  contactLast: ["Whitfield", "Okafor", "Lindqvist", "Ramirez", "Chen", "Abernathy", "Kowalski", "Patel", "Brennan", "Nakamura", "Duval", "Hargrove", "Sandoval", "Mbeki", "Fairchild", "Novak", "Ellison", "Tran", "Castellano", "Bright"],
  contactTitle: ["Chief Operating Officer", "VP of Operations", "Director of Customer Experience", "Head of Innovation", "Managing Director", "VP of Transformation", "General Manager", "Chief of Staff"],

  teamAdj: ["Turbo", "Cosmic", "Quiet", "Sneaky", "Electric", "Maize", "Rapid", "Fuzzy", "Midnight", "Caffeinated", "Lucky", "Bold", "Spicy", "Pixel", "Velvet", "Thunder"],
  teamNoun: ["Otters", "Wizards", "Foxes", "Rockets", "Owls", "Badgers", "Pandas", "Gremlins", "Comets", "Falcons", "Llamas", "Ninjas", "Penguins", "Moose", "Robots", "Squirrels"]
};
