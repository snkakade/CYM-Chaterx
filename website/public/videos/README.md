# Runtime video manifest

This directory contains only video files used by the current application. Original supplied footage is retained in the ignored repository-level `source-assets/videos/` directory.

| Runtime file | Live use |
| --- | --- |
| `charterx-sailing-hero-uhd.mp4` | Home and Revenue Growth heroes |
| `charterx-city-yacht-uhd.mp4` | OTA Management hero |
| `charterx-marina-uhd.mp4` | About hero |
| `charterx-yacht-aerial-uhd.mp4` | Services hero |
| `charterx-yacht-wake-uhd.mp4` | Digital Marketing and Contact heroes |
| `charterx-ocean-texture-uhd.mp4` | Sales Support and Insights heroes |
| `charterx-sailing.mp4` | Digital Marketing supporting film |
| `charterx-yacht-aerial.mp4` | OTA Management supporting film |
| `charterx-yacht-wake.mp4` | Revenue Growth supporting film |
| `charterx-ocean-texture.mp4` | About supporting film |

Hero routes intentionally use the highest-quality local delivery. Supporting films use smaller H.264 MP4 deliveries to limit below-the-fold transfer cost. Every video has an image fallback, honours reduced-motion preferences where controlled by `AmbientVideo`, and remains muted and plays inline.

Third-party source films are covered by the [Pexels licence](https://www.pexels.com/license/). Replace third-party footage with CharterX-owned masters when approved.
