// components/AboutPageUI.tsx
"use client";

import { StructuredText, renderNodeRule } from "react-datocms";
import dynamic from "next/dynamic";
import HeadingWithAnchorLink from "@/components/HeadingWithAnchorLink";
import { isCode, isHeading } from "datocms-structured-text-utils";

const Code = dynamic(() => import("@/components/Code"));
type SideNavigationItem = {
  id: string;
  label: string;
  anchor: string;
};

type SideLink = {
  id: string;
  title: string;
  url: string;
};

type Props = {
  title: string;
  structuredText: any;
  sideNavItems: SideNavigationItem[];
  sideLinks: SideLink[];
};


    export default function AboutPageUI({ title, structuredText, sideNavItems, sideLinks }: Props) {
      return (
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          {sideNavItems.length > 0 && (
            <aside className="col-span-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg sticky top-6">
              <ul className="space-y-2">
                {sideNavItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.anchor}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
    
          {/* Main Content */}
          <main className="col-span-8 bg-white dark:bg-gray-900 p-6 rounded-lg shadow space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
    
            <StructuredText
              data={structuredText}
              customNodeRules={[
                renderNodeRule(isCode, ({ node, key }) => <Code key={key} node={node} />),
                renderNodeRule(isHeading, ({ node, key, children }) => (
                  <HeadingWithAnchorLink node={node} key={key}>
                    {children}
                  </HeadingWithAnchorLink>
                )),
              ]}
            />
          </main>
    
          {/* Right Sidebar */}
          {sideLinks.length > 0 && (
            <aside className="col-span-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg sticky top-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Links</h2>
              <ul className="space-y-1">
                {sideLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      );
    }
    
  

