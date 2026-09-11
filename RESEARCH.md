# Kashmir Valley: research and game-world decisions

Research date: 11 September 2026. This is a design-oriented review of landscape, settlement, built heritage, livelihoods and seasonality. Sources are linked at each finding. The game is an original fictional setting, not a geographic reconstruction or a historical simulation.

## 1. Setting and landscape

**Dal Lake is a lived-in waterscape.** The tourism directorate describes a lake associated with shikaras, houseboats, floating gardens and the Zabarwan backdrop. Its importance extends beyond scenery into daily livelihoods. The game therefore places boats, verandas, a market and a walkable promenade beside the water, rather than treating it as an empty blue background. Floating gardens are not simulated in this version. [Directorate of Tourism Kashmir: Dal Lake](https://kashmirtourismofficial.com/dal-lake.html).

**The surrounding valley should contain distinct environments.** The Anantnag district description of Pahalgam associates it with evergreen-covered hills and the Lidder watercourse. This informed the conifer silhouettes and distant terrain, but Pahalgam and the Lidder are not represented as named playable locations. [District Anantnag: Pahalgam](https://anantnag.nic.in/tourist-place/pahalgam/).

**Gulmarg was considered as a second landscape reference.** Baramulla’s district website includes it among its places of interest. A separate mountain resort, ski area or gondola would need additional terrain and gameplay; those are outside this compact build and are not implied by the map. [District Baramulla: places of interest](https://baramulla.nic.in/places-of-interest/).

**Scale is deliberately compressed.** The playable map is approximately 588 × 588 game units, with road intersections every 120 units. It brings together references from different places without claiming their real distances or spatial relationships. The HUD’s Dal Lake coordinates are approximate geographic context, not a live GPS position. Temperature and late-afternoon time are decorative game values, not current weather.

## 2. Srinagar buildings and public space

**Traditional construction uses timber, brick and stone.** The National Mission on Monuments and Antiquities entry for Beg House documents a stone ground floor, timber-framed dhajji dewari upper walls with brick infill, projecting first-floor frontage and a pitched roof. This is a specific example, not a claim that every building in Kashmir has the same construction. The game translates those characteristics into stone-colored plinths, visible wood bands, brick-colored walls, repeated windows and pitched roof silhouettes. It simplifies framing and does not present the meshes as accurate structural models. [NMMA: Beg House, record 818](https://nmma.nic.in/nmma/builtDetail.do?refId=818&state=01). The indexed record was available during research; a direct open returned a server error.

**A scholarly account provides broader vernacular context.** The NED architectural journal discusses taq and dhajji dewari as different structural traditions and illustrates dense settlement along the Jhelum. This supports a timber-and-masonry visual vocabulary, while also highlighting a limitation of the build: its broad grid and detached buildings are much more open than a faithful reconstruction of dense riverfront Srinagar. [NED Journal of Research in Architecture and Planning, 2018 article](https://jrap.neduet.edu.pk/arch-journal/JRAP_2018%28FirstIssue%29/03.pdf).

**Formal gardens are organized landscapes.** Nishat Bagh’s eastern lakeshore setting, terraces, central water channel and chinars provide a recognizable design language. The game includes a small stepped garden with a straight channel and planted terraces. Its invented lakeside platform and reduced terrace count are not replicas of Nishat or Shalimar. [Directorate of Tourism Kashmir: Nishat Bagh](https://kashmirtourismofficial.com/nishat-bagh.html); [District Srinagar: historic places](https://srinagar.nic.in/tourist-place-category/historic/).

## 3. Work, craft and missions

**Craft is a substantial part of Srinagar’s identity.** UNESCO describes its handicraft and handloom traditions, artisan networks and contribution to livelihoods. Srinagar joined the Creative Cities Network in the Crafts and Folk Art field in 2021. This informs the old-town artisan delivery and the presence of everyday economic activity. The game does not claim that its generic stall models reproduce particular craft techniques. [UNESCO: Srinagar](https://www.unesco.org/en/creative-cities/srinagar).

**Pampore is a strong saffron reference.** CSIR–Indian Institute of Integrative Medicine identifies Pampore as a major concentration of saffron cultivation within the wider regional growing area. This informs the purple agricultural plots and the saffron parcel/crate jobs. Exact cultivation percentages are unnecessary for gameplay and are not treated as live statistics. [CSIR–IIIM: saffron production](https://iiim.res.in/saffron-production/).

**Seasonality matters.** SKUAST Kashmir’s saffron symposium material identifies saffron as an autumn-flowering plant with purple flowers. The game therefore uses an autumn palette rather than mixing flowering saffron with a spring tulip landscape. Its broad-canopy ochre trees are stylized chinar references, not botanical reconstructions. [SKUAST Kashmir: saffron symposium material](https://skuastkashmir.ac.in/frmPDF.aspx?FN=d04062024.pdf). Weather can shift flowering dates, as documented in a Kashmir saffron phenology study indexed by FAO; the game avoids prescribing a precise harvest date. [FAO AGRIS: impact of weather on saffron flowering](https://agris.fao.org/search/en/providers/122535/records/65df76284c5aef494fe2c8ff).

## 4. Translation into the playable build

| Researched reference | Implemented interpretation | Deliberate simplification |
| --- | --- | --- |
| Dal Lake waterscape | Teal water, moored houseboats, gently rocking shikaras, embankment | Boats are scenery; no sailing or water physics |
| Srinagar vernacular architecture | Timber bands, masonry colors, repeated lattice-like windows, pitched roofs | Simplified buildings without interiors |
| Mughal garden design | Terraces, axial channel, planted beds and trees | Small fictional garden with altered geography |
| Pampore saffron growing | Purple field rows, parcel and crate missions | No agricultural simulation or real business claims |
| Craft livelihoods | Artisan destination and market stalls | Fictional characters, payouts and transactions |
| Valley woodland and mountains | Conifers, deciduous trees, distant snow-capped silhouettes | Flat navigable terrain; mountains are background |

## 5. Fictional game systems

Vehicle handling, checkpoint races, collision-triggered heat, a pursuit car, recovery fees, mission payouts and the road grid are authored arcade mechanics. They are not assertions about the behavior of real residents or institutions. The player can drive, borrow vehicles, walk, complete deliveries, race and explore. There are no real political factions, recreated incidents or copied GTA names/assets.

All scene geometry is generated in the project. No source photographs, third-party game models or copyrighted game audio were copied. External research informed the design; it was not used as a texture library. Audio is an optional synthesized engine tone.

## 6. Limits and next research steps

This review is sufficient to ground a stylized mini-game, but it is not fieldwork. A larger release would benefit from local reviewers, licensed reference photography, accurate neighborhood layouts, detailed craft references, Kashmiri-language localization reviewed by native speakers, and locally recorded sound with permission. The current build prioritizes a cohesive valley atmosphere and readable roads over architectural or ecological completeness.
