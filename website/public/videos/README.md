# Video sources and delivery files

The supplied source films are retained locally in the ignored `source-assets/videos/` directory. Browser delivery copies use H.264 MP4 with fast-start metadata: the highest useful supplied resolution for desktop/tablet heroes and optimized portrait or 720p deliveries for mobile heroes and below-the-fold films.

| Delivery file | Supplied source | Used for |
| --- | --- | --- |
| `charterx-sailing-hero-2k.mp4` | [Pexels 12084856](https://www.pexels.com/video/12084856/) | 2K Home hero on desktop and tablet |
| `charterx-city-yacht-hero-2k.mp4` | Supplied CharterX city-yacht film | 1440×2560 OTA hero on desktop and tablet |
| `charterx-marina-hero-hq.mp4` | Supplied CharterX marina film | Full-HD About hero on desktop and tablet |
| `charterx-yacht-aerial-hero-2k.mp4` | [Pexels 8303143](https://www.pexels.com/video/yacht-anchored-in-the-sea-8303143/) | 2K Services hero on desktop and tablet |
| `charterx-yacht-wake-hero-2k.mp4` | [Pexels 20268658](https://www.pexels.com/video/20268658/) | 2K Revenue, Digital Marketing and Contact heroes on desktop and tablet |
| `charterx-ocean-texture-hero-2k.mp4` | [Pexels 8490927](https://www.pexels.com/video/8490927/) | 2K Insights hero on desktop and tablet |
| `charterx-city-yacht-mobile.mp4` | Supplied CharterX city-yacht film | Optimized portrait OTA hero on mobile |
| `charterx-marina-mobile.mp4` | Supplied CharterX marina film | Optimized portrait About hero on mobile |
| `charterx-yacht-aerial.mp4` | [Pexels 8303143](https://www.pexels.com/video/yacht-anchored-in-the-sea-8303143/) | Mobile Services hero; Home and OTA film sections |
| `charterx-yacht-wake.mp4` | [Pexels 20268658](https://www.pexels.com/video/20268658/) | Mobile Revenue/Digital/Contact heroes; Home and Revenue film sections |
| `charterx-sailing.mp4` | [Pexels 12084856](https://www.pexels.com/video/12084856/) | Mobile Home hero and Digital Marketing film section |
| `charterx-ocean-texture.mp4` | [Pexels 8490927](https://www.pexels.com/video/8490927/) | Mobile Insights hero and About film section |

License: <https://www.pexels.com/license/>

Every implementation keeps an image poster, pauses outside the viewport, provides a visible pause/play control, and stops automatically when `prefers-reduced-motion` is enabled.

Every hero uses the highest-quality delivery justified by its source on screens wider than 899px and a corresponding optimized delivery on smaller screens. Matching WebP posters prevent a visual jump before playback begins.
