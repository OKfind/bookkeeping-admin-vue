export const designWidth = 750
export const designHeight = 1334
export const designMultiple = designWidth / 750
export const minWidth = 320
export const minWindow = 750
export const maxWidth = `${minWidth}Px`
export const maxWindow = `${minWindow}Px`
export const fontSize = designWidth / 750

export function charsetRemoval() {
  return {
    postcssPlugin: 'internal:charset-removal',
    AtRule: {
      charset: (atRule: any) => {
        if (atRule.name === 'charset') atRule.remove()
      },
    },
  }
}
