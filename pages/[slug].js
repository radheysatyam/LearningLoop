import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  console.log(router.pathname)
  return <p>Post: {router.query.slug}</p>
}