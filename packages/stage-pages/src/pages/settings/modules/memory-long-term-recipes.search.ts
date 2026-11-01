import type { SettingsSearchModule } from '@proj-lyra/stage-ui/libs/settings-search'

import { settingsSearchItemKey } from '@proj-lyra/stage-shared/settings-search'
import { useRecipesStore } from '@proj-lyra/stage-ui/stores/recipes'

/** The marker of a recipe's row. The page and its module share it. */
export function recipeSearchKey(id: string) {
  return settingsSearchItemKey('recipe', id)
}

/** The recipes page, with the recipes by name. The recipes load from IndexedDB first. */
export default {
  routes: [{
    path: '/settings/modules/memory-long-term-recipes',
    items: async () => {
      const recipes = useRecipesStore()
      await recipes.ready()
      return recipes.recipes.map(recipe => ({ title: recipe.name, key: recipeSearchKey(recipe.id) }))
    },
  }],
} satisfies SettingsSearchModule
