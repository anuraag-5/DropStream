"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/constants";
import { constructDownloadUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { Models } from "node-appwrite";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { deleteFile, renameFile, UpdateFileUsers } from "@/lib/actions/file.actions";
import FileDetails, { ShareInput } from "./ActionsModalContent";

const ActionDropdown = ({
  file,
  user,
}: {
  file: Models.Document;
  user: Models.Document | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const path = usePathname();

  const closeAllModals = (name: string) => {
    setIsDropdownOpen(false);
    setIsModalOpen(false);
    setAction(null);
    setName(name);
    // setEmails([])
  };

  const handleAction = async () => {
    if (!action) return;

    setIsLoading(true);
    let success;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => UpdateFileUsers({ fileId: file.$id, emails, path }),
      delete: () => deleteFile({ fileId: file.$id, path, bucketFileId: file.bucketFileId })
    };

    success = await actions[action.value as keyof typeof actions]();
    if (success) closeAllModals(success.name);
    setIsLoading(false);
  };

  const handleRemoveUsers = async (email: string) => {
    const UpdatedEmails = emails.filter((emailuser) => emailuser != email);

    const success = await UpdateFileUsers({ fileId: file.$id, emails, path });
    if (success) setEmails(UpdatedEmails);
    closeAllModals(success.name);
  };

  const renderDialogContent = () => {
    if (!action) return null;
    const { label, value } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUsers}
            />
          )}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete ?{" "}
              <span className="delete-file-name">{file.name}?</span>
            </p>
          )}
        </DialogHeader>
        {user?.$id === file.owner.$id ? (
          ["rename", "delete", "share"].includes(value) && (
            <DialogFooter className="flex flex-col gap-3 md:flex-row">
              <Button
                onClick={() => closeAllModals(file.name)}
                className="modal-cancel-button"
              >
                Cancel
              </Button>
              <Button onClick={handleAction} className="modal-submit-button">
                <p className="capitalize">{value}</p>
                {isLoading && (
                  <Image
                    src="/assets/icons/loader.svg"
                    alt="Loader"
                    width={24}
                    height={24}
                    className="animate-spin"
                  />
                )}
              </Button>
            </DialogFooter>
          )
        ) : (
          <DialogFooter className="flex flex-col gap-3">
            {value !== "details" ? (
              <Button
                onClick={() => closeAllModals(file.name)}
                className="modal-submit-button"
              >
                <p className="caption">You cannot {value} this file</p>
                {isLoading && (
                  <Image
                    src="/assets/icons/loader.svg"
                    alt="Loader"
                    width={24}
                    height={24}
                    className="animate-spin"
                  />
                )}
              </Button>
            ) : (
              <p></p>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    );
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);
                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
