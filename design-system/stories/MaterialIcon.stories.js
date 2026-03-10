import MaterialIcon from '../../FrontOffice/src/components/MaterialIcon.vue'

export default {
  title: 'Base/MaterialIcon',
  component: MaterialIcon,
  tags: ['autodocs']
}

export const Default = {
  args: { name: 'home', size: 24 },
  render: (args) => ({
    components: { MaterialIcon },
    setup() { return { args } },
    template: '<MaterialIcon v-bind="args" />'
  })
}

export const Sizes = {
  render: () => ({
    components: { MaterialIcon },
    template: `
      <div style="display:flex;align-items:center;gap:16px;padding:16px">
        <MaterialIcon name="star" :size="16" />
        <MaterialIcon name="star" :size="20" />
        <MaterialIcon name="star" :size="24" />
        <MaterialIcon name="star" :size="32" />
        <MaterialIcon name="star" :size="48" />
      </div>
    `
  })
}

export const CommonIcons = {
  name: 'Ícones Comuns',
  render: () => ({
    components: { MaterialIcon },
    setup() {
      const icons = [
        'home', 'edit', 'delete', 'add', 'search', 'settings',
        'person', 'group', 'school', 'book', 'star', 'favorite',
        'calendar_today', 'schedule', 'notifications', 'email',
        'check_circle', 'cancel', 'warning', 'info',
        'arrow_back', 'arrow_forward', 'expand_more', 'close'
      ]
      return { icons }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;padding:16px">
        <div
          v-for="icon in icons"
          :key="icon"
          style="display:flex;flex-direction:column;align-items:center;gap:4px;width:80px"
        >
          <MaterialIcon :name="icon" :size="24" />
          <span style="font-size:10px;color:#666;text-align:center;word-break:break-all">{{ icon }}</span>
        </div>
      </div>
    `
  })
}

export const WithColor = {
  render: () => ({
    components: { MaterialIcon },
    template: `
      <div style="display:flex;gap:16px;padding:16px">
        <MaterialIcon name="favorite" :size="32" style="color:var(--danger)" />
        <MaterialIcon name="star" :size="32" style="color:var(--warning)" />
        <MaterialIcon name="check_circle" :size="32" style="color:var(--success)" />
        <MaterialIcon name="info" :size="32" style="color:var(--info)" />
        <MaterialIcon name="settings" :size="32" style="color:var(--primary)" />
      </div>
    `
  })
}
