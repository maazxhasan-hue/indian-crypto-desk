import { useState } from "react";

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

function Admin() {
  const [brandName, setBrandName] = useState(
    localStorage.getItem("brandName") || "Indian Crypto Desk"
  );

  const [telegramLink, setTelegramLink] = useState(
    localStorage.getItem("telegramLink") ||
      "https://t.me/yourchannel"
  );

  const [members, setMembers] = useState(
    localStorage.getItem("members") || "3.0K+"
  );

  const [tagline, setTagline] = useState(
    localStorage.getItem("tagline") ||
      "Get exclusive updates, tips, and community access."
  );

  const [logo, setLogo] = useState(
    localStorage.getItem("logo") || ""
  );

  const [features, setFeatures] = useState<Feature[]>(() =>
    defaultFeatures.map((feature, index) => {
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
    })
  );

  const saveChanges = () => {
    localStorage.setItem("brandName", brandName);
    localStorage.setItem("telegramLink", telegramLink);
    localStorage.setItem("members", members);
    localStorage.setItem("tagline", tagline);

    if (logo) {
      localStorage.setItem("logo", logo);
    } else {
      localStorage.removeItem("logo");
    }

    features.forEach((feature, index) => {
      const number = index + 1;

      localStorage.setItem(
        `feature${number}Title`,
        feature.title
      );

      localStorage.setItem(
        `feature${number}Description`,
        feature.description
      );
    });

    window.dispatchEvent(
      new Event("websiteSettingsChanged")
    );

    alert("Website updated successfully!");
  };

  const resetChanges = () => {
    const confirmed = window.confirm(
      "Reset all website settings to the original defaults?"
    );

    if (!confirmed) return;

    localStorage.removeItem("brandName");
    localStorage.removeItem("telegramLink");
    localStorage.removeItem("members");
    localStorage.removeItem("tagline");
    localStorage.removeItem("logo");

    for (let i = 1; i <= 4; i++) {
      localStorage.removeItem(`feature${i}Title`);
      localStorage.removeItem(
        `feature${i}Description`
      );
    }

    setBrandName("Indian Crypto Desk");
    setTelegramLink("https://t.me/yourchannel");
    setMembers("3.0K+");
    setTagline(
      "Get exclusive updates, tips, and community access."
    );
    setLogo("");
    setFeatures(defaultFeatures);

    window.dispatchEvent(
      new Event("websiteSettingsChanged")
    );

    alert("Website settings reset.");
  };

  const updateFeature = (
    index: number,
    field: keyof Feature,
    value: string
  ) => {
    setFeatures((current) =>
      current.map((feature, i) =>
        i === index
          ? {
              ...feature,
              [field]: value,
            }
          : feature
      )
    );
  };

  const handleLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogo(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    marginTop: "8px",
    marginBottom: "22px",
    borderRadius: "10px",
    border: "1px solid #343d50",
    background: "#202636",
    color: "#ffffff",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050b17",
        color: "#ffffff",
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "48px",
            marginBottom: "8px",
          }}
        >
          {brandName}
        </h1>

        <h2
          style={{
            textAlign: "center",
            color: "#9ba9bd",
            marginBottom: "45px",
          }}
        >
          Admin Panel
        </h2>

        <div
          style={{
            padding: "35px",
            borderRadius: "22px",
            background: "#151b29",
            border: "1px solid #293246",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            Website Settings
          </h2>

          {/* LOGO */}

          <label>Website Logo</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            style={{
              width: "100%",
              marginTop: "12px",
              marginBottom: "20px",
            }}
          />

          {logo && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              <img
                src={logo}
                alt="Logo preview"
                style={{
                  width: "130px",
                  height: "130px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  background: "#ffffff",
                  padding: "8px",
                }}
              />
            </div>
          )}

          {/* BRAND */}

          <label>Brand Name</label>

          <input
            value={brandName}
            onChange={(e) =>
              setBrandName(e.target.value)
            }
            style={inputStyle}
          />

          {/* TELEGRAM */}

          <label>Telegram Link</label>

          <input
            value={telegramLink}
            onChange={(e) =>
              setTelegramLink(e.target.value)
            }
            placeholder="https://t.me/yourchannel"
            style={inputStyle}
          />

          {/* MEMBERS */}

          <label>Member Count</label>

          <input
            value={members}
            onChange={(e) =>
              setMembers(e.target.value)
            }
            style={inputStyle}
          />

          {/* TAGLINE */}

          <label>Tagline</label>

          <textarea
            value={tagline}
            onChange={(e) =>
              setTagline(e.target.value)
            }
            rows={3}
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />

          {/* FEATURES */}

          <h2 style={{ marginTop: "35px" }}>
            Website Features
          </h2>

          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: "25px",
                marginTop: "18px",
                borderRadius: "16px",
                background: "#101725",
                border: "1px solid #293246",
              }}
            >
              <h3>Feature {index + 1}</h3>

              <label>Title</label>

              <input
                value={feature.title}
                onChange={(e) =>
                  updateFeature(
                    index,
                    "title",
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <label>Description</label>

              <textarea
                value={feature.description}
                onChange={(e) =>
                  updateFeature(
                    index,
                    "description",
                    e.target.value
                  )
                }
                rows={3}
                style={{
                  ...inputStyle,
                  marginBottom: 0,
                  resize: "vertical",
                }}
              />
            </div>
          ))}

          {/* BUTTONS */}

          <button
            type="button"
            onClick={saveChanges}
            style={{
              width: "100%",
              padding: "17px",
              marginTop: "30px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(180deg, #0878ff, #0567e7)",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Save All Changes
          </button>

          <button
            type="button"
            onClick={() =>
              window.open("/", "_blank")
            }
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "14px",
              border: "1px solid #0878ff",
              borderRadius: "12px",
              background: "transparent",
              color: "#ffffff",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Preview Website
          </button>

          <button
            type="button"
            onClick={resetChanges}
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "14px",
              border: "1px solid #ff5555",
              borderRadius: "12px",
              background: "transparent",
              color: "#ff7777",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Reset Website Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;