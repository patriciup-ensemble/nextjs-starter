import { graphql, type FragmentOf } from '@/lib/datocms/graphql';

export const SideNavigationItemFragment = graphql(`
  fragment SideNavigationItemFragment on SideNavigationItemRecord {
    id
    label
    anchor
  }
`);

export type SideNavigationItem = FragmentOf<typeof SideNavigationItemFragment>;
