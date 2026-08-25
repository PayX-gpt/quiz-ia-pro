import { useEffect, useState } from 'react'
import type { Block } from '../types'
import { Rich } from './Rich'

export function ButtonBlock({ block, onClick }: { block: Block; onClick: () => void }) {
  const d = block.data
  const delay = d.delayToShow ?? {}
  const [visible, setVisible] = useState(!delay.enabled)

  useEffect(() => {
    if (!delay.enabled) return
    setVisible(false)
    const t = setTimeout(() => setVisible(true), (delay.seconds ?? 0) * 1000)
    return () => clearTimeout(t)
  }, [block.id, delay.enabled, delay.seconds])

  if (!visible) return null

  return (
    <div id={block.id} className="flex flex-auto justify-center scroll-mt-7">
      <div className="flex max-w-lg flex-auto justify-center tiptap-rendering">
        <div className="block-button-wrapper flex flex-auto">
          <button
            type="button"
            onClick={onClick}
            className={`block-button flex-auto py-5 text-center font-bold transition-all rounded-xl ${d.animation ?? ''}`}
            style={{
              backgroundColor: d.colors?.focus,
              // Borda inferior de 8px: é o "relevo" do botão no original.
              borderColor: d.colors?.focusBorder ?? 'rgba(255, 255, 255, 0.1)',
              color: d.colors?.text ?? '#ffffff',
            }}
          >
            <Rich html={d.title} />
          </button>
        </div>
      </div>
    </div>
  )
}
