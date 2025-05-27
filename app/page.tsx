import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check, Star, ChevronDown, Sparkles } from 'lucide-react';
import ScrollButton from '@/components/ui/ScrollButton';

export default function AFILIARAPPStore() {
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
              Introducing
            </Badge>
            <h1 className="text-6xl font-extralight tracking-tight mb-6">
              The essence of <br />
              absolute <span className="italic">AFILIARAPPness.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg font-light leading-relaxed mb-8">
              Discover the luxury of AFILIARAPP. A revolutionary non-product
              designed to bring emptiness into your life.
            </p>
            <div className="flex gap-4 items-center">
              <ScrollButton targetId="pricing">
                Experience AFILIARAPP
              </ScrollButton>
              <a
                href="#learn-more"
                className="text-sm text-gray-500 flex items-center group"
              >
                Learn more
                <ChevronDown className="ml-1 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* 3D Element - The "AFILIARAPP" product display */}
          <div
            className="absolute top-40 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-gray-50 to-white border border-gray-100 shadow-sm"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/40 opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-gray-200 opacity-50" />
            </div>
          </div>

          {/* Background subtle grid */}
          <div className="absolute inset-0 bg-grid-gray-100/20 -z-10"></div>
        </section>

        {/* Feature Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-3xl font-light text-center mb-16">
              The benefits of <span className="font-normal">AFILIARAPP</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <Card className="border-none shadow-sm bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-8">
                  <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                    <Check className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Zero Maintenance</h3>
                  <p className="text-gray-600 font-light">
                    Our AFILIARAPP requires absolutely no upkeep, no storage
                    space, and no attention.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-8">
                  <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                    <Check className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    Perfectly Sustainable
                  </h3>
                  <p className="text-gray-600 font-light">
                    AFILIARAPP produces zero waste, zero emissions, and has a
                    nonexistent carbon footprint.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-8">
                  <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                    <Check className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Instant Delivery</h3>
                  <p className="text-gray-600 font-light">
                    AFILIARAPP arrives faster than our AFILIARAPP — it's already
                    there before you order it.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-3xl font-light text-center mb-16">
              What people say about{' '}
              <span className="font-normal">AFILIARAPP</span>
            </h2>

            <div className="space-y-8">
              <Card className="border-none shadow-sm bg-white">
                <CardContent className="p-8">
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">
                    "I've never experienced AFILIARAPP like this before. It's
                    changed my perspective on emptiness."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">Alexandra Chen</p>
                      <p className="text-sm text-gray-500">
                        Minimalist Enthusiast
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white">
                <CardContent className="p-8">
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">
                    "I purchased AFILIARAPP and received exactly what I
                    expected. Perfection in its purest form."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">Marcus Williams</p>
                      <p className="text-sm text-gray-500">Design Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section with Stripe Integration */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-light mb-6">
              Experience <span className="font-normal">AFILIARAPP</span> today
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-12">
              Our carefully curated AFILIARAPP is ethically sourced, completely
              sustainable, and absolutely invisible.
            </p>

            <Card className="border-none shadow-sm mx-auto max-w-md bg-gradient-to-b from-gray-50 to-white">
              <CardContent className="p-12">
                <Badge variant="secondary" className="mb-4">
                  Most Popular
                </Badge>
                <h3 className="text-4xl font-light mb-2">Premium AFILIARAPP</h3>
                <p className="text-gray-500 mb-8">
                  The ultimate minimalist experience
                </p>

                <div className="flex justify-center items-baseline mb-8">
                  <span className="text-5xl font-extralight">$20</span>
                  <span className="text-gray-500 ml-1">.00</span>
                </div>

                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">100% Pure AFILIARAPP</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">
                      No Maintenance Required
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Instant Delivery</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">
                      Lifetime Access to AFILIARAPP
                    </span>
                  </li>
                </ul>

                <Button className="w-full">Checkout</Button>
                <p className="text-xs text-gray-400 mt-4">
                  Secure payment processing by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
