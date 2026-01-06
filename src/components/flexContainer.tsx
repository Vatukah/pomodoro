type SpaceUnit = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type Padding =
  | SpaceUnit
  | `${SpaceUnit} ${SpaceUnit}`
  | `${SpaceUnit} ${SpaceUnit} ${SpaceUnit}`
  | `${SpaceUnit} ${SpaceUnit} ${SpaceUnit} ${SpaceUnit}`;

interface FlexContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className' | 'children'> {
  children?: React.ReactNode;

  gap?: SpaceUnit;
  padding?: Padding;

  /** Flex direction control (default: row) */
  direction?: 'row' | 'column';

  /** Allow wrapping */
  wrap?: boolean;

  /** Flexbox alignments */
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];

  /** Extra style overrides */
  style?: React.CSSProperties;
  className?: string;
}

export default function FlexContainer({
  children,
  gap = 'sm',
  padding,
  direction = 'row',
  wrap = false,
  align,
  justify,
  style,
  className,
  ...rest // ← ALL native props & events live here
}: FlexContainerProps) {
  return (
    <div
      className={className}
      {...rest}
      style={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems: align,
        justifyContent: justify,

        ...(padding && {
          padding: padding.replace(
            /\b(xs|sm|md|lg|xl|xxl)\b/g,
            (v) => `var(--space-${v})`
          ),
        }),

        gap: `var(--space-${gap})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
