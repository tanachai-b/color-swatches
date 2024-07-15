export function getXY(radius: number, angle: number) {
  return { x: radius * Math.sin(angle), y: -radius * Math.cos(angle) };
}

export function add(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function round({ x, y }: { x: number; y: number }) {
  return { x: Math.round(x), y: Math.round(y) };
}
