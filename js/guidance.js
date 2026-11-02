/* ------------------------------------------------------------------
   SCENARIO GUIDANCE  (edit me!)
   Powers the AI role "Hint" button and the idea chips under
   "Say it in one sentence". Keyed by industry name; entries line up
   with that industry's cases[] in js/data.js, in order.

   r: best-fit AI roles (keys from aiRoles), most useful first
   w: why those roles fit this problem
   t: short topic noun (used to suggest solution names)
   g: goal ideas, written to follow "to help them ..."
   o: outcome ideas, written to follow "improving ..."
------------------------------------------------------------------- */
window.GUIDANCE = {

  "Healthcare": [
    { r: ["search", "classify"], w: "Patients mostly want one answer: when will I be seen? AI can answer that from the queue and explain delays in plain words.", t: "wait time", g: ["know how long they will wait and why", "feel informed instead of ignored"], o: ["average patient wait time", "front desk interruptions"] },
    { r: ["generate", "summarize"], w: "Dense medical instructions can be rewritten as short, plain-language steps for each patient, with answers to common questions.", t: "discharge instructions", g: ["understand what to do after leaving", "get answers without calling back"], o: ["repeat discharge calls", "patient understanding"] },
    { r: ["classify", "automate"], w: "Referrals need to be read, sorted by urgency and destination, and tracked. That is routing plus follow-up.", t: "referral", g: ["send referrals to the right place the first time", "see where every referral stands"], o: ["referral turnaround time", "lost referrals"] },
    { r: ["summarize", "extract"], w: "Notes and forms hide a lot of repeated typing. AI can pull key details and draft the summary for a nurse to approve.", t: "charting", g: ["finish notes in a fraction of the time", "spend more time with patients"], o: ["minutes of paperwork per shift", "time spent charting after shifts"] },
    { r: ["recommend", "generate"], w: "AI can pick which patients are likely to miss an appointment and draft the right reminder, or suggest who to double-book.", t: "no-show", g: ["fill empty slots before they go to waste", "reach the patients most likely to miss"], o: ["no-show rate", "filled appointment slots"] }
  ],

  "Higher Education": [
    { r: ["extract", "recommend"], w: "Deadlines hide in emails and portals. AI can pull them out, then tell a student what to do first this week.", t: "deadline", g: ["see every deadline in one place", "know what to do first this week"], o: ["missed deadlines", "first-year retention"] },
    { r: ["classify", "recommend"], w: "Signals like missed logins and low grades can be sorted into risk levels, with a suggested next step for the advisor.", t: "at-risk student", g: ["spot students who need help early", "know who to contact first"], o: ["time to first outreach", "students flagged early"] },
    { r: ["search", "generate"], w: "Most aid questions repeat. AI can answer from the aid rules and draft replies for staff to approve.", t: "financial aid", g: ["get an answer without waiting for staff", "know which documents they still need"], o: ["questions answered without staff", "aid office email volume"] },
    { r: ["search", "recommend"], w: "Degree rules are searchable, and AI can suggest which courses fit a student's remaining requirements.", t: "degree plan", g: ["see which courses count toward their degree", "plan next semester with confidence"], o: ["routine advising visits", "wrong-course registrations"] },
    { r: ["recommend", "classify"], w: "AI can match students with events based on interests and schedule, instead of showing everyone everything.", t: "event", g: ["find events that fit their interests", "never miss something they would love"], o: ["event attendance", "student engagement"] }
  ],

  "Retail": [
    { r: ["search", "agent"], w: "A quick lookup across store inventory answers 'do we have it?' in seconds, including nearby stores.", t: "stock", g: ["answer stock questions without leaving the customer", "offer a nearby store when an item is sold out"], o: ["lost sales from out-of-stocks", "time spent per stock question"] },
    { r: ["classify", "automate"], w: "Return rules can be checked automatically, so only unusual cases need a manager.", t: "return", g: ["process returns the same way in every store", "skip the manager call for routine cases"], o: ["returns handling time", "manager interruptions"] },
    { r: ["summarize", "automate"], w: "AI can combine numbers from several screens into one short end-of-day summary.", t: "end-of-day report", g: ["get the day's story on one page", "skip the copy and paste"], o: ["manager hours spent on reports", "report accuracy"] },
    { r: ["search", "generate"], w: "New hires can ask questions in plain words and get quick answers from the training material.", t: "training", g: ["get answers on the job without asking around", "learn the store routines faster"], o: ["days to productivity", "questions sent to managers"] },
    { r: ["recommend", "extract"], w: "AI can use what a customer already bought to suggest things that make sense next.", t: "recommendation", g: ["see products that fit what they already own", "skip suggestions they do not need"], o: ["add-on sales", "recommendation click rate"] }
  ],

  "Banking & Credit Unions": [
    { r: ["extract", "classify"], w: "AI can read uploaded documents, spot what is missing, and tell the member right away.", t: "loan application", g: ["know exactly which documents are missing", "avoid back-and-forth emails"], o: ["loan decision time", "applications stuck waiting on documents"] },
    { r: ["search", "generate"], w: "Common questions can be answered instantly from approved help content, with a handoff to a human for anything tricky.", t: "member question", g: ["get a clear answer without calling", "reach a person fast when needed"], o: ["routine call volume", "time to answer"] },
    { r: ["classify", "summarize"], w: "AI can rank alerts by risk and summarize why each one was flagged, so analysts start with the real ones.", t: "fraud alert", g: ["review the riskiest alerts first", "understand why an alert fired"], o: ["false alerts", "review time per alert"] },
    { r: ["recommend", "generate"], w: "A few questions about a member's goals can produce a short list of products, each with a plain explanation.", t: "product", g: ["find the product that fits their situation", "understand the trade-offs in plain English"], o: ["new-product sign-ups", "time spent comparing products"] },
    { r: ["summarize", "automate"], w: "AI can gather the data, draft the narrative, and leave the analyst to review.", t: "compliance report", g: ["draft the monthly report automatically", "review instead of assemble"], o: ["hours spent on compliance reports", "report errors"] }
  ],

  "Manufacturing": [
    { r: ["classify", "recommend"], w: "Sensor patterns and operator notes can be sorted into normal or warning, and AI can suggest what to check.", t: "machine", g: ["catch problems before a machine fails", "know what to check first"], o: ["unplanned downtime", "repair response time"] },
    { r: ["classify", "extract"], w: "Inspection photos or readings can be sorted pass or fail the moment they are taken.", t: "defect", g: ["catch defects within minutes", "stop a bad batch early"], o: ["scrap rate", "time to detect a defect"] },
    { r: ["summarize", "generate"], w: "AI can turn a shift's notes and events into a short handoff the next team will actually read.", t: "shift handoff", g: ["start the shift knowing what matters", "skip reading a whole clipboard"], o: ["repeat issues at shift start", "handoff time"] },
    { r: ["extract", "classify"], w: "A quick voice or text report can become a structured near-miss record, sorted by type and severity.", t: "near-miss report", g: ["report a near-miss in under 30 seconds", "see patterns before someone gets hurt"], o: ["near-miss reports filed", "time to file a report"] },
    { r: ["search", "recommend"], w: "New operators can ask how to do a task and get the right step-by-step answer for their machine.", t: "operator training", g: ["learn the right procedure for their machine", "get unstuck without waiting for a buddy"], o: ["time to train a new operator", "procedure mistakes"] }
  ],

  "Logistics & Supply Chain": [
    { r: ["search", "generate"], w: "AI can answer from tracking data in plain language and explain delays instead of just saying 'in transit'.", t: "order", g: ["see where their order is and why", "get a plain-English update"], o: ["where-is-my-order calls", "time per status request"] },
    { r: ["recommend", "automate"], w: "AI can suggest a route and re-plan when a road closes or a stop changes.", t: "route", g: ["re-plan a route in seconds", "see the best order of stops"], o: ["on-time delivery rate", "route planning time"] },
    { r: ["recommend", "automate"], w: "AI can sort a pick list by shelf location so the picker walks one smooth path.", t: "pick path", g: ["fill orders along the shortest path", "walk less and pick more"], o: ["picker walking time", "orders picked per hour"] },
    { r: ["extract", "automate"], w: "A photo of a signed slip can be read and filed automatically, with a prompt if it is unreadable.", t: "proof of delivery", g: ["capture proof of delivery in one tap", "fix a bad photo on the spot"], o: ["same-day delivery records", "lost paperwork"] },
    { r: ["classify", "generate"], w: "Photos and descriptions can be sorted by severity, and AI can draft the next step for the customer.", t: "damage claim", g: ["file a damage claim in minutes", "get a clear decision quickly"], o: ["claim resolution time", "claims that bounce between people"] }
  ],

  "Insurance": [
    { r: ["extract", "classify"], w: "AI can read what a customer submits, spot what is missing, and ask for it right away.", t: "claim intake", g: ["submit everything the first time", "know what is still needed"], o: ["claim cycle time", "claims waiting on missing details"] },
    { r: ["search", "generate"], w: "Claim data can become a plain-language status update on demand.", t: "claim", g: ["see where their claim stands", "skip the phone call"], o: ["post-claim satisfaction", "status calls"] },
    { r: ["extract", "automate"], w: "AI can pull fields from emails and PDFs and fill the form for the underwriter to confirm.", t: "application data", g: ["stop retyping the same details", "review instead of type"], o: ["re-keying time", "data entry errors"] },
    { r: ["search", "generate"], w: "AI can look up the policy language and explain it in everyday words, showing where the answer came from.", t: "coverage", g: ["explain what a policy covers in plain English", "answer coverage questions on the spot"], o: ["policy-explanation callbacks", "customer confusion"] },
    { r: ["classify", "summarize"], w: "AI can score claims and summarize the reasons, so an adjuster can decide quickly.", t: "suspicious claim", g: ["spot unusual claims early", "see why a claim looks odd"], o: ["suspicious claims flagged", "review time per claim"] }
  ],

  "K-12 Schools": [
    { r: ["generate", "classify"], w: "AI can draft feedback and sort work by common mistakes, and the teacher approves everything.", t: "grading", g: ["grade faster without losing quality", "give useful feedback to every student"], o: ["hours spent grading", "time returned to teachers"] },
    { r: ["summarize", "generate"], w: "Many updates can be condensed into one friendly weekly message per family.", t: "family update", g: ["get one clear weekly update", "find what matters at a glance"], o: ["parent engagement", "missed school notices"] },
    { r: ["classify", "recommend"], w: "Grades, attendance, and notes can be combined into a simple risk signal with a suggested next step.", t: "student support", g: ["notice struggling students sooner", "know the best next step"], o: ["weeks to identify a struggling student", "students getting early support"] },
    { r: ["summarize", "generate"], w: "A teacher's plans and notes can become a one-page substitute guide.", t: "substitute guide", g: ["walk into class knowing the plan", "find everything on one page"], o: ["substitute prep time", "class time lost"] },
    { r: ["generate", "automate"], w: "AI can translate and adapt notices into each family's language, with a teacher review step.", t: "translation", g: ["read school news in their own language", "get notices at the same time as everyone"], o: ["families reached in their language", "translation delay"] }
  ],

  "Local Government": [
    { r: ["extract", "classify"], w: "AI can check an application against the checklist before it is submitted and flag what is missing.", t: "permit application", g: ["submit a complete application the first time", "know what is missing before sending"], o: ["permit rework rate", "days to approval"] },
    { r: ["classify", "search"], w: "A plain-language question can be routed to the right office with the right next step.", t: "request", g: ["find the right office in one try", "get a clear next step"], o: ["requests routed correctly", "transferred calls"] },
    { r: ["classify", "automate"], w: "Incoming requests can be sorted by type and urgency and sent to the right team automatically.", t: "311 request", g: ["sort requests as they arrive", "send urgent issues first"], o: ["311 backlog", "time to first response"] },
    { r: ["search", "extract"], w: "AI can search records for matches and pull out what a request needs.", t: "records request", g: ["find matching records quickly", "answer requests in days, not months"], o: ["records response time", "requests past the deadline"] },
    { r: ["search", "summarize"], w: "AI can search meeting minutes and summarize decisions in plain language.", t: "meeting decision", g: ["find any decision in under a minute", "understand what was decided"], o: ["time to find a decision", "resident satisfaction"] }
  ],

  "Hospitality & Travel": [
    { r: ["automate", "extract"], w: "Details we already have can be pre-filled so check-in becomes a quick confirmation.", t: "check-in", g: ["check in without waiting in line", "skip repeating details"], o: ["check-in time", "lobby wait at peak"] },
    { r: ["classify", "automate"], w: "Room status can sync from housekeeping to the front desk in real time and flag delays.", t: "room", g: ["see which rooms are truly ready", "prioritize the rooms guests are waiting for"], o: ["room-ready delays", "guest wait for rooms"] },
    { r: ["search", "generate"], w: "Common guest questions can be answered any time, in the guest's language, with a handoff for anything complex.", t: "guest question", g: ["get answers at any hour", "feel looked after"], o: ["after-hours questions answered", "guest satisfaction"] },
    { r: ["summarize", "classify"], w: "AI can sort reviews by theme and sentiment, and summarize what to fix.", t: "guest review", g: ["spot patterns in reviews", "know what to fix first"], o: ["guest review score", "unread reviews"] },
    { r: ["recommend", "generate"], w: "AI can match offers to a guest's trip and write a short, personal note.", t: "guest offer", g: ["see offers that fit their stay", "skip the generic spam"], o: ["add-on revenue", "offer conversion"] }
  ],

  "Nonprofit & Community": [
    { r: ["recommend", "automate"], w: "AI can predict who is likely to miss a shift, send the right nudge, and keep a backup list.", t: "volunteer shift", g: ["fill every shift", "remind the right people at the right time"], o: ["volunteer show-up rate", "last-minute gaps"] },
    { r: ["summarize", "generate"], w: "AI can gather stories and numbers and draft the report for staff to polish.", t: "grant report", g: ["draft funder reports in hours", "pull numbers and stories together"], o: ["hours spent on grant reports", "reports submitted on time"] },
    { r: ["generate", "summarize"], w: "AI can turn program results into a short, personal update for each donor.", t: "donor update", g: ["see what their gift accomplished", "hear back after giving"], o: ["repeat donors", "donor response rate"] },
    { r: ["extract", "summarize"], w: "A client's story can be captured once and summarized for each staff member who needs it.", t: "client intake", g: ["tell their story once", "get help without repeating themselves"], o: ["intake time per person", "repeat questions asked"] },
    { r: ["search", "summarize"], w: "Volunteer know-how can be captured and searched, so new people get answers quickly.", t: "volunteer onboarding", g: ["get up to speed in an hour", "find answers without interrupting staff"], o: ["time to onboard a volunteer", "questions sent to staff"] }
  ],

  "Real Estate & Property": [
    { r: ["classify", "extract"], w: "Requests in any format can be read, categorized, and prioritized, with emergencies jumping the queue.", t: "maintenance request", g: ["get every request into one queue", "send emergencies to the front"], o: ["repair response time", "lost requests"] },
    { r: ["generate", "automate"], w: "AI can send clear status updates and expected repair windows without anyone typing them.", t: "repair update", g: ["know when the repair will happen", "get updates without asking"], o: ["tenant turnover", "follow-up calls"] },
    { r: ["search", "generate"], w: "Common questions about pets, parking, and costs can be answered from approved info instantly.", t: "leasing question", g: ["get leasing answers instantly", "book a tour without waiting"], o: ["questions answered automatically", "agent time on repeat questions"] },
    { r: ["extract", "summarize"], w: "Photos and spoken notes can become a clean condition report in minutes.", t: "inspection", g: ["finish an inspection report on the spot", "back up condition with photos"], o: ["inspection time", "deposit disputes"] },
    { r: ["extract", "search"], w: "AI can pull key terms out of lease PDFs and make them searchable.", t: "lease term", g: ["find any lease term in seconds", "trust the data"], o: ["time to find a lease term", "lease data errors"] }
  ],

  "Automotive & Mobility": [
    { r: ["generate", "summarize"], w: "AI can explain a repair in plain words: why it is needed and what happens if it waits.", t: "repair estimate", g: ["understand why a repair is needed", "approve work with confidence"], o: ["repair approval rate", "customer questions on estimates"] },
    { r: ["search", "recommend"], w: "A single lookup can check inventory, nearby stores, and suppliers for the quickest source.", t: "parts", g: ["find the part fast", "keep the bay busy"], o: ["bay idle time", "customer wait time"] },
    { r: ["recommend", "generate"], w: "AI can pick the right reminder for each car and write it in a friendly way.", t: "service reminder", g: ["get reminders that actually apply", "book service in one tap"], o: ["service-reminder bookings", "reminder response rate"] },
    { r: ["recommend", "search"], w: "AI can recommend chargers based on reliability, speed, and the driver's route.", t: "charger", g: ["find a working charger on the route", "avoid a wasted stop"], o: ["failed charging stops", "charging trip time"] },
    { r: ["classify", "recommend"], w: "Vehicle signals can be sorted into 'fine' and 'about to fail', with a suggested action.", t: "fleet", g: ["fix vehicles before they break down", "see which vehicle needs attention first"], o: ["fleet downtime", "roadside breakdowns"] }
  ],

  "Sports & Entertainment": [
    { r: ["recommend", "automate"], w: "AI can suggest which stand is shortest and let fans pre-order so they miss less of the show.", t: "concession line", g: ["skip the long line", "order without missing the show"], o: ["concession wait time", "concession sales"] },
    { r: ["classify", "agent"], w: "Incidents can be sorted by type and sent to the nearest available staff member.", t: "incident", g: ["get the right person to an incident fast", "see everything in one place"], o: ["incident response time", "radio chatter"] },
    { r: ["recommend", "generate"], w: "AI can match fans to upcoming events and write a personal invite.", t: "event invite", g: ["hear about events they would love", "buy tickets in a few taps"], o: ["repeat ticket buyers", "event awareness"] },
    { r: ["classify", "summarize"], w: "Reports from Discord and email can be grouped, deduplicated, and ranked by impact.", t: "bug report", g: ["see the top bugs at a glance", "triage reports quickly"], o: ["reports triaged within a day", "duplicate reports"] },
    { r: ["summarize", "classify"], w: "AI can sort thousands of comments into themes and pull out what to do next.", t: "event feedback", g: ["see what fans said on one page", "spot the top three fixes"], o: ["fan satisfaction", "feedback actually acted on"] }
  ],

  "Agriculture & Food": [
    { r: ["classify", "recommend"], w: "Photos or observations can be sorted into likely problems, with a suggested next step.", t: "crop issue", g: ["spot crop problems early", "know what to do next"], o: ["days to spot a crop issue", "crop loss"] },
    { r: ["automate", "recommend"], w: "AI can build a crew and truck schedule and re-plan when the weather shifts.", t: "harvest schedule", g: ["re-plan crews and trucks in minutes", "avoid dozens of phone calls"], o: ["on-time deliveries", "scheduling calls"] },
    { r: ["extract", "automate"], w: "Field records can be captured once and filled in automatically, with gaps flagged.", t: "food safety record", g: ["record checks once, in the field", "catch missing entries right away"], o: ["hours spent on paperwork", "record errors"] },
    { r: ["summarize", "search"], w: "A live 'what's ready soon' view can be kept up to date and searched by buyers.", t: "harvest availability", g: ["see what is coming into season", "order ahead with confidence"], o: ["pre-orders", "calls asking what is ready"] },
    { r: ["recommend", "automate"], w: "AI can match surplus produce with nearby buyers and food banks before it spoils.", t: "surplus produce", g: ["find a home for extra produce fast", "avoid waste"], o: ["food waste", "surplus sold or donated"] }
  ]
};
