import Link from "next/link";
import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";

const Card = ({ file }: { file: Models.Document }) => {
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
          <ActionDropdown file={file}/>
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details break-words">
        <p className="subtitle-2 line-clamp-1 capitalize">{file.name}</p>
        <FormattedDateTime date={file.$createdAt} className="body-2 text-light-100"/>
        <p className=" caption line-clamp-1 text-light-200">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default Card;
