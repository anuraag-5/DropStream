// 'use client'

// import Card from "@/components/Card";
// import Sort from "@/components/Sort";
// import { getFiles } from "@/lib/actions/file.actions";
// import { Models } from "node-appwrite";
// import { useEffect, useState } from "react";

// const Page = ({ params }: SearchParamProps) => {
//   const [ isLoading, setIsLoading ] = useState(true);
//   // const type = (await params)?.type as string || "";
//   // const files = await getFiles();
//   let files,type : any;

//   useEffect(() => {
//     const getfiles = async () => {
//       files = await getFiles();
//       type = (await params)?.type as string || "";
//     }
//     getfiles().then(() => setIsLoading(false))
//   },[])

//   if(isLoading) return (
//     <div className="page-container">Loading</div>
//   )

//   return (
//     <div className="page-container">
//       <section className="w-full">
//         <h1 className="h1 capitalize">{type}</h1>

//         <div className="total-size-section">
//           <p className="body-1">
//             Total: <span className="h5">0 MB</span>
//           </p>

//           <div className="sort-container">
//             <p className="body-1 hiddden sm:block text-light-200">Sort</p>
//             {/* <Sort /> */}
//           </div>
//         </div>
//       </section>
//       {
//         files? (
//           <section className="file-list">
//             { files.documents.map((file: Models.Document) => (
//               <Card key={file.$id} file={file} />
//             ))}
//           </section>
//         ) : (
//           <p className="empty-list">No files uploaded</p>
//         )
//       }
//     </div>
//   )
// }

// export default Page

"use client";

import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import Image from "next/image";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";

const Page = ({ searchParams, params }: SearchParamProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<{
    documents: Models.Document[];
    total: number;
  } | null>(null);
  const [type, setType] = useState<string>("");
  const [ searchText, setSearchText ] = useState("");
  const [ sort, setSort ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedType = ((await params)?.type as string) || "";
      const types = getFileTypesParams(fetchedType) as FileType[];
      const fetchSearchText = ((await searchParams)?.query as string) || "";
      const fetchSort = ((await searchParams)?.sort as string) || "";
      const fetchedFiles = await getFiles({ types, searchText: fetchSearchText, sort: fetchSort });

      setFiles(fetchedFiles);
      setType(fetchedType);
      setSearchText(fetchSearchText);
      setSort(fetchSort);
    };

    fetchData().then(() => setIsLoading(false));
  }, [params]);

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center h-[100%]">
        <Image
          src="/assets/icons/loader.svg"
          alt="Loader"
          width={24}
          height={24}
          className="animate-spin bg-brand"
        />
        <p className="text-brand-100">Getting your files</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">
              Sort by: 
            </p>
            <Sort />
          </div>
        </div>
      </section>
      {files?.total ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
