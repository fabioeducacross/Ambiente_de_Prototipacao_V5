import { ref } from 'vue'
import { ListTableSelect } from '../adapters/vue3/index.js'

const sampleColumns = [
    { key: 'title', label: 'Título', sortable: true },
    { key: 'author', label: 'Autor', sortable: true },
    { key: 'status', label: 'Status', sortable: false }
]

const sampleRows = Array.from({ length: 14 }, (_, index) => ({
    id: index + 1,
    title: `Missão ${index + 1}`,
    author: index % 2 === 0 ? 'Isabela Cross' : 'Pedro Alves',
    status: index % 3 === 0 ? 'Publicada' : 'Rascunho'
}))

export default {
    title: 'Composed/ListTableSelect',
    component: ListTableSelect,
    tags: ['autodocs'],
    argTypes: {
        showSelectAll: { control: 'boolean' },
        showSearch: { control: 'boolean' },
        loading: { control: 'boolean' },
        emptyText: { control: 'text' },
        searchPlaceholder: { control: 'text' }
    }
}

export const CanonicalMinimum = {
    name: 'Contrato mínimo - tabela',
    args: {
        dataTable: sampleRows,
        tableColumns: sampleColumns,
        totalData: sampleRows.length,
        showSelectAll: true,
        showSearch: true,
        searchPlaceholder: 'Pesquisar missão...'
    },
    render: (args) => ({
        components: { ListTableSelect },
        setup() {
            const selected = ref([])
            return { args, selected }
        },
        template: `
      <div style="padding:16px;max-width:980px">
        <ListTableSelect v-bind="args" v-model:selected="selected" />
      </div>
    `
    })
}

export const WithCellSlots = {
    name: 'Contrato mínimo - slots de célula',
    render: () => ({
        components: { ListTableSelect },
        setup() {
            const selected = ref([])
            return { selected, sampleColumns, sampleRows }
        },
        template: `
      <div style="padding:16px;max-width:980px">
        <ListTableSelect
          :data-table="sampleRows"
          :table-columns="sampleColumns"
          :total-data="sampleRows.length"
          v-model:selected="selected"
        >
          <template #cell(title)="{ item }">
            <span style="font-weight:700;color:#4b4b6a">{{ item.title }}</span>
          </template>
          <template #cell(status)="{ value }">
            <span style="padding:4px 8px;border-radius:999px;background:#f3f2f7;color:#7367f0;font-size:12px;font-weight:600">
              {{ value }}
            </span>
          </template>
        </ListTableSelect>
      </div>
    `
    })
}

export const LoadingState = {
    name: 'Estado - loading',
    render: () => ({
        components: { ListTableSelect },
        setup() {
            return { sampleColumns }
        },
        template: `
      <div style="padding:16px;max-width:980px">
        <ListTableSelect
          :data-table="[]"
          :table-columns="sampleColumns"
          :total-data="10"
          :loading="true"
        />
      </div>
    `
    })
}

export const EmptyState = {
    name: 'Estado - empty',
    render: () => ({
        components: { ListTableSelect },
        setup() {
            return { sampleColumns }
        },
        template: `
      <div style="padding:16px;max-width:980px">
        <ListTableSelect
          :data-table="[]"
          :table-columns="sampleColumns"
          :total-data="0"
          empty-text="Nenhum registro encontrado."
        />
      </div>
    `
    })
}

export const SearchVisibilityAlias = {
    name: 'Compatibilidade segura - alias de busca',
    render: () => ({
        components: { ListTableSelect },
        setup() {
            return { sampleColumns, sampleRows }
        },
        template: `
      <div style="padding:16px;max-width:980px">
        <ListTableSelect
          :data-table="sampleRows"
          :table-columns="sampleColumns"
          :total-data="sampleRows.length"
          :show-search-query-input="false"
        />
        <p style="margin-top:8px;font-size:12px;color:#6e6b7b">
          O alias legado de visibilidade da busca continua limitado a este eixo e não expande a surface do componente.
        </p>
      </div>
    `
    })
}