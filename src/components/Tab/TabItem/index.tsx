import { HTMLAttributes } from 'react';

export type TabItemProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  tabTitle?: string;
}

export function TabItem({
  children,
  ...rest
}: TabItemProps) {
  return (
    <div
      className="tab_item"
      {...rest}
    >
      {children}
    </div>
  )
}