import React, { useCallback } from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { Copy, EllipsisVertical, Trash } from "lucide-react";

/* NODE HEADER -------------------------------------------------------------- */

export interface NodeHeaderProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export const NodeHeader = React.forwardRef<HTMLElement, NodeHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        {...props}
        className={cn(
          "mb-4 flex items-center justify-between gap-2 py-2",
          className,
          // Remove or modify these classes if you modify the padding in the
          // `<BaseNode />` component.
          "-mx-5 -mt-5 pl-5 pr-2",
        )}
      />
    );
  },
);

NodeHeader.displayName = "NodeHeader";

/* NODE HEADER TITLE -------------------------------------------------------- */

export interface NodeHeaderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export const NodeHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  NodeHeaderTitleProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "h3";

  return (
    <Comp
      ref={ref}
      {...props}
      className={cn(className, "user-select-none flex-1 font-semibold")}
    />
  );
});

NodeHeaderTitle.displayName = "NodeHeaderTitle";

/* NODE HEADER ICON --------------------------------------------------------- */

export interface NodeHeaderIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export const NodeHeaderIcon = React.forwardRef<
  HTMLSpanElement,
  NodeHeaderIconProps
>(({ className, ...props }, ref) => {
  return (
    <span ref={ref} {...props} className={cn(className, "[&>*]:size-5")} />
  );
});

NodeHeaderIcon.displayName = "NodeHeaderIcon";

/* NODE HEADER ACTIONS ------------------------------------------------------ */

export interface NodeHeaderActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * A container for right-aligned action buttons in the node header.
 */
export const NodeHeaderActions = React.forwardRef<
  HTMLDivElement,
  NodeHeaderActionsProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "ml-auto flex items-center gap-1 justify-self-end",
        className,
      )}
    />
  );
});

NodeHeaderActions.displayName = "NodeHeaderActions";

/* NODE HEADER ACTION ------------------------------------------------------- */

export interface NodeHeaderActionProps extends ButtonProps {
  label: string;
}

/**
 * A thin wrapper around the `<Button />` component with a fixed sized suitable
 * for icons.
 *
 * Beacuse the `<NodeHeaderAction />` component is intended to render icons, it's
 * important to provide a meaningful and accessible `label` prop that describes
 * the action.
 */
export const NodeHeaderAction = React.forwardRef<
  HTMLButtonElement,
  NodeHeaderActionProps
>(({ className, label, title, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      aria-label={label}
      title={title ?? label}
      className={cn(className, "nodrag size-6 p-1")}
      {...props}
    />
  );
});

NodeHeaderAction.displayName = "NodeHeaderAction";

//

export interface NodeHeaderCopyActionProps
  extends Omit<NodeHeaderActionProps, "onClick"> {
  onClick?: (nodeId: string, event: React.MouseEvent) => void;
}

/**
 * A copy action button that passes the node's id to the `onClick` handler when
 * clicked.
 */
export const NodeHeaderCopyAction = React.forwardRef<
  HTMLButtonElement,
  NodeHeaderCopyActionProps
>(({ onClick, ...props }, ref) => {
  const id = useNodeId();

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (!onClick || !id) return;

      onClick(id, event);
    },
    [onClick],
  );

  return (
    <NodeHeaderAction
      ref={ref}
      onClick={handleClick}
      variant="ghost"
      {...props}
    >
      <Copy />
    </NodeHeaderAction>
  );
});

NodeHeaderCopyAction.displayName = "NodeHeaderCopyAction";

//

export type NodeHeaderDeleteActionProps = Omit<
  NodeHeaderActionProps,
  "onClick"
>;

/**
 * A delete action button that removes the node from the graph when clicked.
 */
export const NodeHeaderDeleteAction = React.forwardRef<
  HTMLButtonElement,
  NodeHeaderDeleteActionProps
>((props, ref) => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleClick = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, []);

  return (
    <NodeHeaderAction
      ref={ref}
      onClick={handleClick}
      variant="ghost"
      {...props}
    >
      <Trash />
    </NodeHeaderAction>
  );
});

NodeHeaderDeleteAction.displayName = "NodeHeaderDeleteAction";

//

export type NodeHeaderMenuActionProps = Omit<
  NodeHeaderActionProps,
  "onClick"
> & {
  trigger?: React.ReactNode;
};

/**
 * Renders a header action that opens a dropdown menu when clicked. The dropdown
 * trigger is a button with an ellipsis icon. The trigger's content can be changed
 * by using the `trigger` prop.
 *
 * Any children passed to the `<NodeHeaderMenuAction />` component will be rendered
 * inside the dropdown menu. You can read the docs for the shadcn dropdown menu
 * here: https://ui.shadcn.com/docs/components/dropdown-menu
 *
 */
export const NodeHeaderMenuAction = React.forwardRef<
  HTMLButtonElement,
  NodeHeaderMenuActionProps
>(({ trigger, children, ...props }, ref) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NodeHeaderAction ref={ref} {...props}>
          {trigger ?? <EllipsisVertical />}
        </NodeHeaderAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
});

NodeHeaderMenuAction.displayName = "NodeHeaderMenuAction";
