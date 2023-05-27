import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { capitalizeFirstLetter } from "@/utils";

import "./breadcrumbs.style.scss";

interface BreadcrumbsProps {
  getDefaultTextGenerator?: (path: string) => string;
  className?: string;
  currentPageTitle?: string;
}

const pathMap = {
  aktualnosci: "Aktualności",
};

const _defaultGetDefaultTextGenerator = (path: string) => {
  return pathMap[path as keyof typeof pathMap] ?? capitalizeFirstLetter(path);
};

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery.split("/").filter((v) => v.length > 0);
};

export const Breadcrumbs = ({
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
  className,
  currentPageTitle,
}: BreadcrumbsProps) => {
  const pathName = usePathname();

  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(pathName);

      const crumbList = asPathNestedRoutes.map((subPath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");

        return {
          href,
          text: getDefaultTextGenerator(subPath),
        };
      });

      return [{ href: "/", text: "Home" }, ...crumbList];
    },
    [pathName, getDefaultTextGenerator]
  );

  return (
    <div className={clsx("breadcrumbs", className)}>
      <div className="breadcrumbs__content">
        {breadcrumbs.map((crumb, idx) => (
          <Crumb
            {...crumb}
            key={idx}
            first={idx === 0}
            last={idx === breadcrumbs.length - 1}
            currentPageTitle={currentPageTitle}
          />
        ))}
      </div>
    </div>
  );
};

const Crumb = ({
  text,
  href,
  first = false,
  last = false,
  currentPageTitle = undefined,
}: {
  text: string;
  href: string;
  first: boolean;
  last: boolean;
  currentPageTitle?: string;
}) => {
  if (first) {
    return (
      <Link className="breadcrumbs__crumb" href={href}>
        {text}
      </Link>
    );
  }

  if (last) {
    return (
      <>
        <span className="breadcrumbs__divider">{">"}</span>
        <p className="breadcrumbs__crumb breadcrumbs__crumb--last">{currentPageTitle ?? text}</p>
      </>
    );
  }

  return (
    <>
      <span className="breadcrumbs__divider">{">"}</span>
      <Link className="breadcrumbs__crumb breadcrumbs__crumb--middle" href={href}>
        {text}
      </Link>
    </>
  );
};
