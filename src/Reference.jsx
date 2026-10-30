import React, { useState } from "react";
import {
  Folder,
  Eye,
  Users,
  Clock,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ChevronRight,
  FileText,
  Plus,
  CalendarDays,
  MessageSquare,
  Bell,
  Download,
  Upload,
  PenLine,
  Phone,
  ShieldCheck,
  CheckCircle2,
  House,
  Star,
  Wallet,
  Building2,
  Globe,
  Send,
  ChevronDown,
  Check,
  MapPin,
  Mail,
  Search,
  UserCheck,
  TrendingUp,
  Link,
} from "lucide-react";
export function Brand() {
  return (
    <>
      <svg viewBox="0 0 38 49" aria-hidden="true">
        <path
          d="M8 39V16C8 1 30 1 30 16v28M8 16c0-6 6-10 11-10v29H8m11-29v29h11M5 39h22v5H5zM2 44h31v3H2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M19 6v29h11V16c0-6-4-10-11-10Z"
          fill="currentColor"
          opacity=".9"
        />
      </svg>
      <span>NINHO</span>
    </>
  );
}
export const agencies = [
  ["Porto Real Estate", 124500, "6h 42m", "48 / 3", "1h 12m", 98],
  ["Lisbon Prime Homes", 98200, "5h 28m", "42 / 6", "1h 45m", 92],
  ["Algarve Select", 76340, "4h 12m", "36 / 4", "2h 10m", 87],
  ["Casa & Mar", 62700, "3h 56m", "28 / 7", "2h 48m", 80],
  ["Great Estates", 54910, "3h 21m", "24 / 9", "3h 12m", 74],
];
const euro = (n) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
const fmt = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  });
export function ReferenceDashboard({ ctx }) {
  return ctx.d.role === "Admin" ? (
    <AdminDashboard c={ctx} />
  ) : ctx.d.role === "Buyer" ? (
    <BuyerDashboard c={ctx} />
  ) : (
    <ProfessionalDashboard c={ctx} />
  );
}
function Trend({ down = false, children }) {
  return (
    <span className={"ref-trend " + (down ? "negative" : "")}>
      {down ? <ArrowDown size={11} /> : <ArrowUp size={11} />} {children}
    </span>
  );
}
function Metric({
  icon: Icon,
  title,
  value,
  change = "12%",
  down = false,
  period = "vs. last month",
}) {
  return (
    <section className="ref-metric">
      <Icon size={23} />
      <span>{title}</span>
      <strong>{value}</strong>
      <small>
        <Trend down={down}>{change}</Trend> {period}
      </small>
    </section>
  );
}
function Panel({ title, link, onClick, children, className = "" }) {
  return (
    <section className={"ref-panel " + className}>
      <div className="ref-panel-heading">
        <h2>{title}</h2>
        {link && (
          <button onClick={onClick}>
            {link}
            <ArrowRight size={11} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
function Chart({ kind = "line", wide = false, metric = "revenue" }) {
  const ticks = wide
    ? ["Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  let vals = wide
    ? [55, 102, 72, 145, 165, 185, 130, 202, 165, 218]
    : metric === "cases"
      ? [30, 40, 31, 61, 70, 92, 86, 105, 98, 120]
      : [50, 80, 68, 100, 96, 127, 140, 163, 159, 201];
  return (
    <div className={"ref-chart " + (wide ? "wide" : "")}>
      <div className="chart-legend">
        <span>
          <i />{" "}
          {kind === "bars"
            ? "Cases"
            : wide
              ? "Logins"
              : metric === "cases"
                ? "Active cases"
                : "This agency"}
        </span>
        <span>
          <i />
          {kind === "bars"
            ? "Messages"
            : wide
              ? "Messages"
              : "Platform average"}
        </span>
        {(wide || kind === "bars") && (
          <span>
            <i /> {kind === "bars" ? "Document requests" : "Cases created"}
          </span>
        )}
      </div>
      <svg
        viewBox="0 0 520 190"
        role="img"
        aria-label={
          kind === "bars"
            ? "Platform activity sample chart"
            : "Sample " + metric + " trend chart"
        }
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id={"chartFill" + (wide ? "w" : "n")}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop offset="0" stopColor="#641b27" stopOpacity=".14" />
            <stop offset="1" stopColor="#641b27" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="barFill" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="#491017" />
            <stop offset="1" stopColor="#9b5960" />
          </linearGradient>
        </defs>
        {[30, 65, 100, 135, 170].map((y, i) => (
          <g key={y}>
            <line
              x1="35"
              y1={y}
              x2="510"
              y2={y}
              stroke="#ddd8d1"
              strokeWidth=".6"
            />
            <text x="0" y={y + 3}>
              {kind === "bars"
                ? 200 - i * 50
                : metric === "cases"
                  ? 120 - i * 30
                  : 150 - i * 37.5}
              {kind === "line" && !wide && metric !== "cases" ? "k" : ""}
            </text>
          </g>
        ))}
        {kind === "bars" ? (
          Array.from({ length: 8 }, (_, i) => {
            const h = [83, 64, 105, 78, 94, 114, 121, 132][i];
            return (
              <g key={i}>
                <rect
                  x={51 + i * 58}
                  y={170 - h * 0.5}
                  width="21"
                  height={h * 0.5}
                  fill="url(#barFill)"
                />
                <rect
                  x={51 + i * 58}
                  y={170 - h * 0.8}
                  width="21"
                  height={h * 0.3}
                  fill="#bf9a9c"
                />
                <rect
                  x={51 + i * 58}
                  y={170 - h}
                  width="21"
                  height={h * 0.2}
                  fill="#c4c4c3"
                />
                <text x={44 + i * 58} y="188">
                  Oct {20 + i}
                </text>
              </g>
            );
          })
        ) : (
          <>
            <path
              d={
                "M35 170 " +
                vals
                  .map((v, i) => `L${35 + i * 52.5} ${170 - v * 0.65}`)
                  .join(" ") +
                " L508 170Z"
              }
              fill={"url(#chartFill" + (wide ? "w" : "n") + ")"}
            />
            <polyline
              points={vals
                .map((v, i) => `${35 + i * 52.5},${170 - v * 0.65}`)
                .join(" ")}
              stroke="#5b1a23"
              strokeWidth="1.5"
              fill="none"
            />
            <polyline
              points={vals
                .map(
                  (v, i) => `${35 + i * 52.5},${175 - v * 0.34 + (i % 3) * 7}`,
                )
                .join(" ")}
              stroke={wide ? "#b78b8d" : "#b9bdbd"}
              strokeWidth="1.1"
              fill="none"
            />
            {wide && (
              <polyline
                points={vals
                  .map((v, i) => `${35 + i * 52.5},${180 - v * 0.22}`)
                  .join(" ")}
                stroke="#bfc4c0"
                strokeWidth="1"
                fill="none"
              />
            )}
            {vals.map((v, i) => (
              <circle
                key={i}
                cx={35 + i * 52.5}
                cy={170 - v * 0.65}
                r="1.7"
                fill="#5b1a23"
              />
            ))}
            {ticks.map((t, i) => (
              <text key={t} x={35 + i * (wide ? 78 : 52.5)} y="188">
                {t}
              </text>
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
function AdminDashboard({ c }) {
  const { d, Avatar, Badge, btn, go, setModal, patch, notify } = c;
  const [agency, setAgency] = useState(0);
  const [detail, setDetail] = useState("Overview");
  const a = agencies[agency];
  return (
    <div className="ref-admin-layout">
      <div className="ref-admin-main">
        <div className="ref-page-title">
          <h1>Good morning, Ana</h1>
          <p>Here’s an overview of your platform’s performance and activity.</p>
        </div>
        <div className="ref-metrics">
          <Metric icon={Folder} title="Active cases" value="248" />
          <Metric
            icon={Eye}
            title="Commission this month"
            value="€48,320"
            change="18%"
          />
          <Metric icon={Users} title="Memberships" value="142" change="9%" />
          <Metric
            icon={Clock}
            title="Professionals awaiting approval"
            value={d.approvals.filter((p) => p.status === "Pending").length}
            change="5%"
            down
            period="vs. last week"
          />
        </div>
        <div className="ref-admin-middle">
          <Panel
            title="Agencies ranking"
            link="Open full analysis"
            onClick={() => go("Agencies")}
            className="ref-ranking"
          >
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Agency</th>
                    <th>
                      Revenue brought
                      <br />
                      to NINHO
                    </th>
                    <th>
                      Time in
                      <br />
                      app
                    </th>
                    <th>
                      Calls taken
                      <br />
                      vs. refused
                    </th>
                    <th>
                      Avg.
                      <br />
                      response time
                    </th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {agencies.map((x, i) => (
                    <tr
                      className={agency === i ? "selected-row" : ""}
                      key={x[0]}
                      onClick={() => {
                        setAgency(i);
                        setDetail("Overview");
                      }}
                    >
                      <td>{i + 1}</td>
                      <td>
                        <span className="ref-agency-logo">
                          <Building2 size={12} />
                        </span>
                        {x[0]}
                      </td>
                      <td>{euro(x[1])}</td>
                      <td>{x[2]}</td>
                      <td>{x[3]}</td>
                      <td>{x[4]}</td>
                      <td>
                        <Badge tone={x[5] > 85 ? "green" : "amber"}>
                          {x[5]}
                        </Badge>
                        <ChevronRight size={10} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
          <Panel
            title={
              <>
                <span className="agency-circle">
                  <Building2 size={15} />
                </span>
                {a[0]}
              </>
            }
            className="ref-agency-detail"
          >
            <Badge tone="green">✦ Top performer</Badge>
            <div className="ref-small-tabs">
              {["Overview", "Performance", "Team", "Cases"].map((x) => (
                <button
                  className={detail === x ? "active" : ""}
                  onClick={() => setDetail(x)}
                  key={x}
                >
                  {x}
                </button>
              ))}
            </div>
            {["Overview", "Performance"].includes(detail) ? (
              <>
                <div className="ref-mini-stats">
                  {[
                    ["Revenue", euro(a[1])],
                    ["Time in app", a[2]],
                    ["Calls taken vs. refused", a[3]],
                    ["Avg. response time", a[4]],
                  ].map(([n, v], i) => (
                    <div key={n}>
                      <small>{n}</small>
                      <b>{v}</b>
                      <Trend down={i === 3}>{[18, 22, 12, 30][i]}%</Trend>
                    </div>
                  ))}
                </div>
                <h4>
                  {detail === "Performance"
                    ? "Case performance"
                    : "Revenue trend"}
                </h4>
                <Chart
                  metric={detail === "Performance" ? "cases" : "revenue"}
                />
              </>
            ) : detail === "Team" ? (
              <div className="ref-people-list">
                {["Sofia Sousa", "João Almeida", "Marta Ferreira"].map(
                  (n, i) => (
                    <div key={n}>
                      <Avatar name={n} />
                      <span>
                        <b>{n}</b>
                        <small>
                          {12 - i * 2} clients · {8 - i * 2} closed
                        </small>
                      </span>
                      {btn("View", () => go("Clients"), "ghost small")}
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="ref-compact-cases">{c.clientTable(true)}</div>
            )}
          </Panel>
          <Panel
            title="New professionals approval queue"
            link="View all"
            onClick={() => go("Approvals")}
          >
            <div className="table-wrap">
              <table className="approval-table">
                <thead>
                  <tr>
                    <th>Professional</th>
                    <th>Agency</th>
                    <th>License / Registration</th>
                    <th>Applied on</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {d.approvals
                    .filter((x) => x.status === "Pending")
                    .slice(0, 4)
                    .map((p, i) => (
                      <tr key={p.id}>
                        <td>
                          <Avatar name={p.name} size="small" />
                          {p.name}
                        </td>
                        <td>{p.agency}</td>
                        <td>
                          {p.license ||
                            [
                              "REA 12345",
                              "REA 67890",
                              "REA 54321",
                              "REA 98765",
                            ][i]}
                        </td>
                        <td>Oct {24 - i}, 2026</td>
                        <td>
                          <div className="button-row">
                            {btn(
                              "Approve",
                              () => {
                                patch({
                                  approvals: d.approvals.map((x) =>
                                    x.id === p.id
                                      ? { ...x, status: "Approved" }
                                      : x,
                                  ),
                                });
                                notify(p.name + " approved");
                              },
                              "primary small",
                            )}
                            {btn(
                              "Reject",
                              () => setModal({ type: "approval", item: p }),
                              "secondary small",
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!d.approvals.some((x) => x.status === "Pending") && (
              <p className="ref-empty">All applications have been reviewed.</p>
            )}
          </Panel>
          <Panel title="Billing" link="View all" onClick={() => go("Finance")}>
            <div className="ref-billing-summary">
              <b>Commission tracked per deal</b>
              <small>Total commission (YTD)</small>
              <strong>€412,680</strong>
              <div className="mini-bars">
                {[20, 28, 38, 48, 64, 82].map((h, i) => (
                  <i
                    key={h}
                    style={{ height: h + "%", opacity: 0.25 + i * 0.13 }}
                  />
                ))}
              </div>
              <small>↑ 24%</small>
            </div>
            <div className="ref-billing-row">
              <b>Monthly invoices</b>
              <div>
                <span>
                  October 2026<small>{d.invoices?.length || 12} invoices</small>
                </span>
                {btn(
                  "Generate all",
                  () => setModal({ type: "invoiceBatch" }),
                  "primary small",
                )}
                {btn(
                  "Send",
                  () => setModal({ type: "invoiceSend" }),
                  "secondary small",
                )}
              </div>
            </div>
            <div className="ref-billing-row">
              <b>Lawyer memberships</b>
              <div>
                <span>
                  Active memberships<strong>58</strong>
                </span>
                <span>
                  Next renewal<strong>Nov 15, 2026</strong>
                </span>
              </div>
            </div>
          </Panel>
        </div>
        <Panel title="Platform activity" className="ref-wide-activity">
          <Chart wide />
        </Panel>
      </div>
      <aside className="ref-admin-aside">
        <Panel title="Platform activity">
          <Chart kind="bars" />
          <div className="ref-quick-stats">
            <h3>Quick stats</h3>
            {[
              ["Total users", "1,248", "12%"],
              ["New cases this month", "86", "18%"],
              ["Total revenue (YTD)", "€412,680", "24%"],
            ].map(([n, v, t], i) => (
              <div key={n}>
                {i === 0 ? <Users size={12} /> : <Folder size={12} />}
                <span>{n}</span>
                <b>{v}</b>
                <Trend>{t}</Trend>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Fastest responders"
          link="View all"
          onClick={() => setModal({ type: "responders" })}
        >
          <table className="responders">
            <thead>
              <tr>
                <th>#</th>
                <th>Professional</th>
                <th>Avg. response time</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Mariana Silva",
                "João Almeida",
                "Carla Mendes",
                "Rafael Costa",
                "Inês Pereira",
              ].map((n, i) => (
                <tr key={n}>
                  <td>
                    <span className="rank-medal">{i + 1}</span>
                  </td>
                  <td>
                    <Avatar name={n} size="small" />
                    {n}
                  </td>
                  <td>
                    {["18 min", "22 min", "35 min", "42 min", "1h 05m"][i]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </aside>
    </div>
  );
}
function Deadlines({ c, compact = false }) {
  const { d, btn, setModal } = c;
  return (
    <div className={"ref-deadlines " + (compact ? "compact" : "")}>
      {d.tasks
        .filter((t) => !t.done)
        .slice(0, compact ? 4 : 5)
        .map((t, i) => (
          <button
            key={t.id}
            className="ref-deadline"
            onClick={() => setModal({ type: "reminder", item: t })}
          >
            <span className={"deadline-icon " + (i === 0 ? "late" : "")}>
              <CalendarDays size={15} />
            </span>
            <span>
              <b>{t.title}</b>
              <small>{fmt(t.due)}, 2026</small>
            </span>
            <span className={"deadline-state " + (i === 0 ? "late" : "")}>
              {i === 0 ? "Due soon" : "Reminder set"}
              <small>{i === 0 ? "Action needed" : "2 days before"}</small>
            </span>
            <ChevronRight size={12} />
          </button>
        ))}
      {!d.tasks.filter((t) => !t.done).length && (
        <p className="ref-empty">No upcoming deadlines.</p>
      )}
    </div>
  );
}
function CalendarMini({ c }) {
  const { visibleMeetings, setModal, btn, go } = c;
  const [day, setDay] = useState(0);
  return (
    <>
      <div className="week-strip">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((x, i) => (
          <button
            onClick={() => setDay(i)}
            className={day === i ? "active" : ""}
            key={x}
          >
            <span>{x}</span>
            <b>{2 + i}</b>
          </button>
        ))}
      </div>
      <div className="calendar-sync">
        <button onClick={() => setModal({ type: "connect" })}>
          <span className="google-g">G</span>Sync with Google
        </button>
        <button onClick={() => setModal({ type: "connect" })}>
          <span className="outlook-o">O</span>Sync with Outlook
        </button>
      </div>
      <div className="ref-agenda">
        {visibleMeetings()
          .filter(
            (m) =>
              m.status !== "Declined" &&
              m.status !== "Cancelled" &&
              new Date(m.date + "T12:00:00").getDate() === 2 + day,
          )
          .slice(0, 3)
          .map((m, i) => (
            <button
              key={m.id}
              onClick={() => setModal({ type: "appointment", item: m })}
            >
              <time>{m.time}</time>
              <span>
                <b>{m.title}</b>
                <small>
                  {m.person} · {fmt(m.date)}
                </small>
              </span>
              <i style={{ background: ["#2f8755", "#2983ab", "#6e5291"][i] }} />
            </button>
          ))}
      </div>
    </>
  );
}
function MeetingRequests({ c, lawyer = false }) {
  const { visibleMeetings, btn, setModal, meetingAction } = c;
  return (
    <div className="ref-meeting-requests">
      {visibleMeetings()
        .filter((m) => m.status === "Pending")
        .map((m) => (
          <div key={m.id}>
            <div className="ref-request-person">
              <c.Avatar name={m.person} />
              <span>
                <b>{m.person}</b>
                <small>
                  {m.title} · {m.property}
                </small>
                <small>
                  {fmt(m.date)}, 2026 · {m.time}
                </small>
              </span>
            </div>
            <div className="button-row">
              {btn(
                lawyer ? "Accept & prepare" : "Accept",
                () => setModal({ type: "prepare", item: m }),
                "primary small",
              )}
              {btn(
                "Decline",
                () => meetingAction(m.id, "Declined"),
                "secondary small",
              )}
              {!lawyer &&
                btn(
                  "Reassign",
                  () => setModal({ type: "reassign", item: m }),
                  "secondary small",
                )}
            </div>
          </div>
        ))}
      {!visibleMeetings().some((m) => m.status === "Pending") && (
        <p className="ref-empty">No pending meeting requests.</p>
      )}
    </div>
  );
}
function ListingsMini({ c }) {
  return (
    <div className="table-wrap">
      <table className="ref-listings-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Location</th>
            <th>Price</th>
            <th>Nearest school</th>
            <th>Sports academy</th>
          </tr>
        </thead>
        <tbody>
          {c.allProperties.slice(0, 3).map((p) => (
            <tr
              key={p.id}
              onClick={() => {
                c.setSelected(p.id);
                c.go("Property");
              }}
            >
              <td>
                <img src={p.image} alt="" />
                {p.name}
              </td>
              <td>{p.location}</td>
              <td>{euro(p.price)}</td>
              <td>
                {p.school}
                <small>{p.schoolTime} min</small>
              </td>
              <td>
                {p.sport}
                <small>{p.sportTime} min</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function ProfessionalDashboard({ c }) {
  const lawyer = c.d.role === "Lawyer";
  return (
    <div className={"ref-pro-layout " + (lawyer ? "lawyer" : "agent")}>
      <div className="ref-pro-main">
        <div className="ref-page-title">
          <h1>Good morning, {lawyer ? "Ana" : "Sofia"}</h1>
          <p>
            Here’s what’s happening with your{" "}
            {lawyer ? "client purchases" : "cases"} today.
          </p>
        </div>
        <div className="ref-metrics">
          <Metric
            icon={Folder}
            title="Active cases"
            value={lawyer ? "8" : "12"}
            change="2"
          />
          <Metric
            icon={CalendarDays}
            title={lawyer ? "Deadlines today" : "Viewings this week"}
            value={lawyer ? "3" : "7"}
            change="3"
            down={lawyer}
            period="vs. last week"
          />
          <Metric
            icon={FileText}
            title="Documents waiting"
            value={
              c.d.documents.filter((x) =>
                ["Requested", "Ready to review"].includes(x.status),
              ).length
            }
            change="2"
            down
            period="vs. last week"
          />
          <Metric
            icon={MessageSquare}
            title={lawyer ? "Meeting requests" : "Reminders due today"}
            value={
              lawyer
                ? c.visibleMeetings().filter((x) => x.status === "Pending")
                    .length
                : "3"
            }
            change="1"
            down={!lawyer}
            period="vs. last week"
          />
        </div>
        <div className="ref-pro-panels">
          {!lawyer && (
            <Panel
              title="Deadlines and reminders"
              link="View all"
              onClick={() => c.go("Tasks")}
            >
              <Deadlines c={c} />
            </Panel>
          )}
          {lawyer ? (
            <Panel
              title="My cases"
              link="View all"
              onClick={() => c.go("Purchases")}
            >
              {c.clientTable(true)}
            </Panel>
          ) : (
            <Panel
              title="Meeting requests"
              link="View all"
              onClick={() => c.go("Meetings")}
            >
              <MeetingRequests c={c} />
            </Panel>
          )}
          {lawyer ? (
            <Panel
              title="Document requests"
              link="View all"
              onClick={() => c.go("Documents")}
            >
              <div className="ref-doc-requests">
                {c.d.documents
                  .filter((x) => x.access.includes(c.d.role))
                  .slice(0, 5)
                  .map((x) => (
                    <button key={x.id} onClick={() => c.documentAction(x)}>
                      <span className="doc-symbol">
                        <FileText size={20} />
                      </span>
                      <span>
                        <b>{x.name}</b>
                        <small>From: {x.by}</small>
                      </span>
                      <c.Badge
                        tone={x.access.length === 3 ? "green" : "purple"}
                      >
                        {x.access.length === 3
                          ? "Everyone"
                          : x.access.join(" + ")}
                      </c.Badge>
                    </button>
                  ))}
              </div>
              {c.btn(
                "Request document",
                () => c.setModal({ type: "requestDoc" }),
                "primary small",
                Plus,
              )}
            </Panel>
          ) : (
            <Panel
              title="My cases"
              link="View all"
              onClick={() => c.go("Clients")}
            >
              {c.clientTable(true)}
            </Panel>
          )}
          {lawyer ? (
            <Panel
              title="To-do list"
              link="View all"
              onClick={() => c.go("Tasks")}
            >
              {c.taskList()}
            </Panel>
          ) : (
            <Panel
              title="Calendar"
              link="View all"
              onClick={() => c.go("Calendar")}
            >
              <CalendarMini c={c} />
            </Panel>
          )}
          {lawyer && (
            <Panel
              title="Reminders for deadlines"
              link="View all"
              onClick={() => c.go("Tasks")}
            >
              <Deadlines c={c} compact />
            </Panel>
          )}
        </div>
        {!lawyer ? (
          <div className="ref-listings-bottom">
            <Panel
              title="My listings"
              link="+ Add listing"
              onClick={() => c.setModal({ type: "listing" })}
            >
              <ListingsMini c={c} />
            </Panel>
            <div>
              <Panel title="Your average reply">
                <strong className="ref-large-number">2 h 10 m</strong>
                <small className="muted">↓ 45% vs. last month</small>
              </Panel>
              <Panel title="Commission pending">
                <strong className="ref-large-number">
                  {euro((c.purchase.price * c.d.agencyRate) / 100)}
                </strong>
                <Trend>12% vs. last month</Trend>
              </Panel>
            </div>
          </div>
        ) : (
          <div className="ref-lawyer-bottom">
            <Panel title="Response time">
              <small className="muted">Average reply</small>
              <strong className="ref-large-number">3 h 05 m</strong>
              <Trend>32% vs. last month</Trend>
              <Chart />
            </Panel>
            <Panel title="Stay on top">
              <p>
                Keep track of deadlines, manage your clients and close more
                deals.
              </p>
              {c.btn(
                "View all cases",
                () => c.go("Purchases"),
                "secondary small",
                ArrowRight,
              )}
            </Panel>
          </div>
        )}
      </div>
      <aside className="ref-pro-aside">
        {lawyer ? (
          <>
            <Panel
              title="Calendar and meetings"
              link="View all"
              onClick={() => c.go("Calendar")}
            >
              <CalendarMini c={c} />
              <div className="ref-subheading">
                <h3>Meeting requests</h3>
              </div>
              <MeetingRequests c={c} lawyer />
              <InlinePrepare c={c} />
            </Panel>
          </>
        ) : (
          <AgencyPanel c={c} />
        )}
      </aside>
    </div>
  );
}
function InlinePrepare({ c }) {
  const [mode, setMode] = useState("type");
  const [message, setMessage] = useState(
    "Do you have a Portuguese NIF?\nWhere will the funds come from?",
  );
  const [auto, setAuto] = useState(true);
  const pending = c.visibleMeetings().find((x) => x.status === "Pending");
  return (
    <div className="ref-inline-prepare">
      <h3>
        Prepare {pending?.person || "your client"} for the meeting{" "}
        <ChevronDown size={12} />
      </h3>
      <div className="prepare-options">
        <label>
          <input
            type="radio"
            checked={mode === "type"}
            onChange={() => setMode("type")}
          />
          Type a message
        </label>
        <label>
          <input
            type="radio"
            checked={mode === "saved"}
            onChange={() => setMode("saved")}
          />
          Use my saved set
        </label>
      </div>
      {mode === "saved" ? (
        <select value={message} onChange={(e) => setMessage(e.target.value)}>
          {(
            c.d.templates || [
              "Do you have a Portuguese NIF?\nWhere will the funds come from?",
              "Please bring your passport, proof of funds and any property questions.",
            ]
          ).map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      ) : (
        <textarea
          aria-label="Client preparation message"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      )}
      <label className="inline-check">
        <input
          type="checkbox"
          checked={auto}
          onChange={(e) => setAuto(e.target.checked)}
        />
        Send automatically whenever I accept a request
      </label>
      <div className="button-row">
        {c.btn(
          pending ? "Accept and send" : "Save preparation",
          () => {
            if (pending) {
              c.patch({
                autoPrepare: auto,
                templates: [...new Set([...(c.d.templates || []), message])],
              });
              c.meetingAction(pending.id, "Confirmed", message);
            } else {
              c.patch({
                templates: [...new Set([...(c.d.templates || []), message])],
                autoPrepare: auto,
              });
              c.notify("Preparation template saved");
            }
          },
          "primary small",
        )}
        {c.btn("Cancel", () => setMessage(""), "secondary small")}
      </div>
      <button
        className="text-link"
        onClick={() => c.setModal({ type: "templates" })}
      >
        Manage my saved questions
      </button>
      <details>
        <summary>Decline request</summary>
        <textarea
          aria-label="Decline message"
          placeholder="Optional message to the client"
          rows="2"
        />
        {c.btn(
          "Decline",
          () =>
            pending
              ? c.meetingAction(pending.id, "Declined")
              : c.notify("No pending requests to decline"),
          "secondary small",
        )}
      </details>
    </div>
  );
}
function AgencyPanel({ c }) {
  const [view, setView] = useState("Agency view");
  return (
    <>
      <div className="ref-view-toggle">
        <button
          className={view === "My view" ? "active" : ""}
          onClick={() => {
            setView("My view");
            c.notify("Individual activity is shown in the main dashboard");
          }}
        >
          My view
        </button>
        <button
          className={view === "Agency view" ? "active" : ""}
          onClick={() => setView("Agency view")}
        >
          Agency view
        </button>
      </div>
      <div className="ref-page-title">
        <h1>Agency performance</h1>
        <p>Key metrics and team overview.</p>
      </div>
      <div className="ref-agency-metrics">
        <Panel title="Clients per agent this month">
          <div className="ref-agent-bars">
            {[12, 9, 7, 6, 5].map((v, i) => (
              <button
                onClick={() => c.setModal({ type: "agentDetail", index: i })}
                key={i}
              >
                <small>{v}</small>
                <i style={{ height: 20 + v * 5 + "px" }} />
                <span>{["Sofia", "João", "Marta", "Rafael", "Inês"][i]}</span>
              </button>
            ))}
          </div>
        </Panel>
        <Metric icon={House} title="Houses listed" value="28" />
        <Metric icon={Eye} title="Viewings" value="73" change="18%" />
        <Metric icon={Star} title="Reviews" value="4.8" change="0.3" />
      </div>
      <Panel
        title="Top agents this month"
        link="View all"
        onClick={() => c.go("Agency")}
      >
        <div className="ref-top-agents">
          {[
            "Sofia Sousa",
            "João Almeida",
            "Marta Ferreira",
            "Rafael Costa",
            "Inês Pereira",
          ].map((n, i) => (
            <button
              key={n}
              onClick={() => c.setModal({ type: "agentDetail", index: i })}
            >
              <span className="rank-medal">{i + 1}</span>
              <c.Avatar name={n} />
              <span>
                <b>{n}</b>
                <small>
                  {12 - i * 2} clients · {8 - i} closed
                </small>
              </span>
              <span>☆ {(4.9 - i * 0.1).toFixed(1)}</span>
            </button>
          ))}
        </div>
      </Panel>
      <div className="ref-agency-banner">
        <img
          src="/brand/portugal-coast.jpg"
          alt="Portuguese coast extracted from the client's PowerPoint"
        />
        <div>
          <h2>Together we close more</h2>
          <p>More clients. More listings. More success.</p>
          {c.btn("View agency insights", () => c.go("Agency"), "primary small")}
        </div>
      </div>
    </>
  );
}
function BuyerDashboard({ c }) {
  return (
    <>
      <div className="ref-page-title">
        <h1>Good morning, {c.d.name}</h1>
        <p>
          Your home purchase, your professionals and your next steps in one
          place.
        </p>
      </div>
      <div className="ref-metrics">
        <Metric
          icon={House}
          title="Your purchase"
          value={c.stages[c.d.stage]}
          change={c.d.stage === 4 ? "Completed" : "In progress"}
          period=""
        />
        <Metric
          icon={Users}
          title="Your team"
          value={c.d.team.length + 1}
          change="Connected"
          period=""
        />
        <Metric
          icon={FileText}
          title="Documents to complete"
          value={
            c.d.documents.filter((x) =>
              ["Requested", "Awaiting signature"].includes(x.status),
            ).length
          }
          change="Action needed"
          period=""
          down
        />
        <Metric
          icon={CalendarDays}
          title="Upcoming meetings"
          value={c.visibleMeetings().length}
          change="This month"
          period=""
        />
      </div>
      <ReferencePurchase c={c} embedded />
    </>
  );
}
export function ReferencePurchase({ c, embedded = false }) {
  const agent = ["Agent", "Lawyer"].includes(c.d.role);
  const [chatTab, setChatTab] = useState("Whole team");
  const [translated, setTranslated] = useState(true);
  return (
    <div className={"ref-purchase " + (agent ? "professional" : "buyer")}>
      <div className="ref-purchase-title">
        {agent ? (
          <div className="ref-client-header">
            <c.Avatar name="Emily Carter" size="large" />
            <div>
              <h1>
                Emily Carter <span>🇺🇸 USA</span>
              </h1>
              <div className="ref-client-meta">
                <img src={c.purchase.image} alt="Selected home" />
                <b>{c.purchase.name}</b>
                <span>
                  Language: English
                  <br />
                  Budget: €500,000 – €900,000
                </span>
              </div>
            </div>
          </div>
        ) : (
          <h1>
            Purchase: {c.purchase.name}, Cascais{" "}
            <c.Badge tone="green">
              {c.d.stage === 4 ? "Completed" : "In progress"}
            </c.Badge>
          </h1>
        )}
        <div className="button-row">
          {agent && (
            <>
              {c.btn(
                "Request a call",
                () => c.setModal({ type: "book", item: c.purchase }),
                "primary small",
                Phone,
              )}
              {c.btn(
                "Request document",
                () => c.setModal({ type: "requestDoc" }),
                "secondary small",
                FileText,
              )}
              {c.btn(
                "Send reminder",
                () => c.setModal({ type: "reminder" }),
                "secondary small",
                Bell,
              )}
              {c.btn(
                "Message",
                () => document.querySelector(".ref-group-chat input")?.focus(),
                "secondary small",
                MessageSquare,
              )}
            </>
          )}
          {c.d.role === "Lawyer" &&
            c.btn(
              "Update stage",
              () => c.setModal({ type: "stage" }),
              "primary small",
              CheckCircle2,
            )}
        </div>
      </div>
      <div className="ref-purchase-progress">{c.progress()}</div>
      {!agent && (
        <div className="ref-participant-row">
          <div className="ref-participant">
            <c.Avatar name="Emily Carter" size="large" />
            <span>
              <small>Buyer</small>
              <b>Emily Carter</b>
              <small>🇺🇸 USA</small>
            </span>
            {c.d.showResponseTimes !== false && (
              <c.Badge tone="green">
                Usually replies
                <br />
                in 2 h
              </c.Badge>
            )}
          </div>
          {c.pros
            .filter((p) => c.d.team.includes(p.id))
            .map((p) => (
              <div className="ref-participant" key={p.id}>
                <c.Avatar name={p.name} size="large" />
                <span>
                  <small>{p.role}</small>
                  <b>{p.name}</b>
                  <small>🇵🇹 Portugal</small>
                </span>
                {c.d.showResponseTimes !== false && (
                  <c.Badge tone="green">
                    Usually replies
                    <br />
                    in {p.response}
                  </c.Badge>
                )}
              </div>
            ))}
        </div>
      )}
      <div className="ref-purchase-columns">
        {agent && (
          <Panel title="Team on this purchase" className="ref-purchase-team">
            {c.pros
              .filter((p) => c.d.team.includes(p.id))
              .map((p, i) => (
                <div className="ref-team-member" key={p.id}>
                  <div className="person-line">
                    <c.Avatar name={p.name} size="large" />
                    <span>
                      <b>{p.name}</b>
                      <small>{p.role}</small>
                    </span>
                    <c.Badge tone="green">Replies in {p.response}</c.Badge>
                  </div>
                  <div className="team-task-bar">
                    <i style={{ width: (i + 2) * 20 + "%" }} />
                  </div>
                  <small>
                    {i + 3} of 6 tasks done this week{" "}
                    <span>Last active: {i + 1} h ago</span>
                  </small>
                  <div className="button-row">
                    {c.btn(
                      "Message",
                      () => {
                        setChatTab("Whole team");
                        document
                          .querySelector(".ref-group-chat input")
                          ?.focus();
                      },
                      "secondary small",
                      MessageSquare,
                    )}
                    {c.btn(
                      "Remind",
                      () => c.setModal({ type: "reminder", recipient: p.name }),
                      "secondary small",
                      Bell,
                    )}
                  </div>
                </div>
              ))}
            {c.btn(
              "Invite a professional",
              () => c.go("Professionals"),
              "secondary small",
              Plus,
            )}
          </Panel>
        )}
        <div className="ref-purchase-center">
          <PurchaseDocuments c={c} />
          {agent && (
            <Panel
              title="Deadlines"
              link="View all"
              onClick={() => c.go("Tasks")}
            >
              <Deadlines c={c} compact />
            </Panel>
          )}
        </div>
        {!agent && (
          <Panel
            title="Deadlines"
            link="View all"
            onClick={() => c.go("Tasks")}
          >
            <Deadlines c={c} />
          </Panel>
        )}
        <div className="ref-purchase-right">
          <Panel title="Group chat" className="ref-group-chat">
            <label className="ref-translate">
              Translate
              <input
                type="checkbox"
                checked={translated}
                onChange={(e) => setTranslated(e.target.checked)}
              />
            </label>
            {agent && (
              <div className="ref-small-tabs">
                {["Whole team", "Emily", "Lawyer"].map((x) => (
                  <button
                    key={x}
                    className={chatTab === x ? "active" : ""}
                    onClick={() => setChatTab(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            )}
            <div className="ref-chat-body">
              {c.d.messages
                .filter(
                  (m) =>
                    chatTab === "Whole team" ||
                    (chatTab === "Emily" && m.role === "Buyer") ||
                    (chatTab === "Lawyer" && m.role === "Lawyer"),
                )
                .slice(-4)
                .map((m) => (
                  <div className="ref-chat-message" key={m.id}>
                    <c.Avatar name={m.person} size="small" />
                    <div>
                      <span>
                        <b>{m.person}</b>
                        <time>{m.time}</time>
                      </span>
                      <div className="ref-chat-bubble">
                        <p>{m.pt || m.text}</p>
                        {translated && m.pt && (
                          <>
                            <div className="chat-divider" />
                            <p className="translated-copy">{m.text}</p>
                            <small>
                              <Globe size={10} /> Translated{" "}
                              <button onClick={() => setTranslated(false)}>
                                See original
                              </button>
                            </small>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <form
              className="ref-chat-compose"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements.text;
                if (!input.value.trim()) return;
                c.patch({
                  messages: [
                    ...c.d.messages,
                    {
                      id: Date.now(),
                      person: c.who,
                      role: c.d.role,
                      text: input.value,
                      time: "Now",
                    },
                  ],
                });
                input.value = "";
              }}
            >
              <input
                name="text"
                placeholder="Message the purchase team…"
                aria-label="Purchase message"
              />
              <button
                type="button"
                aria-label="Attach purchase document"
                onClick={() => c.setModal({ type: "upload" })}
              >
                <Upload size={15} />
              </button>
              <button aria-label="Send purchase message">
                <Send size={16} />
              </button>
            </form>
          </Panel>
          {agent && (
            <Panel title="Commission tracked on this deal">
              <div className="ref-commission">
                <Wallet size={26} />
                <strong>
                  {euro((c.purchase.price * c.d.agencyRate) / 100)}
                </strong>
                <c.Badge tone="amber">Pending</c.Badge>
              </div>
            </Panel>
          )}
        </div>
      </div>
      {!agent && (
        <Panel
          title="Payments"
          link="View all"
          onClick={() => c.go("Payments")}
        >
          <div className="ref-purchase-payment">
            {c.d.payments.map((p) => (
              <button
                key={p.id}
                onClick={() => c.setModal({ type: "paymentDetail", item: p })}
              >
                <Wallet size={26} />
                <b>{p.title}</b>
                <span>{euro(p.amount)}</span>
                <span>
                  Coordinated by NINHO<small>{fmt(p.due)}, 2026</small>
                </span>
                <c.Badge tone={p.status === "Paid" ? "green" : "amber"}>
                  {p.status}
                </c.Badge>
              </button>
            ))}
          </div>
        </Panel>
      )}
      {agent && (
        <div className="ref-purchase-action-panels">
          <Panel title="Request a call">
            <p>
              Select your team and propose a time for the next conversation.
            </p>
            <div className="person-line">
              <c.Avatar name="Emily Carter" />
              <span>Emily Carter · Buyer</span>
            </div>
            {c.btn(
              "Choose participants & time",
              () => c.setModal({ type: "book", item: c.purchase }),
              "primary full",
              Phone,
            )}
          </Panel>
          <Panel title="Send reminder">
            <p>Keep everyone aligned on the next deadline.</p>
            <Deadlines c={c} compact />
            {c.btn(
              "Send a reminder",
              () => c.setModal({ type: "reminder" }),
              "primary full",
              Bell,
            )}
          </Panel>
          <Panel title="Request document">
            <p>Choose a document, due date and who can view it.</p>
            <div className="callout">
              <ShieldCheck size={20} />
              Visibility is selected separately for each document.
            </div>
            {c.btn(
              "Create document request",
              () => c.setModal({ type: "requestDoc" }),
              "primary full",
              FileText,
            )}
          </Panel>
        </div>
      )}
    </div>
  );
}
function PurchaseDocuments({ c }) {
  const docs = c.d.documents.filter(
    (x) => x.access.includes(c.d.role) || c.d.role === "Admin",
  );
  return (
    <Panel title="Documents" className="ref-purchase-documents">
      <div className="ref-doc-toolbar">
        {c.btn(
          "Request document",
          () => c.setModal({ type: "requestDoc" }),
          "primary small",
          Plus,
        )}
        {c.btn(
          "Upload",
          () => c.setModal({ type: "upload" }),
          "secondary small",
          Upload,
        )}
        {c.btn(
          "Sign",
          () => {
            const doc = docs.find((x) => x.status === "Awaiting signature");
            doc
              ? c.setModal({ type: "sign", item: doc })
              : c.notify("No documents are awaiting your signature");
          },
          "secondary small",
          PenLine,
        )}
      </div>
      <div className="ref-document-notice">
        <CheckCircle2 size={16} />
        Shared updates: permitted parties are notified together.
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>{c.d.role === "Buyer" ? "Uploaded by" : "Requested from"}</th>
              <th>Status</th>
              <th>Visibility</th>
              {c.d.role !== "Buyer" && <th>Due date</th>}
              <th />
            </tr>
          </thead>
          <tbody>
            {docs.map((x) => (
              <tr key={x.id}>
                <td>
                  <button
                    className="ref-document-name"
                    onClick={() => c.documentAction(x)}
                  >
                    <span className="doc-symbol">
                      <FileText size={19} />
                    </span>
                    <span>{x.name}</span>
                  </button>
                </td>
                <td>{x.by}</td>
                <td>
                  <c.Badge
                    tone={
                      x.status === "Requested" ||
                      x.status === "Awaiting signature"
                        ? "amber"
                        : "green"
                    }
                  >
                    {x.status}
                  </c.Badge>
                </td>
                <td>
                  <button
                    onClick={() => c.setModal({ type: "visibility", item: x })}
                  >
                    <c.Badge
                      tone={
                        x.access.length === 3
                          ? "green"
                          : x.access.length === 1
                            ? ""
                            : "purple"
                      }
                    >
                      {x.access.length >= 3 ? "Everyone" : x.access.join(" + ")}
                    </c.Badge>
                  </button>
                </td>
                {c.d.role !== "Buyer" && <td>{x.due ? fmt(x.due) : "—"}</td>}
                <td>
                  <button
                    className="icon-btn"
                    aria-label={"Open " + x.name}
                    onClick={() => c.documentAction(x)}
                  >
                    <ChevronRight size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!docs.length && (
        <p className="ref-empty">
          No documents yet. Request or upload your first document.
        </p>
      )}
    </Panel>
  );
}
export function ReferenceModal({ c, modal: m }) {
  const [message, setMessage] = useState(
    m.recipient
      ? "A reminder for " +
          m.recipient +
          ": please review the next purchase deadline."
      : "A friendly reminder to review the next steps on our purchase.",
  );
  const [template, setTemplate] = useState("");
  const close = () => c.setModal(null);
  const done = (t) => {
    close();
    c.notify(t);
  };
  let title = "",
    body;
  const form = (fields, onSubmit, text = "Save changes") => (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.target));
      }}
    >
      {fields}
      <div className="modal-actions">
        <button type="button" className="btn secondary" onClick={close}>
          Cancel
        </button>
        <button className="btn primary">{text}</button>
      </div>
    </form>
  );
  if (m.type === "reminder") {
    title = "Send reminder";
    body = form(
      <>
        <label>
          Recipients
          <select
            name="recipient"
            defaultValue={m.recipient || "Whole purchase team"}
          >
            <option>Whole purchase team</option>
            <option>Emily Carter</option>
            {c.pros
              .filter((p) => c.d.team.includes(p.id))
              .map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
          </select>
        </label>
        <label>
          Reminder template
          <select onChange={(e) => setMessage(e.target.value)}>
            <option value="A friendly reminder to review the next steps on our purchase.">
              Purchase reminder
            </option>
            <option value="Please upload the requested document before the due date so we can keep your purchase moving.">
              Document reminder
            </option>
            <option value="Your appointment is coming up. Please review the preparation notes and confirm your availability.">
              Meeting reminder
            </option>
          </select>
        </label>
        <label>
          Message
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          />
        </label>
        <label className="inline-check">
          <input type="checkbox" defaultChecked />
          Notify permitted participants together
        </label>
        <p className="muted fine">
          This records a demo reminder in the shared activity and chat. No email
          is sent.
        </p>
      </>,
      (fd) => {
        c.patch({
          messages: [
            ...c.d.messages,
            {
              id: Date.now(),
              person: c.who,
              role: c.d.role,
              text:
                "Reminder for " +
                fd.get("recipient") +
                ": " +
                fd.get("message"),
              time: "Now",
            },
          ],
        });
        c.event("Reminder sent to " + fd.get("recipient"));
        done("Reminder recorded in the purchase workspace");
      },
      "Send reminder",
    );
  }
  if (m.type === "visibility") {
    title = "Document visibility";
    body = form(
      <>
        <p>{m.item.name}</p>
        <fieldset>
          <legend>Who can view this document?</legend>
          {["Buyer", "Agent", "Lawyer"].map((x) => (
            <label className="inline-check" key={x}>
              <input
                name="access"
                type="checkbox"
                value={x}
                defaultChecked={m.item.access.includes(x)}
              />
              {x}
            </label>
          ))}
        </fieldset>
        <p className="muted fine">
          Changes apply to the role views in this demo. Production permissions
          are enforced by the server.
        </p>
      </>,
      (fd) => {
        let access = [
          ...new Set([
            ...fd.getAll("access"),
            c.d.role === "Admin" ? "Lawyer" : c.d.role,
          ]),
        ];
        c.patch({
          documents: c.d.documents.map((x) =>
            x.id === m.item.id ? { ...x, access } : x,
          ),
        });
        c.event("Visibility updated for " + m.item.name);
        done("Document visibility updated");
      },
    );
  }
  if (m.type === "templates") {
    title = "My saved preparation questions";
    body = (
      <>
        <div className="ref-template-list">
          {(
            c.d.templates || [
              "Do you have a Portuguese NIF?\nWhere will the funds come from?",
              "Please bring your passport, proof of funds and any property questions.",
            ]
          ).map((t, i) => (
            <div key={i}>
              <p>{t}</p>
              <button
                className="text-link"
                onClick={() => {
                  c.patch({
                    templates: (
                      c.d.templates || [
                        "Do you have a Portuguese NIF?\nWhere will the funds come from?",
                        "Please bring your passport, proof of funds and any property questions.",
                      ]
                    ).filter((_, j) => j !== i),
                  });
                  c.notify("Template removed");
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            c.patch({ templates: [...(c.d.templates || []), template] });
            setTemplate("");
            c.notify("Preparation template added");
          }}
        >
          <label>
            Add saved questions
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows="3"
              required
            />
          </label>
          <button className="btn primary">Save template</button>
        </form>
      </>
    );
  }
  if (m.type === "invoiceBatch") {
    title = "Generate monthly invoices";
    body = form(
      <>
        <p className="muted">October 2026 · Five agencies</p>
        {agencies.map((a) => (
          <div className="key-value" key={a[0]}>
            <b>{a[0]}</b>
            <span>{euro(a[1] * 0.03)} commission statement</span>
          </div>
        ))}
        <div className="callout">
          <FileText size={18} />
          Demo statements only. Portuguese certified invoices require NINHO’s
          selected provider.
        </div>
      </>,
      () => {
        c.patch({
          invoices: agencies.map((a, i) => ({
            id: i + 1,
            agency: a[0],
            amount: Math.round(a[1] * 0.03),
            status: "Generated",
            period: "October 2026",
          })),
        });
        c.event("Monthly agency statements generated");
        done("Five draft monthly statements generated");
      },
      "Generate draft statements",
    );
  }
  if (m.type === "invoiceSend") {
    title = "Share monthly statements";
    body = (
      <>
        <p className="muted">
          {c.d.invoices?.length
            ? "Draft statements are ready for review."
            : "Generate the monthly draft statements before preparing delivery."}
        </p>
        {c.d.invoices?.map((x) => (
          <div className="key-value" key={x.id}>
            <b>{x.agency}</b>
            <span>
              {euro(x.amount)} · {x.status}
            </span>
          </div>
        ))}
        <p className="muted fine">
          This demo records delivery status only. No external messages or
          invoices are sent.
        </p>
        {c.btn(
          c.d.invoices?.length
            ? "Mark delivery prepared"
            : "Generate statements",
          () => {
            if (!c.d.invoices?.length)
              return c.setModal({ type: "invoiceBatch" });
            c.patch({
              invoices: c.d.invoices.map((x) => ({
                ...x,
                status: "Delivery prepared",
              })),
            });
            done("Statement delivery prepared in the demo");
          },
          "primary",
        )}
      </>
    );
  }
  if (m.type === "responders") {
    title = "Professional response times";
    body = (
      <>
        <p className="muted">Measured during configured business hours only.</p>
        {[
          "Mariana Silva",
          "João Almeida",
          "Carla Mendes",
          "Rafael Costa",
          "Inês Pereira",
        ].map((n, i) => (
          <div className="key-value" key={n}>
            <div className="person-line">
              <c.Avatar name={n} />
              <b>{n}</b>
            </div>
            <span>{["18 min", "22 min", "35 min", "42 min", "1h 05m"][i]}</span>
          </div>
        ))}
      </>
    );
  }
  if (m.type === "agentDetail") {
    const i = m.index;
    const name = [
      "Sofia Sousa",
      "João Almeida",
      "Marta Ferreira",
      "Rafael Costa",
      "Inês Pereira",
    ][i];
    title = name;
    body = (
      <>
        <div className="person-line">
          <c.Avatar name={name} size="large" />
          <span>
            <b>Porto Real Estate</b>
            <small>Real estate agent · Portuguese / English</small>
          </span>
        </div>
        <div className="key-value">
          <span>Clients this month</span>
          <b>{12 - i * 2}</b>
        </div>
        <div className="key-value">
          <span>Purchases closed</span>
          <b>{8 - i}</b>
        </div>
        <div className="key-value">
          <span>Buyer rating</span>
          <b>{(4.9 - i * 0.1).toFixed(1)} / 5</b>
        </div>
        {c.btn(
          "View assigned cases",
          () => {
            close();
            c.go("Clients");
          },
          "primary",
          ArrowRight,
        )}
      </>
    );
  }
  if (m.type === "preferences") {
    title = "Platform settings";
    body = form(
      <>
        <label>
          Business hours start
          <input
            name="start"
            type="time"
            defaultValue={c.d.businessStart || "09:00"}
            required
          />
        </label>
        <label>
          Business hours end
          <input
            name="end"
            type="time"
            defaultValue={c.d.businessEnd || "18:00"}
            required
          />
        </label>
        <label className="inline-check">
          <input
            name="visible"
            type="checkbox"
            defaultChecked={c.d.showResponseTimes !== false}
          />
          Show professional response times to buyers
        </label>
        <label>
          Base currency
          <input value="EUR" disabled />
        </label>
      </>,
      (fd) => {
        c.patch({
          businessStart: fd.get("start"),
          businessEnd: fd.get("end"),
          showResponseTimes: fd.has("visible"),
        });
        done("Platform preferences saved");
      },
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
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="icon-btn"
            aria-label="Close dialog"
            onClick={close}
          >
            ×
          </button>
        </div>
        {body}
      </div>
    </div>
  );
}
export function ReferenceProperty({ c, p }) {
  const [unit, setUnit] = useState("m²");
  const [cur, setCur] = useState("EUR");
  const [photo, setPhoto] = useState(p.image);
  const photos = [
    p.image,
    "/brand/living-room.jpg",
    "/brand/kitchen.jpg",
    "/brand/bedroom.jpg",
  ];
  const amounts = [
    ["Purchase", p.price],
    ["Property transfer tax (IMT) · sample 7%", Math.round(p.price * 0.07)],
    ["Stamp duty (Selo) · sample 0.8%", Math.round(p.price * 0.008)],
    ["Lawyer", 3500],
    ["Notary", 1200],
    ["Registration", 750],
    ["Agent fee · sample 5%", Math.round(p.price * 0.05)],
  ];
  return (
    <>
      <button className="back-link" onClick={() => c.go("Properties")}>
        ← Back to results
      </button>
      <div className="ref-property-layout">
        <div className="ref-property-main">
          <div className="ref-property-gallery">
            <img src={photo} alt={p.name} />
            <button
              className="gallery-arrow prev"
              aria-label="Previous property photo"
              onClick={() =>
                setPhoto(
                  photos[
                    (photos.indexOf(photo) + photos.length - 1) % photos.length
                  ],
                )
              }
            >
              ‹
            </button>
            <button
              className="gallery-arrow next"
              aria-label="Next property photo"
              onClick={() =>
                setPhoto(photos[(photos.indexOf(photo) + 1) % photos.length])
              }
            >
              ›
            </button>
            <span>
              {photos.indexOf(photo) + 1} / {photos.length}
            </span>
          </div>
          <div className="ref-photo-strip">
            {photos.map((x, i) => (
              <button
                key={x}
                onClick={() => setPhoto(x)}
                className={photo === x ? "active" : ""}
              >
                <img src={x} alt={"Property photo " + (i + 1)} />
              </button>
            ))}
            <button onClick={() => c.setModal({ type: "gallery", item: p })}>
              View all
              <br />
              photos
            </button>
          </div>
          <section className="ref-property-info ref-panel">
            <c.Badge>For sale</c.Badge>
            <h1>
              {p.name} with garden, {p.location.split(",")[0]}
            </h1>
            <div className="ref-property-price">
              {cur === "EUR"
                ? euro(p.price)
                : "$" + Math.round(p.price * 1.08).toLocaleString()}
              <small>
                {" "}
                · about{" "}
                {cur === "EUR"
                  ? "$" + Math.round(p.price * 1.08).toLocaleString()
                  : euro(p.price)}
              </small>
              <select
                aria-label="Property display currency"
                value={cur}
                onChange={(e) => setCur(e.target.value)}
              >
                <option>EUR</option>
                <option>USD</option>
              </select>
            </div>
            <div className="ref-property-facts">
              <div>
                <House size={24} />
                <span>
                  <b>
                    {unit === "m²" ? p.area : Math.round(p.area * 10.7639)}{" "}
                    {unit}
                  </b>
                  <div className="unit-switch">
                    <button
                      className={unit === "m²" ? "active" : ""}
                      onClick={() => setUnit("m²")}
                    >
                      m²
                    </button>
                    <button
                      className={unit === "ft²" ? "active" : ""}
                      onClick={() => setUnit("ft²")}
                    >
                      ft²
                    </button>
                  </div>
                </span>
              </div>
              <div>
                <Users size={24} />
                <span>
                  <b>{p.beds}</b>
                  <small>Bedrooms</small>
                </span>
              </div>
              <div>
                <Globe size={24} />
                <span>
                  <b>420 m²</b>
                  <small>Plot size · sample</small>
                </span>
              </div>
            </div>
            <div className="ref-property-amenities">
              <span>
                <House size={23} />
                Garden
              </span>
              <span>
                <Globe size={23} />
                Pool
              </span>
              <span>
                <Building2 size={23} />
                Garage
              </span>
              <span>
                <FileText size={23} />
                Energy rating: B
              </span>
            </div>
            <div className="ref-property-nearby">
              <h2>Nearby</h2>
              <div className="ref-nearby-layout">
                <img
                  src="/brand/cascais-map.jpg"
                  alt="Illustrative Cascais map extracted from the client reference"
                />
                <div>
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=" +
                          encodeURIComponent(p.school + " " + p.location),
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <Building2 size={22} />
                    <span>
                      {p.school}
                      <b>{p.schoolTime} min</b>
                      <small>By car · sample travel time</small>
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=" +
                          encodeURIComponent(p.sport + " " + p.location),
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <MapPin size={22} />
                    <span>
                      {p.sport}
                      <b>{p.sportTime} min</b>
                      <small>By car · sample travel time</small>
                    </span>
                  </button>
                  <small>Amenities nearby</small>
                  {[
                    ["Supermarket", "4 min"],
                    ["Pharmacy", "6 min"],
                    ["Beach", "8 min"],
                    ["Restaurants", "5 min"],
                  ].map(([n, t]) => (
                    <div className="ref-nearby-amenity" key={n}>
                      <House size={15} />
                      <span>{n}</span>
                      <b>{t}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ref-property-description">
              <h2>Property description</h2>
              <p>
                {p.description} This home offers a balance of comfort, privacy
                and indoor / outdoor living, with the neighborhood details and
                professional guidance to help you plan your move.
              </p>
              <details>
                <summary>Show more</summary>
                <p>
                  Arrange a viewing with your agent to review the home’s
                  condition, location and paperwork. All images and listing
                  details in this client demonstration are illustrative.
                </p>
              </details>
            </div>
            <div className="ref-property-features">
              <h2>Key features</h2>
              <div>
                {[
                  ...p.features,
                  "Bright living spaces",
                  "Excellent sun exposure",
                ].map((x) => (
                  <span key={x}>
                    <Check size={14} />
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
        <aside className="ref-property-aside">
          <Panel title="">
            <div className="person-line">
              <c.Avatar name="Sofia Sousa" size="large" />
              <span>
                <b>Sofia Sousa</b>
                <small>Listing agent · Cascais</small>
                <small>☆ 4.9 (32 sales)</small>
              </span>
            </div>
            {c.btn(
              "Book a viewing",
              () => c.setModal({ type: "book", item: p }),
              "primary full",
            )}
            <div className="ref-viewing-slots">
              {[
                ["Nov 8", "10:00 AM"],
                ["Nov 9", "11:30 AM"],
                ["Nov 10", "2:00 PM"],
              ].map(([date, time]) => (
                <button
                  key={date}
                  onClick={() =>
                    c.setModal({
                      type: "book",
                      item: p,
                      date:
                        date === "Nov 8"
                          ? "2026-11-08"
                          : date === "Nov 9"
                            ? "2026-11-09"
                            : "2026-11-10",
                      time:
                        time === "10:00 AM"
                          ? "10:00"
                          : time === "11:30 AM"
                            ? "11:30"
                            : "14:00",
                    })
                  }
                >
                  {date}
                  <small>{time}</small>
                </button>
              ))}
            </div>
            <button
              className="text-link"
              onClick={() => c.setModal({ type: "book", item: p })}
            >
              View more slots →
            </button>
            <div className="button-row">
              {c.btn(
                "Message",
                () => c.go("Messages"),
                "secondary",
                MessageSquare,
              )}
              {c.btn(
                "Request documents",
                () => c.setModal({ type: "requestDoc" }),
                "secondary",
                FileText,
              )}
            </div>
          </Panel>
          <Panel title="Estimate your total cost">
            <div className="ref-cost-items">
              {amounts.map(([n, v]) => (
                <div key={n}>
                  <span>{n}</span>
                  <b>{euro(v)}</b>
                </div>
              ))}
            </div>
            <div className="ref-cost-total">
              <span>
                Total <small>(approx.)</small>
              </span>
              <b>{euro(amounts.reduce((s, a) => s + a[1], 0))}</b>
            </div>
            {c.btn(
              "Create full estimate",
              () => c.setModal({ type: "cost", item: p }),
              "primary full",
            )}
            <p className="ref-cost-note">
              Sample budget assumptions only. Actual taxes, exemptions and fees
              must be confirmed by your lawyer.
            </p>
          </Panel>
          <Panel title="Ask professionals about this house">
            <p>Get personalized advice from trusted professionals.</p>
            {c.btn(
              "Request recommendations",
              () => c.setModal({ type: "recommend", item: p }),
              "primary small",
            )}
            <div className="ref-property-recommend">
              {c.pros
                .filter((x) => x.id === 2 || x.id === 4)
                .map((x) => (
                  <button
                    key={x.id}
                    onClick={() => c.setModal({ type: "profile", item: x })}
                  >
                    <c.Avatar name={x.name} />
                    <span>
                      <b>{x.name}</b>
                      <small>{x.role}</small>
                    </span>
                    <c.Badge tone="amber">☆ Recommended by NINHO</c.Badge>
                  </button>
                ))}
            </div>
          </Panel>
          <Panel title="What you’ll be asked at the viewing">
            <ol>
              <li>Do you have a Portuguese NIF?</li>
              <li>Where will the funds come from?</li>
              <li>Is this your primary residence or an investment?</li>
            </ol>
          </Panel>
          <Panel title="Your journey">
            <div className="ref-vertical-journey">
              {c.stages.map((s, i) => (
                <div key={s}>
                  <span className={i <= c.d.stage ? "complete" : ""}>
                    {i <= c.d.stage ? <Check size={12} /> : ""}
                  </span>
                  <b>{s}</b>
                  <small>
                    {
                      [
                        "Find your ideal property",
                        "Visit and compare",
                        "Make your offer",
                        "Prepare and sign",
                        "Receive the keys",
                      ][i]
                    }
                  </small>
                </div>
              ))}
            </div>
            <div className="ref-land-path">
              <p>For land purchases, the process becomes:</p>
              <b>Architect → Construction company.</b>
            </div>
            {c.btn(
              c.d.purchaseProperty === p.id
                ? "View my purchase"
                : "Start purchase journey",
              () => {
                if (c.d.purchaseProperty !== p.id)
                  c.patch({
                    purchaseProperty: p.id,
                    stage: 0,
                    documents: [],
                    messages: [],
                    payments: [],
                  });
                c.go("My purchase");
              },
              "secondary full",
              ArrowRight,
            )}
          </Panel>
        </aside>
      </div>
    </>
  );
}
