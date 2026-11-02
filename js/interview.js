/* ------------------------------------------------------------------
   CLIENT INTERVIEW ANSWERS  (edit me!)
   Keyed by industry name (must match js/data.js).
   today[] and tried[] line up with that industry's cases[], in order.
   volume, tools, signoff apply to every case in the industry.
   "What does a win look like?" is generated from the case metric.
------------------------------------------------------------------- */
window.INTERVIEW = {

  "Healthcare": {
    volume: "Across our clinics we see roughly 900 patients a day. On a bad Monday, the wait at check-in tops 40 minutes.",
    tools: "An electronic health record nobody loves, a shared inbox, and a lot of spreadsheets. Staff use whatever is fastest.",
    signoff: "A clinical lead has to approve anything patients see. Keep it simple and they'll say yes quickly.",
    today: [
      "Patients check in, sit down, and then nothing. Staff know who's next, but there's no way to tell the waiting room, so people keep asking the front desk.",
      "A nurse reads instructions aloud, hands over a printout, and the patient nods. At home they can't remember half of it and call us.",
      "A doctor faxes or emails a referral, someone re-types it into another system, and then we wait. Nobody owns chasing it.",
      "Nurses chart on a computer cart between patients, then finish notes after the shift. It's eating their breaks.",
      "We call patients the day before, if someone has time. Most days nobody does, and the slot goes empty."
    ],
    tried: [
      "We put up a sign saying waits could be long. Patients were not amused.",
      "We made a handout in six languages. It's too dense, and people stop reading by page two.",
      "We added a referral column to a shared spreadsheet. It's out of date within a week.",
      "We piloted a scribe. It helped, but we can't afford one for every clinic.",
      "We tried automated reminder texts. They work, but we can't tell who is likely to no-show, so we remind everyone equally."
    ]
  },

  "Higher Education": {
    volume: "About 30,000 students and just 40 advisors. In the first month of term, advising appointments are booked solid for two weeks.",
    tools: "A student portal, a separate learning system, email, and a degree audit tool only advisors can read. Students use their phones for everything.",
    signoff: "The Dean of Students signs off. She cares most about first-year students and about accessibility.",
    today: [
      "Deadlines live in the course system, the financial aid portal, the housing portal, and email. Students check one and miss another.",
      "Advisors look at grades after midterms, which is often too late. Warning signs like missed logins show up weeks earlier, but nobody sees them.",
      "Students email or walk in with the same ten questions about aid and verification. Three staff members answer all of it by hand.",
      "Students read the catalog PDF, guess, and register. They find out in their third year that a class didn't count.",
      "Events get posted on flyers, three websites, and a few Instagram accounts. Most students tell us they had no idea anything was happening."
    ],
    tried: [
      "We sent a weekly deadline email. Open rates are under 20 percent.",
      "We kept a spreadsheet of risk flags. It's updated by hand, so it goes stale.",
      "We added an FAQ page. Students don't read it and still email.",
      "We hired peer mentors. They're great, but they don't know every program's rules.",
      "We launched a campus events app. Adoption died after orientation week."
    ]
  },

  "Retail": {
    volume: "Sixty stores and around 4,000 associates. Each store fields roughly 150 stock questions a day, and returns spike the week after holidays.",
    tools: "A point-of-sale system, a clunky inventory screen in the back office, and personal phones. Associates mostly ask each other in group chats.",
    signoff: "The regional operations director approves pilots. She wants one store, one month, and numbers.",
    today: [
      "A customer asks for a size, the associate walks to the back, checks a screen, and walks back. Half the time the item is in another store.",
      "Each store handles returns a little differently. The associate calls a manager for anything unusual, and the line grows.",
      "At close, managers pull sales, labor, and incident reports from three screens and stitch them into an email.",
      "New seasonal hires shadow someone for a week or two. Every trainer teaches it a bit differently.",
      "Our site shows 'popular items' to everyone. Someone who just bought a couch gets shown the same couch."
    ],
    tried: [
      "We bought a few handheld scanners, but there weren't enough to go around.",
      "We wrote a returns policy PDF. Nobody reads it at the counter.",
      "We made a report template. Managers still copy and paste from three sources.",
      "We made a training binder. It's out of date by the time it's printed.",
      "We bought a recommendation plugin. It ignores purchase history and nobody knows how to configure it."
    ]
  },

  "Banking & Credit Unions": {
    volume: "Roughly 90,000 members, about 1,500 loan applications a month, and our call center handles around 2,000 calls a day.",
    tools: "A core banking system from the 1990s, a loan origination tool, shared drives, and email. Everything important arrives as a PDF.",
    signoff: "Compliance reviews everything member-facing. If you can explain why the system said what it said, they relax.",
    today: [
      "A member applies, a loan officer checks the file, finds a missing pay stub, emails the member, and waits. This repeats two or three times.",
      "Members call about balances, card holds, and routing numbers. Agents read from the same help pages the website has.",
      "Alerts pour in from the fraud system. Most are fine, and analysts click through them one by one.",
      "Members face a website with 40 products. Most just ask the teller what to get.",
      "Every month someone exports data from four systems into Excel, fixes it, and writes the narrative for the regulators."
    ],
    tried: [
      "We added a document checklist to our website. Members skip it.",
      "We bought a chatbot. It sent members in circles and we turned it off.",
      "We tuned the fraud rules. We cut some alerts, missed a real case, and rolled it back.",
      "We built a product comparison page. It's long and nobody uses it.",
      "We hired a contractor to automate one report. It broke when the data format changed."
    ]
  },

  "Manufacturing": {
    volume: "Three shifts, 24 hours a day, about 400 people. One hour of line downtime costs us roughly twelve thousand dollars.",
    tools: "Machine controllers with their own screens, paper checklists, a basic maintenance system, and a whiteboard at each line. Wi-Fi is spotty near the presses.",
    signoff: "The plant manager approves, and the safety lead has a veto. Anything touching safety gets extra scrutiny.",
    today: [
      "A machine makes a funny noise, an operator tells the supervisor, and the supervisor calls maintenance. Often it fails before anyone gets there.",
      "Inspectors check a sample every hour. If a defect starts at minute 5, we find it at minute 55, and that's a lot of scrap.",
      "Supervisors write handoff notes on a clipboard. The next shift reads them, or doesn't.",
      "Operators fill out a paper near-miss card when they remember. Most go in a drawer.",
      "New operators get a binder and a buddy. The buddy's habits become the new person's habits."
    ],
    tried: [
      "We added sensors to two machines. The data sits in a dashboard nobody checks.",
      "We increased inspection frequency. It slowed the line and people grumbled.",
      "We made a digital shift log. People stopped filling it in after a week.",
      "We held a safety stand-down. Reports went up for two weeks, then back down.",
      "We made training videos. They're too long and nobody can find the right one."
    ]
  },

  "Logistics & Supply Chain": {
    volume: "About 300 drivers and 1,800 deliveries a day. Customer service takes around 600 'where is my order' calls daily.",
    tools: "A transportation system for dispatch, a basic app on driver phones, a warehouse management system, and a lot of text messages.",
    signoff: "The VP of Operations approves. She wants anything drivers touch to take under ten seconds.",
    today: [
      "A customer calls, an agent asks a dispatcher, the dispatcher calls the driver, and the driver is on the road. It takes ten minutes per call.",
      "Dispatchers build routes each morning from a spreadsheet. If a road closes or a customer reschedules, they redo it by hand.",
      "Pickers get a list sorted by order number, not by shelf location, so they zigzag all over the building.",
      "Drivers photograph signed slips and upload them at the end of the day, if the photo is readable.",
      "A shipment arrives damaged, the customer emails photos, and it bounces between three people before anyone decides."
    ],
    tried: [
      "We added tracking links in confirmation emails. Customers still call, because the status says 'in transit' for days.",
      "We bought route software. Dispatchers don't trust it and override it constantly.",
      "We reorganized the warehouse once. It helped for a month, then products moved again.",
      "We gave drivers a scanning app. It's slow in bad signal, so they skip it.",
      "We made a damage claim form. It's long, so customers just call instead."
    ]
  },

  "Insurance": {
    volume: "We handle about 600 new claims a week, and each adjuster carries around 80 open files.",
    tools: "A policy system, a claims system, email, and a mountain of PDFs and photos. Adjusters keep their own notes however they like.",
    signoff: "The claims director approves. She cares that customers feel looked after and that every decision can be explained.",
    today: [
      "A customer reports a claim, an adjuster asks for photos and receipts, and half the documents come late or unreadable. Each round trip takes days.",
      "Customers call or email for updates. Adjusters answer from memory, and every answer is slightly different.",
      "Underwriters get applications as emails, PDFs, and scans, then type the details into the system by hand.",
      "Agents explain coverage by reading policy language aloud. Customers get confused and call back.",
      "Adjusters spot odd claims by instinct. There's no consistent checklist, and experienced people catch far more."
    ],
    tried: [
      "We added an upload portal. Customers still email photos.",
      "We sent automatic status emails. They say 'in review' and customers hate them.",
      "We tried scanning software (OCR). It reads clean forms well and messy scans badly.",
      "We wrote a coverage cheat sheet. It's seven pages long.",
      "We bought a fraud scoring tool. Adjusters ignore it because it can't say why it flagged something."
    ]
  },

  "K-12 Schools": {
    volume: "About 6,000 students and 400 teachers across 14 schools. A typical teacher spends around ten hours a week on grading and admin outside class.",
    tools: "A student information system, Google Workspace, a parent messaging app, and paper. Many teachers keep their own spreadsheets.",
    signoff: "The principal and the district privacy officer both sign off. Nothing can collect personal student data.",
    today: [
      "Teachers collect assignments, grade at night, copy scores into the gradebook, and email parents about missing work.",
      "Updates go home in a backpack flyer, an email, and the app. Parents see maybe one of the three.",
      "A student's grades dip and attendance slips, and a teacher sees one piece of it. Nobody sees the whole picture until report cards.",
      "A substitute shows up and finds a handwritten note, if the teacher had time. Often it's just 'follow the plan on the desk.'",
      "We translate key notices by hand, usually days late and mostly into Spanish. Other languages get left out."
    ],
    tried: [
      "We bought gradebook software. It's one more system to learn.",
      "We switched to one parent app. Half the families never installed it.",
      "We tried an early-warning spreadsheet. A counselor updates it once a month.",
      "We made a substitute folder template. Few teachers fill it out.",
      "We tried a free translation website. Teachers worry about errors, so they don't send it."
    ]
  },

  "Local Government": {
    volume: "Around 300 permit applications a month and 1,200 resident requests a week, handled by a permit office of twelve.",
    tools: "An old permitting system, a web form for requests, email, and paper files. Nothing talks to anything else.",
    signoff: "The city manager approves, and the city attorney reviews anything public-facing. Plain language matters a lot.",
    today: [
      "A resident submits an application, a clerk spots a missing document, mails a letter, and the clock restarts. Many applications go around three times.",
      "People call city hall and get transferred. Many give up or call the wrong department twice.",
      "Requests come in by phone, web, and the mobile app. A coordinator reads each one and forwards it by hand.",
      "A request comes in, goes to the city clerk, and then someone searches shared drives and paper boxes for matching files.",
      "Minutes are PDFs. To find a decision, residents have to open dozens of them."
    ],
    tried: [
      "We published a permit checklist. People still submit incomplete applications.",
      "We added a 'who do I call' page. It's long and nobody can find it.",
      "We built a request form with categories. Residents pick the wrong one.",
      "We looked at document software. It stalled in procurement.",
      "We added a search box to the website. It only searches page titles."
    ]
  },

  "Hospitality & Travel": {
    volume: "Nine hotels and about 1,100 rooms. On a busy Friday, 150 guests check in between 3 and 5 p.m.",
    tools: "A property management system, a housekeeping app on shared tablets, email, and walkie-talkies. Reviews live on four different sites.",
    signoff: "The general manager at each hotel approves. They want anything that makes guests feel more welcome, not less.",
    today: [
      "Guests line up, hand over ID, confirm details we already have, and wait for keys. At peak, the line backs into the lobby.",
      "Housekeeping marks a room clean on a tablet, the front desk doesn't always see it, and guests wait for rooms that are actually ready.",
      "A guest texts or calls overnight and reaches voicemail. Most just stop asking.",
      "Managers read reviews when they have time, which is rarely. Patterns go unnoticed.",
      "Every guest gets the same spa and late-checkout email. Conversion is tiny."
    ],
    tried: [
      "We added a mobile check-in link. Most guests ignore it.",
      "We added a status column on the tablet. Sync delays make it unreliable.",
      "We tried a chatbot on our website. Guests found it stiff and impersonal.",
      "We assigned someone to read reviews weekly. It faded after a month.",
      "We tried promo codes. They haven't moved revenue."
    ]
  },

  "Nonprofit & Community": {
    volume: "We serve about 8,000 families a month with 6 staff and roughly 200 volunteers. About a third of signups don't show.",
    tools: "Google Forms, a shared spreadsheet, email, and a free donor database that two people understand.",
    signoff: "The executive director approves. She wants it explainable to the board in two minutes.",
    today: [
      "Volunteers sign up on a form. A coordinator emails everyone the week before, then texts the no-reply folks. No-shows still happen.",
      "Our program director collects stories and numbers from four places and writes the funder report by hand, usually at night.",
      "We send a thank-you and a yearly appeal. Donors rarely hear what their money did in between.",
      "A client explains their situation at the front desk, again to a case worker, and again to a specialist.",
      "A longtime volunteer leaves and the know-how goes with them. New people start from scratch."
    ],
    tried: [
      "We added reminder emails. People ignore them.",
      "We made a report template. It still takes weeks to fill in.",
      "We tried a quarterly newsletter. Open rates are low.",
      "We tried a shared notes document. Staff worry about privacy.",
      "We started a volunteer handbook. It's long and rarely updated."
    ]
  },

  "Real Estate & Property": {
    volume: "Around 4,000 units and about 250 maintenance requests a week. Leasing fields around 80 inquiries a day.",
    tools: "A property management system, a tenant portal few people use, shared inboxes, and texts to personal phones.",
    signoff: "The regional manager approves. Emergencies like flooding or no heat must never get stuck in a queue.",
    today: [
      "Requests come by text, email, voicemail, and the portal. A coordinator copies each into the work order system, so things get lost.",
      "A tenant reports a problem and hears nothing. They email again, then call, then post a bad review.",
      "Leasing agents answer the same questions about pets, parking, and move-in costs. They paste the same replies all day.",
      "Inspectors walk with a clipboard, take photos on their phones, and write the report later. Deposits get disputed.",
      "Lease terms live in PDFs and four spreadsheets. When someone asks 'when does this lease end', it takes a while."
    ],
    tried: [
      "We rolled out a tenant portal. Most tenants still text.",
      "We set up auto-replies. They say 'received' and nothing else.",
      "We wrote an FAQ page. Prospects don't read it.",
      "We tried a photo inspection app. It was too slow for a whole unit.",
      "We hired a temp to clean up lease data. It was out of date within a month."
    ]
  },

  "Automotive & Mobility": {
    volume: "Seven dealerships and about 300 repair orders a day. Customers wait an average of two hours at the busiest locations.",
    tools: "A dealer management system, tablets for inspections, text messages, and a lot of phone calls to parts departments.",
    signoff: "The service director approves. If the advisors don't like it, it's dead.",
    today: [
      "A tech finds a problem, an advisor calls the customer and explains it in jargon, and the customer says 'let me think about it.' Many decline.",
      "A car is waiting, the tech needs a part, and someone phones three suppliers. The bay sits empty.",
      "Reminder postcards and emails go out. Most are ignored because they're generic.",
      "Drivers open three apps to find a charger, then discover it's broken or occupied.",
      "A vehicle breaks down and the driver calls the manager. The manager learns about it after the fact."
    ],
    tried: [
      "We added photos to inspections. Customers see them but still don't understand them.",
      "We stocked more parts. It costs a lot and still misses.",
      "We tried text reminders. People ignore the generic ones.",
      "We tried a charger map. The data is crowd-sourced and often wrong.",
      "We put trackers on some vehicles. Nobody watches the alerts."
    ]
  },

  "Sports & Entertainment": {
    volume: "An arena of 18,000 seats and around 150 events a year. Concession lines can hit 20 minutes at halftime.",
    tools: "A ticketing system, point-of-sale at the concessions, radios, group texts, and social media for fans.",
    signoff: "The operations director approves. Fans need to get it in two seconds, or they won't use it.",
    today: [
      "Fans queue at the concession stand during the best part of the show, then give up and leave hungry.",
      "A spill, a medical issue, or a locked gate gets called over the radio. Supervisors piece together who's closest.",
      "Fans learn about events from ads and friends. Many find out the day after.",
      "Players post bugs on Discord, Reddit, and email. A community manager reads them and copies them into a tracker.",
      "After an event we send a survey. We get a few hundred responses and nobody reads them closely."
    ],
    tried: [
      "We added more concession stands. It helped a little.",
      "We bought more radios. The chatter just got louder.",
      "We send a weekly email. Fans skim and move on.",
      "We made a bug report form. Players skip it and post on Discord.",
      "We hired an intern to read feedback. They left in August."
    ]
  },

  "Agriculture & Food": {
    volume: "80 member farms and about 12,000 acres, with harvest windows that last just a few days per crop.",
    tools: "Paper logs, spreadsheets, text messages, and a weather app. Some fields have almost no cell signal.",
    signoff: "The co-op manager approves. Farmers won't use anything they can't understand at a glance.",
    today: [
      "Someone walks the field, notices yellow leaves, and mentions it at lunch. By the time we act, it has spread.",
      "Crews and trucks get lined up by phone the night before. When the weather shifts, we make 20 calls.",
      "Inspectors fill in paper forms in the field, then retype them at the office. Mistakes and gaps are common.",
      "Buyers call and ask what's ready. We answer from memory.",
      "When we have too much of one crop, we call around. Some goes to waste before we find a taker."
    ],
    tried: [
      "We used a drone for a season. It produced great pictures and no decisions.",
      "We made a shared calendar. Half the farms don't use it.",
      "We tried a tablet app. It froze with no signal, so people went back to paper.",
      "We started a weekly availability email. It's often out of date.",
      "We ran a surplus text list. It worked once and then fizzled."
    ]
  }
};
