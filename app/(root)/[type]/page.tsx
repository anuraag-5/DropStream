const Page = async ({ params }: SearchParamProps) => {
  const type = (await params)?.type as string || "";
  return (
    <div className="page-container">Page</div>
  )
}

export default Page