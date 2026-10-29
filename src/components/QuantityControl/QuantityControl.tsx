import { useId } from 'react'
import { clampQuantity } from '../../utils/products'

export function QuantityControl({ value, onChange, name = 'produto' }: { value: number; onChange: (value: number) => void; name?: string }) {
  const id = useId()
  return <div className="quantity">
    <label htmlFor={id} className="sr-only">Quantidade de {name}</label>
    <button onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={`Diminuir quantidade de ${name}`}>−</button>
    <input id={id} type="number" min="1" max="99" value={value} onChange={event => onChange(clampQuantity(event.target.valueAsNumber))} />
    <button onClick={() => onChange(value + 1)} disabled={value >= 99} aria-label={`Aumentar quantidade de ${name}`}>+</button>
  </div>
}
