"use client";

type WaxSealProps = {
  outerClassName: string;
  innerClassName?: string;
  symbol?: string;
  symbolClassName?: string;
};

export function WaxSeal({ outerClassName, innerClassName, symbol, symbolClassName }: WaxSealProps) {
  return (
    <div className={outerClassName}>
      {innerClassName ? <div className={innerClassName} /> : null}
      {symbol ? <span className={symbolClassName}>{symbol}</span> : null}
    </div>
  );
}
