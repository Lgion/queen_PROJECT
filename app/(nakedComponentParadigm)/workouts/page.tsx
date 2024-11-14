import Link from 'next/link'
import Image from 'next/image'
// import Hello from "./Hello.mdx"
import './index.scss'
// import {getAllUsers,getAllPosts} from "@/lib/prisma"
// import LP from './components/LP/page'
import {HeroesVCenter as B5Comp} from '../components/Heroes'

export default async function Home() {

  // const users = await getAllUsers(true)
  // const posts = await getAllPosts(true)
  // const post = await getAllPosts({id:1,include:true})
  // console.log(users)
  // console.log(posts)
  
  return (
    <main>
      {/* {JSON.stringify(users)}
      {JSON.stringify(posts)}
      {JSON.stringify(post)} */}
      <hr />
      {/* <Hello /> */}
      <div>deoijoifdjoijfds</div>
      <hr />
      {/* <LP /> */}
      <B5Comp />
    </main>
  )
}
