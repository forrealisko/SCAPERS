"use client";

/**
 * SVGDivider — organic ink-wash wave transition between sections.
 *
 * Place between sections to bridge color changes.
 * `color` should be the BG color of the section BELOW the divider.
 * `flip` mirrors the wave for visual variety.
 */
export default function SVGDivider({
    flip = false,
    color = "var(--color-off-white)",
}: {
    flip?: boolean;
    color?: string;
}) {
    return (
        <div
            aria-hidden="true"
            style={{
                lineHeight: 0,
                overflow: "hidden",
                transform: flip ? "scaleX(-1)" : undefined,
                marginTop: "-2px",
                marginBottom: "-2px",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 96"
                preserveAspectRatio="none"
                style={{ display: "block", width: "100%", height: "96px" }}
            >
                {/* Back layer — feathered leading edge */}
                <path
                    d="M0,60 C60,38 160,84 280,56 C400,28 480,76 600,50 C720,24 820,72 940,46 C1060,20 1160,68 1280,44 C1360,28 1410,58 1440,44 L1440,96 L0,96 Z"
                    fill={color}
                    opacity="0.45"
                />
                {/* Mid layer */}
                <path
                    d="M0,72 C100,52 200,90 340,64 C480,38 560,84 700,58 C840,32 940,80 1080,54 C1200,32 1320,74 1400,54 C1425,46 1435,62 1440,56 L1440,96 L0,96 Z"
                    fill={color}
                    opacity="0.7"
                />
                {/* Front layer — solid organic edge */}
                <path
                    d="M0,80 C120,60 240,96 380,70 C520,44 620,90 760,66 C900,42 1000,86 1140,62 C1260,42 1360,80 1420,66 C1435,60 1440,72 1440,72 L1440,96 L0,96 Z"
                    fill={color}
                />
            </svg>
        </div>
    );
}
