import { Badge } from '@/components/ui/badge';
import ScrollButton from '@/components/ui/ScrollButton';

export default function LandingPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-8 max-w-6xl mx-auto relative overflow-hidden min-h-screen">
          <div className="relative z-10">
            <Badge
              variant="outline"
              className="mb-4 text-sm py-1 px-3 rounded-full"
            >
              Te presentamos
            </Badge>
            <h1 className="text-6xl font-extralight tracking-tight mb-6">
              una solución práctica
              <br />
              con <span className="italic">AFILIARAPP.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg font-light leading-relaxed mb-8">
              Afilia de forma sencilla y rápida, con un enfoque en la
              transparencia y la seguridad.
            </p>
            <div className="flex gap-4 items-center">
              <ScrollButton targetId="pricing">
                Comenzar en AFILIARAPP
              </ScrollButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
