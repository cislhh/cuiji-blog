import Link from 'next/link'
import { slug } from 'github-slugger'
import { memo } from 'react'

interface Props {
  text: string
}

function Tag({ text }: Props) {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-primary-500 hover:text-primary-400 mr-3 text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

/**
 * React.memo 优化
 *
 * Tag 组件是纯展示组件，props 不改变时不应该重新渲染。
 *
 * 优化效果：
 * - 在博客列表、标签云等场景中显著提升性能
 * - 避免不必要的重新计算 slug(text)
 */
export default memo(Tag, (prevProps, nextProps) => {
  return prevProps.text === nextProps.text
})
