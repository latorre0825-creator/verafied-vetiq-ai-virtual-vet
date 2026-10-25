/* VetIQ AI engine — rule-based veterinary triage + first-aid guidance.
   Not a replacement for a licensed vet. Built for first-response guidance. */

export type TriageLevel = "emergency" | "urgent" | "routine" | "info";

export interface SymptomDef {
  id: string;
  label: string;
  icon: string;
  weight: number; // urgency weight 1-10
  emergency: boolean;
  species: string[]; // all or subset
  causes: { name: string; likelihood: string; detail: string }[];
  actions: string[];
  homeCare: string[];
}

export const SYMPTOM_CATALOG: SymptomDef[] = [
  {
    id: "breathing",
    label: "Difficulty breathing / panting hard",
    icon: "wind",
    weight: 10,
    emergency: true,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Respiratory distress / asthma", likelihood: "High", detail: "Open-mouth breathing in cats, noisy or labored breathing can signal airway obstruction, asthma, heart failure or heatstroke." },
      { name: "Heatstroke", likelihood: "Medium", detail: "Heavy panting + drooling + hot skin after heat/exercise needs immediate cooling." },
      { name: "Heart disease / fluid in chest", likelihood: "Medium", detail: "Cough + tiring easily + fast resting breathing (>40/min) can point to cardiac issues." },
    ],
    actions: [
      "Stay calm and keep your pet still — stress makes breathing worse.",
      "Move to cool, quiet, well-ventilated air. Do NOT wrap or overheat.",
      "Check gums: pale/white/blue = emergency. Count breaths for 15s × 4.",
      "Do NOT give human medicines. Go to ER vet NOW if lips/gums are blue, collapsing, or breathing with belly effort.",
    ],
    homeCare: ["Rest in cool room, offer small sips of water", "No walks, no car rides except to vet", "Video the breathing to show the vet"],
  },
  {
    id: "collapse",
    label: "Collapse / fainting / can't stand",
    icon: "alert",
    weight: 10,
    emergency: true,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Cardiac event / shock", likelihood: "High", detail: "Sudden collapse, stiff or floppy body, glazed eyes = possible heart, bleeding or toxin emergency." },
      { name: "Severe hypoglycemia / seizure aftermath", likelihood: "Medium", detail: "Especially in puppies, small breeds or diabetics." },
    ],
    actions: [
      "Check breathing + heartbeat. If no breathing, begin pet CPR only if trained and head to ER.",
      "Keep warm with a blanket, keep airway clear, do not pour water in mouth.",
      "Call ER vet while en route — this is a RED emergency.",
    ],
    homeCare: ["Keep dark/quiet during transport", "Note what happened right before (exercise, food, heat)"],
  },
  {
    id: "seizure",
    label: "Seizure / twitching / shaking",
    icon: "zap",
    weight: 9,
    emergency: true,
    species: ["dog", "cat", "other"],
    causes: [
      { name: "Epilepsy / toxin / low blood sugar", likelihood: "High", detail: "Paddling legs, drooling, loss of awareness lasting 30s–2min." },
      { name: "Poisoning (xylitol, rat bait, permethrin in cats)", likelihood: "Medium", detail: "Multiple/cluster seizures or seizure >5 min = status epilepticus, life-threatening." },
    ],
    actions: [
      "Time the seizure. Dim lights, move furniture away, do NOT put hands near mouth.",
      "Do NOT hold down. Film if safe — vets need to see it.",
      "If >5 min, cluster seizures, or trouble breathing after → ER immediately.",
    ],
    homeCare: ["Quiet dark recovery, no food until fully alert", "Log date/time/duration + possible toxin access"],
  },
  {
    id: "bleeding",
    label: "Bleeding / deep cut / trauma",
    icon: "drop",
    weight: 9,
    emergency: true,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Laceration / bite wound / nail tear", likelihood: "High", detail: "Bite wounds often look small but infect fast." },
      { name: "Internal bleeding after fall/car", likelihood: "Medium", detail: "Pale gums, swollen belly, collapse after trauma = ER." },
    ],
    actions: [
      "Apply firm pressure with clean gauze 5–10 min without peeking.",
      "For limb bleed, bandage snug (you should fit 1 finger under). Loosen if paw swells/cold.",
      "Do NOT use hydrogen peroxide deep in wounds. ER if spurting blood, deep cut, or hit by car.",
    ],
    homeCare: ["E-collar to stop licking", "Keep wound clean/dry until vet sees it"],
  },
  {
    id: "bloat",
    label: "Swollen hard belly / retching, can't vomit",
    icon: "circle",
    weight: 10,
    emergency: true,
    species: ["dog"],
    causes: [
      { name: "Gastric dilatation-volvulus (bloat / twisted stomach)", likelihood: "High", detail: "Large/deep-chested dogs: pacing, drooling, hard swollen belly, trying to vomit but nothing comes up. Minutes matter." },
    ],
    actions: [
      "DO NOT wait — drive to ER vet NOW. Bloat can be fatal in 1–2 hours.",
      "Keep dog calm and still, no food/water, no home remedies.",
      "Call clinic to warn them you're coming with suspected GDV.",
    ],
    homeCare: ["After ER: small frequent meals, no vigorous exercise 1h after eating"],
  },
  {
    id: "vomiting",
    label: "Vomiting / throwing up",
    icon: "refresh",
    weight: 5,
    emergency: false,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Dietary indiscretion / gastritis", likelihood: "High", detail: "Ate too fast, new food, garbage or grass. Often resolves in 12–24h if pet stays bright." },
      { name: "Foreign body / blockage", likelihood: "Medium", detail: "Repeated vomiting, no poop, belly pain, lethargy — especially chewers. Suspect blockage." },
      { name: "Pancreatitis / kidney / liver disease", likelihood: "Medium", detail: "Vomiting + belly pain + not eating + lethargy, older pets." },
    ],
    actions: [
      "Withhold food 6–12h (adults only, NOT puppies/kittens/diabetics) — offer small sips of water.",
      "If vomits >3× in 24h, blood in vomit, belly pain, lethargy or can't keep water down → vet within 24h.",
      "Check for missing toys/socks, trash access, toxins, new meds.",
    ],
    homeCare: ["Then bland diet 2–3 days: boiled chicken + rice (dogs) / plain poached chicken + pumpkin (cats)", "Small frequent meals, monitor poop + energy"],
  },
  {
    id: "diarrhea",
    label: "Diarrhea / soft stool",
    icon: "waves",
    weight: 4,
    emergency: false,
    species: ["dog", "cat", "rabbit", "other"],
    causes: [
      { name: "Food change / stress colitis", likelihood: "High", detail: "Mucus or urgency after boarding, new food or scavenging." },
      { name: "Parasites / Giardia", likelihood: "Medium", detail: "Especially puppies/kittens, intermittent soft stool, weight loss." },
      { name: "Parvo (unvaccinated puppies)", likelihood: "Medium", detail: "Bloody foul diarrhea + vomiting + lethargy in puppy = ER + isolate." },
    ],
    actions: [
      "Ensure hydration: gums moist, skin springs back. Puppies dehydrate fast.",
      "ER red flags: bloody/black stool + vomiting + lethargy, or puppy <4mo unvaccinated.",
      "Collect fresh stool sample in bag for vet testing.",
    ],
    homeCare: ["Bland diet + probiotic (plain pumpkin purée 1 tsp per 5kg)", "No anti-diarrhea human meds unless vet says"],
  },
  {
    id: "not-eating",
    label: "Not eating / appetite loss",
    icon: "utensils",
    weight: 5,
    emergency: false,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Nausea / dental pain / stress", likelihood: "High", detail: "Cats that don't eat >24–48h risk fatty liver — don't wait." },
      { name: "GI stasis (rabbits)", likelihood: "High", detail: "Rabbit not eating + no poops + hunched = EMERGENCY (GI stasis)." },
      { name: "Systemic illness (kidney, infection)", likelihood: "Medium", detail: "Skipping 2+ meals + lethargy/hiding/vomiting." },
    ],
    actions: [
      "Cats: no food >24h → vet same day. Rabbits: no poop 8–12h → ER.",
      "Offer warmed smelly food (tuna water, chicken broth no onion), check teeth/mouth sores.",
      "Check temp, litterbox, water intake. Note weight loss.",
    ],
    homeCare: ["Syringe water if dehydrated (ask vet for amount)", "Keep food diary for vet"],
  },
  {
    id: "lethargy",
    label: "Lethargy / weak / hiding",
    icon: "battery",
    weight: 5,
    emergency: false,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Infection / fever / pain", likelihood: "High", detail: "Sleeping more, no play, hiding, slow on walks." },
      { name: "Anemia / organ disease", likelihood: "Medium", detail: "Pale gums + fast breathing + collapse history." },
    ],
    actions: [
      "Check gums, breathing rate, temp if you can (normal dog 38–39.2°C, cat 38–39.2°C).",
      "If also not eating/vomiting/pale gums → vet within 24h. If collapse/bleeding → ER.",
      "Rest, no forced exercise.",
    ],
    homeCare: ["Quiet rest, monitor appetite + toilet", "Note any coughing/sneezing/limping to report"],
  },
  {
    id: "coughing",
    label: "Coughing / sneezing / runny nose",
    icon: "cloud",
    weight: 4,
    emergency: false,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Kennel cough / upper respiratory infection", likelihood: "High", detail: "Honking cough after boarding/daycare; cat sneezing + eye discharge = cat flu." },
      { name: "Allergies / heart disease (older dogs)", likelihood: "Medium", detail: "Night cough + exercise intolerance in senior small breeds." },
    ],
    actions: [
      "Isolate from other pets, use harness not collar.",
      "ER if blue gums, fainting with cough, or breathing >40/min at rest.",
      "No human cough syrup — many contain xylitol/decongestants toxic to pets.",
    ],
    homeCare: ["Steam bathroom 10 min 2×/day", "Honey ½ tsp for dogs >1yr can soothe throat (no honey for puppies <1yr)"],
  },
  {
    id: "itching",
    label: "Itching / scratching / licking paws",
    icon: "hand",
    weight: 2,
    emergency: false,
    species: ["dog", "cat", "other"],
    causes: [
      { name: "Fleas / allergies (food or environmental)", likelihood: "High", detail: "Chewing paws, red belly, ear scratching, seasonal pattern." },
      { name: "Ear infection / hot spot", likelihood: "Medium", detail: "Head shaking + smell from ears, moist red skin patch." },
    ],
    actions: [
      "Flea-check: comb over white paper — black dirt that turns red = fleas.",
      "E-collar to stop chewing, lukewarm rinse if dirty. Don't over-bathe.",
      "Vet if raw/bleeding skin, hair loss, ear odor or head tilt.",
    ],
    homeCare: ["Oatmeal bath, vet-approved flea prevention monthly", "Wipe paws after walks in pollen season"],
  },
  {
    id: "limping",
    label: "Limping / leg injury / pain",
    icon: "foot",
    weight: 4,
    emergency: false,
    species: ["dog", "cat", "rabbit", "other"],
    causes: [
      { name: "Sprain / thorn / torn nail", likelihood: "High", detail: "Sudden limp after run, licking one paw." },
      { name: "Cruciate tear / fracture", likelihood: "Medium", detail: "Non-weight-bearing, swelling, yelp on touch." },
    ],
    actions: [
      "Rest 24–48h, check paw pads/nails/between toes for thorns or glass.",
      "Never give ibuprofen/paracetamol — both can kill dogs/cats. Only vet-prescribed pain relief.",
      "ER if leg dangles, bone exposed, or after car accident.",
    ],
    homeCare: ["Cold compress 10 min for fresh swelling", "Short leash walks only until vet check"],
  },
  {
    id: "eye",
    label: "Eye red / discharge / squinting",
    icon: "eye",
    weight: 6,
    emergency: false,
    species: ["dog", "cat", "rabbit", "other"],
    causes: [
      { name: "Conjunctivitis / allergy", likelihood: "High", detail: "Watery/goopy eyes, mild squint, both eyes." },
      { name: "Corneal ulcer / glaucoma", likelihood: "Medium", detail: "Sudden one-eye squint + tearing + cloudiness + pain = urgent (24h) — eyes worsen fast." },
    ],
    actions: [
      "Don't let them rub. E-collar on. Saline rinse gently to clear gunk.",
      "Urgent vet <24h for squinting, cloudy/blue eye, bulging or injury. Never use human eye drops with steroids.",
      "Note which eye + color of discharge for vet.",
    ],
    homeCare: ["Warm damp compress 2×/day", "Keep face clean, trim hair away from eyes"],
  },
  {
    id: "urinary",
    label: "Straining to pee / blood in urine",
    icon: "droplet",
    weight: 7,
    emergency: false,
    species: ["dog", "cat", "other"],
    causes: [
      { name: "UTI / bladder stones", likelihood: "High", detail: "Frequent squats, small pees, crying, pink urine." },
      { name: "Blocked bladder (male cats) — EMERGENCY", likelihood: "High", detail: "Male cat straining with NO urine + crying + vomiting/lethargy = blocked urethra, fatal in 24–48h." },
    ],
    actions: [
      "Male cat producing NO urine = ER NOW, do not wait.",
      "Encourage water, clean litterbox, collect urine sample if you can.",
      "Vet within 24h for bloody/frequent urination — needs urinalysis.",
    ],
    homeCare: ["Wet food + extra water bowls/fountains", "Low-stress litter setup (1 box per cat +1)"],
  },
  {
    id: "toxin",
    label: "Ate something toxic / poison",
    icon: "skull",
    weight: 9,
    emergency: true,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Chocolate / xylitol / grapes / onion / lily (cats)", likelihood: "High", detail: "Even small amounts can be dangerous — dose depends on weight." },
      { name: "Rat bait / slug pellets / cleaning products", likelihood: "High", detail: "Bring the package + estimate of amount and time eaten." },
    ],
    actions: [
      "Note WHAT, HOW MUCH, WHEN + pet weight. Call vet/poison line NOW.",
      "Do NOT induce vomiting unless vet tells you — some toxins burn worse coming up.",
      "Bring packaging to vet. If advised, vet may give activated charcoal or apomorphine.",
    ],
    homeCare: ["After vet: bland diet, monitor 48h — some toxins (grapes, lilies) have delayed kidney effects"],
  },
  {
    id: "skin",
    label: "Lump / wound / rash / hair loss",
    icon: "scan",
    weight: 3,
    emergency: false,
    species: ["dog", "cat", "rabbit", "other"],
    causes: [
      { name: "Hot spot / allergy / insect bite", likelihood: "High", detail: "Red moist patch that spreads fast." },
      { name: "Abscess (esp. cats after fights)", likelihood: "Medium", detail: "Painful swelling + fever + lethargy days after scratch." },
      { name: "Tumor — needs check", likelihood: "Medium", detail: "New lump growing, hard/fixed, bleeding or >1cm — vet should aspirate." },
    ],
    actions: [
      "Measure lump (photo + ruler), note growth speed.",
      "Don't squeeze or lance. E-collar to stop licking.",
      "Vet within days for new/growing lumps; urgent if bleeding, painful or rapid growth.",
    ],
    homeCare: ["Keep area clean/dry", "Track size weekly with photos"],
  },
  {
    id: "ear",
    label: "Head shaking / ear smell / scratching ears",
    icon: "ear",
    weight: 3,
    emergency: false,
    species: ["dog", "cat", "other"],
    causes: [
      { name: "Ear infection (yeast/bacteria)", likelihood: "High", detail: "Brown waxy gunk + yeasty smell, floppy-eared dogs prone." },
      { name: "Ear mites (cats/kittens)", likelihood: "Medium", detail: "Coffee-ground debris + intense scratching." },
    ],
    actions: [
      "Don't probe deep with cotton buds. Gentle outer wipe only.",
      "Vet for cytology — wrong drops make it worse. Head tilt/loss of balance = prompt visit.",
      "Dry ears after swimming/baths.",
    ],
    homeCare: ["Vet-approved ear cleaner weekly for prone breeds", "Treat all in-contact pets for mites if diagnosed"],
  },
  {
    id: "behavior",
    label: "Behavior change / anxiety / aggression",
    icon: "brain",
    weight: 2,
    emergency: false,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Pain / fear / routine change", likelihood: "High", detail: "Hiding, growling when touched, toilet outside box, pacing at night." },
      { name: "Cognitive decline (seniors)", likelihood: "Medium", detail: "Night waking, staring, house-soiling in 10yr+ pets." },
    ],
    actions: [
      "Rule out pain first: check teeth, ears, belly, limp. Sudden aggression + drooling/fear of water = rabies risk → vet + isolate.",
      "Keep routine, safe den space, no punishment.",
      "Book vet + behavior consult if sudden or escalating.",
    ],
    homeCare: ["Enrichment, puzzle feeders, calm pheromone diffuser", "Log triggers with video for behaviorist"],
  },
  {
    id: "vaccine",
    label: "Vaccine / deworming / general wellness question",
    icon: "shield",
    weight: 1,
    emergency: false,
    species: ["dog", "cat", "rabbit", "bird", "other"],
    causes: [
      { name: "Preventive care guidance", likelihood: "High", detail: "Schedules depend on age/species/lifestyle — indoor vs outdoor, travel, boarding." },
    ],
    actions: [
      "Puppies/kittens: core vaccines every 3–4 weeks until 16 weeks, then boosters.",
      "Keep vaccine card + set reminders. Deworm per vet schedule.",
      "Mild sleepiness 24h post-vaccine is normal; facial swelling/vomiting = allergic reaction → vet.",
    ],
    homeCare: ["Annual wellness exam, monthly flea + tick prevention", "Dental check yearly"],
  },
];

export interface TriageInput {
  species: string;
  ageYears?: number;
  weightKg?: number;
  symptomIds: string[];
  duration?: string;
  extraNotes?: string;
  petName?: string;
}

export interface TriageResult {
  level: TriageLevel;
  score: number; // 0-100
  headline: string;
  summary: string;
  possibleCauses: { name: string; likelihood: string; detail: string }[];
  immediateActions: string[];
  homeCare: string[];
  seeVetWhen: string;
  redFlags: string[];
  followUpQuestions: string[];
}

const RED_FLAG_PHRASES = [
  "blue", "pale gums", "white gums", "collapse", "seizure", "can't breathe",
  "not breathing", "blood", "bloat", "twisted", "rat poison", "xylitol",
  "antifreeze", "lily", "no urine", "straining", "hit by car", "fall",
];

export function runTriage(input: TriageInput): TriageResult {
  const defs = SYMPTOM_CATALOG.filter((s) => input.symptomIds.includes(s.id));
  const used = defs.length ? defs : SYMPTOM_CATALOG.filter((s) => s.id === "vaccine");

  const anyEmergency = used.some((d) => d.emergency);
  const rawScore = used.reduce((a, d) => a + d.weight, 0);
  const age = input.ageYears ?? 2;
  const ageBonus = age < 0.5 || age > 10 ? 8 : age < 1 || age > 8 ? 4 : 0;
  const multiBonus = used.length >= 3 ? 10 : used.length === 2 ? 5 : 0;
  const noteText = (input.extraNotes ?? "").toLowerCase();
  const noteBonus = RED_FLAG_PHRASES.some((p) => noteText.includes(p)) ? 15 : 0;
  const score = Math.min(100, rawScore * 4 + ageBonus + multiBonus + noteBonus);

  let level: TriageLevel = "info";
  if (anyEmergency || score >= 55) level = "emergency";
  else if (score >= 32) level = "urgent";
  else if (score >= 12) level = "routine";
  else level = "info";

  // rabbit GI stasis override
  if (
    input.species === "rabbit" &&
    (input.symptomIds.includes("not-eating") || noteText.includes("no poop"))
  ) {
    level = "emergency";
  }
  // male cat blocked bladder override
  if (input.symptomIds.includes("urinary") && noteText.includes("no urine")) {
    level = "emergency";
  }
  // toxin always at least urgent
  if (input.symptomIds.includes("toxin") && level !== "emergency") level = "emergency";

  const petLabel = input.petName ? `${input.petName}` : `your ${input.species}`;
  const headlines: Record<TriageLevel, string> = {
    emergency: `🚨 Emergency — get ${petLabel} to a vet NOW`,
    urgent: `⚠️ Needs a vet within 24 hours`,
    routine: `🩺 Schedule a checkup this week`,
    info: `✅ Likely manageable at home + monitor`,
  };

  const seeVet: Record<TriageLevel, string> = {
    emergency: "Go to the nearest emergency vet NOW — do not wait to see if it improves. Call ahead so they are ready.",
    urgent: "Book a vet appointment within 24 hours (virtual now + in-clinic tomorrow). If any red flag appears, upgrade to ER.",
    routine: "Book a routine appointment within 3–7 days. Monitor and use home care below.",
    info: "No vet visit needed right now unless things change — follow home care + watch for red flags for 48h.",
  };

  const possibleCauses = used.flatMap((d) => d.causes).slice(0, 6);
  const immediateActions = [...new Set(used.flatMap((d) => d.actions))].slice(0, 7);
  const homeCare = [...new Set(used.flatMap((d) => d.homeCare))].slice(0, 6);

  const summary =
    level === "emergency"
      ? `Based on ${used.map((d) => d.label.toLowerCase()).join(" + ")}, ${petLabel} shows red-flag signs that can turn life-threatening fast (${input.duration || "recent onset"}). First-aid below buys time — but only a vet exam + tests can confirm the cause.`
      : level === "urgent"
        ? `${petLabel} likely needs hands-on diagnosis for ${used.map((d) => d.label.toLowerCase()).join(" + ")} (${input.duration || "ongoing"}). This usually isn't instantly fatal, but waiting more than a day risks complications. Start home care now and get a vet (virtual today, in-person within 24h).`
        : `For ${used.map((d) => d.label.toLowerCase()).join(" + ")}, the pattern looks ${level === "routine" ? "mild-to-moderate" : "mild"} right now. Support ${petLabel} at home, track changes, and let a vet confirm if it lingers beyond ${level === "routine" ? "a few days" : "48 hours"}.`;

  const redFlags = [
    "Gums pale/white/blue, tongue blue",
    "Collapse, seizure >5 min or clusters",
    "Can't breathe, open-mouth breathing (cats), belly effort",
    "Swollen hard belly + retching with nothing coming up (dogs)",
    "Male cat straining with no urine",
    "Blood that won't stop after 10 min pressure, or hit by car / big fall",
    "Repeated vomiting + no poop + belly pain (possible blockage)",
    "Ate xylitol, rat bait, antifreeze, lilies (cats), grapes, large chocolate dose",
  ];

  const followUpQuestions = [
    "Is your pet breathing normally right now? Count breaths per minute at rest.",
    "What color are the gums — pink, pale, white or blue?",
    "Eating, drinking and toileting normally in the last 12 hours?",
    "Any access to trash, new food, plants, chemicals or medicines?",
    "Vaccinated + on flea/worm prevention? Any recent travel or boarding?",
  ];

  return {
    level,
    score,
    headline: headlines[level],
    summary,
    possibleCauses,
    immediateActions,
    homeCare,
    seeVetWhen: seeVet[level],
    redFlags,
    followUpQuestions,
  };
}

/* ---------- Poison & food safety DB ---------- */
export interface PoisonItem {
  name: string;
  species: string;
  danger: "emergency" | "high" | "moderate" | "low";
  toxicDose: string;
  signs: string;
  action: string;
}

export const POISON_DB: PoisonItem[] = [
  { name: "Chocolate (dark/baking)", species: "dogs, cats", danger: "high", toxicDose: "~20mg theobromine/kg = mild; >40mg/kg = ER. 50g dark choc can poison a 10kg dog.", signs: "Vomiting, restlessness, fast heart, tremors/seizures 6–12h later.", action: "Note type + grams + weight + time. Call vet NOW — may induce vomiting + charcoal within 2h." },
  { name: "Xylitol (sugar-free gum, peanut butter)", species: "dogs", danger: "emergency", toxicDose: ">0.1g/kg = hypoglycemia; >0.5g/kg = liver failure. 1 gum stick can kill a small dog.", signs: "Vomiting, wobble, collapse 30min–12h.", action: "EMERGENCY — vet immediately even if acting normal. Bring wrapper." },
  { name: "Grapes / raisins / sultanas", species: "dogs, cats", danger: "emergency", toxicDose: "No safe dose — even 1 grape has caused kidney failure.", signs: "Vomiting, no pee, lethargy 12–48h later.", action: "ER within 2h — vet may induce vomiting + IV fluids 48h." },
  { name: "Onion / garlic / leek", species: "dogs, cats", danger: "high", toxicDose: ">5g/kg onion or long-term garlic powder.", signs: "Pale gums, weakness, dark urine 2–5 days later (red-cell damage).", action: "Call vet — blood test needed; may need oxygen/transfusion if severe." },
  { name: "Lilies (all parts + vase water)", species: "cats", danger: "emergency", toxicDose: "Even pollen lick = kidney failure in cats.", signs: "Drooling, vomiting, then no pee 24–72h.", action: "ER NOW — wash pollen off fur, bring flower. Hours matter." },
  { name: "Paracetamol / acetaminophen", species: "cats (deadly), dogs", danger: "emergency", toxicDose: "Cats: 1 tablet can be fatal. Dogs: >75mg/kg.", signs: "Brown/blue gums, swelling face, breathing trouble.", action: "ER immediately — antidote (NAC) works early. Never give at home." },
  { name: "Ibuprofen / naproxen", species: "dogs, cats", danger: "emergency", toxicDose: "Dogs >25mg/kg = stomach/kidney damage.", signs: "Vomiting blood, black stool, no pee, seizures.", action: "ER — do NOT give more. Bring box + dose." },
  { name: "Rat bait / anticoagulant", species: "all", danger: "emergency", toxicDose: "Even licking can poison; relay via dead mice.", signs: "Bleeding gums, bruises, coughing blood 2–5 days later.", action: "ER with the bait box — vitamin K antidote, needs weeks of treatment." },
  { name: "Antifreeze (ethylene glycol)", species: "dogs, cats", danger: "emergency", toxicDose: "1 tsp can kill a cat; 1 tbsp per 5kg can kill a dog.", signs: "Drunk wobble then 'better' then kidney failure 24–72h.", action: "ER within hours — antidote only works early." },
  { name: "Permethrin spot-on (dog flea product on cats)", species: "cats", danger: "emergency", toxicDose: "Any dog spot-on on a cat.", signs: "Twitching, drooling, seizures.", action: "Wash off with dish soap + warm water, wrap warm, ER NOW." },
  { name: "Macadamia nuts", species: "dogs", danger: "moderate", toxicDose: "~2g/kg causes signs.", signs: "Wobbly back legs, vomiting, fever.", action: "Vet same day — usually recovers 24–48h with care." },
  { name: "Cooked bones", species: "dogs, cats", danger: "high", toxicDose: "Splinters can perforate gut.", signs: "Choking, drooling, vomiting blood, belly pain.", action: "Don't induce vomiting for sharp bones. Vet now — may need X-ray." },
  { name: "Milk / dairy (large amounts)", species: "cats, dogs", danger: "low", toxicDose: "Most adults are lactose intolerant.", signs: "Soft stool, gas.", action: "Monitor at home; offer water + bland food." },
  { name: "Alcohol / cannabis edibles", species: "all", danger: "high", toxicDose: "Small amounts depress nervous system.", signs: "Wobble, dribbling urine, slow heart, coma.", action: "Keep warm/quiet, vet urgently — be honest about what was eaten, no judgment." },
];

export function searchPoison(query: string): PoisonItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return POISON_DB.slice(0, 8);
  return POISON_DB.filter((p) =>
    (p.name + " " + p.species + " " + p.signs).toLowerCase().includes(q)
  );
}

/* ---------- AI chat responder ---------- */
export interface ChatMsg {
  role: "user" | "assistant";
  text: string;
}

const CHAT_PATTERNS: { keys: string[]; reply: (species: string) => string }[] = [
  {
    keys: ["breath", "pant", "wheez", "asthma", "chok"],
    reply: (s) => `Breathing trouble in ${s}s is always urgent. 🌬️ Check gums now — pink is good, pale/white/blue = ER. Count resting breaths: over 40/min, open-mouth breathing in cats, or belly effort means go to the emergency vet NOW. Keep your pet still in cool air, no food/water force, and film 20 seconds of breathing for the vet. Want me to run the full AI triage for this?`,
  },
  {
    keys: ["seizure", "fit", "twitch", "shake", "tremor", "convuls"],
    reply: () => `For seizures: time it ⏱️, dim lights, clear space, NEVER put hands near the mouth. If it lasts >5 minutes, clusters, or your pet can't stand/breathe right after — that's an ER emergency. Film it if safe. After: dark quiet room, no food until fully alert. How long did it last, and is your pet responsive now?`,
  },
  {
    keys: ["vomit", "throw", "puke", "retch"],
    reply: (s) => `Vomiting in ${s}s: withhold food 6–12h for adults (not puppies/kittens), small sips of water. 🚩 ER if: blood, >3× in 24h, belly pain/swelling, can't keep water down, lethargy, or ate something sharp/toxic. Then bland diet 2–3 days (boiled chicken + rice). Did anything go missing (socks, toys) or any trash access?`,
  },
  {
    keys: ["diarrhea", "diarrhoea", "soft stool", "runny poo", "bloody stool"],
    reply: () => `Diarrhea: hydration is key — gums should be moist, skin should snap back. Offer bland food + 1 tsp plain pumpkin per 5kg. 🚩 Vet within 24h if bloody/black, + vomiting, lethargy, or a puppy <4 months (parvo risk). Save a fresh stool sample for testing. Is there blood, and is your pet still drinking?`,
  },
  {
    keys: ["not eat", "won't eat", "wont eat", "appetite", "refus", "anorexia"],
    reply: (s) => s === "cat" ? `Cats can't fast! ⚠️ No food >24h risks fatty liver — vet same day. Try warmed tuna water/chicken, check mouth sores/teeth. Any vomiting, hiding or yellow gums? Tell me and I'll escalate.` : `Appetite loss: try warmed smelly food, check teeth/mouth. If skipping 2+ meals + lethargy/vomiting → vet within 24h. Puppies + rabbits deteriorate faster — rabbits with no poop 8–12h = ER. How long since last meal?`,
  },
  {
    keys: ["chocolate", "xylitol", "grape", "raisin", "onion", "garlic", "poison", "ate something", "toxic", "rat bait", "antifreeze", "lily", "paracetamol", "ibuprofen"],
    reply: () => `Possible poisoning — act fast ☠️ Tell me: WHAT exactly, HOW MUCH (grams), WHEN, and pet WEIGHT. Do NOT induce vomiting unless a vet says so (some toxins burn worse). Bring the wrapper/box. Xylitol, rat bait, antifreeze, lilies in cats = ER NOW even if acting normal. What did your pet eat?`,
  },
  {
    keys: ["pee", "urine", "bladder", "uti", "blood in urine", "straining"],
    reply: () => `Urinary signs: frequent squats, small/crying pees, pink urine. 🚨 Male cat with NO urine + crying = blocked bladder — fatal in 24–48h, ER NOW. Otherwise vet within 24h for urinalysis. More wet food + water fountains help. Is your pet producing urine at all?`,
  },
  {
    keys: ["limp", "leg", "paw", "fracture", "sprain"],
    reply: () => `Limping: rest 24–48h, check pads/nails/between toes for thorns. ⚠️ Never give ibuprofen or paracetamol — both can kill pets. Cold compress 10 min for fresh swelling. ER if leg dangles, bone exposed, or after car accident. Is your pet bearing any weight on it?`,
  },
  {
    keys: ["itch", "scratch", "flea", "hot spot", "rash", "lick"],
    reply: () => `Itching: flea-check by combing over white paper (black specks → red = fleas 🪳). E-collar to stop chewing, lukewarm oatmeal rinse. Vet if raw/bleeding, hair loss, or ear smell/head tilt. Monthly prevention is the real fix. Any redness between paws or belly?`,
  },
  {
    keys: ["eye", "squint", "discharge", "red eye", "cloudy"],
    reply: () => `Eyes worsen fast 👁️ E-collar on, no rubbing, saline rinse gently. Urgent vet <24h for squinting, cloudy/blue eye, bulging or injury. Never use human steroid drops. Which eye, and what color is the discharge?`,
  },
  {
    keys: ["bloat", "swollen belly", "hard belly", "retching", "can't vomit"],
    reply: () => `Swollen hard belly + retching with nothing coming up in a dog = suspected bloat/GDV 🚨 — fatal in 1–2 hours. Drive to ER NOW, no food/water/home remedies. Call ahead. How big is your dog and when did the belly swell?`,
  },
  {
    keys: ["vaccine", "vaccin", "deworm", "flea", "spay", "neuter", "microchip"],
    reply: () => `Prevention 💉: puppies/kittens get core shots every 3–4 weeks until 16 weeks, then boosters; adults yearly-ish per lifestyle. Monthly flea/tick + deworming per vet. Mild sleepiness 24h post-shot is normal; face swelling/vomiting = allergy → vet. How old is your pet and what's the last shot date?`,
  },
  {
    keys: ["cost", "price", "how much", "book", "appointment", "vet near", "video"],
    reply: () => `You can see a real licensed vet right here! 🩺 Go to “Find a Vet” — video visits from ~$25, most vets online today with 4.8★+ ratings. For emergencies always go in-person. Want help picking: tell me species + issue and I'll suggest the right specialty.`,
  },
  {
    keys: ["rabbit", "bunny", "gi stasis", "no poop"],
    reply: () => `Rabbits are fragile 🐰 No eating + no poops 8–12h + hunched = GI stasis EMERGENCY. Keep warm, offer hay + water, gentle belly massage, and get to a rabbit-savvy vet NOW. What are the poops like and when did your bunny last eat?`,
  },
  {
    keys: ["bird", "parrot", "feather"],
    reply: () => `Birds hide illness 🦜 Fluffed + sleepy + bottom-of-cage + tail-bobbing = sick bird = vet same day (they crash fast). Keep warm (28–30°C), quiet, food/water close. Any discharge, sneezing or change in droppings?`,
  },
  {
    keys: ["hamster", "guinea pig", "gerbil", "mouse", "rat "],
    reply: () => `Small pets crash fast 🐹 Wet tail (hamsters), not eating 12h, cold + lethargic, or breathing clicks = same-day exotic vet. Keep warm (a towel-wrapped bottle of warm water nearby), offer favorite food + water. Guinea pigs must NEVER fast — no food 12h = emergency. What signs are you seeing?`,
  },
  {
    keys: ["horse", "pony", "colic", "foal"],
    reply: () => `Horses: pawing, rolling, looking at flanks, no droppings, not eating = possible COLIC 🐴 — call your equine vet NOW, remove feed (leave water), walk gently if safe, do NOT let them roll violently. Note gum color + gut sounds + temperature if trained. How long since last droppings?`,
  },
  {
    keys: ["fish", "aquarium", "tank"],
    reply: () => `Fish health = water health 🐠 Gasping at surface, white spots (ich), fin rot, or sudden deaths → test water NOW: ammonia + nitrite must be 0, check temperature + filter. Do a 25–30% water change with dechlorinated water today. What are your water parameters and how many fish are affected?`,
  },
  {
    keys: ["turtle", "tortoise", "shell"],
    reply: () => `Turtles 🐢 Soft/smelly shell patches, swollen eyes, bubbles from nose, or not basking = vet needed this week (shell rot + respiratory infections worsen slowly then fast). Check: basking spot 30–35°C, UVB bulb under 12 months old, clean water. What does the shell look like?`,
  },
  {
    keys: ["hi", "hello", "hey", "salam", "morning"],
    reply: (s) => `Hey! I'm Dr. Paw — your AI first-response vet 🐾 I handle the scary first minutes: triage urgency, first-aid steps, poison checks, and when to rush to a real vet. Tell me species (${s}), symptoms + how long — e.g. “dog vomiting 3 times since morning”. What's going on with your buddy?`,
  },
];

const FALLBACKS = [
  "Got it — to triage safely I need 3 things: species + main symptom + how long it's going on. E.g. “cat sneezing + runny eyes, 2 days”. Can you share those? Meanwhile: check gums (pink=good), breathing, appetite and toilet in the last 12h.",
  "Thanks — I'm noting that. 🩺 Quick safety sweep: any collapse, blue/pale gums, trouble breathing, blood, swollen belly, seizure, or toxin eaten? If YES to any, that's ER now. If no, tell me appetite + energy + poop/pee today and I'll guide next steps.",
  "Understood. Keep your pet calm, warm and observed — no human meds (ibuprofen/paracetamol are dangerous). If you can: photo/video the symptom, note food + toilet + last 24h changes. What changed right before this started — food, walk, new plant, other animals?",
];

export function chatReply(history: ChatMsg[], species = "dog"): string {
  const last = history.filter((m) => m.role === "user").pop()?.text.toLowerCase() ?? "";
  if (!last) return "Tell me what's happening with your pet — species, symptom and duration. 🐾";
  // emergency fast-path
  const emergKeys = ["collapse", "can't breathe", "cant breathe", "not breathing", "blue", "seizure over", "hit by car", "bleeding a lot", "no urine"];
  if (emergKeys.some((k) => last.includes(k))) {
    return `🚨 That sounds like an EMERGENCY — don't wait on chat. Keep your pet still/warm, call your nearest ER vet now and head there. If you tell me your city I can suggest what to say on the call. After you're safe, come back and I'll help with aftercare + questions for the vet.`;
  }
  for (const p of CHAT_PATTERNS) {
    if (p.keys.some((k) => last.includes(k))) return p.reply(species);
  }
  // toxin dose helper
  if (last.includes("kg") || last.includes("gram") || last.includes("mg")) {
    return `Thanks for the details — dosing matters a lot. ⚖️ For toxins I need: exact product + grams eaten, time eaten, and pet weight. General rule: chocolate/xylitol/grapes/lilies/rat bait = treat as ER until a vet doses it out. Call your vet with those 3 numbers now — want me to draft exactly what to say?`;
  }
  const userCount = history.filter((m) => m.role === "user").length;
  return FALLBACKS[userCount % FALLBACKS.length];
}

export const DURATION_OPTIONS = ["Just now (<1 hour)", "Today", "1–2 days", "3–7 days", "More than a week", "Ongoing / chronic"];
export const SPECIES_OPTIONS = ["dog", "cat", "rabbit", "bird", "hamster", "reptile", "horse", "turtle", "fish", "other"];
