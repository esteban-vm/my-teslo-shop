export type Props = PageProps<'/admin/product/[slug]'>

export default async function Page({ params }: Props) {
  const { slug } = await params

  return <div>{slug}</div>
}
