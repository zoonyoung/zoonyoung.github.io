"use client";

import React, { useEffect } from "react";
import Sticky from "sticky-js";

import { cn } from "@/utils/className";

import styles from "./Toc.module.scss";

import type { TocItem, HeadingDepth, HeadingParent } from "remark-flexible-toc";

type Props = {
  toc: TocItem[];
  maxDepth?: HeadingDepth;
  indented?: boolean;
  ordered?: boolean;
  tight?: boolean;
  exclude?: string | string[];
  skipLevels?: HeadingDepth[];
  skipParents?: Exclude<HeadingParent, "root">[];
};

const Toc = ({
  toc,
  maxDepth = 6,
  ordered = false,
  indented = false,
  tight = false,
  exclude,
  skipLevels = [1],
  skipParents = [],
}: Props) => {
  useEffect(() => {
    if (typeof document === "undefined") return;
    new Sticky(".toc");
  }, []);

  if (!toc) return null;

  const exludeRegexFilter = exclude
    ? Array.isArray(exclude)
      ? new RegExp(exclude.join("|"), "i")
      : new RegExp(exclude, "i")
    : new RegExp("(?!.*)");

  const skipLevelsFilter = (depth: TocItem["depth"]): boolean => skipLevels.includes(depth);

  const skipParentsFilter = (parent: TocItem["parent"]): boolean => parent !== "root" && skipParents.includes(parent);

  const maxDepthFilter = (depth: TocItem["depth"]): boolean => depth > maxDepth;

  const filteredToc = toc.filter(
    heading =>
      !maxDepthFilter(heading.depth) &&
      !skipLevelsFilter(heading.depth) &&
      !skipParentsFilter(heading.parent) &&
      !exludeRegexFilter.test(heading.value)
  );

  return (
    <div data-sticky-container>
      <details className={cn(styles.tocContainer, "toc")} open>
        <summary className={styles.tocTitle}>
          <strong>TABLE OF CONTENTS</strong>
        </summary>
        <ul className={styles.tocList}>
          {filteredToc.map(heading => (
            <li
              key={heading.value}
              className={`
              ${indented ? styles[`ml${heading.depth}`] : ""} 
              ${tight ? styles.tight : ""} 
            `}>
              <a href={heading.href} className={styles.tocLink}>
                <div className={styles[`h${heading.depth}`]}>
                  {ordered ? (
                    <strong>
                      <span className={styles.numbering}>{heading.numbering.slice(1).join(".")}.</span>
                    </strong>
                  ) : null}
                  <span>{heading.value}</span>
                  <span className={styles.hiddenHref}>{heading.href}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default Toc;
