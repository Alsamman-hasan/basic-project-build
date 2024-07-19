export type Mods = Record<string, boolean | string | undefined>;
export function classNames(
  clc: string,
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string {
  return [
    clc,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([, value]) => Boolean(value))
      .map(([calssName]) => calssName),
  ].join(' ');
}
