import { useEffect, useRef } from "react";
import { useCallbackRef } from "./useCallbackRef";

export interface ScrollRevealOptions {
  threshold?: number | number[];
  rootMargin?: string;
}

/**
 * useScrollReveal: revela elementos ao fazer scroll.
 * Devolve uma callback ref. Ligue-a ao elemento com a classe "reveal" (opacity: 0);
 * quando entra no ecrã é-lhe aplicado data-revealed="true", que ativa a animação em CSS.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observed = useRef<Set<HTMLElement>>(new Set());
  const mutationObservers = useRef<Map<Element, MutationObserver>>(new Map());
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const revealChildren = (el: Element) => {
    Array.from(el.children).forEach((child) => {
      if (child.getAttribute("data-revealed") !== "true") child.setAttribute("data-revealed", "true");
      revealChildren(child);
    });
  };

  const getObserver = () => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-revealed", "true");
            revealChildren(entry.target);

            if (!mutationObservers.current.has(entry.target)) {
              const mo = new MutationObserver((mutations) => {
                mutations.forEach((m) => {
                  m.addedNodes.forEach((node) => {
                    if (node instanceof Element) {
                      node.setAttribute("data-revealed", "true");
                      revealChildren(node);
                    }
                  });
                });
              });
              mo.observe(entry.target, { childList: true, subtree: true });
              mutationObservers.current.set(entry.target, mo);
            }

            observerRef.current?.unobserve(entry.target);
            if (entry.target instanceof HTMLElement) observed.current.delete(entry.target);
          });
        },
        {
          threshold: optionsRef.current.threshold ?? 0.15,
          rootMargin: optionsRef.current.rootMargin ?? "0px 0px -40px 0px",
        },
      );
    }
    return observerRef.current;
  };

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observed.current.clear();
      mutationObservers.current.forEach((mo) => mo.disconnect());
      mutationObservers.current.clear();
    };
  }, []);

  return useCallbackRef((element: HTMLElement | null) => {
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      element.setAttribute("data-revealed", "true");
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      element.setAttribute("data-revealed", "true");
      return;
    }
    if (!observed.current.has(element) && element.getAttribute("data-revealed") !== "true") {
      getObserver().observe(element);
      observed.current.add(element);
    }
  });
}
