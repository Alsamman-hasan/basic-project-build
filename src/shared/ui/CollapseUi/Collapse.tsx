import {
  TransitionEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const transition = 'height 200ms ease-out';

export type CollapseProps = {
  children: React.ReactNode;

  /**
   * Controls whether or not children are visible.
   */
  open?: boolean;

  /**
   * Determines if children should render `null` or not while closed.
   */
  lazy?: boolean;

  /**
   * Instantly expand and collapse children.
   */
  instant?: boolean;

  /**
   * Called when opening or closing.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  onComplete?: Function;
};

export function Collapse({
  children,
  instant,
  lazy,
  onComplete,
  open,
  ...restProps
}: CollapseProps) {
  const [renderChildren, setRenderChildren] = useState(lazy ? open : true);
  const ref = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const instantRender = instant || firstRender.current;

  function openCollapse() {
    const node = ref.current;
    requestAnimationFrame(() => {
      if (node) node.style.height = `${node.scrollHeight}px`;
    });
  }

  function closeCollapse() {
    const node = ref.current;
    requestAnimationFrame(() => {
      if (node) {
        node.style.height = `${node.offsetHeight}px`;
        node.style.overflow = 'hidden';
        requestAnimationFrame(() => {
          node.style.height = '0px';
        });
      }
    });
  }

  const handleComplete = useCallback(() => {
    const node = ref.current;
    if (node) node.style.overflow = open ? 'initial' : 'hidden';
    if (open)
      requestAnimationFrame(() => {
        if (node) {
          node.style.margin = '0';
          node.style.height = 'auto';
        }
      });

    if (!open && lazy) {
      if (node) node.style.margin = '0';
      setRenderChildren(false);
    }
    if (firstRender.current) firstRender.current = false;
    else if (onComplete) onComplete();
  }, [lazy, onComplete, open]);

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    const node = ref.current;
    if (event.target === node && event.propertyName === 'height')
      handleComplete();
  }

  useLayoutEffect(() => {
    if (lazy)
      if (open)
        if (renderChildren) openCollapse();
        else setRenderChildren(true);
      else closeCollapse();
    else if (open) openCollapse();
    else closeCollapse();
  }, [open, lazy, renderChildren]);

  useLayoutEffect(() => {
    if (instantRender) handleComplete();
  }, [open, instantRender, handleComplete]);

  return (
    <div
      ref={ref}
      style={{ transition: instantRender ? undefined : transition }}
      onTransitionEnd={handleTransitionEnd}
      {...restProps}
    >
      {renderChildren ? children : null}
    </div>
  );
}

export default Collapse;
