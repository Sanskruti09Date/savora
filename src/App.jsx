import { useState } from "react";
import "./App.css";

function Icon({ type }) {
  const icons = {
    shop: "🏪",
    money: "💰",
    chart: "📊",
    box: "📦",
    mic: "🎙️",
    globe: "🌐",
    arrow: "→",
    spark: "✦",
    farmer: "👩‍🌾",
    rupee: "₹",
    target: "🎯",
    warning: "⚠️",
    check: "✓",
    leaf: "🌱",
    voice: "🔊",
    calendar: "📅",
    truck: "🚚",
    tomato: "🍅",
  };

  return <span>{icons[type] || "✦"}</span>;
}

function App() {
  const [language, setLanguage] = useState("English");
  const [screen, setScreen] = useState("home");
  const [listening, setListening] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  /* =========================
     FEASIBILITY DATA
  ========================= */

  const [businessIdea, setBusinessIdea] = useState("");
  const [location, setLocation] = useState("");
  const [investment, setInvestment] = useState("");

  /* =========================
     SIMULATION DATA
  ========================= */

  const [price, setPrice] = useState(50);
  const [customers, setCustomers] = useState(40);
  const [workingDays, setWorkingDays] = useState(26);
  const [rawMaterial, setRawMaterial] = useState(18000);
  const [rent, setRent] = useState(5000);
  const [otherExpenses, setOtherExpenses] = useState(3000);

  /* =========================
     TRACKER DATA
  ========================= */

  const [sales, setSales] = useState(1500);
  const [expenses, setExpenses] = useState(850);

  /* =========================
     INVENTORY DATA
  ========================= */

  const [currentStock, setCurrentStock] = useState(5);
  const [predictedDemand, setPredictedDemand] = useState(20);

  /* =========================
     VOICE
  ========================= */

  const startVoice = () => {
    setListening(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();

      recognition.lang =
        language === "मराठी"
          ? "mr-IN"
          : language === "हिंदी"
          ? "hi-IN"
          : "en-IN";

      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;

        if (screen === "feasibility") {
          setBusinessIdea(transcript);
        }

        setListening(false);
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };
    } else {
      setTimeout(() => {
        setListening(false);

        if (screen === "feasibility") {
          setBusinessIdea("Vegetable shop");
        }
      }, 2000);
    }
  };

  /* =========================
     NAVIGATION
  ========================= */

  const goTo = (page) => {
    setScreen(page);
    setAnalyzed(false);
    window.scrollTo(0, 0);
  };

  /* =========================
     SIMULATION CALCULATIONS
  ========================= */

  const monthlyRevenue =
    Number(price) * Number(customers) * Number(workingDays);

  const totalExpenses =
    Number(rawMaterial) + Number(rent) + Number(otherExpenses);

  const monthlyProfit = monthlyRevenue - totalExpenses;

  const profitMargin =
    monthlyRevenue > 0
      ? ((monthlyProfit / monthlyRevenue) * 100).toFixed(1)
      : 0;

  const dailyProfit =
    workingDays > 0 ? monthlyProfit / Number(workingDays) : 0;

  const breakEvenDays =
    dailyProfit > 0
      ? Math.ceil(Number(investment || 50000) / dailyProfit)
      : "—";

  /* =========================
     INVENTORY
  ========================= */

  const stockToBuy = Math.max(
    0,
    Number(predictedDemand) - Number(currentStock)
  );

  /* =========================
     FEATURES
  ========================= */

  const features = [
    {
      number: "01",
      icon: "shop",
      label: "BEFORE STARTING",
      title: "Business Feasibility",
      text: "Understand demand, competition, investment, resources and risks before putting your money in.",
      color: "green",
      action: "feasibility",
    },
    {
      number: "02",
      icon: "money",
      label: "BEFORE STARTING",
      title: "Profit & Break-Even",
      text: "Simulate revenue, expenses, profit and break-even before investing real money.",
      color: "orange",
      action: "simulation",
    },
    {
      number: "03",
      icon: "chart",
      label: "AFTER STARTING",
      title: "Real-Time Profit & Loss",
      text: "Record actual sales and expenses and understand how your business is performing.",
      color: "blue",
      action: "tracker",
    },
    {
      number: "04",
      icon: "box",
      label: "AFTER STARTING",
      title: "AI Demand & Inventory",
      text: "Predict demand and know how much stock to buy while reducing wastage and stockouts.",
      color: "purple",
      action: "inventory",
    },
  ];

  /* =========================
     FEASIBILITY SCREEN
  ========================= */

  if (screen === "feasibility") {
    return (
      <div className="page-shell">

        <header className="inner-navbar">
          <button className="back-button" onClick={() => goTo("home")}>
            ← Home
          </button>

          <div className="mini-brand">
            <div className="mini-logo">S</div>
            <strong>SAVORA</strong>
          </div>

          <div className="nav-language">
            <Icon type="globe" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>मराठी</option>
              <option>हिंदी</option>
            </select>
          </div>
        </header>

        <main className="tool-page">

          <div className="tool-heading">
            <span className="step-badge">
              STEP 01 • BEFORE STARTING
            </span>

            <h1>Business Feasibility</h1>

            <p>
              Let's understand your business idea before you invest.
            </p>
          </div>

          <div className="progress-track">
            <div className="progress-value progress-one"></div>
          </div>

          <div className="tool-card">

            <div className="card-heading">
              <div className="card-icon green-icon">
                <Icon type="shop" />
              </div>

              <div>
                <span>BUSINESS IDEA</span>
                <h2>Tell SAVORA what you want to start</h2>
              </div>
            </div>

            <label>What business do you want to start?</label>

            <div className="input-with-mic">
              <input
                type="text"
                value={businessIdea}
                onChange={(e) => setBusinessIdea(e.target.value)}
                placeholder="e.g. Vegetable shop, tea stall..."
              />

              <button
                className={`small-mic ${listening ? "active-mic" : ""}`}
                onClick={startVoice}
              >
                🎙️
              </button>
            </div>

            <div className="voice-hint">
              {listening
                ? "Listening... speak naturally"
                : "You can type or use your voice"}
            </div>

            <label>Where will you start it?</label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Pune, Maharashtra"
            />

            <label>How much can you invest?</label>

            <div className="rupee-input">
              <span>₹</span>

              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="50000"
              />
            </div>

            <button
              className="main-action"
              onClick={() => setAnalyzed(true)}
            >
              Analyze My Business Idea →
            </button>

            <p className="small-note">
              SAVORA considers demand, competition, investment,
              resources and local market conditions.
            </p>
          </div>

          {analyzed && (
            <div className="analysis-card">

              <div className="success-label">
                ✦ AI ANALYSIS COMPLETE
              </div>

              <h2>Your Business Idea Analysis</h2>

              <p className="analysis-intro">
                SAVORA has prepared an initial assessment using
                the information you provided.
              </p>

              <div className="input-summary">

                <div>
                  <span>BUSINESS IDEA</span>
                  <strong>
                    {businessIdea || "Vegetable Shop"}
                  </strong>
                </div>

                <div>
                  <span>LOCATION</span>
                  <strong>
                    {location || "Pune, Maharashtra"}
                  </strong>
                </div>

                <div>
                  <span>INVESTMENT</span>
                  <strong>
                    ₹{investment || "50,000"}
                  </strong>
                </div>

              </div>

              <div className="result-grid">

                <div className="result-box">
                  <div className="result-icon">📈</div>
                  <div>
                    <span>Demand Potential</span>
                    <strong>Moderate to High</strong>
                  </div>
                </div>

                <div className="result-box">
                  <div className="result-icon">🏪</div>
                  <div>
                    <span>Competition</span>
                    <strong>Moderate</strong>
                  </div>
                </div>

                <div className="result-box">
                  <div className="result-icon">💰</div>
                  <div>
                    <span>Investment</span>
                    <strong>
                      ₹{investment || "50,000"}
                    </strong>
                  </div>
                </div>

                <div className="result-box">
                  <div className="result-icon">⚠️</div>
                  <div>
                    <span>Key Risk</span>
                    <strong>
                      Demand variation
                    </strong>
                  </div>
                </div>

              </div>

              <div className="smart-advice">
                <div className="advice-icon">💡</div>

                <div>
                  <strong>SAVORA's suggestion</strong>

                  <p>
                    Start with a small initial investment,
                    test customer demand and track daily sales
                    before expanding.
                  </p>
                </div>
              </div>

              <div className="decision-note">
                <span>🧠</span>

                <p>
                  SAVORA does not decide for you. It shows
                  assumptions, risks and possible scenarios
                  so you can make the decision.
                </p>
              </div>

              <div className="result-actions">

                <button
                  className="main-action"
                  onClick={() => goTo("simulation")}
                >
                  Continue to Profit Simulation →
                </button>

                <button
                  className="secondary-action"
                  onClick={() => setAnalyzed(false)}
                >
                  Edit Information
                </button>

              </div>

            </div>
          )}

        </main>
      </div>
    );
  }

  /* =========================
     SIMULATION SCREEN
  ========================= */

  if (screen === "simulation") {
    return (
      <div className="page-shell">

        <header className="inner-navbar">
          <button className="back-button" onClick={() => goTo("home")}>
            ← Home
          </button>

          <div className="mini-brand">
            <div className="mini-logo">S</div>
            <strong>SAVORA</strong>
          </div>

          <span className="live-status">
            ● SIMULATION MODE
          </span>
        </header>

        <main className="tool-page">

          <div className="tool-heading">
            <span className="step-badge orange-badge">
              STEP 02 • BEFORE STARTING
            </span>

            <h1>Profit & Break-Even Simulator</h1>

            <p>
              Test different business scenarios before investing real money.
            </p>
          </div>

          <div className="simulation-layout">

            <div className="simulation-input-card">

              <div className="card-heading">
                <div className="card-icon orange-icon">
                  💰
                </div>

                <div>
                  <span>BUSINESS ASSUMPTIONS</span>
                  <h2>Change the numbers</h2>
                </div>
              </div>

              <p className="card-description">
                Try different numbers and instantly see how your
                business could perform.
              </p>

              <div className="field">
                <label>Selling price per customer</label>
                <div className="input-prefix">
                  ₹
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label>Customers per day</label>
                <input
                  type="number"
                  value={customers}
                  onChange={(e) => setCustomers(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Working days / month</label>
                <input
                  type="number"
                  value={workingDays}
                  onChange={(e) => setWorkingDays(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Raw material / month</label>
                <div className="input-prefix">
                  ₹
                  <input
                    type="number"
                    value={rawMaterial}
                    onChange={(e) => setRawMaterial(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label>Rent / month</label>
                <div className="input-prefix">
                  ₹
                  <input
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label>Other expenses</label>
                <div className="input-prefix">
                  ₹
                  <input
                    type="number"
                    value={otherExpenses}
                    onChange={(e) =>
                      setOtherExpenses(e.target.value)
                    }
                  />
                </div>
              </div>

            </div>

            <div className="simulation-result-card">

              <div className="simulation-title">
                ✦ SAVORA SIMULATION
              </div>

              <div
                className={`profit-status ${
                  monthlyProfit >= 0 ? "positive" : "negative"
                }`}
              >
                {monthlyProfit >= 0
                  ? "Potentially profitable"
                  : "Potential loss scenario"}
              </div>

              <div className="big-profit">
                ₹{Math.abs(monthlyProfit).toLocaleString("en-IN")}
                <span>estimated monthly profit</span>
              </div>

              <div className="metrics-grid">

                <div>
                  <span>MONTHLY REVENUE</span>
                  <strong>
                    ₹{monthlyRevenue.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>TOTAL EXPENSES</span>
                  <strong>
                    ₹{totalExpenses.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>PROFIT MARGIN</span>
                  <strong>{profitMargin}%</strong>
                </div>

                <div>
                  <span>BREAK-EVEN</span>
                  <strong>
                    {breakEvenDays}
                    {breakEvenDays !== "—" && " days"}
                  </strong>
                </div>

              </div>

              <div className="scenario-box">

                <div className="scenario-icon">
                  🎯
                </div>

                <div>
                  <strong>Try a different scenario</strong>

                  <p>
                    What if you get only 30 customers per day?
                    Change the customer number and instantly
                    compare the result.
                  </p>
                </div>

              </div>

              <div className="decision-note">
                <span>🧠</span>

                <p>
                  SAVORA doesn't decide for you. It shows the
                  numbers, assumptions and possible scenarios
                  so you can make the decision.
                </p>
              </div>

              <button
                className="main-action"
                onClick={() => goTo("tracker")}
              >
                Continue to Business Tracker →
              </button>

            </div>

          </div>

        </main>
      </div>
    );
  }

  /* =========================
     BUSINESS TRACKER
  ========================= */

  if (screen === "tracker") {
    const actualProfit = Number(sales) - Number(expenses);

    return (
      <div className="page-shell">

        <header className="inner-navbar">
          <button className="back-button" onClick={() => goTo("home")}>
            ← Home
          </button>

          <div className="mini-brand">
            <div className="mini-logo">S</div>
            <strong>SAVORA</strong>
          </div>

          <span className="live-status blue-status">
            ● LIVE BUSINESS
          </span>
        </header>

        <main className="tool-page">

          <div className="tool-heading">
            <span className="step-badge blue-badge">
              STEP 03 • AFTER STARTING
            </span>

            <h1>Real-Time Profit & Loss</h1>

            <p>
              Record what actually happened and understand your business.
            </p>
          </div>

          <div className="tracker-dashboard">

            <div className="tracker-card primary-tracker">
              <span>Today's Revenue</span>
              <strong>
                ₹{Number(sales).toLocaleString("en-IN")}
              </strong>
              <small>↗ Sales recorded today</small>
            </div>

            <div className="tracker-card">
              <span>Today's Expenses</span>
              <strong>
                ₹{Number(expenses).toLocaleString("en-IN")}
              </strong>
              <small>Raw material + transport</small>
            </div>

            <div className="tracker-card">
              <span>Today's Profit</span>
              <strong>
                ₹{actualProfit.toLocaleString("en-IN")}
              </strong>
              <small>
                {actualProfit >= 0
                  ? "Positive business day"
                  : "Review expenses"}
              </small>
            </div>

          </div>

          <div className="tracker-layout">

            <div className="tool-card">

              <div className="card-heading">
                <div className="card-icon blue-icon">
                  🎙️
                </div>

                <div>
                  <span>VOICE TRANSACTION</span>
                  <h2>Tell SAVORA what happened today</h2>
                </div>
              </div>

              <div className="voice-entry-card">

                <button
                  className="large-mic"
                  onClick={startVoice}
                >
                  {listening ? "🔴" : "🎙️"}
                </button>

                <div>
                  <strong>
                    {listening
                      ? "Listening..."
                      : "Speak your transaction"}
                  </strong>

                  <p>
                    Example: "आज मैंने ₹1,500 की बिक्री की
                    और ₹200 transport दिया."
                  </p>
                </div>

              </div>

              <div className="manual-row">

                <div>
                  <label>Today's sales</label>
                  <div className="input-prefix">
                    ₹
                    <input
                      type="number"
                      value={sales}
                      onChange={(e) =>
                        setSales(e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label>Today's expenses</label>
                  <div className="input-prefix">
                    ₹
                    <input
                      type="number"
                      value={expenses}
                      onChange={(e) =>
                        setExpenses(e.target.value)
                      }
                    />
                  </div>
                </div>

              </div>

              <button className="main-action">
                + Save Today's Transaction
              </button>

            </div>

            <div className="insight-card">

              <div className="insight-header">
                <span>✦ AI BUSINESS INSIGHT</span>
              </div>

              <h2>
                Your business is generating
                <span> positive daily cash flow.</span>
              </h2>

              <p>
                Based on today's numbers, your current margin
                is approximately{" "}
                <strong>
                  {sales > 0
                    ? ((actualProfit / Number(sales)) * 100).toFixed(1)
                    : 0}
                  %
                </strong>
                .
              </p>

              <div className="insight-mini">
                <span>💡</span>
                <p>
                  Keep tracking transport and raw material
                  costs. Small recurring expenses can reduce
                  your monthly margin.
                </p>
              </div>

            </div>

          </div>

          <div className="continue-card">

            <div>
              <span>UP NEXT</span>
              <h2>AI Demand & Inventory Prediction</h2>
              <p>
                Use your business history to decide how much
                stock you should buy.
              </p>
            </div>

            <button
              className="main-action compact"
              onClick={() => goTo("inventory")}
            >
              Predict My Stock →
            </button>

          </div>

        </main>
      </div>
    );
  }

  /* =========================
     INVENTORY SCREEN
  ========================= */

  if (screen === "inventory") {
    return (
      <div className="page-shell">

        <header className="inner-navbar">
          <button className="back-button" onClick={() => goTo("home")}>
            ← Home
          </button>

          <div className="mini-brand">
            <div className="mini-logo">S</div>
            <strong>SAVORA</strong>
          </div>

          <span className="live-status purple-status">
            ✦ AI PREDICTION
          </span>
        </header>

        <main className="tool-page">

          <div className="tool-heading">
            <span className="step-badge purple-badge">
              STEP 04 • AFTER STARTING
            </span>

            <h1>AI Demand & Inventory</h1>

            <p>
              Know how much stock to buy before you waste money.
            </p>
          </div>

          <div className="inventory-layout">

            <div className="tool-card">

              <div className="card-heading">
                <div className="card-icon purple-icon">
                  📦
                </div>

                <div>
                  <span>INVENTORY INTELLIGENCE</span>
                  <h2>Current stock vs predicted demand</h2>
                </div>
              </div>

              <label>Current stock</label>

              <div className="unit-input">
                <input
                  type="number"
                  value={currentStock}
                  onChange={(e) =>
                    setCurrentStock(e.target.value)
                  }
                />
                <span>kg</span>
              </div>

              <label>Predicted demand</label>

              <div className="unit-input">
                <input
                  type="number"
                  value={predictedDemand}
                  onChange={(e) =>
                    setPredictedDemand(e.target.value)
                  }
                />
                <span>kg</span>
              </div>

              <button className="main-action">
                ✦ Run AI Prediction
              </button>

            </div>

            <div className="prediction-card">

              <div className="prediction-top">
                <span>AI DEMAND FORECAST</span>
                <span className="confidence">
                  87% confidence
                </span>
              </div>

              <div className="product-name">
                🍅 Tomatoes
              </div>

              <div className="stock-visual">

                <div className="stock-column">
                  <div
                    className="stock-fill current-fill"
                    style={{
                      height: `${Math.min(
                        Number(currentStock) * 8,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

                <div className="stock-column">
                  <div
                    className="stock-fill demand-fill"
                    style={{
                      height: `${Math.min(
                        Number(predictedDemand) * 4,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

              </div>

              <div className="stock-labels">
                <span>
                  Current
                  <strong>{currentStock} kg</strong>
                </span>

                <span>
                  Expected
                  <strong>{predictedDemand} kg</strong>
                </span>
              </div>

              <div className="buy-recommendation">

                <div className="buy-icon">
                  🛒
                </div>

                <div>
                  <span>RECOMMENDED PURCHASE</span>

                  <strong>
                    Buy {stockToBuy} kg more
                  </strong>

                  <p>
                    This keeps enough stock to meet predicted
                    demand while avoiding unnecessary excess.
                  </p>
                </div>

              </div>

              <div className="prediction-factors">

                <span>📅 Day of week</span>
                <span>🌦️ Weather</span>
                <span>🎉 Festival demand</span>
                <span>📊 Sales history</span>

              </div>

            </div>

          </div>

          <div className="innovation-banner">

            <div className="innovation-symbol">
              ✦
            </div>

            <div>
              <span>WHY SAVORA IS DIFFERENT</span>

              <h2>
                The same AI follows the business journey.
              </h2>

              <p>
                What was predicted before starting can be
                compared with what actually happened after
                starting — creating a continuous learning loop.
              </p>
            </div>

          </div>

        </main>
      </div>
    );
  }

  /* =========================
     HOME SCREEN
  ========================= */

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-logo">
            S
          </div>

          <div>
            <div className="brand-name">
              SAVORA
            </div>

            <div className="brand-subtitle">
              AI BUSINESS ADVISOR
            </div>
          </div>

        </div>

        <nav className="nav-links">

          <button onClick={() => {
            document
              .getElementById("features")
              ?.scrollIntoView({ behavior: "smooth" });
          }}>
            Features
          </button>

          <button onClick={() => {
            document
              .getElementById("journey")
              ?.scrollIntoView({ behavior: "smooth" });
          }}>
            How it works
          </button>

          <button onClick={() => {
            document
              .getElementById("languages")
              ?.scrollIntoView({ behavior: "smooth" });
          }}>
            Languages
          </button>

        </nav>

        <div className="nav-right">

          <div className="language-select">

            <Icon type="globe" />

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >
              <option>English</option>
              <option>मराठी</option>
              <option>हिंदी</option>
            </select>

          </div>

          <button
            className="nav-button"
            onClick={() => goTo("feasibility")}
          >
            Get Started
          </button>

        </div>

      </header>


      {/* HERO */}

      <section className="hero">

        <div className="hero-left">

          <div className="eyebrow">

            <span className="live-dot"></span>

            BUILT FOR RURAL ENTREPRENEURS

          </div>

          <h1>

            Your business.
            <br />

            <span>Your language.</span>
            <br />

            Your AI advisor.

          </h1>

          <p className="hero-description">

            From your first business idea to daily decisions,
            SAVORA helps you plan, simulate, track and grow —
            through simple voice conversations.

          </p>


          {/* VOICE CARD */}

          <div className="voice-card">

            <button
              className={`mic-button ${
                listening ? "listening" : ""
              }`}
              onClick={startVoice}
            >
              <Icon type="mic" />
            </button>

            <div className="voice-content">

              <div className="voice-title">

                {listening
                  ? "Listening..."
                  : "Speak to SAVORA"}

              </div>

              <div className="voice-text">

                {listening
                  ? "Tell me about your business..."
                  : "Ask your business question in Marathi, Hindi or English."}

              </div>

            </div>

            <div className="voice-wave">

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>


          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => goTo("feasibility")}
            >

              Start with a Business Idea

              <Icon type="arrow" />

            </button>

            <button
              className="secondary-button"
              onClick={() => {
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Explore Features
            </button>

          </div>


          <div className="hero-trust">

            <span>✓ Voice-first</span>
            <span>✓ Multilingual</span>
            <span>✓ AI-powered</span>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-right">

          <div className="dashboard-preview">

            <div className="preview-header">

              <div>
                <span>GOOD MORNING 👋</span>
                <strong>Your business snapshot</strong>
              </div>

              <div className="preview-avatar">
                S
              </div>

            </div>

            <div className="preview-profit">

              <span>THIS MONTH'S PROFIT</span>

              <strong>₹26,000</strong>

              <small>
                ↗ 18.4% compared to last month
              </small>

            </div>

            <div className="preview-chart">

              <div className="chart-line"></div>

              <div className="chart-dot dot-one"></div>
              <div className="chart-dot dot-two"></div>
              <div className="chart-dot dot-three"></div>
              <div className="chart-dot dot-four"></div>

            </div>

            <div className="preview-grid">

              <div>
                <span>📈 Demand</span>
                <strong>+18%</strong>
              </div>

              <div>
                <span>📦 Stock</span>
                <strong>Good</strong>
              </div>

              <div>
                <span>💰 Margin</span>
                <strong>50%</strong>
              </div>

              <div>
                <span>⚠️ Risk</span>
                <strong>Low</strong>
              </div>

            </div>

            <div className="ai-message">

              <div className="ai-symbol">✦</div>

              <div>
                <span>SAVORA AI</span>

                <p>
                  Tomato demand may rise this weekend.
                  Consider buying 15 kg more.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* JOURNEY */}

      <section
        className="journey"
        id="journey"
      >

        <div className="section-tag">
          ONE CONTINUOUS JOURNEY
        </div>

        <div className="journey-title">

          <span>IDEA</span>

          <strong>→</strong>

          <span>DECISION</span>

          <strong>→</strong>

          <span>BUSINESS</span>

          <strong>→</strong>

          <span>GROWTH</span>

        </div>

        <p>
          One AI companion from the first question
          to everyday business decisions.
        </p>

      </section>


      {/* FEATURES */}

      <section
        className="features-section"
        id="features"
      >

        <div className="section-intro">

          <div>

            <div className="section-tag">
              FOUR CORE FEATURES
            </div>

            <h2>
              Everything a small business
              <br />
              needs to make{" "}
              <span>better decisions.</span>
            </h2>

          </div>

          <p>
            SAVORA supports entrepreneurs both before
            they start and after their business is running.
          </p>

        </div>


        <div className="feature-grid">

          {features.map((feature) => (

            <div
              className={`feature-card ${feature.color}`}
              key={feature.number}
            >

              <div className="feature-top">

                <span className="feature-number">
                  {feature.number}
                </span>

                <span className="feature-label">
                  {feature.label}
                </span>

              </div>

              <div className="feature-icon-large">
                <Icon type={feature.icon} />
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.text}
              </p>

              <button
                className="feature-link"
                onClick={() => goTo(feature.action)}
              >
                Explore feature →
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* LANGUAGE SECTION */}

      <section
        className="language-section"
        id="languages"
      >

        <div className="language-visual">

          <div className="language-orbit">

            <div className="language-center">
              🌐
            </div>

            <span className="orbit-item one">
              अ
            </span>

            <span className="orbit-item two">
              अं
            </span>

            <span className="orbit-item three">
              A
            </span>

          </div>

        </div>


        <div className="language-content">

          <div className="section-tag">
            DESIGNED FOR REAL PEOPLE
          </div>

          <h2>
            Business advice
            <br />
            <span>
              without the language barrier.
            </span>
          </h2>

          <p>
            Entrepreneurs can speak or type in the language
            they are comfortable with. SAVORA understands,
            analyzes and responds in their preferred language.
          </p>

          <div className="language-pills">

            <span>🇮🇳 मराठी</span>
            <span>🇮🇳 हिंदी</span>
            <span>🇬🇧 English</span>
            <span>＋ More Indian languages</span>

          </div>

          <div className="voice-flow">

            <div>🎙️ Speak</div>
            <span>→</span>
            <div>🧠 Understand</div>
            <span>→</span>
            <div>💬 Get advice</div>

          </div>

        </div>

      </section>


      {/* DIFFERENTIATOR */}

      <section className="difference-section">

        <div className="difference-content">

          <span className="section-tag light">
            THE SAVORA DIFFERENCE
          </span>

          <h2>
            Most tools start
            <br />
            <span>after the business.</span>
          </h2>

          <p>
            SAVORA starts before the business even exists —
            then continues supporting the entrepreneur after
            the business starts.
          </p>

        </div>

        <div className="difference-loop">

          <div>💭 IDEA</div>
          <div>🧠 FEASIBILITY</div>
          <div>💰 SIMULATE</div>
          <div>🏪 START</div>
          <div>📊 TRACK</div>
          <div>📦 PREDICT</div>
          <div>🚀 GROW</div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="final-cta">

        <div className="cta-content">

          <div className="section-tag light">
            YOUR BUSINESS COMPANION
          </div>

          <h2>
            From business idea
            <br />
            to business growth.
          </h2>

          <p>
            Plan. Simulate. Start. Track. Predict. Grow.
          </p>

          <button
            className="cta-button"
            onClick={() => goTo("feasibility")}
          >
            Start with SAVORA →
          </button>

        </div>

        <div className="cta-symbol">
          ✦
        </div>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <div>

          <strong>SAVORA</strong>

          <span>
            AI BUSINESS ADVISOR
          </span>

        </div>

        <p>
          An AI business companion for rural entrepreneurs.
        </p>

        <span>
          Speak. Start. Track. Grow.
        </span>

      </footer>

    </div>
  );
}

export default App;