import React, { useState } from 'react'
import { Package, AlertTriangle, TrendingDown, Plus, Search, RefreshCw, X, CheckCircle } from 'lucide-react'
import { MOCK_INVENTORY } from '@/services/mockData'

// ─── Colour tokens (hardcoded hex) ───────────────────────────────────────────
const C = {
  primary:  '#477B62',
  dark:     '#254E3B',
  bg:       '#F7F8F3',
  text:     '#25352D',
  card:     '#FFFFFF',
  border:   '#C4DDD0',
  warning:  '#D99A38',
  danger:   '#C65D59',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function pct(current: number, total: number) {
  return Math.min(100, Math.round((current / total) * 100))
}

function StatusBadge({ status, current }: { status: string; current: number }) {
  const isLow = status === 'low' || current < 10
  return (
    <span
      style={{
        backgroundColor: isLow ? '#FEF3C7' : '#DCFCE7',
        color: isLow ? C.warning : C.primary,
        border: `1px solid ${isLow ? C.warning : C.border}`,
      }}
      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
    >
      {isLow ? <AlertTriangle size={11} /> : <CheckCircle size={11} />}
      {isLow ? 'Low Stock' : 'OK'}
    </span>
  )
}

// ─── Add Inventory Modal ──────────────────────────────────────────────────────
interface AddItemForm {
  name: string
  quantity: string
  total: string
  expiryDate: string
}

function AddInventoryModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<AddItemForm>({ name: '', quantity: '', total: '', expiryDate: '' })
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(onClose, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(37,53,45,0.45)' }}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: C.border }}>
          <h2 className="font-bold text-lg" style={{ color: C.dark }}>Add Inventory Item</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={18} style={{ color: C.text }} />
          </button>
        </div>

        {saved ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <CheckCircle size={48} style={{ color: C.primary }} />
            <p className="font-semibold" style={{ color: C.dark }}>Item added successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="px-6 py-5 flex flex-col gap-4">
            {[
              { label: 'Medication Name', key: 'name', type: 'text', placeholder: 'e.g. Aspirin 81mg' },
              { label: 'Current Quantity', key: 'quantity', type: 'number', placeholder: 'e.g. 30' },
              { label: 'Total / Capacity', key: 'total', type: 'number', placeholder: 'e.g. 90' },
              { label: 'Expiry Date', key: 'expiryDate', type: 'date', placeholder: '' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm font-medium" style={{ color: C.text }}>{label}</label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[key as keyof AddItemForm]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 transition"
                  style={{
                    border: `1px solid ${C.border}`,
                    backgroundColor: C.bg,
                    color: C.text,
                  }}
                />
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-colors"
                style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.bg }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: C.primary }}
              >
                Add Item
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Inventory Card ───────────────────────────────────────────────────────────
function InventoryCard({ item }: { item: typeof MOCK_INVENTORY[number] }) {
  const progress = pct(item.currentStock, item.totalCapacity)
  const isLow = item.status === 'low' || item.currentStock < 10

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 shadow-sm"
      style={{ backgroundColor: C.card, border: `1px solid ${isLow ? C.warning : C.border}` }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-base leading-tight" style={{ color: C.dark }}>{item.name}</p>
          <p className="text-xs mt-0.5" style={{ color: '#6B7F76' }}>{item.dosage} · {item.form}</p>
        </div>
        <StatusBadge status={item.status} current={item.currentStock} />
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs font-medium" style={{ color: C.text }}>
          <span>{item.currentStock} remaining</span>
          <span style={{ color: '#6B7F76' }}>of {item.totalCapacity} {item.form}s</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: C.border }}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              backgroundColor: isLow ? C.warning : C.primary,
            }}
          />
        </div>
        <p className="text-xs" style={{ color: '#6B7F76' }}>{progress}% remaining</p>
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1 text-xs" style={{ color: '#6B7F76' }}>
        <div className="flex justify-between">
          <span>Next refill due</span>
          <span className="font-medium" style={{ color: C.text }}>{item.nextRefillDueDate}</span>
        </div>
        <div className="flex justify-between">
          <span>Pharmacy</span>
          <span className="font-medium text-right max-w-[55%] truncate" style={{ color: C.text }}>{item.pharmacyName}</span>
        </div>
        <div className="flex justify-between">
          <span>Rx #</span>
          <span className="font-medium" style={{ color: C.text }}>{item.rxNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Auto-refill</span>
          <span className="font-medium" style={{ color: item.autoRefillEnabled ? C.primary : C.text }}>
            {item.autoRefillEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Reorder button */}
      <button
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
        style={isLow
          ? { backgroundColor: C.warning, color: '#fff' }
          : { backgroundColor: C.bg, color: C.primary, border: `1px solid ${C.border}` }}
      >
        <RefreshCw size={14} />
        {isLow ? 'Request Refill Now' : 'Reorder'}
      </button>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: number
  icon: React.ElementType
  accent: string
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-5 py-4 shadow-sm"
      style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}
    >
      <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${accent}18` }}>
        <Icon size={20} style={{ color: accent }} />
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color: C.dark }}>{value}</p>
        <p className="text-xs" style={{ color: '#6B7F76' }}>{label}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'low' | 'adequate'>('all')
  const [showModal, setShowModal] = useState(false)

  const lowCount = MOCK_INVENTORY.filter(i => i.status === 'low' || i.currentStock < 10).length
  const adequateCount = MOCK_INVENTORY.length - lowCount

  const filtered = MOCK_INVENTORY.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'low' && (item.status === 'low' || item.currentStock < 10)) ||
      (filter === 'adequate' && item.status === 'adequate' && item.currentStock >= 10)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: `${C.primary}20` }}>
              <Package size={26} style={{ color: C.dark }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: C.dark }}>Medicine Inventory</h1>
              <p className="text-sm mt-0.5" style={{ color: '#6B7F76' }}>
                Track and manage Eleanor's medication supply
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow transition-opacity hover:opacity-90"
            style={{ backgroundColor: C.primary }}
          >
            <Plus size={16} />
            Add Inventory Item
          </button>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard label="Total Items"      value={MOCK_INVENTORY.length} icon={Package}      accent={C.primary} />
          <StatCard label="Low Stock"        value={lowCount}              icon={AlertTriangle} accent={C.warning} />
          <StatCard label="Adequate"         value={adequateCount}         icon={TrendingDown}  accent={C.dark}    />
          <StatCard label="Refill Requests"  value={0}                     icon={RefreshCw}     accent={C.danger}  />
        </div>

        {/* ── Search + Filter ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: '#6B7F76' }}
            />
            <input
              type="text"
              placeholder="Search medications…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 transition"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.card,
                color: C.text,
              }}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'low', 'adequate'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all"
                style={filter === f
                  ? { backgroundColor: C.primary, color: '#fff' }
                  : { backgroundColor: C.card, color: C.text, border: `1px solid ${C.border}` }}
              >
                {f === 'all' ? 'All' : f === 'low' ? 'Low Stock' : 'Adequate'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Inventory Grid ── */}
        {filtered.length === 0 ? (
          <div
            className="rounded-2xl py-16 text-center"
            style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}
          >
            <Package size={40} className="mx-auto mb-3" style={{ color: C.border }} />
            <p className="font-semibold" style={{ color: C.text }}>No items found</p>
            <p className="text-sm mt-1" style={{ color: '#6B7F76' }}>Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(item => (
              <InventoryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {showModal && <AddInventoryModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
