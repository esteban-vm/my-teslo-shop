export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
  const { slug } = await params

  return (
    <div className='border border-primary'>
      <h1>Product Page</h1>
      <p>{slug}</p>
    </div>
  )
}
