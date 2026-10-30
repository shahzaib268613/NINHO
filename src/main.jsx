import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  LayoutDashboard,
  House,
  Heart,
  Users,
  FolderOpen,
  CalendarDays,
  Calendar,
  MessageSquare,
  MessageCircle,
  Wallet,
  Settings,
  Bell,
  ChevronDown,
  ChevronRight,
  Check,
  Plus,
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Clock,
  Globe,
  ShieldCheck,
  FileText,
  Download,
  Upload,
  X,
  MoreHorizontal,
  CheckCircle2,
  Star,
  Send,
  Video,
  Phone,
  Building2,
  Briefcase,
  LogOut,
  Menu,
  CheckSquare,
  TrendingUp,
  BarChart3,
  Mail,
  ExternalLink,
  SlidersHorizontal,
  Link,
  Eye,
  Trash2,
  Info,
  Leaf,
  ClipboardList,
  UserCheck,
  User,
  Languages,
  Copy,
  RefreshCw,
  Lock,
  PenLine,
  Scale,
  EyeOff,
} from "lucide-react";
import { properties, pros, stages, initial } from "./data";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "./style.css";
import "./reference.css";
import "./theme.css";
import "./agent-dashboard.css";
import {
  Brand,
  ReferenceDashboard,
  ReferencePurchase,
  ReferenceModal,
  ReferenceProperty,
  agencies,
} from "./Reference";
const icons = {
  Overview: LayoutDashboard,
  Properties: House,
  "My purchase": Briefcase,
  Professionals: Users,
  Documents: FolderOpen,
  Calendar: CalendarDays,
  Messages: MessageSquare,
  Payments: Wallet,
  "Saved homes": Heart,
  Clients: Users,
  Listings: House,
  Meetings: CalendarDays,
  Tasks: CheckSquare,
  Agency: Building2,
  Commissions: Wallet,
  Purchases: Briefcase,
  Membership: Wallet,
  Agencies: Building2,
  Approvals: UserCheck,
  Finance: Wallet,
  Content: FileText,
  Settings,
  Languages,
};
const agentIcons = {
  Overview: House,
  Clients: Briefcase,
  Listings: Building2,
  Calendar: Calendar,
  Messages: MessageCircle,
  Documents: FileText,
  Agency: BarChart3,
  Settings,
};
const menus = {
  Buyer: [
    "Overview",
    "Properties",
    "My purchase",
    "Professionals",
    "Documents",
    "Calendar",
    "Messages",
    "Payments",
    "Saved homes",
    "Languages",
    "Settings",
  ],
  Agent: [
    "Overview",
    "Clients",
    "Listings",
    "Calendar",
    "Messages",
    "Documents",
    "Agency",
    "Settings",
  ],
  Lawyer: [
    "Overview",
    "Purchases",
    "Documents",
    "Meetings",
    "Calendar",
    "Messages",
    "Tasks",
    "Membership",
    "Settings",
  ],
  Admin: [
    "Overview",
    "Agencies",
    "Approvals",
    "Purchases",
    "Finance",
    "Content",
    "Languages",
    "Settings",
  ],
};
const pt = {
  Overview: "Visão geral",
  Properties: "Imóveis",
  "My purchase": "A minha compra",
  Professionals: "Profissionais",
  Documents: "Documentos",
  Calendar: "Calendário",
  Messages: "Mensagens",
  Payments: "Pagamentos",
  "Saved homes": "Imóveis guardados",
  Clients: "Clientes",
  Listings: "Anúncios",
  Meetings: "Reuniões",
  Tasks: "Tarefas",
  Agency: "Agência",
  Commissions: "Comissões",
  Purchases: "Compras",
  Membership: "Adesão",
  Agencies: "Agências",
  Approvals: "Aprovações",
  Finance: "Finanças",
  Content: "Conteúdo",
  Settings: "Definições",
};
const money = (n) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
const day = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
const Avatar = ({ name = "Emily Carter", color = "sage", size = "" }) => {
  if (/Banco|Terra/.test(name))
    return (
      <span className={"avatar " + color + " " + size}>
        <Building2 size={20} />
      </span>
    );
  const person = /João|Miguel|Rafael|Pedro|James|Tiago|Ricardo/i.test(name)
    ? "miguel"
    : /Sofia|Marta|Carla|Inês|Bruna|Ana/i.test(name)
      ? "sofia"
      : "emily";
  return (
    <span className={"avatar " + color + " " + size}>
      <img src={"/brand/" + person + ".png"} alt={name} />
    </span>
  );
};
const Badge = ({ children, tone = "" }) => (
  <span className={"badge " + tone}>{children}</span>
);
const Empty = ({ title, text, children }) => (
  <div className="empty">
    <Leaf size={30} />
    <h3>{title}</h3>
    <p>{text}</p>
    {children}
  </div>
);
function App() {
  const [d, setD] = useState(() => {
    try {
      return {
        ...initial,
        ...JSON.parse(localStorage.getItem("ninho-demo-v3") || "{}"),
      };
    } catch {
      return initial;
    }
  });
  const readHashPage = () => {
    const raw = decodeURIComponent(location.hash.replace(/^#\/?/, "")).trim();
    return raw || "Overview";
  };
  const [page, setPage] = useState(readHashPage);
  const [selected, setSelected] = useState(1);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [mobile, setMobile] = useState(false);
  const [filter, setFilter] = useState("");
  const [region, setRegion] = useState("All regions");
  const [type, setType] = useState("All types");
  const [max, setMax] = useState("");
  const [compare, setCompare] = useState([]);
  const [translate, setTranslate] = useState(false);
  const [tab, setTab] = useState("Overview");
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2026);
  const [loginStep, setLoginStep] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loginRole, setLoginRole] = useState("Buyer");
  const [loginEmail, setLoginEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [unit, setUnit] = useState("m²");
  const [currency, setCurrency] = useState("EUR");
  const [proFilter, setProFilter] = useState("All professionals");
  const [meetingFilter, setMeetingFilter] = useState("All");
  const [budgetFit, setBudgetFit] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("ninho-demo-v3", JSON.stringify(d));
    } catch {
      setToast(
        "Browser storage is full. Remove a demo upload or reset sample data in Settings.",
      );
    }
  }, [d]);
  useEffect(() => {
    const f = () => {
      setPage(readHashPage());
      setMobile(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    document.documentElement.lang = d.language === "PT" ? "pt" : "en";
  }, [d.language]);
  useEffect(() => {
    const onLogin = page === "login";
    document.documentElement.classList.toggle("login-page", onLogin);
    document.body.classList.toggle("login-page", onLogin);
    return () => {
      document.documentElement.classList.remove("login-page");
      document.body.classList.remove("login-page");
    };
  }, [page]);
  useEffect(() => {
    if (!modal) return;
    const old = document.activeElement;
    const handler = (e) => {
      if (e.key === "Escape") setModal(null);
      if (e.key === "Tab") {
        const items = [
          ...document.querySelectorAll(
            "[role=dialog] button,[role=dialog] input,[role=dialog] select,[role=dialog] textarea,[role=dialog] a",
          ),
        ].filter((x) => !x.disabled);
        if (!items.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    document.querySelector("[role=dialog] button")?.focus();
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      old?.focus();
    };
  }, [modal?.type]);
  function patch(v) {
    setD((x) => ({ ...x, ...(typeof v === "function" ? v(x) : v) }));
  }
  function go(p) {
    location.hash = encodeURIComponent(p);
    setPage(p);
    setFilter("");
    setMobile(false);
  }
  function notify(t) {
    setToast(t);
  }
  function event(text) {
    patch((x) => ({
      activity: [{ text, time: "Just now" }, ...x.activity],
      notifications: [
        { id: Date.now(), title: "Purchase update", text, read: false },
        ...x.notifications,
      ],
    }));
  }
  function changeRole(role) {
    patch({ role });
    go("Overview");
    setTab("Overview");
  }
  function navLabel(n) {
    if (d.language === "PT") return pt[n] || n;
    return (
      {
        Overview:
          d.role === "Agent" || d.role === "Lawyer" ? "Dashboard" : "Overview",
        Clients: "Cases",
        Purchases: "Cases",
        Agency: "Insights",
        Approvals: "Professionals",
        Finance: "Billing",
        Content: "Content and legal pages",
      }[n] || n
    );
  }
  const label = (s) => (d.language === "PT" ? pt[s] || s : s);
  const allProperties = [...properties, ...d.newListings];
  const property =
    allProperties.find((p) => p.id === selected) || properties[0];
  const purchase =
    allProperties.find((p) => p.id === d.purchaseProperty) || properties[0];
  const who =
    d.role === "Buyer"
      ? `${d.name} Carter`
      : d.role === "Agent"
        ? "Sofia Sousa"
        : d.role === "Lawyer"
          ? "Ana Costa"
          : "Ana Costa";
  function download(name, text, type = "text/plain") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function visibleMeetings() {
    return d.meetings.filter(
      (m) =>
        d.role === "Admin" ||
        (d.role === "Agent"
          ? m.pro === "Sofia Sousa"
          : d.role === "Lawyer"
            ? m.pro === "Dr. João Carvalho"
            : m.person === "Emily Carter"),
    );
  }
  function btn(text, fn, kind = "primary", Icon) {
    return (
      <button className={"btn " + kind} onClick={fn}>
        {Icon && <Icon size={16} />} {text}
      </button>
    );
  }
  function heading(eyebrow, title, desc, actions) {
    return (
      <div className="page-heading">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          {desc && <p>{desc}</p>}
        </div>
        {actions && <div className="heading-actions">{actions}</div>}
      </div>
    );
  }
  function section(title, link, fn) {
    return (
      <div className="section-title">
        <h2>{title}</h2>
        {link && (
          <button className="text-link" onClick={fn}>
            {link}
            <ArrowUpRight size={15} />
          </button>
        )}
      </div>
    );
  }
  function stats(items) {
    return (
      <div className="stats">
        {items.map(([title, value, sub, Icon]) => (
          <div className="stat" key={title}>
            <div className="stat-top">
              {title}
              <Icon size={18} />
            </div>
            <strong>{value}</strong>
            <span>{sub}</span>
          </div>
        ))}
      </div>
    );
  }
  function taskList(compact = false) {
    const items = d.tasks.filter(
      (t) => d.role === "Admin" || t.owner === d.role,
    );
    return (
      <div className="task-list">
        {items
          .filter((t) => !compact || !t.done)
          .slice(0, compact ? 3 : 99)
          .map((t) => (
            <div className={"task " + (t.done ? "done" : "")} key={t.id}>
              <button
                className="checkbox"
                aria-label={"Complete " + t.title}
                onClick={() => {
                  patch({
                    tasks: d.tasks.map((x) =>
                      x.id === t.id ? { ...x, done: !x.done } : x,
                    ),
                  });
                  notify(t.done ? "Task reopened" : "Task completed");
                }}
              >
                {t.done && <Check size={13} />}
              </button>
              <div>
                <b>{t.title}</b>
                <small>
                  {day(t.due)} · {t.owner}
                </small>
              </div>
              {!compact && (
                <button
                  className="icon-btn"
                  aria-label="Delete task"
                  onClick={() =>
                    patch({ tasks: d.tasks.filter((x) => x.id !== t.id) })
                  }
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          ))}
        {!items.filter((t) => !t.done).length && compact && (
          <p className="muted">
            You’re all caught up. Enjoy a little breathing room.
          </p>
        )}
      </div>
    );
  }
  function progress() {
    return (
      <div className="journey-steps">
        {stages.map((s, i) => (
          <div
            key={s}
            className={
              "journey-step " +
              (i < d.stage ? "complete" : i === d.stage ? "current" : "")
            }
          >
            <span>{i < d.stage ? <Check size={14} /> : i + 1}</span>
            <b>{s}</b>
            {i === d.stage && <small>You are here</small>}
          </div>
        ))}
      </div>
    );
  }
  function card(p) {
    return (
      <article className="property-card" key={p.id}>
        <div
          className="property-photo"
          onClick={() => {
            setSelected(p.id);
            go("Property");
          }}
        >
          <img src={p.image} alt={p.name} />
          <Badge>{p.tag || "New listing"}</Badge>
          <button
            className={"save-button " + (d.saved.includes(p.id) ? "saved" : "")}
            aria-label={"Save " + p.name}
            onClick={(e) => {
              e.stopPropagation();
              patch({
                saved: d.saved.includes(p.id)
                  ? d.saved.filter((x) => x !== p.id)
                  : [...d.saved, p.id],
              });
            }}
          >
            <Heart
              size={18}
              fill={d.saved.includes(p.id) ? "currentColor" : "none"}
            />
          </button>
        </div>
        <div className="property-info">
          <div className="property-price">
            {money(p.price)}
            <button
              className="icon-btn"
              aria-label={"View " + p.name}
              onClick={() => {
                setSelected(p.id);
                go("Property");
              }}
            >
              <ArrowUpRight size={18} />
            </button>
          </div>
          <h3
            onClick={() => {
              setSelected(p.id);
              go("Property");
            }}
          >
            {p.name}
          </h3>
          <p>
            <MapPin size={13} />
            {p.location}
          </p>
          <div className="property-specs">
            <span>
              <BedDouble size={15} />
              {p.beds} beds
            </span>
            <span>
              <Bath size={15} />
              {p.baths} baths
            </span>
            <span>
              <Maximize2 size={14} />
              {p.area} m²
            </span>
          </div>
          <div className="school-line">
            <span className="tiny-dot" />
            {p.school} · {p.schoolTime} min
          </div>
        </div>
      </article>
    );
  }
  function dashboard() {
    return <ReferenceDashboard ctx={context()} />;
  }
  function exportAgencies() {
    download(
      "ninho-agency-performance.csv",
      "Agency,Revenue,Active purchases,Accepted,Declined,Response minutes,Active hours\nAtlantic Living,28500,12,23,2,18,142\nLisbon Collective,12750,8,17,3,25,108\nPorto Homes,7400,4,9,1,29,76",
      "text/csv",
    );
    notify("Report downloaded");
  }
  function activityList() {
    return (
      <div className="activity-list">
        {d.activity.map((a, i) => (
          <div key={i}>
            <span className="activity-dot" />
            <p>
              {a.text}
              <small>{a.time}</small>
            </p>
          </div>
        ))}
      </div>
    );
  }
  function browse() {
    let list = allProperties.filter(
      (p) =>
        (page !== "Saved homes" || d.saved.includes(p.id)) &&
        (!filter ||
          (p.name + " " + p.location)
            .toLowerCase()
            .includes(filter.toLowerCase())) &&
        (region === "All regions" || p.region === region) &&
        (type === "All types" || p.type === type) &&
        (!max || p.price <= Number(max)),
    );
    return (
      <>
        {heading(
          "FIND YOUR PLACE",
          page === "Saved homes"
            ? "The places you’re drawn to."
            : "A home. A feeling. A new beginning.",
          "Discover homes in Portugal, with the local context that matters.",
          page === "Listings"
            ? btn(
                "Add property",
                () => setModal({ type: "listing" }),
                "primary",
                Plus,
              )
            : null,
        )}
        <div className="filter-bar">
          <label className="search-field">
            <Search size={17} />
            <input
              aria-label="Search homes"
              placeholder="City, neighborhood or home…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </label>
          <select
            aria-label="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {["All regions", "Lisbon", "Algarve", "Alentejo"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select
            aria-label="Property type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {["All types", "Villa", "Apartment", "Land"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select
            aria-label="Maximum price"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          >
            <option value="">Any budget</option>
            <option value="400000">Up to €400,000</option>
            <option value="600000">Up to €600,000</option>
            <option value="800000">Up to €800,000</option>
          </select>
        </div>
        <div className="results-line">
          <span>{list.length} homes to explore</span>
          <button
            className="text-link"
            onClick={() => {
              setFilter("");
              setRegion("All regions");
              setType("All types");
              setMax("");
            }}
          >
            Reset filters <RefreshCw size={13} />
          </button>
        </div>
        {list.length ? (
          <div className="property-grid">{list.map(card)}</div>
        ) : (
          <Empty
            title="A little more room to search."
            text="Try another region, a wider budget or save a home to see it here."
          />
        )}
      </>
    );
  }
  function propertyPage() {
    return <ReferenceProperty c={context()} p={property} />;
  }
  function clientTable(compact = false) {
    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Buyer & property</th>
              <th>Journey</th>
              <th>Budget</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {d.clients
              .slice(0, compact ? 3 : 99)
              .filter(
                (c) =>
                  !filter ||
                  (c.name + " " + c.property)
                    .toLowerCase()
                    .includes(filter.toLowerCase()),
              )
              .map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="person-line">
                      <Avatar name={c.name} />
                      <span>
                        <b>{c.name}</b>
                        <small>
                          {c.id === 1 ? purchase.name : c.property} ·{" "}
                          {c.country}
                        </small>
                      </span>
                    </div>
                  </td>
                  <td>
                    <Badge tone={c.id === 1 ? "green" : ""}>
                      {stages[c.id === 1 ? d.stage : c.stage]}
                    </Badge>
                  </td>
                  <td>{money(c.budget)}</td>
                  <td>
                    <button
                      className="icon-btn"
                      aria-label={"Open purchase for " + c.name}
                      onClick={() => {
                        setTab("Overview");
                        go(c.id === 1 ? "My purchase" : "Client detail");
                        setSelected(c.id);
                      }}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  function workspace() {
    if (page !== "Client detail") return <ReferencePurchase c={context()} />;
    const other =
      page === "Client detail" && selected !== 1
        ? d.clients.find((x) => x.id === selected)
        : null;
    const currentProperty = other
      ? allProperties.find((x) => x.name === other.property) || purchase
      : purchase;
    const stage = other ? other.stage : d.stage;
    return (
      <>
        {heading(
          "YOUR SHARED PURCHASE",
          currentProperty.name,
          `${currentProperty.location} · ${other ? other.name : "Emily Carter"} · ${money(currentProperty.price)}`,
          <>
            {d.role === "Lawyer" &&
              btn(
                "Update purchase stage",
                () => setModal({ type: "stage", other }),
                "primary",
                CheckCircle2,
              )}
            {btn(
              "Request a call",
              () => setModal({ type: "book", item: currentProperty }),
              "secondary",
              Phone,
            )}
          </>,
        )}
        <div className="purchase-summary">
          <img src={currentProperty.image} alt={currentProperty.name} />
          <div>
            <Badge tone="green">{stages[stage]}</Badge>
            <p>
              <b>{other?.country || "United Kingdom"}</b>
              <span>English</span>
              <span>Budget {money(other?.budget || 750000)}</span>
            </p>
            <small>
              Purchase {other ? "NIN-00" + other.id : "NIN-001"} · Your team,
              documents and next steps in one place.
            </small>
          </div>
          <span className="purchase-percentage">
            {Math.round(((stage + 1) / 5) * 100)}%<small>of your journey</small>
          </span>
        </div>
        {other ? (
          <div className="panel">
            <h2>A new chapter, just beginning.</h2>
            <p className="muted">
              {other.name} is at {stages[other.stage].toLowerCase()}. This
              purchase has its own team and documents.
            </p>
            {btn(
              "Request document",
              () => setModal({ type: "clientRequest", item: other }),
              "primary",
              FolderOpen,
            )}
            <p className="muted">
              {other.request || "No documents have been requested yet."}
            </p>
          </div>
        ) : (
          <>
            <div className="tabs">
              {[
                "Overview",
                "Documents",
                "Team",
                "Messages",
                "Payments",
                "Activity",
              ].map((t) => (
                <button
                  className={tab === t ? "active" : ""}
                  onClick={() => setTab(t)}
                  key={t}
                >
                  {label(t)}
                </button>
              ))}
            </div>
            {tab === "Overview" ? (
              <div className="workspace-grid">
                <div>
                  <section className="panel">
                    {section("Your roadmap")}
                    <p className="muted">
                      A little more clarity at every step.
                    </p>
                    {progress()}
                    <div className="stage-info">
                      <span className="stage-number">0{d.stage + 1}</span>
                      <div>
                        <h3>{stages[d.stage]}</h3>
                        <p>
                          {
                            [
                              "Explore homes, compare professionals and find your perfect fit.",
                              "Your offer has been accepted. Your team will coordinate the next steps.",
                              "Your lawyer is checking ownership, property records and legal details.",
                              "Review and sign the promissory agreement with your legal team.",
                              "Final deed, confirmed payments and the keys to your new home.",
                            ][d.stage]
                          }
                        </p>
                      </div>
                    </div>
                    {purchase.type === "Land" && (
                      <div className="callout">
                        <Building2 size={22} />
                        <span>
                          Land journey: architect → planning review → regional
                          construction company → build.
                        </span>
                      </div>
                    )}
                  </section>
                  <section className="panel">
                    {section(
                      "The latest on your purchase",
                      "All activity",
                      () => setTab("Activity"),
                    )}
                    {activityList()}
                  </section>
                </div>
                <aside>
                  <section className="panel">
                    {section("Your next steps", "Add task", () =>
                      setModal({ type: "task" }),
                    )}
                    {taskList(true)}
                  </section>
                  <section className="panel">
                    {section("Your team", "View team", () => setTab("Team"))}
                    {pros
                      .filter((p) => d.team.includes(p.id))
                      .map((p) => (
                        <div className="person-line" key={p.id}>
                          <Avatar name={p.name} color={p.color} />
                          <span>
                            <b>{p.name}</b>
                            <small>
                              {p.role} · {p.response} avg.
                            </small>
                          </span>
                        </div>
                      ))}
                  </section>
                </aside>
              </div>
            ) : tab === "Documents" ? (
              documentsView(true)
            ) : tab === "Team" ? (
              teamView()
            ) : tab === "Messages" ? (
              chatView(true)
            ) : tab === "Payments" ? (
              paymentsView(true)
            ) : (
              <section className="panel">{activityList()}</section>
            )}
          </>
        )}
      </>
    );
  }
  function teamView() {
    return (
      <>
        <div className="section-title">
          <h2>Good people, on your side.</h2>
          {btn(
            "Invite a professional",
            () => go("Professionals"),
            "secondary",
            Plus,
          )}
        </div>
        <div className="pro-grid">
          {pros.filter((p) => d.team.includes(p.id)).map(proCard)}
        </div>
        <p className="muted">
          {d.team.length + 1} of 7 participant places used, including the buyer.
        </p>
      </>
    );
  }
  function proCard(p) {
    return (
      <div className="panel pro-card" key={p.id}>
        <div className="pro-top">
          <Avatar name={p.name} color={p.color} size="large" />
          <Badge tone="green">
            <ShieldCheck size={11} />
            Verified profile
          </Badge>
        </div>
        <h3>{p.name}</h3>
        <p>
          {p.role} · {p.agency}
        </p>
        <div className="rating">
          <Star size={14} fill="currentColor" />
          {p.rating}
          <span>({p.reviews} reviews)</span>
        </div>
        <p className="pro-bio">{p.bio}</p>
        <div className="pro-detail">
          <MapPin size={14} />
          {p.area}
        </div>
        <div className="pro-detail">
          <Languages size={14} />
          {p.languages}
        </div>
        <div className="pro-detail">
          <Wallet size={14} />
          {p.budget}
        </div>
        <div className="tag-list">
          {p.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="button-row">
          {btn(
            "View profile",
            () => setModal({ type: "profile", item: p }),
            "secondary small",
          )}
          {btn(
            d.team.includes(p.id) ? "On your team" : "+ Invite",
            () => invite(p),
            "soft small",
          )}
        </div>
        <label className="compare-check">
          <input
            type="checkbox"
            checked={compare.includes(p.id)}
            onChange={() =>
              setCompare(
                compare.includes(p.id)
                  ? compare.filter((x) => x !== p.id)
                  : [...compare, p.id].slice(-3),
              )
            }
          />
          Compare professional
        </label>
      </div>
    );
  }
  function invite(p) {
    if (d.team.includes(p.id))
      return notify(p.name + " is already on your team");
    if (d.team.length >= 6)
      return notify(
        "A purchase supports up to 7 participants, including the buyer",
      );
    patch({ team: [...d.team, p.id] });
    event(p.name + " joined the purchase team");
    notify(p.name + " added to your demo purchase");
  }
  function directory() {
    return (
      <>
        {heading(
          "THE RIGHT PEOPLE, BESIDE YOU",
          "Local knowledge. Shared confidence.",
          "Meet the people who make a big move feel a little smaller.",
          compare.length > 0
            ? btn(
                `Compare (${compare.length})`,
                () => setModal({ type: "compare" }),
                "primary",
                Users,
              )
            : null,
        )}
        <div className="filter-bar">
          <label className="search-field">
            <Search size={17} />
            <input
              placeholder="Name, expertise or location…"
              aria-label="Search professionals"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </label>
          <select
            value={proFilter}
            onChange={(e) => setProFilter(e.target.value)}
            aria-label="Professional role"
          >
            {[
              "All professionals",
              "Real estate agent",
              "Property lawyer",
              "Architect",
              "Construction company",
              "Bank advisor",
              "Tax advisor",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <label className="inline-check">
            <input
              type="checkbox"
              checked={budgetFit}
              onChange={(e) => setBudgetFit(e.target.checked)}
            />
            D7 / D8 experience
          </label>
        </div>
        <div className="pro-grid">
          {pros
            .filter(
              (p) =>
                (proFilter === "All professionals" || p.role === proFilter) &&
                (!filter ||
                  (p.name + " " + p.area + " " + p.tags.join(" "))
                    .toLowerCase()
                    .includes(filter.toLowerCase())) &&
                (!budgetFit || p.tags.includes("D7 / D8 experience")),
            )
            .map(proCard)}
        </div>
      </>
    );
  }
  function documentAction(doc) {
    setModal({
      type:
        doc.status === "Requested"
          ? "upload"
          : doc.status === "Awaiting signature"
            ? "sign"
            : "document",
      item: doc,
    });
  }
  function documentsView(embedded = false) {
    const visible = d.documents.filter(
      (doc) => doc.access.includes(d.role) || d.role === "Admin",
    );
    return (
      <>
        {!embedded &&
          heading(
            "A LITTLE LESS PAPERWORK",
            "Everything, in its place.",
            "Purchase documents, shared with the right people.",
            <>
              {btn(
                "Request document",
                () => setModal({ type: "requestDoc" }),
                "secondary",
                Plus,
              )}
              {btn(
                "Upload document",
                () => setModal({ type: "upload" }),
                "primary",
                Upload,
              )}
            </>,
          )}
        {embedded && (
          <div className="section-title">
            <h2>Your purchase documents</h2>
            <div className="button-row">
              {btn(
                "Request",
                () => setModal({ type: "requestDoc" }),
                "secondary",
                Plus,
              )}
              {btn(
                "Upload",
                () => setModal({ type: "upload" }),
                "primary",
                Upload,
              )}
            </div>
          </div>
        )}
        <div className="callout">
          <ShieldCheck size={21} />
          <span>
            <b>Shared with care.</b> Each document lists the participants who
            can view it. This demo illustrates document visibility.
          </span>
        </div>
        <section className="panel no-padding">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Status</th>
                  <th>Shared with</th>
                  <th>Due</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {visible
                  .filter(
                    (doc) =>
                      !filter ||
                      doc.name.toLowerCase().includes(filter.toLowerCase()),
                  )
                  .map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div className="file-line">
                          <span className="file-icon">
                            <FileText size={20} />
                          </span>
                          <span>
                            <b>{doc.name}</b>
                            <small>
                              {doc.by} · {doc.date}
                            </small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <Badge
                          tone={
                            doc.status === "Verified" || doc.status === "Signed"
                              ? "green"
                              : doc.status === "Requested"
                                ? "amber"
                                : ""
                          }
                        >
                          {doc.status}
                        </Badge>
                      </td>
                      <td>
                        <span className="access-text">
                          <Lock size={12} />
                          {doc.access.join(", ")}
                        </span>
                      </td>
                      <td>{doc.due ? day(doc.due) : "—"}</td>
                      <td>
                        {btn(
                          doc.status === "Requested"
                            ? "Upload"
                            : doc.status === "Awaiting signature"
                              ? "Review & sign"
                              : "Open",
                          () => documentAction(doc),
                          "secondary small",
                          doc.status === "Requested" ? Upload : ArrowUpRight,
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!visible.length && (
            <Empty
              title="All clear for now."
              text="Upload a document or create a request to get started."
            />
          )}
        </section>
        <p className="muted fine">
          Sample purchase files and browser uploads are for demonstration.
          Production file storage and access enforcement require the backend
          implementation.
        </p>
      </>
    );
  }
  function chatView(embedded = false) {
    return (
      <>
        {!embedded &&
          heading(
            "ONE CONVERSATION. YOUR WHOLE TEAM.",
            "Good things start with a conversation.",
            "Stay in touch with everyone on your purchase.",
          )}
        <section className="panel chat-panel">
          <div className="chat-top">
            <div>
              <h3>T3 villa · Purchase team</h3>
              <p>
                <span className="tiny-dot" />
                {d.team.length + 1} participants · English & Portuguese
              </p>
            </div>
            <label className="switch-label">
              <input
                type="checkbox"
                checked={translate}
                onChange={(e) => setTranslate(e.target.checked)}
              />
              <Languages size={16} />
              {translate ? "Português" : "Translate"}
            </label>
          </div>
          <div className="chat-messages">
            <div className="chat-date">TODAY · 30 OCTOBER</div>
            {d.messages.map((m) => (
              <div
                className={"message " + (m.role === d.role ? "mine" : "")}
                key={m.id}
              >
                <Avatar
                  name={m.person}
                  color={m.role === "Agent" ? "sand" : "sage"}
                  size="small"
                />
                <div>
                  <div className="message-meta">
                    <b>{m.person}</b>
                    <span>{m.time}</span>
                  </div>
                  <div className="message-bubble">
                    {translate && m.pt ? m.pt : m.text}
                  </div>
                  {translate && m.pt && (
                    <small>
                      Translated from English ·{" "}
                      <button
                        className="text-link"
                        onClick={() => setTranslate(false)}
                      >
                        Show original
                      </button>
                    </small>
                  )}
                  {translate && !m.pt && (
                    <small>
                      Original message · Live translation available after
                      provider setup
                    </small>
                  )}
                </div>
              </div>
            ))}
          </div>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.elements.message;
              const text = input.value.trim();
              if (!text) return;
              patch({
                messages: [
                  ...d.messages,
                  {
                    id: Date.now(),
                    person: who,
                    role: d.role,
                    text,
                    time: new Date().toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  },
                ],
              });
              input.value = "";
            }}
          >
            <button
              type="button"
              className="icon-btn"
              aria-label="Attach document"
              onClick={() => setModal({ type: "upload" })}
            >
              <Plus size={20} />
            </button>
            <input
              name="message"
              aria-label="Message"
              placeholder="A question, an update, a little hello…"
              autoComplete="off"
            />
            <button className="send-btn" aria-label="Send message">
              <Send size={18} />
            </button>
          </form>
        </section>
      </>
    );
  }
  function meetingAction(id, status, prep) {
    patch({
      meetings: d.meetings.map((m) =>
        m.id === id ? { ...m, status, prep } : m,
      ),
    });
    event(
      `Meeting ${status.toLowerCase()}${prep ? " · Preparation shared with the buyer" : ""}`,
    );
    notify(
      status === "Confirmed"
        ? "Meeting accepted. Preparation added to the purchase chat."
        : "Meeting " + status.toLowerCase(),
    );
    if (prep)
      patch((x) => ({
        messages: [
          ...x.messages,
          {
            id: Date.now(),
            person: who,
            role: d.role,
            text: prep,
            time: "Now",
          },
        ],
      }));
    setModal(null);
  }
  function meetingsView() {
    return (
      <>
        {heading(
          "A MOMENT TO CONNECT",
          "Your meeting requests.",
          "Make time for the conversations that move things forward.",
          btn(
            "Schedule meeting",
            () => setModal({ type: "book", item: purchase }),
            "primary",
            Plus,
          ),
        )}
        <div className="tabs">
          {[
            "All",
            "Pending",
            "Confirmed",
            "Declined",
            "Reassigned",
            "Cancelled",
          ].map((t) => (
            <button
              className={meetingFilter === t ? "active" : ""}
              key={t}
              onClick={() => setMeetingFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="meeting-cards">
          {visibleMeetings()
            .filter(
              (m) => meetingFilter === "All" || m.status === meetingFilter,
            )
            .map((m) => (
              <section className="panel meeting-card" key={m.id}>
                <div className="meeting-date">
                  <strong>{new Date(m.date).getDate()}</strong>
                  <span>
                    {new Date(m.date).toLocaleDateString("en", {
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="meeting-info">
                  <Badge tone={m.status === "Pending" ? "amber" : "green"}>
                    {m.status}
                  </Badge>
                  <h3>{m.title}</h3>
                  <p>
                    {m.person} · {m.property}
                  </p>
                  <div className="detail-line">
                    <Clock size={14} />
                    {m.time} · Europe/Lisbon <span>·</span>
                    {m.type === "Video call" ? (
                      <Video size={14} />
                    ) : (
                      <MapPin size={14} />
                    )}{" "}
                    {m.type}
                  </div>
                  {m.prep && <small>Preparation: {m.prep}</small>}
                </div>
                <div className="meeting-actions">
                  {m.status === "Pending" ? (
                    <>
                      {btn(
                        "Accept & prepare",
                        () => setModal({ type: "prepare", item: m }),
                        "primary small",
                      )}
                      {d.role === "Agent" &&
                        btn(
                          "Reassign",
                          () => setModal({ type: "reassign", item: m }),
                          "secondary small",
                        )}
                      {btn(
                        "Decline",
                        () => meetingAction(m.id, "Declined"),
                        "ghost small",
                      )}
                    </>
                  ) : (
                    btn(
                      "View details",
                      () => setModal({ type: "appointment", item: m }),
                      "secondary small",
                      ArrowUpRight,
                    )
                  )}
                </div>
              </section>
            ))}
        </div>
      </>
    );
  }
  function calendarView() {
    let start = new Date(year, month, 1).getDay();
    start = (start + 6) % 7;
    const count = new Date(year, month + 1, 0).getDate();
    const cells = Array.from({ length: start + count }, (_, i) =>
      i < start ? null : i - start + 1,
    );
    function move(delta) {
      let date = new Date(year, month + delta, 1);
      setYear(date.getFullYear());
      setMonth(date.getMonth());
    }
    return (
      <>
        {heading(
          "SPACE FOR WHAT MATTERS",
          "A little order to your days.",
          "Meetings, viewings and deadlines in one place.",
          <>
            {btn(
              "Connect calendar",
              () => setModal({ type: "connect" }),
              "secondary",
              Link,
            )}
            {btn(
              "New appointment",
              () => setModal({ type: "book", item: purchase }),
              "primary",
              Plus,
            )}
          </>,
        )}
        <div className="calendar-layout">
          <section className="panel calendar-panel">
            <div className="section-title">
              <h2>
                {new Date(year, month, 1).toLocaleDateString("en", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="button-row">
                <button
                  className="icon-btn"
                  aria-label="Previous month"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  className="btn secondary small"
                  onClick={() => {
                    setMonth(9);
                    setYear(2026);
                  }}
                >
                  Today
                </button>
                <button
                  className="icon-btn"
                  aria-label="Next month"
                  onClick={() => move(1)}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <div className="calendar-grid">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((x) => (
                <div className="calendar-dayname" key={x}>
                  {x}
                </div>
              ))}
              {cells.map((n, i) => (
                <div
                  className={
                    "calendar-cell " +
                    (n === 30 && month === 9 && year === 2026 ? "today" : "")
                  }
                  key={i}
                >
                  {n && (
                    <>
                      <span>{n}</span>
                      {visibleMeetings()
                        .filter(
                          (m) =>
                            m.status !== "Declined" &&
                            m.status !== "Cancelled" &&
                            m.date ===
                              `${year}-${String(month + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`,
                        )
                        .map((m) => (
                          <button
                            key={m.id}
                            onClick={() =>
                              setModal({ type: "appointment", item: m })
                            }
                          >
                            {m.time} {m.title}
                          </button>
                        ))}
                      {d.tasks
                        .filter(
                          (t) =>
                            !t.done &&
                            t.owner === d.role &&
                            t.due ===
                              `${year}-${String(month + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`,
                        )
                        .map((t) => (
                          <button
                            className="deadline-event"
                            key={t.id}
                            onClick={() => go("Tasks")}
                          >
                            Due: {t.title}
                          </button>
                        ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
          <aside>
            <section className="panel">
              {section("Coming up")}
              {visibleMeetings()
                .filter(
                  (m) => m.status === "Confirmed" || m.status === "Pending",
                )
                .map((m) => (
                  <button
                    className="calendar-upcoming"
                    key={m.id}
                    onClick={() => setModal({ type: "appointment", item: m })}
                  >
                    <span>{day(m.date)}</span>
                    <b>{m.title}</b>
                    <small>
                      {m.time} · {m.person}
                    </small>
                  </button>
                ))}
            </section>
            <section className="panel">
              <h3>Your calendars</h3>
              <p className="muted">Europe/Lisbon · UTC+0</p>
              {["Google", "Outlook"].map((x) => (
                <button
                  className="action-line"
                  onClick={() => setModal({ type: "connect" })}
                  key={x}
                >
                  <CalendarDays size={16} />
                  {x}
                  <Badge>
                    {d.connections.includes(x) ? "Demo linked" : "Connect"}
                  </Badge>
                </button>
              ))}
            </section>
          </aside>
        </div>
      </>
    );
  }
  function paymentsView(embedded = false) {
    const total = d.payments.reduce(
      (a, p) => a + (p.status === "Outstanding" ? p.amount : 0),
      0,
    );
    return (
      <>
        {!embedded &&
          heading(
            "CLEAR NUMBERS. PEACE OF MIND.",
            "The practical side of your purchase.",
            "Payment records and next steps, without the guesswork.",
            d.role === "Admin"
              ? btn(
                  "Record payment",
                  () => setModal({ type: "payment" }),
                  "primary",
                  Plus,
                )
              : null,
          )}
        {stats([
          ["Outstanding", money(total), "Manual payment records", Wallet],
          [
            "Recorded as paid",
            money(
              d.payments.reduce(
                (a, p) => a + (p.status === "Paid" ? p.amount : 0),
                0,
              ),
            ),
            "Confirmed by NINHO",
            CheckCircle2,
          ],
          [
            "Property price",
            money(purchase.price),
            "Base currency · EUR",
            House,
          ],
        ])}
        <div className="callout">
          <Info size={20} />
          <span>
            <b>Payments are coordinated by NINHO.</b> Funds are collected
            outside the platform. No payment is collected in this demonstration.
          </span>
        </div>
        <section className="panel no-padding">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Reference</th>
                  <th>Due date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {d.payments.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <b>{p.title}</b>
                      <small>{p.type}</small>
                    </td>
                    <td>{p.reference}</td>
                    <td>{day(p.due)}</td>
                    <td>
                      <b>{money(p.amount)}</b>
                    </td>
                    <td>
                      <Badge tone={p.status === "Paid" ? "green" : "amber"}>
                        {p.status}
                      </Badge>
                    </td>
                    <td>
                      {btn(
                        p.status === "Paid" ? "Receipt" : "Details",
                        () => setModal({ type: "paymentDetail", item: p }),
                        "secondary small",
                        ArrowUpRight,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }
  function agencyTable() {
    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Agency</th>
              <th>Revenue</th>
              <th>Calls ✓ / ×</th>
              <th>Avg. reply</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {[
              ["Atlantic Living", 28500, "23 / 2", "18 min"],
              ["Lisbon Collective", 12750, "17 / 3", "25 min"],
              ["Porto Homes", 7400, "9 / 1", "29 min"],
            ].map((a, i) => (
              <tr key={a[0]}>
                <td>
                  <div className="agency-name">
                    <span className="rank">0{i + 1}</span>
                    <span>
                      <b>{a[0]}</b>
                      <small>
                        {[142, 108, 76][i]} active hours · {[12, 8, 4][i]}{" "}
                        purchases
                      </small>
                    </span>
                  </div>
                </td>
                <td>{money(a[1])}</td>
                <td>{a[2]}</td>
                <td>
                  <Badge tone="green">{a[3]}</Badge>
                </td>
                <td>
                  <button
                    className="icon-btn"
                    aria-label={"View " + a[0]}
                    onClick={() =>
                      setModal({ type: "agencyDetail", item: a, index: i })
                    }
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  function agencyView() {
    return (
      <>
        {heading(
          "ATLANTIC LIVING",
          page === "Agency"
            ? "Better, together."
            : "The partnerships behind the progress.",
          page === "Agency"
            ? "Your team’s activity, clients and shared success."
            : "Agency performance across the NINHO community.",
          btn("Export report", exportAgencies, "secondary", Download),
        )}
        {page === "Agency" ? (
          <>
            {stats([
              ["Homes listed", "24", "6 new this month", House],
              ["Viewings", "38", "This month", CalendarDays],
              ["Average review", "4.9 / 5", "From 86 buyers", Star],
              ["New clients", "18", "Assigned this month", Users],
            ])}
            <section className="panel">
              <h2>Your team, at a glance.</h2>
              <div className="agent-bars">
                {[
                  ["Sofia Sousa", 8],
                  ["Ana Ribeiro", 6],
                  ["Ricardo Silva", 4],
                ].map(([n, v]) => (
                  <div key={n}>
                    <div className="person-line">
                      <Avatar name={n} />
                      <span>
                        <b>{n}</b>
                        <small>{v} new clients this month</small>
                      </span>
                    </div>
                    <div className="bar-track">
                      <span style={{ width: (v / 8) * 100 + "%" }} />
                    </div>
                    {btn(
                      "View clients",
                      () => {
                        go("Clients");
                        setFilter(n === "Sofia Sousa" ? "Wilson" : "");
                      },
                      "ghost small",
                      ArrowUpRight,
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="panel">{agencyTable()}</section>
        )}
      </>
    );
  }
  function commissionView() {
    const commission = Math.round((purchase.price * d.agencyRate) / 100);
    return (
      <>
        {heading(
          "THE WORK, RECOGNIZED.",
          "Commissions & invoices.",
          "A clear record of each deal and the value it brings.",
          btn(
            "Commission settings",
            () => setModal({ type: "rate" }),
            "secondary",
            Settings,
          ),
        )}
        {stats([
          ["Pending commission", money(commission), "T3 villa", Wallet],
          [
            "Agency default",
            d.agencyRate + "%",
            "Applied to new deals",
            TrendingUp,
          ],
          [
            "Paid this month",
            "€12,750",
            "Across 3 completed purchases",
            CheckCircle2,
          ],
        ])}
        <section className="panel">
          <h2>Your commission ledger</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Purchase</th>
                  <th>Sale price</th>
                  <th>Rate</th>
                  <th>Commission</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>{purchase.name}</b>
                    <small>Emily Carter</small>
                  </td>
                  <td>{money(purchase.price)}</td>
                  <td>{d.agencyRate}%</td>
                  <td>{money(commission)}</td>
                  <td>
                    <Badge tone="amber">Pending completion</Badge>
                  </td>
                  <td>
                    {btn(
                      "View deal",
                      () => go("My purchase"),
                      "secondary small",
                      ArrowUpRight,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel">
          <h2>Monthly invoice</h2>
          <p className="muted">October 2026 · Agency commission statement</p>
          {btn(
            "Preview statement",
            () => setModal({ type: "invoice", amount: commission }),
            "secondary",
            FileText,
          )}
          <p className="muted fine">
            Demo statements are not tax invoices. Certified Portuguese invoicing
            requires NINHO’s selected provider.
          </p>
        </section>
      </>
    );
  }
  function membership() {
    return (
      <>
        {heading(
          "YOUR NINHO MEMBERSHIP",
          "A place in the right community.",
          "Manage your professional membership and billing records.",
        )}
        <div className="membership-layout">
          <section className="panel membership-card">
            <Leaf size={32} />
            <div className="eyebrow">LEGAL PROFESSIONAL</div>
            <h2>
              Growing trust.
              <br />
              One purchase at a time.
            </h2>
            <p>
              A shared workspace for your clients, their documents and everyone
              working towards completion.
            </p>
            <div className="membership-price">
              €49<span>/ month · illustrative</span>
            </div>
            <Badge tone="green">Active membership</Badge>
          </section>
          <section className="panel">
            <h2>Membership details</h2>
            <div className="key-value">
              <span>Member</span>
              <b>Dr. João Carvalho</b>
            </div>
            <div className="key-value">
              <span>Billing period</span>
              <b>1 – 30 November 2026</b>
            </div>
            <div className="key-value">
              <span>Renewal date</span>
              <b>1 November 2026</b>
            </div>
            <div className="key-value">
              <span>Payment status</span>
              <Badge tone={d.membershipPaid ? "green" : "amber"}>
                {d.membershipPaid
                  ? "Recorded as paid"
                  : "Awaiting manual confirmation"}
              </Badge>
            </div>
            <p className="muted">
              NINHO records membership payments after receiving them outside the
              platform.
            </p>
            {btn(
              "Contact NINHO",
              () => setModal({ type: "support" }),
              "secondary",
              MessageSquare,
            )}
          </section>
        </div>
      </>
    );
  }
  function approvals() {
    return (
      <>
        {heading(
          "GROWING WITH GOOD PEOPLE",
          "Professional applications.",
          "Review the people asking to join the NINHO community.",
        )}
        <div className="pro-grid">
          {d.approvals.map((a) => (
            <section className="panel" key={a.id}>
              <Avatar name={a.name} size="large" />
              <h3>{a.name}</h3>
              <p>
                {a.role} · {a.agency}
              </p>
              <p className="muted">{a.email}</p>
              <Badge tone={a.status === "Approved" ? "green" : "amber"}>
                {a.status}
              </Badge>
              <div className="button-row">
                {btn(
                  "Review application",
                  () => setModal({ type: "approval", item: a }),
                  "secondary small",
                  ArrowUpRight,
                )}
              </div>
            </section>
          ))}
        </div>
      </>
    );
  }
  function finance() {
    return (
      <>
        {heading(
          "NINHO OPERATIONS",
          "Every number, accounted for.",
          "Manual payment records, agency commissions and professional memberships.",
          btn(
            "Record payment",
            () => setModal({ type: "payment" }),
            "primary",
            Plus,
          ),
        )}
        <div className="tabs">
          {["Payments", "Commissions", "Memberships"].map((x) => (
            <button
              key={x}
              className={tab === x ? "active" : ""}
              onClick={() => setTab(x)}
            >
              {x}
            </button>
          ))}
        </div>
        {tab === "Commissions" ? (
          commissionView()
        ) : tab === "Memberships" ? (
          <section className="panel">
            <h2>Lawyer memberships</h2>
            <div className="key-value">
              <span>Dr. João Carvalho · €49 / month · Renews 1 Nov</span>
              <Badge tone={d.membershipPaid ? "green" : "amber"}>
                {d.membershipPaid ? "Paid" : "Outstanding"}
              </Badge>
            </div>
            {btn(
              d.membershipPaid ? "Mark outstanding" : "Record membership paid",
              () => {
                patch({ membershipPaid: !d.membershipPaid });
                notify("Membership payment record updated");
              },
              "secondary",
              CheckCircle2,
            )}
          </section>
        ) : (
          paymentsView(true)
        )}
      </>
    );
  }
  function settings() {
    return (
      <>
        {heading(
          "MAKE YOURSELF AT HOME",
          "Your preferences.",
          "A few small details that make this space yours.",
        )}
        <div className="settings-layout">
          <section className="panel">
            <h2>Your profile</h2>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                patch({ name: new FormData(e.target).get("name") });
                notify("Profile updated");
              }}
            >
              <label>
                First name
                <input name="name" defaultValue={d.name} required />
              </label>
              <label>
                Preferred language
                <select
                  value={d.language}
                  onChange={(e) => patch({ language: e.target.value })}
                >
                  <option value="EN">English</option>
                  <option value="PT">Português</option>
                </select>
              </label>
              <label>
                Email
                <input
                  type="email"
                  defaultValue="emma.wilson@example.com"
                  disabled
                />
              </label>
              <button className="btn primary">Save preferences</button>
            </form>
          </section>
          <section className="panel">
            <h2>
              {d.role === "Admin"
                ? "Platform settings"
                : "About this client demo"}
            </h2>
            {d.role === "Admin" &&
              btn(
                "Business hours & visibility",
                () => setModal({ type: "preferences" }),
                "secondary",
                Settings,
              )}
            <p className="muted">
              Explore NINHO as a buyer, agent, lawyer or administrator using the
              workspace switcher. People, properties and records are fictional.
            </p>
            <p className="muted">
              Changes are saved only in this browser. Authentication, provider
              connections, translations, legal signatures and invoicing are
              illustrated. No emails or payments are sent.
            </p>
            {btn(
              "Reset demo data",
              () => setModal({ type: "reset" }),
              "secondary",
              RefreshCw,
            )}
            <div className="divider" />
            {["privacy", "terms", "consent"].map((x) => (
              <button
                className="action-line"
                key={x}
                onClick={() => setModal({ type: "legal", key: x })}
              >
                {x[0].toUpperCase() + x.slice(1)}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </section>
        </div>
      </>
    );
  }
  function contentView() {
    return (
      <>
        {heading(
          "THE WORDS BEHIND THE EXPERIENCE",
          "Content & legal pages.",
          "Manage demonstration content in English. Production legal text is supplied by NINHO.",
        )}
        <div className="settings-layout">
          {Object.keys(d.content).map((k) => (
            <section className="panel" key={k}>
              <h2>{k[0].toUpperCase() + k.slice(1)}</h2>
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  patch({
                    content: {
                      ...d.content,
                      [k]: new FormData(e.target).get("text"),
                    },
                  });
                  notify("Content saved");
                }}
              >
                <textarea
                  name="text"
                  defaultValue={d.content[k]}
                  rows="6"
                  required
                />
                <button className="btn secondary">Save content</button>
              </form>
            </section>
          ))}
        </div>
      </>
    );
  }
  function welcome() {
    return (
      <div className="welcome">
        <nav>
          <a className="brand" href="#welcome">
            <Brand />
          </a>
          <div>
            <button onClick={() => go("Properties")}>Find a home</button>
            <button onClick={() => go("Professionals")}>Our people</button>
            <button className="btn primary" onClick={() => go("login")}>
              Step inside <ArrowUpRight size={16} />
            </button>
          </div>
        </nav>
        <div className="welcome-hero">
          <img src="/images/villa.jpg" alt="A home filled with possibilities" />
          <div className="hero-shade" />
          <div>
            <div className="eyebrow">YOUR NEXT CHAPTER, IN PORTUGAL</div>
            <h1>
              A place to live.
              <br />A place to belong.
            </h1>
            <p>
              Find a home. Meet your people. Bring every step
              <br />
              of your Portuguese property journey together.
            </p>
            {btn(
              "Find your place",
              () => go("Properties"),
              "white",
              ArrowUpRight,
            )}
            {btn(
              "Explore the platform",
              () => go("login"),
              "glass",
              ArrowRight,
            )}
          </div>
        </div>
        <section>
          <div className="eyebrow">A BIG MOVE. A LITTLE MORE CLARITY.</div>
          <h2>
            From the first “what if”
            <br />
            to the keys in your hand.
          </h2>
          <div className="welcome-features">
            {[
              [
                "01",
                "Find your place",
                "Explore homes with the local details that help you picture your life there.",
              ],
              [
                "02",
                "Meet your people",
                "Choose agents, lawyers and local advisors who understand your next chapter.",
              ],
              [
                "03",
                "Move forward, together",
                "One shared purchase, a clear roadmap and everything in its place.",
              ],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </section>
        <footer>
          ninho · A place to call yours.
          <span>Client demonstration · Portugal</span>
          <button onClick={() => setModal({ type: "legal", key: "privacy" })}>
            Privacy
          </button>
        </footer>
      </div>
    );
  }
  function login() {
    const roleOptions = [
      { id: "Buyer", label: "I'm a client", Icon: User },
      { id: "Agent", label: "I'm a real estate agent", Icon: House },
      { id: "Lawyer", label: "I'm a lawyer", Icon: Scale },
    ];
    const emailDisplay = loginEmail || "you@company.com";
    return (
      <div className={"login" + (loginStep ? " login-2fa" : "")}>
        <div className="login-visual">
          <a className="brand" href="#welcome">
            <Brand />
          </a>
          <img src="/brand/ninho-arch.jpg" alt="" />
          <div>
            <h1>
              One place for everyone
              <br />
              on your home purchase.
            </h1>
          </div>
        </div>
        <div className="login-content">
          {loginStep ? (
            <div className="login-2fa-bar">
              <button
                type="button"
                className="login-back"
                onClick={() => {
                  setLoginStep(0);
                  setOtp(["", "", "", "", "", ""]);
                }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <a className="brand login-2fa-brand" href="#welcome">
                <Brand />
              </a>
            </div>
          ) : (
            <div className="login-lang">
              {["EN", "PT", "ES"].map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 ? <span aria-hidden="true">|</span> : null}
                  <button
                    type="button"
                    className={d.language === l ? "active" : ""}
                    onClick={() => patch({ language: l })}
                  >
                    {l}
                  </button>
                </React.Fragment>
              ))}
            </div>
          )}
          <div className="login-form">
            <h1>
              {loginStep ? "Two-factor authentication" : "Welcome back"}
            </h1>
            <p className="muted">
              {loginStep
                ? `We've sent a 6-digit code to your email address (${emailDisplay}).`
                : "Log in to your NINHO account."}
            </p>
            {!loginStep ? (
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoginEmail(new FormData(e.target).get("email"));
                  setOtp(["", "", "", "", "", ""]);
                  setLoginStep(1);
                }}
              >
                <div className="role-cards">
                  {roleOptions.map(({ id, label, Icon }) => (
                    <button
                      type="button"
                      key={id}
                      className={loginRole === id ? "active" : ""}
                      onClick={() => setLoginRole(id)}
                    >
                      {loginRole === id ? (
                        <span className="role-check" aria-hidden="true">
                          <Check size={10} strokeWidth={3} />
                        </span>
                      ) : null}
                      <Icon size={22} strokeWidth={1.5} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="login-other-pro"
                  onClick={() => setModal({ type: "access" })}
                >
                  Other professional? Request access
                </button>
                <label>
                  Email address
                  <span className="login-field">
                    <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      required
                    />
                  </span>
                </label>
                <label>
                  Password
                  <span className="login-field">
                    <Lock size={16} strokeWidth={1.5} aria-hidden="true" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      minLength="4"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="login-field-toggle"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <EyeOff size={16} strokeWidth={1.5} />
                      ) : (
                        <Eye size={16} strokeWidth={1.5} />
                      )}
                    </button>
                  </span>
                </label>
                <label className="inline-check">
                  <input type="checkbox" />
                  Remember me
                </label>
                <button className="btn primary full">Log in</button>
                <button
                  type="button"
                  className="text-link login-forgot"
                  onClick={() => setModal({ type: "recovery" })}
                >
                  Forgot password?
                </button>
                <div className="login-or" role="separator">
                  <span>or</span>
                </div>
                <button
                  type="button"
                  className="text-link login-create"
                  onClick={() => setModal({ type: "signup" })}
                >
                  Create a client account
                </button>
              </form>
            ) : (
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (otp.join("") !== "123456")
                    return notify("Use the demo code 123456");
                  changeRole(loginRole);
                  setLoginStep(0);
                  setOtp(["", "", "", "", "", ""]);
                  notify(
                    "Welcome to your " + loginRole.toLowerCase() + " workspace",
                  );
                }}
              >
                <input name="code" type="hidden" value={otp.join("")} />
                <div className="otp-fields">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      aria-label={"Verification digit " + (i + 1)}
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength="1"
                      value={digit}
                      required
                      autoFocus={i === 0}
                      onChange={(e) => {
                        const v = e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(-1);
                        setOtp(otp.map((x, j) => (j === i ? v : x)));
                        if (v) e.target.nextElementSibling?.focus();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit)
                          e.target.previousElementSibling?.focus();
                      }}
                      onPaste={(e) => {
                        const value = e.clipboardData
                          .getData("text")
                          .replace(/[^0-9]/g, "")
                          .slice(0, 6);
                        if (value.length === 6) {
                          e.preventDefault();
                          setOtp(value.split(""));
                        }
                      }}
                    />
                  ))}
                </div>
                <button className="btn primary full">Continue</button>
                <button
                  type="button"
                  className="text-link login-resend"
                  onClick={() => {
                    setOtp(["", "", "", "", "", ""]);
                    notify("Demo code resent · use 123456");
                  }}
                >
                  Resend code
                </button>
              </form>
            )}
            {!loginStep ? (
              <p className="login-note">
                <Info size={14} strokeWidth={1.75} aria-hidden="true" />
                Professionals join by invitation or approval.
              </p>
            ) : null}
            <div className="login-legal">
              <button
                type="button"
                onClick={() => setModal({ type: "legal", key: "privacy" })}
              >
                Privacy policy
              </button>
              <button
                type="button"
                onClick={() => setModal({ type: "legal", key: "terms" })}
              >
                Terms
              </button>
              <button
                type="button"
                onClick={() => setModal({ type: "legal", key: "consent" })}
              >
                Cookie settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function modalBody() {
    if (!modal) return null;
    if (
      [
        "reminder",
        "visibility",
        "templates",
        "invoiceBatch",
        "invoiceSend",
        "responders",
        "agentDetail",
        "preferences",
      ].includes(modal.type)
    )
      return <ReferenceModal c={context()} modal={modal} />;
    const m = modal;
    const close = () => setModal(null);
    const done = (t) => {
      close();
      notify(t);
    };
    const form = (children, submit, text = "Save changes") => (
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          submit(new FormData(e.target), e.target);
        }}
      >
        {children}
        <div className="modal-actions">
          <button type="button" className="btn secondary" onClick={close}>
            Cancel
          </button>
          <button className="btn primary">
            {text}
            <ArrowRight size={15} />
          </button>
        </div>
      </form>
    );
    let title = "",
      body = null;
    if (m.type === "book") {
      title = "Make a little time.";
      body = form(
        <>
          <p className="muted">
            Request a viewing or conversation about {m.item.name}.
          </p>
          <label>
            Meeting title
            <input name="title" defaultValue="Property viewing" required />
          </label>
          <div className="form-row">
            <label>
              Date
              <input
                name="date"
                type="date"
                defaultValue={m.date || "2026-11-05"}
                min="2026-10-30"
                required
              />
            </label>
            <label>
              Time · Lisbon
              <input
                name="time"
                type="time"
                defaultValue={m.time || "10:30"}
                required
              />
            </label>
          </div>
          <label>
            With
            <select name="pro">
              {pros
                .filter((x) => x.role !== "Construction company")
                .map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
            </select>
          </label>
          <label>
            Format
            <select name="format">
              <option>In person</option>
              <option>Video call</option>
              <option>Phone call</option>
            </select>
          </label>
          <label>
            A note for your professional
            <textarea
              name="note"
              placeholder="Anything you’d like us to know?"
              rows="3"
            />
          </label>
        </>,
        (fd) => {
          patch({
            meetings: [
              ...d.meetings,
              {
                id: Date.now(),
                title: fd.get("title"),
                date: fd.get("date"),
                time: fd.get("time"),
                pro: fd.get("pro"),
                person: d.role === "Buyer" ? who : "Emily Carter",
                type: fd.get("format"),
                property: m.item.name,
                status: "Pending",
                note: fd.get("note"),
              },
            ],
          });
          event("New meeting requested: " + fd.get("title"));
          done("Meeting request added. View it in Calendar or Meetings.");
        },
        "Request appointment",
      );
    }
    if (m.type === "appointment") {
      let x = d.meetings.find((a) => a.id === m.item.id) || m.item;
      title = x.title;
      body = (
        <>
          <Badge tone="green">{x.status}</Badge>
          <div className="key-value">
            <span>When</span>
            <b>
              {day(x.date)} 2026 · {x.time}
            </b>
          </div>
          <div className="key-value">
            <span>Timezone</span>
            <b>Europe/Lisbon</b>
          </div>
          <div className="key-value">
            <span>With</span>
            <b>{x.pro}</b>
          </div>
          <div className="key-value">
            <span>Where</span>
            <b>
              {x.type} · {x.property}
            </b>
          </div>
          {x.prep && <div className="callout">{x.prep}</div>}
          {x.note && <p>{x.note}</p>}
          <div className="button-row">
            {btn(
              "Add to my calendar",
              () => {
                download(
                  "ninho-appointment.ics",
                  `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//NINHO//Client demo//EN\r\nBEGIN:VEVENT\r\nUID:ninho-${x.id}\r\nDTSTAMP:20261030T100000Z\r\nDTSTART:${x.date.replaceAll("-", "")}T${x.time.replace(":", "")}00Z\r\nSUMMARY:${x.title}\r\nLOCATION:${x.property}\r\nEND:VEVENT\r\nEND:VCALENDAR`,
                  "text/calendar",
                );
                notify("Calendar file downloaded");
              },
              "secondary",
              Download,
            )}
            {btn(
              "Reschedule",
              () => setModal({ type: "reschedule", item: x }),
              "secondary",
              CalendarDays,
            )}
          </div>
          {!["Cancelled", "Declined"].includes(x.status) &&
            btn(
              "Cancel appointment",
              () => meetingAction(x.id, "Cancelled"),
              "ghost",
            )}
        </>
      );
    }
    if (m.type === "reschedule") {
      title = "Find a better moment.";
      body = form(
        <>
          <label>
            Date
            <input
              name="date"
              type="date"
              defaultValue={m.item.date}
              min="2026-10-30"
              required
            />
          </label>
          <label>
            Time · Lisbon
            <input
              name="time"
              type="time"
              defaultValue={m.item.time}
              required
            />
          </label>
        </>,
        (fd) => {
          patch({
            meetings: d.meetings.map((x) =>
              x.id === m.item.id
                ? {
                    ...x,
                    date: fd.get("date"),
                    time: fd.get("time"),
                    status: "Pending",
                  }
                : x,
            ),
          });
          event("Appointment rescheduled; awaiting confirmation");
          done("Appointment rescheduled");
        },
        "Request new time",
      );
    }
    if (m.type === "prepare") {
      title = "Accept, and set them at ease.";
      body = form(
        <>
          <p className="muted">
            {m.item.title} with {m.item.person} · {day(m.item.date)}
          </p>
          <label>
            Saved preparation
            <select
              onChange={(e) => {
                document.querySelector("#prep-text").value = e.target.value;
              }}
            >
              <option value="Please bring a photo ID and a list of any questions. We look forward to meeting you.">
                First meeting essentials
              </option>
              <option value="Please have your passport, NIF and proof of funds ready. We will discuss the legal timeline and next steps.">
                Legal introduction
              </option>
              <option value="We will meet at the property entrance. Allow around one hour for the viewing and bring any questions about the home.">
                Property viewing
              </option>
            </select>
          </label>
          <label>
            Preparation message
            <textarea
              id="prep-text"
              name="prep"
              rows="4"
              defaultValue="Please bring a photo ID and a list of any questions. We look forward to meeting you."
              required
            />
          </label>
          <small className="muted">
            Acceptance adds this message to the demo purchase chat.
          </small>
        </>,
        (fd) => meetingAction(m.item.id, "Confirmed", fd.get("prep")),
        "Accept & share preparation",
      );
    }
    if (m.type === "reassign") {
      title = "Put the right person beside them.";
      body = form(
        <label>
          Assign to
          <select name="pro">
            <option>Ana Ribeiro</option>
            <option>Ricardo Silva</option>
            <option>Sofia Sousa</option>
          </select>
        </label>,
        (fd) => {
          patch({
            meetings: d.meetings.map((x) =>
              x.id === m.item.id
                ? { ...x, pro: fd.get("pro"), status: "Reassigned" }
                : x,
            ),
          });
          event("Meeting reassigned to " + fd.get("pro"));
          done("Meeting reassigned");
        },
        "Reassign meeting",
      );
    }
    if (m.type === "task") {
      title = "One small step.";
      body = form(
        <>
          <label>
            Task
            <input
              name="title"
              placeholder="What needs a little attention?"
              required
            />
          </label>
          <label>
            Due date
            <input name="due" type="date" defaultValue="2026-11-04" required />
          </label>
          <label>
            Owner
            <select
              name="owner"
              defaultValue={d.role === "Admin" ? "Agent" : d.role}
            >
              {["Buyer", "Agent", "Lawyer"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
        </>,
        (fd) => {
          patch({
            tasks: [
              ...d.tasks,
              {
                id: Date.now(),
                title: fd.get("title"),
                due: fd.get("due"),
                owner: fd.get("owner"),
                done: false,
              },
            ],
          });
          done("Task added");
        },
        "Add task",
      );
    }
    if (m.type === "requestDoc") {
      title = "Ask for what you need.";
      body = form(
        <>
          <label>
            Document name
            <input name="name" placeholder="e.g. Energy certificate" required />
          </label>
          <label>
            Category
            <select name="category">
              {["Property", "Identity", "Financial", "Contract", "Other"].map(
                (x) => (
                  <option key={x}>{x}</option>
                ),
              )}
            </select>
          </label>
          <label>
            Due date
            <input name="due" type="date" defaultValue="2026-11-05" required />
          </label>
          <fieldset>
            <legend>Who can view this document?</legend>
            {["Buyer", "Agent", "Lawyer"].map((x) => (
              <label className="inline-check" key={x}>
                <input
                  type="checkbox"
                  name="access"
                  value={x}
                  defaultChecked={x === "Buyer" || x === d.role}
                />
                {x}
              </label>
            ))}
          </fieldset>
        </>,
        (fd) => {
          const access = [...new Set([...fd.getAll("access"), d.role])];
          patch({
            documents: [
              ...d.documents,
              {
                id: Date.now(),
                name: fd.get("name"),
                category: fd.get("category"),
                due: fd.get("due"),
                by: who,
                date: "30 Oct 2026",
                status: "Requested",
                access,
              },
            ],
          });
          event("Document requested: " + fd.get("name"));
          done("Request added. Permitted participants see it in Documents.");
        },
        "Create request",
      );
    }
    if (m.type === "clientRequest") {
      title = "Request a client document.";
      body = form(
        <>
          <p className="muted">
            For {m.item.name} · {m.item.property}
          </p>
          <label>
            Document name
            <input name="name" placeholder="e.g. Passport copy" required />
          </label>
          <label>
            Due date
            <input type="date" name="due" defaultValue="2026-11-05" required />
          </label>
        </>,
        (fd) => {
          patch({
            clients: d.clients.map((c) =>
              c.id === m.item.id
                ? {
                    ...c,
                    request: `Requested: ${fd.get("name")} · Due ${day(fd.get("due"))}`,
                  }
                : c,
            ),
          });
          done("Document request added to this client’s purchase");
        },
        "Request document",
      );
    }
    if (m.type === "upload") {
      title = "Everything, in its place.";
      body = form(
        <>
          <div className="upload-area">
            <Upload size={27} />
            <b>Choose a document to share</b>
            <span>PDF or image · up to 2 MB for this demo</span>
            <input
              name="file"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.txt"
              required
            />
          </div>
          <label>
            Document name
            <input
              name="name"
              defaultValue={m.item?.name || ""}
              placeholder="Optional — uses file name"
            />
          </label>
          <fieldset>
            <legend>Share with</legend>
            {["Buyer", "Agent", "Lawyer"].map((x) => (
              <label className="inline-check" key={x}>
                <input
                  type="checkbox"
                  name="access"
                  value={x}
                  defaultChecked={m.item ? m.item.access.includes(x) : true}
                />
                {x}
              </label>
            ))}
          </fieldset>
          <small className="muted">
            Browser demo only. Use sample files rather than personal documents.
          </small>
        </>,
        async (fd) => {
          const file = fd.get("file");
          if (file.size > 2 * 1024 * 1024)
            return notify("Choose a file under 2 MB for the browser demo");
          const content = await new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result);
            r.onerror = reject;
            r.readAsDataURL(file);
          });
          const doc = {
            id: m.item?.id || Date.now(),
            name: fd.get("name") || file.name,
            category: m.item?.category || "Other",
            by: who,
            date: "30 Oct 2026",
            status: "Ready to review",
            access: [...new Set([...fd.getAll("access"), d.role])],
            content,
            fileName: file.name,
            due: m.item?.due,
          };
          patch({
            documents: m.item
              ? d.documents.map((x) => (x.id === m.item.id ? doc : x))
              : [...d.documents, doc],
          });
          event(who + " uploaded " + doc.name);
          done("Document uploaded to this browser demo");
        },
        "Upload & share",
      );
    }
    if (m.type === "document") {
      const doc = d.documents.find((x) => x.id === m.item.id) || m.item;
      title = doc.name;
      body = (
        <>
          <Badge tone="green">{doc.status}</Badge>
          <div className="document-preview">
            <FileText size={40} />
            <h3>{doc.name}</h3>
            <p>
              Uploaded by {doc.by} · {doc.date}
            </p>
            <p className="muted">
              {doc.content
                ? "Your browser upload is available to download."
                : "Illustrative document preview. No real personal or property file is included."}
            </p>
          </div>
          <div className="key-value">
            <span>Visible to</span>
            <b>{doc.access.join(", ")}</b>
          </div>
          <div className="button-row">
            {btn(
              doc.content ? "Download file" : "Download sample record",
              () => {
                if (doc.content) {
                  const a = document.createElement("a");
                  a.href = doc.content;
                  a.download = doc.fileName || doc.name;
                  a.click();
                } else
                  download(
                    doc.name.replace(".pdf", "") + "-sample.txt",
                    `NINHO · SAMPLE DOCUMENT RECORD\n${doc.name}\nUploaded by ${doc.by}\nStatus: ${doc.status}\nFictional client demonstration. Not a legal document.`,
                  );
              },
              "secondary",
              Download,
            )}
            {(d.role === "Lawyer" || d.role === "Admin") &&
              btn(
                "Mark verified",
                () => {
                  patch({
                    documents: d.documents.map((x) =>
                      x.id === doc.id ? { ...x, status: "Verified" } : x,
                    ),
                  });
                  event(doc.name + " verified");
                  done("Document marked verified");
                },
                "primary",
                CheckCircle2,
              )}
          </div>
        </>
      );
    }
    if (m.type === "sign") {
      title = "Review, then make your mark.";
      body = form(
        <>
          <div className="sample-contract">
            <div className="eyebrow">DEMONSTRATION AGREEMENT</div>
            <h3>Promissory purchase agreement</h3>
            <p>Property: {purchase.name}</p>
            <p>Buyer: Emily Carter</p>
            <p>Agreed price: {money(purchase.price)}</p>
            <p className="muted">
              This sample illustrates a review and signature workflow. It does
              not create a legally binding agreement. Your lawyer will provide
              the final agreement through the selected signing provider.
            </p>
          </div>
          <label>
            Type your full name
            <input
              name="signature"
              placeholder="Emily Carter"
              required
              minLength="3"
            />
          </label>
          <label className="inline-check">
            <input type="checkbox" required />I understand this is a
            demonstration signature.
          </label>
        </>,
        (fd) => {
          patch({
            documents: d.documents.map((x) =>
              x.id === m.item.id
                ? { ...x, status: "Signed", signature: fd.get("signature") }
                : x,
            ),
          });
          event("Demo agreement signed by " + fd.get("signature"));
          done("Demo signature recorded");
        },
        "Sign sample agreement",
      );
    }
    if (m.type === "stage") {
      title = "Move forward, together.";
      body = form(
        <>
          <p className="muted">
            Stage updates are shared with the purchase team.
          </p>
          <label>
            Purchase stage
            <select name="stage" defaultValue={m.other?.stage ?? d.stage}>
              {stages.map((s, i) => (
                <option value={i} key={s}>
                  {i + 1}. {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Update for the team
            <textarea
              name="note"
              rows="3"
              placeholder="A little context for this next step…"
            />
          </label>
        </>,
        (fd) => {
          const stage = Number(fd.get("stage"));
          if (m.other)
            patch({
              clients: d.clients.map((c) =>
                c.id === m.other.id ? { ...c, stage } : c,
              ),
            });
          else {
            patch({ stage });
            event(`Miguel updated the purchase to ${stages[stage]}`);
            if (fd.get("note"))
              patch((x) => ({
                messages: [
                  ...x.messages,
                  {
                    id: Date.now(),
                    person: who,
                    role: d.role,
                    text: fd.get("note"),
                    time: "Now",
                  },
                ],
              }));
          }
          done("Purchase stage updated");
        },
        "Update stage",
      );
    }
    if (m.type === "cost") {
      const p = m.item;
      const tax = Math.round(p.price * 0.07),
        stamp = Math.round(p.price * 0.008),
        legal = 3500,
        registration = 1950,
        agentFee = Math.round(p.price * 0.05),
        total = p.price + tax + stamp + legal + registration + agentFee;
      title = "A clearer picture of the cost.";
      body = (
        <>
          <p className="muted">{p.name} · Illustrative budget estimate</p>
          {[
            ["Property price", p.price],
            ["Transfer tax · sample 7%", tax],
            ["Stamp duty · sample 0.8%", stamp],
            ["Legal services · allowance", legal],
            ["Registration & notary · allowance", registration],
            ["Agent fee · sample 5%", agentFee],
          ].map(([n, v]) => (
            <div className="key-value" key={n}>
              <span>{n}</span>
              <b>{money(v)}</b>
            </div>
          ))}
          <div className="estimate-total">
            <span>Estimated total</span>
            <strong>{money(total)}</strong>
          </div>
          <p className="muted fine">
            Illustrative assumptions, not a tax calculation or financial advice.
            Actual IMT, exemptions, residence status, financing and service fees
            must be confirmed by your lawyer. Production assumptions are
            configurable by NINHO.
          </p>
          {btn(
            "Discuss with my lawyer",
            () => {
              close();
              go("Messages");
            },
            "primary full",
            MessageSquare,
          )}
        </>
      );
    }
    if (m.type === "recommend") {
      title = "A local perspective helps.";
      body = form(
        <>
          <p className="muted">Ask your team about {m.item.name}.</p>
          <label>
            Ask a professional
            <select name="pro">
              {pros.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <label>
            Your question
            <textarea
              name="question"
              rows="4"
              defaultValue={
                "What should I consider before buying " + m.item.name + "?"
              }
              required
            />
          </label>
        </>,
        (fd) => {
          patch({
            messages: [
              ...d.messages,
              {
                id: Date.now(),
                person: who,
                role: d.role,
                text: "@" + fd.get("pro") + " — " + fd.get("question"),
                time: "Now",
              },
            ],
          });
          event("Property recommendation requested");
          done("Question added to your purchase conversation");
        },
        "Request recommendation",
      );
    }
    if (m.type === "profile") {
      const p = m.item;
      title = p.name;
      body = (
        <>
          <div className="person-line">
            <Avatar name={p.name} color={p.color} size="large" />
            <span>
              <b>{p.role}</b>
              <small>
                {p.agency} · {p.area}
              </small>
            </span>
            <Badge tone="green">★ {p.rating}</Badge>
          </div>
          <p>{p.bio}</p>
          <div className="key-value">
            <span>Languages</span>
            <b>{p.languages}</b>
          </div>
          <div className="key-value">
            <span>Typical budget</span>
            <b>{p.budget}</b>
          </div>
          <h3>What buyers say</h3>
          <blockquote>
            “Clear advice, thoughtful communication and a reassuring presence
            through every step.”<small>Alex R. · Sample review</small>
          </blockquote>
          <h3>Recommended by professionals</h3>
          <p className="muted">
            “A reliable partner for international buyers.” — NINHO sample
            professional recommendation
          </p>
          <div className="button-row">
            {btn(
              d.team.includes(p.id)
                ? "Already on your team"
                : "Add to my purchase",
              () => {
                invite(p);
                close();
              },
              "primary",
              Plus,
            )}
            {btn(
              "Book a meeting",
              () => setModal({ type: "book", item: purchase }),
              "secondary",
              CalendarDays,
            )}
          </div>
        </>
      );
    }
    if (m.type === "compare") {
      title = "Find your kind of professional.";
      body = (
        <div className="compare-grid">
          {pros
            .filter((p) => compare.includes(p.id))
            .map((p) => (
              <div key={p.id}>
                <Avatar name={p.name} color={p.color} />
                <h3>{p.name}</h3>
                <p>{p.role}</p>
                <div className="key-value">
                  <span>Rating</span>
                  <b>★ {p.rating}</b>
                </div>
                <div className="key-value">
                  <span>Budget</span>
                  <b>{p.budget}</b>
                </div>
                <div className="key-value">
                  <span>Experience</span>
                  <b>{p.tags.join(", ")}</b>
                </div>
                <div className="key-value">
                  <span>Area</span>
                  <b>{p.area}</b>
                </div>
                {btn(
                  d.team.includes(p.id) ? "On your team" : "Choose",
                  () => {
                    invite(p);
                    close();
                  },
                  "primary full",
                  Check,
                )}
              </div>
            ))}
        </div>
      );
    }
    if (m.type === "connect") {
      title = "Your time, together.";
      body = (
        <>
          <p className="muted">
            Preview how calendar connections will appear. Live OAuth and two-way
            sync require provider setup.
          </p>
          {["Google", "Outlook"].map((x) => (
            <div className="key-value" key={x}>
              <div className="person-line">
                <CalendarDays size={22} />
                <span>
                  <b>{x} Calendar</b>
                  <small>
                    {d.connections.includes(x)
                      ? "Demo connection active"
                      : "Not connected"}
                  </small>
                </span>
              </div>
              {btn(
                d.connections.includes(x)
                  ? "Disconnect"
                  : "Try demo connection",
                () => {
                  patch({
                    connections: d.connections.includes(x)
                      ? d.connections.filter((y) => y !== x)
                      : [...d.connections, x],
                  });
                  notify(x + " demo connection updated");
                },
                "secondary small",
              )}
            </div>
          ))}
          <p className="muted fine">
            No external calendar is accessed. Appointments can also be
            downloaded as .ics files.
          </p>
        </>
      );
    }
    if (m.type === "payment") {
      title = "Record a received payment.";
      body = form(
        <>
          <p className="muted">
            Record a payment collected outside NINHO. This does not transfer
            money.
          </p>
          <label>
            Description
            <input
              name="title"
              required
              placeholder="e.g. Reservation deposit"
            />
          </label>
          <div className="form-row">
            <label>
              Amount · EUR
              <input name="amount" type="number" min="1" required />
            </label>
            <label>
              Date
              <input
                name="date"
                type="date"
                defaultValue="2026-10-30"
                required
              />
            </label>
          </div>
          <label>
            Reference
            <input name="reference" required />
          </label>
          <label>
            Status
            <select name="status">
              <option>Paid</option>
              <option>Outstanding</option>
            </select>
          </label>
        </>,
        (fd) => {
          patch({
            payments: [
              ...d.payments,
              {
                id: Date.now(),
                title: fd.get("title"),
                amount: Number(fd.get("amount")),
                due: fd.get("date"),
                reference: fd.get("reference"),
                status: fd.get("status"),
                type: "Manual record",
              },
            ],
          });
          event("Manual payment record added");
          done("Payment record saved");
        },
        "Save payment record",
      );
    }
    if (m.type === "paymentDetail") {
      const p = d.payments.find((x) => x.id === m.item.id) || m.item;
      title = p.title;
      body = (
        <>
          <Badge tone={p.status === "Paid" ? "green" : "amber"}>
            {p.status}
          </Badge>
          <div className="key-value">
            <span>Amount</span>
            <b>{money(p.amount)}</b>
          </div>
          <div className="key-value">
            <span>Reference</span>
            <b>{p.reference}</b>
          </div>
          <div className="key-value">
            <span>Due / recorded date</span>
            <b>{day(p.due)}</b>
          </div>
          <p className="muted">
            {p.status === "Paid"
              ? "NINHO has recorded this payment as received outside the application."
              : "Please coordinate payment details with NINHO. No payment is collected through this demo."}
          </p>
          {btn(
            "Download record",
            () =>
              download(
                "ninho-" + p.reference + ".txt",
                `NINHO DEMO PAYMENT RECORD\n${p.title}\n${money(p.amount)}\nReference: ${p.reference}\nStatus: ${p.status}\nSample record, not a certified invoice.`,
              ),
            "secondary",
            Download,
          )}
          {d.role === "Admin" &&
            btn(
              p.status === "Paid" ? "Mark outstanding" : "Mark paid",
              () => {
                patch({
                  payments: d.payments.map((x) =>
                    x.id === p.id
                      ? {
                          ...x,
                          status: p.status === "Paid" ? "Outstanding" : "Paid",
                        }
                      : x,
                  ),
                });
                done("Payment status updated");
              },
              "primary",
              CheckCircle2,
            )}
        </>
      );
    }
    if (m.type === "rate") {
      title = "Commission settings.";
      body = form(
        <>
          <label>
            Agency commission rate · %
            <input
              name="rate"
              type="number"
              step="0.1"
              min="0"
              max="30"
              defaultValue={d.agencyRate}
              required
            />
          </label>
          <p className="muted">
            Applies to the sample T3 villa deal and agency default.
          </p>
        </>,
        (fd) => {
          patch({ agencyRate: Number(fd.get("rate")) });
          done("Commission rate updated");
        },
      );
    }
    if (m.type === "invoice") {
      title = "Monthly commission statement.";
      body = (
        <>
          <Badge>DEMO · NOT A TAX INVOICE</Badge>
          <h3>Atlantic Living · October 2026</h3>
          <div className="key-value">
            <span>Commission · {purchase.name}</span>
            <b>{money(m.amount)}</b>
          </div>
          <p className="muted">
            Final IVA treatment and certified invoice generation will use
            NINHO’s accountant-approved settings and chosen Portuguese invoicing
            provider.
          </p>
          {btn(
            "Download statement",
            () =>
              download(
                "ninho-october-statement.txt",
                `NINHO DEMO COMMISSION STATEMENT\nNot a tax invoice\nAtlantic Living · October 2026\n${purchase.name}\nCommission: ${money(m.amount)}\nIVA and certified invoice: pending production provider configuration`,
              ),
            "secondary",
            Download,
          )}
        </>
      );
    }
    if (m.type === "approval") {
      const a = d.approvals.find((x) => x.id === m.item.id);
      title = "Meet " + a.name + ".";
      body = (
        <>
          <div className="person-line">
            <Avatar name={a.name} size="large" />
            <span>
              <b>{a.role}</b>
              <small>{a.agency}</small>
            </span>
            <Badge tone="amber">{a.status}</Badge>
          </div>
          <div className="key-value">
            <span>Email</span>
            <b>{a.email}</b>
          </div>
          <div className="key-value">
            <span>Service area</span>
            <b>Portugal</b>
          </div>
          <div className="key-value">
            <span>Languages</span>
            <b>Portuguese, English</b>
          </div>
          <p className="muted">
            Sample application · Production approval includes review of
            credentials supplied by the professional.
          </p>
          <div className="button-row">
            {["Approved", "Declined"].map((s) =>
              btn(
                s === "Approved" ? "Approve professional" : "Decline",
                () => {
                  patch({
                    approvals: d.approvals.map((x) =>
                      x.id === a.id ? { ...x, status: s } : x,
                    ),
                  });
                  done("Application " + s.toLowerCase());
                },
                s === "Approved" ? "primary" : "secondary",
                s === "Approved" ? Check : undefined,
              ),
            )}
          </div>
        </>
      );
    }
    if (m.type === "agencyDetail") {
      title = m.item[0];
      body = (
        <>
          {stats([
            ["Revenue", money(m.item[1]), "This month", Wallet],
            [
              "Active time",
              [142, 108, 76][m.index] + " hrs",
              "Active app sessions",
              Clock,
            ],
          ])}
          <div className="key-value">
            <span>Calls accepted / declined</span>
            <b>{m.item[2]}</b>
          </div>
          <div className="key-value">
            <span>Business-hour response time</span>
            <b>{m.item[3]}</b>
          </div>
          <div className="key-value">
            <span>Active purchases</span>
            <b>{[12, 8, 4][m.index]}</b>
          </div>
          {btn("Download report", exportAgencies, "secondary", Download)}
        </>
      );
    }
    if (m.type === "listing") {
      title = m.item ? "Update this home." : "Make room for a new beginning.";
      body = form(
        <>
          <label>
            Property name
            <input name="name" defaultValue={m.item?.name} required />
          </label>
          <div className="form-row">
            <label>
              Location
              <input
                name="location"
                defaultValue={m.item?.location}
                placeholder="e.g. Cascais, Lisbon"
                required
              />
            </label>
            <label>
              Region
              <select name="region" defaultValue={m.item?.region}>
                {["Lisbon", "Algarve", "Alentejo"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Price · EUR
              <input
                name="price"
                type="number"
                min="1"
                defaultValue={m.item?.price}
                required
              />
            </label>
            <label>
              Area · m²
              <input
                name="area"
                type="number"
                min="1"
                defaultValue={m.item?.area}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Bedrooms
              <input
                name="beds"
                type="number"
                min="0"
                defaultValue={m.item?.beds ?? 3}
                required
              />
            </label>
            <label>
              Bathrooms
              <input
                name="baths"
                type="number"
                min="0"
                defaultValue={m.item?.baths ?? 2}
                required
              />
            </label>
          </div>
          <label>
            Type
            <select name="type" defaultValue={m.item?.type}>
              <option>Villa</option>
              <option>Apartment</option>
              <option>Land</option>
            </select>
          </label>
          <label>
            Description
            <textarea
              name="description"
              defaultValue={m.item?.description}
              rows="3"
              required
            />
          </label>
          <label>
            Closest school
            <input name="school" defaultValue={m.item?.school} required />
          </label>
          <div className="form-row">
            <label>
              School · minutes by car
              <input
                name="schoolTime"
                type="number"
                min="0"
                defaultValue={m.item?.schoolTime ?? 10}
                required
              />
            </label>
            <label>
              Sports academy · minutes
              <input
                name="sportTime"
                type="number"
                min="0"
                defaultValue={m.item?.sportTime ?? 8}
                required
              />
            </label>
          </div>
          <label>
            Sports academy name
            <input name="sport" defaultValue={m.item?.sport} required />
          </label>
          <label>
            Cover image
            <select name="image" defaultValue={m.item?.image}>
              <option value="/images/villa.jpg">Sunlit villa</option>
              <option value="/images/coastal.jpg">Coastal home</option>
              <option value="/images/apartment.jpg">Apartment</option>
              <option value="/images/interior.jpg">Modern interior</option>
            </select>
          </label>
        </>,
        (fd) => {
          const p = {
            id: m.item?.id || Date.now(),
            name: fd.get("name"),
            location: fd.get("location"),
            region: fd.get("region"),
            price: Number(fd.get("price")),
            area: Number(fd.get("area")),
            beds: Number(fd.get("beds")),
            baths: Number(fd.get("baths")),
            type: fd.get("type"),
            description: fd.get("description"),
            school: fd.get("school"),
            schoolTime: Number(fd.get("schoolTime")),
            sport: fd.get("sport"),
            sportTime: Number(fd.get("sportTime")),
            image: fd.get("image"),
            features: ["New listing", "Details to be confirmed"],
            tag: "New listing",
          };
          patch({
            newListings: m.item
              ? d.newListings.map((x) => (x.id === m.item.id ? p : x))
              : [...d.newListings, p],
          });
          event("Property published: " + p.name);
          done("Property published in the demo catalog");
        },
        m.item ? "Save property" : "Publish property",
      );
    }
    if (m.type === "gallery") {
      title = m.item.name;
      body = (
        <div className="photo-gallery">
          {[m.item.image, "/images/interior.jpg", "/images/apartment.jpg"].map(
            (x, i) => (
              <img src={x} alt={"Property inspiration " + (i + 1)} key={i} />
            ),
          )}
          <small className="muted">
            Sample property photography for the client demonstration.
          </small>
        </div>
      );
    }
    if (m.type === "signup") {
      title = "Create a client account";
      body = form(
        <>
          <label>
            Full name
            <input name="name" required placeholder="Your full name" />
          </label>
          <label>
            Email address
            <input name="email" type="email" required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              minLength="8"
              required
              placeholder="At least 8 characters"
            />
          </label>
          <label className="inline-check">
            <input type="checkbox" required />I understand this creates a demo
            account only.
          </label>
          <small className="muted">
            No real account or email is created. You will use demo code 123456
            in the next step.
          </small>
        </>,
        (fd) => {
          patch({ name: fd.get("name").split(" ")[0] });
          setLoginEmail(fd.get("email"));
          setLoginRole("Buyer");
          setLoginStep(1);
          close();
          notify("Enter code 123456 to open your demo buyer workspace");
        },
        "Create demo account",
      );
    }
    if (m.type === "access") {
      title = "Good people belong here.";
      body = form(
        <>
          <label>
            Full name
            <input name="name" required />
          </label>
          <label>
            Work email
            <input name="email" type="email" required />
          </label>
          <label>
            Your profession
            <select name="role">
              <option>Real estate agent</option>
              <option>Property lawyer</option>
              <option>Architect</option>
              <option>Construction company</option>
              <option>Other advisor</option>
            </select>
          </label>
          <label>
            Company
            <input name="agency" required />
          </label>
        </>,
        (fd) => {
          patch({
            approvals: [
              ...d.approvals,
              {
                id: Date.now(),
                name: fd.get("name"),
                email: fd.get("email"),
                role: fd.get("role"),
                agency: fd.get("agency"),
                status: "Pending",
              },
            ],
          });
          done("Demo access request added to the Admin approvals queue");
        },
        "Request access",
      );
    }
    if (m.type === "recovery") {
      title = "Let’s help you back in.";
      body = form(
        <>
          <label>
            Email
            <input type="email" required />
          </label>
          <p className="muted">
            This demo does not send reset emails. You can sign in using any
            email, any password of 4+ characters and code 123456.
          </p>
        </>,
        () => done("Demo recovery complete. Use the sample sign-in flow."),
        "Continue",
      );
    }
    if (m.type === "support") {
      title = "A little help, when you need it.";
      body = form(
        <>
          <label>
            Subject
            <input name="subject" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="4" required />
          </label>
          <small className="muted">
            This saves a demo support request in your activity. No message is
            sent externally.
          </small>
        </>,
        (fd) => {
          event("Support request recorded: " + fd.get("subject"));
          done("Demo support request recorded");
        },
        "Save support request",
      );
    }
    if (m.type === "legal") {
      title = m.key[0].toUpperCase() + m.key.slice(1);
      body = (
        <>
          <p className="legal-text">{d.content[m.key]}</p>
          <Badge>Client demonstration</Badge>
        </>
      );
    }
    if (m.type === "reset") {
      title = "A fresh beginning?";
      body = (
        <>
          <p className="muted">
            Reset sample data, uploads and interactions in this browser to the
            original demonstration.
          </p>
          <div className="modal-actions">
            {btn("Keep my changes", close, "secondary")}
            {btn(
              "Reset demo",
              () => {
                setD(structuredClone(initial));
                setTab("Overview");
                go("Overview");
                done("Demo reset to its original state");
              },
              "primary",
              RefreshCw,
            )}
          </div>
        </>
      );
    }
    if (m.type === "notifications") {
      title = "A little update for you.";
      body = (
        <>
          <button
            className="text-link"
            onClick={() =>
              patch({
                notifications: d.notifications.map((x) => ({
                  ...x,
                  read: true,
                })),
              })
            }
          >
            Mark all as read <Check size={14} />
          </button>
          {d.notifications.map((n) => (
            <button
              className={"notification " + (n.read ? "read" : "")}
              key={n.id}
              onClick={() => {
                patch({
                  notifications: d.notifications.map((x) =>
                    x.id === n.id ? { ...x, read: true } : x,
                  ),
                });
                close();
                go("My purchase");
              }}
            >
              <span className="tiny-dot" />
              <div>
                <b>{n.title}</b>
                <p>{n.text}</p>
              </div>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </>
      );
    }
    return (
      <div
        className="modal-backdrop"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          className={
            "modal " +
            (["gallery", "compare", "listing"].includes(m.type) ? "wide" : "")
          }
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
        >
          <div className="modal-header">
            <h2 id="modal-title">{title}</h2>
            <button
              className="icon-btn"
              aria-label="Close dialog"
              onClick={close}
            >
              <X size={20} />
            </button>
          </div>
          {body}
        </div>
      </div>
    );
  }
  function context() {
    return {
      d,
      Avatar,
      Badge,
      btn,
      go,
      setModal,
      setTab,
      patch,
      notify,
      clientTable,
      taskList,
      allProperties,
      setSelected,
      purchase,
      pros,
      stages,
      visibleMeetings,
      meetingAction,
      documentAction,
      event,
      who,
      progress,
    };
  }
  function main() {
    if (page === "Overview") return dashboard();
    if (["Properties", "Saved homes", "Listings"].includes(page))
      return (
        <>
          {browse()}
          {page === "Listings" && d.newListings.length > 0 && (
            <section className="panel">
              <h2>Your new listings</h2>
              {d.newListings.map((p) => (
                <div className="key-value" key={p.id}>
                  <b>{p.name}</b>
                  <div className="button-row">
                    {btn(
                      "Edit",
                      () => setModal({ type: "listing", item: p }),
                      "secondary small",
                      PenLine,
                    )}
                    {btn(
                      "Remove",
                      () => {
                        patch({
                          newListings: d.newListings.filter(
                            (x) => x.id !== p.id,
                          ),
                        });
                        notify("Listing removed");
                      },
                      "ghost small",
                      Trash2,
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      );
    if (page === "Property") return propertyPage();
    if (["My purchase", "Client detail"].includes(page)) return workspace();
    if (["Clients", "Purchases"].includes(page))
      return (
        <>
          {heading(
            "EVERY PURCHASE IS A NEW CHAPTER.",
            page === "Clients"
              ? "Your people. Your purchases."
              : "A clear view of every purchase.",
            "Keep your clients, their progress and their team close.",
          )}
          <label className="search-field standalone">
            <Search size={17} />
            <input
              placeholder="Search clients or properties…"
              aria-label="Search clients"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </label>
          <section className="panel">{clientTable()}</section>
        </>
      );
    if (page === "Professionals") return directory();
    if (page === "Documents") return documentsView();
    if (page === "Messages") return chatView();
    if (page === "Calendar") return calendarView();
    if (page === "Meetings") return meetingsView();
    if (page === "Payments") return paymentsView();
    if (page === "Tasks")
      return (
        <>
          {heading(
            "ONE THING AT A TIME.",
            "A little to do. A lot to look forward to.",
            "Your personal tasks and purchase deadlines.",
            btn(
              "Add a task",
              () => setModal({ type: "task" }),
              "primary",
              Plus,
            ),
          )}
          <section className="panel">
            {taskList()}
            {d.tasks.filter((t) => t.owner === d.role).length === 0 && (
              <Empty
                title="A clear day ahead."
                text="Add a task to plan your next step."
              />
            )}
          </section>
        </>
      );
    if (["Agency", "Agencies"].includes(page)) return agencyView();
    if (page === "Commissions") return commissionView();
    if (page === "Membership") return membership();
    if (page === "Approvals") return approvals();
    if (page === "Finance") return finance();
    if (page === "Content") return contentView();
    if (page === "Languages")
      return (
        <>
          {heading(
            "PLATFORM LANGUAGES",
            "Languages",
            "Choose the interface language for your workspace.",
          )}
          <section className="panel">
            {["EN", "PT"].map((l) => (
              <div className="key-value" key={l}>
                <b>{l === "EN" ? "English" : "Português"}</b>
                {btn(
                  d.language === l ? "Selected" : "Use language",
                  () => {
                    patch({ language: l });
                    notify("Language updated");
                  },
                  "secondary",
                )}
              </div>
            ))}
            <div className="key-value">
              <span>Español</span>
              <Badge>Planned</Badge>
            </div>
          </section>
        </>
      );
    return settings();
  }
  return (
    <>
      {page === "welcome" ? (
        welcome()
      ) : page === "login" ? (
        login()
      ) : (
        <div className={"app-shell role-" + d.role.toLowerCase()}>
          {mobile && (
            <div className="sidebar-scrim" onClick={() => setMobile(false)} />
          )}
          <aside className={"sidebar " + (mobile ? "open" : "")}>
            <a className="brand" href="#welcome">
              <Brand />
            </a>
            <div className="brand-caption">
              {d.role === "Admin"
                ? "Admin"
                : d.role === "Buyer"
                  ? "Buyer"
                  : d.role === "Lawyer"
                    ? "Lawyer"
                    : "Realtor"}
            </div>
            <div className="workspace-switch">
              <span className="workspace-icon">
                {d.role === "Buyer" ? (
                  <House size={18} />
                ) : d.role === "Admin" ? (
                  <Leaf size={18} />
                ) : (
                  <Briefcase size={18} />
                )}
              </span>
              <div>
                <small>YOUR WORKSPACE</small>
                <select
                  aria-label="Switch demo role"
                  value={d.role}
                  onChange={(e) => changeRole(e.target.value)}
                >
                  {["Buyer", "Agent", "Lawyer", "Admin"].map((r) => (
                    <option value={r} key={r}>
                      {r === "Buyer"
                        ? "Buyer workspace"
                        : r === "Agent"
                          ? "Agent workspace"
                          : r === "Lawyer"
                            ? "Lawyer workspace"
                            : "NINHO admin"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="nav-label">
              {d.language === "PT" ? "O SEU ESPAÇO" : "YOUR SPACE"}
            </div>
            <nav className="side-nav">
              {menus[d.role].map((n) => {
                const Icon =
                  d.role === "Agent" && agentIcons[n]
                    ? agentIcons[n]
                    : icons[n];
                return (
                  <button
                    className={
                      page === n || (page === "Property" && n === "Properties")
                        ? "active"
                        : ""
                    }
                    key={n}
                    onClick={() => {
                      setTab("Overview");
                      go(n);
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    <span>{navLabel(n)}</span>
                    {n === "Messages" && (
                      <span className="nav-count">
                        {d.role === "Agent" ? "2" : "3"}
                      </span>
                    )}
                    {n === "Approvals" && (
                      <span className="nav-count">
                        {
                          d.approvals.filter((x) => x.status === "Pending")
                            .length
                        }
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
            <div className="sidebar-bottom">
              <div className="sidebar-help">
                <Leaf size={23} />
                <h3>A little help?</h3>
                <p>We’re here for your next step.</p>
                <button
                  className="text-link"
                  onClick={() => setModal({ type: "support" })}
                >
                  Talk to NINHO <ArrowUpRight size={14} />
                </button>
              </div>
              <button className="settings-link" onClick={() => go("Settings")}>
                <Settings size={17} />
                {label("Settings")}
                <ArrowUpRight size={14} />
              </button>
              <button className="user-card" onClick={() => go("Settings")}>
                <Avatar
                  name={who}
                  color={d.role === "Agent" ? "sand" : "sage"}
                  size="small"
                />
                <span>
                  <b>{who}</b>
                  <small>
                    {d.role === "Buyer"
                      ? "Your next chapter awaits"
                      : d.role + " workspace"}
                  </small>
                </span>
                <MoreHorizontal size={17} />
              </button>
            </div>
          </aside>
          <div className="app-body">
            <header className="topbar">
              <div className="breadcrumbs">
                {(d.role === "Agent" || d.role === "Lawyer") && (
                  <div className="ref-view-toggle">
                    <button
                      className={page === "Overview" ? "active" : ""}
                      onClick={() => go("Overview")}
                    >
                      My view
                    </button>
                    <button
                      className={page === "Agency" ? "active" : ""}
                      onClick={() => go("Agency")}
                    >
                      Agency view
                    </button>
                  </div>
                )}
                <button
                  className="mobile-menu icon-btn"
                  aria-label="Open navigation"
                  onClick={() => setMobile(true)}
                >
                  <Menu size={20} />
                </button>
                <span>
                  {d.role === "Admin"
                    ? "NINHO"
                    : d.role === "Buyer"
                      ? "My workspace"
                      : "Professional workspace"}
                </span>
                <ChevronRight size={13} />
                <b>{label(page === "Property" ? "Properties" : page)}</b>
              </div>
              <div className="top-actions">
                <div className="header-role">
                  <select
                    aria-label="Preview workspace role"
                    value={d.role}
                    onChange={(e) => changeRole(e.target.value)}
                  >
                    {["Buyer", "Agent", "Lawyer", "Admin"].map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="header-languages">
                  {["EN", "PT"].map((l) => (
                    <button
                      className={d.language === l ? "active" : ""}
                      key={l}
                      onClick={() => patch({ language: l })}
                    >
                      {l}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      notify("Spanish is planned for a future release")
                    }
                  >
                    ES
                  </button>
                </div>
                <button
                  className="icon-btn bell"
                  aria-label="Notifications"
                  onClick={() => setModal({ type: "notifications" })}
                >
                  <Bell size={19} />
                  {d.notifications.some((x) => !x.read) && <i />}
                </button>
                <button
                  className="header-profile"
                  onClick={() => go("Settings")}
                >
                  <Avatar name={who} />
                  <span>
                    {who}
                    <small>
                      {d.role === "Admin"
                        ? "Administrator"
                        : d.role === "Agent"
                          ? "Realtor"
                          : d.role}
                    </small>
                  </span>
                  <ChevronDown size={13} />
                </button>
                <button
                  className="icon-btn"
                  aria-label="Sign out"
                  onClick={() => go("login")}
                >
                  <LogOut size={17} />
                </button>
              </div>
            </header>
            <main
              className={
                "main-content " +
                (page === "Overview" ? "reference-overview" : "") +
                (page === "My purchase" ? " reference-purchase-page" : "")
              }
            >
              {main()}
              <footer className="app-footer">
                <span>ninho · Thoughtfully, together.</span>
                <div>
                  <span>Sample data · Changes saved in this browser</span>
                  <button
                    onClick={() => setModal({ type: "legal", key: "privacy" })}
                  >
                    {d.role === "Agent" ? "Privacy policy" : "Privacy"}
                  </button>
                  <button
                    onClick={() => setModal({ type: "legal", key: "terms" })}
                  >
                    Terms
                  </button>
                  {d.role === "Agent" && (
                    <button
                      onClick={() =>
                        setModal({ type: "legal", key: "consent" })
                      }
                    >
                      Cookie settings
                    </button>
                  )}
                </div>
              </footer>
            </main>
          </div>
        </div>
      )}
      {modalBody()}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={19} />
          {toast}
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={15} />
          </button>
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
