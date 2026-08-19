# Video sources and delivery files

The supplied UHD Pexels files are retained locally in the ignored `source-assets/videos/` directory. Browser delivery copies are silent H.264 MP4 files, capped at 720p and encoded with fast-start metadata.

| Delivery file | Supplied source | Used for |
| --- | --- | --- |
| `charterx-sailing-hero-1080.mp4` | [Pexels 12084856](https://www.pexels.com/video/12084856/) | High-quality 1080p Home hero on desktop and tablet |
| `charterx-yacht-aerial.mp4` | [Pexels 8303143](https://www.pexels.com/video/yacht-anchored-in-the-sea-8303143/) | Services and About heroes; Home and OTA film sections |
| `charterx-yacht-wake.mp4` | [Pexels 20268658](https://www.pexels.com/video/20268658/) | Revenue and Contact heroes; Home and Revenue film sections |
| `charterx-sailing.mp4` | [Pexels 12084856](https://www.pexels.com/video/12084856/) | OTA hero and Digital Marketing film section |
| `charterx-ocean-texture.mp4` | [Pexels 8490927](https://www.pexels.com/video/8490927/) | Digital Marketing and Insights heroes; About film section |

License: <https://www.pexels.com/license/>

Every implementation keeps an image poster, pauses outside the viewport, provides a visible pause/play control, and stops automatically when `prefers-reduced-motion` is enabled.

The Home hero uses the 1080p sailing delivery on screens wider than 899px and the optimized 720p sailing delivery on smaller screens. Its matching poster is `public/images/hero-sailing-poster.webp`.
