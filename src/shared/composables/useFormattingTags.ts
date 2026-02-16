export function formatTags(tags: string) {
  return tags
    .split(';')
    .map(t => t.trim())
    .filter(Boolean)
    .map(text => ({ text }))
}