	 	  
	 	

**DEVELOPER HANDOFF**

**Michael's Pub & Patio**

Website Build — Technical Brief & Specification

Prepared for: Michael's Pub & Patio ownership / development team

Site type: Marketing website — single-location restaurant

Primary goals: Mobile-first responsive build, strong local SEO, real business content (menu, hours, specials, catering, careers).

Current status: A working static HTML/CSS/JS prototype has been built and is included with this brief. It is functional and can be deployed as-is, but should be reviewed and productionized per the notes in this document before public launch.

# **1\. Project Overview**

Michael's Pub & Patio is a dog-friendly restaurant and bar located in a converted early-1900s home in historic downtown New Bern, NC. The site's job is simple: help nearby and visiting guests quickly find hours, location, and menu highlights; communicate the patio / dog-friendly atmosphere; and support two secondary business goals — catering inquiries and staff hiring.

## **Business Profile (NAP — keep consistent everywhere)**

| 				 Field 			 | 				 Value 			 |
| :---- | :---- |
| 				 Business 				name 			 | 				 Michael's 				Pub & Patio 			 |
| 				 Address 			 | 				 208 				Pollock St, New Bern, NC 28560 			 |
| 				 Phone 			 | 				 (252) 				631-1209 			 |
| 				 Email 			 | 				 Michaelspubandpatio23@gmail.com 			 |
| 				 Facebook 			 | 				 facebook.com/MichaelsNewBern 			 |
| 				 Instagram 			 | 				 instagram.com/michaelspubandpatio\_ 			 |
| 				 Category 			 | 				 American 				restaurant / pub, $$ 			 |

*Note: exact NAP consistency (name, address, phone formatted identically) across the website, Google Business Profile, Facebook, and any directory listings is one of the highest-leverage local SEO factors. Please confirm all four match exactly before launch.*

# **2\. Deliverable Files**

The following files are provided alongside this brief:

| 				 File 			 | 				 Purpose 			 |
| :---- | :---- |
| 				 index.html 			 | 				 Full 				site. Self-contained: all CSS and JS are inline in this one file. 			 |
| 				 robots.txt 			 | 				 Crawl 				directives \+ sitemap reference. Upload to site root. 			 |
| 				 sitemap.xml 			 | 				 Single-URL 				sitemap. Upload to site root; submit in Search Console. 			 |

**Recommended production restructure (dev's call based on hosting/stack):**

* 	  
  Extract 	the \<style\> block to /css/main.css and the \<script\> 	block to /js/main.js for cacheability.  
   	  
* Move 	Google Fonts to self-hosted files or a font-display strategy if 	eliminating an extra DNS/CDN hop is a priority.  
   	  
* If 	integrating into a CMS (WordPress, etc.) or static site generator, 	the HTML structure and class names can be lifted directly into 	templates/partials.

# **4\. Design System**

## **Color Tokens**

| 				 Token 			 | 				 Hex 			 | 				 Usage 			 |
| :---- | :---- | :---- |
| 				 \--charcoal 			 | 				 \#211D1B 			 | 				 Primary 				dark background (header, menu cards, footer) 			 |
| 				 \--charcoal-2 			 | 				 \#2B2622 			 | 				 Secondary 				dark surface (cards on dark sections) 			 |
| 				 \--cream 			 | 				 \#EDE3D0 			 | 				 Warm 				light surface / card background 			 |
| 				 \--cream-2 			 | 				 \#F6F0E3 			 | 				 Page 				background, light text on dark 			 |
| 				 \--green 			 | 				 \#445939 			 | 				 Specials 				\+ careers section background, secondary accent 			 |
| 				 \--ember 			 | 				 \#C1440E 			 | 				 Primary 				CTA / accent — spice, heat, calls-to-action 			 |
| 				 \--brass 			 | 				 \#B08D57 			 | 				 Dividers, 				borders, hardware accent 			 |
| 				 \--bulb 			 | 				 \#FFC97A 			 | 				 String-light 				glow, highlighted numerals/prices 			 |
| 				 \--ink 			 | 				 \#1B1815 			 | 				 Body 				text on light backgrounds 			 |

## **Typography**

| 				 Role 			 | 				 Typeface 			 | 				 Notes 			 |
| :---- | :---- | :---- |
| 				 Display 				/ Headlines 			 | 				 Fraunces 				(900, variable optical size) 			 | 				 Loaded 				from Google Fonts. Used for all h1–h4. 			 |
| 				 Body 				copy 			 | 				 Work 				Sans (400/500/600/700) 			 | 				 Primary 				readable text throughout. 			 |
| 				 Utility 				/ prices / labels 			 | 				 Space 				Mono (400/700) 			 | 				 Menu 				prices, eyebrow labels, hours, badges. 			 |

## **Layout**

* 	  
  Built 	mobile-first: base CSS targets small screens; layout expands via 	min-width media queries.  
   	  
* Breakpoints 	in use: 520px, 700px, 760px, 820px, 900px, 1020px.  
   	  
* Max 	content width: 1180px (--container token), centered with 1.25rem 	side padding on mobile.  
   	  
* Border 	radius token: 6px (--radius) used throughout for a consistent, 	restrained corner treatment.

# **5\. Page Structure (Section-by-Section)**

| 				 \# 			 | 				 Section (id) 			 | 				 Purpose 			 |
| :---- | :---- | :---- |
| 				 1 			 | 				 Header 				/ nav 			 | 				 Sticky 				header, logo, mobile hamburger nav, call CTA. 			 |
| 				 2 			 | 				 Hero 				(\#top) 			 | 				 Headline, 				sub-copy, 3 CTAs, live open/closed badge, quick-info strip 				(address / hours / phone). 			 |
| 				 3 			 | 				 About 				(\#about) 			 | 				 Brand 				story: historic building, dog-friendly, group seating, downtown 				location. 			 |
| 				 4 			 | 				 Specials 				(\#specials) 			 | 				 Recurring 				weekly deals: $1 Wing Sunday, Thursday Burger Buddy Lunch. 			 |
| 				 5 			 | 				 Menu 				(\#menu) 			 | 				 Tabbed 				menu: Wings & Starters / Burgers & Sandwiches / Jerk & 				From the Sea. Each dish card has an illustrated placeholder 				thumbnail (see Section 7). 			 |
| 				 6 			 | 				 Catering 				(\#catering) 			 | 				 Catering 				packages (wing trays, burger bar, taco spread, private party 				room) \+ booking CTA. 			 |
| 				 7 			 | 				 Patio 				(\#patio) 			 | 				 Three 				feature cards: dog-friendly patios, upstairs dining room, 				historic setting. 			 |
| 				 8 			 | 				 Reviews 			 | 				 Three 				paraphrased guest-sentiment cards (no verbatim review text — 				see content notes). 			 |
| 				 9 			 | 				 Careers 				(\#careers) 			 | 				 Role 				cards (servers/bartenders, kitchen, host/support) \+ apply CTA 				(mailto with pre-filled subject). 			 |
| 				 10 			 | 				 Visit 				(\#visit) 			 | 				 Full 				weekly hours table (auto-highlights today), embedded Google Map, 				call/email CTAs. 			 |
| 				 11 			 | 				 Footer 			 | 				 NAP 				recap, social links (Facebook/Instagram), sitemap-style nav 				links. 			 |

# **6\. SEO Implementation**

## **Already in place**

* 	  
  Unique 	\<title\> and meta description, written around “dog-friendly 	patio New Bern” / “downtown New Bern restaurant” intent.  
   	  
* Open 	Graph \+ Twitter Card tags for social sharing previews.  
   	  
* Canonical 	tag.  
   	  
* JSON-LD 	Restaurant structured data: name, address, geo, phone, price range, 	cuisine, opening hours, sameAs (social profiles).  
   	  
* Semantic 	HTML5: single \<h1\>, logical heading order, \<address\>, 	\<nav\>, \<main\>, \<footer\> landmarks.  
   	  
* robots.txt 	\+ sitemap.xml provided.  
   	  
* No 	render-blocking scripts; JS is minimal and deferred by placement at 	end of body.

## **Action items before / at launch**

* 	  
  Replace 	every instance of the placeholder domain (michaelspubandpatio.com) 	with the real production domain — canonical tag, Open 	Graph/Twitter image URLs, sitemap.xml \<loc\>, and the JSON-LD 	url/@id/menu fields.  
   	  
* Verify 	the JSON-LD geo coordinates (currently an approximate downtown New 	Bern estimate) against the exact building location.  
   	  
* Replace 	the og:image / twitter:image placeholder URL with a real 1200×630 	image once photography is available.  
   	  
* Add 	a full favicon set (apple-touch-icon.png, 32/16px PNGs, manifest 	icons) — the current favicon is a single inline SVG placeholder.  
   	  
* Register 	the domain in Google Search Console and submit sitemap.xml.  
   	  
* Claim/verify 	the Google Business Profile and confirm NAP matches this site 	exactly.  
   	  
* Validate 	structured data with Google's Rich Results Test after the domain 	goes live.  
   	  
* Run 	Lighthouse / PageSpeed Insights on the production build; target 90+ 	mobile performance, especially after real photography is added 	(compress and use modern formats).

# **7\. Content & Imagery Notes**

Menu items, hours, specials, and business description were sourced from Michael's public listings (Google, Yelp, DoorDash, etc.), since Facebook and Instagram both block automated access. All of it should be spot-checked against the owner's current menu and pricing before launch — prices and items may have changed.

## **Menu photography (current state: illustrated placeholders)**

Every dish card currently shows a simple line-art icon (drumstick, burger, taco, fish, etc.) on a brand-colored gradient tile, captioned “Illustrated preview · photo coming soon.” This was a deliberate choice instead of stock photography, since stock images of food never match what guests are actually served.

* 	  
  Replace 	each .dish-thumb \<svg\> block with a real \<img\> of that 	dish once photography is shot.  
   	  
* Use 	descriptive, specific alt text per image (e.g. “Jumbo fire-roasted 	chicken wings tossed in garlic parmesan sauce at Michael's Pub & 	Patio”) — this is meaningful for both accessibility and image 	search SEO.  
   	  
* Recommend 	real photos for: hero background (patio at dusk with string lights), 	About section (exterior of the historic building), Patio section 	(dogs on the patio), and all 18 menu items.  
   	  
* Serve 	images as compressed WebP with a JPEG fallback, and add explicit 	width/height attributes to prevent layout shift.

# **8\. Open Questions for the Client**

* 	  
  Final 	production domain name?  
   	  
* Should 	“Call to Order” / catering / careers stay as tel: and mailto: 	links, or should the dev build real backend forms (e.g. to log 	submissions, send confirmation emails, or integrate with a CRM)?  
   	  
* Is 	there interest in online ordering (DoorDash link, native ordering 	widget, etc.) beyond the current phone-order CTA?  
   	  
* Timeline 	for professional photography — this is the single highest-impact 	remaining upgrade.  
   	  
* Any 	analytics / marketing pixels to install (Google Analytics 4, Meta 	Pixel, call tracking number, etc.)?  
   	  
* Hosting 	preference — static host (Netlify/Vercel/S3), traditional shared 	hosting, or a CMS platform?

# **9\. Browser / Device Support & QA**

* 	  
  Built 	and tested mobile-first; verify rendering at common breakpoints: 	375px, 390px, 768px, 1024px, 1440px.  
   	  
* Test 	on iOS Safari and Android Chrome specifically — tel:/mailto: links 	and the sticky header backdrop-filter blur should be confirmed on 	both.  
   	  
* Confirm 	the live open/closed badge reflects correct local time — it 	currently uses the visitor's device clock, not a fixed timezone; 	flag if the client wants this pinned to US/Eastern regardless of 	visitor location.  
   	  
* Run 	an accessibility pass: color contrast is designed to pass WCAG AA, 	but re-check after any real photography or copy changes.  
   	  
* Test 	the Google Map embed and all tel: / mailto: links on a physical 	mobile device before launch.

*Questions on this brief can go back through the same channel this document was shared in.*  
