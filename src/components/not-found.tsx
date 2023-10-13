import Link from "next/link"
export default async function NotFound() {
  console.log
  return (
    <main className="text-center">
        <h2 className="text-3xl">There was a problem</h2>
        <p>We could not find the page you were looking for</p>
        <p>Go <Link href='/'>Back</Link></p>
    </main>
  )
}