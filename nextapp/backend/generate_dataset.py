"""
Synthetic Dataset Generator for AI-Based Fake News Detection System.
Creates a balanced labeled dataset for model training and testing.
Uses diverse real/fake news patterns representative of actual datasets.
"""

import os
import sys
import random
import pandas as pd
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

random.seed(42)
np.random.seed(42)

# --- Real news patterns ---
REAL_TEMPLATES = [
    "Scientists at {uni} published findings in {journal} showing {discovery}.",
    "The {country} government announced a new {policy} policy aimed at {goal}.",
    "Stock markets rallied on {day} after {company} reported quarterly earnings of {amount}.",
    "A new study by {org} found that {fact} among adults aged {age_range}.",
    "Health officials confirmed {number} new cases of {disease} in {region}.",
    "The {sport} championship ended with {team} defeating {opponent} {score}.",
    "Researchers at {uni} developed a new {tech} technology that could {benefit}.",
    "The Federal Reserve announced interest rates would remain at {rate}% following its meeting.",
    "Local authorities in {city} reported a significant decline in crime rates after {action}.",
    "Climate scientists warn that {stat} of Arctic ice has melted compared to {year} levels.",
    "The World Health Organization issued new guidelines for {disease} prevention and treatment.",
    "Economic data released by the Bureau of Statistics shows {metric} rose by {pct}% in Q3.",
    "A bipartisan group of senators introduced legislation to address {issue} affecting millions.",
    "Tech giant {company} unveiled its latest {product}, which features {feature_list}.",
    "Environmental groups praised the new {country} carbon emissions reduction plan.",
    "Hospital admissions fell {pct}% following the introduction of {treatment} protocols.",
    "The United Nations Security Council voted {votes}-{against} to extend peacekeeping mission in {region}.",
    "Meteorologists predict an unusually severe {season} season due to climate patterns.",
    "A peer-reviewed study in {journal} confirms the efficacy of {treatment} in treating {condition}.",
    "The {sport} team from {city} secured their third consecutive regional title on {day}.",
    "Government auditors found that {dept} department exceeded its budget by {pct}%.",
    "{company} shares rose {pct}% after announcing merger talks with {partner}.",
    "Public health data confirms that vaccination coverage has reached {pct}% in {region}.",
    "The central bank raised the benchmark interest rate by {basis_pts} basis points today.",
    "An independent panel reviewed the findings and confirmed the research methodology was sound.",
]

REAL_FILLS = {
    'uni': ['MIT', 'Harvard University', 'Stanford University', 'Oxford University', 'Johns Hopkins'],
    'journal': ['Nature', 'The Lancet', 'Science', 'JAMA', 'Cell', 'NEJM'],
    'discovery': ['a direct link between sleep quality and cognitive function',
                  'new enzyme pathways in cellular metabolism',
                  'evidence of ancient water activity on Mars',
                  'a correlation between air pollution and neurological disorders'],
    'country': ['Germany', 'Japan', 'Canada', 'Australia', 'France', 'South Korea', 'United Kingdom'],
    'policy': ['renewable energy', 'education reform', 'healthcare', 'housing', 'immigration'],
    'goal': ['reduce carbon emissions', 'improve public welfare', 'stimulate economic growth'],
    'company': ['Apple', 'Microsoft', 'Toyota', 'Samsung', 'Amazon', 'Volkswagen', 'BP'],
    'amount': ['$4.2 billion', '$1.8 billion', '$6.7 billion', '$920 million', '$3.1 billion'],
    'org': ['CDC', 'WHO', 'NIH', 'RAND Corporation', 'Pew Research Center'],
    'fact': ['regular exercise reduces heart disease risk by 30%',
             'screen time among teenagers has increased significantly',
             'sleep deprivation affects workplace productivity',
             'dietary fiber intake reduces colon cancer risk'],
    'age_range': ['18–35', '35–54', '55–74', '25–64'],
    'number': ['142', '87', '2,340', '15', '673', '4,100'],
    'disease': ['influenza', 'COVID-19', 'dengue fever', 'measles', 'tuberculosis'],
    'region': ['Southeast Asia', 'the Pacific Northwest', 'sub-Saharan Africa',
               'Western Europe', 'Latin America', 'the Gulf states'],
    'sport': ['football', 'basketball', 'tennis', 'cricket', 'rugby union'],
    'team': ['the Riverside Falcons', 'United City FC', 'the Northern Eagles', 'Eastside Lions'],
    'opponent': ['the Coastal Tigers', 'Western FC', 'Southside United', 'Metro Athletic'],
    'score': ['3–1', '2–0', '4–2', '1–0', '28–14 points'],
    'tech': ['battery storage', 'water purification', 'solar cell', 'semiconductor', 'AI diagnostic'],
    'benefit': ['cut manufacturing costs in half', 'double energy efficiency',
                'detect diseases 20 years earlier', 'reduce carbon footprints by 40%'],
    'rate': ['5.25', '4.75', '5.50', '3.00', '2.50'],
    'city': ['Chicago', 'Berlin', 'Toronto', 'Sydney', 'Amsterdam', 'Seoul', 'London'],
    'action': ['community policing initiatives', 'investment in social services',
               'improved street lighting programs', 'youth outreach campaigns'],
    'stat': ['40%', '18%', '27%', '12%'],
    'year': ['1990', '2000', '2005', '2010'],
    'metric': ['consumer confidence', 'manufacturing output', 'retail sales', 'employment figures'],
    'pct': ['3.4', '7.2', '12.5', '5.1', '8.0', '2.9', '15.3', '0.6'],
    'issue': ['student loan debt', 'access to clean water', 'veteran mental health',
              'rural broadband access', 'pharmaceutical pricing'],
    'product': ['smartphone', 'electric vehicle', 'AI platform', 'smart watch', 'cloud service'],
    'feature_list': ['improved battery life, 5G connectivity, and enhanced AI capabilities',
                     'a new chip architecture and advanced camera system',
                     'voice recognition, real-time translation, and health monitoring'],
    'season': ['hurricane', 'wildfire', 'drought', 'flooding', 'winter storm'],
    'treatment': ['mRNA vaccine', 'monoclonal antibody therapy', 'gene therapy', 'immunotherapy'],
    'condition': ['late-stage cancer', 'Type 2 diabetes', 'Alzheimer\'s disease', 'rheumatoid arthritis'],
    'dept': ['Defense', 'Education', 'Health', 'Infrastructure', 'Housing'],
    'partner': ['Siemens AG', 'Lockheed Martin', 'TSMC', 'Alphabet', 'Stellantis'],
    'basis_pts': ['25', '50', '75'],
    'day': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    'votes': ['13', '12', '14'],
    'against': ['2', '1', '3'],
}

# --- Fake news patterns ---
FAKE_TEMPLATES = [
    "BREAKING: {celebrity} ARRESTED for {crime} — mainstream media REFUSES to report!",
    "Scientists HIDE evidence that {product} CURES {disease} to protect Big Pharma profits!",
    "{politician} CAUGHT secretly meeting with {enemy} — TREASON confirmed by insider!",
    "SHOCKING: Government plans to {conspiracy} by {date} — whistleblower exposes everything!",
    "The {agency} has been {action} for years — here's the proof they DON'T want you to see!",
    "New 5G towers are {harm}! Your family is in IMMEDIATE danger — share before deleted!",
    "{country} military has INVADED {other_country} and the UN is covering it up RIGHT NOW!",
    "EXPOSED: {product} causes {condition} in {pct}% of users — recall SUPPRESSED!",
    "{company} CEO admits in leaked tape that {scandal} — STOCK will COLLAPSE tomorrow!",
    "ALERT: The deep state is planning a FALSE FLAG attack on {location} this {timeframe}!",
    "Doctors BANNED from revealing that {remedy} eliminates {disease} in just {days} days!",
    "{politician} has a SECRET {fact} that the globalists DON'T WANT YOU TO KNOW!",
    "URGENT: New law will {right} — sign the petition or lose your freedom FOREVER!",
    "HUNDREDS of {profession}s are dying after receiving {product} — media BLACKOUT in effect!",
    "World leaders met in SECRET to plan {event} — leaked documents PROVE it!",
    "Scientists ADMIT moon landing was FAKED to distract from {conspiracy}!",
    "CHEMTRAILS confirmed: Government sprays {chemical} to make people {effect}!",
    "{famous_person} EXPOSES {institution} in bombshell interview immediately CENSORED!",
    "URGENT RECALL: {brand} found to contain {dangerous_substance} linked to {harm2}!",
    "The {election} results were RIGGED using {method} — patriot insiders blow the whistle!",
    "MIRACLE CURE: Eating {food} every day REVERSES {disease} — doctors FURIOUS!",
    "{country} building MASSIVE secret military base on {location2} satellite images prove!",
    "LEAKED: {politician} said '{fake_quote}' on hot mic — this will END their career!",
    "Thousands of {profession}s sign secret petition demanding {product} be IMMEDIATELY BANNED!",
    "CONFIRMED: {agency} uses {tech} to spy on every citizen 24/7 without a warrant!",
]

FAKE_FILLS = {
    'celebrity': ['Hollywood actor', 'Pop star', 'NBA superstar', 'Famous rapper',
                  'Oscar-winning actress', 'Famous YouTuber'],
    'crime': ['human trafficking', 'fraud worth $50 billion', 'espionage', 'bribery',
              'orchestrating a global cover-up', 'tax evasion on a massive scale'],
    'product': ['common vitamin D supplements', 'tap water', 'certain coffee brands',
                'organic vegetables', '5G smartphones', 'COVID vaccine'],
    'disease': ['cancer', 'autism', 'diabetes', 'Alzheimer\'s', 'AIDS', 'all known viruses'],
    'politician': ['A senior senator', 'The Vice President', 'A top cabinet member',
                   'A prominent governor', 'A leading party figure'],
    'enemy': ['Chinese intelligence agents', 'Russian oligarchs', 'globalist bankers',
              'a secret shadow government', 'foreign adversaries'],
    'conspiracy': ['microchip the entire population', 'introduce mandatory global currency',
                   'stage a new pandemic', 'ban private property', 'eliminate cash'],
    'date': ['2025', 'next spring', 'by the end of this year', 'before the next election'],
    'agency': ['CDC', 'FBI', 'CIA', 'the Fed', 'FDA', 'WHO', 'NSA'],
    'action': ['poisoning the water supply', 'running a mind control program',
               'faking global statistics', 'suppressing free energy technology'],
    'harm': ['causing brain cancer', 'making people infertile',
             'activating nanobots injected via vaccines', 'suppressing your immune system'],
    'country': ['China', 'Russia', 'North Korea', 'Iran', 'the US government'],
    'other_country': ['Taiwan', 'Ukraine', 'France', 'Australia', 'Germany'],
    'condition': ['permanent liver damage', 'memory loss', 'DNA mutation',
                  'infertility', 'autoimmune disorders'],
    'pct': ['67', '93', '78', '52', '81', '45'],
    'company': ['Big Tech giant', 'Top pharmaceutical company', 'A major social media platform'],
    'scandal': ['they\'ve been selling user data to foreign governments for years',
                'the product doesn\'t actually work and they\'ve known for decade',
                'their profits fund a global shadow organization'],
    'location': ['major US city', 'European capital', 'financial district', 'global summit'],
    'timeframe': ['weekend', 'week', 'month', 'holiday season'],
    'remedy': ['baking soda', 'lemon juice with turmeric', 'hydroxychloroquine',
               'raw garlic', 'a specific herbal tea'],
    'days': ['3', '7', '14', '5', '10'],
    'fact': ['bank account in the Cayman Islands',
             'criminal past that has been erased from public records',
             'connection to a notorious crime syndicate',
             'second family no one knows about'],
    'right': ['ban the Second Amendment permanently',
              'make all speech subject to government approval',
              'force everyone to take experimental injections',
              'eliminate small businesses'],
    'profession': ['nurses', 'doctors', 'pilots', 'athletes', 'teachers'],
    'event': ['a controlled global economic collapse', 'mass surveillance rollout',
              'worldwide lockdown', 'a staged alien invasion'],
    'chemical': ['lithium', 'experimental nanobots', 'psychotropic agents',
                 'fluoride compounds', 'aluminum oxide'],
    'effect': ['more compliant and docile', 'unable to resist authority',
               'infertile within a generation', 'dependent on government'],
    'famous_person': ['Elon Musk', 'A world-famous whistleblower', 'A former CDC director',
                      'A Nobel Prize scientist', 'A famous author'],
    'institution': ['the World Economic Forum', 'Big Pharma', 'mainstream media',
                    'the deep state', 'globalist organizations'],
    'brand': ['Popular cereal brand', 'Widely-used sunscreen', 'Best-selling pain reliever',
              'Famous energy drink', 'Common antacid'],
    'dangerous_substance': ['arsenic', 'formaldehyde', 'mercury', 'lead compounds',
                            'cancer-causing nanoparticles'],
    'harm2': ['sudden cardiac arrest', 'permanent blindness', 'neurological damage',
              'leukemia in children', 'kidney failure'],
    'election': ['2020 US presidential', '2024 national', 'recent European',
                 'last regional', 'gubernatorial'],
    'method': ['hacked voting machines', 'ballot stuffing', 'AI-generated fake votes',
               'secret algorithm manipulating tallies'],
    'food': ['raw onions', 'apple cider vinegar', 'coconut oil', 'turmeric shots',
             'celery juice', 'raw honey'],
    'location2': ['the Moon', 'a remote Pacific island', 'Antarctica', 'the Arctic', 'Mars'],
    'fake_quote': ['We don\'t need elections anymore, we need a new world order',
                   'The people are too stupid to understand what we\'re doing for them',
                   'COVID was the best thing to happen to us as a party'],
    'tech': ['AI facial recognition', 'quantum surveillance satellites',
             'smart TV cameras', '5G towers', 'weather control technology'],
}


def fill_template(template: str, fills: dict) -> str:
    """Fill a template string with random choices from fill dict."""
    result = template
    for key, options in fills.items():
        placeholder = '{' + key + '}'
        if placeholder in result:
            result = result.replace(placeholder, random.choice(options), 1)
    return result


def generate_dataset(n_real: int = 10000, n_fake: int = 10000) -> pd.DataFrame:
    """Generate a balanced synthetic dataset of real/fake news samples."""
    records = []
    article_id = 1

    # Generate REAL news
    for _ in range(n_real):
        template = random.choice(REAL_TEMPLATES)
        text = fill_template(template, REAL_FILLS)

        # Add extra sentences for variety
        extra_templates = random.sample(REAL_TEMPLATES, k=min(3, len(REAL_TEMPLATES)))
        extras = [fill_template(t, REAL_FILLS) for t in extra_templates]
        full_text = text + ' ' + ' '.join(extras)

        records.append({
            'id': article_id,
            'title': text[:120],
            'text': full_text,
            'label': 0,  # REAL
            'label_text': 'REAL'
        })
        article_id += 1

    # Generate FAKE news
    for _ in range(n_fake):
        template = random.choice(FAKE_TEMPLATES)
        text = fill_template(template, FAKE_FILLS)

        extra_templates = random.sample(FAKE_TEMPLATES, k=min(3, len(FAKE_TEMPLATES)))
        extras = [fill_template(t, FAKE_FILLS) for t in extra_templates]
        full_text = text + ' ' + ' '.join(extras)

        records.append({
            'id': article_id,
            'title': text[:120],
            'text': full_text,
            'label': 1,  # FAKE
            'label_text': 'FAKE'
        })
        article_id += 1

    df = pd.DataFrame(records)
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    print(f"Generated dataset: {len(df)} records "
          f"({sum(df.label==0)} REAL, {sum(df.label==1)} FAKE)")
    return df


if __name__ == '__main__':
    output_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'news_dataset.csv'
    )
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df = generate_dataset(n_real=10000, n_fake=10000)
    df.to_csv(output_path, index=False)
    print(f"✅ Dataset saved to: {output_path}")
