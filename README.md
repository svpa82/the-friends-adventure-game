# Vännerna – Äventyrsspelet 🐾

Ett litet plattformsspel för mobilen, gjort för (och delvis av!) Mimmi & Caisa.
Välj ett husdjur, ta dig genom hoppbanor, samla godsaker, undvik faror och
hämta det gyllene priset i mål.

🎮 **Spela:** https://svpa82.github.io/the-friends-adventure-game

## Djuren

| Djur | Sort | Rädd för | Pris i mål |
|------|------|----------|------------|
| **Nala** | Hamster | Katt, kvast | Solrosfrön |
| **Pompom** | Katt | Dammsugare, vattenpöl | Färsk fisk |
| **Milla** | Hund | Män med keps, torrfoder | Blötfoder |

## Så funkar det

- **3 hjärtan** per bana. Går du på en fara eller ramlar i ett hål tappar du ett hjärta.
- Tar hjärtana slut får du börja om banan.
- **Godsaker** på banan blir **coins**.
- Coins köps ut mot **accessoarer** i butiken (rosett, krona, halsduk, glasögon …).
- Klara en bana för att låsa upp nästa.

**Styrning:** Knapparna på skärmen (◀ ▶ för att gå, ⤒ för att hoppa). På dator
funkar piltangenter / WASD + mellanslag.

## Köra lokalt

```bash
npm start
# öppna sedan http://localhost:5173 i webbläsaren
```

(Ett vanligt webbserver-kommando räcker – spelet är bara statiska filer.)

## Bygga vidare

Allt innehåll är data – man behöver inte röra spelmotorn för att ändra det mesta:

- **Lägg till en bana:** kopiera ett objekt i [`js/data/levels.js`](js/data/levels.js)
  och ändra koordinaterna (plattformar, hål, godsaker, faror, mål).
- **Ändra faror/priser/accessoarer:** [`js/data/characters.js`](js/data/characters.js).
- **Byt grafiken till riktiga bilder:** lägg en PNG med **samma filnamn** som
  SVG:n i [`assets/images/`](assets/images/) (t.ex. `milla.png`) och peka om
  nyckeln i [`js/scenes/PreloadScene.js`](js/scenes/PreloadScene.js). Här kan
  dotterns egna teckningar eller AI-genererade bilder läggas in.

## Teknik

Byggt med [Phaser 3](https://phaser.io/) (laddas från CDN). Inga byggsteg –
bara statiska filer som kan ligga på GitHub Pages.
