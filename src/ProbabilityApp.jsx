import { useState, useMemo } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// 1. HELPERS MATEMÁTICOS
// ══════════════════════════════════════════════════════════════════════════════

function comb(n, k) {
  if (n < 0 || k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - i + 1)) / i;
  return Math.round(c);
}

function fact(n) {
  if (n <= 1) return 1;
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. COMPONENTES VISUALES (UI)
// ══════════════════════════════════════════════════════════════════════════════

function StepHeader({ number, title, subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", background: "#4F6EF7",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
      }}>{number}</div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>{title}</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{subtitle}</div>
      </div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
      padding: "1.25rem", marginBottom: "1.25rem", ...style,
    }}>{children}</div>
  );
}

function BtnSecondary({ children, onClick, disabled, active, style }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      fontSize: 13, padding: "8px 14px", borderRadius: 8,
      border: `1px solid ${active ? "#4F6EF7" : "#d1d5db"}`,
      background: active ? "#eef2ff" : "#f9fafb",
      color: active ? "#4338ca" : "#374151",
      cursor: disabled ? "not-allowed" : "pointer",
      fontWeight: active ? 600 : 500, opacity: disabled ? 0.5 : 1,
      transition: "all 0.2s",
      ...style
    }}>{children}</button>
  );
}

function InputBox({ label, value, onChange, type = "number", step = "1", placeholder, highlight }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 120 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: highlight ? "#047857" : "#4b5563" }}>{label}</label>
      <input
        type={type} step={step} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          fontSize: 14, padding: "8px 10px", borderRadius: 6,
          border: `1px solid ${highlight ? "#34d399" : "#d1d5db"}`, 
          background: highlight ? "#ecfdf5" : "#fff",
          color: "#111",
          outline: "none", fontFamily: "monospace",
          transition: "border 0.2s"
        }}
        onFocus={(e) => e.target.style.borderColor = highlight ? "#059669" : "#4F6EF7"}
        onBlur={(e) => e.target.style.borderColor = highlight ? "#34d399" : "#d1d5db"}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. COMPONENTES MATEMÁTICOS TIPO "LATEX"
// ══════════════════════════════════════════════════════════════════════════════

function MathText({ children }) {
  return <span style={{ fontFamily: "'Latin Modern Math', 'Cambria Math', 'Times New Roman', serif", fontSize: "1.15em", color: "#111" }}>{children}</span>;
}

function V({ children }) {
  return <i style={{ fontFamily: "'Latin Modern Math', 'Cambria Math', 'Times New Roman', serif", fontStyle: "italic", paddingRight: "1px" }}>{children}</i>;
}

function MathFrac({ num, den }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", margin: "0 4px" }}>
      <span style={{ borderBottom: "1px solid #111", padding: "0 4px", lineHeight: 1.2 }}>{num}</span>
      <span style={{ lineHeight: 1.2, padding: "0 4px" }}>{den}</span>
    </span>
  );
}

function MathBinom({ n, k }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", verticalAlign: "middle", margin: "0 2px" }}>
      <span style={{ fontSize: "1.7em", fontWeight: 300, transform: "translateY(-1px)" }}>(</span>
      <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1, fontSize: "0.85em", padding: "0 2px" }}>
        <span>{n}</span>
        <span>{k}</span>
      </span>
      <span style={{ fontSize: "1.7em", fontWeight: 300, transform: "translateY(-1px)" }}>)</span>
    </span>
  );
}

function InfoCard({ title, desc, formula, meanF, varF }) {
  return (
    <Card style={{ background: "#f8fafc", borderLeft: "4px solid #4F6EF7", padding: "1rem 1.25rem" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ fontSize: 24, marginTop: -2 }}>📚</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 6px 0", fontSize: 15, color: "#0f172a", fontWeight: 700 }}>{title}</h3>
          <p style={{ margin: "0 0 12px 0", fontSize: 13, color: "#475569", lineHeight: 1.5 }}>{desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", background: "#fff", padding: "14px 18px", borderRadius: 8, border: "1px solid #e2e8f0", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ color: "#64748b", fontWeight: 700, fontSize: 10, marginBottom: 8, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Fórmula (PMF)</div> 
              <div style={{ padding: "4px 0" }}>{formula}</div>
            </div>
            <div style={{ width: "1px", height: "40px", background: "#e2e8f0" }}></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ color: "#64748b", fontWeight: 700, fontSize: 10, marginBottom: 8, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Media E(X)</div> 
              <div style={{ padding: "4px 0" }}>{meanF}</div>
            </div>
            <div style={{ width: "1px", height: "40px", background: "#e2e8f0" }}></div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ color: "#64748b", fontWeight: 700, fontSize: 10, marginBottom: 8, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Varianza Var(X)</div> 
              <div style={{ padding: "4px 0" }}>{varF}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. GRÁFICOS
// ══════════════════════════════════════════════════════════════════════════════

function DistributionChart({ data, targetX }) {
  if (!data || data.length === 0) return null;
  const maxProb = Math.max(...data.map(d => d.prob));
  const MAX_BAR_HEIGHT = 160;

  return (
    <Card>
      <StepHeader number="📊" title="Gráfico de Probabilidad (PMF)" subtitle="Distribución visual de P(X = x)" />
      <div style={{ overflowX: "auto", paddingBottom: "10px" }}>
        <div style={{ minWidth: `${data.length * 35}px` }}> 
          <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "190px", borderBottom: "2px solid #374151", padding: "0 10px" }}>
            {data.map((d) => {
              const hPx = maxProb > 0 ? (d.prob / maxProb) * MAX_BAR_HEIGHT : 0;
              const isTarget = d.x === targetX;
              return (
                <div key={d.x} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                  <div style={{ fontSize: "10px", color: isTarget ? "#059669" : "#6b7280", marginBottom: "4px", fontWeight: isTarget ? 800 : 600 }}>
                    {d.prob > 0.01 || isTarget ? d.prob.toFixed(2) : ""}
                  </div>
                  <div
                    title={`X = ${d.x}\nP(X = x) = ${d.prob.toFixed(5)}`}
                    style={{
                      width: "100%", maxWidth: "35px", height: `${hPx}px`, 
                      background: isTarget ? "linear-gradient(180deg, #10b981 0%, #047857 100%)" : "linear-gradient(180deg, #4F6EF7 0%, #3b5bdb 100%)",
                      borderRadius: "4px 4px 0 0", cursor: "pointer", transition: "opacity 0.2s",
                      boxShadow: isTarget ? "0 0 8px rgba(16, 185, 129, 0.6)" : "none"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "4px", padding: "0 10px", marginTop: "8px" }}>
            {data.map((d) => (
              <div key={d.x} style={{ flex: 1, textAlign: "center", fontSize: "11px", fontWeight: "bold", color: d.x === targetX ? "#059669" : "#374151", fontFamily: "monospace" }}>
                {d.x}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function MultinomialMarginalChart({ n, categories, valid }) {
  if (!valid || n <= 0 || categories.length === 0) return null;
  if (n > 200) {
    return (
      <Card style={{ background: "#fffbeb", borderColor: "#fcd34d" }}>
        <div style={{ color: "#b45309", fontWeight: 600, textAlign: "center", fontSize: 13 }}>
          ⚠️ El gráfico de Marginales está deshabilitado para ensayos mayores a 200 para proteger el rendimiento de tu navegador.
        </div>
      </Card>
    );
  }

  const COLORS = ["#4F6EF7", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  const chartData = categories.map((cat, i) => {
    const p = parseFloat(cat.p) || 0;
    const data = [];
    let maxP = 0;
    for (let x = 0; x <= n; x++) {
      const prob = comb(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
      data.push(prob);
      if (prob > maxP) maxP = prob;
    }
    return { id: cat.id, p, color: COLORS[i % COLORS.length], data, maxP };
  });

  const globalMaxP = Math.max(...chartData.map(c => c.maxP));
  const MAX_BAR_HEIGHT = 160;

  return (
    <Card>
      <StepHeader number="📈" title="Distribuciones Marginales (Frecuencia Relativa)" subtitle="Visualiza el comportamiento individual de cada categoría simulando la imagen proporcionada." />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, padding: "10px", background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>
        {chartData.map((c, i) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#374151" }}>
            <div style={{ width: 14, height: 14, backgroundColor: c.color, borderRadius: 3, opacity: 0.8 }} />
            Categoría {i + 1} (Media: {(n * c.p).toFixed(1)})
          </div>
        ))}
      </div>
      <div style={{ overflowX: "auto", paddingBottom: "10px" }}>
        <div style={{ minWidth: `${(n + 1) * 20}px` }}> 
          <div style={{ display: "flex", alignItems: "flex-end", height: "190px", borderBottom: "2px solid #374151", padding: "0 10px" }}>
            {Array.from({ length: n + 1 }).map((_, x) => (
              <div key={x} style={{ flex: 1, position: "relative", height: "100%", display: "flex", justifyContent: "center" }}>
                {chartData.map(c => {
                  const prob = c.data[x];
                  const hPx = globalMaxP > 0 ? (prob / globalMaxP) * MAX_BAR_HEIGHT : 0;
                  if (hPx < 1) return null; 

                  return (
                    <div
                      key={c.id}
                      title={`Cat ${c.id}\nx = ${x}\nP(X = x) = ${prob.toFixed(4)}`}
                      style={{
                        position: "absolute", bottom: 0, height: `${hPx}px`, width: "100%", maxWidth: "18px",
                        backgroundColor: c.color, opacity: 0.6, mixBlendMode: "multiply", borderRadius: "3px 3px 0 0", cursor: "pointer",
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
                      onMouseOut={(e) => e.currentTarget.style.opacity = "0.6"}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", padding: "0 10px", marginTop: "8px" }}>
            {Array.from({ length: n + 1 }).map((_, x) => (
              <div key={x} style={{ flex: 1, textAlign: "center", fontSize: "10px", fontWeight: "bold", color: "#6b7280" }}>
                {n > 50 && x % 5 !== 0 ? "" : x}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. COMPONENTE: CÁLCULO ESPECÍFICO
// ══════════════════════════════════════════════════════════════════════════════

function TargetCard({ table, targetX }) {
  if (!table || table.length === 0) return null;
  const row = table.find(r => r.x === targetX);
  
  if (!row) {
    return (
      <Card style={{ background: "#fef2f2", borderColor: "#fecaca" }}>
        <div style={{ color: "#ef4444", fontWeight: 600, textAlign: "center", fontSize: 14 }}>
          ⚠️ El valor x = {targetX} está fuera del rango posible calculado.
        </div>
      </Card>
    );
  }

  const prevRow = table.find(r => r.x === targetX - 1);
  const probMenor = prevRow ? prevRow.cum : 0; 
  const pGreaterEqual = Math.max(0, 1 - probMenor);

  return (
    <Card style={{ background: "#ecfdf5", borderColor: "#6ee7b7" }}>
      <StepHeader number="🎯" title="Cálculo Específico" subtitle={`Respuestas para x = ${targetX}`} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 15, justifyContent: "space-around" }}>
        <div style={{ background: "#fff", padding: "12px 20px", borderRadius: 8, textAlign: "center", flex: 1, border: "1px solid #a7f3d0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 12, color: "#047857", marginBottom: 4, fontWeight: 600 }}>Exactamente {targetX}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#111", fontFamily: "monospace" }}>P(X = {targetX})</div>
          <div style={{ fontSize: 16, color: "#059669", fontFamily: "monospace", marginTop: 4 }}>{row.prob.toFixed(4)}</div>
        </div>
        <div style={{ background: "#fff", padding: "12px 20px", borderRadius: 8, textAlign: "center", flex: 1, border: "1px solid #a7f3d0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 12, color: "#047857", marginBottom: 4, fontWeight: 600 }}>Máximo {targetX} (Acumulada)</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#111", fontFamily: "monospace" }}>P(X ≤ {targetX})</div>
          <div style={{ fontSize: 16, color: "#059669", fontFamily: "monospace", marginTop: 4 }}>{row.cum.toFixed(4)}</div>
        </div>
        <div style={{ background: "#fff", padding: "12px 20px", borderRadius: 8, textAlign: "center", flex: 1, border: "1px solid #a7f3d0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 12, color: "#047857", marginBottom: 4, fontWeight: 600 }}>Mínimo {targetX}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#111", fontFamily: "monospace" }}>P(X ≥ {targetX})</div>
          <div style={{ fontSize: 16, color: "#059669", fontFamily: "monospace", marginTop: 4 }}>{pGreaterEqual.toFixed(4)}</div>
        </div>
      </div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. SECCIONES POR DISTRIBUCIÓN 
// ══════════════════════════════════════════════════════════════════════════════

// ✨ NUEVA SECCIÓN: POISSON
function PoissonSection({ params, setParams }) {
  const lambda = parseFloat(params.lambda) || 0;
  const targetX = parseInt(params.targetX) || 0;
  const validLambda = Math.max(0, lambda); // Promedio no puede ser negativo

  const table = useMemo(() => {
    const rows = [];
    let cum = 0;
    let x = 0;
    // P(0)
    let prob = Math.exp(-validLambda); 
    const limitX = Math.max(20, Math.ceil(validLambda + 4 * Math.sqrt(validLambda))); 
    
    while (cum < 0.9999 && x <= limitX && rows.length < 400) { 
      cum += prob;
      rows.push({ x, prob, cum });
      x++;
      // La probabilidad de Poisson iterativa para evitar factoriales enormes: P(x) = P(x-1) * (lambda / x)
      prob = prob * (validLambda / x); 
    }
    return rows;
  }, [validLambda]);

  return (
    <>
      <InfoCard 
        title="Distribución de Poisson" 
        desc="Modela la probabilidad de que un número específico de eventos ocurra en un intervalo de tiempo o espacio, conociendo la tasa promedio de ocurrencia (λ)."
        formula={
          <MathText>P(<V>X</V>=<V>x</V>) = <MathFrac num={<><V>e</V><sup>−<V>λ</V></sup> <V>λ</V><sup><V>x</V></sup></>} den={<><V>x</V>!</>} /></MathText>
        }
        meanF={<MathText><V>λ</V></MathText>}
        varF={<MathText><V>λ</V></MathText>}
      />
      <Card>
        <StepHeader number="2" title="Parámetros de Poisson" subtitle="Define el promedio y el valor a buscar." />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <InputBox label="Promedio de eventos (λ)" value={params.lambda} step="0.1" onChange={e => setParams({ ...params, lambda: e.target.value })} />
          <InputBox label="Éxitos a calcular (x)" value={params.targetX} highlight onChange={e => setParams({ ...params, targetX: e.target.value })} />
        </div>
      </Card>
      <StatsCard mean={validLambda} variance={validLambda} />
      <TargetCard table={table} targetX={targetX} />
      <DistributionChart data={table} targetX={targetX} />
      <DistributionTable rows={table} targetX={targetX} />
    </>
  );
}

function BinomialSection({ params, setParams }) {
  const n = parseInt(params.n) || 0;
  const p = parseFloat(params.p) || 0;
  const targetX = parseInt(params.targetX) || 0;
  const validP = Math.min(1, Math.max(0, p));

  const table = useMemo(() => {
    const rows = [];
    let cum = 0;
    for (let x = 0; x <= n; x++) {
      const prob = comb(n, x) * Math.pow(validP, x) * Math.pow(1 - validP, n - x);
      cum += prob;
      rows.push({ x, prob, cum });
    }
    return rows;
  }, [n, validP]);

  return (
    <>
      <InfoCard 
        title="Distribución Binomial" 
        desc="Modela el número de éxitos obtenidos en 'n' ensayos independientes, donde cada ensayo tiene solo dos resultados posibles (éxito o fracaso)."
        formula={
          <MathText>P(<V>X</V>=<V>x</V>) = <MathBinom n={<V>n</V>} k={<V>x</V>}/> <V>p</V><sup><V>x</V></sup> (1 − <V>p</V>)<sup><V>n−x</V></sup></MathText>
        }
        meanF={<MathText><V>n</V> · <V>p</V></MathText>}
        varF={<MathText><V>n</V> · <V>p</V> (1 − <V>p</V>)</MathText>}
      />
      <Card>
        <StepHeader number="2" title="Parámetros Binomiales" subtitle="Define los ensayos y la probabilidad." />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <InputBox label="Ensayos Totales (n)" value={params.n} onChange={e => setParams({ ...params, n: e.target.value })} />
          <InputBox label="Probabilidad de éxito (p)" value={params.p} step="0.01" onChange={e => setParams({ ...params, p: e.target.value })} />
          <InputBox label="Éxitos a calcular (x)" value={params.targetX} highlight onChange={e => setParams({ ...params, targetX: e.target.value })} />
        </div>
      </Card>
      <StatsCard mean={n * validP} variance={n * validP * (1 - validP)} />
      <TargetCard table={table} targetX={targetX} />
      <DistributionChart data={table} targetX={targetX} />
      <DistributionTable rows={table} targetX={targetX} />
    </>
  );
}

function GeometricSection({ params, setParams }) {
  const p = parseFloat(params.p) || 0;
  const targetX = parseInt(params.targetX) || 0;
  const validP = Math.min(1, Math.max(0.0001, p)); 

  const table = useMemo(() => {
    const rows = [];
    let cum = 0, x = 1; 
    const limitX = Math.max(20, Math.ceil(5 / validP)); 
    
    while (cum < 0.9999 && x <= limitX && rows.length < 400) { 
      const prob = Math.pow(1 - validP, x - 1) * validP;
      cum += prob;
      rows.push({ x, prob, cum });
      x++;
    }
    return rows;
  }, [validP]);

  return (
    <>
      <InfoCard 
        title="Distribución Geométrica" 
        desc="Calcula la probabilidad de que el PRIMER éxito ocurra exactamente en el ensayo número 'x'. (Los ensayos anteriores deben ser fracasos)."
        formula={
          <MathText>P(<V>X</V>=<V>x</V>) = (1 − <V>p</V>)<sup><V>x</V>−1</sup> <V>p</V></MathText>
        }
        meanF={<MathText><MathFrac num="1" den={<V>p</V>} /></MathText>}
        varF={<MathText><MathFrac num={<>1 − <V>p</V></>} den={<><V>p</V>²</>} /></MathText>}
      />
      <Card>
        <StepHeader number="2" title="Parámetros Geométricos" subtitle="Solo requieres la probabilidad de éxito (p)." />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <InputBox label="Probabilidad de éxito (p)" value={params.p} step="0.01" onChange={e => setParams({ ...params, p: e.target.value })} />
          <InputBox label="Ensayo del 1° éxito (x)" value={params.targetX} highlight onChange={e => setParams({ ...params, targetX: e.target.value })} />
        </div>
      </Card>
      <StatsCard mean={1 / validP} variance={(1 - validP) / (validP * validP)} />
      <TargetCard table={table} targetX={targetX} />
      <DistributionChart data={table} targetX={targetX} />
      <DistributionTable rows={table} targetX={targetX} />
    </>
  );
}

function NegativeBinomialSection({ params, setParams }) {
  const k = parseInt(params.k) || 0;
  const p = parseFloat(params.p) || 0;
  const targetX = parseInt(params.targetX) || 0;
  const validP = Math.min(1, Math.max(0.0001, p));

  const table = useMemo(() => {
    const rows = [];
    let cum = 0, x = k;
    const limitX = Math.max(k + 60, Math.ceil((k / validP) * 2.5)); 
    
    while (cum < 0.9999 && x <= limitX && rows.length < 400) { 
      const prob = comb(x - 1, k - 1) * Math.pow(validP, k) * Math.pow(1 - validP, x - k);
      cum += prob;
      rows.push({ x, prob, cum });
      x++;
    }
    return rows;
  }, [k, validP]);

  return (
    <>
      <InfoCard 
        title="Distribución Binomial Negativa" 
        desc="Generaliza la Geométrica. Calcula la probabilidad de tener que realizar exactamente 'x' ensayos en total para lograr obtener 'k' éxitos."
        formula={
          <MathText>P(<V>X</V>=<V>x</V>) = <MathBinom n={<><V>x</V>−1</>} k={<><V>k</V>−1</>}/> <V>p</V><sup><V>k</V></sup> (1 − <V>p</V>)<sup><V>x−k</V></sup></MathText>
        }
        meanF={<MathText><MathFrac num={<V>k</V>} den={<V>p</V>} /></MathText>}
        varF={<MathText><MathFrac num={<><V>k</V>(1 − <V>p</V>)</>} den={<><V>p</V>²</>} /></MathText>}
      />
      <Card>
        <StepHeader number="2" title="Parámetros Binomial Negativa" subtitle="Buscando k éxitos. (X = Total de ensayos realizados)" />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <InputBox label="Éxitos objetivo (k)" value={params.k} onChange={e => setParams({ ...params, k: e.target.value })} />
          <InputBox label="Probabilidad de éxito (p)" value={params.p} step="0.01" onChange={e => setParams({ ...params, p: e.target.value })} />
          <InputBox label="Ensayos a calcular (x)" value={params.targetX} highlight onChange={e => setParams({ ...params, targetX: e.target.value })} />
        </div>
      </Card>
      <StatsCard mean={k / validP} variance={k * (1 - validP) / (validP * validP)} />
      <TargetCard table={table} targetX={targetX} />
      <DistributionChart data={table} targetX={targetX} />
      <DistributionTable rows={table} targetX={targetX} />
    </>
  );
}

function HypergeometricSection({ params, setParams }) {
  const N = parseInt(params.N) || 0;
  const K = parseInt(params.K) || 0;
  const n = parseInt(params.n) || 0;
  const targetX = parseInt(params.targetX) || 0;
  const isInvalid = K > N || n > N;

  const table = useMemo(() => {
    if (isInvalid) return [];
    const rows = [];
    let cum = 0;
    for (let x = Math.max(0, n - (N - K)); x <= Math.min(n, K); x++) {
      const prob = (comb(K, x) * comb(N - K, n - x)) / comb(N, n);
      cum += prob;
      rows.push({ x, prob, cum });
    }
    return rows;
  }, [N, K, n, isInvalid]);

  return (
    <>
      <InfoCard 
        title="Distribución Hipergeométrica" 
        desc="Se usa en muestreos SIN reemplazo. Modela la probabilidad de obtener 'x' éxitos en una muestra de tamaño 'n', extraída de una población de tamaño 'N' que contiene 'K' éxitos totales."
        formula={
          <MathText>P(<V>X</V>=<V>x</V>) = <MathFrac num={<><MathBinom n={<V>K</V>} k={<V>x</V>}/><MathBinom n={<><V>N−K</V></>} k={<><V>n−x</V></>}/></>} den={<MathBinom n={<V>N</V>} k={<V>n</V>}/>} /></MathText>
        }
        meanF={<MathText><V>n</V> <MathFrac num={<V>K</V>} den={<V>N</V>} /></MathText>}
        varF={<MathText><V>n</V> <MathFrac num={<V>K</V>} den={<V>N</V>} /> <MathFrac num={<><V>N−K</V></>} den={<V>N</V>} /> <MathFrac num={<><V>N−n</V></>} den={<><V>N</V>−1</>} /></MathText>}
      />
      <Card>
        <StepHeader number="2" title="Parámetros Hipergeométricos" subtitle="Definiendo la Población y la Muestra." />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <InputBox label="Población Total (N)" value={params.N} onChange={e => setParams({ ...params, N: e.target.value })} />
          <InputBox label="Éxitos en Población (K)" value={params.K} onChange={e => setParams({ ...params, K: e.target.value })} />
          <InputBox label="Tamaño Muestra (n)" value={params.n} onChange={e => setParams({ ...params, n: e.target.value })} />
          <InputBox label="Éxitos a calcular (x)" value={params.targetX} highlight onChange={e => setParams({ ...params, targetX: e.target.value })} />
        </div>
        {isInvalid && (
          <div style={{ marginTop: 12, padding: 8, background: "#fef2f2", color: "#ef4444", borderRadius: 6, fontSize: 13, fontWeight: 600 }}>
            ⚠️ Error de lógica: La muestra (n) y los éxitos (K) no pueden ser mayores que la Población Total (N).
          </div>
        )}
      </Card>
      
      {!isInvalid && (
        <>
          <StatsCard mean={n * (K / N)} variance={n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1))} />
          <TargetCard table={table} targetX={targetX} />
          <DistributionChart data={table} targetX={targetX} />
          <DistributionTable rows={table} targetX={targetX} />
        </>
      )}
    </>
  );
}

function MultinomialSection({ params, setParams }) {
  const n = parseInt(params.n) || 0;
  const categories = params.categories;
  
  const sumP = categories.reduce((a, c) => a + (parseFloat(c.p) || 0), 0);
  const sumX = categories.reduce((a, c) => a + (parseInt(c.x) || 0), 0);
  const pValid = Math.abs(sumP - 1) < 0.001;
  const xValid = sumX === n;

  let prob = 0;
  if (pValid && xValid) {
    let denom = 1, prodP = 1;
    categories.forEach(c => { 
      denom *= fact(parseInt(c.x) || 0); 
      prodP *= Math.pow(parseFloat(c.p) || 0, parseInt(c.x) || 0); 
    });
    prob = (fact(n) / denom) * prodP;
  }

  return (
    <>
      <InfoCard 
        title="Distribución Multinomial" 
        desc="Generaliza la distribución binomial para casos en los que un ensayo puede tener más de dos resultados categóricos (por ejemplo, colores o calificaciones)."
        formula={
          <MathText>P(<V>x₁</V>, <V>x₂</V> ...) = <MathFrac num={<><V>n</V>!</>} den={<><V>x₁</V>! · <V>x₂</V>! ...</>} /> <V>p₁</V><sup><V>x₁</V></sup> <V>p₂</V><sup><V>x₂</V></sup> ...</MathText>
        }
        meanF={<MathText>E(<V>Xᵢ</V>) = <V>n</V> · <V>pᵢ</V></MathText>}
        varF={<MathText>Var(<V>Xᵢ</V>) = <V>n</V> · <V>pᵢ</V> (1 − <V>pᵢ</V>)</MathText>}
      />
      <Card>
        <StepHeader number="2" title="Parámetros Multinomiales" subtitle="Agrega categorías y reparte los éxitos." />
        <div style={{ marginBottom: 16 }}>
          <InputBox label="Ensayos Totales (n)" value={params.n} onChange={e => setParams({ ...params, n: e.target.value })} />
        </div>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, background: "#f9fafb" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, marginBottom: 8, fontWeight: 600, fontSize: 12, color: "#6b7280" }}>
            <span>Probabilidad (pᵢ)</span>
            <span>Ocurrencias (xᵢ) a calcular</span>
            <span></span>
          </div>
          {categories.map((c) => (
            <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, marginBottom: 8 }}>
              <input type="number" step="0.01" value={c.p} onChange={e => setParams({ ...params, categories: categories.map(cat => cat.id === c.id ? { ...cat, p: e.target.value } : cat) })} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #d1d5db", color: "#111", background: "#fff" }} />
              <input type="number" value={c.x} onChange={e => setParams({ ...params, categories: categories.map(cat => cat.id === c.id ? { ...cat, x: e.target.value } : cat) })} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #34d399", background: "#ecfdf5", color: "#111", outline: "none" }} />
              <button onClick={() => setParams({ ...params, categories: categories.filter(cat => cat.id !== c.id) })} disabled={categories.length <= 2} style={{ padding: "6px 8px", background: "#fef2f2", border: "1px solid #fca5a5", color: "#ef4444", borderRadius: 6, cursor: "pointer" }}>✕</button>
            </div>
          ))}
          <button onClick={() => setParams({ ...params, categories: [...categories, { id: Date.now(), p: "0.1", x: "1" }] })} style={{ fontSize: 13, marginTop: 8, color: "#4F6EF7", background: "none", border: "none", fontWeight: 600, cursor: "pointer" }}>+ Añadir Categoría</button>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 13, fontWeight: 500 }}>
          <span style={{ color: pValid ? "#16a34a" : "#dc2626" }}>Σ p = {sumP.toFixed(3)} {pValid ? "✓" : "(Debe ser 1)"}</span>
          <span style={{ color: xValid ? "#16a34a" : "#dc2626" }}>Σ x = {sumX} {xValid ? "✓" : `(Debe ser n=${n})`}</span>
        </div>
      </Card>
      
      <Card style={{ textAlign: "center", background: pValid && xValid ? "#ecfdf5" : "#fff", borderColor: pValid && xValid ? "#6ee7b7" : "#e5e7eb" }}>
        <StepHeader number="🎯" title="Probabilidad Conjunta" subtitle="P(X₁=x₁, X₂=x₂, ...)" />
        {pValid && xValid ? (
          <div style={{ fontSize: 28, fontWeight: 700, color: "#111", fontFamily: "monospace" }}>
            {prob.toExponential(4)} <br/>
            <span style={{ fontSize: 18, color: "#059669" }}>({(prob * 100).toFixed(4)}%)</span>
          </div>
        ) : (
          <div style={{ color: "#dc2626", fontSize: 14 }}>Ajusta las probabilidades y ocurrencias para calcular.</div>
        )}
      </Card>

      <MultinomialMarginalChart n={n} categories={categories} valid={pValid && xValid} />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 7. COMPONENTES COMPARTIDOS (Estadísticas y Tablas)
// ══════════════════════════════════════════════════════════════════════════════

function StatsCard({ mean, variance }) {
  if (isNaN(mean)) return null;
  return (
    <Card style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-around", background: "#111", color: "#fff" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Valor Esperado E(X)</div>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>{mean.toFixed(4)}</div>
      </div>
      <div style={{ width: 1, background: "#374151" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Varianza Var(X)</div>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>{variance.toFixed(4)}</div>
      </div>
      <div style={{ width: 1, background: "#374151" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Desv. Estándar (σ)</div>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>{Math.sqrt(Math.max(0, variance)).toFixed(4)}</div>
      </div>
    </Card>
  );
}

function DistributionTable({ rows, targetX }) {
  if (!rows || !rows.length) return null;
  return (
    <Card>
      <StepHeader number="📑" title="Tabla de Distribución" subtitle="Datos exactos calculados." />
      <div style={{ maxHeight: 300, overflowY: "auto", border: "1px solid #e5e7eb", borderRadius: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead style={{ position: "sticky", top: 0, background: "#f9fafb", boxShadow: "0 1px 0 #e5e7eb", zIndex: 1 }}>
            <tr>
              <th style={{ padding: "10px", textAlign: "center", color: "#374151", fontWeight: 600 }}>x</th>
              <th style={{ padding: "10px", textAlign: "center", color: "#374151", fontWeight: 600 }}>P(X = x)</th>
              <th style={{ padding: "10px", textAlign: "center", color: "#374151", fontWeight: 600 }}>P(X ≤ x) Acumulada</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const isTarget = r.x === targetX;
              return (
                <tr key={r.x} style={{ background: isTarget ? "#ecfdf5" : "transparent", borderBottom: "1px solid #f3f4f6", transition: "background 0.2s" }} onMouseOver={(e) => !isTarget && (e.currentTarget.style.background = "#f5f7ff")} onMouseOut={(e) => !isTarget && (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "8px 10px", textAlign: "center", fontWeight: isTarget ? 800 : 700, fontFamily: "monospace", color: isTarget ? "#047857" : "#111" }}>{r.x}</td>
                  <td style={{ padding: "8px 10px", textAlign: "center", fontFamily: "monospace", color: isTarget ? "#059669" : "#4F6EF7", fontWeight: isTarget ? 700 : 400 }}>{r.prob.toFixed(5)}</td>
                  <td style={{ padding: "8px 10px", textAlign: "center", fontFamily: "monospace", color: isTarget ? "#059669" : "#111", fontWeight: isTarget ? 700 : 400 }}>{r.cum.toFixed(5)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 8. APP PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════

export default function DistributionsApp() {
  const [distType, setDistType] = useState("poisson"); // ✨ Inicia en Poisson

  const [poissParams, setPoissParams] = useState({ lambda: "3", targetX: "5" }); // ✨ Estado Poisson
  const [bParams, setBParams] = useState({ n: "10", p: "0.5", targetX: "5" });
  const [gParams, setGParams] = useState({ p: "0.5", targetX: "3" }); 
  const [nbParams, setNbParams] = useState({ k: "3", p: "0.5", targetX: "6" });
  const [hParams, setHParams] = useState({ N: "50", K: "10", n: "5", targetX: "2" });
  const [mParams, setMParams] = useState({
    n: "25", categories: [{ id: 1, p: "0.40", x: "10" }, { id: 2, p: "0.35", x: "10" }, { id: 3, p: "0.25", x: "5" }]
  });

  const distOptions = [
    { id: "poisson", label: "Poisson" }, // ✨ Agregada al menú
    { id: "binomial", label: "Binomial" },
    { id: "geometric", label: "Geométrica" }, 
    { id: "negative", label: "Binomial Negativa" },
    { id: "hyper", label: "Hipergeométrica" },
    { id: "multinomial", label: "Multinomial" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", margin: 0, letterSpacing: "-0.5px" }}>
            Calculadora de Distribuciones Clásicas
          </h1>
          <p style={{ fontSize: 15, color: "#6b7280", marginTop: 6 }}>
            Ingresa los parámetros para calcular y graficar el modelo probabilístico.
          </p>
        </div>

        <Card>
          <StepHeader number="1" title="Elige el modelo probabilístico" subtitle="¿Qué tipo de distribución deseas utilizar?" />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {distOptions.map(opt => (
              <BtnSecondary key={opt.id} active={distType === opt.id} onClick={() => setDistType(opt.id)}>
                {opt.label}
              </BtnSecondary>
            ))}
          </div>
        </Card>

        {distType === "poisson" && <PoissonSection params={poissParams} setParams={setPoissParams} />}
        {distType === "binomial" && <BinomialSection params={bParams} setParams={setBParams} />}
        {distType === "geometric" && <GeometricSection params={gParams} setParams={setGParams} />}
        {distType === "negative" && <NegativeBinomialSection params={nbParams} setParams={setNbParams} />}
        {distType === "hyper" && <HypergeometricSection params={hParams} setParams={setHParams} />}
        {distType === "multinomial" && <MultinomialSection params={mParams} setParams={setMParams} />}
        
      </div>
    </div>
  );
}