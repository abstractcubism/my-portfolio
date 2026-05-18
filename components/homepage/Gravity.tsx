'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import debounce from 'lodash/debounce';
import Matter, {
  Bodies,
  Engine,
  Mouse,
  MouseConstraint,
  Query,
  Runner,
  World,
} from 'matter-js';

type MatterBodyProps = {
  children: React.ReactNode;
  matterBodyOptions?: Matter.IBodyDefinition;
  isDraggable?: boolean;
  x?: number | string;
  y?: number | string;
  angle?: number;
};

type PhysicsBody = {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

function calcPos(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === 'string' && value.endsWith('%')) {
    return containerSize * (parseFloat(value) / 100);
  }
  return typeof value === 'number'
    ? value
    : // default: center the element in the container
      containerSize / 2 - elementSize / 2;
}

const GravityCtx = createContext<{
  register: (id: string, el: HTMLElement, props: MatterBodyProps) => void;
  unregister: (id: string) => void;
} | null>(null);

export function MatterBody({
  children,
  matterBodyOptions = { friction: 0.1, restitution: 0.1, density: 0.001 },
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
}: MatterBodyProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).slice(7));
  const ctx = useContext(GravityCtx);

  useEffect(() => {
    if (!elRef.current || !ctx) return;
    ctx.register(idRef.current, elRef.current, {
      children,
      matterBodyOptions,
      isDraggable,
      x,
      y,
      angle,
    });
    const id = idRef.current;
    return () => ctx.unregister(id);
  }, [angle, children, ctx, isDraggable, matterBodyOptions, x, y]);

  return (
    <div
      ref={elRef}
      style={{
        position: 'absolute',
        pointerEvents: isDraggable ? 'none' : 'auto',
      }}
    >
      {children}
    </div>
  );
}

export const Gravity = forwardRef<
  GravityRef,
  {
    children: React.ReactNode;
    gravity?: { x: number; y: number };
    grabCursor?: boolean;
    resetOnResize?: boolean;
    autoStart?: boolean;
    floorOffset?: number;
    hitAreaOverflowBottom?: number;
    style?: React.CSSProperties;
  }
>(
  (
    {
      children,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      autoStart = true,
      floorOffset = 0,
      hitAreaOverflowBottom = 0,
      style,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const engine = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Runner | undefined>(undefined);
    const bodies = useRef(new Map<string, PhysicsBody>());
    const frameId = useRef<number | undefined>(undefined);
    const mc = useRef<Matter.MouseConstraint | undefined>(undefined);
    const mouseDown = useRef(false);
    const isRunning = useRef(false);

    const syncElements = useCallback(() => {
      bodies.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const rot = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rot}deg)`;
      });
      frameId.current = requestAnimationFrame(syncElements);
    }, []);

    const startEngine = useCallback(() => {
      if (runnerRef.current && engine.current) Runner.run(runnerRef.current, engine.current);
      frameId.current = requestAnimationFrame(syncElements);
      isRunning.current = true;
    }, [syncElements]);

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return;
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      isRunning.current = false;
    }, []);

    const register = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const physicsHeight = rect.height - hitAreaOverflowBottom;
        const w = element.offsetWidth;
        const h = element.offsetHeight;
        const bx = calcPos(props.x, rect.width, w);
        const by = calcPos(props.y, physicsHeight, h);
        const ang = (props.angle ?? 0) * (Math.PI / 180);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { chamfer: _chamfer, ...restOpts } = props.matterBodyOptions ?? {};
        const body = Bodies.rectangle(bx, by, w, h, {
          ...restOpts,
          angle: ang,
        });
        if (engine.current) World.add(engine.current.world, [body]);
        bodies.current.set(id, { element, body, props });
      },
      [hitAreaOverflowBottom]
    );

    const unregister = useCallback((id: string) => {
      const entry = bodies.current.get(id);
      if (entry) {
        if (engine.current) World.remove(engine.current.world, entry.body);
        bodies.current.delete(id);
      }
    }, []);

    const init = useCallback(() => {
      if (!canvasRef.current) return;
      if (!engine.current) engine.current = Engine.create();
      const el = canvasRef.current;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const physicsHeight = h - hitAreaOverflowBottom;

      engine.current.gravity.x = gravity.x;
      engine.current.gravity.y = gravity.y;

      // Bind mouse to the parent so dragging works even when the canvas itself
      // has pointer-events: none (needed to let the timeline remain interactive).
      const mouseEl = (el.parentElement ?? el) as HTMLElement;
      const mouse = Mouse.create(mouseEl);
      const mAny = mouse as unknown as { mousewheel: EventListener };
      mouseEl.removeEventListener('mousewheel', mAny.mousewheel);
      mouseEl.removeEventListener('DOMMouseScroll', mAny.mousewheel);
      mouseEl.removeEventListener('wheel', mAny.mousewheel);

      mc.current = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });

      World.add(engine.current!.world, [
        mc.current,
        Bodies.rectangle(w / 2, physicsHeight + floorOffset + 10, w, 20, {
          isStatic: true,
          friction: 1,
        }),
        Bodies.rectangle(w + 10, h / 2, 20, h, {
          isStatic: true,
          friction: 1,
        }),
        Bodies.rectangle(-10, h / 2, 20, h, {
          isStatic: true,
          friction: 1,
        }),
      ]);

      // Bodies registered by children before the engine was ready (child effects
      // run before parent effects in React) need to be added to the world now.
      bodies.current.forEach(({ body }) => {
        World.add(engine.current!.world, [body]);
      });

      runnerRef.current = Runner.create();
      syncElements();

      if (grabCursor) {
        mouseEl.addEventListener(
          'mousemove',
          () => {
            const touching =
              Query.point(
                engine.current?.world.bodies ?? [],
                mc.current?.mouse.position ?? { x: 0, y: 0 }
              ).length > 0;

            mouseEl.style.cursor = mouseDown.current
              ? 'grabbing'
              : touching
                ? 'grab'
                : 'default';
          },
          { passive: true }
        );

        mouseEl.addEventListener('mousedown', () => {
          mouseDown.current = true;
          mouseEl.style.cursor = 'grabbing';
        });

        mouseEl.addEventListener('mouseup', () => {
          mouseDown.current = false;
        });
      }

      if (autoStart) startEngine();
    }, [
      autoStart,
      floorOffset,
      grabCursor,
      gravity.x,
      gravity.y,
      hitAreaOverflowBottom,
      startEngine,
      syncElements,
    ]);

    const clear = useCallback(() => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      if (engine.current) {
        if (mc.current) World.remove(engine.current.world, mc.current);
        if (runnerRef.current) Runner.stop(runnerRef.current);
        World.clear(engine.current.world, false);
        Engine.clear(engine.current);
      }
      bodies.current.clear();
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        start: startEngine,
        stop: stopEngine,
        reset: () => {
          stopEngine();
          clear();
          init();
        },
      }),
      [clear, init, startEngine, stopEngine]
    );

    useEffect(() => {
      if (!resetOnResize) return;
      const onResize = debounce(() => {
        clear();
        init();
      }, 500);

      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
        onResize.cancel();
      };
    }, [clear, init, resetOnResize]);

    useEffect(() => {
      init();
      return clear;
    }, [clear, init]);

    return (
      <GravityCtx.Provider value={{ register, unregister }}>
        <div
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: hitAreaOverflowBottom
              ? `calc(100% + ${hitAreaOverflowBottom}px)`
              : '100%',
            ...style,
          }}
        >
          {children}
        </div>
      </GravityCtx.Provider>
    );
  }
);

Gravity.displayName = 'Gravity';
