import { features } from '@/data/landing'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import ProgressRing from '@/components/common/ProgressRing'

export default function FeatureCards() {
  return (
    <section id="fitur" className="pt-20 pb-10">
      <div className="mb-12 flex flex-col items-center gap-6 text-center">
        <h2 data-m="reveal" className="text-display">Tahu yang penting, tanpa mencari.</h2>
        <p data-m="reveal" className="text-lead">Tiga hal yang membuat tim tetap searah.</p>
      </div>
      <div data-m="cards" className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {features.map((f) => (
          <Card key={f.title} data-m="card" className="min-w-0">
            <ProgressRing value={f.p} color={f.c} animate />
            <CardTitle>{f.title}</CardTitle>
            <CardDescription>{f.text}</CardDescription>
          </Card>
        ))}
      </div>
    </section>
  )
}
