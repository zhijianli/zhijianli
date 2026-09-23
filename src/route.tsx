import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

export type Route =
  | { page: "home" }
  | { page: "blog"; slug?: string }
  | { page: "notfound" };

type LocationState = {
  pathname: string;
  hash: string;
};

type RouteContextValue = {
  pathname: string;
  hash: string;
  route: Route;
  navigate: (to: string) => void;
};

const RouteContext = createContext<RouteContextValue | null>(null);

function readLocation(): LocationState {
  return {
    pathname: window.location.pathname,
    hash: window.location.hash,
  };
}

export function parsePath(pathname: string): Route {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return { page: "home" };
  if (path === "/blog") return { page: "blog" };
  const match = path.match(/^\/blog\/([^/]+)$/);
  if (match) return { page: "blog", slug: decodeURIComponent(match[1]) };
  return { page: "notfound" };
}

function useRouteState(): RouteContextValue {
  const [loc, setLoc] = useState(readLocation);

  useEffect(() => {
    const sync = () => setLoc(readLocation());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const next = url.pathname + url.search + url.hash;
    const current =
      window.location.pathname + window.location.search + window.location.hash;
    if (next === current) {
      if (url.hash) document.querySelector(url.hash)?.scrollIntoView();
      else window.scrollTo(0, 0);
      return;
    }
    window.history.pushState(null, "", next);
    setLoc({ pathname: url.pathname, hash: url.hash });
  }, []);

  useEffect(() => {
    if (loc.hash) {
      const id = loc.hash;
      const timer = window.setTimeout(() => {
        document.querySelector(id)?.scrollIntoView();
      }, 0);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [loc.pathname, loc.hash]);

  const route = useMemo(() => parsePath(loc.pathname), [loc.pathname]);

  return {
    pathname: loc.pathname,
    hash: loc.hash,
    route,
    navigate,
  };
}

export function RouteProvider({ children }: { children: ReactNode }) {
  const value = useRouteState();
  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
}

export function useRoute() {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useRoute must be used within RouteProvider");
  return ctx;
}

export function AppLink({
  href,
  className,
  children,
  onClick,
  "aria-current": ariaCurrent,
  "data-umami-event": umamiEvent,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-current"?: "page";
  "data-umami-event"?: string;
}) {
  const { navigate } = useRoute();
  const internal = href.startsWith("/") && !href.startsWith("//");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      !internal ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      onClick?.();
      return;
    }
    event.preventDefault();
    navigate(href);
    onClick?.();
  };

  return (
    <a
      href={href}
      className={className}
      aria-current={ariaCurrent}
      data-umami-event={umamiEvent}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
