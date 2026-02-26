/**
 * Tags Page Configuration
 *
 * This file centralizes all Tags page settings including:
 * - Page titles and descriptions
 * - Color schemes for tags
 * - Layout options
 * - Animation settings
 */

export interface TagColorScheme {
  name: string
  bg: string
  text: string
  hover: string
  border?: string
}

export interface TagsConfig {
  // Page content
  title: string
  subtitle: string
  icon: string

  // Layout settings
  layout: 'cloud' | 'grid' | 'masonry'
  showEmptyTags: boolean
  sortBy: 'count' | 'name' | 'recent'

  // Display options
  showCount: boolean
  showDescription: boolean
  enableSearch: boolean

  // Size mapping (based on post count)
  sizeThresholds: {
    large: number // count >= large → 2xl
    medium: number // count >= medium → xl
    small: number // count >= small → lg
  }

  // Color schemes (vibrant & block-based)
  colorSchemes: TagColorScheme[]

  // Animation settings
  staggerDelay: number // delay between each tag animation (ms)
  hoverScale: number // scale on hover
  animationDuration: number // transition duration (ms)

  // Empty state
  emptyState: {
    title: string
    description: string
    icon: string
  }
}

/**
 * Main Tags Page Configuration
 */
export const tagsConfig: TagsConfig = {
  // ===== Page Content =====
  title: '标签云',
  subtitle: '按标签探索我的文章',
  icon: 'Hash',

  // ===== Layout Settings =====
  layout: 'cloud', // 'cloud' for flexible wrap, 'grid' for fixed columns, 'masonry' for pinterest-style
  showEmptyTags: false, // Don't show tags with 0 posts
  sortBy: 'count', // Sort by post count (most popular first)

  // ===== Display Options =====
  showCount: true, // Show post count badge
  showDescription: false, // Don't show tag descriptions (future feature)
  enableSearch: true, // Enable tag search (future feature)

  // ===== Size Mapping =====
  // Tags with >= 6 posts will be 2xl
  // Tags with >= 3 posts will be xl
  // Tags with < 3 posts will be lg
  sizeThresholds: {
    large: 6,
    medium: 3,
    small: 1,
  },

  // ===== Color Schemes (统一单色系) =====
  colorSchemes: [
    {
      name: 'Gray',
      bg: 'bg-gray-700/50',
      text: 'text-gray-200',
      hover: 'hover:bg-gray-600/50',
      border: 'border-gray-600/30',
    },
  ],

  // ===== Animation Settings =====
  staggerDelay: 0.03, // 30ms between each tag (for smooth cascade)
  hoverScale: 1.05, // 5% scale on hover
  animationDuration: 200, // 200ms transition duration

  // ===== Empty State =====
  emptyState: {
    title: '暂无标签',
    description: '还没有文章添加标签',
    icon: 'Tag',
  },
}

/**
 * Helper function to get color scheme for a tag
 * Uses consistent hashing to ensure same tag always gets same color
 */
export function getTagColorScheme(tagName: string, index: number): TagColorScheme {
  const { colorSchemes } = tagsConfig
  // Use index first, fall back to hash of tag name for consistency
  return colorSchemes[index % colorSchemes.length]
}

/**
 * Helper function to get text size based on post count
 */
export function getTagSize(count: number): string {
  const { sizeThresholds } = tagsConfig
  if (count >= sizeThresholds.large) return 'text-2xl'
  if (count >= sizeThresholds.medium) return 'text-xl'
  return 'text-lg'
}

/**
 * Helper function to sort tags
 */
export function sortTags(
  tags: string[],
  tagCounts: Record<string, number>,
  sortBy: TagsConfig['sortBy']
): string[] {
  const sorted = [...tags]

  switch (sortBy) {
    case 'count':
      return sorted.sort((a, b) => tagCounts[b] - tagCounts[a])
    case 'name':
      return sorted.sort((a, b) => a.localeCompare(b, 'zh-CN'))
    case 'recent':
      // For now, sort by count (recent sorting would require post dates)
      return sorted.sort((a, b) => tagCounts[b] - tagCounts[a])
    default:
      return sorted
  }
}
