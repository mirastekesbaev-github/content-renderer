import { defineComponent, h, computed, type PropType, isVue2 } from 'vue-demi'
import { parseAdminContent } from '../utils/parser.ts'

// Импортируем внутренние компоненты
import AppLink from './snippets/AppLinkSnippet.vue'

// Внутренняя карта компонентов
const INTERNAL_MAP: Record<string, any> = {
  ссылка_приложения: AppLink,
}

export const AdminContent = defineComponent({
  name: 'AdminContent',
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const nodes = computed(() => parseAdminContent(props.content))

    return () =>
      h(
        'div',
        { class: 'admin-content-root' },
        nodes.value.map((node, index) => {
          // Рендер обычного текста/HTML
          if (node.type === 'text') {
            return h('span', {
              key: `t-${index}`,
              // Универсальный способ вставки HTML для Vue 2 и 3 через vue-demi
              [isVue2 ? 'domProps' : 'innerHTML']: { innerHTML: node.content },
              innerHTML: node.content,
            })
          }

          // Рендер компонента из внутренней карты
          const component = INTERNAL_MAP[node.name]
          if (component) {
            return h(component, {
              key: `c-${index}`,
              // Пропсы передаются через v-bind логику
              ...(isVue2 ? { props: node.props } : node.props),
            })
          }

          // Если компонент не найден, просто возвращаем исходный текст %...%
          return h('span', { key: `e-${index}` }, `%${node.name}%`)
        }),
      )
  },
})
