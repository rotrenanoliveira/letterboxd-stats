export async function getUserProfileSrc(user: string) {
  const response = await fetch(`https://letterboxd.com/${user}/`)
  const data = await response.text()

  const ogImage = data.match(/<meta property="og:image" content="(.*?)"/)
  const userProfileSrc =
    ogImage?.[0].replace('<meta property="og:image" ', '').replace('content="', '').replace('"', '') ?? null

  return userProfileSrc
}
