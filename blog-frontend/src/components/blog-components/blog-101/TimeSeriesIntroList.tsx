import { useTheme } from "next-themes";

export default function TimeSeriesIntroList() {
  const { theme } = useTheme();

  const linkStyle = {
    textDecoration: "none",
    transition: "color 0.3s ease",
  };

  const getColor = (hover = false) => {
    if (theme === "dark") return hover ? "#ffffff" : "#00afc3";
    else return hover ? "#000000" : "#007acc";
  };

  return (
    <div style={{ marginLeft: "1rem" }}>
      <ol style={{ paddingLeft: "1.5rem", lineHeight: "2rem", listStyleType: "decimal" }}>
        {[
          {
            href: "#what-is-a-time-series",
            label: (
              <>
                <strong>What a time series really is</strong>, and why it's different from other data.
              </>
            ),
          },
          {
            href: "#time-series-modeling-approaches",
            label: (
              <>
                How time is modeled: <strong>time domain</strong>, <strong>frequency domain</strong> approaches and their applications.
              </>
            ),
          },
          {
            href: "#white-noise-introduction",
            label: (
              <>
                The role of <strong>white noise</strong> as the building block of randomness.
              </>
            ),
          },
          {
            href: "#moving-average-section",
            label: (
              <>
                Time Series <strong>Smoothing and Moving Average</strong> and an introduction to <strong>Correlation</strong>.
              </>
            ),
          },
          {
            href: "#autoregresion-section",
            label: (
              <>
                Understanding the building blocks of Time Series: <strong>Autoregression</strong>, <strong>Random Walks & Trends</strong>,
                and <strong>Signals</strong>.
              </>
            ),
          },
        ].map((item, idx) => (
          <li key={idx}>
            <a
              href={item.href}
              style={{
                ...linkStyle,
                color: getColor(),
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = getColor(true))}
              onMouseOut={(e) => (e.currentTarget.style.color = getColor(false))}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
