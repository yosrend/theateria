# Design system

## Type

| Role | Font |
|---|---|
| Headings | Faculty Glyphic, with Cormorant Garamond and Georgia as fallbacks |
| Body and display | SF Pro Display, system fonts and Inter as fallbacks |

## Color

| Token | Value | Use |
|---|---|---|
| --bg | #FFFFFF | Page background |
| --bg3 | #E9E6E2 | Soft panels |
| --text | #1D1D1D | Body text |
| --dim | #5C5B5B | Secondary text |
| --dark | #1C1C1C | Dark sections |
| --accent | #B02E22 | Primary accent |
| --accent-hi | #8F2418 | Accent on hover |
| --gold | #8A6A1E | Gold detail |
| --on-dark | #F3EBDD | Text on dark |
| --sold | #DDD8D2 | Sold seats |

## Motion

- Headings reveal word by word from behind a mask, about 1 second with a power4 ease
- Event images open with a clip path and a slow zoom out
- Gallery tiles rise in with a stagger as they enter the viewport
- Program list rows rise in as a batch
- Everything is skipped for visitors who prefer reduced motion

## Components

- Pill buttons and a floating booking bar
- Seat tiles with four states: free, chosen, held by others (dashed), sold
- Gallery tile, square, with a viewer that has arrows, swipe and Escape to close
