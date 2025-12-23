export type ContentNode =
  | { type: 'text'; content: string }
  | { type: 'component'; name: string; props: { label: string } }

export const parseAdminContent = (html: string): ContentNode[] => {
  console.log('html', html)

  /**
   * Разбор регулярки:
   * %          - начало вставки
   * ([\w_]+)   - Группа 1 (имя): буквы, цифры или подчеркивание
   * \(         - открывающая скобка
   * (          - Группа 2 (параметр):
   *   [^)]*?   - Любые символы, КРОМЕ закрывающей скобки, лениво
   * )
   * \)         - закрывающая скобка
   * %          - конец вставки
   */
  const regex = /%([^%(\s]+)\(([^)]*?)\)%/g

  const nodes: ContentNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  // Важно: работаем с копией строки, чтобы не мутировать оригинал
  const content = html

  while ((match = regex.exec(html)) !== null) {
    // 1. Текст до вставки
    if (match.index > lastIndex) {
      nodes.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      })
    }

    // match[1] — это имя (ссылка_приложения)
    // match[2] — это содержимое скобок (текст)
    nodes.push({
      type: 'component',
      name: match[1],
      props: { label: match[2] },
    })

    lastIndex = regex.lastIndex
  }

  // 2. Остаток текста
  if (lastIndex < content.length) {
    nodes.push({
      type: 'text',
      content: content.slice(lastIndex),
    })
  }

  console.log('nodes', nodes)

  return nodes
}
