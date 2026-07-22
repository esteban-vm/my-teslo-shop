export type Props = PageProps<'/admin/product/new'>

export default async function Page({ searchParams }: Props) {
  const { page = '1' } = await searchParams

  return <div>{page}</div>
}
