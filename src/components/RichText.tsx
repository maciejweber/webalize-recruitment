import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async'
import type { SerializedEditorState } from 'lexical'

interface RichTextProps {
  data: SerializedEditorState | Record<string, unknown> | null | undefined
}

export async function RichText({ data }: RichTextProps) {
  if (!data) return null

  const html = await convertLexicalToHTMLAsync({
    data: data as SerializedEditorState,
  })

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
