import { useTheme } from "next-themes";

export default function PatternsThatPersistIntroList() {
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
            href: "#stationarity-basics",
            label: (
              <>
                What <strong>stationarity</strong> means and why it’s crucial for modeling.
              </>
            ),
          },
          {
            href: "#types-of-stationarity",
            label: (
              <>
                Different flavours of <strong>stationarity</strong>: <strong>strict, weak, trend,</strong> and{" "}
                <strong>difference stationarity</strong>.
              </>
            ),
          },
          {
            href: "#autocorrelation-and-acf",
            label: (
              <>
                How to measure time-based dependence: <strong>Autocovariance</strong> and <strong>Autocorrelation Function (ACF)</strong>.
              </>
            ),
          },
          {
            href: "#acf-interpretation",
            label: (
              <>
                Interpreting ACF plots and judging significance with <strong>standard error bands</strong>.
              </>
            ),
          },
          {
            href: "#decomposition-and-trend",
            label: (
              <>
                Example: Breaking a series into <strong>trend, seasonality,</strong> and <strong>residuals</strong>; basic{" "}
                <strong>trend detection</strong> with regression.
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
