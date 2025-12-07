export const PACKAGE_REPORTS: Record<string, number> = {
  Basic: 5,
  Pro: 15,
  Enterprise: 50,
};

export function calcExtraCost(ha: number) {
  if (ha <= 20) return 0;
  const k = 0.857;
  const alpha = 0.833;
  return k * Math.pow(ha - 20, alpha);
}

export function calcFinalPrice(pkg: string, ha: number) {
  const base = pkg === "Basic" ? 9 : pkg === "Pro" ? 29 : 99;
  return ha <= 20 ? base : Math.round((base + calcExtraCost(ha)) * 100) / 100;
}
