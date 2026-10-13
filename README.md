# Linksniai — Lithuanian Language Tutor

A web app for learning **Lithuanian verb case government**: which case (Genitive, Dative, Accusative, Instrumental or Locative) each verb takes. It covers all 174 verbs from *Spoken Lithuanian: Verb Case Government*, the "same verb, different case" pairs, and the negation rule.

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

It also works as-is on GitHub Pages. Progress is stored in the browser's `localStorage`.

## Course structure

15 lessons across 5 levels. Each lesson unlocks when the previous one is complete.

| Level | Lessons |
|---|---|
| A1 · Pradžia | 1 Accusative basics · 2 Locative basics |
| A2 · Kasdienybė | 3 Genitive I · 4 Dative I · 5 Home and daily life |
| B1 · Pasaulis | 6 Instrumental I · 7 The negation rule · 8 Dative II · 9 Work and plans · 10 Life stories |
| B2 · Gylis | 11 Genitive II · 12 Dative III · 13 Instrumental II · 14 Same verb, different case |
| C1 · Meistrystė | 15 Mastery challenge (all 174 verbs, interleaved) |

Every lesson has six steps: **Goals** (can-do statements), **Discover** (explanation, case colours, endings table), **Learn** (flip cards), **Practice** (6 mixed exercise types), **Converse** (role-play dialogue with choice and typed turns, then shadowing), and **Reflect** (self-rating against the goals).

## Research-based features

- Spaced repetition (Leitner boxes: 1, 3, 7, 14, 30, 60 days) in the **Review** tab
- Retrieval practice, interleaving, and explained corrective feedback, with missed items repeated at the end of each round
- Noticing: each case has its own colour, plus a "tap the governed word" exercise
- Pushed output: typed answers with an on-screen keyboard for ą č ę ė į š ų ū ž
- Interaction: a role-play conversation in every lesson
- Mastery learning: 70% in Practice plus a finished conversation to unlock the next lesson
- Listening and shadowing: text-to-speech at normal or slow speed, and speech recognition where the browser supports it

The **Why it works** page in the app lists the studies behind each feature.

## Files

- `index.html` — page shell
- `css/styles.css` — styles, light and dark themes
- `js/data.js` — verbs, lessons, dialogues, research notes
- `js/app.js` — app logic

## Corrections to the source document

- *stokoti*: "Jam stokoja patirties" → **Jis stokoja patirties** (or impersonal *Jam stinga patirties*)
- *virti*: past tense "Virau" → **Viriau**
- *leisti* (spend): "Leidžiu daug pinigų" shows the Genitive (because of *daug*); the Accusative example is now **Leidžiu pinigus drabužiams**
- *tikėti*: "Tikiu draugo žodžiais" uses the Instrumental, not the Dative; the Dative example is now **Aš tau tikiu** ("I believe you")
