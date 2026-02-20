import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import TagsClient from './TagsClient'

export const metadata = genPageMetadata({ title: '标签', description: '文章标签分类' })

export default function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return <TagsClient sortedTags={sortedTags} tagCounts={tagCounts} />
}
