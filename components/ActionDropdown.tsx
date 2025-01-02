'use client'

import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/constants";
import Image from "next/image";

import { Models } from "node-appwrite";
import { useState } from "react";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
  const [ action, setAction ] = useState<ActionType | null>(null);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} >
        <DropdownMenuTrigger className="shad-no-focus">
          <Image 
          src="/assets/icons/dots.svg"
          alt="Dots"
          width={34}
          height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate capitalize">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem key={actionItem.value} className="shad-dropdown-item" onClick={() => {
              setAction(actionItem);
            }}>{actionItem.label}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default ActionDropdown;
