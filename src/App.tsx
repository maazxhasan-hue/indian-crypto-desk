import { useEffect, useState } from "react";
import "./App.css";

type Feature = {
  title: string;
  description: string;
};

const defaultFeatures: Feature[] = [
  {
    title: "Daily market analysis",
    description: "Clear, jargon-free breakdowns every day.",
  },
  {
    title: "Price-action setups",
    description: "Educational chart studies and key levels.",
  },
  {
    title: "Risk-management lessons",
    description: "Learn position sizing and protecting capital.",
  },
  {
    title: "Beginner friendly",
    description:
      "Start from basics, ask questions, learn at your pace.",
  },
];

function getWebsiteSettings() {
  const features: Feature[] = defaultFeatures.map(
    (feature, index) => {
      const number = index + 1;

      return {
        title:
          localStorage.getItem(
            `feature${number}Title`
          ) || feature.title,

        description:
          localStorage.getItem(
            `feature${number}Description`
          ) || feature.description,
      };
    }
  );

  return {
    brandName:
      localStorage.getItem("brandName") ||
      "Indian Crypto Desk",

    telegramLink:
      localStorage.getItem("telegramLink") ||
      "https://t.me/yourchannel",

    members:
      localStorage.getItem("members") ||
      "3.0K+",

    tagline:
      localStorage.getItem("tagline") ||
      "Get exclusive updates, tips, and community access.",

    logo:
      localStorage.getItem("logo") || "",

    features,
  };
}

function App() {
  const [settings, setSettings] = useState(
    getWebsiteSettings()
  );

  useEffect(() => {
    const refreshSettings = () => {
      setSettings(getWebsiteSettings());
    };

    window.addEventListener(
      "websiteSettingsChanged",
      refreshSettings
    );

    window.addEventListener(
      "storage",
      refreshSettings
    );

    return () => {
      window.removeEventListener(
        "websiteSettingsChanged",
        refreshSettings
      );

      window.removeEventListener(
        "storage",
        refreshSettings
      );
    };
  }, []);

  const openTelegram = () => {
    window.open(
      settings.telegramLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="website">
      {/* HEADER */}

      <header className="topbar">
        <div className="brand">
          {settings.logo ? (
            <img
              src={settings.logo}
              alt={settings.brandName}
              className="brand-logo"
            />
          ) : (
            <div className="brand-placeholder">
              ₿
            </div>
          )}

          <span>{settings.brandName}</span>
        </div>
      </header>

      {/* HERO */}

      <main>
        <section className="hero">
          <div className="hero-logo-wrapper">
            {settings.logo ? (
              <img
                src={settings.logo}
                alt={settings.brandName}
                className="hero-logo"
              />
            ) : (
              <div className="hero-placeholder">
                <span>₿</span>
                <strong>INDIA</strong>
                <small>CRYPTO DESK</small>
              </div>
            )}
          </div>

          <h1>{settings.brandName}</h1>

          <p className="hero-text">
            {settings.tagline}
          </p>

          <button
            type="button"
            className="telegram-button"
            onClick={openTelegram}
          >
            <span className="telegram-icon">
              ➤
            </span>

            Join Free on Telegram
          </button>

          <p className="small-note">
            100% Free · No card required · Leave anytime
          </p>

          <p className="marketing-note">
            By continuing, you agree your information
            may be used for marketing purposes.
          </p>
        </section>

        {/* STATS */}

        <section className="stats">
          <div className="stat">
            <strong>{settings.members}</strong>
            <span>MEMBERS</span>
          </div>

          <div className="stat">
            <strong>Daily</strong>
            <span>MARKET UPDATES</span>
          </div>

          <div className="stat">
            <strong>Free</strong>
            <span>ALWAYS</span>
          </div>
        </section>

        {/* FEATURES */}

        <section className="features-section">
          <h2>What you get inside</h2>

          <div className="features">
            {settings.features.map(
              (feature, index) => (
                <div
                  className="feature-card"
                  key={index}
                >
                  <div className="check">
                    ✓
                  </div>

                  <div className="feature-content">
                    <h3>
                      {feature.title}
                    </h3>

                    <p>
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* SECOND CTA */}

        <section className="bottom-cta">
          <button
            type="button"
            className="telegram-button"
            onClick={openTelegram}
          >
            <span className="telegram-icon">
              ➤
            </span>

            Join Free on Telegram
          </button>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="footer">
        <div className="footer-brand">
          {settings.logo ? (
            <img
              src={settings.logo}
              alt=""
              className="footer-logo"
            />
          ) : (
            <div className="footer-placeholder">
              ₿
            </div>
          )}

          <strong>{settings.brandName}</strong>
        </div>

        <p>
          For educational purposes only. Trading and
          investing in financial markets involves risk,
          including possible loss of capital. Past
          performance is not indicative of future
          results. This is not financial advice.
        </p>

        <p className="disclaimer">
          Nexgroww Agency is an independent
          advertising-technology provider and is not
          affiliated with, endorsing, or responsible
          for this channel, its operation, content,
          offers, or outcomes shown. This site is also
          not affiliated with, endorsed by, or part of
          Meta Platforms, Inc. / Facebook, or Telegram.
        </p>

        <div className="footer-line" />

        <div className="managed">
          <span>➤</span>
          Ads managed by MaAaZi_92
        </div>
      </footer>
    </div>
  );
}

export default App;