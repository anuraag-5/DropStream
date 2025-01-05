"use client";

import Link from "next/link";
import { Models } from "node-appwrite";
import React, { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Image from "next/image";

const Card = ({ file }: { file: Models.Document }) => {
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (!user) throw new Error("User not found");
      setUser(user);
    };
    getUser().then(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="page-container flex items-center justify-center h-[100%]">
        <Image
          src="/assets/icons/loader.svg"
          alt="Loader"
          width={24}
          height={24}
          className="animate-spin bg-brand"
        />
        <p className="text-brand-100">Getting your file</p>
      </div>
    );
  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          classname="!size-20"
          imageClassname="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} user={user} />
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details break-words">
        <p className="subtitle-2 line-clamp-1 capitalize">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className=" caption line-clamp-1 text-light-200">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default Card;
