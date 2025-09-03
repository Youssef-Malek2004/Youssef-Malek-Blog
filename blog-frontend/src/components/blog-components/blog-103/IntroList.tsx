import { useTheme } from "next-themes";

export default function DoubleInternshipIntroList() {
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
            href: "#why-i-did-it",
            label: (
              <>
                Why I took on <strong>two internships</strong> at once - and how I got the chance to.
              </>
            ),
          },
          {
            href: "#the-interview-journey",
            label: (
              <>
                Cracking the <strong>Microsoft EDC interview</strong>.
              </>
            ),
          },
          {
            href: "#what-i-did-at-microsoft",
            label: (
              <>
                My work at <strong>Microsoft Egypt</strong>: Projects, tools, and team dynamics.
              </>
            ),
          },
          {
            href: "#what-i-did-at-procore",
            label: (
              <>
                My role at <strong>Procore</strong>: Integration tests, CD Pipeline Integration, SWE x QA Work.
              </>
            ),
          },
          {
            href: "#balancing-both",
            label: (
              <>
                Balancing the <strong>load</strong>: How I managed two tech internships (<strong>sigh</strong> with minimal burnout).
              </>
            ),
          },
          {
            href: "#gratitude-and-beyond",
            label: (
              <>
                <strong>Thank you</strong> to the mentors, teammates, and what’s next on the horizon.
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
